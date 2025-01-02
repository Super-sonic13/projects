import Board from '../../game/models/Board';

import Bishop from '../../game/models/Figures/Bishop';
import King from '../../game/models/Figures/King';
import Knight from '../../game/models/Figures/Knight';
import Pawn from '../../game/models/Figures/Pawn';
import Queen from '../../game/models/Figures/Queen';
import Rook from '../../game/models/Figures/Rook';

import TrackMovesProvider from '../../game/classes/Providers/TrackMovesProvider';


describe('Test MovesTrackerContoller', () => {

  const board = new Board();
  const movesTrackerController = new TrackMovesProvider(board);

  it('write only white moves', () => {

    const expected = ['Ng5', 'd1', 'Bc4'];

    const knightCellCoordinate = {X: 4, Y: 3};
    const pawnCellCoordinate = {X: 2, Y: 1};
    const bishopCellCoordinate = {X: 7, Y: 0};

    const knightFigure = new Knight('white');
    board.getCellByCoordinate(knightCellCoordinate).setFigure(knightFigure);

    const pawFigure = new Pawn('white');
    board.getCellByCoordinate(pawnCellCoordinate).setFigure(pawFigure);

    const bishopFigure = new Bishop('white');
    board.getCellByCoordinate(bishopCellCoordinate).setFigure(bishopFigure);

    movesTrackerController.writeMove(knightCellCoordinate, {X: 5, Y: 6});
    movesTrackerController.writeMove(pawnCellCoordinate, {X: 1, Y: 3});
    movesTrackerController.writeMove(bishopCellCoordinate, {X: 4, Y: 2});

    expect(movesTrackerController.getWhiteMoves()).toEqual(expect.arrayContaining(expected));
  })
  

  it('write only black moves', () => {

    const expected = ['Kf6', 'Qb3', 'Re2'];


    const kingCoordinate = {X: 4, Y: 3};
    const queenCoordinate = {X: 2, Y: 1};
    const rookCoordinate = {X: 7, Y: 0};

    const kingFigure = new King('black');
    board.getCellByCoordinate(kingCoordinate).setFigure(kingFigure);

    const queenFigure = new Queen('black');
    board.getCellByCoordinate(queenCoordinate).setFigure(queenFigure);

    const rookFigure = new Rook('black');
    board.getCellByCoordinate(rookCoordinate).setFigure(rookFigure);

    movesTrackerController.writeMove(kingCoordinate, {X: 6, Y: 5});
    movesTrackerController.writeMove(queenCoordinate, {X: 3, Y: 1});
    movesTrackerController.writeMove(rookCoordinate, {X: 2, Y: 4});

    expect(movesTrackerController.getBlackMoves()).toEqual(expect.arrayContaining(expected));
  })

})