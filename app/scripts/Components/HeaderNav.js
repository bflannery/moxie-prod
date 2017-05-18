import React from 'react';
import createReactClass from 'create-react-class';
import {browserHistory, Link} from 'react-router';
import SearchBar from './SearchBar';
import Logout from './Logout';
import store from '../store';


let HeaderNav = createReactClass({
  render() {
    return (
      <div className="headerNav-container">
        <SearchBar client={this.props.client} session={this.props.session}/>
        <Logout />
      </div>
    );
  }
});

export default HeaderNav;
