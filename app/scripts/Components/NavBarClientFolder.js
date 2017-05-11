import React from 'react';
import {Link} from 'react-router';
import store from '../store';
import $ from 'jquery';


export default React.createClass({
  render() {
    console.log(this.props);
  if(this.props.clientFolder) {
    return (
        <li className = "nav-client-folder">
          <Link to={`/folders/${this.props.clientFolder.folders.objectId}`} onClick={this.reloadWindow} className="nav-client-folder-link">
            <i className="fa fa-folder navBar-icon" aria-hidden="true"></i><span> {this.props.clientFolder.folders.folderName} </span>
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
