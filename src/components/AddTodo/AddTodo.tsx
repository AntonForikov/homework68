import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '../../app/store';
import {addTitle} from '../../container/TodoList/todoListSlice';
import {getData, sendData} from '../../container/TodoList/todoThunks';

const AddTodo: React.FC = () => {
  const input = useSelector((state: RootState) => state.todos.todoCandidate);
  const dispatch: AppDispatch = useDispatch();

  const onFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await dispatch(sendData());
    dispatch(addTitle(''));
    await dispatch(getData());
  };
  return (
    <form onSubmit={onFormSubmit} className='d-flex align-items-center m-3 justify-content-between'>
      <input
        type="text"
        className="form-control"
        id="todo"
        placeholder='Todo'
        name='title'
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => dispatch(addTitle(e.target.value))}
        required
        value={input.title}
      />
      <button
        type="submit"
        className="btn btn-primary ms-3"
        style={{width: 130}}
      >
        Add ToDO
      </button>
    </form>
  );
};

export default AddTodo;