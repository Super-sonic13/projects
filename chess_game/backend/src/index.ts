import { Socket } from 'socket.io';


const httpServer = require('http').createServer();
const io = require('socket.io')(httpServer, { cors: { origin: '*' } });

const registerRoomEvents = require('./socket/room.handler');
const registerBoardEvents = require('./socket/board.handler');

httpServer.listen(5000, () => {
  console.log('Server start');
})

const onConnection = (socket: Socket) => {  
  registerRoomEvents(io, socket);
  registerBoardEvents(io, socket);
}

io.on('connection', onConnection);




