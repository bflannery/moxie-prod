import {
  browserHistory
} from 'react-router';
import Backbone from 'backbone';
import $ from 'jquery';
import config from '../config';
import store from '../store';

export default Backbone.Model.extend({
  url: 'https://api.backendless.com/v1/files/Moxie',
  idAttribute: 'objectId',
  defaults: {
    name: '',
  },


  // ----------------------------
  // uploadSubFile()
  // Upload a File into a Client Folder
  // Takes file, fileName, folderId, folderName, clientId, clientName as parameters
  // Add file to formData();
  // Save file to Client Folder in File Storage
      // Success: () =>
          // Log File saved to Client Folder in File Storage
          // parse response toJSON();
          // Call addSubFileToData() on file Model
          // Takes response.fileURL, fileName, folderId, folderName, clientId, clientName as parameters
      // Error: () =>
          // If Code:6003
                // Alert User 'File Already Exists'
          // Else Other
              // Log File NOT saved to Client Folder in File Storage
  // ----------------------------

  uploadSubFile(file, fileName, folderId, folderName, clientId, clientName) {
    let fd = new FormData();
    fd.append('upload', file);
    $.ajax({
      type: 'POST',
      data: fd,
      processData: false,
      contentType: false,
      url: 'https://api.backendless.com/v1/files/Moxie/subFolders/' + folderName + '/' + fileName,
      success: (response) => {
        console.log('File saved to Client Folder in File Storage');
        response = JSON.parse(response);
        store.file.addSubFileToData(response.fileURL, fileName, folderId, folderName, clientId, clientName);
      },
      error: (xhr) => {
        if (xhr.responseText === '{"code":6003,"message":"Unable to upload the file: file already exists"}') {
          alert('File Already Exists');
        } else {
          console.log('File NOT saved to Client Folder in File Storage');
        }

      }
    });

  },



  // ----------------------------
  // createClientFolder()
  // Create a New Client
  // Takes a clientName as a parameter
  // Add New Client Folder to Client Folder in Storage
      // Success: () =>
          //parse response to JSON()
          //Save Folder URL without the moxie file at the end
          // Create new Client on Clients Collection
              // Success: () =>
                    // Log Client Created
                    // parse response to JSON()
                    // push browser to new client
              // Error: () =>
                  // Log Client Not Created
      // Error: () =>
          // Log Client Folder created in Client Folder in Storage
  // ----------------------------

  createClientFolder(clientName) {
    let folder = 'moxie';
    let fd = new FormData();
    fd.append('upload', folder);
    $.ajax({
      type: 'POST',
      data: fd,
      processData: false,
      contentType: false,
      url: 'https://api.backendless.com/v1/files/Moxie/clients/' + clientName + '/' + 'moxie',
    }).done((response) => {
      console.log('Client Folder created in Client Folder in Storage');
      response = JSON.parse(response);
      let responseURL = response.fileURL;
      let splitURL = responseURL.split('/');
      let folderURL = splitURL.slice(0, splitURL.length - 1).join('/');

      console.log('calling createClient');
      store.clients.create({
        clientName: clientName,
        folderURL: folderURL
      }, {
        success: (response) => {
          console.log('client created');
          response = response.toJSON();
          browserHistory.push(`clients/${response.objectId}`);
        },
        error: (xhr) => {
          console.log('client not created: ', xhr);
        }
      });
    }).fail((xhr) => {
      console.log('Client Folder created in Client Folder in Storage ', xhr);
    });
  },



  // ----------------------------
  // createSubFolder()
  // Create a Client SubFolder
  // Takes clientName, clientId, subFolderName as parameters
  // Add New Client SubFolder to SubFolder in Storage
      // Success: () =>
          // Log subFolder created in SubFolder Storage
          //parse response to JSON()
          //Save Folder URL without the moxie file at the end
          // Create new folder on Folders Collection
              // Success: () =>
                    // Log subFolder Created
                    // parse response to JSON()
                    // Call addFolderToClientFolders();
                    // Takes response.objectId, response.folderName, clientId as parameters
              // Error: () =>
                  // Log Client Not Created
      // Error: () =>
          // Log subFolder NOT created in SubFolder Storage
  // ----------------------------

  createSubFolder(clientName, clientId, subFolderName) {
    $.ajax({
      type: 'POST',
      contentType: 'multipart/form-data',
      data: JSON.stringify({
        subFolderName
      }),
      url: 'https://api.backendless.com/v1/files/Moxie/subFolders/' + subFolderName + '/moxie',
    }).done((response) => {
      console.log('subFolder created in SubFolder Storage');
      response = JSON.parse(response);
      let responseURL = response.fileURL;
      let splitURL = responseURL.split('/');
      let subFolderURL = splitURL.slice(0, splitURL.length - 1).join('/');

      store.folders.create({
        folderURL: subFolderURL,
        folderName: subFolderName,
        clientName: clientName,
        clientId: clientId
      }, {
        success: (response) => {
          console.log('folder added to folders' );
          response = response.toJSON();
          console.log(response);
          store.clients.get(response.clientId).addFolderToClientFolders(response.objectId, response.folderName, response.clientId, response.clientName);
        }
      }, {
        error: (xhr) => {
          console.log('folder NOT added to folders', xhr);
        }
      });
    }).fail((xhr) => {
      console.log('subFolder NOT created in SubFolder Storage', xhr);
    });
  },



  // ----------------------------
  // deleteSubFolderFromStorage()
  // Delete Client Folder and Client Files From File Storage
  // Takes a clientFolder as a parameter
  // Success: () =>
        // Log subFolder deleted from Storage
        // Call deleteSubFolderFiles on file Model
        // Takes a clientFolder as a parameter
  // Error: () =>
        // Log subFolder NOT deleted from Storage

  // On Success ,
  // If No Client Folder in file storage ...
  // ----------------------------

  deleteSubFolderFromStorage(clientFolder) {
    $.ajax({
      type: 'DELETE',
      url: clientFolder.folders.folderURL,
      success: () => {
        console.log('deleted subFolder From Storage');
        store.file.deleteSubFolderFiles(clientFolder);
      },
      error: (xhr) => {
        console.log('subFolder NOT deleted from Storage', xhr);
      }
    });
  },



  // ----------------------------
  // deleteFileFromStorage()
  // Delete File from Storage
  // Takes a folderFile as a parameter
  // Success: () =>
        // Log File deleted From Storage
        // Call deleteFolderFile on file Model
        // Takes a folderFile as a parameter
  // Error: (xhr) =>
        // File NOT deleted From Storage

  // On Success ,
  // If No Client Folder in file storage ...
  // ----------------------------

  deleteFileFromStorage(folderFile) {
    $.ajax({
      type: 'DELETE',
      url: folderFile.files.fileUrl,
      success: () => {
        console.log('File deleted From Storage');
        store.file.deleteFolderFile(folderFile);
      },
      error: (xhr) => {
        console.log('File NOT deleted From Storage', xhr);
      }
    });
  },



  // ----------------------------
  // deleteClientFolder()
  // Delete Client from Storage
  // Takes a client as a parameter
  // Success: () =>
        // Log Client deleted From Storage
        // Call deleteFolderFile on file Model
        // Takes a client as a parameter
  // Error: (xhr) =>
        // Log Client NOT deleted From Storage
  // ----------------------------

  deleteClientFolder(client) {
    $.ajax({
      type: 'DELETE',
      url: client.folderURL,
      success: () => {
        console.log('Client deleted From Storage');
        store.file.deleteClientFilesFromFiles(client);
      },
      error: (xhr) => {
        console.log('Client NOT deleted From Storage', xhr);
      }
    });
  },

});
