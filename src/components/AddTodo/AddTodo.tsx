import React from 'react';

const AddTodo: React.FC = () => {
  const changeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    console.log(name, value)
  }

  return (
    <form className='d-flex align-items-center m-3 justify-content-between'>
      <input
        type="text"
        className="form-control"
        id="todo"
        placeholder='Todo'
        name='title'
        onChange={changeTitle}
        required
      />
      <button type="submit" className="btn btn-primary ms-3" style={{width: 130}}>Add ToDO</button>
    </form>
  );
};

export default AddTodo;