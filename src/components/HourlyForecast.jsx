import React from "react";

export default function HourlyForecast({ forecast }) {
  return (
    <div className="all-day-container">
      {forecast.map((hour, idx) => (
        <div className="hour" key={idx}>
          <p>{hour.time}</p>
          <div className="hour-img">
            <img src={`/pics/${hour.img}`} alt="" />
          </div>
          <p className="hour-temp">{hour.temp}°c</p>
        </div>
      ))}
    </div>
  );
}
