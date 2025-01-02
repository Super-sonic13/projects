import Cell from '../../game/models/Cell';

import King from '../../game/models/Figures/King';

import { coordinate } from '../../game/Utils/types';


describe('Cell class', () => {

  it('statick method equality of coordinates', () => {

    expect(Cell.isEqualCoordinates({X: 0, Y: 0}, {X: 0, Y: 0})).toBeTruthy();
    expect(Cell.isEqualCoordinates({X: 5, Y: 4}, {X: 5, Y: 4})).toBeTruthy();
    expect(Cell.isEqualCoordinates({X: 1, Y: 2}, {X: 2, Y: 1})).toBe(false);
    expect(Cell.isEqualCoordinates({X: 7, Y: 5}, {X: 6, Y: 5})).toBe(false);
    expect(Cell.isEqualCoordinates({X: 0, Y: 0}, {X: 7, Y: 7})).toBe(false);

  });


  it('set figure on board', () => {

    const cellCoordinates: coordinate = {X: 2, Y: 1};
    const kingFigure = new King('white');
    const cell = new Cell(cellCoordinates.X, cellCoordinates.Y);
    
    cell.setFigure(kingFigure);

    expect(Cell.isEqualCoordinates(kingFigure.getCoordinate(), cellCoordinates)).toBeTruthy();
  });


  it('get figure from cell', () => {

    const cell = new Cell(2, 5);
    const kingFigure = new King('white');

    expect(cell.getFigure()).toBeUndefined();

    cell.setFigure(kingFigure);
    expect(cell.getFigure() instanceof King);
  });


  it('remove figure from cell', () => {

    const cell = new Cell(2, 5);
    const kingFigure = new King('white');
    
    cell.setFigure(kingFigure);
    expect(cell.getFigure() instanceof King);

    cell.removeFigure();
    expect(cell.getFigure()).toBeUndefined();
  });


  it('has allied figure', () => {
    
    const cell = new Cell(2, 5);
    const kingFigure = new King('white');
    cell.setFigure(kingFigure);

    expect(cell.hasAlliedFigure('white')).toBeTruthy();
  });


  it('has enemy figure', () => {

    const cell = new Cell(2, 5);
    const kingFigure = new King('white');
    cell.setFigure(kingFigure);

    expect(cell.hasEnemyFigure('black')).toBeTruthy();
  });

})