import styles from "./TarilersList.module.scss";

export default function TrailersList() {
	return (
		<div>
			{trailers.length > 0
				? trailers.map((trailer) => {
						return (
							<div
								className="trailer__card"
								style={{ border: "1px solid black", width: "200px" }}
								key={trailer.id}
							>
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
