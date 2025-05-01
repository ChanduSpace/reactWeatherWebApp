import React from "react";

export default function ComfortInfo({ humidity, feelsLike, uvi }) {
  return (
    <div className="humidity-container">
      <p>Comfort level</p>
      <div className="humidity-wrapper">
        <div className="humididy-progress-container">
          <p>Humidity</p>
          <div className="progress-bar">
            <svg className="outer-svg" viewBox="0 0 144 144">
              <circle className="outer-circle" cx="72" cy="72" r="58" />
              <svg className="inner-svg" viewBox="0 0 144 144">
                <circle className="inner-circle" cx="72" cy="72" r="58" />
              </svg>
            </svg>
          </div>
          <p className="humidity-value">{humidity}%</p>
          <p className="O">0</p>
          <p className="IOO">100</p>
        </div>
        <div className="humidity-info-container">
          <p>
            Feels like: <span className="feel-like">{feelsLike}</span>
            <span>°</span>
          </p>
          <p>
            UV Index: <span className="uvi">{uvi}</span>
          </p>
        </div>
      </div>
    </div>
  );
}
