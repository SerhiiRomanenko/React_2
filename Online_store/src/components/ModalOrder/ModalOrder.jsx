import styles from "./ModalOrder.module.scss";
import { STATUS_MESSAGES } from "../../utils/constants";

import { useForm } from "react-hook-form";
import { z as zod } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import emailjs from "@emailjs/browser";
import service from "../../utils/mockapi";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import useTrailersStore from "../../store/features/trailers";

const schema = zod.object({
  name: zod.string().min(3),
  phoneNumber: zod.string().min(7),
  city: zod.string().min(2),
  email: zod.string().email().optional().or(zod.literal("")),
  paymentMethod: zod.string().min(1),
  deliveryMethod: zod.string().min(1),
  comments: zod.string().optional(),
});

export default function ModalOrder({ trailer, onClose }) {
  const { register, handleSubmit, reset } = useForm({
    resolver: zodResolver(schema),
  });

  const queryClient = useQueryClient();

  const updateTrailerInStore = useTrailersStore((state) => state.updateTrailer);

  const orderMutation = useMutation({
    mutationFn: async (data) => {
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

      await emailjs.send(serviceId, templateId, templateParams, publicKey);

      if (trailer.quantity > 0) {
        const updatedTrailerData = {
          ...trailer,
          quantity: trailer.quantity - 1,
        };
        const response = await service.put(
          "trailers",
          trailer.id,
          updatedTrailerData
        );
        return response;
      }
      return null;
    },
    onSuccess: (updatedTrailerFromServer) => {
      queryClient.invalidateQueries({ queryKey: ["trailers"] });
      queryClient.invalidateQueries({ queryKey: ["trailer", trailer.id] });

      if (updatedTrailerFromServer) {
        updateTrailerInStore(updatedTrailerFromServer);
      }

      alert("Ваше замовлення успішно надіслано!");
      reset();
      onClose();
    },
    onError: (error) => {
      console.error(STATUS_MESSAGES.ERROR, error);
    },
  });

  const onSubmit = (data) => {
    orderMutation.mutate(data);
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <button
          className={styles.closeButton}
          onClick={onClose}
          disabled={orderMutation.isPending}
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
            disabled={orderMutation.isPending}
          />

          <input
            {...register("phoneNumber")}
            className={styles.input}
            type="tel"
            placeholder="Мобільний телефон *"
            disabled={orderMutation.isPending}
          />

          <input
            {...register("city")}
            className={styles.input}
            type="text"
            placeholder="Місто *"
            disabled={orderMutation.isPending}
          />

          <input
            {...register("email")}
            className={styles.input}
            type="email"
            placeholder="Електронна пошта (необов'язково)"
            disabled={orderMutation.isPending}
          />

          <select
            {...register("paymentMethod")}
            className={styles.input}
            disabled={orderMutation.isPending}
          >
            <option value="">Спосіб оплати *</option>
            <option value="Карткою">Карткою</option>
            <option value="Готівка">Готівка</option>
          </select>

          <select
            {...register("deliveryMethod")}
            className={styles.input}
            disabled={orderMutation.isPending}
          >
            <option value="">Спосіб доставки *</option>
            <option value="Самовивіз">Самовивіз</option>
            <option value="Нова Пошта">Нова Пошта</option>
          </select>

          <textarea
            {...register("comments")}
            className={styles.textarea}
            placeholder="Коментарі (необов'язково)"
            disabled={orderMutation.isPending}
          ></textarea>

          <button
            className={styles.submitButton}
            type="submit"
            disabled={orderMutation.isPending}
          >
            {orderMutation.isPending ? "Оформлення..." : "ОФОРМИТИ"}
          </button>
        </form>
      </div>
    </div>
  );
}
