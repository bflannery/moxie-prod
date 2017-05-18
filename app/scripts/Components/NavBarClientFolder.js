import React from 'react';
import createReactClass from 'create-react-class';
import {Link} from 'react-router';
import store from '../store';
import $ from 'jquery';


let NavBarClientFolder = createReactClass({
  render() {
  if(this.props.clientFolder) {
    return (
        <li className = "nav-client-folder">
          <Link to={`/folders/${this.props.clientFolder.folders.objectId}`} onClick={this.reloadWindow} className="nav-client-folder-link">
            <i className="fa fa-folder navbar-icon" aria-hidden="true"></i><span> {this.props.clientFolder.folders.folderName} </span>
          </Link>
      </li>
      );
  } else {
    return (
      <div />
    );
  }
},

reloadWindow() {
  window.location.reload();
}
  });

export default NavBarClientFolder;
