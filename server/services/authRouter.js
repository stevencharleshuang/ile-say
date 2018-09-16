/* authRouter.js patterns based on Jason Seminara's react-skeleton-api
   https://git.generalassemb.ly/wdi-nyc-rover/react-skeleton-api/blob/tokens/auth/index.js */

const authRouter              = require('express').Router();
const usersController         = require('../controllers/usersController');
const usersResponseController = require('../controllers/usersResponseController');
const authService             = require('./authService');
const tokenService            = require('./tokenService');

// authRouter.get('/', (req, res) => {
//   res.send({ message: 'Hello, Dave, from authRouter'})
// });

authRouter.route('/authtest')
  .get(tokenService.verifyToken, usersResponseController.handleAuthTest)

authRouter.route('/login')
  .post(authService.authenticate, usersResponseController.handleLogin)

module.exports = authRouter;
