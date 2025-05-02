import React from "react";

export default function Button({ handleDelete, item }) {
  return (
    <button onClick={(event) => handleDelete(event, item.id)}>Delete</button>
  );
}
