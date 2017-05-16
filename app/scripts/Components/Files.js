import React from 'react';
import FileSingle from './FileSingle';

export default React.createClass({
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
