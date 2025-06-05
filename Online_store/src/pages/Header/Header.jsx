import { NavLink } from "react-router-dom";
import styles from "./Header.module.scss";
import logo from "../../assets/images/pictures/logo.png";

export default function Header() {
	return (
		<header className={styles.header}>
			<div className={styles.header__container}>
				<NavLink to="/">
					<img className={styles.header__logo} src={logo} />
				</NavLink>
				<nav className={styles.header__menu}>
					<ul className={styles.header__navList}>
						<li>
							<NavLink to="/">ДОМАШНЯ</NavLink>
						</li>
						<li>
							<NavLink to="/trailers">ПРИЧЕПИ</NavLink>
						</li>
						<li>
							<NavLink to="/details">ЗАПЧАСТИНИ</NavLink>
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
