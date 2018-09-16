module.exports = {

  sendTest(req, res) {
    // show one or a collection
    res.send('<h1>This is a test, Dave</h1>');
  },

  sendJSON(req, res) {
    // show one or a collection
    // console.log(res.locals);
    res.json(res.locals.entries || res.locals.entry);
  },

  handleGetEntries(req, res) {
    res.status(200).redirect('./')
  },

  handleCreateEntry(req, res) {
    // console.log('entriesResponseHandler: handleCreate() = ', req.body);
    res.json({ entry: res.locals.entry });
  },

  handleEditByID(req, res) {
    res.status(200).redirect(`./${req.params.id}`);
  },

  handleDeleteByID(req, res) {
    // console.log(`user id: ${req.params.id} deleted`);
    res.json;
  },

  send404(err, req, res, next) {
    console.log(err);
    res.status(404).send(`I'm afraid I can't do that, Dave.`);
  },

};
