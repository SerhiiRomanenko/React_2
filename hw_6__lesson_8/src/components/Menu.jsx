import { NavLink } from "react-router-dom";

export default function Menu() {
	return (
		<nav className="menu p-5 bg-red-200">
			<ul className="menu__list flex gap-x-4">
				<li className="menu__item bg-yellow-200 mr-2">
					<NavLink className="menu__itemLink " to="/">
						Home
					</NavLink>
				</li>
				<li className="menu__item bg-yellow-200">
					<NavLink className="menu__itemLink" to="/countries">
						Countries
					</NavLink>
				</li>
			</ul>
		</nav>
	);
}
