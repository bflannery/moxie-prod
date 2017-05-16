import React from 'react';
import {browserHistory, Link} from 'react-router';
import SearchBar from './SearchBar';
import Logout from './Logout';
import store from '../store';
import HeaderNav from './HeaderNav';


export default React.createClass({
  render() {
    return (
      <div className="header">
        <div className="header-logo-container">
         <img src="../../assets/images/wemoxie_logo.png" height="125px" width="150px"/>
        </div>
        <HeaderNav session={this.props.session} client={this.props.client} />
      </div>
    );
  }
});
