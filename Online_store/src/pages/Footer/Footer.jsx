import styles from "./Footer.module.scss";

import FooterFeedbackForm from "../../components/FooterFeedbackForm/FooterFeedbackForm";

export default function Footer() {
  return (
    <main className={styles.footer}>
      <div className={styles.footer__container}>
        <div className={styles.footer__models}>
          <div>МОДЕЛЬНИЙ РЯД:</div>
          <div className={styles.footer__nav}>
            <ul>
              <li>
                <a className={styles.btnDraw}>
                  <span>Лідер</span>
                </a>
              </li>
              <li>
                <a className={styles.btnDraw}>
                  <span>АМС</span>
                </a>
              </li>
              <li>
                <a className={styles.btnDraw}>
                  <span>Pragmatec</span>
                </a>
              </li>
              <li>
                <a className={styles.btnDraw}>
                  <span>Палич</span>
                </a>
              </li>
              <li>
                <a className={styles.btnDraw}>
                  <span>Атлет</span>
                </a>
              </li>
            </ul>
          </div>
          <div className={styles.menuClearLeft}></div>
        </div>
        <div className={styles.footer__phoneBlock}>
          <ul className={styles.footer__navBar}>
            <li>КЛІЄНТСЬКА СЛУЖБА:</li>

            <li className={styles.footer__tel}>
              <a className={styles.footer__phone} href="tel:380961117895">
                +38 (096) 111-78-95
              </a>
              <p className={styles.footer__caption}>
                По питанням купівлі причепів та запчастин!
              </p>
            </li>
            <li className={styles.footer__copyright}>
              © 2025 Всі права захищені.&nbsp;Версія 07.06.
            </li>
          </ul>
        </div>
        <FooterFeedbackForm />
      </div>
    </main>
  );
}
