import React, { useContext, useState } from 'react';
import { useDispatch} from 'react-redux';
import { setUserColor, setUserName, setUserRoom} from '../../store/slices/userSlice';

import Input from '../../components/UI/Input/Input';
import Radio from '../../components/UI/Radio/Radio';
import TabBar from '../TabBar/Tabbar';

import styles from './StartGameForm.module.scss';
import { color } from '../../utils/types';
import { SocketContext } from '../../contexts/socket';

const StartGameForm: React.FC = () => {

  
  const tabLabels = ['NewGame', 'Join Game'];
  const [activeTab, setActiveTab] = useState<string>(tabLabels[0]);

  const [name, setName] = useState<string>('');
  const [room, setRoom] = useState<string>('');

  const [color, setColor] = useState<string>('');

  const socket = useContext(SocketContext);
  const dispatch = useDispatch();

  const joinGameHandler = () => {
    socket.emit('joinGame', {userName: name, roomName: room});
    dispatch(setUserName(name));
    dispatch(setUserRoom(room));
    socket.on('roomInfo:read', (roomInfo) => dispatch(setUserColor(roomInfo.player_2.color)));
  }

  const newGameHandler = () => {
    dispatch(setUserName(name));
    dispatch(setUserRoom(room));
    dispatch(setUserColor(color as color));
    socket.emit('newGame', {userName: name, userColor: color, roomName: room });
  }

  const buttonClickHandler = () => {
    activeTab === 'NewGame' ? newGameHandler() : joinGameHandler();
  }

  return (
    <div className={`${styles.form} ${activeTab === 'NewGame' ? styles.newGameForm : styles.joinGameForm}`}>

      <TabBar labels={tabLabels} activeTab={activeTab} setActiveTab={setActiveTab}/>

      <div className={`${styles.container} ${activeTab === 'NewGame' ? styles.newGameContainer : styles.joinGameContainer}`}>
        <Input placeholder='Enter your name...' onChangeHandler={setName}/>
        <Input placeholder='Enter room name...' onChangeHandler={setRoom}/>
        {
          activeTab === 'NewGame' 
          ? 
          <div className={styles.chooseColorSegment}>
            <Radio label='White' name='color' value='white' onChangeHandler={setColor}/>
            <Radio label='Black' name='color' value='black' onChangeHandler={setColor}/>
          </div>
          : null
        }
      </div>

      <button className={styles.submitButton} onClick={buttonClickHandler}>
        {activeTab === 'NewGame' ? 'Create new game' : 'Join game'}
      </button>

    </div>
  )
}

export default StartGameForm;