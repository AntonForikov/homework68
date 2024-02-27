import {createAsyncThunk} from '@reduxjs/toolkit';
import axiosApi from '../../axiosApi';
import {TaskFromApi} from '../../types';
import {RootState} from '../../app/store';

export const getData = createAsyncThunk(
  'todo/get',
  async () => {
    const {data} = await axiosApi.get<TaskFromApi | null>('/tasks.json');
    if (data !== null) {
      const idArr = Object.keys(data);
      return idArr.map((id) => ({...data[id], id: id})).reverse();
    } else {
      return [];
    }
  }
);

export const sendData = createAsyncThunk<void, undefined, {state: RootState}> (
  'todo/send',
  async (_arg, thunkAPI) => {
    const currentState = thunkAPI.getState().todos.todoCandidate;
    await axiosApi.post('/tasks.json', currentState);
  }
);

export const deleteData = createAsyncThunk (
  'todo/delete',
  async (id: string) => {
    await axiosApi.delete(`/tasks/${id}.json`);
  }
);