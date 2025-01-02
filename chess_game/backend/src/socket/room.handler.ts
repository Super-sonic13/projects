import { Socket } from 'socket.io';
import GameStatesManager from '../game/GameStatesManager';
import Player from '../game/Player';
import { color } from '../game/Utils/types';
import JSONParser from '../JSONParser';
import { joinGameRequestData, newGameRequestData } from '../Utils/types';


module.exports = (io: any, socket: Socket) => {

  const parser = new JSONParser();

  function newGameHandler(requestData: newGameRequestData) {
    const player = new Player(requestData.userName, requestData.userColor as color);
    GameStatesManager.createNewGameState(requestData.roomName, player);
    socket.join(requestData.roomName);
    io.to(requestData.roomName).emit('roomInfo:read', GameStatesManager.getGameStateByRoom(requestData.roomName).getRoomInfo());
  }

  function joinRequestHandler(requestData: joinGameRequestData) {

    if(!GameStatesManager.isStateExist(requestData.roomName)) {
      socket.emit('warning', `room with name: ${requestData.roomName} doesn't exist`);
      return;
    } 

    if(io.sockets.adapter.rooms.get(requestData.roomName).size == 2) {
      socket.emit('warning', `Room: ${requestData.roomName} is full`);
      return
    }
    
    const player = new Player(requestData.userName);
    const gameRoom = GameStatesManager.getGameStateByRoom(requestData.roomName);
    const board = gameRoom.gameController.getBoard();

    socket.join(requestData.roomName);
    gameRoom.startGame(player);
    
    io.to(requestData.roomName).emit('board:read', parser.parseBoardToJSON(board));
    io.to(requestData.roomName).emit('roomInfo:read', gameRoom.getRoomInfo());
  }

  socket.on('newGame', newGameHandler);
  socket.on('joinGame', joinRequestHandler);
}