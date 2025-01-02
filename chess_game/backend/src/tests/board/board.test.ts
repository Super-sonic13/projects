import Board from '../../game/models/Board';

import { coordinate } from '../../game/Utils/types';


describe('Board class', () => {

  const board = new Board();

  it('get row by index', () => {

    const rowIndex = 4;
    const row = board.getRowByIndex(rowIndex);

    for(let coordinate of row) {
      expect(coordinate.getCoordinates().X).toEqual(rowIndex);
    }
  });


  it('get cell by coordinates', () => {

    const coordinate1: coordinate = {X: 0, Y: 0};
    const coordinate2: coordinate  = {X: 7, Y: 7};
    const coordinate3: coordinate  = {X: 7, Y: 5};
    const coordinate4: coordinate  = {X: 3, Y: 2};

    expect(board.getCellByCoordinate(coordinate1).getCoordinates()).toEqual(coordinate1);
    expect(board.getCellByCoordinate(coordinate2).getCoordinates()).toEqual(coordinate2);
    expect(board.getCellByCoordinate(coordinate3).getCoordinates()).toEqual(coordinate3);
    expect(board.getCellByCoordinate(coordinate4).getCoordinates()).toEqual(coordinate4);
  });


})