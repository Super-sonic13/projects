import Bishop from '../../game/models/Figures/Bishop';

describe('Bishop class', () => {

  const bishop = new Bishop('white');

  const expected1 = [[
    {X: 1, Y: 1}, {X: 2, Y: 2}, {X: 3, Y: 3}, {X: 4, Y: 4},
    {X: 5, Y: 5}, {X: 6, Y: 6}, {X: 7, Y: 7}
  ], [], [], []];

  const expected2 = [[
    {X: 6, Y: 1}, {X: 5, Y: 2}, {X: 4, Y: 3}, {X: 3, Y: 4},
    {X: 2, Y: 5}, {X: 1, Y: 6}, {X: 0, Y: 7}
  ], [], [], []];

  const expected3 = [
    [{ X: 4, Y: 4}, {X: 3, Y: 5}, {X: 2, Y: 6}, {X: 1, Y: 7}],
    [{ X: 6, Y: 2}, {X: 7, Y: 1}],
    [{ X: 4, Y: 2}, {X: 3, Y: 1}, {X: 2, Y: 0}],
    [{ X: 6, Y: 4}, {X: 7, Y: 5}]
  ];
  const expected4 = [
    [{ X: 1, Y: 4}, {X: 0, Y: 3}],
    [{ X: 1, Y: 6}, {X: 0, Y: 7}],
    [{ X: 3, Y: 4}, {X: 4, Y: 3}, {X: 5, Y: 2}, {X: 6, Y: 1}, {X: 7, Y: 0}],
    [{ X: 3, Y: 6}, {X: 4, Y: 7}]
  ];

  it('moves without any figures on board', () => {

    bishop.setCoordinate({X: 0, Y: 0});
    expect(bishop.getMoves()).toEqual(expect.arrayContaining(expected1));

    bishop.setCoordinate({X: 7, Y: 0});
    expect(bishop.getMoves()).toEqual(expect.arrayContaining(expected2));

    bishop.setCoordinate({X: 5, Y: 3});
    expect(bishop.getMoves()).toEqual(expect.arrayContaining(expected3));

    bishop.setCoordinate({X: 2, Y: 5});
    expect(bishop.getMoves()).toEqual(expect.arrayContaining(expected4));
  });
});