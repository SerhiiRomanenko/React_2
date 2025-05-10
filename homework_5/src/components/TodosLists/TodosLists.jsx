import { useContext } from "react";
import "./style.scss";
import TodosListsFormContext from "../../contexts/TodosListsFormContext";
import TodoList from "./TodoList/TodoList";

export default function TodosLists() {
  const { tasks } = useContext(TodosListsFormContext);

  return <div className="tasks">{tasks.length ? <TodoList /> : null}</div>;
}
