import { useState, useEffect } from "react";
import { service } from "../../services/mockapi";
import { NavLink } from "react-router-dom";

export default function HomeRoute() {
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);

  async function getData() {
    try {
      const responce = await service.get();
      setCountries(responce);
      if (countries.length > 0 && selectedCountry === null) {
        setSelectedCountry(countries[0]);
      }
    } catch (error) {
      console.log(error);
    }
  }

  const handleSelectCountry = (e) => {
    const selectedCountryName = e.target.value;
    const choosenCountry = countries.find(
      (country) => country.name.official === selectedCountryName
    );
    setSelectedCountry(choosenCountry);
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    if (countries.length > 0) {
      setSelectedCountry(countries[0]);
    }
  }, [countries]);

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
            {countries.length &&
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
          <NavLink className="text-blue-950" to={""}>
            Read more about {selectedCountry.name.official}
          </NavLink>
        )}
      </form>
    </div>
  );
}
