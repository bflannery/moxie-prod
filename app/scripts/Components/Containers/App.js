import React from 'react';
import createReactClass from 'create-react-class';
import {browserHistory} from 'react-router';
import Header from '../Header';
import store from '../../store';

let App = createReactClass({
  render() {
    return (
      <div className="app-container">
        {this.props.children}
        <div className="footer-container">
          <span className="copyright"> &copy; 2017 bfproductions </span>
        </div>
      </div>
    );
  }
});

export default App;
