import React from 'react';
import {Link} from 'react-router';
import store from '../store';
import $ from 'jquery';


export default React.createClass({
  render() {
    console.log(this.props);

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
