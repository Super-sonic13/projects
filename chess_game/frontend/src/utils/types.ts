export type color = 'black' | 'white';

export type coordinate = {X: number, Y: number};

export type figureType = 'Pawn' | 'Rook' | 'Knight' | 'Bishop' | 'King' | 'Queen';

export type figure = {
  color: color,
  type: figureType,
  attacked?: boolean
};

export type cell = {
  coordinate: coordinate,
  isAvailabelMove: boolean
  figure?: figure
};

export type userData = {
  name: string,
  color: color
}

export type tableMoves = {
  whiteMoves: string[],
  blackMoves: string[]
}
