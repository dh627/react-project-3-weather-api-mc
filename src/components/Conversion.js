function Weather({day}){

    const convertToFarenheit = () => {
        weather.daily.forEach((day) => {
            day.temp.day = day.temp.day * 9/5 + 32;
        });

        setCelcius(false)
        setFarenheit(true)
        console.log(weather);
    }

    const convertToCelcius = () => {
        weather.daily.forEach((day) => {
            day.temp.day = (day.temp.day - 32) * 5 / 9;
        });

        setCelcius(true);
        setFarenheit(false);
    }
    
    return (
        <button onClick={convertToFarenheit}>Convert to Farenheit</button>
     );
}
 
export default Conversion;
