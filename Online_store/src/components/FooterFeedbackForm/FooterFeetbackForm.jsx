import styles from "./FooterFeetbackForm.module.scss";
import { useForm } from "react-hook-form";
import emailjs from "@emailjs/browser";

export default function FooterFeedbackForm() {
	const { register, handleSubmit, reset } = useForm();

	const onSubmit = (data) => {
		const serviceId = "service_dwzfm9e";
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
			.then((response) => {
				console.log("SUCCESS!", response.status, response.text);
				alert("Ваше питання успішно надіслано!");
				reset();
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
