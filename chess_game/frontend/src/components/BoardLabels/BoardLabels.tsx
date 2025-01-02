import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';

import styles from './BoardLabels.module.scss'


interface BoardLabelsProps {
  children: React.ReactNode
}

const BoardLabels: React.FC<BoardLabelsProps> = ({ children }) => {

  const columnsLabels: string[] = ['8', '7', '6', '5', '4', '3', '2', '1'];
  const rowsLabels: string[] = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];

  const userColor = useSelector((state: RootState) => state.user.color);

  return (
    <>
      <div className={styles.columnsLabels}>
        {
          userColor === 'black'
          ? columnsLabels.reverse().map((label, index) => <p className={styles.label} key={index}>{label}</p>)
          : columnsLabels.map((label, index) => <p className={styles.label} key={index}>{label}</p>)
        }
      </div>

      {children}

      <div className={styles.rowsLables}>
        {rowsLabels.map((label, index) => <p className={styles.label} key={index}>{label}</p>)}
      </div>
    </>
  )
}

export default BoardLabels;