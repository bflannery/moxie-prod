import React from 'react';
import SearchFile from './SearchFile';

export default React.createClass({
  render() {

    console.log(this.props);
    let clientFiles;
    if(!this.props.files) {
      clientFiles = <div />
    } else {
      clientFiles = this.props.files.map((file , i, arr)=> {
        console.log(file)
      if(file.fileName === this.props.searchTerm + '.pdf') {
      return <SearchFile key={i} file={file}/>
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
