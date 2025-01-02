import Board from '../../game/models/Board';
import King from '../../game/models/Figures/King';
import Rook from '../../game/models/Figures/Rook';

import CastleProvider from '../../game/classes/Providers/CastleProvider';


describe('Testing CastleProvider class', () => {

  describe('castle: white side', () => {

    const board = new Board();
    const castleProvider = new CastleProvider();

    const leftRook = new Rook('white');
    const rightRook = new Rook('white');
    const wKing = new King('white');

    board.getCellByCoordinate({X: 7, Y: 0}).setFigure(leftRook);
    board.getCellByCoordinate({X: 7, Y: 7}).setFigure(rightRook);
    board.getCellByCoordinate({X: 7, Y: 4}).setFigure(wKing);
  
    it('get casle moves', () => {
      const moves = castleProvider.getCastleMove(wKing, board);
      expect(moves).toEqual(expect.arrayContaining([{X: 7, Y: 2}, {X: 7, Y: 6}]));
    })

    it('get casle moves when left rook was move', () => {
      leftRook.setFigureHasAlreaduMoved();
      const moves = castleProvider.getCastleMove(wKing, board);
      expect(moves).toEqual(expect.arrayContaining([{X: 7, Y: 6}]));
    })

    it('get casle moves when king was move', () => {
      wKing.setFigureHasAlreaduMoved();
      const moves = castleProvider.getCastleMove(wKing, board);
      expect(moves).toEqual(expect.arrayContaining([]));
    })
  }); 


  describe('castle: black side', () => {

    const board = new Board();
    const castleProvider = new CastleProvider();

    const leftRook = new Rook('black');
    const rightRook = new Rook('black');
    const bKing = new King('black');

    board.getCellByCoordinate({X: 0, Y: 0}).setFigure(leftRook);
    board.getCellByCoordinate({X: 0, Y: 7}).setFigure(rightRook);
    board.getCellByCoordinate({X: 0, Y: 4}).setFigure(bKing);
  
    it('get casle moves', () => {
      const moves = castleProvider.getCastleMove(bKing, board);
      expect(moves).toEqual(expect.arrayContaining([{X: 0, Y: 2}, {X: 0, Y: 6}]));
    })

    it('get casle moves when right rook was move', () => {
      rightRook.setFigureHasAlreaduMoved();
      const moves = castleProvider.getCastleMove(bKing, board);
      expect(moves).toEqual(expect.arrayContaining([{X: 0, Y: 2}]));
    })

    it('get casle moves when king was move', () => {
      bKing.setFigureHasAlreaduMoved();
      const moves = castleProvider.getCastleMove(bKing, board);
      expect(moves).toEqual(expect.arrayContaining([]));
    })
  });
});