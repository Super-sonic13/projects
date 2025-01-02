import Board from '../../game/models/Board';

import King from '../../game/models/Figures/King';
import Knight from '../../game/models/Figures/Knight';
import Bishop from '../../game/models/Figures/Bishop';

import CheckInspector from '../../game/classes/Inspectors/CheckInspector';
import AvailableMovesProvider from '../../game/classes/Providers/AvailabelMovesProvider';



describe('Testing AvailableMovesProvider', () => {

  
  it('after move figure is check', () => {

    const board = new Board();
    const checkInspector = new CheckInspector(board);
    const availableMovesProvider = new AvailableMovesProvider(checkInspector);

    const knightFigure = new Knight('white');

    board.getCellByCoordinate({X: 7, Y: 4}).setFigure(new King('white'));
    board.getCellByCoordinate({X: 6, Y: 3}).setFigure(knightFigure);
    board.getCellByCoordinate({X: 5, Y: 2}).setFigure(new Bishop('black'));
    
    expect(availableMovesProvider.getMoves(knightFigure.getCoordinate(), board)).toEqual([]);
  });


  it('find defence move', () => {

    const board = new Board();
    const checkInspector = new CheckInspector(board);
    const availableMovesProvider = new AvailableMovesProvider(checkInspector);

    const knightFigure = new Knight('white');
    board.getCellByCoordinate({X: 7, Y: 4}).setFigure(new King('white'));
    board.getCellByCoordinate({X: 7, Y: 1}).setFigure(knightFigure);
    board.getCellByCoordinate({X: 5, Y: 2}).setFigure(new Bishop('black'));
  
    expect(availableMovesProvider.getMoves(knightFigure.getCoordinate(), board)).toEqual(expect.arrayContaining([{X: 6, Y: 3}, {X: 5, Y: 2}]));
  });
});