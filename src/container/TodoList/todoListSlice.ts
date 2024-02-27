import {createAction, createSlice} from '@reduxjs/toolkit';
import {Task, TaskWithId} from '../../types';
import {changeDoneStatus, getData} from './todoThunks';

interface TodoSlice {
  todoCandidate: Task,
  apiData: TaskWithId[],
  loading: boolean,
  error: boolean
}

const initialState: TodoSlice = {
  todoCandidate: {
    done: false,
    title: ''
  },
  apiData: [],
  loading: false,
  error: false
};

export const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {

  },
  extraReducers: (builder) => {
    builder.addCase(getData.pending, (state) => {
      state.loading = true;
      state.error = false;
    });
    builder.addCase(getData.fulfilled, (state, action) => {
      state.loading = false;
      state.apiData = action.payload;
    });
    builder.addCase(getData.rejected, (state) => {
      state.loading = false;
      state.error = true;
    });
    builder.addCase(addTitle, (state, action) => {
      state.todoCandidate.title = action.payload;
    });
    builder.addCase(changeDoneStatus.fulfilled, (state,action) => {
      state.apiData = action.payload;
    });
  }
});

export const todosReducer = todoSlice.reducer;
export const addTitle = createAction('todo/addTitle', (newTitle: string) => ({payload: newTitle}));
