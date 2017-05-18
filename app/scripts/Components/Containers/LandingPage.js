import React from 'react';
import createReactClass from 'create-react-class';
import Login from '../Login';

let LandingPage = createReactClass({
  render() {
    return (
      <div className="landingPage-container">
        <Login/>
      </div>
    );
  }
});

export default LandingPage
