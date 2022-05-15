import { useState, useEffect } from "react";
import Weather from "./Weather";

function Search(){

    const [search, setSearch] = useState("")
    const [weather, setWeather] = useState(null)
    const [cityName, setCityName] = useState("")
    const [isPending, setIsPending] = useState(true)

    function handleSubmit(e) {
        e.preventDefault();

        setCityName(search.charAt(0).toUpperCase() + search.slice(1));
        setSearch("");

        fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${search},'GB'&appid=${process.env.REACT_APP_WEATHER_API_KEY}`)
        .then(res => {
            if (!res.ok) {
                throw Error('could not fetch data');
            }
            console.log(res);
            return res.json()
        })
        .then((city) => {
            console.log(city);
            return fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${city[0].lat}&lon=${city[0].lon}&units=metric&appid=${process.env.REACT_APP_WEATHER_API_KEY}`)
        })
        .then((res) => {
            return res.json()
        })
        .then((weather) => {
            setWeather(weather);
            setIsPending(false);
            console.log(weather);
        })
        .catch(err => {
            console.log(err.message);
        })
    }

    return ( 
        <div>
            <form onSubmit={handleSubmit}> 
                <label>
                    <input type="text" placeholder="Enter city here..." value={search} name="city" onChange={e => setSearch(e.target.value)}/>
                </label>
                <input type="submit" value="Search" />
            </form>

            <div>
                {cityName && <h2 className="city-search">{cityName}</h2>}
                <div className="weather-container">
                    {isPending && <h1>Loading...</h1>}
                    {!isPending && weather.daily.map((day) => {
                        return (
                            <Weather day={day}/>
                        )
                    })}
                </div>
            </div>

            {/* also handle for when the city doesnt exist */}
        </div>
     );
}
 
export default Search;