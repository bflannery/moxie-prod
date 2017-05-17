import FileModel from '../../app/scripts/models/fileModel';
import Backbone from 'backbone';

import { expect } from 'chai';

describe('fileModel', () => {
	// make a variable for an instance
	let fileModel;

	// make sure each time we run a test the instance is a fresh model
	beforeEach(() => {
		fileModel = new FileModel();
	});

	it('should be a function (because it is a constructor)', () => {
		expect(FileModel).to.be.a('function');
	});

	it('should create an backbone model', () => {
		expect(fileModel).to.be.an.instanceof(Backbone.Model);
	});

	it('should have an attribute id of objectId', () => {
		expect(fileModel).to.have.property('idAttribute');
		expect(fileModel.idAttribute).to.equal('objectId');
	});

  it('should have default object with attributes of fileName', () => {
    expect(fileModel).to.have.property('defaults');
    expect(fileModel.defaults).to.deep.equal({fileName: ''});
  });

  it('should have an addSubFileToData method', () => {
    expect(fileModel).to.have.property('addSubFileToData');
    expect(fileModel.addSubFileToData).to.be.a('function');
  });

  it('should have a deleteClientFilesFromFiles method', () => {
    expect(fileModel).to.have.property('deleteClientFilesFromFiles');
    expect(fileModel.deleteClientFilesFromFiles).to.be.a('function');
  });

});
