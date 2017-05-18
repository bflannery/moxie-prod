import React from 'react';
import createReactClass from 'create-react-class';
import ClientFile from './ClientFile';

let ClientFiles = createReactClass({
  render() {
    let clientFiles;
    if(!this.props.files) {
      clientFiles = <div />
    } else {
      clientFiles = this.props.files.map((file , i, arr)=> {
      if(file.clientId === this.props.client.objectId) {
      return <ClientFile key={i} file={file} client={this.props.client}/>
    }
  });
}
    return (
      <ul className="secondary-container">
      {clientFiles}
      </ul>
    );
  }

});

export default ClientFiles;
