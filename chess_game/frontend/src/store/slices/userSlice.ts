import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { color } from '../../utils/types';
import { UserData } from '../types';

const initialState: UserData = {
  name: '',
  room: '',
  color: 'white'
}

export const userSlice = createSlice({
  name: 'UpdateUserDataAction',
  initialState: initialState,
  reducers: {
    setUserName: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
    setUserRoom: (state, action: PayloadAction<string>) => {
      state.room = action.payload;
    },
    setUserColor: (state, action: PayloadAction<color>) => {
      state.color = action.payload;
    }
  }
});

export const { setUserName, setUserRoom, setUserColor } = userSlice.actions;
export default userSlice.reducer;