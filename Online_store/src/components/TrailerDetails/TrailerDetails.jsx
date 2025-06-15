import styles from "./TrailerDetails.module.scss";
import { STATUS_MESSAGES } from "../../utils/constants";
import service from "../../utils/mockapi";

import ModalOrder from "../ModalOrder/ModalOrder";

import { useState, useCallback, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import useTrailersStore from "../../store/features/trailers";

export default function TrailerDetails() {
  const { id } = useParams();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const setSelectedTrailerInStore = useTrailersStore(
    (state) => state.setSelectedTrailer
  );

  const { data, isLoading, isError } = useQuery({
    queryKey: ["trailer", id],
    queryFn: () => service.get("trailers", id),
    enabled: !!id,
  });

  useEffect(() => {
    if (data) {
      setSelectedTrailerInStore(data);
    } else if (!isLoading && !isError) {
      setSelectedTrailerInStore(null);
    }
  }, [data, isLoading, isError, setSelectedTrailerInStore]);

  const openModal = useCallback(() => {
    setIsModalOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
  }, []);

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

  if (!data) {
    return (
      <div className={styles.details__status_message}>
        <p>Інформація про причіп не знайдена.</p>
      </div>
    );
  }

  return (
    <div className={styles.details}>
      <h1 className={styles.details__title}>{data.name}</h1>

      {data.shortDescription && (
        <h2 className={styles.details__short_description}>
          {data.shortDescription}
        </h2>
      )}

      <div className={styles.details__gallery_slider}>
        {data.images && data.images.length > 1 && (
          <button
            className={`${styles.details__slider_button} ${styles.details__slider_button_prev}`}
          >
            &#10094;
          </button>
        )}
        <img
          src={data.images[0]}
          alt={`${data.name} `}
          className={styles.details__image_slider}
        />
        {data.images && data.images.length > 1 && (
          <button
            className={`${styles.details__slider_button} ${styles.details__slider_button_next}`}
          >
            &#10095;
          </button>
        )}
      </div>

      <div className={styles.details__meta_info}>
        {data.brand && (
          <p>
            <span className={styles.details__meta_label}>Бренд:</span>{" "}
            <span className={styles.details__meta_value}>{data.brand}</span>
          </p>
        )}
        {data.model && (
          <p>
            <span className={styles.details__meta_label}>Модель:</span>{" "}
            <span className={styles.details__meta_value}>{data.model}</span>
          </p>
        )}
        {data.category && (
          <p>
            <span className={styles.details__meta_label}>Категорія:</span>{" "}
            <span className={styles.details__meta_value}>{data.category}</span>
          </p>
        )}
      </div>

      <div
        className={styles.details__description}
        dangerouslySetInnerHTML={{ __html: data.description }}
      ></div>

      {data.specifications && data.specifications.length > 0 && (
        <div className={styles.details__specifications}>
          <h2 className={styles.details__specifications_title}>
            Характеристики
          </h2>
          <ul className={styles.details__specifications_list}>
            {data.specifications.map((spec, index) => (
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
        Ціна: {data.price.toLocaleString("uk-UA")} {data.currency}
      </p>

      <p
        className={`${styles.details__stock_info} ${
          data.quantity > 0
            ? styles.details__stock
            : styles.details__out_of_stock
        }`}
      >
        {data.quantity > 0 ? "В наявності" : "Немає в наявності"}
      </p>

      <p className={styles.details__quantity_info}>
        Кількість на складі: {data.quantity}
      </p>

      <p className={styles.details__created_info}>
        Додано: {new Date(data.createdAt).toLocaleDateString("uk-UA")}
      </p>

      <button
        className={`${styles.details__buy_button} ${
          data.quantity === 0 ? styles.details__buy_button_disabled : ""
        }`}
        onClick={data.quantity > 0 ? openModal : undefined}
        disabled={data.quantity === 0}
      >
        Купити
      </button>

      {isModalOpen && <ModalOrder trailer={data} onClose={closeModal} />}
    </div>
  );
}
