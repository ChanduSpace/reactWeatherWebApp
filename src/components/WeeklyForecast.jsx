import React from "react";

export default function WeeklyForecast({ forecast }) {
  return (
    <div className="all-week-container">
      {forecast.map((day, idx) => (
        <div className="day" key={idx}>
          <p>{day.date}</p>
          <div className="hour-img">
            <img src={`/pics/${day.img}`} alt="" />
          </div>
          <p className="hour-temp">{day.temp}°c</p>
        </div>
      ))}
    </div>
  );
}
