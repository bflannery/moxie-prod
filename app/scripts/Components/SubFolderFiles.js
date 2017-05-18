import React from 'react';
import createReactClass from 'create-react-class';
import SubFolderFile from './SubFolderFile';

let SubFolderFiles = createReactClass({
  render() {
    let subFolderFiles;

    if(!this.props.folder.folderFiles || this.props.folder.folderFiles.length === 0) {
      subFolderFiles = <div className="empty-folder"> <h4> There Are No Files Yet! </h4> </div>
    } else {

      let folderFiles = this.props.folder.folderFiles;
      subFolderFiles = folderFiles.map((file, i, arr)=> {
        if(file.files.folderId === this.props.folder.objectId) {
      return <SubFolderFile key={i} file={file} clientId={this.props.folder.clientId} session={this.props.session}/>
    }
  });
}

    return (
      <ul className ="secondary-container">
        {subFolderFiles}
      </ul>
    );
  }
});

export default SubFolderFiles;
