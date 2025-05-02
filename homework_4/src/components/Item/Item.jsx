import React, { useState } from "react";
import { services } from "../../services/users";
import getRandomHexColor from "../../utils/utils";
import Button from "../Button/Button";

export default function Item({ item, setUsers }) {
  const [editingName, setEditingName] = useState("");
  const [editingUserID, setEditingUserID] = useState(null);

  async function handleChangeCheck(item) {
    try {
      await services.put(item.id, {
        complited: !item.complited,
      });

      setUsers((prevValue) =>
        prevValue.map((value) =>
          value.id === item.id ? { ...item, complited: !item.complited } : value
        )
      );
    } catch (error) {
      console.error(error);
    }
  }

  async function handleDelete(event, id) {
    try {
      event.stopPropagation();
      await services.delete(id);
      setUsers((prevValue) => prevValue.filter((item) => item.id !== id));
    } catch (error) {
      console.log(error);
    }
  }

  function handleClickName(name, id) {
    setEditingUserID(id);
    setEditingName(name);
  }

  function handleChangeInput(e) {
    setEditingName(e.target.value);
  }

  async function handleSaveName() {
    try {
      if (!editingName.trim()) {
        console.log("Enter some name!");
        return;
      }

      await services.put(editingUserID, {
        name: editingName,
      });
      setUsers((prevItem) => {
        return prevItem.map((item) => {
          if (item.id !== editingUserID) {
            return item;
          } else {
            return { ...item, name: editingName };
          }
        });
      });
      setEditingUserID(null);
      setEditingName("");
    } catch (error) {
      console.log(error);
    }
  }

  function handleCancelEditing() {
    setEditingUserID(null);
    setEditingName("");
  }
  const handleChangeColor = (e) => {
    console.log(e.currentTarget);
    e.currentTarget.style.backgroundColor = getRandomHexColor();
  };
  return (
    <div key={item.id} className="user" onClick={(e) => handleChangeColor(e)}>
      <input
        type="checkbox"
        checked={!item.complited ? false : true}
        onChange={() => handleChangeCheck(item)}
        className="user__checkbox"
      />
      {editingUserID === item.id ? (
        <div>
          <input value={editingName} onChange={(e) => handleChangeInput(e)} />
          <input type="button" value="save" onClick={handleSaveName} />
          <input type="button" value="cancel" onClick={handleCancelEditing} />
        </div>
      ) : (
        <h3
          className="user__name"
          title="U can cange me =) Just click!"
          onClick={() => handleClickName(item.name, item.id)}
        >
          {item.name}
        </h3>
      )}
      <p className="user__username">
        <b>Name:</b> {item.username}
      </p>
      <p className="user__email">
        <b>Email:</b>
        <a href={`mailto:${item.email}`}>{item.email}</a>
      </p>
      <p className="user__adress">
        <b>Address:</b> {item.address.city} city,
        {item.address.street} str, {item.address.suite}, (zip:
        {item.address.zipcode})
      </p>
      <p className="user__coordinats">
        <span>Latitude: {item.address.geo.lat}, </span>
        <span>longitude: {item.address.geo.lng}</span>
      </p>
      <p className="user__phone">
        <b>Phone:</b>
        <a type="tel" href={`tel:item.phone`}>
          {item.phone}
        </a>
      </p>
      <p className="user__website">
        <b>Website: </b>
        <a href={`http://${item.website}`}>{item.website}</a>
      </p>
      <p className="user__company">
        <b>Job: </b>
        {item.company.bs}, {item.company.catchPhrase} in
        <b> {item.company.name}</b>
      </p>
      <Button item={item} handleDelete={handleDelete} color="#dc3545" />
    </div>
  );
}
