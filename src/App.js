import "./App.css";
import React, { useEffect, useState } from "react";
import hotbg from "./assets/hot-weather.jpg";
import coldbg from "./assets/cold-weather.jpg";
import { MdOutlineInfo,MdArrowCircleUp, MdArrowCircleDown, MdCompress} from "react-icons/md";
import { WiHumidity } from "react-icons/wi";

// API Key
const API_KEY = "8b9ed26fdb50a6947cd3008a5b2036dd";

// Getting data from the api
async function getWeather(city, units = "metric") {
  const URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=${units}`;
  const data = await fetch(URL)
    .then((response) => response.json())
    .then((data) => data);
  // Getting necessary values
  const { weather, main, sys, coord, name } = data;
  return { weather, main, sys, coord, name };
}

function App() {
  const [useData, setData] = useState(null);
  const [city,setCity] = useState('berlin');
  const [bg, setBg] = useState(hotbg);

  // calling getWeather()
  const fetchData = async () => {
    const data = await getWeather(city);
    console.log(data);
    setData(data);
    if (data.main.temp < 21){
      setBg(coldbg);
    } else {
      setBg(hotbg);
    }
  };

  const getCity = (event) => {
    if (event.keyCode === 13){
      setCity(event.currentTarget.value);
    }
  }

  useEffect(function () {
    fetchData();
  }, [city,fetchData]);

  return (
    <div className="App" style={{ backgroundImage: `url(${bg})`}}>
      <div className="Container">
        <div className="inputData">
          <input type="text" name="city" placeholder="Search.." onKeyDown={getCity}/>
        </div>
        {useData && (
          <div className="main">
            <div className="tempData">
              <div className="icon">
                <h3>{`${useData.name}, ${useData.sys.country}`}</h3>
                <img
                  src={`https://openweathermap.org/img/wn/${useData.weather[0].icon}@2x.png`}
                  alt="Icon"
                />
                <h3>{`${useData.weather[0].description}`}</h3>
              </div>

              <div className="temp">
                <h1>{`${useData.main.temp} °C`}</h1>
              </div>
            </div>
            <div className='otherData'>
              <div className='data'>
                <h2><MdOutlineInfo style={{fontSize:'25px'}}/> Latitude</h2>
                <p>{`${useData.coord.lat}`}</p>
              </div>
              <div className='data'>
                <h2><MdOutlineInfo style={{fontSize:'25px'}}/> Longitude</h2>
                <p>{`${useData.coord.lon}`}</p>
              </div>
              <div className='data'>
                <h2><MdArrowCircleUp style={{fontSize:'25px'}}/> Max</h2>
                <p>{`${useData.main.temp_max}`}</p>
              </div>
              <div className='data'>
                <h2><MdArrowCircleDown style={{fontSize:'25px'}}/> min</h2>
                <p>{`${useData.main.temp_min}`}</p>
              </div>
              <div className='data'>
                <h2><WiHumidity style={{fontSize:'25px'}}/> Humidity</h2>
                <p>{`${useData.main.humidity} %`}</p>
              </div>
              <div className='data'>
                <h2><MdCompress style={{fontSize:'25px'}}/> Pressure</h2>
                <p>{`${useData.main.pressure} hPa`}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
