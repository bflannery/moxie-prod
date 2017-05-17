import React from 'react';
import SearchFile from './SearchFile';

export default React.createClass({
  render() {
    let clientFiles;

    if(!this.props.files) {
      clientFiles = <div />
    } else {
      if(!this.props.clientId) {
        clientFiles = this.props.files.map((file,i,arr)=> {
          let fileName = file.fileName.toLowerCase();
          console.log(fileName)
          if(fileName.includes(this.props.searchTerm)) {
            return <SearchFile key={i} file={file} />
          }
        });
      } else {
      clientFiles = this.props.files.map((file , i, arr)=> {
        let fileName = file.fileName.toLowerCase();

        if(file.clientId === this.props.clientId) {
          if(fileName.includes(this.props.searchTerm)) {
              return <SearchFile key={i} file={file} clientId={this.props.clientId}/>
            }
          }
        });
      }
    }

    return (
      <ul className="secondary-container">
      {clientFiles}
      </ul>
    );
  }

});
