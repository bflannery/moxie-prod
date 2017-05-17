import React from 'react';
import {browserHistory} from 'react-router';
import store from '../store';

export default React.createClass({


  render() {
    return (

        <form className="searchBar-form" onSubmit={this.searchFiles}>
          <input type="text" ref="searchFile" className="searchBar-input" placeholder="Search Files..." tabIndex="1"/>
          <input className="search-submit" type="submit" value="search" role="button" tabIndex="2"/>
          <i className="search-icon fa fa-search" aria-hidden="true" onClick={this.searchHandler}></i>
        </form>
    );
  },

  searchFiles(e) {
    e.preventDefault();
    if(!this.props.client) {
      let searchFile = this.refs.searchFile.value.toLowerCase();
      console.log(searchFile);
      browserHistory.push(`/files/search/${searchFile}`)
    } else {
      let searchFile = this.refs.searchFile.value.toLowerCase();
      let client = this.props.client.objectId
      sessionStorage.searchTerm = searchFile;
      sessionStorage.client = client;
      browserHistory.push(`/files/search/${searchFile}`)
  }

  }


  });
