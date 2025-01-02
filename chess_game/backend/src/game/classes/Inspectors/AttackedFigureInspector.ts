import Board from '../../models/Board';

import Pawn from '../../models/Figures/Pawn';
import Rook from '../../models/Figures/Rook';
import Knight from '../../models/Figures/Knight';
import Bishop from '../../models/Figures/Bishop';
import Queen from '../../models/Figures/Queen';

import MovesProvider from '../Providers/MovesProvider';

import { color, coordinate } from '../../Utils/types';


class AttackedFigureInspector {

  private readonly _board;
  private readonly _movesProvider;

  constructor(board: Board) {
    this._board = board;
    this._movesProvider = new MovesProvider();
  }
  
  private isFigureUnderKnightAttack(figureCoordinate: coordinate, figureColor: color): boolean {

    const tempKnightFigure = new Knight(figureColor);
    tempKnightFigure.setCoordinate(figureCoordinate);

    const knightMoves = this._movesProvider.getAvailabelMoves(tempKnightFigure, this._board);

    for(let move of knightMoves) {
      const figureOnCell = this._board.getCellByCoordinate(move).getFigure();
      if(figureOnCell instanceof Knight) return true;
    } 

    return false
  }


  private isFigureUnderPawnAttack = (figureCoordinate: coordinate, figureColor: color): boolean => {

    const tempPawnFigure = new Pawn(figureColor);
    tempPawnFigure.setCoordinate(figureCoordinate);

    const pawnMoves = this._movesProvider.getAvailabelMoves(tempPawnFigure, this._board);

    for(let move of pawnMoves) { 
      const figureOnCell = this._board.getCellByCoordinate(move).getFigure();
      if(figureOnCell instanceof Pawn) return true;
    }
    return false;
  }


  private isFigureUnderHorizontalOrVerticalAttack = (figureCoordinate: coordinate, figureColor: color): boolean => {

    const tempRookFigure = new Rook(figureColor);
    tempRookFigure.setCoordinate(figureCoordinate);

    const rookMoves = this._movesProvider.getAvailabelMoves(tempRookFigure, this._board);

    for(let move of rookMoves) {
      const figureOnCell = this._board.getCellByCoordinate(move).getFigure();
      if(figureOnCell instanceof Queen || figureOnCell instanceof Rook)
        return true;
    }
    return false;
  }


  private isFigureUnderDiagonalsAtack(figureCoordinate: coordinate, figureColor: color): boolean {

    const tempBishopFigure = new Bishop(figureColor);
    tempBishopFigure.setCoordinate(figureCoordinate);

    const bishopMoves = this._movesProvider.getAvailabelMoves(tempBishopFigure, this._board);

    for(let move of bishopMoves) {
      const figureOnCell = this._board.getCellByCoordinate(move).getFigure();
      if(figureOnCell instanceof Queen || figureOnCell instanceof Bishop)
        return true;
    }
    return false;
  }

  public isFigureUnderAttack(figureCoordinate: coordinate, figureColor: color): boolean {
    if(this.isFigureUnderKnightAttack(figureCoordinate, figureColor)) return true;
    if(this.isFigureUnderPawnAttack(figureCoordinate, figureColor)) return true;
    if(this.isFigureUnderHorizontalOrVerticalAttack(figureCoordinate, figureColor)) return true;
    if(this.isFigureUnderDiagonalsAtack(figureCoordinate, figureColor)) return true;
    return false;
  }

}

export default AttackedFigureInspector;