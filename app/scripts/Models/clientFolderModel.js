import Backbone from 'backbone';
import $ from 'jquery';
import {browserHistory} from 'react-router';
import store from '../store';

export default Backbone.Model.extend({
  url: 'https://api.backendless.com/v1/data/ClientFolders',
  idAttribute: 'objectId',
  defaults: {
      clientName: '',
      folderURL: '',
      isDeleteing: false,
      deleted: false,
      isSaving: false,
      saved: false,
      isLoading: false,
  },


  // ----------------------------
  // deleteClientFolder()
  // takes a client parameter
  // If clientFolders > 0 loop
    //ForEach file in clientFolder, delete them
    // Success: () =>
        //call deleteClient(client) on client Model
        //pass client as parameter
    // Error: () =>
        //Log Errorr
  // Else clientFolders === 0
        //call deleteClient(client) on client Model
        //pass client as parameter
  // ----------------------------


  deleteClientFolder(client) {
  console.log(client);
  if(client.clientFolders.length > 0) {
    let emptyClientFolder = client.clientFolders.forEach((clientFolder, i, arr)=> {
    $.ajax({
      type: 'DELETE',
      url: `https://api.backendless.com/v1/data/ClientFolders/${clientFolder.objectId}`,
      success: (response) => {
        console.log('file deleted from ClientFolders');
        store.client.deleteClient(client);
      },
      error: (xhr)=>{
        console.log('file delete error: ', xhr);
        }
      });
    });
  } else {
  console.log('no clientFolders, calling deleteClient');
  store.clients.get(client.objectId).deleteClient(client);
}
}
  });



    // ----------------------------
    // ----------------------------
