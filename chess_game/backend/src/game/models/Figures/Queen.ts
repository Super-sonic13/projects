import Figure from './Figure';
import { color, coordinate, directionalMoves} from '../../Utils/types';
import { responseFigureData } from '../../Utils/interfaces';

class Queen extends Figure {

  constructor(color: color) {
    super(color);
  }

  public getMoves = (): directionalMoves => {

    const figureCoordinate: coordinate = this.getCoordinate();
    const figureMoves: directionalMoves = [ [], [], [], [], [], [], [], [] ];

    for(let i = 1; i < 8; i++) {

      if(this.isValidCoordinate(figureCoordinate.X - i, figureCoordinate.Y + i)) 
        figureMoves[0].push({X: figureCoordinate.X - i, Y: figureCoordinate.Y + i});

      if(this.isValidCoordinate(figureCoordinate.X + i, figureCoordinate.Y - i)) 
        figureMoves[1].push({X: figureCoordinate.X + i, Y: figureCoordinate.Y - i});

      if(this.isValidCoordinate(figureCoordinate.X - i, figureCoordinate.Y - i)) 
        figureMoves[2].push({X: figureCoordinate.X - i, Y: figureCoordinate.Y - i});

      if(this.isValidCoordinate(figureCoordinate.X + i, figureCoordinate.Y + i)) 
        figureMoves[3].push({X: figureCoordinate.X + i, Y: figureCoordinate.Y + i});

      if(this.isValidCoordinate(figureCoordinate.X - i, figureCoordinate.Y))
        figureMoves[4].push({X: figureCoordinate.X - i, Y: figureCoordinate.Y});

      if(this.isValidCoordinate(figureCoordinate.X + i, figureCoordinate.Y))
      figureMoves[5].push({X: figureCoordinate.X + i, Y: figureCoordinate.Y});

      if(this.isValidCoordinate(figureCoordinate.X, figureCoordinate.Y + i))
        figureMoves[6].push({X: figureCoordinate.X, Y: figureCoordinate.Y + i});
      
      if(this.isValidCoordinate(figureCoordinate.X, figureCoordinate.Y - i))
        figureMoves[7].push({X: figureCoordinate.X, Y: figureCoordinate.Y - i});
    }

    return figureMoves;
  };   

  
  public toJSON(): responseFigureData {
    return {
      color: this.getColor(),
      type: 'Queen'
    }
  }
    
}

export default Queen;