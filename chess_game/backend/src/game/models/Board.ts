import Cell from './Cell';

import { coordinate } from '../Utils/types';


class Board {
  
  private readonly _cells: Cell[][];

  constructor () {
    this._cells = this.initBoard();
  }

  private initBoard = (): Cell[][] => {
    
    let board: Cell[][] = [];

    for(let i = 0; i < 8; i++) {
      board[i] = [];
      for(let j = 0; j < 8; j++) {
        board[i][j] = new Cell(i, j);
      };
    };

    return board;
  }

  public getRowByIndex = (rowIndex: number): Cell[] => this._cells[rowIndex];

  public getCellByCoordinate = (coordinate: coordinate): Cell => {

    for(let row of this._cells) {
      let searchingCell = row.find(cell => Cell.isEqualCoordinates(cell.getCoordinates(), coordinate));
      
      if(searchingCell) return searchingCell;
    }

    throw Error('Cell not found');
  }

  public toJSON = () => this._cells.map(row => row.map(cell => cell.toJSON()));
  
}

export default Board;