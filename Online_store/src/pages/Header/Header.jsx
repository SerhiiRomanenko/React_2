import { NavLink } from "react-router-dom";
import styles from "./Header.module.scss";

export default function Header() {
	return (
		<header className={styles.header}>
			<nav>
				<ul>
					<li>
						<NavLink to="/">Домашня</NavLink>
						<NavLink to="/details">Деталі</NavLink>
						<NavLink to="/contacts">Контакти</NavLink>
					</li>
				</ul>
			</nav>
		</header>
	);
}
