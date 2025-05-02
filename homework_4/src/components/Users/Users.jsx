import React, { useEffect, useState } from "react";
import "./Users.scss";
import { services } from "../../services/users";
import Item from "../Item/Item";
import Header from "../Header/Header";

export default function Users() {
  const [users, setUsers] = useState([]);

  async function getUsers() {
    try {
      const result = await services.get();
      setUsers(result);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getUsers();
  }, []);

  useEffect(() => {
    console.log("Users changed: ", users);
  }, [users]);

  return (
    <>
      <Header getUsers={getUsers} />
      <div className="users">
        {users.length
          ? users.map((item) => {
              return <Item key={item.id} item={item} setUsers={setUsers} />;
            })
          : null}
      </div>
    </>
  );
}
