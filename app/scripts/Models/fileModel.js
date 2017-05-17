import Backbone from 'backbone';
import $ from 'jquery';
import config from '../config';
import {
  browserHistory
} from 'react-router';
import store from '../store';

export default Backbone.Model.extend({
  url: 'https://api.backendless.com/v1/data/Files',
  idAttribute: 'objectId',
  defaults: {
    fileName: '',
  },

  // ----------------------------
  // addSubFileToData()
  // Add File To All Files Table
  // Takes fileURL, fileName, folderId, folderName, clientId, clientName as parameters
        // Create a new object on the Files Collection
            // Success: (response) =>
                // Log file created
                // parse response to JSON();
                // Call addFileToClientFiles on current Client Model
                  // Takes fileId, folderName, folderId as parameters
            // Error: (xhr) =>
                  // Log file Not created
      // Else clientId === false
          //
  // On Success, call AddFileToClientFiles on Clients Collections
  // Trigger Change on File Model
  // ----------------------------

  addSubFileToData(fileURL, fileName, folderId, folderName, clientId, clientName) {
    store.files.create({
        fileURL,
        fileName,
        folderId,
        folderName,
        clientId,
        clientName,
      }, {
      success: (response) => {
        console.log('subFile saved to Files');
        response = response.toJSON();
        let fileId = response.objectId;
        store.folders.get(response.folderId).addFileToSubFolder(fileId, folderName, folderId);
      },
      error: (xhr) => {
        console.log('subFile NOT saved to Files', xhr);
      }
    });
  },


  // ----------------------------
  //Delete Client Files From Files Table
  //On Success, call deleteClientFilesFromClientFilesCollection on Client Files Collection
  //If no client files in file collection ...
  // ----------------------------

  deleteClientFilesFromFiles(client) {
    console.log(client);
    if (!client.clientFolders || client.clientFolders.length === 0) {
      console.log('clientFolders is null or 0');
      console.log('calling deleteClient');
      store.clients.get(client.objectId).deleteClient(client);
    } else {
      let newClientFolders = client.clientFolders.map((clientFolder, i, arr) => {
        console.log(clientFolder);
        if (clientFolder.folders.folderFiles.length > 0) {
          let newClientFiles = clientFolder.folders.folderFiles.map((folderFile, i, arr) => {
            console.log(folderFile);
            $.ajax({
              type: 'DELETE',
              url: `https://api.backendless.com/v1/data/Files/${folderFile.files.objectId}`,
              success: () => {
                $.ajax({
                  type: 'DELETE',
                  url: `https://api.backendless.com/v1/data/FolderFiles/${folderFile.objectId}`,
                  success: () => {
                    $.ajax({
                      type: 'DELETE',
                      url: clientFolder.folders.folderURL,
                      success: () => {
                        console.log('clientFolder deleted from File Storage');
                        $.ajax({
                          type: 'DELETE',
                          url: `https://api.backendless.com/v1/data/Folders/${clientFolder.folders.objectId}`,
                          success: () => {
                            console.log('clientFolder deleted from Folders');
                            $.ajax({
                              type: 'DELETE',
                              url: `https://api.backendless.com/v1/data/ClientFolders/${clientFolder.objectId}`,
                              success: (response) => {
                                console.log(response);
                                console.log('clientFolder deleted from ClientFolders');
                                store.clients.get(client.objectId).deleteClient(client);
                              }
                            });
                          }
                        });
                      }
                    });
                  }
                });
              }
            });
          });
        } else {
          $.ajax({
            type: 'DELETE',
            url: clientFolder.folders.folderURL,
            success: () => {
              console.log('clientFolder deleted from File Storage');
              $.ajax({
                type: 'DELETE',
                url: `https://api.backendless.com/v1/data/Folders/${clientFolder.folders.objectId}`,
                success: () => {
                  console.log('clientFolder deleted from Folders');
                  $.ajax({
                    type: 'DELETE',
                    url: `https://api.backendless.com/v1/data/ClientFolders/${clientFolder.objectId}`,
                    success: (response) => {
                      console.log(response);
                      console.log('clientFolder deleted from ClientFolders');
                      store.clients.get(client.objectId).deleteClient(client);
                    }
                  });
                }
              });
            }
          });
        }
      });
    }
  },



  // ----------------------------
  // ----------------------------

  deleteSubFolderFiles(clientFolder) {
    console.log(clientFolder);
    if(!clientFolder.folders.folderFiles || clientFolder.folders.folderFiles.length === 0) {
      console.log('clientFiles is null or 0');
      console.log('calling deleteClientFolder');
      $.ajax({
        type: 'DELETE',
        url: `https://api.backendless.com/v1/data/ClientFolders/${clientFolder.objectId}`,
        success: () => {
          console.log('clientFolder deleted from ClientFolders');
          store.folders.get(clientFolder.folders.objectId).deleteClientFolder(clientFolder);
        }
      });
    } else {
      if (clientFolder.folders.folderFiles.length > 0) {
        let newClientFiles = clientFolder.folders.folderFiles.map((folderFile, i, arr) => {
          console.log(folderFile);
          $.ajax({
            type: 'DELETE',
            url: `https://api.backendless.com/v1/data/Files/${folderFile.files.objectId}`,
            success: () => {
              console.log('clientFiles deleted from Files');
              $.ajax({
                type: 'DELETE',
                url: `https://api.backendless.com/v1/data/FolderFiles/${folderFile.objectId}`,
                success: () => {
                  console.log('clientFolderFiles deleted from FolderFiles')
                      $.ajax({
                        type: 'DELETE',
                        url: `https://api.backendless.com/v1/data/Folders/${clientFolder.folders.objectId}`,
                        success: () => {
                          console.log('clientFolder deleted from Folders');
                          $.ajax({
                            type: 'DELETE',
                            url: `https://api.backendless.com/v1/data/ClientFolders/${clientFolder.objectId}`,
                            success: (response) => {
                              console.log(response);
                              console.log('clientFolder deleted from ClientFolders');
                              store.folders.trigger('change');
                            }
                          });
                        }
                      });
                    }
                  });
                }
              });
        });
      } else {
        $.ajax({
          type: 'DELETE',
          url: `https://api.backendless.com/v1/data/Folders/${clientFolder.folders.objectId}`,
          success: () => {
            console.log('clientFolder deleted from Folders');
            $.ajax({
              type: 'DELETE',
              url: `https://api.backendless.com/v1/data/ClientFolders/${clientFolder.objectId}`,
              success: (response) => {
                console.log(response);
                console.log('clientFolder deleted from ClientFolders');
              }
            });
          }
        });
      }
    }
  },



  // ----------------------------
  // deleteFolderFile()
  // Delete File from Files
        // Success: () =>
            // Log file deleted from Files
        // Error: () =>
          // Log file NOT deleted from Files
  // ----------------------------


  deleteFolderFile(folderFile) {
    console.log(folderFile);
    $.ajax({
      type: 'DELETE',
      url: `https://api.backendless.com/v1/data/Files/${folderFile.files.objectId}`,
      success: () => {
        console.log('Folder File deleted from Files');
        $.ajax({
          type: 'DELETE',
          url: `https://api.backendless.com/v1/data/FolderFiles/${folderFile.objectId}`,
          success: () => {
            console.log('FolderFile deleted from FolderFiles');
          }
        });
      }
    });

  }
});




    // ----------------------------
    // ----------------------------
