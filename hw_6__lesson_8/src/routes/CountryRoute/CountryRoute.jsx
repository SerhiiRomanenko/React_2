import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { service } from "../../services/mockapi";

export function CountryRoute() {
	const [choosedCountry, setChoosedCountry] = useState([]);
	const urlName = useParams();

	async function getCountry() {
		let response = await service.get(`/name`, urlName.name);
		setChoosedCountry(response);
	}
	const renderItem = (item) => {
		if (typeof item === "object" && item !== null) {
			if (Array.isArray(item)) {
				return (
					<ul className="list-disc ml-10">
						{item.map((innerItem, index) => (
							<li key={index}>{renderItem(innerItem)}</li>
						))}
					</ul>
				);
			} else {
				return (
					<ul className="list-disc ml-10">
						{Object.keys(item).map((key) => (
							<li key={key}>
								<b>{key}: </b>
								{renderItem(item[key])}
							</li>
						))}
					</ul>
				);
			}
		} else {
			return <span>{item !== null ? item.toString() : "null"}</span>;
		}
	};
	useEffect(() => {
		getCountry();
	}, []);

	return (
		<>
			<h2 className="text-3xl mb-5">CountryRoute</h2>
			{choosedCountry.length > 0 && renderItem(choosedCountry[0])}
		</>
	);
}
