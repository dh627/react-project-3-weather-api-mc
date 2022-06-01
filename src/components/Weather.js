function Weather({day}){

    return ( 
        <div className="daily-weather">
            <p className="temperature">{Math.trunc(day.temp.day)}<span className="measurement">&deg;C</span></p>
            <img src={`http://openweathermap.org/img/w/${day.weather[0].icon}.png`}/>
            <p className="description">{day.weather[0].description}</p>
        </div> 
     );
}
 
export default Weather;