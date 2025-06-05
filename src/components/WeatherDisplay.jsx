import React, { useState } from "react";
import { useWeather } from "../context/weatherContext";
import Card from "./Card";
import { FiSearch } from "react-icons/fi";

function WeatherDisplay() {
  const { weatherData, fetchWeather, error } = useWeather();
  const [searchValue, setSearchValue] = useState("karachi");
  const current = weatherData?.list?.[0];

  const handleSearch = () => {
     fetchWeather(searchValue.trim());
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSearch();
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-[#0f2027] via-[#203a43] to-[#2c5364] px-3 py-5">
      <div className="w-full max-w-sm bg-black/30 backdrop-blur-2xl rounded-3xl shadow-xl p-5 space-y-4 transition-all duration-300 ease-in-out">

        {/* Search Input + Button */}
        <div className="flex w-full gap-2">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Enter city"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              onKeyDown={handleKeyDown}
              className="w-full py-2.5 px-4 pl-10 rounded-xl bg-white/10 text-white text-sm placeholder-white tracking-wide outline-none focus:ring-2 focus:ring-white/50"
            />
            <FiSearch
              className="absolute left-3 top-1/2 -translate-y-1/2 text-white cursor-pointer"
              size={18}
              onClick={()=> handleSearch()}
            />
          </div>

          <button
            onClick={handleSearch}
            className="px-4 py-2 rounded-xl bg-white/20 text-white text-sm font-medium hover:bg-white/30 transition cursor-pointer"
          >
            Search
          </button>
        </div>

        {/* Error Message */}
        {error && <p className="text-red-400 text-xs text-center">{error}</p>}


          <>
            {/* Current Weather */}
            {current && (
              <div className="text-center text-white space-y-1">
                <h1 className="text-6xl font-light leading-none">
                  {Math.floor(current.main.temp)}<sup className="text-3xl">°</sup>
                </h1>
                <p className="capitalize text-xs">{current.weather?.[0]?.description}</p>
              </div>
            )}

            {/* Hourly Forecast */}
            <div className="overflow-x-auto scrollbar-hide flex gap-3 bg-white/5 backdrop-blur-xl p-3 rounded-2xl">
              {weatherData?.list?.slice(0, 8).map((item, index) => (
                <Card
                  key={index}
                  time={index === 0 ? "Now" : new Date(item.dt * 1000).getHours() + ":00"}
                  temp={Math.floor(item.main.temp)}
                  icon={item.weather[0].icon}
                />
              ))}
            </div>

            {/* Daily Forecast */}
            <div className="grid grid-cols-2 gap-4 place-items-center bg-white/5 backdrop-blur-xl p-4 rounded-2xl max-h-[200px] overflow-y-auto scrollbar-hide">
              {[8, 16, 24, 32].map((i, idx) => {
                const item = weatherData?.list?.[i];
                const date = new Date(item?.dt * 1000);
                return (
                  <Card
                    key={idx}
                    time={date.toLocaleDateString("en-US", { weekday: "short" })}
                    temp={Math.floor(item?.main?.temp)}
                    icon={item?.weather?.[0]?.icon}
                  />
                );
              })}
            </div>
          </>
      </div>
    </div>
  );
}

export default WeatherDisplay;
