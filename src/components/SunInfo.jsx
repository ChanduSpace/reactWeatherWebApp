import React, { useEffect, useState } from "react";

export default function SunInfo({ sunrise, sunset, currentTime }) {
  const [animate, setAnimate] = useState(false);
  const [sunPercent, setSunPercent] = useState(0);

  useEffect(() => {
    if (sunrise && sunset && currentTime) {
      const sunriseSec = parseTime(sunrise);
      const sunsetSec = parseTime(sunset);
      const nowSec = parseTime(currentTime);

      // Calculate sun position between 0 and 100
      if (nowSec >= sunriseSec && nowSec <= sunsetSec) {
        const percent =
          ((nowSec - sunriseSec) * 100) / (sunsetSec - sunriseSec);
        setSunPercent(percent.toFixed(2));
      } else {
        setSunPercent(-1); // sun below horizon
      }

      setAnimate(false);
      setTimeout(() => setAnimate(true), 100);
    }
  }, [sunrise, sunset, currentTime]);

  useEffect(() => {
    document.documentElement.style.setProperty("--sun-position", sunPercent);
  }, [sunPercent]);

  return (
    <div className="sun-container">
      <p className="rise-time">
        <span className="rise">{sunrise}</span>
        <br />
        <span className="pre">Sun Rise</span>
      </p>
      <p className="set-time">
        <span className="set">{sunset}</span>
        <br />
        <span className="pre">Sun Set</span>
      </p>
      <div className="sun-base">
        <svg className="path-svg">
          <ellipse className="path-ellipse" />
          <ellipse className={`sun-ellipse ${animate ? "ani-progress" : ""}`} />
        </svg>
      </div>
    </div>
  );
}

function parseTime(timeStr) {
  const [h, m] = timeStr.split(":").map(Number);
  return h * 3600 + m * 60;
}
