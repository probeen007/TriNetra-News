import { useState, useEffect } from "react";

export default function CallToAction() {
  const [gold, setGold] = useState({ tola: "-", tenGram: "-" });
  const [silver, setSilver] = useState({ tola: "-", tenGram: "-" });
  const [nepse, setNepse] = useState("-");
  const [weather, setWeather] = useState({
    temp: "-",
    condition: "",
    place: "Weather",
    icon: "",
  });
  const [error, setError] = useState(false);

  // Fetch Gold, Silver, NEPSE
  const fetchData = async () => {
    try {
      const res = await fetch("https://trinetra-news.onrender.com/api/market/all");
      const data = await res.json();
      if (!res.ok) throw new Error("Market fetch failed");

      setGold(data.gold || { tola: "-", tenGram: "-" });
      setSilver(data.silver || { tola: "-", tenGram: "-" });
      setNepse(data.nepseIndex || "-");
      setError(false);
    } catch (err) {
      console.error("Market data fetch error:", err);
      setError(true);
    }
  };

  // Fetch Weather Data
  const fetchWeather = async (lat, lon) => {
    try {
      const apiKey = "863b70e9b174acaf281271f6ffb194b2"; // Replace with your API key
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
      const res = await fetch(url);
      const data = await res.json();

      // Safety check: make sure weather data exists
      if (!data.weather || !data.weather[0]) {
        console.error("Weather data missing", data);
        return;
      }
      const condition = data.weather[0].main; // e.g., Clear, Clouds, Rain
      const icon = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

      setWeather({
        temp: data.main.temp,
        condition,
        place: data.name,
        icon,
      });
    } catch (err) {
      console.error("Weather fetch error:", err);
    }
  };

  // Get User Location
  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          fetchWeather(position.coords.latitude, position.coords.longitude);
        },
        (err) => {
          console.error("Geolocation error:", err);
          // fallback location (Kathmandu)
          fetchWeather(27.7172, 85.3240);
        },
        { enableHighAccuracy: true }
      );
    } else {
      // fallback location
      fetchWeather(27.7172, 85.3240);
    }
  };


  useEffect(() => {
    fetchData();
    getUserLocation();
    const interval = setInterval(() => {
      fetchData();
      getUserLocation();
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative rounded-2xl shadow-xl p-5 max-w-5xl mx-auto border border-gray-200 dark:border-gray-700 transition-colors bg-white dark:bg-[rgb(16,23,42)]">
      {/* Logo */}
      <div className="flex justify-center mb-1">
        <img
          src="https://i.postimg.cc/G2wn9kKH/dark.png"
          alt="Trinetra Post Logo"
          className="h-20 w-auto object-contain"
        />
      </div>

      <hr className="border-gray-300 dark:border-gray-600 mb-4" />

      {/* LIVE badge */}
      <div className="absolute top-3 left-3 animate-pulse">
        <span className="bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow">
          LIVE
        </span>
      </div>

      {/* Content */}
      <div className="flex flex-col gap-4">
        {/* Gold + Silver + NEPSE + Weather row */}
        <div className="flex flex-col sm:flex-row gap-2">
          {/* Gold */}
          <div className="flex-1 rounded-xl shadow-inner p-4 text-center sm:text-left transition hover:scale-105 bg-yellow-100 dark:bg-yellow-900">
            <h3 className="text-lg font-bold text-yellow-700 dark:text-yellow-400">Gold</h3>
            <p className="text-sm text-yellow-800 dark:text-yellow-300 mt-2">Tola: NPR {gold.tola}</p>
            <p className="text-sm text-yellow-900 dark:text-yellow-200 mt-2">10g: NPR {gold.tenGram}</p>
          </div>

          {/* Silver */}
          <div className="flex-1 rounded-xl shadow-inner p-4 text-center sm:text-left transition hover:scale-105 bg-gray-100 dark:bg-gray-700">
            <h3 className="text-lg font-bold text-gray-700 dark:text-gray-200">Silver</h3>
            <p className="text-sm text-gray-800 dark:text-gray-300 mt-2">Tola: NPR {silver.tola}</p>
            <p className="text-sm text-gray-900 dark:text-gray-200 mt-2">10g: NPR {silver.tenGram}</p>
          </div>

          {/* NEPSE */}
          <div className="flex-1 rounded-xl shadow-inner p-4 text-center transition hover:scale-105 bg-green-100 dark:bg-green-900">
            <h3 className="text-lg font-bold text-green-700 dark:text-green-400">NEPSE Index</h3>
            <p className="text-xl font-semibold text-green-800 dark:text-green-200 mt-4">{nepse}</p>
          </div>

          {/* Weather */}
          <div className="flex-1 rounded-xl shadow-inner p-4 text-center transition hover:scale-105 bg-blue-200 dark:bg-blue-500">
            <h3 className="text-md font-semibold mb-2">{weather.place}</h3>
            <img src={weather.icon} alt={weather.condition} className="mx-auto w-12 h-12" />
            <p className="text-lg font-bold">{weather.temp}°C</p>
            <p className="text-sm">{weather.condition}</p>
          </div>
        </div>
      </div>

      {/* Error message */}
      {error && (
        <div className="mt-3 text-center text-red-500 text-sm font-medium">
          Some data could not be loaded. Please try again later.
        </div>
      )}
    </div>
  );
}
