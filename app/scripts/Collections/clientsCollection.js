import Backbone from 'backbone';
import clientModel from '../Models/clientModel';
import store from '../store';

import $ from 'jquery';
import {browserHistory} from 'react-router';

export default Backbone.Collection.extend({
  model: clientModel,
  url: 'https://api.backendless.com/v1/data/Clients',

  parse(clients) {
    return clients.data;
  },

  // Get All Clients
  // Filter Client based on Client name
  // Push to Client Page

  getClients(company) {
    store.client.set({
      isLoading: true
    })
    company = company.replace(/\s+/g,'').toLowerCase();
    console.log(company);
    $.ajax({
      type: 'GET',
      url: 'https://api.backendless.com/v1/data/Clients',
      success: (clients) => {
        return clients.data.map((client, i ,arr)=>{
          let clientName = client.clientName.replace(/\s+/g,'').toLowerCase();
          console.log(clientName);
            if(clientName === company) {
              store.client.set({
                isLoading: false,
                hasLoaded: true,
              })
              console.log(client.clientName)
              browserHistory.push('/clients/' + client.objectId);
            }
        });
      },
      error: () => {
        alert('Client Does Not Exist, Please try Register again');
      }
      });
    },

    //Delete Client From Clients Collection
    //On Success, trigger change

    deleteClientFromClientsCollections(clientId) {
      // console.log(clientId);
      $.ajax({
        type: 'GET',
        url: 'https://api.backendless.com/v1/data/Clients',
        success: (clients) => {
          return clients.data.filter((client, i ,arr)=>{
            // console.log(client);
            if(client.objectId != clientId) {
              return true;
            } else {
              $.ajax({
                type: 'DELETE',
                url:`https://api.backendless.com/v1/data/Clients/${client.objectId}`,
                success: () => {
                  console.log('client deleted from clients collection');
                },
                error: () => {
                  console.log('client not deleted from clients collections');
                }
              });

            }
          });
        }
      });
        this.trigger('update change');
    },
});
