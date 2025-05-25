import { NavLink } from "react-router-dom";

export default function Menu() {
  return (
    <nav className="menu">
      <ul className="menu__list flex gap-x-4 p-2">
        <li className="menu__item bg-red-200 rounded-md hover:bg-sky-400 transition duration-300 ease-in-out border border-gray-200">
          <NavLink className="menu__itemLink block w-full h-full p-2 " to="/">
            Home
          </NavLink>
        </li>
        <li className="menu__item bg-red-200 rounded-md hover:bg-sky-400 transition duration-300 ease-in-out border border-gray-200">
          <NavLink
            className="menu__itemLink block w-full h-full p-2"
            to="/countries"
          >
            Countries
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
