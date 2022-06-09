function Conversion({weather, celcius, farenheit, setWeather, setCelcius, setFarenheit}){

    const convertToFarenheit = () => {
        // create a copy of each day so that we arent updating the state
        // note ...day wont make a copy of nested properties, so we must copy over temp separately 
        let weatherArray = weather.daily.map((day) => {
            const newDay = {
                ...day,
                temp: {
                    ...day.temp,
                }
            }
            newDay.temp.day = newDay.temp.day * 9/5 + 32;

            return newDay;
        })


        // set the new data to be the state 
        setWeather({ 
            ...weather, 
            daily: weatherArray,
         })

        setCelcius(false)
        setFarenheit(true)
    }

    // repeated code 
    const convertToCelcius = () => {
        let weatherArray = weather.daily.map((day) => {
            const newDay = {
                ...day,
                temp: {
                    ...day.temp,
                }
            }

            newDay.temp.day = (newDay.temp.day -32) * 5 / 9; 

            return newDay;
        });

        // set the new data to be the state 
        setWeather({ 
            ...weather, 
            daily: weatherArray,
         })

        setCelcius(true);
        setFarenheit(false);
    }
    
    return (
        <div>
            {celcius && <button onClick={convertToFarenheit}>Convert to Farenheit</button>}
            {farenheit && <button onClick={convertToCelcius}>Convert to Celcius</button>}
        </div>
     );
}
 
export default Conversion;
