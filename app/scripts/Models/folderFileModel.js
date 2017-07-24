import {browserHistory} from 'react-router';
import Backbone from 'backbone';
import $ from 'jquery';
import store from '../store';

export default Backbone.Model.extend({
    url: 'https://api.backendless.com/v1/data/FolderFiles',
    idAttribute: 'objectId',
    defaults: {
      name: '',
      isDeleteing: false,
      deleted: false,
      isSaving: false,
      saved: false,
      isLoading: false,
      loaded: false,
    },
  });


  // ----------------------------
  // Success: () =>
  // Error: () =>
  // ----------------------------
