const { StatusCodes } = require('http-status-codes');
const request = require('supertest');
const express = require('express');
const userController = require('../controllers/user.controller');
const UsersServices = require('../services/user.service');

// Create a mock app for testing
const app = express();
app.use(express.json());

// Mock the createUser function
UsersServices.createUser = jest.fn();

// Mock the getAll function
UsersServices.getAll = jest.fn();

// Mock the updateUser function
UsersServices.updateUser = jest.fn();

// Mock the deleteUser function
UsersServices.deleteUser = jest.fn();

// Mount the userController routes on the mock app
app.post('/users', userController.createUser);
app.get('/users', userController.getAll);
app.put('/users/:id', userController.update);
app.delete('/users/:id', userController.deleteUser);

describe('userController', () => {
  it('should create a user', async () => {
    UsersServices.createUser.mockReturnValue({ fullname:"mubee", email:"mubee@gmail.com", password:"12345678" });

    const response = await request(app)
      .post('/users')
      .send({ fullname:"mubee", email:"mubee@gmail.com", password:"12345678" });

    expect(response.status).toBe(StatusCodes.OK);
    expect(response.body.success).toBe(true);
    
  });

  it('should get all users', async () => {
    UsersServices.getAll.mockReturnValue([{fullname:"mubee", email:"mubee@gmail.com", password:"12345678"} ]);

    const response = await request(app).get('/users');

    expect(response.status).toBe(StatusCodes.OK);
    expect(response.body.data).toEqual(expect.any(Array));
    
  });

  it('should update a user', async () => {
    UsersServices.updateUser.mockReturnValue({ fullname:"mubee", email:"mubee@gmail.com" });

    const response = await request(app)
      .put('/users/1') // Provide a valid user ID
      .send({ fullname:"mubee", email:"mubee@gmail.com" });

    expect(response.status).toBe(StatusCodes.OK);
    expect(response.body.success).toBe(true);
    
  });

  it('should delete a user', async () => {
    UsersServices.deleteUser.mockReturnValue({ fullname:"mubee", email:"mubee@gmail.com", password:"12345678" });

    const response = await request(app).delete('/users/1'); // Provide a valid user ID

    expect(response.status).toBe(StatusCodes.OK);
    expect(response.body.success).toBe(true);
    
  });
});
