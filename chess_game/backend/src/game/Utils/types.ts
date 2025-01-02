

export type figureType = 'Pawn' | 'Rook' | 'Knight' | 'Bishop' | 'King' | 'Queen';

export type coordinates = [number, number];

export interface moveFigureSocketData {
  startCoordinate: coordinate,
  targetCoordinate: coordinate
}

//Refactored types
export type color = 'white' | 'black';
export type coordinate = { X: number, Y: number };


//Moves Types
export type moves = Array<coordinate>;
export type directionalMoves = Array<moves>;

 
