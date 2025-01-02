import React from 'react';
import { useSelector } from 'react-redux';
import { SocketContext, socket } from '../../contexts/socket';
import { RootState } from '../../store/store';

import GamePage from '../../pages/GamePage/GamePage';
import StartGamePage from '../../pages/StartGamePage/StartGamePage';


import styles from './App.module.scss';


const App: React.FC = () => {

  const userRoom = useSelector((state: RootState) => state.user.room);

  return (    
    <SocketContext.Provider value={socket}>
      <div className={styles.container}>
        {
          userRoom === '' ? <StartGamePage/> : <GamePage/>
        }
      </div>
    </SocketContext.Provider>
  );
}

export default App;
