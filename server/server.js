require('dotenv').config();
const express       = require('express')
const app           = express();
const http          = require('http');
const server        = http.createServer(app);
const socketIO      = require('socket.io')
const io            = require('socket.io')(server);
const jwt           = require('jsonwebtoken');
const logger        = require('morgan');
const bodyParser    = require('body-parser');
const path          = require('path');
const PORT          = process.env.PORT || 5000;
const usersRouter   = require('./routes/usersRouter');
const authRouter    = require('./services/authRouter');

app.use(logger('dev'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


io.on('connection', (socket) => {
  socket.emit('status', { status: 'Online' });
  socket.on('clientMessage', (data) => {
    console.log('>>> Server: ', data);
    io.emit('incomingMessage', data)
  });

  socket.on('disconnect', () => {
    console.log('>>> Server: User Disconnected')
  })
});

app.use('/api/users', usersRouter);
app.use('/api/auth', authRouter);

// Serve static files from the React frontend app
app.use(express.static(path.join(__dirname, '../client/build')))

app.get('/', function (req, res) {
  res.sendfile(__dirname + '/index.html');
});

// // Anything that doesn't match the above, send back index.html
// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname + '../client/build/index.html'))
// })

// GLOBAL ERROR HANDLER
app.use((err, req, res, next) => {
  console.log(`I'm sorry, Dave. I'm afraid I can't do that.`);
  res.status(500).send(`I'm sorry, Dave. I'm afraid I can't do that.`);
});

app.listen(PORT, () => {
  console.log(`Server up and running! Port: ${PORT} Env: ${app.get('env')}`);
});
