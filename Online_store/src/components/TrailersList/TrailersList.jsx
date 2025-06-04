import services from "./../../services/mockapi";
import { useState, useEffect } from "react";
import styles from "./TrailersList.module.scss";

export default function TrailersList() {
	const [trailers, setTrailers] = useState([]);
	console.log(trailers);

	const getData = async () => {
		try {
			// const response = await service.get("trailers");
			// setTrailers(response.data.trailers);
			// console.log(response.data.trailers);
			setTrailers([
				{ brand: "Kia", id: 1, model: "S", price: 150 },
				{ brand: "Renault", id: 2, model: "L", price: 200 },
				{ brand: "Ford", id: 3, model: "M", price: 250 },
			]);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		getData();
	}, []);

	return (
		<div className={styles.trailer__list}>
			{trailers.length > 0
				? trailers.map((trailer) => {
						return (
							<div className={styles.trailer__card} key={trailer.id}>
								<p>{trailer.brand}</p>
								<p>{trailer.model}</p>
								<p>{trailer.price}</p>
								<button>Додати в кошик</button>
							</div>
						);
				  })
				: null}
		</div>
	);
}
