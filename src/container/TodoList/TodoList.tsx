import React from 'react';
import Header from '../../components/Header/Header';
import TodoElement from '../../components/TodoElement/TodoElement';
import AddTodo from '../../components/AddTodo/AddTodo';

const TodoList: React.FC = () => {
  return (
    <>
     <Header/>
      <AddTodo />
      <TodoElement done={true} title='Test' id='1' />
      <TodoElement done={false} title='Test1' id='2' />
    </>
  );
};

export default TodoList;