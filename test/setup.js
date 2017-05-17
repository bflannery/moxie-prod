// The imports below will handle chai-enzyme testing
import chai from 'chai';
import chaiEnzyme from 'chai-enzyme';
// import jsdom from 'jsdom';

// expect is imported for standard testing
// import { expect } from 'chai';

//shallow is imported for React shallow rendering for testing virtual dom rendering
// import { shallow } from 'enzyme';

//React is is imported for jsx syntax for shallow rendering
// import React from 'react';

//chaiEnzynme is invoked to fulfill final install of the chai-enzyme lib
chai.use(chaiEnzyme());



var LocalStorage = require('node-localstorage').LocalStorage;
require('babel-register')();
const jsdom = require('jsdom').jsdom;
const exposedProperties = ['window', 'navigator', 'document']; global.document = jsdom('');
global.window = document.defaultView;
Object.keys(document.defaultView).forEach(property => {
  if (typeof global[property] === 'undefined') {
    exposedProperties.push(property);
    global[property] = document.defaultView[property];
  }
});
global.navigator = { userAgent: 'node.js' };
global.window.localStorage = {
  'user-token': 'test'
};
