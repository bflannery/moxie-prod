import React from 'react';
import createReactClass from 'create-react-class';
import {Link} from 'react-router';
import store from '../store';

let UploadFile = createReactClass({
  render() {

      if(this.props.file.name) {
        return (
      <div>
        <i className="fa fa-file-o dropzone-file-icon" aria-hidden="true"></i>
        <span className="file-name"> {this.props.file.name} </span>
      </div>
    );
  } else {
    return (
      <div />
    );
  }
  }
});

export default UploadFile;
