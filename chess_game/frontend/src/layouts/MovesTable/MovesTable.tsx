import React, { useState, useEffect, useContext } from 'react';
import { SocketContext } from '../../contexts/socket';

import MovesTableItem from '../../components/MovesTableItem/MovesTableItem';
import PlayersNameWrapper from '../../components/PlayersNameWrapper/PlayersNameWrapper';

import { tableMoves } from '../../utils/types';
import styles from './MovesTable.module.scss';


const initialState: tableMoves = {
  whiteMoves: [], 
  blackMoves:[]
}

const MovesTable: React.FC = () => {

  const [moves, setMoves] = useState<tableMoves>(initialState);

  const socket  = useContext(SocketContext);

  useEffect(()=>{
    socket.on('moves:read', (moves) => setMoves(moves));

    return () => {
      socket.off('moves:read');
    };
  }, [])

  return (
    <div className={styles.movesTableWrapper}>
      <PlayersNameWrapper>
        <div className={styles.movesTable}>
          {
            moves.whiteMoves.map((move, index) => {
              return (
                <MovesTableItem 
                  moveIndex={index + 1} 
                  whiteMove={move} 
                  blackMove={moves?.blackMoves[index]}
                  key={index}
                />
              )
            })
          }
        </div>
      </PlayersNameWrapper>
    </div>
  )
}

export default MovesTable;