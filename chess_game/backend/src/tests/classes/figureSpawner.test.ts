import Board from '../../game/models/Board';

import Pawn from '../../game/models/Figures/Pawn';
import Rook from '../../game/models/Figures/Rook';
import Knight from '../../game/models/Figures/Knight';
import Bishop from '../../game/models/Figures/Bishop';
import King from '../../game/models/Figures/King';
import Queen from '../../game/models/Figures/Queen';

import FiguresSpawner from '../../game/classes/FiguresManagers/FiguresSpawner';


describe('Testing FigureSpawner class', () => {

  const board = new Board();
  const figureSpawner = new FiguresSpawner();
  figureSpawner.setFiguresOnBoard(board);


  it('find rooks on board', () => {
    expect(board.getCellByCoordinate({X: 0, Y: 0}).getFigure() instanceof Rook).toBeTruthy();
    expect(board.getCellByCoordinate({X: 0, Y: 7}).getFigure() instanceof Rook).toBeTruthy();
    expect(board.getCellByCoordinate({X: 7, Y: 0}).getFigure() instanceof Rook).toBeTruthy();
    expect(board.getCellByCoordinate({X: 7, Y: 7}).getFigure() instanceof Rook).toBeTruthy();
  });


  it('fing bishops on board', () => {
    expect(board.getCellByCoordinate({X: 0, Y: 2}).getFigure() instanceof Bishop).toBeTruthy();
    expect(board.getCellByCoordinate({X: 0, Y: 5}).getFigure() instanceof Bishop).toBeTruthy();
    expect(board.getCellByCoordinate({X: 7, Y: 2}).getFigure() instanceof Bishop).toBeTruthy();
    expect(board.getCellByCoordinate({X: 7, Y: 5}).getFigure() instanceof Bishop).toBeTruthy();
  });


  it('find knights on board', () => {
    expect(board.getCellByCoordinate({X: 0, Y: 1}).getFigure() instanceof Knight).toBeTruthy();
    expect(board.getCellByCoordinate({X: 0, Y: 6}).getFigure() instanceof Knight).toBeTruthy();
    expect(board.getCellByCoordinate({X: 7, Y: 1}).getFigure() instanceof Knight).toBeTruthy();
    expect(board.getCellByCoordinate({X: 7, Y: 6}).getFigure() instanceof Knight).toBeTruthy();
  });


  it('find pawnd on board', () => {
    board.getRowByIndex(1).forEach(cell => {
      expect(cell.getFigure() instanceof Pawn).toBeTruthy();
    })

    board.getRowByIndex(6).forEach(cell => {
      expect(cell.getFigure() instanceof Pawn).toBeTruthy();
    })
  });


  it('find kings on board', () => {
    expect(board.getCellByCoordinate({X: 0, Y: 4}).getFigure() instanceof King).toBeTruthy();
    expect(board.getCellByCoordinate({X: 7, Y: 4}).getFigure() instanceof King).toBeTruthy();
  });


  it('find queens on board', () => {
    expect(board.getCellByCoordinate({X: 0, Y: 3}).getFigure() instanceof Queen).toBeTruthy();
    expect(board.getCellByCoordinate({X: 7, Y: 3}).getFigure() instanceof Queen).toBeTruthy();
  });
});