import React from 'react';
import createReactClass from 'create-react-class';
import {browserHistory , Link} from 'react-router';
import store from '../../store';
import NavBarClientFolders from '../NavBarClientFolders';

let NavSideBar = createReactClass({
  render() {
    console.log(this.props);
    let navBar;
    if(this.props.session.auth === false) {

      if(this.props.client) {

        navBar = (
          <div className="navSideBar-folders-container">
          <h5> Your Folders </h5>
          <div className="nav-client-folder">
          <Link to={`/clients/${this.props.client.objectId}`}  className="nav-client-folder-link">
            <i className="fa fa-home navbar-icon" aria-hidden="true"></i><span className="nav-home"> Home </span>
          </Link>
          </div>
          <NavBarClientFolders clientFolders={this.props.client.clientFolders}/>
          </div>
        );
      } else {
        navBar = <div />;
      }
    } else {
        navBar = (
          <ul className = "navSideBar-links-container">
            <Link to="/home" onClick={this.resetState} className ="navSideBar-links"><i className="fa fa-users navbar-icon" aria-hidden="true"></i>Clients</Link>
            <Link to="/files" onClick={this.resetState} className="navSideBar-links"><i className="fa fa-files-o navbar-icon" aria-hidden="true"></i>Files</Link>
            </ul>
        );
    }
    return(
        <nav className = "sidebar sidebar-1">
        {navBar}
        </nav>
    );

  },

  resetState() {
    store.client.set({addFolder: false});
    store.client.set({addFileModal: false});
    store.session.set({addFolder: false});
    store.session.set({addFileModal: false});
  }
});

export default NavSideBar;



//<Link to="/recent" onClick={this.resetState} className ="navSideBar-links">Recent</Link>
//<Link to="/trash" onClick={this.resetState} className ="navSideBar-links">Trash</Link>
