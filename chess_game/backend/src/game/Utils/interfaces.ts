import { color, coordinate, figureType } from './types';

export interface responseFigureData {
  color: color,
  type: figureType,
  attacked?: boolean
}

export interface responseCellData {
  coordinate: coordinate,
  figure: responseFigureData | null,
  isAvailabelMove: boolean
}

export interface responseData {
  permissionToMove: color;
  board: responseCellData[][];
}

export interface movesResponse {
  whiteMoves: string[],
  blackMoves: string[]
}

export type BoardJSON = responseCellData[][];