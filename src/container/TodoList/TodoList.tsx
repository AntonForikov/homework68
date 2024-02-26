import React, {useEffect} from 'react';
import TodoElement from '../../components/TodoElement/TodoElement';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '../../app/store';
import {getData} from '../todoListSlice';


const TodoList: React.FC = () => {
  const todoTitle = useSelector((state:RootState) => state.todos.apiData.title);
  const todoDone = useSelector((state:RootState) => state.todos.apiData.done);
  const isLoading = useSelector((state:RootState) => state.todos.loading);
  const failure = useSelector((state:RootState) => state.todos.error);
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(getData);
  }, [dispatch]);

  return (
    <>
      {failure ? <h1 className='ms-3'>Please check URL!</h1>
      : isLoading
          ? <div className='d-flex justify-content-center'><div className="spinner-border text-primary"></div></div>
          : todoTitle === '' && !isLoading
            ? <h1>There is no data in database</h1>
            : <TodoElement done={todoDone} title={todoTitle} id='2' />
      }
    </>
  );
};

export default TodoList;