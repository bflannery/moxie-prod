import React from 'react';
import createReactClass from 'create-react-class';
import ClientItem from './ClientItem';

let ClientItems = createReactClass({
  render() {
  let allItems = [];
    let folders = this.props.client.clientFolders;
    let files = this.props.client.clientFiles;
    allItems = allItems.concat(files, folders);

    let allClientItems =  allItems.map((item , i, arr)=> {
      return <ClientItem key={i} item={item} client={this.props.client} session={this.props.session}/>
    });

    return (
      <div className="all-client-items">
      {allClientItems}
      </div>
    );
  }

});

export default ClientItems;
