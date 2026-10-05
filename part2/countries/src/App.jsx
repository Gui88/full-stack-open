import { useEffect, useState } from "react";
import Search from "./components/Search";
import countriesService from "./services/countries";
import Countries from "./components/Countries";

function App() {
  const [country, setCountry] = useState([]);
  const [searchCountry, setSearchCountry] = useState("");

  useEffect(() => {
    countriesService.getAll().then((country) => {
      setCountry(country);
    });
  }, []);

  const countriesToShow = country.filter((country) =>
    country.name.common.toUpperCase().includes(searchCountry.toUpperCase()),
  );

  const handleSearchChange = (event) => {
    setSearchCountry(event.target.value);
  };

  return (
    <div>
      <Search value={searchCountry} onChange={handleSearchChange} />
      <Countries countriesList={countriesToShow} />
    </div>
  );
}

export default App;
