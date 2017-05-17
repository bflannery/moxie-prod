import {browserHistory} from 'react-router';
import Backbone from 'backbone';
import $ from 'jquery';
import config from '../config';
import store from '../store';

export default Backbone.Model.extend({

initialize() {
  if (window.localStorage.getItem('user-token')) {
			this.set({
        'user-token': window.localStorage['user-token'],
        'company': window.localStorage.company,
        'email' : window.localStorage.email
      });
      if(window.localStorage.company === 'wemoxie') {
        this.set({auth: true});
        }
      }
    },


  url: 'https://api.backendless.com/v1/data/Users',
  idAttribute: 'objectId',
  defaults: {
    auth: false,
    passwordReset: null,
    addFileModal: false,
    addFolder: false,
    addPhotoModal: false,
    email: '',
    company: '',
  },



  // ----------------------------
  // validatePassword()
  // Validate User Password
  // Takes password, confirmPassword as parameters
  // If the passwords match
        // return true;
  // ----------------------------

  validatePassword(password, confirmPassword) {
      if (password === confirmPassword) return true;
      return false;
  },



// ----------------------------
// register()
// Register New User
// Takes email, password, company as parameters
// Save new User Object
      // Success: () =>
          // Log User Registered
          // Call login()
          // Takes email and password as parameters
      // Error: () =>
          // Log User NOT Registered
// ----------------------------

  register(email, password, company){
    this.save({
      email, password, company},{
      url:'https://api.backendless.com/v1/users/register'
    })
    .done((response)=> {
      console.log('User Registered');
      this.login(email, password);
    })
    .fail((xhr)=> {
      console.log('User NOT Registered' , xhr);
    });
  },



// ----------------------------
// login()
// Log In Existing User
// Takes login and password as parameters
// Save login object with login, password
    // Success: () =>
        // Store response items on LocalStorage
        // If Wemoxie Email
            // Set auth === true
            // Log Logging in as Super User
            // Push browser to /home
        // Else Other Email
            // Set auth === false
            // Log Logging in as Client
            // Call getClients on Clients Collection
    // Error: () =>
        // Not Logged In
// ----------------------------

  login(login, password){
    this.save({ login, password }, {
      type: 'POST',
      url: 'https://api.backendless.com/v1/users/login'
    }).done((response)=> {
      window.localStorage.setItem('company', response.company);
      window.localStorage.setItem('user-token',response['user-token']);
      window.localStorage.setItem('ownerId',response.ownerId);

      if(response.email.toLowerCase().includes('wemoxie')) {
          console.log('Logging in as Super User');
          this.set({auth: true});
          browserHistory.push('/home');
        } else {
          this.set({auth: false});
          console.log('Logging in as Client');
          store.clients.getClients(response.company);
        }
      }).fail((xhr)=>{
        console.log('Not Logged In' , xhr);
      });
    },

// ----------------------------
// logout()
// Success: () =>
      // Log Logged Out
      // Clear all instances of Session
      // Push Browser to LandingPage
// Error: () =>
      // Log Not Logged Out

// ----------------------------

  logout(){
    $.ajax({
      contentType: 'application/json',
      url: 'https://api.backendless.com/v1/users/logout',
      success: ()=> {
        console.log('Logged Out');
        this.clear();
        window.localStorage.clear();
        window.sessionStorage.clear();
        browserHistory.push('/');
      },
      error: (xhr) => {
        console.log('Not Logged Out', xhr);
      }
    });
  },

// ----------------------------
// Send Password to Existing User
// ----------------------------

// forgotPassword(email) {
//       $.ajax({
//         url:`https://api.backendless.com/v1/users/restorepassword/${email}`,
//         success:(response)=>{
//         }
//       });
//     },
});

// ----------------------------
// Success: () =>
// Error: () =>
// ----------------------------
