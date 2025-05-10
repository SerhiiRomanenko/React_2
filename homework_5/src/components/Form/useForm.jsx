import { useRef, useState, useContext } from "react";

import service from "../../services/mockapi";
import TodosListsFormContext from "../../contexts/TodosListsFormContext";

export default function useForm() {
  const [selectedStatus, setSelectedStatus] = useState(0);
  const titleInputRef = useRef("");

  const { getTasks } = useContext(TodosListsFormContext);

  function handleChangeStatus(event) {
    setSelectedStatus(event.target.value);
  }

  async function handleSubmit(event) {
    event.preventDefault();

    let titleValue = titleInputRef.current.value;

    try {
      if (titleValue.trim().length) {
        await service.post({
          title: titleValue.trim(),
          status: +selectedStatus,
        });
        titleInputRef.current.value = "";
        setSelectedStatus(0);
        getTasks();
      } else {
        console.log("Enter some task");
      }
    } catch (error) {
      console.log(error);
    }
  }

  return {
    titleInputRef,
    handleChangeStatus,
    handleSubmit,
    selectedStatus,
  };
}
