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
    let searchFile = this.refs.searchFile.value
    store.files.searchFiles(searchFile);
    console.log(searchFile);
  }


  });
