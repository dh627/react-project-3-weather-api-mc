import { useState, useEffect } from "react";
import Weather from "./Weather";
import Conversion from "./Conversion";

function Home(){
    const [weather, setWeather] = useState(null)
    const [isPending, setIsPending] = useState(true)
    const [celcius, setCelcius] = useState(false)
    const [farenheit, setFarenheit] = useState(false)
  
    useEffect(() => {
        fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=49.316666&lon=-123.066666&units=metric&appid=${process.env.REACT_APP_WEATHER_API_KEY}`)
            .then(res => {
                if (!res.ok) {
                    throw Error('could not fetch data');
                }
                return res.json()
            })
            .then((weather) => {
                setWeather(weather);
                setCelcius(true);
                setIsPending(false);
            })
            .catch(err => {
                console.log(err.message);
            })
    }, [])

    return ( 
        <div>
            <h2>Vancouver</h2>
            <div className="weather-container">
                {isPending && <h1>Loading...</h1>}
                {!isPending && weather.daily.map((day) => {
                    return (
                        <Weather day={day}/>
                    )
                })}
            </div>
            {/* could the way i'm passing in props be refactored? */}
            <Conversion weather={weather} celcius={celcius} farenheit={farenheit} setWeather={setWeather} setCelcius={setCelcius} setFarenheit={setFarenheit}/>
        </div>
     );
}
 
export default Home;