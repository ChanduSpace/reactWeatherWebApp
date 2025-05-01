import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import MainCard from "./components/MainCard";
import SunInfo from "./components/SunInfo";
import HourlyForecast from "./components/HourlyForecast";
import WeeklyForecast from "./components/WeeklyForecast";
import ComfortInfo from "./components/ComfortInfo";
import WindInfo from "./components/WindInfo";
import "./styles/weather.css";
import "./styles/rightsection.css";
import "./styles/rightbottom.css";
import "./styles/media.css";

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [hourly, setHourly] = useState([]);
  const [weekly, setWeekly] = useState([]);

  const fetchWeather = async (city) => {
    const res1 = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
    );
    const data1 = await res1.json();
    const res2 = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${API_KEY}`
    );
    const data2 = await res2.json();

    const dt = new Date((data1.dt + data1.timezone) * 1000);
    const weather = {
      temp: data1.main.temp,
      feelsLike: data1.main.feels_like,
      humidity: data1.main.humidity,
      city: data1.name,
      description: data1.weather[0].description,
      img: mapToImage(data1.weather[0].main),
      date: `${dt.getDate()}, ${dt.toLocaleString("default", {
        month: "short",
      })} ${dt.toLocaleString("default", { weekday: "short" })}`,
      time: `${dt.getHours()}:${dt.getMinutes()}`,
      sunrise: toTime(data1.sys.sunrise, data1.timezone),
      sunset: toTime(data1.sys.sunset, data1.timezone),
      wind: {
        speed: `${data1.wind.speed} km/h`,
        direction: getWindDirection(data1.wind.deg),
      },
      uvi: 11, // mock UV value or replace with real API
    };

    setWeatherData(weather);

    const hourlyData = data2.list.slice(0, 8).map((item) => ({
      time: toTime(item.dt, data2.city.timezone),
      temp: Math.round(item.main.temp),
      img: mapToImage(item.weather[0].main),
    }));
    setHourly(hourlyData);

    const dailyData = [];
    for (let i = 0; i < 40; i += 8) {
      const item = data2.list[i];
      const date = new Date((item.dt + data2.city.timezone) * 1000);
      dailyData.push({
        date: `${date.getDate()}, ${date.toLocaleString("default", {
          month: "short",
        })} ${date.toLocaleString("default", { weekday: "short" })}`,
        temp: Math.round(item.main.temp),
        img: mapToImage(item.weather[0].main),
      });
    }
    setWeekly(dailyData);
  };

  useEffect(() => {
    fetchWeather("Hyderabad");
  }, []);

  return (
    <>
      <Header onSearch={fetchWeather} />
      <section className="section">
        <div className="left-section">
          <MainCard data={weatherData} />
          <SunInfo
            sunrise={weatherData?.sunrise}
            sunset={weatherData?.sunset}
          />
        </div>
        <div className="right-section">
          <p>Next 24 Hours</p>
          <HourlyForecast forecast={hourly} />
          <p>This Week</p>
          <WeeklyForecast forecast={weekly} />
          <div className="wind-humidity">
            <ComfortInfo
              humidity={weatherData?.humidity}
              feelsLike={weatherData?.feelsLike}
              uvi={weatherData?.uvi}
            />
            <WindInfo
              direction={weatherData?.wind.direction}
              speed={weatherData?.wind.speed}
            />
          </div>
        </div>
      </section>
    </>
  );
}

function toTime(timestamp, timezoneOffset) {
  const date = new Date((timestamp + timezoneOffset) * 1000);
  return `${date.getUTCHours()}:${String(date.getUTCMinutes()).padStart(
    2,
    "0"
  )}`;
}

function mapToImage(main) {
  switch (main) {
    case "Clear":
      return "clear.png";
    case "Clouds":
      return "cloudy.png";
    case "Rain":
      return "rain.png";
    case "Mist":
      return "sunny.png";
    case "Drizzle":
      return "drizzle.png";
    default:
      return "clear.png";
  }
}

function getWindDirection(deg) {
  if (deg === 0) return "North";
  if (deg > 0 && deg < 90) return "North-East";
  if (deg === 90) return "East";
  if (deg > 90 && deg < 180) return "South-East";
  if (deg === 180) return "South";
  if (deg > 180 && deg < 270) return "South-West";
  if (deg === 270) return "West";
  if (deg > 270 && deg < 360) return "North-West";
  return "Unknown";
}

export default App;
