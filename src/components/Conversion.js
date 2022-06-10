function Conversion({weather, celcius, farenheit, setWeather, setCelcius, setFarenheit}){

    const convertWeather = (unit) => {
        // create a copy of each day so that we arent updating the state
        let weatherArray = weather.daily.map((day) => {
            const newDay = {
                ...day,
                temp: {
                    ...day.temp,
                }
            }

            if (unit === 'farenheit') {
                newDay.temp.day = newDay.temp.day * 9/5 + 32;
            } else {
                newDay.temp.day = (newDay.temp.day -32) * 5 / 9;     
            }

            return newDay;
        })


        // set the new data to be the state 
        setWeather({ 
            ...weather, 
            daily: weatherArray,
         })

        setCelcius(unit === 'farenheit' ? false : true)
        setFarenheit(unit === 'farenheit' ? true : false)
    }

    // const convertToCelcius = () => {
    //     let weatherArray = weather.daily.map((day) => {
    //         const newDay = {
    //             ...day,
    //             temp: {
    //                 ...day.temp,
    //             }
    //         }

    //         newDay.temp.day = (newDay.temp.day -32) * 5 / 9; 

    //         return newDay;
    //     });

    //     // set the new data to be the state 
    //     setWeather({ 
    //         ...weather, 
    //         daily: weatherArray,
    //      })

    //     setCelcius(true);
    //     setFarenheit(false);
    // }
    
    return (
        <div>
            {celcius && <button onClick={() => convertWeather('farenheit')}>Convert to Farenheit</button>}
            {farenheit && <button onClick={() => convertWeather('celcius')}>Convert to Celcius</button>}
        </div>
     );
}
 
export default Conversion;
