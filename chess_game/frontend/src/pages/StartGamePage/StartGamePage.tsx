import React from 'react';

import StartGameForm from '../../layouts/StartGameForm/StartGameForm';

import styles from './StartGamePage.module.scss';


const StartGamePage: React.FC = () => {

  return (
    <div className={styles.startGamePage}>
      <StartGameForm/>
    </div>
  )
};

export default StartGamePage;