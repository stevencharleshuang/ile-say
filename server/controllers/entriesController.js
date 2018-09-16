const entriesModel = require('../models/entriesModel');

module.exports = {

  async getAll(req, res, next) {
    try {
      res.locals.entries = await entriesModel.findAll();
      next();
    }
    catch (err) {
      next(err);
    }
  },

  async getByID(req, res, next) {
    try {
      res.locals.entry = await entriesModel.findByID(req.params.id);
      next();
    }
    catch (err) {
      next(err);
    }
  },

  async getEntriesByUserID(req, res, next) {
    try {
      // console.log('entriesController hit', req.params.userID)
      res.locals.entries = await entriesModel.findEntriesByUserID(req.params.userID);
      next();
    } catch(err) {
      next(err);
    }
  },

  async getEntriesByUsername(req, res, next) {
    try {
      // console.log('entriesController hit', req.params.username)
      res.locals.entries = await entriesModel.findEntriesByUsername(req.params.username);
      next();
    } catch(err) {
      next(err);
    }
  },

  async makeEntry(req, res, next) {
    try {
      res.locals.entry = await entriesModel.createEntry(req.body);
      next();
    }
    catch (err) {
      next(err);
    }
  },

  async editEntry(req, res, next) {
    try {
      res.locals.entry = await entriesModel.updateEntry(req.body, req.params.id);
      next();
    }
    catch (err) {
      next(err);
    }
  },

  async removeEntryByID(req, res, next) {
    try {
      res.locals.entry = await entriesModel.deleteEntryByID(req.params.id);
      next();
    }
    catch(err) {
      next(err);
    }
  },

}
