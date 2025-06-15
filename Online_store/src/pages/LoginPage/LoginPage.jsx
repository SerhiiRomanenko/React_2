import styles from "./LoginPage.module.scss";
import { useLoginPage } from "./useLoginPage";

export default function LoginPage() {
  const { register, handleSubmit, onSubmit, errors } = useLoginPage();

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
