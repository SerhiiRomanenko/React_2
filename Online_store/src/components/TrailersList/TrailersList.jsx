import service from "../../utils/mockapi";
import { useState, useEffect } from "react";

import { STATUS_MESSAGES } from "../../utils/constants";

import styles from "./TrailersList.module.scss";
import ModalOrder from "../ModalOrder/ModalOrder";

import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function TrailersList() {
	const [trailers, setTrailers] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const location = useLocation();
	const [selectedTrailer, setSelectedTrailer] = useState(null);
	const navigate = useNavigate();

	const searchParams = new URLSearchParams(location.search);
	const searchQuery = searchParams.get("search")?.toLowerCase() || "";

	const getData = async () => {
		try {
			setLoading(true);
			setError(null);
			const response = await service.get("trailers");
			setTrailers(response);
		} catch (err) {
			console.error(STATUS_MESSAGES.ERROR, err);
			setError(
				"Не вдалося завантажити список причепів. Спробуйте оновити сторінку."
			);
		} finally {
			setLoading(false);
		}
	};

	const handleCardClick = (event, id) => {
		if (!event.target.closest("button")) {
			navigate(`/trailer/${id}`);
		}
	};

	useEffect(() => {
		getData();
	}, []);

	const filteredTrailers = trailers.filter((trailer) =>
		trailer.name.toLowerCase().includes(searchQuery)
	);

	if (loading) {
		return (
			<div className={styles.trailer__status_message}>
				<p>{STATUS_MESSAGES.LOADING}</p>
			</div>
		);
	}

	if (error) {
		return (
			<div className={styles.trailer__status_message}>
				<p className={styles.trailer__error_message}>{error}</p>
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
							trailer.inStock ? styles.trailer__stock : styles.trailer__outstock
						}
					>
						{trailer.inStock ? "В наявності" : "Немає в наявності"}
					</p>
					<button
						className={
							trailer.inStock
								? styles.trailer__button
								: `${styles.trailer__button} ${styles.trailer__button_disabled}`
						}
						onClick={(e) => {
							e.stopPropagation();
							e.preventDefault();

							if (!trailer.inStock) {
								return;
							}
							setSelectedTrailer(trailer);
						}}
						disabled={!trailer.inStock}
					>
						Купити
					</button>
				</div>
			))}

			{selectedTrailer && (
				<ModalOrder
					trailer={selectedTrailer}
					onClose={() => setSelectedTrailer(null)}
				/>
			)}
		</div>
	);
}
