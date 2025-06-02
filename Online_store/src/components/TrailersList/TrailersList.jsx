import services from "./../../services/mockapi";

import styles from "./TarilersList.module.scss";

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
		<div>
			{trailers.length > 0
				? trailers.map((trailer) => {
						return (
							<div className={styles.trailer__card} key={trailer.id}>
								<p>{trailer.brand}</p>
								<p>{trailer.model}</p>
								<p>{trailer.price}</p>
							</div>
						);
				  })
				: null}
		</div>
	);
}
