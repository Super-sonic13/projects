import Cell from '../../models/Cell';
import Board from '../../models/Board';

import Figure from '../../models/Figures/Figure';
import King from '../../models/Figures/King';

import CastleProvider from './CastleProvider';
import MovesProvider from './MovesProvider';
import CheckInspector from '../Inspectors/CheckInspector';

import { color, coordinate, moves } from '../../Utils/types';


class AvailabelMovesProvider {

  private readonly _movesProvider;
  private readonly _checkInspector;
  private readonly _castleProvider;

  constructor(checkInspector: CheckInspector) {
    this._castleProvider = new CastleProvider();
    this._movesProvider = new MovesProvider();
    this._checkInspector = checkInspector;
  }

  private doPreMove(startCell: Cell, figure: Figure, targetCell: Cell): void {
    targetCell.setFigure(figure);
    startCell.removeFigure();
    if(figure instanceof King) CheckInspector.changeKingCoordinate(targetCell.getCoordinates(), figure.getColor());
  }

  private undoPreMove(startCell: Cell, figure: Figure, targetCell: Cell, targetCellFigure: Figure | undefined) {
    startCell.setFigure(figure);
    targetCellFigure ? targetCell.setFigure(targetCellFigure) : targetCell.removeFigure();
    if(figure instanceof King) CheckInspector.changeKingCoordinate(startCell.getCoordinates(), figure.getColor());
  }

  private isAlliedKingUnderAttack(figureColor: color): boolean {
    return this._checkInspector.isCheck(figureColor);
  }

  private isCheckAfterMove(startCoordinate: coordinate, targetCoordinate: coordinate, board: Board) {

    const startCell = board.getCellByCoordinate(startCoordinate);
    const targetCell = board.getCellByCoordinate(targetCoordinate);
    const figure = startCell.getFigure();
    const targetCellFigure = targetCell.getFigure();

    if(!figure) throw Error('can`t get figure from cell');

    this.doPreMove(startCell, figure, targetCell);

    if(this.isAlliedKingUnderAttack(figure.getColor())) {
      this.undoPreMove(startCell, figure, targetCell, targetCellFigure);
      return true;
    } 

    this.undoPreMove(startCell, figure, targetCell, targetCellFigure);
    return false;
  }


  public getMoves = (startCoordinate: coordinate, board: Board): moves => {
    const figure = board.getCellByCoordinate(startCoordinate).getFigure();
    if(!figure) throw new Error(`Cell with coordinates ${startCoordinate} doesn't have figure`);

    const figureAvailabelMoves: moves = this._movesProvider.getAvailabelMoves(figure, board);

    if(figure instanceof King) 
      figureAvailabelMoves.push(...this._castleProvider.getCastleMove(figure, board));

    return figureAvailabelMoves.filter(move => !this.isCheckAfterMove(startCoordinate, move, board));
  }
}

export default AvailabelMovesProvider;