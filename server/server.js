require('dotenv').config();
const express       = require('express');
const jwt           = require('jsonwebtoken');
const logger        = require('morgan');
const bodyParser    = require('body-parser');
const path          = require('path');
const app           = express();
const PORT          = process.env.PORT || 5000;
const usersRouter   = require('./routes/usersRouter');
const authRouter    = require('./services/authRouter');
const entriesRouter = require('./routes/entriesRouter');

app.use(logger('dev'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/api/users', usersRouter);
app.use('/api/auth', authRouter);
app.use('/api/entries', entriesRouter);

// Serve static files from the React frontend app
app.use(express.static(path.join(__dirname, '../client/build')))
// Anything that doesn't match the above, send back index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '../client/build/index.html'))
})

// GLOBAL ERROR HANDLER
app.use((err, req, res, next) => {
  console.log(`I'm sorry, Dave. I'm afraid I can't do that.`);
  res.status(500).send(`I'm sorry, Dave. I'm afraid I can't do that.`);
});


// app.use((err, req, res, next) => {
//   console.log(err)
//   res.status(500).json({
//     error: err,
//     message: err.message
//   });
// });

app.listen(PORT, () => {
  console.log(`Server up and running! Port: ${PORT} Env: ${app.get('env')}`);
});
