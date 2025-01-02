import React, { useContext } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';

import { SocketContext } from '../../contexts/socket';

import FigureImg from '../FigureImg/FigureImg';

import { coordinate, cell } from '../../utils/types';
import styles from './BoardCell.module.scss';


interface BoarCellProps {
  cellData: cell,
  indexes: [number, number],
  activeCellCoordinate: coordinate,
  setActiveCellCoordinate: (value: coordinate) => void
}


const BoardCell: React.FC<BoarCellProps> = ({ cellData, indexes, activeCellCoordinate, setActiveCellCoordinate }) => {

  const socket = useContext(SocketContext);
  const userRoom: string = useSelector((state: RootState) => state.user.room);
  

  const getColorStyleForCell = (): Object => {
    const indexSum = indexes[0] + indexes[1];
    if(cellData.figure?.attacked) return styles.attackedCell
    return indexSum % 2 === 0 ? styles.whiteCell : styles.blackCell
  }
  

  const onClickHandler = (cellCoordinate: coordinate): void => {

    if(cellData.isAvailabelMove) {
      socket.emit('board:moveFigure', {startCoordinate: activeCellCoordinate, targetCoordinate: cellData.coordinate}, userRoom)
      return; 
    }

    if(!cellData.figure) return;

    setActiveCellCoordinate(cellData.coordinate);
    socket.emit('board:getMoves', userRoom, cellCoordinate);
  }

  return(
    <div className={`${styles.boardCell} ${getColorStyleForCell()}`} onClick={() => onClickHandler(cellData.coordinate)}>
      <FigureImg figure={cellData.figure} />
      {
        cellData.isAvailabelMove ? <div className={styles.availableMoveMark}></div> : null
      }
    </div>
  )
}

export default React.memo(BoardCell);