import "./style.scss";
import { statuses } from "../../constants/constants";

import useForm from "./useForm";

export default function Form() {
  const { titleInputRef, handleChangeStatus, handleSubmit, selectedStatus } =
    useForm();

  return (
    <form className="form" onSubmit={handleSubmit}>
      <fieldset className="form__fieldset">
        <legend>Create task</legend>
        <label>
          Title:
          <input type="text" ref={titleInputRef} />
        </label>
        <label>
          Status:
          <select
            name="status"
            onChange={handleChangeStatus}
            value={selectedStatus}
          >
            {statuses.map((item) => {
              return (
                <option key={item.status} value={item.status}>
                  {item.statusText}
                </option>
              );
            })}
          </select>
        </label>
        <button type="submit">Create task</button>
      </fieldset>
    </form>
  );
}
