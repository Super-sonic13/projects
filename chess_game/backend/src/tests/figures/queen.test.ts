import Queen from '../../game/models/Figures/Queen';

describe('Queen class', () => {

  const queen = new Queen('white');

  const expectedMoves1 = [
    [{X: 0, Y: 1}, {X: 0, Y: 2}, {X: 0, Y: 3}, {X: 0, Y: 4}, {X: 0, Y: 5}, {X: 0, Y: 6}, {X: 0, Y: 7}],
    [{X: 1, Y: 1}, {X: 2, Y: 2}, {X: 3, Y: 3}, {X: 4, Y: 4}, {X: 5, Y: 5}, {X: 6, Y: 6}, {X: 7, Y: 7}],
    [{X: 1, Y: 0}, {X: 2, Y: 0}, {X: 3, Y: 0}, {X: 4, Y: 0}, {X: 5, Y: 0}, {X: 6, Y: 0}, {X: 7, Y: 0}],
    [], [], [], [], []
  ];

  const expectedMoves2 =[
    [{X: 5, Y: 4}, {X: 5, Y: 5}, {X: 5, Y: 6}, {X: 5, Y: 7}],
    [{X: 5, Y: 2}, {X: 5, Y: 1}, {X: 5, Y: 0}],
    [{X: 4, Y: 3}, {X: 3, Y: 3}, {X: 2, Y: 3}, {X: 1, Y: 3}, {X: 0, Y: 3}],
    [{X: 6, Y: 3}, {X: 7, Y: 3}],
    [{X: 6, Y: 4}, {X: 7, Y: 5}],
    [{X: 4, Y: 2}, {X: 3, Y: 1}, {X: 2, Y: 0}],
    [{X: 4, Y: 4}, {X: 3, Y: 5}, {X: 2, Y: 6}, {X: 1, Y: 7}],
    [{X: 6, Y: 2}, {X: 7, Y: 1}]
  ];

  it('moves without any figures on board', () => {

    queen.setCoordinate({X: 0, Y: 0});
    expect(queen.getMoves()).toEqual(expect.arrayContaining(expectedMoves1));

    queen.setCoordinate({X: 5, Y: 3}); 
    expect(queen.getMoves()).toEqual(expect.arrayContaining(expectedMoves2));

  });

});