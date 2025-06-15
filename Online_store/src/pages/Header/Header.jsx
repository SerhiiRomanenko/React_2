import logo from "../../assets/images/pictures/logo.png";
import styles from "./Header.module.scss";

import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z as zod } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = zod.object({
  query: zod.string().trim().min(1, "Будь ласка, введіть запит для пошуку"),
});

export default function Header() {
  const navigate = useNavigate();
  const [currentQuery, setCurrentQuery] = useState("");
  const [showError, setShowError] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      query: "",
    },
  });

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem("authToken");
      setIsAuthenticated(!!token);
    };

    checkAuth();
    window.addEventListener("storage", checkAuth);

    return () => {
      window.removeEventListener("storage", checkAuth);
    };
  }, []);

  useEffect(() => {
    if (errors.query) {
      setShowError(true);
      const timer = setTimeout(() => {
        setShowError(false);
      }, 3000);
      return () => clearTimeout(timer);
    } else {
      setShowError(false);
    }
  }, [errors.query]);

  const onSubmit = (data) => {
    if (data.query.trim()) {
      navigate(`/?search=${encodeURIComponent(data.query.trim())}`);
    }
  };

  const handleClear = () => {
    reset();
    setCurrentQuery("");
    navigate("/");
    setShowError(false);
  };

  const handleInputChange = (e) => {
    setValue("query", e.target.value);
    setCurrentQuery(e.target.value);
    if (errors.query) {
      setShowError(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    setIsAuthenticated(false);
    navigate("/login");
  };

  return (
    <header className={styles.header}>
      <div className={styles.header__container}>
        <NavLink to="/">
          <img className={styles.header__logo} src={logo} alt="Логотип" />
        </NavLink>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className={styles.header__searchForm}
        >
          <div className={styles.header__errorContainer}>
            {showError && errors.query && (
              <p className={styles.header__errorMessage}>
                {errors.query.message}
              </p>
            )}
          </div>

          <div className={styles.header__searchWrapper}>
            <input
              type="text"
              placeholder="Пошук причепа"
              className={styles.header__searchInput}
              {...register("query")}
              onChange={handleInputChange}
            />
            {currentQuery && (
              <span className={styles.header__clearIcon} onClick={handleClear}>
                &times;
              </span>
            )}
          </div>
          <button type="submit" className={styles.header__searchButton}>
            Пошук
          </button>
        </form>
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
            {isAuthenticated ? (
              <li>
                <button
                  onClick={handleLogout}
                  className={styles.header__logoutButton}
                >
                  Вийти
                </button>
              </li>
            ) : (
              <li>
                <NavLink className={styles.header__loginButton} to="/login">
                  Увійти
                </NavLink>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
}
