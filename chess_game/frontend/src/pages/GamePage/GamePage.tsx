import React from 'react';

import Board from '../../layouts/Board/Board';
import MovesTable from '../../layouts/MovesTable/MovesTable';


import styles from './GamePage.module.scss'


const GamePage: React.FC = () => {
  return (
    <div className={styles.container}>
      <Board/>
      <MovesTable/>
    </div>
  )
}

export default GamePage;