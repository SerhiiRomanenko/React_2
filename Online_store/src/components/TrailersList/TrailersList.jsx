import services from "./../../services/mockapi";
import { useState, useEffect } from "react";
import styles from "./TrailersList.module.scss";
import data from "./../../data";
export default function TrailersList() {
	const [trailers, setTrailers] = useState([]);
	console.log(trailers);

	const getData = async () => {
		try {
			// const response = await service.get("trailers");
			// setTrailers(response.data.trailers);
			// console.log(response.data.trailers);
			setTrailers(data);
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
							<div className={styles.trailer__card} key={trailer._id}>
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
