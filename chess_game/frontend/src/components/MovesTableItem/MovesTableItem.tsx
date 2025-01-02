import React from 'react';

import styles from './MovesTableItem.module.scss';

interface MovesTableItemProps {
  moveIndex: number,
  whiteMove: string,
  blackMove: string
}

const MovesTableItem: React.FC<MovesTableItemProps> = ({ moveIndex, whiteMove, blackMove }) => {
  return (
    <div className={styles.movesRow}>
      <div className={styles.rowIndex}>{moveIndex}</div>
      <div className={styles.moveContainer}>{whiteMove}</div>
      <div className={styles.moveContainer}>{blackMove === undefined ? '' : blackMove}</div>
    </div>
  )
}

export default MovesTableItem;