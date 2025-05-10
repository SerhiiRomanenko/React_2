import { useEffect, useState } from "react";

import service from "../../services/mockapi";

function useTodosLists() {
  const [tasks, setTasks] = useState([]);

  async function getTasks() {
    try {
      const response = await service.get();
      setTasks(response);
    } catch (err) {
      console.log(err);
    }
  }

  async function handleDelete(id) {
    try {
      console.log(id);
      await service.del(id);
      getTasks();
    } catch (error) {
      console.log(error);
    }
  }

  async function handleUpdate(id, status) {
    try {
      await service.update(id, status);
      getTasks();
      console.log(id, status);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getTasks();
  }, []);

  useEffect(() => {
    console.log(tasks);
  }, [tasks]);

  return { tasks, getTasks, handleDelete, handleUpdate };
}

export default useTodosLists;
