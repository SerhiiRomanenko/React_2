import styles from "./ModalOrder.module.scss";

import { useModalOrder } from "./useModalOrder";

export default function ModalOrder({ trailer, onClose }) {
  const { register, handleSubmit, onSubmit, isPending } = useModalOrder(
    trailer,
    onClose
  );

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <button
          className={styles.closeButton}
          onClick={onClose}
          disabled={isPending}
        >
          ×
        </button>
        <h2 className={styles.title}>ОФОРМЛЕННЯ ЗАМОВЛЕННЯ</h2>
        <p className={styles.trailerName}>
          <strong>{trailer.name}</strong>
        </p>

        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <input
            {...register("name")}
            className={styles.input}
            type="text"
            placeholder="Ім’я та Прізвище *"
            disabled={isPending}
          />

          <input
            {...register("phoneNumber")}
            className={styles.input}
            type="tel"
            placeholder="Мобільний телефон *"
            disabled={isPending}
          />

          <input
            {...register("city")}
            className={styles.input}
            type="text"
            placeholder="Місто *"
            disabled={isPending}
          />

          <input
            {...register("email")}
            className={styles.input}
            type="email"
            placeholder="Електронна пошта (необов'язково)"
            disabled={isPending}
          />

          <select
            {...register("paymentMethod")}
            className={styles.input}
            disabled={isPending}
          >
            <option value="">Спосіб оплати *</option>
            <option value="Карткою">Карткою</option>
            <option value="Готівка">Готівка</option>
          </select>

          <select
            {...register("deliveryMethod")}
            className={styles.input}
            disabled={isPending}
          >
            <option value="">Спосіб доставки *</option>
            <option value="Самовивіз">Самовивіз</option>
            <option value="Нова Пошта">Нова Пошта</option>
          </select>

          <textarea
            {...register("comments")}
            className={styles.textarea}
            placeholder="Коментарі (необов'язково)"
            disabled={isPending}
          ></textarea>

          <button
            className={styles.submitButton}
            type="submit"
            disabled={isPending}
          >
            {isPending ? "Оформлення..." : "ОФОРМИТИ"}
          </button>
        </form>
      </div>
    </div>
  );
}
