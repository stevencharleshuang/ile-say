 /* tokenService.js patterns based on Jason Seminara's react-skeleton-api
   https://git.generalassemb.ly/wdi-nyc-rover/react-skeleton-api/blob/tokens/auth/TokenService.js */

const jwt = require('jsonwebtoken');

module.exports = {

  // Make a token
  makeToken(payload) {
    console.log('tokenService payload: ', payload, 'timestamp:', Date.now());
    // Return the token formatted with following parameters
    return jwt.sign(
      // Current payload accepts username, refactor with roles
      { payload },
      process.env.SERVER_SECRET,
      {
        expiresIn: '1h',
        issuer: 'Hal 9000'
      });
  },

  // Pattern based on Brad Traversy's video on JWT's
  // https://www.youtube.com/watch?v=7nafaH9SddU
  //Verify Token
  verifyToken(req, res, next) {
    // Get auth header value
    const bearerHeader = req.headers['authorization'];
    // Check if bearer is undefined
    if (typeof bearerHeader !== 'undefined') {
    // Split at the space
    const bearer = bearerHeader.split(' ');
    // Get token from array
    const bearerToken = bearer[1];
    // Set the token
    req.token = bearerToken;
    next();
    } else {
      // Forbidden
      res.sendStatus(403);
    }
  },

  receiveToken(req, res, next) {
    if (req.headers.authorization) {
      // the token will come back as 'Bearer xxxxxx'
      // pull off the word, leaving us with the token string
      req.authToken = req.headers.authorization.replace(/^Bearer\s/, '');
    }
    next();
  },

};
