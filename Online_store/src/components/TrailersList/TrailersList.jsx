import styles from "./TrailersList.module.scss";
import { STATUS_MESSAGES } from "../../utils/constants";
import service from "../../utils/mockapi";

import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState, useCallback } from "react";

import { useQuery } from "@tanstack/react-query";
import useTrailersStore from "../../store/features/trailers";
import ModalOrder from "../ModalOrder/ModalOrder";

export default function TrailersList() {
  const navigate = useNavigate();
  const location = useLocation();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTrailerForModal, setSelectedTrailerForModal] = useState(null);

  const searchQuery =
    new URLSearchParams(location.search).get("search")?.toLowerCase() || "";

  const setTrailersInStore = useTrailersStore((state) => state.setTrailers);

  const {
    data: fetchedTrailers,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["trailers", { search: searchQuery }],
    queryFn: () => service.get("trailers"),
  });

  useEffect(() => {
    if (fetchedTrailers) {
      setTrailersInStore(fetchedTrailers);
    }
  }, [fetchedTrailers, setTrailersInStore]);

  const openModal = useCallback((trailer) => {
    setSelectedTrailerForModal(trailer);
    setIsModalOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
    setSelectedTrailerForModal(null);
  }, []);

  const handleCardClick = (event, id) => {
    if (!event.target.closest("button")) {
      navigate(`/trailer/${id}`);
    }
  };

  if (isLoading) {
    return (
      <div className={styles.trailer__status_message}>
        <p>{STATUS_MESSAGES.LOADING}</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className={styles.trailer__status_message}>
        <p className={styles.trailer__error_message}>
          {STATUS_MESSAGES.ERROR} Спробуйте пізніше
        </p>
      </div>
    );
  }

  const filteredTrailers =
    fetchedTrailers?.filter((trailer) =>
      trailer.name.toLowerCase().includes(searchQuery)
    ) || [];

  if (filteredTrailers.length === 0) {
    return (
      <div className={styles.trailer__status_message}>
        <p>{STATUS_MESSAGES.NOT_FOUND}</p>
      </div>
    );
  }

  return (
    <div className={styles.trailer__list}>
      {filteredTrailers.map((trailer) => (
        <div
          className={styles.trailer__card}
          key={trailer.id}
          onClick={(event) => handleCardClick(event, trailer.id)}
        >
          <img
            src={trailer.images[0]}
            alt={trailer.name}
            className={styles.trailer__image}
          />
          <h3 className={styles.trailer__title}>{trailer.name}</h3>
          <p className={styles.trailer__desc}>{trailer.shortDescription}</p>
          <p className={styles.trailer__price}>
            {trailer.price.toLocaleString("uk-UA")} {trailer.currency}
          </p>
          <p
            className={
              trailer.quantity > 0
                ? styles.trailer__stock
                : styles.trailer__outstock
            }
          >
            {trailer.quantity ? "В наявності" : "Немає в наявності"}
          </p>
          <button
            className={
              trailer.quantity > 0
                ? styles.trailer__button
                : `${styles.trailer__button} ${styles.trailer__button_disabled}`
            }
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();

              if (trailer.quantity === 0) {
                return;
              }
              openModal(trailer);
            }}
            disabled={trailer.quantity === 0}
          >
            Купити
          </button>
        </div>
      ))}

      {isModalOpen && selectedTrailerForModal && (
        <ModalOrder trailer={selectedTrailerForModal} onClose={closeModal} />
      )}
    </div>
  );
}
