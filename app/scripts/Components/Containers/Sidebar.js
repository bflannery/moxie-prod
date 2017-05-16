import React from 'react';
import {browserHistory} from 'react-router';
import store from '../../store';

export default React.createClass({


  render() {
    console.log(this.props);
    let sideBar;

    if(this.props.session.auth === false) {
      if(this.props.clientId) {
       sideBar= (
         <div className = "sidebar-button-container">
         <button className="side-button all-files-button" onClick={this.allFiles}>All Files</button>
       </div>
     );
   } else if(this.props.folder) {
        sideBar = (
        <div className = "sidebar-button-container">
          <button className="side-button back-button" onClick={this.goBack}>Back</button>
          <button className="side-button all-files-button" onClick={this.allFiles}>All Files</button>
        </div>
        );
      } else {
        sideBar = <div />;
      }

    } else if(this.props.session.auth === true){
        if(this.props.clientId) {
          sideBar = (
          <div className = "sidebar-button-container">
            <button className="side-button back-button" onClick={this.goBack}>Back</button>
            <button className="side-button add-client-button" onClick={this.toggleNewFolder}>Add Folder</button>
            <button className="side-button add-image-button" onClick={this.imageModal}> Add Client Logo </button>
          </div>
        );
      } else if (this.props.folder){
        sideBar = (
          <div className = "sidebar-button-container">
          <button className="side-button back-button" onClick={this.goBack}>Back</button>
          <button className="side-button add-file-button" onClick={this.dropZoneModal}> Add Files </button>
          </div>
        );
      } else {
      sideBar = (
        <div className = "sidebar-button-container">
          <button className="side-button add-client-button" onClick={this.toggleNewFolder}>Add Client</button>
        </div>
      );
    }
  }
    return(
        <aside className="sidebar sidebar-2">
        {sideBar}
        </aside>

    );
  },

//toggleNewClient
  //Set addFolder : true through Session Model

  toggleNewFolder(e) {
    store.session.set({ addFolder: true });
  },

  dropZoneModal(e) {
    store.session.set({ addFileModal: true});
  },

  imageModal(e) {
    store.session.set({ addPhotoModal: true});
  },

  goBack(e){
    browserHistory.goBack();
  },

  allFiles(e) {
    if(this.props.clientId) {
    browserHistory.push('/client-files/' + this.props.clientId);
  } else {
    browserHistory.push('/client-files/' + this.props.folder.clientId);
  }
  }
});
