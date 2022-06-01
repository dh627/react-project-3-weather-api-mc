import { useState, useEffect } from "react";
import Weather from "./Weather";

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

    const convertToFarenheit = () => {
        // create a new array so that we arent modifying state
        let weatherArray = weather.daily;

        // update the copy of state that we want to update
        weatherArray.forEach((day) => {
            day.temp.day = day.temp.day * 9/5 + 32;
            console.log('Weather.daily: ', weather.daily);
        });

        // set the new data to be the state 
        setWeather({ 
            ...weather, 
            daily: weatherArray,
         })

        setCelcius(false)
        setFarenheit(true)
    }

    const convertToCelcius = () => {
        let weatherArray = weather.daily;

        // update the copy of state that we want to update
        weatherArray.forEach((day) => {
            day.temp.day = (day.temp.day - 32) * 5 / 9;
        });

        // set the new data to be the state 
        setWeather({ 
            ...weather, 
            daily: weatherArray,
         })

        setCelcius(true);
        setFarenheit(false);
    }

    let testFunction = () => {
        let weatherArray = weather.daily.map((day) => {
            let copy = Object.assign({}, day);
            console.log(Object.is(copy, day));
            return copy;
        })

        console.log('Weather array before:' + weatherArray[0].temp.day);
        console.log('Weather state before: ' + weather.daily[0].temp.day);

        weatherArray[0].temp.day = 1;
        console.log('Weather array after:' + weatherArray[0].temp.day);
        console.log('Weather state after: ' + weather.daily[0].temp.day);

        // weatherArray[0].temp.day = 1;
        // console.log('State: weather.daily[0]:' + weather.daily[0].temp.day);

        // setWeather({
        //     ...weather,
        //     daily
        // })

        // weather.daily.map((day) => {
        //     return {...day}
        // })

        // console.log('WEATHER ARRAY: ', weatherArray);
        // console.log("weather state: ", weather.daily);

        // weatherArray[0].temp.day = 1;
        // console.log('weather.daily[0]:' + weather.daily[0].temp.day);
        // console.log(weather.daily);

        // update the copy of state that we want to update
        // weatherArray.forEach((day) => {
        //     day.temp.day = day.temp.day * 9/5 + 32;
        // });


        // console.log('weather array: ', weatherArray)
        // console.log('weather.daily state:', weather.daily);

        // set the new data to be the state 
        // setWeather({ 
        //     ...weather, 
        //     daily: weatherArray,
        //     })

        // setCelcius(true);
        // setFarenheit(false);
    }

    console.log('WEATHER: ', weather);
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
            {celcius && <button onClick={convertToFarenheit}>Convert to Farenheit</button>}
            {farenheit && <button onClick={convertToCelcius}>Convert to Celcius</button>}
            {celcius && <button onClick={testFunction}>Test Function</button>}
        </div>
     );
}
 
export default Home;