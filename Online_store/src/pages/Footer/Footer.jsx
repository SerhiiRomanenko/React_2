import styles from "./Footer.module.scss";

export default function Footer() {
	return (
		<main className={styles.footer}>
			<div className={styles.footer__container}>
				<div className={styles.footer__models}>
					<div>МОДЕЛЬНИЙ РЯД:</div>
					<div className={styles.footer__nav}>
						<ul>
							<li>
								<a
									href="https://pricep45.ru/pritsepy/odnoosnye-pritsepy/pritsep-krepysh-8213-03-krepysh-sv/"
									className={styles.btnDraw}
								>
									<span>Лідер</span>
								</a>
							</li>
							<li>
								<a
									href="https://pricep45.ru/pritsepy/dachnye-pritsepy/pritsep-krepysh-profi/"
									className={styles.btnDraw}
								>
									<span>АМС</span>
								</a>
							</li>
							<li>
								<a
									href="/pritsepy/bortovye-pritsepy/krepysh-2/"
									className={styles.btnDraw}
								>
									<span>Pragmatec</span>
								</a>
							</li>
							<li>
								<a
									href="/pritsepy/odnoosnye-pritsepy/pritsep-universal-8213-05/"
									className={styles.btnDraw}
								>
									<span>Палич</span>
								</a>
							</li>
							<li>
								<a
									href="/pritsepy/odnoosnye-pritsepy/pritsep-atlet-8213-v5/"
									className={styles.btnDraw}
								>
									<span>Атлет</span>
								</a>
							</li>
						</ul>
					</div>
					<div className={styles.menuClearLeft}></div>
				</div>
				<div className={styles.footer__phoneBlock}>
					<ul className={styles.footer__navBar}>
						<li>Клієнтська служба</li>
						<li>
							<br />
						</li>
						<li className={styles.footer__tel}>
							<a className={styles.footer__phone} href="tel:380961117895">
								+38 (096) 111-78-95
							</a>
							<p className={styles.footer__caption}>
								По питанням купівлі причепів и запчастин!
							</p>
						</li>
						<li className={styles.footer__socialWrapper}>
							<div className={styles.footer__socials}>
								<div className={styles.footer__socialIcon}>
									<a
										href="https://vk.com/pricep45"
										target="_blank"
										rel="noreferrer"
									>
										<img src="/images/icons/vk.png" alt="vk" />
									</a>
								</div>
								<div className={styles.footer__socialIcon}>
									<a
										href="https://www.youtube.com/user/54info?feature=watch"
										target="_blank"
										rel="noreferrer"
									>
										<img src="/images/icons/youtube.png" alt="youtube" />
									</a>
								</div>
								<div className={styles.footer__socialIcon}>
									<a
										href="https://t.me/pricep45"
										target="_blank"
										rel="noreferrer"
									>
										<img src="/images/icons/telegram.png" alt="telegram" />
									</a>
								</div>
							</div>
						</li>
						<li className={styles.footer__copyright}>
							© 2023 Всі права захищені.&nbsp;Версія 07.01.
						</li>
					</ul>
				</div>
			</div>
		</main>
	);
}
