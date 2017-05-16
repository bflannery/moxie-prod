import React from 'react';
import {browserHistory} from 'react-router';
import { Link } from 'react-router';

import store from '../../store';
import Client from '../../Models/clientModel';
import ClientFiles from '../ClientFiles';
import SearchFiles from '../SearchFiles';

import Header from '../Header';
import Sidebar from './Sidebar';
import NavSideBar from './NavSideBar';


export default React.createClass({


  getInitialState() {
    return {
        clients: store.clients.toJSON(),
        session: store.session.toJSON(),
        files: store.files.toJSON(),
        client: {}
    };
  },


  componentDidMount() {
      store.clients.fetch();
      store.clients.on('uppdate change', this.updateState);

      store.files.fetch();
      store.files.on('update change', this.updateState);

      store.session.fetch();
      store.session.on('update change', this.updateState);

      let client = store.clients.get(sessionStorage.client);
      if(!client) {
          client = new Client({objectId: sessionStorage.client});
      }

      client.fetch();
      client.on('update change', this.updateState);


  },

  componentWillUnmount() {
    store.clients.get(sessionStorage.client).off('update change', this.updateState);
    store.session.off('update change', this.updateState);
    store.clients.off('update change', this.updateState);
    store.files.off('update change', this.updateState);
  },

  updateState() {
    if(store.clients.get(sessionStorage.client) !== undefined) {
    this.setState({
      client: store.clients.get(sessionStorage.client).toJSON()
    });
  }
    this.setState({
      session: store.session.toJSON(),
      clients: store.clients.toJSON(),
      files: store.files.toJSON()
    });
  },


      render() {
        console.log(this.state);
        console.log(this.props);
        return (
          <div className="client-files-page">
            <Header session={this.state.session} client={this.state.client}/>
            <div className="main-container">
              <div className="main primary-container">
               <h2> Search Results </h2>
                <SearchFiles searchTerm={this.props.params.search} files={this.state.files} clientId={this.state.client.objectId}/>
                </div>
                <NavSideBar session={this.state.session} client={this.state.client}/>
                <Sidebar session={this.state.session} files={this.state.files}/>
              </div>

          </div>
        );
  },
});