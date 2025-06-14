import styles from "./FooterFeetbackForm.module.scss";
import { useForm } from "react-hook-form";
import emailjs from "@emailjs/browser"; // Імпортуємо EmailJS

export default function FooterFeedbackForm() {
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = (data) => {
    // Ваші EmailJS Service ID, Template ID та Public Key
    // Переконайтеся, що вони правильні та відповідають вашим налаштуванням на EmailJS
    const serviceId = "service_dwzfm9e";
    const templateId = "template_u21l3gf";
    const publicKey = "qQGABM2Wj9sjgRw40";

    // Параметри шаблону EmailJS.
    // Тепер замість 'phone' використовуємо 'email'.
    // Ключі (name, email, question) повинні відповідати змінним у вашому шаблоні EmailJS.
    const templateParams = {
      name: data.name,
      email: data.email, // <--- Змінено з data.phone на data.email
      question: data.question,
      to_email: "romanenko13n@gmail.com", // Ваша пошта, куди будуть надходити листи
    };

    emailjs
      .send(serviceId, templateId, templateParams, publicKey)
      .then((response) => {
        console.log("SUCCESS!", response.status, response.text);
        alert("Ваше питання успішно надіслано!");
        reset(); // Очищуємо форму після успішної відправки
      })
      .catch((err) => {
        console.error("FAILED...", err);
        alert("Виникла помилка під час надсилання. Спробуйте ще раз.");
      });
  };

  return (
    <div className={styles.footer__feedback}>
      <p>ЗАДАТИ ПИТАННЯ:</p>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.footer__form}>
        <input {...register("email")} type="email" placeholder="Ваш e-mail" />{" "}
        <input {...register("name")} type="text" placeholder="Ваше ім'я" />
        <textarea {...register("question")} placeholder="Текст питання" />
        <button type="submit">Надіслати</button>{" "}
      </form>
    </div>
  );
}
