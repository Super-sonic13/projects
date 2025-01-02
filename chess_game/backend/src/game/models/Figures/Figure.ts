import { responseFigureData } from '../../Utils/interfaces';
import { color, coordinate, directionalMoves, moves } from '../../Utils/types';

abstract class Figure {

  private readonly _color: color;
  private _coordinate: coordinate;

  constructor(color: color) {
    this._color = color;
    this._coordinate = { X: 0, Y: 0};
  }

  public getColor = (): color => this._color;

  public getCoordinate = (): coordinate => this._coordinate;

  public setCoordinate(coordinate: coordinate) {
    this._coordinate = coordinate;
  }

  public isValidCoordinate = (xCoordinate: number, yCoordinate: number): boolean => {
    if(xCoordinate >= 0 && xCoordinate < 8) {
      if(yCoordinate >= 0 && yCoordinate < 8) return true;
    }
    return false;
  } 

  abstract getMoves(): moves | directionalMoves;

  abstract toJSON(): responseFigureData;
}

export default Figure;