import React from 'react';
import createReactClass from 'create-react-class';
import {Link} from 'react-router';
import store from '../store';
import $ from 'jquery';


let ClientFile = createReactClass({
  render() {
    let fileLink;

    fileLink = (
      <div>
      <Link to={this.props.file.fileUrl} target="_blank" className="file-link">
        <div className ="file-filesPage-container">
        <i className="fa fa-file-o file-icon" aria-hidden="true"></i>
        <span> {this.props.file.fileName} </span>
        </div>
      </Link>
      </div>
    );

  return (
    <li className="client-file">
      {fileLink}
    </li>
  );

}
});

export default ClientFile;
