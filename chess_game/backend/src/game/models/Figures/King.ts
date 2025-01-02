import Figure from './Figure';

import { color, coordinate, moves } from '../../Utils/types';
import { responseFigureData } from '../../Utils/interfaces';


class King extends Figure {

  private _moved: boolean;
  private _attacked: boolean;

  constructor(color: color) {
    super(color);
    this._moved = false;
    this._attacked = false;
  }

  public isMovedFigure = (): boolean => this._moved;

  public isAttackedFigure = (): boolean => this._attacked;
  
  public setFigureHasAlreaduMoved () {
    this._moved = true;
  } 

  public setAttacked(value: boolean) {
    this._attacked = value;
  }
  
  public getMoves(): moves {

    const figureCoordinate: coordinate = this.getCoordinate();
    const figuremoves: moves = [];

    figuremoves.push( 
      {X: figureCoordinate.X, Y: figureCoordinate.Y + 1},
      {X: figureCoordinate.X, Y: figureCoordinate.Y - 1},
      {X: figureCoordinate.X + 1, Y: figureCoordinate.Y},
      {X: figureCoordinate.X - 1, Y: figureCoordinate.Y},
      {X: figureCoordinate.X + 1, Y: figureCoordinate.Y + 1},
      {X: figureCoordinate.X + 1, Y: figureCoordinate.Y - 1},
      {X: figureCoordinate.X - 1, Y: figureCoordinate.Y + 1},
      {X: figureCoordinate.X - 1, Y: figureCoordinate.Y - 1},
    );
    
    return figuremoves.filter(coordinate => this.isValidCoordinate(coordinate.X, coordinate.Y));
  }; 
  

  public toJSON(): responseFigureData {
    return {
      color: this.getColor(),
      type: 'King',
      attacked: this._attacked
    }
  }
    
}

export default King;