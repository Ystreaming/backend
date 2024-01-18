const filesService = require('../services/files.services');
const rolesService = require('../services/roles.services');
import FileModel from '../models/files.models';
import RoleModel from '../models/roles.models';
import sinon from 'sinon';

describe('File Service', () => {
    afterEach(() => {
        sinon.restore();
    });

    test('getAllFiles should retrieve files with skip and limit', async () => {
        const mockFind = {
            skip: () => ({ limit: () => Promise.resolve(['file1', 'file2']) }),
        };
        sinon.stub(FileModel, 'find').returns(mockFind as any);

        const files = await filesService.getAllFiles(5, 10);
        expect(files).toEqual(['file1', 'file2']);
    });

    test('getFileById should retrieve a file by id', async () => {
        sinon.stub(FileModel, 'findOne').resolves('file');

        const file = await filesService.getFileById('123');
        expect(file).toBe('file');
    });

    test('createFile should save a new file', async () => {
        const saveStub = sinon.stub().resolves('saved file');
        sinon.stub(FileModel, 'create').returns({ save: saveStub } as any);

        const file = await filesService.createFile({
            filename: 'filename',
            fieldname: 'fieldname',
            originalname: 'originalname',
            encoding: 'encoding',
            mimetype: 'mimetype',
            destination: 'destination',
            path: 'path',
            size: 123,
        } as any);
        expect(file).toHaveProperty('_id');
    });

    test('updateFile should update a file', async () => {
        sinon.stub(FileModel, 'findOneAndUpdate').resolves('updated file');

        const file = await filesService.updateFile({ _id: '123' } as any);
        expect(file).toBe('updated file');
    });

    test('deleteFile should remove a file by id', async () => {
        sinon.stub(FileModel, 'findOneAndDelete').resolves('deleted file');

        const result = await filesService.deleteFile('123');
        expect(result).toBe('deleted file');
    });
});

describe('Role Service', () => {
  afterEach(() => {
    sinon.restore();
  });

  test('isUserInRole should return true', async () => {
    sinon.stub(RoleModel, 'findOne').resolves('role');

    const result = await rolesService.isUserInRole('123', 'admin');
    expect(result).toBe(true);
  });

  test('isUserInRole should return false if user is not in role', async () => {
    sinon.stub(RoleModel, 'findOne').resolves(null);

    const userId = '123';
    const roleName = 'someRole';

    const result = await rolesService.isUserInRole(userId, roleName);
    expect(result).toBe(false);
});

});
