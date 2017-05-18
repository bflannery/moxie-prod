import React from 'react';
import createReactClass from 'create-react-class';
import FileSingle from './FileSingle';

let Files = createReactClass({
  render() {

    let allFiles = this.props.files.map((file , i, arr)=> {
      return <FileSingle key={i} file={file} clients={this.props.clients}/>
  });

    return (
      <ul className="secondary-container">
      {allFiles}
      </ul>
    );
  }

});

export default Files;
