import TodoList from './container/TodoList/TodoList';
import Header from './components/Header/Header';
import AddTodo from './components/AddTodo/AddTodo';

function App() {

  return (
    <>
      <Header/>
      <AddTodo />
      <main>
        <TodoList/>
      </main>
    </>
  );
}

export default App;
