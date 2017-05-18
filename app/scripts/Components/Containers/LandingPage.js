import React from 'react';
import createReactClass from 'create-react-class';
import Login from '../Login';

export default class LandingPage extends React.Component {
  render() {
    return (
      <div className="landingPage-container">
        <Login/>
      </div>
    );
  }
};
