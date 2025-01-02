import React from 'react';
import socketio from 'socket.io-client';
import config from '../config.json';

export const socket = socketio(config.SOCKET_URL);
export const SocketContext = React.createContext(socket);