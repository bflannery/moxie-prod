import Backbone from 'backbone';
import fileModel from '../Models/fileModel';
import store from '../store';
import $ from 'jquery';
import { browserHistory } from 'react-router';

export default Backbone.Collection.extend({
    model: fileModel,
    url: 'https://api.backendless.com/v1/data/Files',

    parse(data) {
      return data.data.sort(function(a,b){
        let nameA = a.name;
        let nameB = b.name;
        if(nameA < nameB) {
          return -1;
        }
        if(nameA > nameB) {
          return 1;
        }
        return 0;
      });
    },

    searchFiles(searchFile) {
      console.log(searchFile);
      $.ajax({
        type: 'GET',
        url: 'https://api.backendless.com/v1/data/Files',
        success: (files) => {
          return files.data.filter((file, i ,arr)=>{
            console.log(file);
            if(file.fileName === searchFile + '.pdf') {
              this.trigger('change');
              browserHistory.push('/folders/' + file.folderId);
            }
          });
        },
        error: () => {
          console.log('no clients');
        }
        });
    }
});
