import { NavLink } from "react-router-dom";
import styles from "./Header.module.scss";

export default function Header() {
	return (
		<header className={styles.header}>
			<div className={styles.header__container}>
				<nav>
					<ul className={styles.header__navList}>
						<li>
							<NavLink to="/">ДОМАШНЯ</NavLink>
						</li>
						<li>
							<NavLink to="/details">ДЕТАЛІ</NavLink>
						</li>
						<li>
							<NavLink to="/contacts">КОНТАКТИ</NavLink>
						</li>
					</ul>
				</nav>
			</div>
		</header>
	);
}
