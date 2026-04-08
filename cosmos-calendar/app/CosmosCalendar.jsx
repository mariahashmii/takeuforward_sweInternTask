"use client";
import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
const holidays={
  "Jan 26": "Republic Day","Aug 15": "Independence Day","Oct 2": "Gandhi Jayanti","Jan 1": "New Year","May 1": "Labour Day","Dec 25": "Christmas",
};
const getDaysInMonth=(y, m)=>new Date(y, m + 1, 0).getDate();
const getFirstDay=(y, m)=>new Date(y, m, 1).getDay();
const monthNames=[
  "Jan","Feb","Mar","Apr","May","Jun",
  "Jul","Aug","Sep","Oct","Nov","Dec"
];
const weekDays=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
export default function CosmosCalendar() {
  const today=new Date();
const [holidayPopup, setHolidayPopup]=useState(null);
  const [month, setMonth]=useState(today.getMonth());
  const [year, setYear]=useState(today.getFullYear());
  const [showYearView, setShowYearView]=useState(false);
  const [range, setRange]=useState({ start: null, end: null });
  const [notes, setNotes]=useState({});
  const [energyMap, setEnergyMap] = useState({});
  const [selectedDate, setSelectedDate]=useState(null);
  const [input, setInput]=useState("");
  const [stars, setStars]=useState([]);
  const refs=useRef({});
  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = getFirstDay(year, month);
  const days=Array.from({ length: daysInMonth }, (_, i)=>
    new Date(year, month, i + 1)
  );
  const blankDays=Array.from({ length: firstDay });
  const isInRange=(d)=>
    range.start && range.end && d >= range.start && d <= range.end;
  useEffect(() => {
    const generated = [...Array(60)].map(() => ({
      top: Math.random() * 100,left: Math.random() * 100,size: Math.random() * 2 + 1,opacity: Math.random(),
}));
    setStars(generated);
  }, [month]);
  const getHolidayDetails = (name) => {
  switch (name) {
    case "Republic Day":
      return {
        desc: "Celebrates the adoption of the Constitution of India on January 26, 1950, marking India's transition into a sovereign democratic republic. The day is honored with a grand parade in New Delhi showcasing India's cultural diversity and military strength.",
        img: "https://images.unsplash.com/photo-1589307004394-6c6c2e3c7e3d"
      };
    case "Independence Day":
      return {
        desc: "Marks India's independence from British rule on August 15, 1947. The Prime Minister hoists the national flag at the Red Fort, followed by celebrations across the country honoring freedom and national pride.",
        img: "https://images.unsplash.com/photo-1560787313-5dff3307e257"
      };
    case "Gandhi Jayanti":
      return {
        desc: "Commemorates the birth anniversary of Mahatma Gandhi, the leader of India's non-violent independence movement. Observed with tributes, prayers, and initiatives promoting peace and truth.",
        img: "https://images.unsplash.com/photo-1609948543916-4a3c8c5cfc34"
      };
    case "Christmas":
      return {
        desc: "A global festival celebrating the birth of Jesus Christ. In India, it is marked with church services, decorations, and festive gatherings reflecting joy, generosity, and togetherness.",
        img: "https://images.unsplash.com/photo-1543589077-47d81606c1bf"
      };
    case "New Year":
      return {
        desc: "Marks the beginning of the new calendar year. Celebrated worldwide with resolutions, gatherings, and festivities symbolizing fresh starts and new possibilities.",
        img: "https://images.unsplash.com/photo-1519681393784-d120267933ba"
      };
    case "Labour Day":
      return {
        desc: "Observed on May 1st to honor the contributions of workers and the labor movement. It highlights workers' rights, dignity, and the importance of fair working conditions.",
        img: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d"
      };
    default:
      return {
        desc: "Important national holiday.",
        img: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564"
      };
  }
};
const handleSelect = (date) => {
  const holidayKey = `${monthNames[month]} ${date.getDate()}`;
  const holidayName = holidays[holidayKey];

  // ✅ Holiday popup (unchanged)
  if (holidayName) {
    const details = getHolidayDetails(holidayName);
    setHolidayPopup({
      name: holidayName,
      desc: details.desc,
      img: details.img,
    });
  }

  // ✅ RANGE SELECTOR (THIS WAS MISSING)
  if (!range.start || range.end) {
    setRange({ start: date, end: null });
  } else {
    setRange({
      start: range.start < date ? range.start : date,
      end: range.start < date ? date : range.start,
    });
  }

  // ✅ Selected date (for notes)
  setSelectedDate(date);

  const key = date.toDateString();

  // ✅ Load existing note
  setInput(notes[key] || "");

  // ✅ Energy map (unchanged)
  if (!energyMap[key]) {
    setEnergyMap((prev) => ({
      ...prev,
      [key]: Math.floor(Math.random() * 5) + 1,
    }));
  }
};
  const saveNote = () => {
    if (!selectedDate) return;
    const key = selectedDate.toDateString();
    setNotes((prev) => ({
      ...prev,
      [key]: input,
    }));
  };
  const [paths, setPaths] = useState([]);
  useEffect(() => {
    if (!range.start || !range.end) return;

    const pts = days
      .filter((d) => isInRange(d))
      .map((d) => {
        const rect =
          refs.current[d.toDateString()]?.getBoundingClientRect();
        return rect
          ? {
              x: rect.left + rect.width / 2,
              y: rect.top + rect.height / 2,
            }
          : null;
      })
      .filter(Boolean);
    const newPaths = [];
    for (let i = 0; i < pts.length - 1; i++) {
      const p1 = pts[i];
      const p2 = pts[i + 1];
      newPaths.push(`M ${p1.x} ${p1.y} L ${p2.x} ${p2.y}`);
    }
    setPaths(newPaths);
  }, [range, month, year]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <div className="w-[360px] h-[720px] bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 overflow-hidden relative text-white">
        <div className="absolute inset-0 pointer-events-none">
          {stars.map((s, i) => (
            <div
              key={i}
              className="absolute bg-white rounded-full"
              style={{
                top: s.top + "%",left: s.left + "%",width: `${s.size}px`,height: `${s.size}px`,opacity: s.opacity,
              }}
            />
          ))}
        </div>
        <div className="relative h-1/2 overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1462331940025-496dfbfc7564"
            className="absolute inset-0 w-full h-full object-cover opacity-60"
          />
          <div className="absolute top-4 left-4 right-4 flex justify-between items-center text-sm">
            <button onClick={() => setYear((y) => y - 1)}>◀</button>
            <div
              onClick={() => setShowYearView(true)}
              className="cursor-pointer"
            >
              {monthNames[month]} {year}
            </div>
            <button onClick={() => setYear((y) => y + 1)}>▶</button>
          </div>
          <div className="absolute bottom-4 left-4 right-4 flex justify-between">
            <button onClick={() => setMonth((m) => (m - 1 + 12) % 12)}>
              ◀ Prev
            </button>
            <button onClick={() => setMonth((m) => (m + 1) % 12)}>
              Next ▶
            </button>
          </div>
        </div>
        {showYearView && (
          <div className="absolute inset-0 bg-black/90 z-50 p-4">
            <div className="grid grid-cols-3 gap-3">
              {monthNames.map((m, i) => (
                <div
                  key={i}
                  onClick={() => {
                    setMonth(i);
                    setShowYearView(false);
                  }}
                  className="p-4 bg-white/10 rounded-xl text-center cursor-pointer hover:bg-white/20"
                >
                  {m}
                </div>
              ))}
            </div>
          </div>
        )}
        <div className="h-1/2 p-4 bg-black/40 relative overflow-y-auto">
          <svg className="absolute inset-0 pointer-events-none">
            {paths.map((d, i) => (
              <motion.path
                key={i}
                d={d}
                stroke="rgba(255,120,200,0.6)"
                strokeWidth="1.2"
                fill="none"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
              />
            ))}
          </svg>
          <div className="grid grid-cols-7 text-xs opacity-60 mb-2 text-center">
            {weekDays.map((d) => (
              <div key={d}>{d}</div>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-2">
            {blankDays.map((_, i) => (
              <div key={"b" + i} />
            ))}
            {days.map((date, i) => {
  const key = date.toDateString();
  const energy = energyMap[key] || 1;
  const isStart =
    range.start && key === range.start.toDateString();
  const isEnd =
    range.end && key === range.end.toDateString();
  const holidayKey = `${monthNames[month]} ${date.getDate()}`;
  const holidayName = holidays[holidayKey];
  return (
    <motion.div
      key={i}
      ref={(el) => (refs.current[key] = el)}
      whileHover={{ scale: 1.2 }}
      onClick={() => handleSelect(date)}
      className={`relative w-full aspect-square max-w-[44px] flex flex-col items-center justify-start pt-1 rounded-xl cursor-pointer overflow-hidden
      ${isStart || isEnd ? "bg-pink-500" : "bg-white/5"}
      ${holidayName ? "border border-red-400/40" : ""}`}
      style={{
        boxShadow: `0 0 ${energy * 6}px rgba(255,120,200,0.5)`,
      }}
    >
      {isInRange(date) && (
        <div className="absolute inset-0 rounded-xl bg-pink-500/20 z-0" />
      )}
      <span className="text-xs relative z-10">
        {date.getDate()}
      </span>
      {notes[key] && (
        <div className="absolute top-1 right-1 w-2 h-2 bg-yellow-400 rounded-full z-10" />
      )}
      {holidayName && (
        <span className="text-[8px] text-red-400 mt-[2px] truncate max-w-[90%] text-center leading-tight">
          {holidayName}
        </span>
      )}
    </motion.div>
  );
})}
          </div>
          <div className="mt-4">
            <div className="text-xs opacity-60 mb-1">
              {selectedDate
                ? selectedDate.toDateString()
                : "Select a date"}
            </div>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Add note..."
              className="w-full bg-white/5 p-2 rounded text-sm"
            />
            <button
              onClick={saveNote}
              className="mt-2 px-3 py-1 bg-pink-500 text-black text-xs"
            >
              Save
            </button>
          </div>
        </div>
        {holidayPopup && (
        <div
          className="absolute inset-0 bg-black/80 flex items-center justify-center z-50"
          onClick={() => setHolidayPopup(null)}
        >
          <div className="bg-white/10 backdrop-blur-xl p-4 rounded-xl max-w-xs w-full">
            <img
              src={holidayPopup.img}
              className="w-full h-32 object-cover rounded mb-2"
            />
            <h2 className="text-lg font-semibold">{holidayPopup.name}</h2>
            <p className="text-sm opacity-80">{holidayPopup.desc}</p>
          </div>
        </div>
      )}
      </div>
    </div>
  );
}