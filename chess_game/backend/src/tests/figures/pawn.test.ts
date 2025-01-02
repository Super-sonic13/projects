import Pawn from '../../game/models/Figures/Pawn';

describe('Pawn class', () => {
  
  describe('basic moves without figures on board', () => {

    const whitePawn = new Pawn('white');
    const blackPawn = new Pawn('black');
     
    it('white pawn moves', () => {
      whitePawn.setCoordinate({X: 3,  Y: 2});
      expect(whitePawn.getMoves()).toEqual(expect.arrayContaining([{X: 2, Y: 2}, {X: 1, Y: 2}]));
    });

    it('black pawn moves', () => {
      blackPawn.setCoordinate({X: 1, Y: 2});
      expect(blackPawn.getMoves()).toEqual(expect.arrayContaining([{X: 2, Y: 2}, {X: 3, Y: 2}]));
    });

    it('white pawn moves when figure has already move', () => {
      whitePawn.setCoordinate({X: 4, Y: 7});
      whitePawn.setFigureHasAlreaduMoved();
      expect(whitePawn.getMoves()).toEqual(expect.arrayContaining([{X: 3, Y: 7}]));
    });

    it('black pawn when figure has already move', () => {
      blackPawn.setCoordinate({X: 6, Y: 5});
      blackPawn.setFigureHasAlreaduMoved();
      expect(blackPawn.getMoves()).toEqual(expect.arrayContaining([{X: 7, Y: 5}]));
    });
  });
});