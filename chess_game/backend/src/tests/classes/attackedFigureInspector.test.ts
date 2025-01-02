import Board from '../../game/models/Board';

import Rook from '../../game/models/Figures/Rook';
import Bishop from '../../game/models/Figures/Bishop';
import Pawn from '../../game/models/Figures/Pawn';
import Knight from '../../game/models/Figures/Knight';
import King from '../../game/models/Figures/King';

import AttackedFigureInspector from '../../game/classes/Inspectors/AttackedFigureInspector';


describe('Testing AttackedFigureInspector class', () => {

  it('Horizontal attack', () => {
    const board = new Board();
    const attackedFigureInspector = new AttackedFigureInspector(board);

    const kingFigure = new King('white');
    const blackRook = new Rook('black');

    board.getCellByCoordinate({X: 2, Y: 2}).setFigure(kingFigure);
    board.getCellByCoordinate({X: 4, Y: 2}).setFigure(blackRook);
    expect(attackedFigureInspector.isFigureUnderAttack(kingFigure.getCoordinate(), kingFigure.getColor())).toBeTruthy();

    board.getCellByCoordinate({X: 4, Y: 2}).removeFigure();
    board.getCellByCoordinate({X: 2, Y: 4}).setFigure(blackRook);
    expect(attackedFigureInspector.isFigureUnderAttack(kingFigure.getCoordinate(), kingFigure.getColor())).toBeTruthy();
  });


  it('Diagonal attack', () => {
    const board = new Board();
    const attackedFigureInspector = new AttackedFigureInspector(board);

    const kingFigure = new King('white');
    const blackBishop = new Bishop('black');

    board.getCellByCoordinate({X: 2, Y: 2}).setFigure(kingFigure);
    board.getCellByCoordinate({X: 5, Y: 5}).setFigure(blackBishop);
    expect(attackedFigureInspector.isFigureUnderAttack(kingFigure.getCoordinate(), kingFigure.getColor())).toBeTruthy();

    board.getCellByCoordinate({X: 5, Y: 5}).removeFigure();
    board.getCellByCoordinate({X: 0, Y: 4}).setFigure(blackBishop);
    expect(attackedFigureInspector.isFigureUnderAttack(kingFigure.getCoordinate(), kingFigure.getColor())).toBeTruthy();
  });


  it('Pawn attack', () => {
    const board = new Board();
    const attackedFigureInspector = new AttackedFigureInspector(board);

    const kingFigure = new King('white');
    const blackPawn = new Pawn('black');

    board.getCellByCoordinate({X: 2, Y: 2}).setFigure(kingFigure);
    board.getCellByCoordinate({X: 1, Y: 1}).setFigure(blackPawn);
    expect(attackedFigureInspector.isFigureUnderAttack(kingFigure.getCoordinate(), kingFigure.getColor())).toBeTruthy();

    board.getCellByCoordinate({X: 1, Y: 1}).removeFigure();
    board.getCellByCoordinate({X: 0, Y: 5}).setFigure(blackPawn);
    expect(attackedFigureInspector.isFigureUnderAttack(kingFigure.getCoordinate(), kingFigure.getColor())).not.toBeTruthy();
  });


  it('Knight attack', () => {
    const board = new Board();
    const attackedFigureInspector = new AttackedFigureInspector(board);

    const kingFigure = new King('white');
    const blackKnight = new Knight('black');

    board.getCellByCoordinate({X: 2, Y: 2}).setFigure(kingFigure);
    board.getCellByCoordinate({X: 4, Y: 1}).setFigure(blackKnight);
    expect(attackedFigureInspector.isFigureUnderAttack(kingFigure.getCoordinate(), kingFigure.getColor())).toBeTruthy();

    board.getCellByCoordinate({X: 4, Y: 1}).removeFigure();
    board.getCellByCoordinate({X: 7, Y: 7}).setFigure(blackKnight);
    expect(attackedFigureInspector.isFigureUnderAttack(kingFigure.getCoordinate(), kingFigure.getColor())).not.toBeTruthy();
  });
});