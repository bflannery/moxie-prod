import React from 'react';
import {browserHistory, Link} from 'react-router';
import SearchBar from './SearchBar';
import Logout from './Logout';
import store from '../store';
import HeaderNav from './HeaderNav';


export default React.createClass({
  render() {
    return (
      <div className="headerNav-container">
        <SearchBar client={this.props.client} session={this.props.session}/>
        <Logout />
      </div>
    );
  }
});
