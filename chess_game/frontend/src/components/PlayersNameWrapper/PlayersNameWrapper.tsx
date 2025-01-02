import React, { useState, useEffect, useContext } from 'react';
import { useSelector } from 'react-redux';
import { SocketContext } from '../../contexts/socket';
import { RootState } from '../../store/store';

import styles from './PlayersNameWrapper.module.scss';

interface PlayersNameWrapperProps {
  children: React.ReactNode
}

const PlayersNameWrapper: React.FC<PlayersNameWrapperProps> = ({ children }) => {

  const [oponentPlayerName, setOponentPlayerName] = useState<string>('');

  const socket  = useContext(SocketContext);
  const userName = useSelector((state: RootState) => state.user.name);

  useEffect(() => {
    socket.on('roomInfo:read', (roomInfo) => {
      userName === roomInfo.player_1.name 
        ? setOponentPlayerName(roomInfo.player_2.name)
        : setOponentPlayerName(roomInfo.player_1.name)
    });

    return () => {
      socket.off('roomInfo:read');
    };
  }, []);

  return(
    <>
      <div className={styles.nameContainer}>
        {oponentPlayerName}
      </div>

      {children}

      <div className={styles.nameContainer}>
        {userName}
      </div>
    </>
  )

}

export default PlayersNameWrapper;