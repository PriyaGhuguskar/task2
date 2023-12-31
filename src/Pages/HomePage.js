import React, { useEffect, useState } from 'react'
import './HomePage.css'

const HomePage = () => {
    const [cityName, setCityName] = useState("Pune");
    const [inputText, setInputText] = useState("");
    const [data, setData] = useState({});
    const [weathStatus, setweathStatus] = useState({})
    const [error, setError] = useState(false);

    // https://api.openweathermap.org/data/2.5/weather?q=pune&units=metric&appid=840de593b7028de6e424162454790fe5

    useEffect(() => {
        fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=840de593b7028de6e424162454790fe5`
        )
            .then((res) => {
                if (res.status === 200) {
                    error && setError(false);
                    return res.json();
                } else {
                    throw new Error("Something went wrong");
                }
            })
            .then((data) => {
                setData(data);
                console.log(data)
                setweathStatus(data.weather[0])


            })
            .catch(() => setError(true))

    }, [cityName, error]);
    //    Search city
    const handleSearch = (e) => {
        if (e.key === "Enter") {
            setCityName(e.target.value);
            setInputText("");
        }
    };

    return (
        <div className="bg_img">
            <div className='bgContain'>
                <div className='searchDiv'>
                    <input className='input' placeholder='Search City'
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                        onKeyDown={handleSearch} />
                </div>


                <h1 className="city">{data.name}</h1>
                <div className="group">
                    <img
                        src={`http://openweathermap.org/img/wn/${weathStatus.icon}@2x.png`}
                        alt=""
                    />
                    <h1>{weathStatus.main}</h1>
                </div>

                <h1 className="temp">{data?.main?.temp.toFixed()} °C</h1>
            </div>
            <div className="box_container">


                <div className="box">
                    <p>Feels Like</p>
                    <h1>{data?.main?.feels_like.toFixed()} °C</h1>
                </div>
            </div>
        </div>
    )
}

export default HomePage