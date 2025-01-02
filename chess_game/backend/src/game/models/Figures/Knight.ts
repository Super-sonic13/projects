import Figure from './Figure';
import { color, coordinate, moves } from '../../Utils/types';
import { responseFigureData } from '../../Utils/interfaces';

class Knight extends Figure {

  constructor(color: color) {
    super(color);
  }

  public getMoves(): moves {

    const figureCoordinate: coordinate = this.getCoordinate();
    const figureMoves: moves = [];

    figureMoves.push(
      {X: figureCoordinate.X + 2, Y: figureCoordinate.Y + 1},
      {X: figureCoordinate.X + 2, Y: figureCoordinate.Y - 1},
      {X: figureCoordinate.X - 2, Y: figureCoordinate.Y + 1},
      {X: figureCoordinate.X - 2, Y: figureCoordinate.Y - 1},
      {X: figureCoordinate.X + 1, Y: figureCoordinate.Y + 2},
      {X: figureCoordinate.X + 1, Y: figureCoordinate.Y - 2},
      {X: figureCoordinate.X - 1, Y: figureCoordinate.Y + 2},
      {X: figureCoordinate.X - 1, Y: figureCoordinate.Y - 2}
    );

    return figureMoves.filter(coordinate => this.isValidCoordinate(coordinate.X, coordinate.Y));
  }; 


  public toJSON(): responseFigureData {
    return {
      color: this.getColor(),
      type: 'Knight'
    }
  }
    
}

export default Knight;