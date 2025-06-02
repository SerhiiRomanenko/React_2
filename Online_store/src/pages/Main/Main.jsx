import styles from "./Main.module.scss";

import { Outlet } from "react-router-dom";

export default function Main() {
	return (
		<main className={styles.main}>
			<Outlet />
		</main>
	);
}
