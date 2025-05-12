import { useContext } from "react";
import "./style.scss";
import TodosListsFormContext from "../../contexts/TodosListsFormContext";
import TodosList from "./TodosList/TodosList";

export default function TodosLists() {
  const { tasks } = useContext(TodosListsFormContext);

  return <div className="tasks">{tasks.length ? <TodosList /> : null}</div>;
}
