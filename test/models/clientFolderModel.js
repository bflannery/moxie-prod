import ClientFolderModel from '../../app/scripts/models/clientFolderModel';
import Backbone from 'backbone';

import sinon from 'sinon';
import { expect } from 'chai';
import { chaiHttp } from 'chai-http';

describe('clientFolderModel', () => {
	// make a variable for an instance
	let clientFolderModel;
	let client = {};

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

  it('should have a deleteClientFolder method', () => {
    expect(clientFolderModel).to.have.property('deleteClientFolder');
    expect(clientFolderModel.deleteClientFolder).to.be.a('function');

  });

	describe("deleteClientFolder", ()=> {
		it('should throw if no target is passed in', () => {
			expect(function() {
				clientFolderModel.deleteClientFolder();
			}).to.throw(Error);
		});

		it('should deleteClientFolder passed target', (client) => {
			let deleteClientFolderTest = clientFolderModel.deleteClientFolder(client);
			expect(deleteClientFolderTest).to.equal(true);
		});
	});


});
