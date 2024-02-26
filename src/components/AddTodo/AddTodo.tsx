import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '../../app/store';
import {addTitle} from '../../container/todoListSlice';

const AddTodo: React.FC = () => {
  const input = useSelector((state: RootState) => state.todos.todoCandidate.title);
  const dispatch: AppDispatch = useDispatch();

  const onFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(e.currentTarget[0]);
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
        value={input}
      />
      <button type="submit" className="btn btn-primary ms-3" style={{width: 130}}>Add ToDO</button>
    </form>
  );
};

export default AddTodo;