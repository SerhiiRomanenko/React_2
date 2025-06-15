import Header from "../Header/Header";
import Footer from "../Footer/Footer";

import { Outlet } from "react-router-dom";

import styles from "./Layout.module.scss";

export default function Layout() {
  return (
    <>
      <Header />
      <main className={styles.main}>
        <div className={styles.main__container}>
          <Outlet />
        </div>
      </main>
      <Footer />
    </>
  );
}
