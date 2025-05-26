import { NavLink } from "react-router-dom";

function HomeRoute({ countries, selectedCountry, setSelectedCountry }) {
	const handleSelectCountry = (e) => {
		const selectedCountryName = e.target.value;
		const chosenCountry = countries.find(
			(country) => country.name.official === selectedCountryName
		);
		setSelectedCountry(chosenCountry);
	};

	return (
		<div className="text-center">
			<h2 className="my-5 font-bold text-2xl">HomeRoute</h2>
			<form className="form w-full max-w-sm mx-auto p-2 bg-white border border-black-700">
				<div className="flex justify-between">
					<label htmlFor="country">Choose country:</label>
					<select
						name="country"
						id="country"
						value={selectedCountry ? selectedCountry.name.official : ""}
						className="w-60 border border-black-500"
						onChange={handleSelectCountry}
					>
						{countries.length > 0 &&
							countries.map((country, index) => {
								return (
									<option key={index} value={country.name.official}>
										{country.flag} {country.name.official}
									</option>
								);
							})}
					</select>
				</div>
				{selectedCountry && (
					<NavLink
						className="text-blue-950"
						to={`/countries/${selectedCountry.name.common}`}
					>
						Read more about {selectedCountry.name.official}
					</NavLink>
				)}
			</form>
		</div>
	);
}

export { HomeRoute };
