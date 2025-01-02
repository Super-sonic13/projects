import Board from '../models/Board';

import BoardController from './BoardController';
import CheckInspector from '../classes/Inspectors/CheckInspector';
import CheckmateInspector from '../classes/Inspectors/CheckmateInspector';
import PlayersTurnController from '../classes/Providers/PlayersTurnProvider';
import MovesTrackerController from '../classes/Providers/TrackMovesProvider';
import AvailabelMovesProvider from '../classes/Providers/AvailabelMovesProvider';

import { color, coordinate, moves } from '../Utils/types';


class GameController {

  public isCheckmate: boolean;
  private _isCheck: boolean;

  private readonly _board;
  private readonly _boardController;
  private readonly _availableMovesProvider;
  private readonly _checkInspector;
  private readonly _checkmateInspector;
  private readonly _playersTurnProvider;
  private readonly _trackMovesProvider;
 
  
  constructor() {
    this.isCheckmate = false;
    this._isCheck = false;

    this._board = new Board();
    this._boardController = new BoardController(this._board);
    this._checkInspector = new CheckInspector(this._board);
    this._availableMovesProvider = new AvailabelMovesProvider(this._checkInspector);
    this._checkmateInspector = new CheckmateInspector(this._board, this._availableMovesProvider);
    this._playersTurnProvider = new PlayersTurnController();
    this._trackMovesProvider = new MovesTrackerController(this._board);
  }

  public getBoard(): Board {
    return this._board;
  }

  public initFigures(): void {
    this._boardController.setFiguresOnBoard();
  }

  public getAvaiLabelMovesForFigureByCoordinate(cellCoordinate: coordinate): moves {
    const availabelMoves = this._availableMovesProvider.getMoves(cellCoordinate, this._board);
    return availabelMoves;
  }

  public resetCheckStatus(permissionColor: color): void {
    if(!this._isCheck) return;
    this._isCheck = false;
    this._checkInspector.resetAttackedStatusForKing(permissionColor); 
  }

  public inspectForCheckmate(permissionColor: color) {
    if(this._checkInspector.isCheck(permissionColor)) {
      this._isCheck = true;
      this._checkInspector.setAttackedStatusForKing(permissionColor);
      if(this._checkmateInspector.isCheckmate(permissionColor)) {
        console.log('checkmate')
        this.isCheckmate = true;
      } 
    }
  }

  public moveFigure(startCoordinate: coordinate, targetCoordinate: coordinate): void {
    const colorWithPermission = this._playersTurnProvider.getColorWithPermissionToMove();
    this.resetCheckStatus(colorWithPermission);
    this._trackMovesProvider.writeMove(startCoordinate, targetCoordinate);
    this._boardController.moveFigure(startCoordinate, targetCoordinate);
    this._playersTurnProvider.changePermissionToMove();
    this.inspectForCheckmate(this._playersTurnProvider.getColorWithPermissionToMove());
  }

  public getAllBoardMoves(): string[][] {
    let moves = [];
    moves.push(this._trackMovesProvider.getWhiteMoves());
    moves.push(this._trackMovesProvider.getBlackMoves());
    return moves;
  }
}

export default GameController;