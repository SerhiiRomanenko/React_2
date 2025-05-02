import React, { useRef } from "react";
import { services } from "../../services/users";

export default function Form({ getUsers, setShowForm }) {
  const nameInput = useRef("");
  const mailInput = useRef("");
  const websiteInput = useRef("");

  async function handleAddUser(e) {
    e.preventDefault();
    const newUser = {
      id: "9",
      name: nameInput.current.value,
      username: "Delphdasdasdasdasdine",
      email: mailInput.current.value,
      address: {
        street: "Dayna asdasdasdaPark",
        suite: "Suite asdasd449",
        city: "Bartholomebury",
        zipcode: "76495-3109",
        geo: {
          lat: "24.6463",
          lng: "-168.8889",
        },
      },
      phone: "(775)976-6794 x41206",
      website: websiteInput.current.value,
      company: {
        name: "Yost and Sons",
        catchPhrase: "Switchable contextually-based project",
        bs: "aggregate real-time technologies",
      },
    };
    try {
      if (
        nameInput.current.value.trim() &&
        mailInput.current.value.trim() &&
        websiteInput.current.value.trim()
      ) {
        await services.post(newUser);
        setShowForm(false);
        getUsers((prevValue) => prevValue.push(newUser));
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className="modal" onClick={() => setShowForm(false)}>
      <div className="form" onClick={(e) => e.stopPropagation()}>
        <h2 className="form__title">User edition form</h2>

        <div className="form__group">
          <label className="form__label">Name:</label>
          <input type="text" className="form__input" ref={nameInput} />
        </div>

        <div className="form__group">
          <label className="form__label">Email:</label>
          <input type="text" className="form__input" ref={mailInput} />
        </div>

        <div className="form__group">
          <label className="form__label">Website:</label>
          <input type="text" className="form__input" ref={websiteInput} />
        </div>

        <div className="form__buttons">
          <button className="form__cancel" onClick={() => setShowForm(false)}>
            Cancel
          </button>
          <button className="form__submit" onClick={(e) => handleAddUser(e)}>
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}
