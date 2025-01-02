import Board from '../models/Board';

import FiguresMover from '../classes/FiguresManagers/FiguresMover';
import FiguresSpawner from '../classes/FiguresManagers/FiguresSpawner';



import { color, coordinate } from '../Utils/types';
import TrackMovesProvider from '../classes/Providers/TrackMovesProvider';


class BoardController {

  private readonly _board;
  private readonly _figuresSpawner;
  private readonly _figuresMover;
  // private readonly _trackMovesProvider;

  constructor(board: Board) {
    this._board = board;
    this._figuresSpawner = new FiguresSpawner();
    this._figuresMover = new FiguresMover(this._board);
    // this._trackMovesProvider = new TrackMovesProvider(this._board);
  }

  public moveFigure(startCoordinate: coordinate, targetCoordinate: coordinate): void {
    this._figuresMover.moveFigure(startCoordinate, targetCoordinate);
    // this._trackMovesProvider.writeMove(startCoordinate, targetCoordinate);
  }

  public setFiguresOnBoard(): void {
    this._figuresSpawner.setFiguresOnBoard(this._board);
  }
}

export default BoardController;