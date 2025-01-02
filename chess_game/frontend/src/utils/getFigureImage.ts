import wKing from '../assets/figuresImages/wKing.png';
import bKing from '../assets/figuresImages/bKing.png';
import wQueen from '../assets/figuresImages/wQueen.png';
import bQueen from '../assets/figuresImages/bQueen.png';
import wBishop from '../assets/figuresImages/wBishop.png';
import bBishop from '../assets/figuresImages/bBishop.png';
import wKnight from '../assets/figuresImages/wKnight.png';
import bKnight from '../assets/figuresImages/bKnight.png';
import wRook from '../assets/figuresImages/wRook.png';
import bRook from '../assets/figuresImages/bRook.png';
import wPawn from '../assets/figuresImages/wPawn.png';
import bPawn from '../assets/figuresImages/bPawn.png';
import { figure } from '../utils/types';

const getFigureImage = (figureData: figure): string => {

  const figure = `${figureData.color} ${figureData.type}`

  switch(figure) {
    case 'white King': return wKing;
    case 'black King': return bKing;
    case 'white Queen': return wQueen;
    case 'black Queen': return bQueen;
    case 'white Bishop': return wBishop;
    case 'black Bishop': return bBishop;
    case 'white Knight': return wKnight;
    case 'black Knight': return bKnight;
    case 'white Rook': return wRook;
    case 'black Rook': return bRook;
    case 'white Pawn': return wPawn;
    case 'black Pawn': return bPawn;
    default: return '';
  }

}

export default getFigureImage;