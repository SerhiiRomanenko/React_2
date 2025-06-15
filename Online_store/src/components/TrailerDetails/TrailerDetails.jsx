import styles from "./TrailerDetails.module.scss";
import { STATUS_MESSAGES } from "../../utils/constants";
import ModalOrder from "../ModalOrder/ModalOrder";
import { useTrailerDetails } from "./useTrailerDetails";

export default function TrailerDetails() {
  const { trailer, isLoading, isError, isModalOpen, openModal, closeModal } =
    useTrailerDetails();

  if (isLoading) {
    return (
      <div className={styles.details__status_message}>
        <p>{STATUS_MESSAGES.LOADING}</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className={styles.details__status_message}>
        <p className={styles.details__error_message}>
          Не вдалося завантажити інформацію про причіп. Спробуйте оновити
          сторінку.
        </p>
      </div>
    );
  }

  if (!trailer) {
    return (
      <div className={styles.details__status_message}>
        <p>Інформація про причіп не знайдена.</p>
      </div>
    );
  }

  return (
    <div className={styles.details}>
      <h1 className={styles.details__title}>{trailer.name}</h1>

      {trailer.shortDescription && (
        <h2 className={styles.details__short_description}>
          {trailer.shortDescription}
        </h2>
      )}

      <div className={styles.details__gallery_slider}>
        {trailer.images && trailer.images.length > 1 && (
          <button
            className={`${styles.details__slider_button} ${styles.details__slider_button_prev}`}
          >
            &#10094;
          </button>
        )}
        <img
          src={trailer.images[0]}
          alt={`${trailer.name} `}
          className={styles.details__image_slider}
        />
        {trailer.images && trailer.images.length > 1 && (
          <button
            className={`${styles.details__slider_button} ${styles.details__slider_button_next}`}
          >
            &#10095;
          </button>
        )}
      </div>

      <div className={styles.details__meta_info}>
        {trailer.brand && (
          <p>
            <span className={styles.details__meta_label}>Бренд:</span>{" "}
            <span className={styles.details__meta_value}>{trailer.brand}</span>
          </p>
        )}
        {trailer.model && (
          <p>
            <span className={styles.details__meta_label}>Модель:</span>{" "}
            <span className={styles.details__meta_value}>{trailer.model}</span>
          </p>
        )}
        {trailer.category && (
          <p>
            <span className={styles.details__meta_label}>Категорія:</span>{" "}
            <span className={styles.details__meta_value}>
              {trailer.category}
            </span>
          </p>
        )}
      </div>

      <div
        className={styles.details__description}
        dangerouslySetInnerHTML={{ __html: trailer.description }}
      ></div>

      {trailer.specifications && trailer.specifications.length > 0 && (
        <div className={styles.details__specifications}>
          <h2 className={styles.details__specifications_title}>
            Характеристики
          </h2>
          <ul className={styles.details__specifications_list}>
            {trailer.specifications.map((spec, index) => (
              <li key={index} className={styles.details__specification_item}>
                <span className={styles.details__specification_name}>
                  {spec.name}:
                </span>
                <span className={styles.details__specification_value}>
                  {spec.value} {spec.unit && spec.unit}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}

      <p className={styles.details__price_info}>
        Ціна: {trailer.price.toLocaleString("uk-UA")} {trailer.currency}
      </p>

      <p
        className={`${styles.details__stock_info} ${
          trailer.quantity > 0
            ? styles.details__stock
            : styles.details__out_of_stock
        }`}
      >
        {trailer.quantity > 0 ? "В наявності" : "Немає в наявності"}
      </p>

      <p className={styles.details__quantity_info}>
        Кількість на складі: {trailer.quantity}
      </p>

      <p className={styles.details__created_info}>
        Додано: {new Date(trailer.createdAt).toLocaleDateString("uk-UA")}
      </p>

      <button
        className={`${styles.details__buy_button} ${
          trailer.quantity === 0 ? styles.details__buy_button_disabled : ""
        }`}
        onClick={trailer.quantity > 0 ? openModal : undefined}
        disabled={trailer.quantity === 0}
      >
        Купити
      </button>

      {isModalOpen && <ModalOrder trailer={trailer} onClose={closeModal} />}
    </div>
  );
}
