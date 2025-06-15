import styles from "./TrailersList.module.scss";
import { STATUS_MESSAGES } from "../../utils/constants";
import ModalOrder from "../ModalOrder/ModalOrder";
import { useTrailersList } from "./useTrailersList";

export default function TrailersList() {
  const {
    filteredTrailers,
    isLoading,
    isError,
    isModalOpen,
    selectedTrailerForModal,
    openModal,
    closeModal,
    handleCardClick,
  } = useTrailersList();

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
