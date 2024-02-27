import {createAction, createAsyncThunk} from '@reduxjs/toolkit';
import axiosApi from '../../axiosApi';
import {TaskFromApi, TaskWithId} from '../../types';
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

export const addTitle = createAction('todo/addTitle', (newTitle: string) => ({payload: newTitle}));

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

export const changeDoneStatus = createAsyncThunk<TaskWithId[], string, {state: RootState}> (
  'todo/changeTodo',
  async (id, thunkAPI)  => {
    const apiData = thunkAPI.getState().todos.apiData;
    const targetObjInArray = apiData.filter((todo) => todo.id === id);

    const localChangedArr = apiData.map((todo) => {
      if (todo.id === id) {
        return {...todo, done: !todo.done};
      }
      return todo;
    });

    const objToUpdate= {
      title: targetObjInArray[0].title,
      done: !targetObjInArray[0].done
    };

    await axiosApi.put(`/tasks/${id}.json`, objToUpdate);
    return localChangedArr;
  }
);