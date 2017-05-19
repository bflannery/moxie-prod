import React from 'react';
import createReactClass from 'create-react-class';
import {browserHistory} from 'react-router';
import { Link } from 'react-router';

import store from '../../store';
import Client from '../../Models/clientModel';

import ClientFolders from '../ClientFolders';
import DropzoneModal from '../DropzoneModal';
import Header from '../Header';
import Sidebar from './Sidebar';
import NavSideBar from './NavSideBar';
import NewClientForm from '../NewClientForm';
import ImageModal from '../ImageModal';

let MoxieClientHome = createReactClass({


  getInitialState() {
    return {
        client: {
          clientFolders: []
        },
        clients: store.clients.toJSON(),
        session: store.session.toJSON(),
    };
  },


  componentDidMount() {
      store.clients.fetch();
      store.clients.on('uppdate change', this.updateState);

      store.files.fetch();
      store.files.on('update change', this.updateState);

      store.session.fetch();
      store.session.on('update change', this.updateState);

      let client = store.clients.get(this.props.params.id);
      if(!client) {
          client = new Client({objectId: this.props.params.id});

      }

      client.fetch();
      client.on('update change', this.updateState);



  },

  componentWillUnmount() {
    store.clients.get(this.props.params.id).off('update change', this.updateState);
    store.session.off('update change', this.updateState);
    store.clients.off('update change', this.updateState);
    store.files.off('update change', this.updateState);
  },

  updateState() {
    window.localStorage.setItem('clientId', this.props.params.id)

    if(store.clients.get(this.props.params.id) !== undefined) {
    this.setState({
      client: store.clients.get(this.props.params.id).toJSON(),

    });
  }
    this.setState({
      session: store.session.toJSON(),
      clients: store.clients.toJSON()
    })
  },



  render() {
    let styles = {
      height: "100px",
      backgroundImage: `url(${this.state.client.pic})`,
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'contain',
    }

   let clientContainer = <div className="main primary-container"/>

    if(this.state.client.clientName) {
      if(!this.state.client.pic) {
          clientContainer = (
            <div className="main primary-container">
              <h2> {this.state.client.clientName} </h2>
              <ClientFolders client={this.state.client} session={this.state.session}/>
            </div>
          );
        } else {
          clientContainer = (
            <div className="main primary-container">
              <div style={styles} className="client-logo"/>
              <ClientFolders client={this.state.client} session={this.state.session}/>
            </div>
          );
          }
        }

    if(this.state.session.addFolder === true) {
              if(!this.state.client.pic) {
                  clientContainer = (
                    <div className="main primary-container">
                      <h2> {this.state.client.clientName} </h2>
                      <NewClientForm client={this.state.client}/>
                      <ClientFolders client={this.state.client} session={this.state.session}/>
                    </div>
                    );
              } else {
                    clientContainer = (
                      <div className="main primary-container">
                        <div style={styles} className="client-logo"/>
                        <NewClientForm client={this.state.client}/>
                        <ClientFolders client={this.state.client} session={this.state.session}/>
                        </div>
                      );
      }
    }

    if(this.state.session.addPhotoModal === true) {
              if(!this.state.client.pic) {
               clientContainer = (
                 <div className="main primary-container">
                   <h2> {this.state.client.clientName} </h2>
                   <ImageModal client={this.state.client}/>
                   <ClientFolders client={this.state.client} session={this.state.session}/>
                 </div>
               );
             } else {
               clientContainer = (
                 <div className="main primary-container">
                   <div style={styles} className="client-logo"/>
                   <ImageModal client={this.state.client}/>
                   <ClientFolders client={this.state.client} session={this.state.session}/>
                 </div>
               );
             }
        }


      return (
        <div className="client-file-page">
          <Header session={this.state.session} client={this.state.client}/>
          <div className="main-container">
          {clientContainer}
          <NavSideBar session={this.state.session} client={this.state.client}/>
          <Sidebar session={this.state.session} clientId={this.props.params.id}/>
        </div>
        </div>
       );
     }
});

export default MoxieClientHome;
