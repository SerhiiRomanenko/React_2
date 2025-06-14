import styles from "./ContactsRoute.module.scss";

export default function ContactsRoute() {
	return (
		<>
			<h1 className={styles.pageTitle}>Контакти</h1>
			<section className={styles.contacts}>
				<div className={styles.contacts__info}>
					<h2 className={styles.contacts__heading}>Наша адреса</h2>
					<p>Київська обл., Бучанський р-н, смт. Ворзель, вул. Яблунська, 11</p>
					<p>
						<strong>Телефон: </strong>
						<a className={styles.contacts__link} href="tel:380679372731">
							+38 (067) 937-27-31
						</a>
					</p>
					<p>
						<strong>Email: </strong>
						<a
							className={styles.contacts__link}
							href="mailto:serhiiromanenko13@gmail.com"
						>
							serhiiromanenko13@gmail.com
						</a>
					</p>
				</div>

				<div className={styles.contacts__mapContainer}>
					<h2 className={styles.contacts__heading}>Наше розташування</h2>
					<iframe
						src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2537.409390299696!2d30.13867621571408!3d50.53326177948602!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40d43c7b3c2e171b%3A0x6e7b5f1a7d6e6a1d!2z0LLRg9C30LHQvtC20LPRgNCw0LLQuNC30LAsINCS0L3QsNCx0LXRgNGB0YLRjCwg0JrQuNC10YDQsNC00L3QsNGA0LAg0L7QvdGW0YAg0JrQuNC10YDQsNC00L3QsNGA0LA!5e0!3m2!1suk!2sua!4v1717835564883!5m2!1suk!2sua"
						width="600"
						height="450"
						allowFullScreen=""
						loading="lazy"
						referrerPolicy="no-referrer-when-downgrade"
						title="Карта розташування"
					></iframe>
				</div>
			</section>
		</>
	);
}
