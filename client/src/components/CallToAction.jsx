import { useState, useEffect } from "react";

export default function CallToAction() {
  const [gold, setGold] = useState({ tola: "-", tenGram: "-" });
  const [silver, setSilver] = useState({ tola: "-", tenGram: "-" });
  const [nepse, setNepse] = useState("-");
  const [error, setError] = useState(false);

  const fetchData = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/market/all");
      const data = await res.json();
      if (!res.ok) throw new Error("Market fetch failed");

      setGold(data.gold || { tola: "-", tenGram: "-" });
      setSilver(data.silver || { tola: "-", tenGram: "-" });
      setNepse(data.nepseIndex || "-");
      setError(false);
    } catch (err) {
      console.error("Data fetch error:", err);
      setError(true);
    }
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative rounded-3xl shadow-xl p-5 max-w-5xl mx-auto border border-gray-200 dark:border-gray-700 transition-colors
      bg-white dark:bg-[rgb(16,23,42)]">

      {/* Logo */}
      <div className="flex justify-center mb-2">
        <img
          src="https://i.postimg.cc/nhSf20p3/Chat-GPT-Image-Sep-2-2025-06-17-10-PM.png"
          alt="Trinetra Post Logo"
          className="h-20 w-auto object-contain"
        />
      </div>

      {/* Horizontal line */}
      <hr className="border-gray-300 dark:border-gray-600 mb-4" />

      {/* LIVE badge */}
      <div className="absolute top-3 left-3 animate-pulse">
        <span className="bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow">
          LIVE
        </span>
      </div>

      {/* Content */}
      <div className="flex flex-col gap-4">
        {/* Top row for large screens: Gold + Silver */}
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Gold */}
          <div className="flex-1 rounded-xl shadow-inner p-4 text-center sm:text-left transition hover:scale-105
            bg-yellow-50 dark:bg-yellow-900">
            <h3 className="text-lg font-bold text-yellow-700 dark:text-yellow-400">Gold</h3>
            <p className="text-sm text-yellow-800 dark:text-yellow-300">Tola: NPR {gold.tola}</p>
            <p className="text-sm text-yellow-900 dark:text-yellow-200">10g: NPR {gold.tenGram}</p>
          </div>

          {/* Silver */}
          <div className="flex-1 rounded-xl shadow-inner p-4 text-center sm:text-left transition hover:scale-105
            bg-gray-100 dark:bg-gray-700">
            <h3 className="text-lg font-bold text-gray-700 dark:text-gray-200">Silver</h3>
            <p className="text-sm text-gray-800 dark:text-gray-300">Tola: NPR {silver.tola}</p>
            <p className="text-sm text-gray-900 dark:text-gray-200">10g: NPR {silver.tenGram}</p>
          </div>
        </div>

        {/* NEPSE below Gold & Silver on large screens, centered */}
        <div className="flex justify-center">
          <div className="rounded-xl shadow-inner p-4 w-full sm:w-1/3 text-center transition hover:scale-105
            bg-green-50 dark:bg-green-900">
            <h3 className="text-lg font-bold text-green-700 dark:text-green-400">NEPSE Index</h3>
            <p className="text-xl font-semibold text-green-800 dark:text-green-200">{nepse}</p>
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
