import Board from '../../models/Board';

import King from '../../models/Figures/King';

import FigureAnalayzer from './AttackedFigureInspector';

import { color, coordinate } from '../../Utils/types';


class CheckInspector {

  private readonly _board;
  private readonly _figureAnalyzer;
  public static wKingCoordinate: coordinate;
  public static bKingCoordinate: coordinate;

  constructor(board: Board) {
    this._board = board;
    this._figureAnalyzer = new FigureAnalayzer(this._board);
    CheckInspector.bKingCoordinate = {X: 0, Y: 4};
    CheckInspector.wKingCoordinate = {X: 7, Y: 4};
  }

  public static changeKingCoordinate(coordinate: coordinate, permissionColor: color): void {
    permissionColor === 'white' 
      ? CheckInspector.wKingCoordinate = coordinate
      : CheckInspector.bKingCoordinate = coordinate;
  }

  public setAttackedStatusForKing(permissionColor: color): void {
    const kingCoordinate = permissionColor === 'white' ? CheckInspector.wKingCoordinate : CheckInspector.bKingCoordinate;
    const kingFigure = this._board.getCellByCoordinate(kingCoordinate).getFigure() as King;
    kingFigure.setAttacked(true);
  }

  public resetAttackedStatusForKing(permissionColor: color): void {
    const kingCoordinate = permissionColor === 'white' ? CheckInspector.wKingCoordinate : CheckInspector.bKingCoordinate;
    const kingFigure = this._board.getCellByCoordinate(kingCoordinate).getFigure() as King;
    kingFigure.setAttacked(false);
  }

  public isCheck = (permissionColor: color) => {
    const kingCoordinates = permissionColor === 'white' ? CheckInspector.wKingCoordinate : CheckInspector.bKingCoordinate;
    if(this._figureAnalyzer.isFigureUnderAttack(kingCoordinates, permissionColor)) return true;
    return false;
  }
}

export default CheckInspector;