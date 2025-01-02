import Knight from '../../game/models/Figures/Knight';

describe('Knight class', () => {

  const knight = new Knight('white');

  it('moves without any figures on board', () => {

    const expected1 = [
      {X: 2, Y: 3}, {X: 2, Y: 5}, {X: 3, Y: 2},
      {X: 3, Y: 6}, {X: 5, Y: 2}, {X: 5, Y: 6},
      {X: 6, Y: 3}, {X: 6, Y: 5},
    ];
    const expected2 = [
      {X: 3, Y: 0}, {X: 7, Y: 0}, {X: 3, Y: 2},
      {X: 7, Y: 2}, {X: 4, Y: 3}, {X: 6, Y: 3} 
    ];
    const expected3 = [{X: 1, Y: 2}, {X: 2, Y: 1}];
    const expected4 = [{X: 2, Y: 6}, {X: 1, Y: 5}];
    
    
    knight.setCoordinate({X: 4, Y: 4});
    expect(knight.getMoves()).toEqual(expect.arrayContaining(expected1));

    knight.setCoordinate({X: 0, Y: 0});
    expect(knight.getMoves()).toEqual(expect.arrayContaining(expected3));

    knight.setCoordinate({X: 0, Y: 7});
    expect(knight.getMoves()).toEqual(expect.arrayContaining(expected4));

    knight.setCoordinate({X: 5, Y: 1});
    expect(knight.getMoves()).toEqual(expect.arrayContaining(expected2));
  });

});