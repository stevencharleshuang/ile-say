const usersModel = require('../models/usersModel');
const bcrypt     = require('bcrypt');

module.exports = {

  async getAll(req, res, next) {
    try {
      res.locals.users = await usersModel.findAll();
      next();
    }
    catch (err) {
      next(err);  
    }
  },

  async getByID(req, res, next) {
    try {
      res.locals.user = await usersModel.findByID(req.params.id);
      // console.log('userController getUser() says: getUser req.params.id = ', req.params.id);
      next();
    }
    catch (err) {
      next(err);
    }
  },

  async getByUsername(req, res, next) {
    try {
      // console.log('userController getOne() says: req.params.username = ', req.params.username);
      res.locals.user = await usersModel.findByUsername(req.params.username);
      next();
    }
    catch (err) {
      next(err);
    }
  },

  async registerUser(req, res, next) {
    try {
      // console.log('userController registerUser() says: req.body = ', req.body);
      req.body.password = bcrypt.hashSync(req.body.password, 10);
      res.locals.user = await usersModel.createUser(req.body);
      // console.log('userController says: res.locals.user = ', res.locals.user);
      next();
    }
    catch (err) {
      next(err);
    }
  },

  async editUser(req, res, next) {
    try {
      // console.log('userController editUser() says: req.body = ', req.body);
      req.body.password = bcrypt.hashSync(req.body.password, 10);
      res.locals.user = await usersModel.updateUser(req.body, req.params.id);
      // console.log('userController says: res.locals.user = ', res.locals.user);
      next();
    }
    catch (err) {
      next(err);
    }
  },

  async removeUserByID(req, res, next) {
    try {
      // console.log('usersController removeUser() says: req.params.id = ', req.params.id)
      res.locals.user = await usersModel.deleteUserByID(req.params.id);
      next();
    }
    catch(err) {
      next(err);
    }
  },

  async removeUserByUsername(req, res, next) {
    try {
      // console.log('usersController removeUser() says: req.params.username = ', req.params.username)
      res.locals.user = await usersModel.deleteUserByUsername(req.params.username);
      next();
    }
    catch(err) {
      next(err);
    }
  },

}
