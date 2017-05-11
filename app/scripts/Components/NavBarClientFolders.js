import React from 'react';
import NavBarClientFolder from './NavBarClientFolder';

import store from '../store';

export default React.createClass({
  render() {
    console.log(this.props);

    let navBarClientFolders;

    if(this.props.clientFolders === undefined || this.props.clientFolders.length === 0) {

      navBarClientFolders = <div />;
    } else {
      let sortedFolder = this.props.clientFolders.sort(function(a,b) {return (a.folderName > b.folderName) ? 1 : ((b.folderName > a.folderName) ? -1 : 0);} );
      console.log(sortedFolder)
      
      navBarClientFolders = this.props.clientFolders.map((clientFolder, i, arr) => {

        return <NavBarClientFolder key={i} clientFolder={clientFolder}/>
      });
    }

    return (
      <ul className ="secondary-container">
        {navBarClientFolders}
      </ul>
    );
  }
});
