import { NavLink } from "react-router-dom";

function CountriesRoute({ countries }) {
	return (
		<div className="countries">
			<h2 className="coutries__title text-3xl mb-8">CountriesRoute</h2>
			<div className="countries__list">
				{countries.length > 0 &&
					countries.map((country, index) => {
						return (
							<NavLink
								to={`/countries/${country.name.common}`}
								className="block text-blue-500 hover:text-blue-950 w-140"
								key={index}
								value={country.name.official}
							>
								{country.flag} {country.name.official}
							</NavLink>
						);
					})}
			</div>
		</div>
	);
}

export default CountriesRoute;
