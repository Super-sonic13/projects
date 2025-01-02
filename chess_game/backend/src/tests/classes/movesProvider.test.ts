import Board from '../../game/models/Board';

import Pawn from '../../game/models/Figures/Pawn';
import Rook from '../../game/models/Figures/Rook';
import Bishop from '../../game/models/Figures/Bishop';
import Knight from '../../game/models/Figures/Knight';

import MovesProvider from '../../game/classes/Providers/MovesProvider';

import { moves } from '../../game/Utils/types';


describe('Test MovesProvider class', () => {

  const movesProvider = new MovesProvider();


  it('testing horizontal and verticla moves', () => {

    const board = new Board();
    const rook = new Rook('white');

    const expected1: moves = [
      {X: 0, Y: 1}, {X: 0, Y: 2}, {X: 0, Y: 3}, {X: 0, Y: 4}, {X: 0, Y: 5}, {X: 0, Y: 6}, {X: 0, Y: 7},
      {X: 1, Y: 0}, {X: 2, Y: 0}, {X: 3, Y: 0}, {X: 4, Y: 0}, {X: 5, Y: 0}, {X: 6, Y: 0}, {X: 7, Y: 0}
    ];
    const expected2 = [
      {X: 0, Y: 1}, {X: 0, Y: 2}, {X: 0, Y: 3}, {X: 0, Y: 4}, {X: 0, Y: 5}, {X: 0, Y: 6}, {X: 0, Y: 7}
    ];
    const expected3: moves = [];
    const expected4: moves = [{X: 0, Y: 1}];
   
    board.getCellByCoordinate({X: 0, Y: 0}).setFigure(rook);
    let moves = movesProvider.getAvailabelMoves(rook, board);
    expect(moves).toEqual(expect.arrayContaining(expected1));

    board.getCellByCoordinate({X: 1, Y: 0}).setFigure(new Pawn('white'));
    moves = movesProvider.getAvailabelMoves(rook, board);
    expect(moves).toEqual(expect.arrayContaining(expected2));

    board.getCellByCoordinate({X: 0, Y: 1}).setFigure(new Pawn('white'));
    moves = movesProvider.getAvailabelMoves(rook, board);
    expect(moves).toEqual(expect.arrayContaining(expected3));

    board.getCellByCoordinate({X: 0, Y: 1}).setFigure(new Pawn('black'));
    moves = movesProvider.getAvailabelMoves(rook, board);
    expect(moves).toEqual(expect.arrayContaining(expected4));
  });


  it('testing diagonal moves', () => {

    const board = new Board();
    const bishop = new Bishop('white');

    const expected1: moves = [
      {X: 5, Y: 5}, {X: 6, Y: 6}, {X: 7, Y: 7}, {X: 3, Y: 3}, {X: 2, Y: 2}, {X: 1, Y: 1}, {X: 0, Y: 0}, 
      {X: 3, Y: 5}, {X: 2, Y: 6}, {X: 1, Y: 7}, {X: 5, Y: 3}, {X: 6, Y: 2}, {X: 7, Y: 1}
    ];
    const expected2: moves = [
      {X: 5, Y: 5}, {X: 3, Y: 3}, {X: 2, Y: 2}, {X: 1, Y: 1}, {X: 0, Y: 0}, {X: 3, Y: 5}, {X: 2, Y: 6}, 
      {X: 1, Y: 7}, {X: 5, Y: 3}, {X: 6, Y: 2}, {X: 7, Y: 1}
    ];
    const expected3: moves = [
      {X: 5, Y: 5}, {X: 3, Y: 3}, {X: 2, Y: 2}, {X: 1, Y: 1}, {X: 0, Y: 0}, {X: 5, Y: 3}, {X: 6, Y: 2}, 
      {X: 7, Y: 1}
    ];
    const expected4: moves = [
      {X: 5, Y: 5}, {X: 5, Y: 3}, {X: 6, Y: 2}, {X: 7, Y: 1}
    ];
    
    board.getCellByCoordinate({X: 4, Y: 4}).setFigure(bishop);
    let moves = movesProvider.getAvailabelMoves(bishop, board);
    expect(moves).toEqual(expect.arrayContaining(expected1));

    board.getCellByCoordinate({X: 5, Y: 5}).setFigure(new Pawn('black'));
    moves = movesProvider.getAvailabelMoves(bishop, board);
    expect(moves).toEqual(expect.arrayContaining(expected2));

    board.getCellByCoordinate({X: 3, Y: 5}).setFigure(new Pawn('white'));
    moves = movesProvider.getAvailabelMoves(bishop, board);
    expect(moves).toEqual(expect.arrayContaining(expected3));

    board.getCellByCoordinate({X: 3, Y: 3}).setFigure(new Pawn('white'));
    moves = movesProvider.getAvailabelMoves(bishop, board);
    expect(moves).toEqual(expect.arrayContaining(expected4));
  });


  it('testing knight moves', () => {

    const board = new Board();
    const knight = new Knight('white');

    board.getCellByCoordinate({X: 4, Y: 4}).setFigure(knight);

    const expected1: moves = [
      {X: 2, Y: 5}, {X: 3, Y: 2}, {X: 6, Y: 5}, {X: 6, Y: 3}, {X: 5, Y: 2}, {X: 5, Y: 6}
    ];
    const expected2: moves = [
      {X: 2, Y: 5}, {X: 6, Y: 3}, {X: 5, Y: 2}, {X: 5, Y: 6}
    ];

    board.getCellByCoordinate({X: 2,Y: 5}).setFigure(new Pawn('black'));
    board.getCellByCoordinate({X: 2,Y: 3}).setFigure(new Pawn('white'));
    board.getCellByCoordinate({X: 3,Y: 6}).setFigure(new Pawn('white'));

    let moves = movesProvider.getAvailabelMoves(knight, board);
    expect(moves).toEqual(expect.arrayContaining(expected1));

    board.getCellByCoordinate({X: 3,Y: 2}).setFigure(new Pawn('white'));
    board.getCellByCoordinate({X: 6,Y: 5}).setFigure(new Pawn('white'));
    moves = movesProvider.getAvailabelMoves(knight, board);
    expect(moves).toEqual(expect.arrayContaining(expected2));
  });
  

  it('testing pawn moves', () => {

    const board = new Board();
    const testedPawn = new Pawn('white');

    const expected1: moves = [{X: 4,Y: 4}, {X: 5,Y: 4}];
    const expected2: moves = [{X: 4,Y: 4}, {X: 5,Y: 4}, {X: 5, Y: 3}];
    const expected3: moves = [{X: 4,Y: 4}, {X: 5,Y: 4}, {X: 5, Y: 3}, {X: 5,Y: 5}];
    const expected4: moves = [{X: 4,Y: 4}, {X: 5, Y: 3}, {X: 5,Y: 5}];

    board.getCellByCoordinate({X: 6, Y: 4}).setFigure(testedPawn);
    let moves = movesProvider.getAvailabelMoves(testedPawn, board);
    expect(moves).toEqual(expect.arrayContaining(expected1));

    board.getCellByCoordinate({X: 5, Y: 3}).setFigure(new Pawn('black'));
    moves = movesProvider.getAvailabelMoves(testedPawn, board);
    expect(moves).toEqual(expect.arrayContaining(expected2));

    board.getCellByCoordinate({X: 5, Y: 5}).setFigure(new Pawn('black'));
    moves = movesProvider.getAvailabelMoves(testedPawn, board);
    expect(moves).toEqual(expect.arrayContaining(expected3));
    
    board.getCellByCoordinate({X: 5, Y: 4}).setFigure(new Pawn('black'));
    moves = movesProvider.getAvailabelMoves(testedPawn, board);
    expect(moves).toEqual(expect.arrayContaining(expected4));
  });
});