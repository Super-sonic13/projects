import React, { useState, useEffect, useContext } from 'react';
import { SocketContext } from '../../contexts/socket';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';

import BoardCell from '../../components/BoardCell/BoardCell';
import BoardLabels from '../../components/BoardLabels/BoardLabels';

import { cell, coordinate } from '../../utils/types';
import styles from './Board.module.scss';


const Board: React.FC = () => {

  const socket = useContext(SocketContext);
  const userColor = useSelector((state: RootState) => state.user.color);

  const [board, setBoard] = useState<cell[][]>([]);
  const [activeCellCoordinate, setActiveCellCoordinate] = useState<coordinate>({X: 0, Y: 0});
  
  useEffect(() => {

    socket.on('board:read', (board) => setBoard(board));

    return () => {
      socket.off('board:read');
    }
  }, []);

  
  return(
    <div className={styles.board}>
      <BoardLabels>
      <div className={`${styles.boardCells} ${userColor === 'black' ? styles.blackSideBoardCells : ''}`}>
        {
          board.map(row => row.map(cell => {
            return(
              <BoardCell 
                cellData={cell}
                indexes={[cell.coordinate.X, cell.coordinate.Y]} 
                activeCellCoordinate={activeCellCoordinate}
                setActiveCellCoordinate={setActiveCellCoordinate}
                key={`${cell.coordinate.X} ${cell.coordinate.Y}`}
              />
            ) 
          }))
        }
      </div>
      </BoardLabels>
    </div>
  )
}

export default Board;