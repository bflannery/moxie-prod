import React from 'react';
import createReactClass from 'create-react-class';
import {browserHistory} from 'react-router';
import { Link } from 'react-router';

import store from '../../store';
import Client from '../../Models/clientModel';
import ClientFiles from '../ClientFiles';

import Header from '../Header';
import Sidebar from './Sidebar';
import NavSideBar from './NavSideBar';


let ClientFilesPage = createReactClass({


  getInitialState() {
    return {
        client: {
          clientFolders: []
        },
        clients: store.clients.toJSON(),
        session: store.session.toJSON(),
        files: store.files.toJSON()
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
    if(store.clients.get(this.props.params.id) !== undefined) {
    this.setState({
      client: store.clients.get(this.props.params.id).toJSON()
    });
  }
    this.setState({
      session: store.session.toJSON(),
      clients: store.clients.toJSON(),
      files: store.files.toJSON()
    });
  },


      render() {
        return (
          <div className="client-files-page">
            <Header />
            <div className="main-container">
            <div className="main primary-container">
              <h2> {this.state.client.clientName} </h2>
              <ClientFiles files={this.state.files} client = {this.state.client}/>
            </div>

            <NavSideBar session={this.state.session} client={this.state.client}/>
            <Sidebar session={this.state.session} clientId={this.props.params.id}/>
          </div>
          </div>
        );
  },
});

export default ClientFilesPage;
