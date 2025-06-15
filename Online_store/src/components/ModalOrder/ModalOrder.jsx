import styles from "./ModalOrder.module.scss";
import { STATUS_MESSAGES } from "../../utils/constants";
import { useForm } from "react-hook-form";
import emailjs from "@emailjs/browser";
import service from "../../utils/mockapi";

export default function ModalOrder({ trailer, onClose }) {
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = async (data) => {
    const serviceId = "service_ofl5lph";
    const templateId = "template_bk7qet8";
    const publicKey = "qQGABM2Wj9sjgRw40";

    const templateParams = {
      name: data.name,
      phoneNumber: data.phoneNumber,
      city: data.city,
      email: data.email,
      trailer: trailer.name,
      paymentMethod: data.paymentMethod,
      deliveryMethod: data.deliveryMethod,
      comments: data.comments,
      to_email: "romanenko13n@gmail.com",
    };

    try {
      await emailjs.send(serviceId, templateId, templateParams, publicKey);
      alert("Ваше замовлення успішно надіслано!");

      if (trailer.quantity > 0) {
        const updatedTrailerData = {
          ...trailer,
          quantity: trailer.quantity - 1,
        };
        await service.put("trailers", trailer.id, updatedTrailerData);
      }

      reset();
      onClose();
    } catch (err) {
      console.error(STATUS_MESSAGES.ERROR, err);
    }
  };

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

        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <input
            {...register("name", { required: true })}
            className={styles.input}
            type="text"
            placeholder="Ім’я та Прізвище *"
            required
          />
          <input
            {...register("phoneNumber", { required: true })}
            className={styles.input}
            type="tel"
            placeholder="Мобільний телефон *"
            required
          />
          <input
            {...register("city", { required: true })}
            className={styles.input}
            type="text"
            placeholder="Місто *"
            required
          />
          <input
            {...register("email")}
            className={styles.input}
            type="email"
            placeholder="Електронна пошта (необов'язково)"
          />

          <select
            {...register("paymentMethod", { required: true })}
            className={styles.input}
            required
          >
            <option value="">Спосіб оплати *</option>
            <option value="Карткою">Карткою</option>
            <option value="Готівка">Готівка</option>
          </select>

          <select
            {...register("deliveryMethod", { required: true })}
            className={styles.input}
            required
          >
            <option value="">Спосіб доставки *</option>
            <option value="Самовивіз">Самовивіз</option>
            <option value="Нова Пошта">Нова Пошта</option>
          </select>

          <textarea
            {...register("comments")}
            className={styles.textarea}
            placeholder="Коментарі (необов'язково)"
          ></textarea>
          <button className={styles.submitButton} type="submit">
            ОФОРМИТИ
          </button>
        </form>
      </div>
    </div>
  );
}
