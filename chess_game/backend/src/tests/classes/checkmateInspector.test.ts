import Board from '../../game/models/Board';

import CheckInspector from '../../game/classes/Inspectors/CheckInspector';
import AvailabelMovesProvider from '../../game/classes/Providers/AvailabelMovesProvider';
import King from '../../game/models/Figures/King';
import Pawn from '../../game/models/Figures/Pawn';
import Bishop from '../../game/models/Figures/Bishop';
import CheckmateInspector from '../../game/classes/Inspectors/CheckmateInspector';

describe('Testin ChackmateInspector class', () => {

  const board = new Board();
  const checkInspector = new CheckInspector(board);
  const availableMovesProvider = new AvailabelMovesProvider(checkInspector);
  const checkmateInspector = new CheckmateInspector(board, availableMovesProvider);

  it('isCheckMate method', () => {

    const whiteKing = new King('white');

    board.getCellByCoordinate({X: 7, Y: 4}).setFigure(whiteKing);
    board.getCellByCoordinate({X: 7, Y: 3}).setFigure(new Pawn('white'));
    board.getCellByCoordinate({X: 7, Y: 5}).setFigure(new Pawn('white'));
    board.getCellByCoordinate({X: 6, Y: 5}).setFigure(new Pawn('white'));
    board.getCellByCoordinate({X: 6, Y: 4}).setFigure(new Pawn('white'));

    board.getCellByCoordinate({X: 5, Y: 2}).setFigure(new Bishop('black'));

    expect(checkmateInspector.isCheckmate('white')).toBeTruthy();
  });

});