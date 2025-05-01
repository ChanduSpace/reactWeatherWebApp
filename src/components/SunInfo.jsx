import React, { useEffect, useState } from "react";

export default function SunInfo({ sunrise, sunset }) {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    if (sunrise && sunset) {
      setAnimate(false);
      setTimeout(() => setAnimate(true), 100);
    }
  }, [sunrise, sunset]);

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
          <ellipse
            className={`sun-ellipse ${animate ? "ani-progress" : ""}`}
          ></ellipse>
        </svg>
      </div>
    </div>
  );
}
