module.exports = {

  sendTest(req, res) {
    // show one or a collection
    res.send('<h1>This is a test, Dave</h1>');
  },

  sendJSON(req, res) {
    // show one or a collection
    res.json(res.locals.users || res.locals.user);
  },


  handleGetUsers(req, res) {
    res.status(200).redirect('./')
  },

  handleCreateUser(req, res) {
    // console.log('userResponseHandler: handleCreate() = ', req.body);
    res.json({ message: 'Registration Successful!' });
  },

  handleEditByID(req, res) {
    res.status(200).redirect(`./${req.params.id}`);
  },

  handleDeleteByID(req, res) {
    // console.log(`user id: ${req.params.id} deleted`);
    res.status(200).redirect('../');
  },

  handleDeleteByUsername(req, res) {
    // console.log(`user id: ${req.params.username} deleted`);
    res.status(200).redirect('./');
  },

  handleAuthTest(req, res) {
    res.send({
      express: 'Hello From Authenticated Express, Dave',
      token: req.token,
    });
  },

  handleLogin(req, res) {
    // console.log('hit handleLogin', res.locals.token)
    res.json({ token: res.locals.token, user: res.locals.user });
  },

  send404(err, req, res, next) {
    console.log(err);
    res.status(404).send(`I'm afraid I can't do that, Dave.`);
  },

};
