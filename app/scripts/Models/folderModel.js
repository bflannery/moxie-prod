import {
  browserHistory
} from 'react-router';
import Backbone from 'backbone';
import $ from 'jquery';
import config from '../config';
import store from '../store';

export default Backbone.Model.extend({
  url: 'https://api.backendless.com/v1/data/Folders',
  idAttribute: 'objectId',
  defaults: {
    folderName: '',
    folderURL: '',
    isDeleteing: false,
    deleted: false,
    isSaving: false,
    saved: false,
    isLoading: false,
  },



  // ----------------------------
  // deleteClientFolder()
  // Delete Client Folder from Folders Collection
  // Takes a clientFolder as a parameter
      // Success: () =>
          // Log Client Folder deleted from Folders
          // Trigger change
      // Error: (xhr) =>
          // Log Client Folder NOT deleted from Folders
  // ----------------------------

  deleteClientFolder(clientFolder) {
    $.ajax({
      type: 'DELETE',
      url: `https://api.backendless.com/v1/data/Folders/${clientFolder.folders.objectId}`,
      success: () => {
        console.log('Client Folder deleted from Folders');
        window.location.reload();
      },
      error: (xhr) => {
        console.log('Client Folder NOT deleted from Folders', xhr);
      }

    });
  },



  // ----------------------------
  // addFolderToClientFolders()
  // Add Folder To ClientFolders Data Table
  // Takes fileId, subFolderName, subFolderId as parameters
  // Save folderFiles object on folderFiles table
      // If folderFiles[] === true
          // Get folderFiles[] and add thie folderFile to it
      // Else folderFiles[] === false
          // Create folderFiles[]
          // Update Folder with new folderFiles
                // Success: () =>
                    // Log folderFiles added to Folders
                    // Trigger change
               // Error: () =>
                    // Log folderFiles NOT added to Folders
  // ----------------------------

  addFileToSubFolder(fileId, subFolderName, subFolderId) {
    let folderFiles;
    if (this.get('folderFiles')) {
      folderFiles = this.get('folderFiles').concat([{
        ___class: 'FolderFiles',
        folderName: subFolderName,
        files: {
          ___class: 'Files',
          objectId: fileId,
        }
      }]);
    } else {
      folderFiles = ({
        ___class: 'FolderFiles',
        folderName: subFolderName,
        files: {
          ___class: 'Files',
          objectId: fileId,
        }
      });
    }
    $.ajax({
      type: 'PUT',
      url: `https://api.backendless.com/v1/data/Folders/${subFolderId}`,
      contentType: 'application/json',
      data: JSON.stringify({
        folderFiles
      }),
      success: () => {
        console.log('folderFiles added to Folders');
        window.location.reload();
        console.log('triggered');

      },
      error: (xhr) => {
        console.log('folderFiles NOT added to Folders', xhr);
      }
    });
  }

});

// ----------------------------
// Success: () =>
// Error: () =>
// ----------------------------
