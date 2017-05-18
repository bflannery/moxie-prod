import React from 'react';
import createReactClass from 'create-react-class';
import ClientFolder from './ClientFolder';

import store from '../store';

let ClientFolders = createReactClass({
  render() {


    let clientFolders;
    if(!this.props.client.clientFolders) {
      clientFolders = <div />;
    } else {

      let sortedFolder = this.props.client.clientFolders.sort(function(a,b) {return (a.folderName > b.folderName) ? 1 : ((b.folderName > a.folderName) ? -1 : 0);} );

      clientFolders = sortedFolder.map((clientFolder, i, arr) => {
        return <ClientFolder key={i} clientFolder={clientFolder} session={this.props.session}/>
      });
    }

    return (
      <ul className ="secondary-container">
        {clientFolders}
      </ul>
    );
  }
});

export default ClientFolders;
