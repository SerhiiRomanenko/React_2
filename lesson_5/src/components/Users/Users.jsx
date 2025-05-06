import React, { useEffect, useState } from "react";
import "./Users.scss";
import { services } from "../../services/users";
import Item from "../Item/Item";
import Header from "../Header/Header";

export default function Users() {
  const [users, setUsers] = useState([]);
  console.log("USERS");

  async function getUsers() {
    try {
      const result = await services.get();
      setUsers(result);
    } catch (error) {
      console.log(error);
    }
  }

  function getKeysForSort() {
    const keysForSort = [];
    for (let i = 0; i < users.length; i++) {
      keysForSort.push(users[i]);
      console.log(users[i]);
    }
    console.log("sorted", keysForSort);
  }

  useEffect(() => {
    getKeysForSort();
    getUsers();
  }, []);

  useEffect(() => {
    console.log("Users changed: ", users);
  }, [users]);

  return (
    <>
      <Header getUsers={getUsers} />
      <table className="users">
        <thead>
          <tr>
            <th scope="col">Merried</th>
            <th scope="col">User name</th>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Address</th>
            <th scope="col">Latitude</th>
            <th scope="col">Longitude</th>
            <th scope="col">Phone</th>
            <th scope="col">Website</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.length
            ? users.map((item) => {
                return <Item key={item.id} item={item} setUsers={setUsers} />;
              })
            : null}
        </tbody>
      </table>
    </>
  );
}
