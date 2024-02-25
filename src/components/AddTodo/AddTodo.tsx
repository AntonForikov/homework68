import React from 'react';

const AddTodo: React.FC = () => {
  return (
    <form className='d-flex align-items-center m-3 justify-content-between'>
      <input type="text" className="form-control" id="todo" placeholder='Todo'/>
      <button type="submit" className="btn btn-primary ms-3" style={{width: 150}}>Add ToDO</button>
    </form>
  );
};

export default AddTodo;