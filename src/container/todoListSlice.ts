import {createSlice} from '@reduxjs/toolkit';

interface TodoSlice {
  id: string,
  title: string,
  done: boolean
}

const initialState: TodoSlice = {
  id: '',
  title: '',
  done: false
};

export const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {

  }
});