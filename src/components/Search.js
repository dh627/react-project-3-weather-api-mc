import { useState, useEffect } from "react";
import Weather from "./Weather";
import Conversion from "./Conversion";

function Search(){
    localStorage.clear();
    sessionStorage.clear();

    const [search, setSearch] = useState("")
    const [weather, setWeather] = useState(null)
    const [cityName, setCityName] = useState("")
    const [isPending, setIsPending] = useState(false)
    const [isInvalidCity, setIsInvalidCity] = useState(false)
    const [celcius, setCelcius] = useState(false)
    const [farenheit, setFarenheit] = useState(false)

    function handleSubmit(e) {
        e.preventDefault();
        setIsPending(true);

        setCityName(search.charAt(0).toUpperCase() + search.slice(1));
        setSearch("");

        fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${search},GB&appid=${process.env.REACT_APP_WEATHER_API_KEY}`)
        .then(res => {
            if (!res.ok) {
                throw Error('could not fetch data');
            }
            return res.json()
        })
        .then((city) => {
            console.log(city);
            if (!city.length) {
                setIsInvalidCity(true);
            }
            return fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${city[0].lat}&lon=${city[0].lon}&units=metric&appid=${process.env.REACT_APP_WEATHER_API_KEY}`)
        })
        .then((res) => {
            return res.json()
        })
        .then((weather) => {
            setWeather(weather);
            setIsPending(false);
            setCelcius(true);
            console.log('weather: ' + weather);
        })
        .catch(err => {
            console.log(err.message);
        })
    }

    return ( 
        <div>
            <form onSubmit={handleSubmit}> 
                <label>
                    <input type="text" placeholder="Enter a British city here..." value={search} name="city" onChange={e => setSearch(e.target.value)}/>
                </label>
                <input type="submit" value="Search" />
            </form>

            <div>
                {cityName && <h2 className="city-search">{cityName}</h2>}
                <div className="weather-container">
                    {isInvalidCity && <div className="error-msg">{cityName} is an invalid city</div>}
                    {isPending && <div><h1>Loading...</h1></div>}
                    {weather && weather.daily.map((day) => {
                        return (
                            <Weather day={day}/>
                        )
                    })}
                </div>
            </div>
            {/* could the way i'm passing in props be refactored? */}
            <Conversion weather={weather} celcius={celcius} farenheit={farenheit} setWeather={setWeather} setCelcius={setCelcius} setFarenheit={setFarenheit}/>
        </div>
     );
}
 
export default Search;