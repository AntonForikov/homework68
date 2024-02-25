import React from 'react';

interface Props {
  id: string,
  title: string,
  done: boolean,
}
const TodoElement: React.FC<Props> = ({title,done}) => {
  const changeDone = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e);
    console.log("Click");
  };

  return (
    <main className='d-flex justify-content-between align-items-center border border-primary m-3 p-2 rounded'>
      <h3>{title}</h3>
      <div className="form-check">
        <input
          className="form-check-input"
          type="checkbox"
          checked={done}
          onChange={changeDone}
        />
      </div>
    </main>
  );
};

export default TodoElement;