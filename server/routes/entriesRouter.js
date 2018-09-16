const entriesRouter             = require('express').Router();
const entriesController         = require('../controllers/entriesController');
const entriesResponseController = require('../controllers/entriesResponseController');

// entriesRouter.get('/', (req, res, next) => {
//   res.send({ message: 'You hit the entries router, Dave' })
// });

entriesRouter.route('/users/user/:userID')
  .get(entriesController.getEntriesByUserID, entriesResponseController.sendJSON)

entriesRouter.route('/users/:username')
  .get(entriesController.getEntriesByUsername, entriesResponseController.sendJSON)


entriesRouter.route('/entry/:id')
  .get(entriesController.getByID, entriesResponseController.sendJSON)
  .put(entriesController.editEntry, entriesResponseController.sendJSON)
  .delete(entriesController.removeEntryByID, entriesResponseController.sendJSON)

entriesRouter.route('/')
  .get(entriesController.getAll, entriesResponseController.sendJSON)
  .post(entriesController.makeEntry, entriesResponseController.handleCreateEntry)


module.exports = entriesRouter;
