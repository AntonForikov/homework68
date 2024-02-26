import {createAction, createSlice} from '@reduxjs/toolkit';
import {Task} from '../types';
import axiosApi from '../axiosApi';
import {AppDispatch} from '../app/store';

interface TodoSlice {
  todoCandidate: Task,
  apiData: Task,
  loading: boolean,
  error: boolean
}

const initialState: TodoSlice = {
  todoCandidate: {
    done: false,
    title: ''
  },
  apiData: {
    done: false,
    title: ''
  },
  loading: false,
  error: false
};

export const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {

  },
  extraReducers: (builder) => {
    builder.addCase(fetchTodosStarted, (state) => {
      state.loading = true;
      state.error = false;
    });
    builder.addCase(fetchTodosSuccess, (state, action) => {
      state.loading = false;
      state.apiData.title = action.payload.title;
      state.apiData.done = action.payload.done;
    });
    builder.addCase(fetchTodosFailure, (state) => {
      state.loading = false;
      state.error = true;
    });
    builder.addCase(addTitle, (state, action) => {
      state.todoCandidate.title = action.payload;
      console.log(state.todoCandidate.title);
    });
  }
});

export const todosReducer = todoSlice.reducer;
export const fetchTodosStarted = createAction('todo/fetchStarted');
export const fetchTodosSuccess = createAction('todo/fetchSuccess', (todo: Task) => ({payload: todo}));
export const fetchTodosFailure = createAction('todo/fetchFailure');
export const addTitle = createAction('todo/addTitle', (newTitle: string) => ({payload: newTitle}));

export const getData = async (dispatch: AppDispatch) => {
  try{
    dispatch(fetchTodosStarted());
    const response = await axiosApi.get<Task | null>('/tasks.json');
    if (response.data === null) {
      console.log(response.data);
      dispatch(fetchTodosSuccess({done: false, title: ''}));
    } else {
      console.log(response.data);
      dispatch(fetchTodosSuccess(response.data));
    }
  } catch {
    dispatch(fetchTodosFailure());
  }
};