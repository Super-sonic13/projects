import Board from './game/models/Board';
import Cell from './game/models/Cell';

import { movesResponse, responseCellData } from './game/Utils/interfaces';
import { moves, coordinate } from './game/Utils/types';


class JSONParser {

  private isCoordinateAvailableMove(availableMoves: moves, coordinate: coordinate): boolean {
    for(let move of availableMoves) {
      if(Cell.isEqualCoordinates(move, coordinate)) return true;
    }
    return false;
  }

  public parseBoardToJSON(board: Board) {
    return board.toJSON();
  }

  public parseBoardtateWithAvailabelMoves(board: Board, availableMoves: moves): responseCellData[][] {
    
    const result = board.toJSON().map(row => {
        return row.map(cell => {
          if(this.isCoordinateAvailableMove(availableMoves, cell.coordinate)) 
            return {...cell, isAvailabelMove: true};
          return cell;
        });
      });

    return result;
  }

  public parseAllBoardMoves(moves: string[][]): movesResponse {
    return {
      whiteMoves: moves[0],
      blackMoves: moves[1]
    }
  
  }


}

export default JSONParser;