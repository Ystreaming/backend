import { Request, Response, NextFunction } from 'express';
const middleware = require('../middlewares/role.middleware');
import jwt from 'jsonwebtoken';
const RoleServices = require('../services/roles.services');

jest.mock('jsonwebtoken');
jest.mock('../services/roles.services');

describe('Middleware Tests', () => {
    let mockRequest: Partial<Request>;
    let mockResponse: Partial<Response>;
    let nextFunction: NextFunction = jest.fn();

    beforeEach(() => {
        mockRequest = {};
        mockResponse = {
            json: jest.fn(),
            status: jest.fn().mockReturnThis(),
        };
    });

    describe('isUserInRoleAdministrator', () => {
        it('should return 401 if no token is provided', async () => {
            mockRequest.headers = {};
            await middleware.isUserInRoleAdministrator(mockRequest as Request, mockResponse as Response, nextFunction);
            expect(mockResponse.status).toHaveBeenCalledWith(401);
        });

        it('should return 401 if token is invalid', async () => {
            mockRequest.headers = {
                authorization: 'Bearer invalidtoken'
            };
            jwt.verify = jest.fn().mockImplementation((token, secret, callback) => callback(new Error('invalid token'), null));
            await middleware.isUserInRoleAdministrator(mockRequest as Request, mockResponse as Response, nextFunction);
            expect(mockResponse.status).toHaveBeenCalledWith(401);
        });

        it('should call next() if token is valid and role is Administrator', async () => {
          mockRequest.headers = {
              authorization: 'Bearer validtoken'
          };
          jwt.verify = jest.fn().mockImplementation((token, secret, callback) => callback(null, { id: 'user_id' }));
          RoleServices.isUserInRole = jest.fn().mockResolvedValue(true); 

          await middleware.isUserInRoleAdministrator(mockRequest as Request, mockResponse as Response, nextFunction);
          expect(nextFunction).toHaveBeenCalled();
      });

      it('should return 403 if role is not Administrator', async () => {
          mockRequest.headers = {
              authorization: 'Bearer validtoken'
          };
          jwt.verify = jest.fn().mockImplementation((token, secret, callback) => callback(null, { id: 'user_id' }));
          RoleServices.isUserInRole = jest.fn().mockResolvedValue(false);

          await middleware.isUserInRoleAdministrator(mockRequest as Request, mockResponse as Response, nextFunction);
          expect(mockResponse.status).toHaveBeenCalledWith(403);
      });

    });

    describe('isUserInRoleStreamer', () => {
      it('should return 401 if no token is provided', async () => {
          mockRequest.headers = {};
          await middleware.isUserInRoleStreamer(mockRequest as Request, mockResponse as Response, nextFunction);
          expect(mockResponse.status).toHaveBeenCalledWith(401);
      });

      it('should return 401 if token is invalid', async () => {
          mockRequest.headers = {
              authorization: 'Bearer invalidtoken'
          };
          jwt.verify = jest.fn().mockImplementation((token, secret, callback) => callback(new Error('invalid token'), null));
          await middleware.isUserInRoleStreamer(mockRequest as Request, mockResponse as Response, nextFunction);
          expect(mockResponse.status).toHaveBeenCalledWith(401);
      });

      it('should call next() if token is valid and role is Streamer', async () => {
          mockRequest.headers = {
              authorization: 'Bearer validtoken'
          };
          jwt.verify = jest.fn().mockImplementation((token, secret, callback) => callback(null, { id: 'user_id' }));
          RoleServices.isUserInRole = jest.fn().mockResolvedValue(true);

          await middleware.isUserInRoleStreamer(mockRequest as Request, mockResponse as Response, nextFunction);
          expect(nextFunction).toHaveBeenCalled();
      });

      it('should return 403 if role is not Streamer', async () => {
          mockRequest.headers = {
              authorization: 'Bearer validtoken'
          };
          jwt.verify = jest.fn().mockImplementation((token, secret, callback) => callback(null, { id: 'user_id' }));
          RoleServices.isUserInRole = jest.fn().mockResolvedValue(false);

          await middleware.isUserInRoleStreamer(mockRequest as Request, mockResponse as Response, nextFunction);
          expect(mockResponse.status).toHaveBeenCalledWith(403);
      });
  });
});
