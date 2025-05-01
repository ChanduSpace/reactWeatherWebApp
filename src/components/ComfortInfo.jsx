import React, { useEffect, useState } from "react";

export default function ComfortInfo({ humidity, feelsLike, uvi }) {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    if (humidity !== undefined) {
      setAnimate(false);
      setTimeout(() => setAnimate(true), 100);
    }
  }, [humidity]);

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
                <circle
                  className={`inner-circle ${animate ? "ani" : ""}`}
                  cx="72"
                  cy="72"
                  r="58"
                  style={{ "--humidity": humidity }}
                />
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
