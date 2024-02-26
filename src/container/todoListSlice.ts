import {createAction, createSlice} from '@reduxjs/toolkit';
import {Task, TaskFromApi, TaskWithId} from '../types';
import axiosApi from '../axiosApi';
import {AppDispatch} from '../app/store';

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
    builder.addCase(fetchTodosStarted, (state) => {
      state.loading = true;
      state.error = false;
    });
    builder.addCase(fetchTodosSuccess, (state, action) => {
      state.loading = false;
      state.apiData = action.payload;
      // state.apiData.title = action.payload.title;
      // state.apiData.done = action.payload.done;
    });
    builder.addCase(fetchTodosFailure, (state) => {
      state.loading = false;
      state.error = true;
    });
    builder.addCase(addTitle, (state, action) => {
      state.todoCandidate.title = action.payload;
    });
    // builder.addCase(addNewTodo, (state, action) => {
    //   state.todoCandidate.title = action.payload;
    //   console.log(state.todoCandidate.title);
    // });
  }
});

export const todosReducer = todoSlice.reducer;
export const fetchTodosStarted = createAction('todo/fetchStarted');
export const fetchTodosSuccess = createAction('todo/fetchSuccess', (todo: TaskWithId[]) => ({payload: todo}));
export const fetchTodosFailure = createAction('todo/fetchFailure');
export const addTitle = createAction('todo/addTitle', (newTitle: string) => ({payload: newTitle}));

// export const sendData = createAction('todo/sendTitle', (newTodo) => ({payload: newTodo}));

export const getData = async (dispatch: AppDispatch) => {
  try{
    dispatch(fetchTodosStarted());
    const {data} = await axiosApi.get<TaskFromApi | null>('/tasks.json');
    if (data !== null) {
      const idArr = Object.keys(data);
      const result = idArr.map((id) => ({...data[id], id: id}));
      console.log(result);
      dispatch(fetchTodosSuccess(result));

    } else {
      console.log(data);
      dispatch(fetchTodosSuccess([]));
    }
  } catch {
    dispatch(fetchTodosFailure());
  }
};

export const addNewTodo = async (data: TodoSlice) => {
  try {
    await axiosApi.post('/tasks.json', data.todoCandidate);
  } catch {
    alert('Please check URL!');
  }
};