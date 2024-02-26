import {createAsyncThunk} from '@reduxjs/toolkit';
import axiosApi from '../../axiosApi';
import {TaskFromApi} from '../../types';

export const getData = createAsyncThunk(
  'todo/get',
  async () => {

    const {data} = await axiosApi.get<TaskFromApi | null>('/tasks.json');
    if (data !== null) {
      const idArr = Object.keys(data);
      return idArr.map((id) => ({...data[id], id: id}));
    } else {
      return [];
    }
  }
);