import React from 'react';
import {browserHistory} from 'react-router';
import { Link } from 'react-router';

import store from '../../store';
import Header from '../Header';
import Sidebar from './Sidebar';
import NavSideBar from './NavSideBar';
import Files from '../Files';

export default React.createClass({

    getInitialState() {
      return {
        files: store.files.toJSON(),
        clients: store.clients.toJSON(),
        session: store.session.toJSON(),
      };
    },

    componentDidMount() {
      store.files.fetch();
      store.files.on('update change', this.updateState);

      store.clients.fetch();
      store.clients.on('update change', this.updateState);

      store.session.fetch();
      store.session.on('update change', this.updateState);
    },

    componentWillUnmount() {
      store.files.off('update change', this.updateState);
      store.clients.off('update change', this.updateState);
      store.session.off('update change', this.updateState);

    },

    updateState() {
      this.setState({
        files: store.files.toJSON(),
        clients: store.clients.toJSON(),
        session: store.session.toJSON(),

      });
    },
    render() {

      console.log(this.state);
    return (
      <div className="files-container">
        <Header/>
        <div className="main-container">
            <div className="main primary-container">
              <h2> Files </h2>
              <Files files={this.state.files} clients={this.state.clients}/>
            </div>
              <NavSideBar session={this.state.session}/>
              <Sidebar session={this.state.session} files={this.state.files}/>
              </div>
          </div>

    );
  }
});
