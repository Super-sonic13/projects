import Board from '../../game/models/Board';

import Bishop from '../../game/models/Figures/Bishop';
import King from '../../game/models/Figures/King';
import Knight from '../../game/models/Figures/Knight';
import Rook from '../../game/models/Figures/Rook';

import CheckInspector from '../../game/classes/Inspectors/CheckInspector';


describe('Testing CheckInspector class', () => {

  const board = new Board();
  const checkInspector = new CheckInspector(board);

  it('isCheck method', () => {

    const wKingFigure = new King('white');
    board.getCellByCoordinate({X: 7, Y: 4}).setFigure(wKingFigure);

    const enemyRook = new Rook('black');
    const enemyBishop = new Bishop('black');
    const enemyKnight = new Knight('black');

    board.getCellByCoordinate({X: 1, Y: 4}).setFigure(enemyRook);
    expect(checkInspector.isCheck('white')).toBeTruthy();
    board.getCellByCoordinate({X: 1, Y: 4}).removeFigure();

    board.getCellByCoordinate({X: 7, Y: 1}).setFigure(enemyRook);
    expect(checkInspector.isCheck('white')).toBeTruthy();
    board.getCellByCoordinate({X: 7, Y: 1}).removeFigure();

    board.getCellByCoordinate({X: 5, Y: 2}).setFigure(enemyBishop);
    expect(checkInspector.isCheck('white')).toBeTruthy();
    board.getCellByCoordinate({X: 5, Y: 2}).removeFigure();

    board.getCellByCoordinate({X: 5, Y: 5}).setFigure(enemyKnight);
    expect(checkInspector.isCheck('white')).toBeTruthy();
    board.getCellByCoordinate({X: 5, Y: 5}).removeFigure();
  });
});