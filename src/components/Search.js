import { useState, useEffect } from "react";
import Weather from "./Weather";

function Search(){
    localStorage.clear();
    sessionStorage.clear();

    const [search, setSearch] = useState("")
    const [weather, setWeather] = useState(null)
    const [cityName, setCityName] = useState("")
    const [isPending, setIsPending] = useState(false)
    const [isInvalidCity, setIsInvalidCity] = useState(false)
    const [celcius, setCelcius] = useState(false)    // repeated code
    const [farenheit, setFarenheit] = useState(false)    // repeated code

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
            setCelcius(true);    // repeated code
            console.log('weather: ' + weather);
        })
        .catch(err => {
            console.log(err.message);
        })
    }

    // repeated code
    const convertToFarenheit = () => {
        weather.daily.forEach((day) => {
            day.temp.day = day.temp.day * 9/5 + 32;
        });

        setCelcius(false)
        setFarenheit(true)
        console.log(weather);
    }

    // repeated code 
    const convertToCelcius = () => {
        weather.daily.forEach((day) => {
            day.temp.day = (day.temp.day - 32) * 5 / 9;
        });

        setCelcius(true);
        setFarenheit(false);
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
            {/* repeated code */}
            {celcius && <button onClick={convertToFarenheit}>Convert to Farenheit</button>}
            {farenheit && <button onClick={convertToCelcius}>Convert to Celcius</button>}

        </div>
     );
}
 
export default Search;