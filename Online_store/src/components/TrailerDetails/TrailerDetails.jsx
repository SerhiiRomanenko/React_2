import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import service from "../../utils/mockapi";
import styles from "./TrailerDetails.module.scss";
import ModalOrder from "../ModalOrder/ModalOrder";

export default function TrailerDetails() {
  const { id } = useParams();
  const [trailer, setTrailer] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const getTrailer = async () => {
    try {
      const response = await service.get("trailers", id);
      setTrailer(response);
    } catch (error) {
      console.error("Помилка отримання даних:", error);
    }
  };

  useEffect(() => {
    getTrailer();
  }, [id]);

  if (!trailer) return <p>Завантаження...</p>;

  const goToNextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % trailer.images.length);
  };

  const goToPrevSlide = () => {
    setCurrentSlide((prev) =>
      prev === 0 ? trailer.images.length - 1 : prev - 1
    );
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className={styles.details}>
      <h1 className={styles.details__title}>{trailer.name}</h1>

      {trailer.shortDescription && (
        <h2 className={styles.details__short_description}>
          {trailer.shortDescription}
        </h2>
      )}

      <div className={styles.details__gallery_slider}>
        {trailer.images.length > 1 && (
          <button
            className={`${styles.details__slider_button} ${styles.details__slider_button_prev}`}
            onClick={goToPrevSlide}
          >
            &#10094;
          </button>
        )}
        <img
          src={trailer.images[currentSlide]}
          alt={`${trailer.name} ${currentSlide + 1}`}
          className={styles.details__image_slider}
        />
        {trailer.images.length > 1 && (
          <button
            className={`${styles.details__slider_button} ${styles.details__slider_button_next}`}
            onClick={goToNextSlide}
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
          trailer.inStock ? styles.details__stock : styles.details__out_of_stock
        }`}
      >
        {trailer.inStock ? "В наявності" : "Немає в наявності"}
      </p>

      <p className={styles.details__quantity_info}>
        Кількість на складі: {trailer.quantity}
      </p>

      <p className={styles.details__created_info}>
        Додано: {new Date(trailer.createdAt).toLocaleDateString("uk-UA")}
      </p>

      <button
        className={`${styles.details__buy_button} ${
          !trailer.inStock ? styles.details__buy_button_disabled : ""
        }`}
        onClick={trailer.inStock ? openModal : undefined}
        disabled={!trailer.inStock}
      >
        Купити
      </button>

      {isModalOpen && <ModalOrder trailer={trailer} onClose={closeModal} />}
    </div>
  );
}
