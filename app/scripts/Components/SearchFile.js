import React from 'react';
import createReactClass from 'create-react-class';
import {Link} from 'react-router';
import store from '../store';
import $ from 'jquery';


let SearchFile = createReactClass({
  render() {
    let fileLink;


if(this.props.clientId) {
  fileLink = (
    <div>
      <Link to={this.props.file.fileUrl} target="_blank" className="file-link">
        <div className= "folder-filesPage-container">
          <i className="fa fa-folder-o folder-icon" aria-hidden="true"></i>
          <span> {this.props.file.folderName}</span>
        </div>
      /
        <div className ="file-filesPage-container">
          <i className="fa fa-file-o file-icon files-page" aria-hidden="true"></i>
          <span> {this.props.file.fileName} </span>
        </div>
      </Link>
    </div>
  );
} else {
    fileLink = (
      <div>
      <Link to={this.props.file.fileUrl} target="_blank" className="file-link">
        <div className= "client-filesPage-container">
        <i className="fa fa-folder-o folder-icon" aria-hidden="true"></i>
        <span> {this.props.file.clientName}</span>
        </div>
        /
      <div className= "folder-filesPage-container">
        <i className="fa fa-folder-o folder-icon" aria-hidden="true"></i>
        <span> {this.props.file.folderName}</span>
        </div>
        /
        <div className ="file-filesPage-container">
        <i className="fa fa-file-o file-icon files-page" aria-hidden="true"></i>
        <span> {this.props.file.fileName} </span>
        </div>
      </Link>
      </div>
    );
}
  return (
    <li className="client-file">
      {fileLink}
    </li>
  );

}
});

export default SearchFile;
