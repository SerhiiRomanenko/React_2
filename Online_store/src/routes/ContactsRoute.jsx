export default function ContactsRoute() {
	return (
		<>
			<h1>Контакти</h1>
			<section className="contacts">
				<div className="contacts__info">
					<h2>Наші контакти</h2>
					<p>
						<strong>Адреса:</strong> смт. Ворзель, вул. Яблунська, 11
					</p>
					<p>
						<strong>Телефон:</strong>
						<a href="tel:380679372731">+38 (067) 937-27-31</a>
					</p>
					<p>
						<strong>Email:</strong>
						<a href="mailto:info@pricep45.ua">info@pricep45.ua</a>
					</p>
					<p>
						<strong>Соціальні мережі:</strong>
					</p>
					<div className="contacts__socials">
						<a href="https://vk.com/pricep45" target="_blank">
							<img src="/images/icons/vk.svg" alt="VK" />
						</a>
						<a href="https://www.youtube.com/user/54info" target="_blank">
							<img src="/images/icons/youtube.svg" alt="YouTube" />
						</a>
						<a href="https://t.me/pricep45" target="_blank">
							<img src="/images/icons/telegram1.png" alt="Telegram" />
						</a>
					</div>
				</div>
				<div className="contacts__form">
					<h2>Напишіть нам</h2>
					<form id="contact-form">
						<div>
							<label htmlFor="name">Ім'я</label>
							<input type="text" id="name" name="name" required />
						</div>
						<div>
							<label htmlFor="email">Email</label>
							<input type="email" id="email" name="email" required />
						</div>
						<div>
							<label htmlFor="message">Повідомлення</label>
							<textarea id="message" name="message" required></textarea>
						</div>
						<button type="submit">Відправити</button>
					</form>
					<p id="response-message"></p>
				</div>
				<div className="contacts__map">
					<h2>Наше розташування</h2>
					<iframe
						src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2539.6025103444697!2d30.167020315731714!3d50.53631237949252!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40d4c8736d2a8f8b%3A0xdcd7e35ad6d0f73d!2z0J_QtdC70YzQvdC-0Lkg0LLRgdC_0LXQvNC10L3QvdGL0LU!5e0!3m2!1suk!2sua!4v1622027449345!5m2!1suk!2sua"
						width="600"
						height="450"
						style="border: 0"
						loading="lazy"
					></iframe>
				</div>
			</section>
		</>
	);
}
