import React, {useEffect} from 'react';
import TodoElement from '../../components/TodoElement/TodoElement';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '../../app/store';
import {getData} from './todoThunks';



const TodoList: React.FC = () => {
  const todos = useSelector((state:RootState) => state.todos.apiData);
  const isLoading = useSelector((state:RootState) => state.todos.loading);
  const failure = useSelector((state:RootState) => state.todos.error);
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(getData());
  }, [dispatch]);
  return (
    <>
      {failure ? <h1 className='ms-3'>Please check URL!</h1>
      : isLoading
          ? <div className='d-flex justify-content-center'><div className="spinner-border text-primary"></div></div>
          : todos.length < 1 && !isLoading
            ? <h1 className='ms-3'>There is no data in database</h1>
            : todos.map((todo) => <TodoElement key={todo.id} id={todo.id} done={todo.done} title={todo.title} />)
      }
    </>
  );
};

export default TodoList;