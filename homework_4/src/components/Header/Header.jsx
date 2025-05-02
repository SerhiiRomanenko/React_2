import React, { useState } from "react";
import logo from "../../assets/images/icons/users_logo.png";
import "../Header/Header.scss";
import Form from "../Form/Form";

export default function Header({ getUsers }) {
  const [showForm, setShowForm] = useState(false);

  return (
    <header className="header">
      <div className="header__top">
        <a href="#">
          <img className="header__logo" src={logo} alt="logo" />
        </a>
        <h1>
          <a className="header__title" href="#">
            Users HUB
          </a>
        </h1>
        <button
          className="header__addUser"
          onClick={() => setShowForm(!showForm)}
        >
          Add user
        </button>
      </div>
      {showForm && <Form getUsers={getUsers} setShowForm={setShowForm} />}
    </header>
  );
}
