import {createAction, createSlice} from '@reduxjs/toolkit';

interface TodoSlice {
  id: string,
  title: string,
  done: boolean,
  loading: boolean,
  error: boolean
}

const initialState: TodoSlice = {
  id: '',
  title: '',
  done: false,
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
      state.title = action.payload;
    });
    builder.addCase(fetchTodosFailure, (state) => {
      state.loading = false;
      state.error = true;
    });
  }
});

export const todosReducer = todoSlice.reducer;
export const fetchTodosStarted = createAction('todo/fetchStarted');
export const fetchTodosSuccess = createAction('todo/fetchSuccess', (todoTitle: string) => ({payload: todoTitle}));
export const fetchTodosFailure = createAction('todo/fetchFailure');