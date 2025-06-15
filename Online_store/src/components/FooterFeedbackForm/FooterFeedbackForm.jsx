import styles from "./FooterFeedbackForm.module.scss";
import { STATUS_MESSAGES } from "../../utils/constants";

import { useForm } from "react-hook-form";
import emailjs from "@emailjs/browser";

export default function FooterFeedbackForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    if (Object.keys(errors).length > 0) {
      return;
    }

    const serviceId = "service_ofl5lph";
    const templateId = "template_u21l3gf";
    const publicKey = "qQGABM2Wj9sjgRw40";

    const templateParams = {
      name: data.name,
      email: data.email,
      question: data.question,
      to_email: "romanenko13n@gmail.com",
    };

    emailjs
      .send(serviceId, templateId, templateParams, publicKey)
      .then(() => {
        alert("Ваше питання успішно надіслано!");
        reset();
      })
      .catch((err) => {
        console.error(STATUS_MESSAGES.ERROR, err);
      });
  };

  return (
    <div className={styles.footer__feedback}>
      <p>ЗАДАТИ ПИТАННЯ:</p>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.footer__form}>
        <input
          {...register("email", { required: true })}
          type="email"
          placeholder="Ваш e-mail"
          className={errors.email ? styles.footer__inputError : ""}
        />
        <input
          {...register("name", { required: true })}
          type="text"
          placeholder="Ваше ім'я"
          className={errors.name ? styles.footer__inputError : ""}
        />
        <textarea
          {...register("question", { required: true })}
          placeholder="Текст питання"
          className={errors.question ? styles.footer__inputError : ""}
        />
        <button type="submit">Надіслати</button>
      </form>
    </div>
  );
}
