import styles from "./ModalOrder.module.scss";

export default function ModalOrder({ trailer, onClose }) {
  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <button className={styles.closeButton} onClick={onClose}>
          ×
        </button>
        <h2 className={styles.title}>ОФОРМЛЕННЯ ЗАМОВЛЕННЯ</h2>
        <p className={styles.trailerName}>
          <strong>{trailer.name}</strong>
        </p>

        <form className={styles.form}>
          <input
            className={styles.input}
            type="text"
            placeholder="Ім’я та Прізвище *"
            required
          />
          <input
            className={styles.input}
            type="tel"
            placeholder="Мобільний телефон *"
            required
          />
          <input
            className={styles.input}
            type="text"
            placeholder="Місто *"
            required
          />
          <input
            className={styles.input}
            type="email"
            placeholder="Електронна пошта"
          />

          <select className={styles.input} required>
            <option value="">Спосіб оплати</option>
            <option value="card">Карткою</option>
            <option value="cash">Готівка</option>
          </select>

          <select className={styles.input} required>
            <option value="">Спосіб доставки</option>
            <option value="pickup">Самовивіз</option>
            <option value="nova_poshta">Нова Пошта</option>
          </select>

          <textarea
            className={styles.textarea}
            placeholder="Коментарі"
          ></textarea>
          <button className={styles.submitButton} type="submit">
            ОФОРМИТИ
          </button>
        </form>
      </div>
    </div>
  );
}
