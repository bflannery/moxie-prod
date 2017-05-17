import ClientFolderModel from '../../app/scripts/models/clientFolderModel';
import Backbone from 'backbone';

import { expect } from 'chai';

describe('clientFolderModel', () => {
	// make a variable for an instance
	let clientFolderModel;

	// make sure each time we run a test the instance is a fresh model
	beforeEach(() => {
		clientFolderModel = new ClientFolderModel();
	});

	it('should be a function (because it is a constructor)', () => {
		expect(ClientFolderModel).to.be.a('function');
	});

	it('should create an backbone model', () => {
		expect(clientFolderModel).to.be.an.instanceof(Backbone.Model);
	});

	it('should have an attribute id of objectId', () => {
		expect(clientFolderModel).to.have.property('idAttribute');
		expect(clientFolderModel.idAttribute).to.equal('objectId');
	});

  it('should have default object with attributes of name and description', () => {
    expect(clientFolderModel).to.have.property('defaults');
    expect(clientFolderModel.defaults).to.deep.equal({name: '' , description: ''});
  });

  it('should have a deleteClient method', () => {
    expect(clientFolderModel).to.have.property('deleteClient');
    expect(clientFolderModel.deleteClient).to.be.a('function');
  });

});
