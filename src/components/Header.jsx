import React, { useState } from "react";

export default function Header({ onSearch }) {
  const [city, setCity] = useState("");

  const handleClick = () => {
    if (city.trim()) onSearch(city);
  };

  return (
    <header>
      <h1>WEATHER.</h1>
      <div className="search-div">
        <input
          type="text"
          className="input-box"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleClick()}
        />
        <button className="search-button" onClick={handleClick}>
          <img className="search-png" src="/pics/search.svg" alt="Search" />
        </button>
      </div>
    </header>
  );
}
