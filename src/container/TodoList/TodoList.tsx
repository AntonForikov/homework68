import React, {useCallback, useEffect} from 'react';
import TodoElement from '../../components/TodoElement/TodoElement';
import axiosApi from '../../axiosApi';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '../../app/store';
import {fetchTodosFailure, fetchTodosStarted, fetchTodosSuccess} from '../todoListSlice';

const TodoList: React.FC = () => {
  const todoTitile = useSelector((state:RootState) => state.todos.title);
  const todoDone = useSelector((state:RootState) => state.todos.done);
  const dispatch: AppDispatch = useDispatch();

  const fetchTodos = useCallback(async () => {
    try{
      dispatch(fetchTodosStarted());
      const response = await axiosApi.get<null | string>('tasks.json');
      if (response.data === null) {
        console.log(response.data);
        dispatch(fetchTodosSuccess('hardcoded title'));
      } else {
        dispatch(fetchTodosSuccess(response.data));
      }
    } catch {
      fetchTodosFailure();
    }
  }, [dispatch]);

  useEffect(() => {
    void fetchTodos();
  }, [fetchTodos]);

  return (
    <>
      <TodoElement done={todoDone} title={todoTitile} id='1' />
      <TodoElement done={false} title='Test1' id='2' />
    </>
  );
};

export default TodoList;