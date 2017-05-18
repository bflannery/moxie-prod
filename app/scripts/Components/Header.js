import React from 'react';
import createReactClass from 'create-react-class';
import {browserHistory, Link} from 'react-router';
import SearchBar from './SearchBar';
import Logout from './Logout';
import store from '../store';
import HeaderNav from './HeaderNav';


let Header = createReactClass({
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

export default Header;
