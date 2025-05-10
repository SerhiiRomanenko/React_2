import React, { useContext } from "react";
import "./style.scss";
import TasksFormContext from "../../../contexts/TodosListsFormContext";

export default function Item() {
  const { tasks, handleDelete, handleUpdate } = useContext(TasksFormContext);

  return (
    <>
      <ul className="tasks__todoBox">
        <h3>To Do: {tasks.filter((item) => item.status === 0).length}</h3>
        {tasks
          .filter((item) => item.status === 0)
          .map((el) => (
            <>
              <li key={el.id} className="tasks__todoItem">
                {el.title}
                <button
                  className="tasks__button"
                  onClick={() => handleUpdate(el.id, 1)}
                >
                  In progress
                </button>
              </li>
            </>
          ))}
      </ul>
      <ul className="tasks__onHoldBox">
        <h3>On Hold: {tasks.filter((item) => item.status === 4).length}</h3>
        {tasks
          .filter((item) => item.status === 4)
          .map((el) => (
            <li key={el.id} className="tasks__onHoldItem">
              {el.title}
              <button
                className="tasks__button"
                onClick={() => handleUpdate(el.id, 0)}
              >
                To Do
              </button>
              <button
                className="tasks__button"
                onClick={() => handleUpdate(el.id, 1)}
              >
                In Progress
              </button>
            </li>
          ))}
      </ul>
      <ul className="tasks__inprogressBox">
        <h3>In Progress: {tasks.filter((item) => item.status === 1).length}</h3>

        {tasks
          .filter((item) => item.status === 1)
          .map((el) => (
            <li key={el.id} className="tasks__inprogressItem">
              {el.title}
              <button
                className="tasks__button"
                onClick={() => handleUpdate(el.id, 0)}
              >
                To Do
              </button>
              <button
                className="tasks__button"
                onClick={() => handleUpdate(el.id, 2)}
              >
                Done
              </button>
              <button
                className="tasks__button"
                onClick={() => handleUpdate(el.id, 4)}
              >
                On Hold
              </button>
            </li>
          ))}
      </ul>
      <ul className="tasks__doneBox">
        <h3>Done: {tasks.filter((item) => item.status === 2).length}</h3>
        {tasks
          .filter((item) => item.status === 2)
          .map((el) => (
            <li key={el.id} className="tasks__doneItem">
              {el.title}
              <button
                className="tasks__button"
                onClick={() => handleDelete(el.id)}
              >
                To Archive
              </button>
            </li>
          ))}
      </ul>
    </>
  );
}
