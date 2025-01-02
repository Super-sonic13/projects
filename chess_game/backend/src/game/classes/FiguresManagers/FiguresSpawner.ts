import Board from '../../models/Board';

import Pawn from '../../models/Figures/Pawn';
import Rook from '../../models/Figures/Rook';
import Knight from '../../models/Figures/Knight';
import Bishop from '../../models/Figures/Bishop';
import Queen from '../../models/Figures/Queen';
import King from '../../models/Figures/King';

import { color } from '../../Utils/types';


class FiguresSpawner {
  
  private setMainFiguresOnBoardRow = (board: Board, rowIndex: number, figuresColor: color): void => {

    const row = board.getRowByIndex(rowIndex);

    row[0].setFigure(new Rook(figuresColor));
    row[1].setFigure(new Knight(figuresColor));
    row[2].setFigure(new Bishop(figuresColor));
    row[3].setFigure(new Queen(figuresColor));
    row[4].setFigure(new King(figuresColor));
    row[5].setFigure(new Bishop(figuresColor));
    row[6].setFigure(new Knight(figuresColor));
    row[7].setFigure(new Rook(figuresColor));
  }

  
  private setPawnsOnBoardRow = (board: Board, rowIndex: number, figuresColor: color): void => {
    board.getRowByIndex(rowIndex).forEach(cell => cell.setFigure(new Pawn(figuresColor)));
  }
  

  public setFiguresOnBoard = (board: Board): void => {

    this.setMainFiguresOnBoardRow(board, 0, 'black');
    this.setPawnsOnBoardRow(board, 1, 'black');

    this.setPawnsOnBoardRow(board, 6, 'white');
    this.setMainFiguresOnBoardRow(board, 7, 'white');

  }

}

export default FiguresSpawner;