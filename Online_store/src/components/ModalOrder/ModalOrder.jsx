import styles from "./ModalOrder.module.scss";
import { STATUS_MESSAGES } from "../../utils/constants";
import { useForm } from "react-hook-form";
import { z as zod } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import emailjs from "@emailjs/browser";
import service from "../../utils/mockapi";

const schema = zod.object({
  name: zod.string().min(1),
  phoneNumber: zod.string().min(1),
  city: zod.string().min(1),
  email: zod.string().email().optional().or(zod.literal("")),
  paymentMethod: zod.string().min(1),
  deliveryMethod: zod.string().min(1),
  comments: zod.string().optional(),
});

export default function ModalOrder({ trailer, onClose }) {
  const { register, handleSubmit, reset } = useForm({
    resolver: zodResolver(schema),
  });

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
            {...register("name")}
            className={styles.input}
            type="text"
            placeholder="Ім’я та Прізвище *"
          />
          <input
            {...register("phoneNumber")}
            className={styles.input}
            type="tel"
            placeholder="Мобільний телефон *"
          />
          <input
            {...register("city")}
            className={styles.input}
            type="text"
            placeholder="Місто *"
          />
          <input
            {...register("email")}
            className={styles.input}
            type="email"
            placeholder="Електронна пошта (необов'язково)"
          />

          <select {...register("paymentMethod")} className={styles.input}>
            <option value="">Спосіб оплати *</option>
            <option value="Карткою">Карткою</option>
            <option value="Готівка">Готівка</option>
          </select>

          <select {...register("deliveryMethod")} className={styles.input}>
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
