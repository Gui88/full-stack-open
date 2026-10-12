import { useState, useEffect } from "react";
import weatherService from "../services/weather";

const Countries = ({ countriesList }) => {
  const [singleCountry, setSingleCountry] = useState(null);
  const [weatherTemperature, setweatherTemperature] = useState("");
  const [weatherWind, setWeatherWind] = useState("");
  const [weatherIcon, setWeatherIcon] = useState("");

  useEffect(() => {
    setSingleCountry(null);
  }, [countriesList]);

  const ShowSingleCountry = ({ country }) => {
    useEffect(() => {
      if (!country) {
        return;
      }

      weatherService
        .getWeather(
          Object.values(country.capitalInfo)[0][0], //latitude
          Object.values(country.capitalInfo)[0][1], //longitude
        )
        .then((weather) => {
          setweatherTemperature(weather.main.temp);
          setWeatherWind(weather.wind.speed);
          setWeatherIcon(weather.weather[0].icon);
        });
    }, []);

    if (!country) {
      return null;
    }

    return (
      <>
        <h1>{country.name.common}</h1>
        <p>Capital {country.capital}</p>
        <p>Area {country.area}</p>
        <h2>Languages</h2>
        <ul>
          {Object.values(country.languages).map((language) => (
            <li key={language}>{language}</li>
          ))}
        </ul>
        <img src={country.flags.png} />
        <h1>Weather in {country.capital}</h1>
        <p>Temperature {weatherTemperature} celsius</p>
        {weatherIcon && (
          <img
            src={`https://openweathermap.org/payload/api/media/file/${weatherIcon}.png`}
          />
        )}
        <p>Wind {weatherWind} m/s</p>
      </>
    );
  };

  if (countriesList.length > 10) {
    return <p>Too many matches, specify another filter </p>;
  } else if (countriesList.length === 1) {
    return <ShowSingleCountry country={countriesList[0]} />;
  } else {
    return (
      <>
        <ul>
          {countriesList.map((country) => (
            <li key={country.cca2}>
              {country.name.common}
              <button onClick={() => setSingleCountry(country)}>Show</button>
            </li>
          ))}
        </ul>
        <ShowSingleCountry country={singleCountry} />
      </>
    );
  }
};
export default Countries;
