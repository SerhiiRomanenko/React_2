import React, { useEffect, useState } from "react";
import "./Users.scss";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [editingUserID, setEditingUserID] = useState(null);
  const [editingName, setEditingName] = useState("");
  const API = "https://jsonplaceholder.typicode.com/users";

  async function getUsers() {
    try {
      const response = await fetch(API);
      const result = await response.json();
      setUsers(result);
    } catch (error) {
      console.log(error);
    }
  }

  async function handleDelete(event, id) {
    try {
      event.stopPropagation();
      let response = await fetch(`${API}/${id}`, {
        method: "DELETE",
      });
      response.status === 200 &&
        setUsers((prevValue) => prevValue.filter((item) => item.id !== id));
    } catch (error) {
      console.log(error);
    }
  }

  async function handleChangeCheck(id) {
    try {
      let response = await fetch(`${API}/${id}`, {
        method: "PATCH",
        body: JSON.stringify({
          complited: true,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });
      response.status === 200 &&
        setUsers((prevValue) =>
          prevValue.map((item) => {
            if (item.id === id) {
              return { ...item, complited: !item.complited };
            }
            return item;
          })
        );
    } catch (error) {
      console.log(error);
    }
  }

  function handleClickName(name, id) {
    setEditingUserID(id);
    setEditingName(name);
    console.log(id);
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
      let response = await fetch(`${API}/${editingUserID}`, {
        method: "PATCH",
        body: JSON.stringify({
          name: editingName,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });

      if (response.status === 200) {
        setUsers((prevItem) => {
          return prevItem.map((item) => {
            if (item.id !== editingUserID) {
              return item;
            } else {
              return { ...item, name: editingName };
            }
          });
        });
      }
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

  useEffect(() => {
    getUsers();
  }, []);

  useEffect(() => {
    console.log("Users changed: ", users);
  }, [users]);

  return (
    <>
      <div className="users">
        {users.length
          ? users.map((item) => {
              return (
                <div key={item.id} className="user">
                  <input
                    type="checkbox"
                    checked={!item.complited ? false : true}
                    onChange={() => handleChangeCheck(item.id)}
                    className="user__checkbox"
                  />

                  {editingUserID === item.id ? (
                    <div>
                      <input
                        value={editingName}
                        onChange={(e) => handleChangeInput(e)}
                      />
                      <input
                        type="button"
                        value="save"
                        onClick={handleSaveName}
                      />
                      <input
                        type="button"
                        value="cancel"
                        onClick={handleCancelEditing}
                      />
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
                  <button onClick={(event) => handleDelete(event, item.id)}>
                    delete
                  </button>
                </div>
              );
            })
          : null}
      </div>
    </>
  );
}
