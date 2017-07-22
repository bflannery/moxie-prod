import Backbone from 'backbone';
import $ from 'jquery';
import {
    browserHistory
} from 'react-router';
import store from '../store';

export default Backbone.Model.extend({
    url: 'https://api.backendless.com/v1/data/Clients',
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
    // addFileToClientFiles()
    // Add File To ClientFiles Data Table
    // Take fileId and folderName as parameters
    // Save clientFiles object on clientFiles table
    // Success: () =>
        //Log File Added
        //Trigger Change to Files Collection
    // Error: () =>
        //Log Error
    // Trigger Update To Client for ClientHome render
    // Push to ClientHome
    // ----------------------------

    addFileToClientFiles(fileId, folderName) {
        this.save({
            clientFiles: this.get('clientFiles').concat([{
                ___class: 'ClientFiles',
                folderName: folderName,
                files: {
                    ___class: 'Files',
                    objectId: fileId,
                }
            }]),
        }, {
            success: (response) => {
              console.log('file added to clientFiles');
                store.files.trigger('change');
            },
            error: (xhr) => {
              console.log('error saving clientFile', xhr);
            }
        });
    },



    // ----------------------------
    // addFolderToClientFolders()
    // All Folder To ClientFolders Data Table
    // Takes subFolderId, folderName, clientId as parameters
    // Save clientFolders object on clienFolders table
        // If clientFolders[] === true
            // Get clientFolders[] and add thie clientFolder to it
        // Else clientFolders[] === false
            // Create clientFolders []
            // Update Client with new clientFolders
                  // Success: () =>
                      // Log Folder added
                      // Trigger change
                      // Set session.addFolder === false
                      // push browser to folder
                  // Error: () =>
    // Trigger Update To Client for ClientHome render
    // Push to ClientHome
    // ----------------------------

    addFolderToClientFolders(subFolderId, folderName, clientId) {
      let clientFolders;
      if(this.get('clientFolders')) {
          clientFolders = this.get('clientFolders').concat([
            {
              ___class: 'ClientFolders',
              folderName: folderName,
              folders: {
                  ___class: 'Folders',
                  objectId: subFolderId,
                }

            }]);
        } else {
          clientFolders = [{
            ___class: 'ClientFolders',
            folderName: folderName,
            folders: {
                ___class: 'Folders',
                objectId: subFolderId,
              }
          }];
        }
        $.ajax({
          type: 'PUT',
            url: `https://api.backendless.com/v1/data/Clients/${clientId}`,
            contentType: 'application/json',
            data: JSON.stringify({
                clientFolders
            }),
            success: (response) => {
              console.log('added folder to clientFolders');
                this.trigger('change');
                store.session.set({
                    addFolder: false
                });
                browserHistory.push('/folders/' + subFolderId);

            },
            error: (xhr) => {
                console.log('clientFolder not added to Client' , xhr);
            }
        });
    },



    // ----------------------------
    // deleteFileFromClient()
    // Delete File From ClientFiles Data Table
    // Takes clientFileId as a parameter
    // Filer clientFiles and save to newClientFiles[]
        // if clientFileID does NOT eqaul clientFiles ID
            // return true
        // Save clientFiles to newClientFiles[]
            // Success: () =>
                  // Delete clientFile from ClientFiles table
                        //Success: () =>
                            // Log clientFile deleted from ClientFiles table
                        //Error: (xhr) =>
                            // Log clientFile deleted from ClientFiles table
            // Error: () =>
    // ----------------------------

    deleteFileFromClient(clientFileId) {
        let newClientFiles = this.get('clientFiles').filter((clientFile, i, arr) => {
            if (clientFileId !== clientFile.objectId) {
                return true;
            }
        });
        this.save({
            clientFiles: newClientFiles
        }, {
            success: () => {
                $.ajax({
                    type: 'DELETE',
                    url: `https://api.backendless.com/v1/data/ClientFiles/${clientFileId}`,
                    success: () => {
                        console.log('clientFile deleted from ClientFiles');
                    },
                    error: (xhr) => {
                        console.log('clientFile not deleted from ClientFiles', xhr);
                    }
                });
            }
        });
    },



    // ----------------------------
    // deleteFolderFromClient()
    // Delete Folder From ClientFolders Data Table
    // Takes clientFolderId as a parameter
    // Filer clientFolders and save to newClientFolders[]
        // if clientFoldersID does NOT eqaul clientFolders ID
            // return true
        // Save clientFolders to newClientFolders[]
            // Success: () =>
                  // Delete clientFolder from ClientFolder table
                        //Success: () =>
                            // Log clientFolder deleted from ClientFolders table
                        //Error: (xhr) =>
                            // Log clientFolder NOT deleted from ClientFolders table
            // Error: () =>
    // ----------------------------

    deleteFolderFromClient(clientFolderId) {
        let newClientFolders = this.get('clientFolders').filter((clientFolder, i, arr) => {
            if (clientFolderId !== clientFolder.objectId) {
                return true;
            }
        });
        this.save({
            clientFolders: newClientFolders
        }, {
            success: () => {
                $.ajax({
                    type: 'DELETE',
                    url: `https://api.backendless.com/v1/data/ClientFolders/${clientFolderId}`,
                    success: () => {
                        console.log('clientFolder deleted from ClientFolders');
                    },
                    error: (xhr) => {
                        console.log('clientFolder not deleted from ClientFolders', xhr);
                    }
                });
            }
        });
    },



    // ----------------------------
    // deleteClient()
    // Delete Client From Clients Table
    // Takes a client parameter
    // Deletes client from Clients table
        // Success: () =>
            // Log client deleted
        // Error: (xhr) =>
          // Log client Not deleted
    // Triggers('change')
    // ----------------------------

    deleteClient(client) {
      this.destroy({url: `https://api.backendless.com/v1/data/Clients/${client.objectId}`},
        {
            success: () => {
                console.log('client deleted!');
            },
            error: (xhr) => {
                console.log('client was NOT deleted!', xhr);
            }
        });
    },



    // ----------------------------
    // addClientLogo()
    // Takes a fileUrl as a parameter
    // Save photo and update Client
        // Success: () =>
          // Log client logo saved
        // Error: () =>
          // Log client logo not saved
    // ----------------------------

    addClientLogo(clientLogo, clientId){
      $.ajax({
        type: 'PUT',
          url: `https://api.backendless.com/v1/data/Clients/${clientId}`,
          contentType: 'application/json',
          data: JSON.stringify({
              clientLogo
          }),
        success: () => {
          console.log('Client logo Saved');
          window.location.reload();
      },
        error: (xhr)=> {
          console.log('Client logo not Saved' , xhr);
      }
    });

    }
});


// ----------------------------
// ----------------------------
