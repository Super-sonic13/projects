import Board from '../../game/models/Board';

import Pawn from '../../game/models/Figures/Pawn';
import King from '../../game/models/Figures/King';
import Rook from '../../game/models/Figures/Rook';
import Bishop from '../../game/models/Figures/Bishop';
import Knight from '../../game/models/Figures/Knight';

import FiguresMover from '../../game/classes/FiguresManagers/FiguresMover';


describe('Testing FigureMover class', () => {

  it('move figure', () => {
    const board = new Board();
    const figureMover = new FiguresMover(board);

    const knightFigure = new Knight('white');
    const bishopFigure = new Bishop('white');

    board.getCellByCoordinate({X: 2, Y: 2}).setFigure(knightFigure);
    figureMover.moveFigure(knightFigure.getCoordinate(), {X: 4, Y: 3});
    expect(board.getCellByCoordinate({X: 2, Y: 2}).getFigure()).toBeUndefined();
    expect(board.getCellByCoordinate({X: 4, Y: 3}).getFigure() instanceof Knight).toBeTruthy();


    board.getCellByCoordinate({X: 5, Y: 5}).setFigure(bishopFigure);
    figureMover.moveFigure(bishopFigure.getCoordinate(), {X: 7, Y: 7});
    expect(board.getCellByCoordinate({X: 5, Y: 5}).getFigure()).toBeUndefined();
    expect(board.getCellByCoordinate({X: 7, Y: 7}).getFigure() instanceof Bishop).toBeTruthy();
  });


  it('move figure and check flag that figure has already move', () => {

    const board = new Board();
    const figureMover = new FiguresMover(board);

    const pawnFigure = new Pawn('white');
    const kingFigure = new King('white');
    const rookFigure = new Rook('white');

    board.getCellByCoordinate({X: 1, Y: 1}).setFigure(pawnFigure);
    board.getCellByCoordinate({X: 2, Y: 2}).setFigure(kingFigure);
    board.getCellByCoordinate({X: 3, Y: 3}).setFigure(rookFigure);

    figureMover.moveFigure(pawnFigure.getCoordinate(), {X: 4, Y: 4});
    expect(pawnFigure.isMovedFigure()).toBeTruthy();

    figureMover.moveFigure(kingFigure.getCoordinate(), {X: 5, Y: 5});
    expect(kingFigure.isMovedFigure()).toBeTruthy();

    figureMover.moveFigure(rookFigure.getCoordinate(), {X: 6, Y: 6});
    expect(rookFigure.isMovedFigure()).toBeTruthy();
  });

});