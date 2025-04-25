import React, {useState, useEffect} from "react";
import "./List.css";
import animals from "../../data/data";

const rangeOfNumbers = (min, max) => {
    min = Math.ceil(min)
    max = Math.floor(max)
  
    return Math.floor(Math.random() * (max - min + 1)) + min
  }

//   console.log(rangeOfNumbers(1, 5));

function List() {
    const [list, setList] = useState(structuredClone(animals));

    useEffect(() => {
        setInterval(()=> {
            // setList([...list, {type: `flamingo`, icon: `🦩`}]);
            setList(prevItem => {
                console.log(prevItem)
                return {...prevItem, active: true}
            });
        }, 1000)         
    })

    return (
        <div className="animals">
             <table className="animals__table">
                <tbody> {/* Додано тег <tbody> для усунення warning */}
                {
                    list.map((item, index) => {
                    return (
                        <tr 
                            key={index} 
                            className={item.active ? "animals__tableRow active" : "animals__tableRow"}
                        >
                            <td className="animals__tableType">{item.type}</td>
                            <td className="animals__tableIcon">{item.icon}</td>
                        </tr>
                    )
                })}
                </tbody>
            </table>
        </div>
       )
}

export default List;