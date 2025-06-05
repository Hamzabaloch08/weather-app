import React from "react";

function Card({ time, temp, icon }) {
  return (
    <div className="p-2 text-center text-white w-20 flex-shrink-0 rounded-xl">
      <p className="text-xs font-extralight">{time}</p>
      <img
        src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
        alt="weather icon"
        className="w-10 h-10 mx-auto"
      />
      <p className="text-sm font-extralight">{temp}°</p>
    </div>
  );
}

export default Card;
