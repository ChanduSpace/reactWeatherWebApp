import React, { useEffect, useState } from "react";

export default function MainCard({ data }) {
  const [flip, setFlip] = useState(false);

  useEffect(() => {
    if (data) {
      setFlip(false);
      setTimeout(() => setFlip(true), 100);
    }
  }, [data]);

  if (!data) return null;
  return (
    <div className={`main-container ${flip ? "ani-flip" : ""}`}>
      <div className="main-wrapper">
        <div className="temp-and-img">
          <div className="temp">
            <p className="now">Now</p>
            <h1>
              {Math.round(data.temp)}
              <span>°c</span>
            </h1>
            <p className="main">{data.description}</p>
          </div>
          <div className="img-container">
            <img className="main-png" src={`/pics/${data.img}`} alt="Weather" />
          </div>
        </div>
        <div className="date-and-time">
          <div className="dt">
            <div className="date">
              <img src="/pics/cal.png" alt="" />
              <p>{data.date}</p>
            </div>
            <div className="location">
              <img src="/pics/loc.png" alt="" />
              <p>{data.city}</p>
            </div>
          </div>
          <div className="time">
            <p>{data.time}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
