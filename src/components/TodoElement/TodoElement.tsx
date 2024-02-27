import React from 'react';
import {useDispatch} from 'react-redux';
import {changeDoneStatus} from '../../container/TodoList/todoThunks';
import {AppDispatch} from '../../app/store';

interface Props {
  id: string,
  title: string,
  done: boolean,
  onDelete: () => void
}
const TodoElement: React.FC<Props> = ({id, title,done, onDelete}) => {
  const dispatch: AppDispatch = useDispatch();
  const changeDone = () => {
    dispatch(changeDoneStatus(id));
  };

  return (
    <main className='d-flex justify-content-between align-items-center border border-primary m-3 p-2 rounded'>
      <h3>{title}</h3>
      <div className="form-check d-flex align-items-center">
        <div className='ms-2 me-4 d-flex'>
          <label htmlFor={id}>Done:</label>
          <input
            id={id}
            className="form-check-input ms-2  "
            type="checkbox"
            checked={done}
            onChange={changeDone}
          />
        </div>
        <button
          className='btn btn-danger'
          onClick={onDelete}
        >
          Delete
        </button>
      </div>
    </main>
  );
};

export default TodoElement;