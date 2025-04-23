import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import animalGroups from "./data"

createRoot(document.getElementById('root')).render(
    // -------------------Send props (caption and data)----------------------------//
    <App caption={"Animal groups"} data={animalGroups}/>
)
