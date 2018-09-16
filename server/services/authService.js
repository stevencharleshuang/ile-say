/* authService.js patterns based on Vinicio Diaz's CryptoApp group project Auth Controller File
   https://git.generalassemb.ly/Group1/CryptoApp/blob/master/user-auth/user-authController.js */

const bcrypt = require('bcrypt');
const usersModel = require('../models/usersModel');
const tokenService = require('./tokenService');

module.exports = {
  async authenticate(req, res, next) {
    try {
      // grabs the username and password from the response via object destructuring
      const { username, password } = req.body;

      // grabs the user info from the db
      const user = await usersModel.findByUsername(username);

      // bcrypt checks whether the entered password as a hash is the same
      // as the hashed password in the db
      // returns a boolean
      const valid = await bcrypt.compare(password, user.password);

      // if the entered password does not match, throw an error
      // the error goes to the catch, ending the function

      if (!valid) {
        // throws custom error message
        throw new Error('Incorrect Password');
      }

      res.locals.token = await tokenService.makeToken({
        username: user.username,
        roles:    ['user'],
      });
      res.locals.user = user
      console.log(res.locals.token);
      next();
    } catch (err) {
      console.log('err in login', err);
      next(err);
    }
  },
}
