import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z as zod } from "zod";
import styles from "./LoginPageRoute.module.scss";

const loginSchema = zod.object({
  username: zod.string().min(1, "Ім'я користувача є обов'язковим"),
  password: zod.string().min(6, "Пароль повинен містити щонайменше 6 символів"),
});

export default function LoginPage() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data) => {
    if (data.username === "test" && data.password === "password") {
      localStorage.setItem("authToken", "fake-token");
      navigate("/");
    } else {
      alert("Неправильне ім'я користувача або пароль!");
    }
  };

  return (
    <div className={styles.loginPage}>
      <div className={styles.loginPage__container}>
        <h2 className={styles.loginPage__title}>Вхід</h2>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className={styles.loginPage__form}
        >
          <div className={styles.loginPage__inputGroup}>
            <label htmlFor="username" className={styles.loginPage__label}>
              Ім'я користувача:
            </label>
            <input
              type="text"
              id="username"
              className={styles.loginPage__input}
              {...register("username")}
            />
            {errors.username && (
              <p className={styles.loginPage__error}>
                {errors.username.message}
              </p>
            )}
          </div>

          <div className={styles.loginPage__inputGroup}>
            <label htmlFor="password" className={styles.loginPage__label}>
              Пароль:
            </label>
            <input
              type="password"
              id="password"
              className={styles.loginPage__input}
              {...register("password")}
            />
            {errors.password && (
              <p className={styles.loginPage__error}>
                {errors.password.message}
              </p>
            )}
          </div>

          <button type="submit" className={styles.loginPage__button}>
            Увійти
          </button>
        </form>
      </div>
    </div>
  );
}
