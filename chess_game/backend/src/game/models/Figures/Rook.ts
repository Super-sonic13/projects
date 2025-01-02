import Figure from './Figure';
import { color, directionalMoves } from '../../Utils/types';
import { responseFigureData } from '../../Utils/interfaces';

class Rook extends Figure {

  private _moved: boolean;

  constructor(color: color) {
    super(color);
    this._moved = false;
  }

  public isMovedFigure = (): boolean => this._moved;
  
  public setFigureHasAlreaduMoved = (): boolean => this._moved = true;

  public getMoves = (): directionalMoves => {

    const figureCoordinate = this.getCoordinate();
    const figureMoves: directionalMoves = [ [], [], [], [] ];
    
    for(let i = 1; i < 8; i++) { 

      if(this.isValidCoordinate(figureCoordinate.X - i, figureCoordinate.Y))
        figureMoves[0].push({X: figureCoordinate.X - i, Y: figureCoordinate.Y});

      if(this.isValidCoordinate(figureCoordinate.X + i, figureCoordinate.Y))
      figureMoves[1].push({X: figureCoordinate.X + i, Y: figureCoordinate.Y});

      if(this.isValidCoordinate(figureCoordinate.X, figureCoordinate.Y + i))
        figureMoves[2].push({X: figureCoordinate.X, Y: figureCoordinate.Y + i});
      
      if(this.isValidCoordinate(figureCoordinate.X, figureCoordinate.Y - i))
        figureMoves[3].push({X: figureCoordinate.X, Y: figureCoordinate.Y - i});
    }

    return figureMoves;
  }; 

  public toJSON(): responseFigureData {
    return {
      color: this.getColor(),
      type: 'Rook'
    }
  }
    
}

export default Rook;