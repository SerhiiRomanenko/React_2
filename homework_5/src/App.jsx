import Form from "./components/Form/Form";
import TodosLists from "./components/TodosLists/TodosLists";

import TodosListsFormContext from "./contexts/TodosListsFormContext";

import useTodosLists from "./components/TodosLists/useTodosLists";

function App() {
  const { tasks, getTasks, handleDelete, handleUpdate } = useTodosLists();

  return (
    <TodosListsFormContext.Provider
      value={{ tasks, getTasks, handleDelete, handleUpdate }}
    >
      <Form />
      <TodosLists />
    </TodosListsFormContext.Provider>
  );
}

export default App;
