import fetch from "node-fetch";
import { JSDOM } from "jsdom";

// ✅ Gold, Silver & NEPSE scraping for Nepal rates
export const getMarketData = async (req, res) => {
    try {
        // ----- Gold & Silver -----
        const goldResponse = await fetch("https://www.ashesh.com.np/gold/", {
            headers: { "User-Agent": "Mozilla/5.0" },
        });

        if (!goldResponse.ok) throw new Error("Failed to fetch Ashesh Gold page");

        const goldHtml = await goldResponse.text();
        const goldDom = new JSDOM(goldHtml);
        const goldDoc = goldDom.window.document;

        const countries = Array.from(goldDoc.querySelectorAll(".country"));

        let gold = { tola: "-", tenGram: "-" };
        let silver = { tola: "-", tenGram: "-" };

        countries.forEach((c) => {
            const nameEl = c.querySelector(".name");
            const unitEl = c.querySelector(".unit");
            const rateEl = c.querySelector(".rate_buying");

            if (!nameEl || !unitEl || !rateEl) return;

            const name = nameEl.textContent.trim();
            const unit = unitEl.textContent.trim();
            const rate = rateEl.textContent.replace("Rs", "").trim();

            // Gold
            if (name.includes("Gold Hallmark") || name.includes("Gold Tajabi")) {
                if (unit.toLowerCase().includes("tola")) gold.tola = rate;
                else if (unit.toLowerCase().includes("10 gram")) gold.tenGram = rate;
            }

            // Silver
            if (name.includes("Silver")) {
                if (unit.toLowerCase().includes("tola")) silver.tola = rate;
                else if (unit.toLowerCase().includes("10 gram")) silver.tenGram = rate;
            }
        });

        // ----- NEPSE -----
        // Using a simple public JSON endpoint
        let nepseIndex = "-";
        try {
            const nepseResponse = await fetch("https://nepalstock.onrender.com/nepse-index");
            if (nepseResponse.ok) {
                const nepseData = await nepseResponse.json();
                nepseIndex = nepseData.index || "-";
            }
        } catch (e) {
            console.error("NEPSE fetch error:", e.message);
        }

        res.json({ gold, silver, nepseIndex });
    } catch (err) {
        console.error("Market data error:", err.message);
        res.status(500).json({ error: "Failed to fetch market data" });
    }
};
