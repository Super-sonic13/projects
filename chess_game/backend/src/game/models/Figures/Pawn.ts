import Figure from './Figure';
import { color, coordinate, moves } from '../../Utils/types';
import { responseFigureData } from '../../Utils/interfaces';

class Pawn extends Figure {

  private _moved: boolean;

  constructor(color: color) {
    super(color);
    this._moved = false;
  }

  public isMovedFigure = (): boolean => this._moved;
  
  public setFigureHasAlreaduMoved = (): boolean => this._moved = true;

  public getMoves = (): moves => {

    const figureCoordinate: coordinate = this.getCoordinate();
    const figureColor = this.getColor();
    const figureMoves: moves = [];

    let step: number;
    figureColor == 'black' ? step = 1 : step = -1;
    figureMoves.push({X: figureCoordinate.X + step, Y: figureCoordinate.Y});
    
    if(!this._moved) figureMoves.push({X: figureCoordinate.X + (step * 2), Y: figureCoordinate.Y});

    return figureMoves.filter(coordinate => this.isValidCoordinate(coordinate.X, coordinate.Y));
  }; 

  
  public toJSON(): responseFigureData {
    return {
      color: this.getColor(),
      type: 'Pawn'
    }
  }
    
}

export default Pawn;