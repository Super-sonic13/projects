import Board from '../../models/Board';
import Cell from '../../models/Cell';

import AvailabelMovesProvider from '../Providers/AvailabelMovesProvider';

import { color, moves } from '../../Utils/types';


class CheckmateInspector {

  private readonly _board;
  private readonly _availableMovesProvider;
 
  constructor(board: Board, availableMovesProvider: AvailabelMovesProvider) {
    this._board = board;
    this._availableMovesProvider = availableMovesProvider;
  }

  private getNumFigureAvailableMovesByCell(cell: Cell): number {
    const figureCell = cell.getFigure();
    if(!figureCell) return 0;
    const figureCoordinates = figureCell.getCoordinate();
    const moves: moves = this._availableMovesProvider.getMoves(figureCoordinates, this._board);
    return moves.length;
  }

  private cellHasFigureOfThisColor(cell: Cell, color: color): boolean {
    const cellFigure = cell.getFigure();
    if(cellFigure && cellFigure.getColor() === color) return true;
    return false;
  }

  private getNumOfSideDefendingMovesByRow(boardRow: Cell[], permissionColor: color): number {

    let defendingMoves = 0;

    for(let cell of boardRow) {
      if(this.cellHasFigureOfThisColor(cell, permissionColor))
        defendingMoves += this.getNumFigureAvailableMovesByCell(cell);
    }
    
    return defendingMoves;
  }

  private sideHasDefendingMoves(permissionColor: color): boolean {

    let defendingMoves = 0;

    for(let i = 0; i < 8; i++) {
      let boardRow = this._board.getRowByIndex(i);
      defendingMoves += this.getNumOfSideDefendingMovesByRow(boardRow, permissionColor);
      if(defendingMoves > 1) return true
    }
    
    return false;
  }

  public isCheckmate(permissionColor: color) {
    if(this.sideHasDefendingMoves(permissionColor)) return false;
    return true;
  }
}

export default CheckmateInspector;