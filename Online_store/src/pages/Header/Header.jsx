import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import styles from "./Header.module.scss";
import logo from "../../assets/images/pictures/logo.png";

export default function Header() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/?search=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <header className={styles.header}>
      <div className={styles.header__container}>
        <NavLink to="/">
          <img className={styles.header__logo} src={logo} />
        </NavLink>

        <nav className={styles.header__menu}>
          <ul className={styles.header__navList}>
            <li>
              <NavLink to="/">ПРИЧЕПИ</NavLink>
            </li>
            <li>
              <NavLink to="/details">ЗАПЧАСТИНИ</NavLink>
            </li>
            <li>
              <NavLink to="/contacts">КОНТАКТИ</NavLink>
            </li>
          </ul>
        </nav>
        <form onSubmit={handleSearch} className={styles.header__searchForm}>
          <div className={styles.header__searchWrapper}>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Пошук причепа"
              className={styles.header__searchInput}
            />
            {query && (
              <span
                className={styles.header__clearIcon}
                onClick={() => {
                  setQuery("");
                  navigate("/");
                }}
              >
                &times;
              </span>
            )}
          </div>
          <button type="submit" className={styles.header__searchButton}>
            Пошук
          </button>
        </form>
      </div>
    </header>
  );
}
