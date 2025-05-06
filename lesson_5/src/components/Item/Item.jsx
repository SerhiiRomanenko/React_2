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
    e.currentTarget.style.backgroundColor = getRandomHexColor();
  };
  return (
    <tr key={item.id} className="user" onClick={(e) => handleChangeColor(e)}>
      <td>
        <input
          type="checkbox"
          checked={!item.complited ? false : true}
          onChange={() => handleChangeCheck(item)}
          className="user__checkbox"
        />
      </td>
      {editingUserID === item.id ? (
        <div>
          <input value={editingName} onChange={(e) => handleChangeInput(e)} />
          <input type="button" value="save" onClick={handleSaveName} />
          <input type="button" value="cancel" onClick={handleCancelEditing} />
        </div>
      ) : (
        <td
          className="user__name"
          title="U can cange me =) Just click!"
          onClick={() => handleClickName(item.name, item.id)}
        >
          {item.name}
        </td>
      )}
      <td className="user__username">{item.username}</td>
      <td className="user__email">
        <a href={`mailto:${item.email}`}>{item.email}</a>
      </td>
      <td className="user__adress">
        {item.address.city} city,
        {item.address.street} str, {item.address.suite}, (zip:
        {item.address.zipcode})
      </td>
      <td className="user__coordinats">{item.address.geo.lat}</td>
      <td className="user__coordinats">{item.address.geo.lng}</td>
      <td className="user__phone">
        <a type="tel" href={`tel:item.phone`}>
          {item.phone}
        </a>
      </td>
      <td className="user__website">
        <a href={`http://${item.website}`}>{item.website}</a>
      </td>
      <td>
        <Button item={item} handleDelete={handleDelete} color="#dc3545" />
      </td>
    </tr>
  );
}
