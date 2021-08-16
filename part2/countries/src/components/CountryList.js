import axios from 'axios';
import { React, useState, useEffect } from 'react'

export default function CountryList({ countries }) {
    return (
        countries.map(country => <Country country={country} />)
    )
}

const Country = ({ country }) => {
    const [show, setShow] = useState(false);
    const [weather, setWeather] = useState({});

    const toggleShow = () => setShow(!show);

    useEffect(() => {
        axios
            .get(`https://api.openweathermap.org/data/2.5/weather?q=${country.capital}&appid=${process.env.REACT_APP_API_KEY}&units=metric`)
            .then(response => {
                setWeather(response.data);
            })
    }, []);

    const hiddenTemplate = (
        <div>
            <span>{country.name}</span>
            <button onClick={() => toggleShow()}>show</button>
        </div>
    );

    const showTemplate = (
        <div>
            <h1>{country.name}</h1>
            <p>capital {country.capital}</p>
            <p>population {country.population}</p>
            <h2>languages</h2>
            <ul>
                {country.languages.map(language => <li>{language.name}</li>)}
            </ul>
            <img src={country.flag} alt={`flag of ${country.name}`} />
            <h1>Weather in {country.capital}</h1>
            <p>temp: {Math.round(weather.main.temp)}&deg; C</p>
            <img src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt="weather-icon" />
        </div>
    )

    if (show) {
        return showTemplate;
    } else {
        return hiddenTemplate;
    }
}