import React, { useState, useEffect } from "react";
import "./List.css";
import animals from "../../data/data";

const getRandomItem = (arr) => {
  let filtredArr = arr.filter((item) => item.active !== true);
  if (filtredArr.length === 0) {
    return null;
  }
  let randomIndex = Math.floor(Math.random() * filtredArr.length);
  console.log(filtredArr[randomIndex]);
  return filtredArr[randomIndex];
};

function List() {
  const [list, setList] = useState(structuredClone(animals));

  useEffect(() => {
    const interval = setInterval(() => {
      let randomItem = getRandomItem(list);
      if (randomItem) {
        setList((prevList) =>
          prevList.map((item) =>
            item.type === randomItem.type
              ? { ...item, active: !item.active }
              : item
          )
        );
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [list]);

  return (
    <div className="animals">
      <table className="animals__table">
        <tbody>
          {" "}
          {/* Додано тег <tbody> для усунення warning */}
          {list.map((item, index) => {
            return (
              <tr
                key={index}
                className={
                  item.active ? "animals__tableRow active" : "animals__tableRow"
                }
              >
                <td className="animals__tableType">{item.type}</td>
                <td className="animals__tableIcon">{item.icon}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default List;
