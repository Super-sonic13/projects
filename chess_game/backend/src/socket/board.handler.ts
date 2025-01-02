
import { Socket } from 'socket.io';

import GameStatesManager from '../game/GameStatesManager';
import JSONParser from '../JSONParser';

import { coordinate, moveFigureSocketData } from '../game/Utils/types';


module.exports = (io: any, socket: Socket) => {

  const parser = new JSONParser();

  function getBoardHandler(room: string) {
    const gameRoom = GameStatesManager.getGameStateByRoom(room);
    const board = gameRoom.gameController.getBoard();
    io.to(room).emit('board:read', parser.parseBoardToJSON(board));
  };

  function moveFigureHandler(data: moveFigureSocketData, room: string) {
    const gameRoom = GameStatesManager.getGameStateByRoom(room);
    gameRoom.gameController.moveFigure(data.startCoordinate, data.targetCoordinate);

    const board = gameRoom.gameController.getBoard();
    const boardMoves = gameRoom.gameController.getAllBoardMoves();
    
    io.to(room).emit('board:read', parser.parseBoardToJSON(board));
    io.to(room).emit('moves:read', parser.parseAllBoardMoves(boardMoves));
    
    if(gameRoom.gameController.isCheckmate) {
      io.to(room).emit('board:checkmate', )//TODO respone checkmate status
      return;
    }
  };

  function getFigureMovesHandler(room: string, figureCoordinate: coordinate) {
    const gameRoom = GameStatesManager.getGameStateByRoom(room);
    const availableMoves = gameRoom.gameController.getAvaiLabelMovesForFigureByCoordinate(figureCoordinate);
    const board = gameRoom.gameController.getBoard();
    socket.emit('board:read', parser.parseBoardtateWithAvailabelMoves(board, availableMoves));
  }
  
  socket.on('board:get', getBoardHandler);
  socket.on('board:getMoves', getFigureMovesHandler)
  socket.on('board:moveFigure', moveFigureHandler);
}