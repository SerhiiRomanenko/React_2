import { nanoid } from 'nanoid';
import "./App.css";

function App({caption = "List", data = []}) {
  return (
    // ----------------------------Create table----------------------------------//
      <table className="table">
      {/*--------------------------Render title----------------------------------*/}
        <caption>{caption}</caption> 
        <tbody>
        {/*------------------------Render data----------------------------------*/}
        {data.length > 0 ? 
       data.map(item => {
        return <tr key={item.id}>
          <th>{item.category}</th>
          {item.animals.map(item => {
            return <td key={nanoid()} style={{color: item.color}}>{item.name}</td>
          })}
        </tr>
       })
        : null
        }
        </tbody>
      </table> 
  )
}

export default App
