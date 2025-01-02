import Rook from '../../game/models/Figures/Rook';

describe('Rook class', () => {

  const rook = new Rook('white');

  const expectedMoves1 = [
    [{X: 1, Y: 0}, {X: 2, Y: 0}, {X: 3, Y: 0}, {X: 4, Y: 0}, {X: 5, Y: 0}, {X: 6, Y: 0}, {X: 7, Y: 0}],
    [{X: 0, Y: 1}, {X: 0, Y: 2}, {X: 0, Y: 3}, {X: 0, Y: 4}, {X: 0, Y: 5}, {X: 0, Y: 6}, {X: 0, Y: 7}],
    [], []
  ];

  const expectedMoves2 = [
    [{X: 7, Y: 6}, {X: 7, Y: 5}, {X: 7, Y: 4}, {X: 7, Y: 3}, {X: 7, Y: 2}, {X: 7, Y: 1}, {X: 7, Y: 0}],
    [{X: 6, Y: 7}, {X: 5, Y: 7}, {X: 4, Y: 7}, {X: 3, Y: 7}, {X: 2, Y: 7}, {X: 1, Y: 7}, {X: 0, Y: 7}],
    [], []
  ];

  const expectedMoves3 = [
    [{X: 4, Y: 3}, {X: 4, Y: 2}, {X: 4, Y: 1}, {X: 4, Y: 0}],
    [{X: 4, Y: 5}, {X: 4, Y: 6}, {X: 4, Y: 7}],
    [{X: 5, Y: 4}, {X: 6, Y: 4}, {X: 7, Y: 4}],
    [{X: 3, Y: 4}, {X: 2, Y: 4}, {X: 1, Y: 4}, {X: 0, Y: 4}]
  ];

  it('moves without any figures on board', () => {

    rook.setCoordinate({X: 0, Y: 0});
    expect(rook.getMoves()).toEqual(expect.arrayContaining(expectedMoves1));

    rook.setCoordinate({X: 7, Y: 7});
    expect(rook.getMoves()).toEqual(expect.arrayContaining(expectedMoves2));

    rook.setCoordinate({X: 4, Y: 4});
    expect(rook.getMoves()).toEqual(expect.arrayContaining(expectedMoves3));

  });

});