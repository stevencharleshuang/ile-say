import socketIOClient from 'socket.io-client';

const server = 'http://localhost:5000/';
const socket = socketIOClient(server);

export default socket;
