import React from "react";

export default function WindInfo({ direction, speed }) {
  return (
    <div className="wind-container">
      <p>Wind</p>
      <div className="wind-img-info-container">
        <div className="wind-img">
          <div className="big-windmill">
            <img className="big-tower" src="/pics/windmillTower.png" alt="" />
            <img className="big-blade" src="/pics/windmillBlade.png" alt="" />
          </div>
          <div className="small-windmill">
            <img className="small-tower" src="/pics/windmillTower.png" alt="" />
            <img className="small-blade" src="/pics/windmillBlade.png" alt="" />
          </div>
        </div>
        <div className="wind-info">
          <p>
            Direction: <span className="wind-direction">{direction}</span>
          </p>
          <p>
            Speed: <span className="wind-speed">{speed}</span>
          </p>
        </div>
      </div>
    </div>
  );
}
