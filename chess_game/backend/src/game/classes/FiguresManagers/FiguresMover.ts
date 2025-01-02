import Board from '../../models/Board';

import Figure from '../../models/Figures/Figure';
import Pawn from '../../models/Figures/Pawn';
import King from '../../models/Figures/King';
import Rook from '../../models/Figures/Rook';

import CastleProvider from '../Providers/CastleProvider';
import CheckInspector from '../Inspectors/CheckInspector';

import { coordinate } from '../../Utils/types';


class FiguresMover {

  private readonly _board;
  private readonly _castleProvider;
 
  constructor(board: Board) {
    this._board = board;
    this._castleProvider = new CastleProvider();
  }


  private afterMoveActions(figure: Figure, targetCoordinate: coordinate): void {

    if(figure instanceof King || figure instanceof Pawn || figure instanceof Rook) {
      if(!figure.isMovedFigure()) figure.setFigureHasAlreaduMoved();
    }

    if(figure instanceof King) CheckInspector.changeKingCoordinate(targetCoordinate, figure.getColor());
  }


  public moveFigure(startCoordinate: coordinate, targetCoordinate: coordinate): void {

    const startCell = this._board.getCellByCoordinate(startCoordinate);
    const targetCell = this._board.getCellByCoordinate(targetCoordinate);

    const figure = startCell.getFigure();
    if(!figure) throw new Error(`Cell with coordinates ${startCoordinate} doesn't have figure`);

    if(figure instanceof King)  this._castleProvider.isCastleMove(targetCoordinate, figure, this._board);

    targetCell.setFigure(figure);
    startCell.removeFigure();

    this.afterMoveActions(figure, targetCoordinate);
  }

}

export default FiguresMover;