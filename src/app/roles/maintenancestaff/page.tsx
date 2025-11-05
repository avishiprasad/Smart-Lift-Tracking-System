"use client";
import React, { useEffect, useState } from "react";
import { StickyScroll } from "@/components/ui/sticky-scroll-reveal";

interface Lift {
  _id: string;
  title: string;
  description: string;
  maintenance_logs?: string;
  maintenance_date?: string;
}

// Match colors with StickyScroll gradients (optional, can customize)
const panelColors = [
  "bg-gradient-to-br from-cyan-500 to-emerald-500",
  "bg-gradient-to-br from-pink-500 to-indigo-500",
  "bg-gradient-to-br from-orange-500 to-yellow-500",
];

export default function LiftMaintenanceLogs() {
  const [lifts, setLifts] = useState<Lift[]>([]);
  const [selectedLift, setSelectedLift] = useState<Lift | null>(null);
  const [activeCard, setActiveCard] = useState(0);

  // Fetch lifts from MongoDB
  useEffect(() => {
    const fetchLifts = async () => {
      const res = await fetch("/api/lift");
      const data = await res.json();
      setLifts(data);
      setSelectedLift(data[0]);
    };
    fetchLifts();
  }, []);

  const handleEditLog = async (newDescription: string) => {
    if (!selectedLift) return;
    setSelectedLift({ ...selectedLift, maintenance_logs: newDescription });
    setLifts((prev) =>
      prev.map((l) =>
        l._id === selectedLift._id
          ? { ...l, maintenance_logs: newDescription }
          : l
      )
    );

    await fetch("/api/lift", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: selectedLift._id,
        updates: { maintenance_logs: newDescription },
      }),
    });
  };

  const handleSchedule = async (date: string) => {
    if (!selectedLift) return;
    setSelectedLift({ ...selectedLift, maintenance_date: date });
    setLifts((prev) =>
      prev.map((l) =>
        l._id === selectedLift._id ? { ...l, maintenance_date: date } : l
      )
    );

    await fetch("/api/lift", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: selectedLift._id,
        updates: { maintenance_date: date },
      }),
    });
  };

  // ✅ FIXED: use lifts, not logs
  const stickyContent = lifts.map((lift) => ({
    title: lift.title,
    description: lift.description,
    // content: (
    //   <div>
    //     <h3 className="text-xl font-bold mb-2">{lift.title}</h3>
    //     <p>{lift.maintenance_logs || lift.description}</p>
    //     {lift.maintenance_date && (
    //       <p className="text-sm text-gray-400 mt-2">
    //         Scheduled on: {lift.maintenance_date}
    //       </p>
    //     )}
    //   </div>
    // ),
    content: (
      <div className="flex flex-col items-center justify-center text-center h-full">
        <h3 className="text-2xl font-bold mb-2">{lift.title}</h3>
        <p className="text-lg text-gray-100 max-w-md">{lift.description}</p>
        {lift.maintenance_date && (
          <p className="text-sm text-gray-300 mt-4 italic">
            Scheduled on: {lift.maintenance_date}
          </p>
        )}
      </div>
    ),    
  }));

  return (
    <div className="flex min-h-screen bg-gray-900">
      {/* Left Panel */}
      <div
        className={`w-1/3 p-6 flex flex-col space-y-4 text-white border-r border-gray-700 transition-colors duration-500 ${
          panelColors[activeCard % panelColors.length]
        }`}
      >
        <h2 className="text-3xl font-bold">Maintenance Panel</h2>

        <label className="text-xl font-semibold">Select Lift:</label>
        <select
          className="p-2 rounded text-black"
          value={selectedLift?._id || ""}
          onChange={(e) =>
            setSelectedLift(lifts.find((l) => l._id === e.target.value) || null)
          }
        >
          {lifts.map((lift) => (
            <option key={lift._id} value={lift._id}>
              {lift.title}
            </option>
          ))}
        </select>

        <label className="text-xl font-semibold">Edit Log Description:</label>
        <textarea
          className="p-2 rounded text-black h-40"
          value={selectedLift?.maintenance_logs || ""}
          onChange={(e) => handleEditLog(e.target.value)}
        />

        <label className="text-xl font-semibold">Schedule Maintenance:</label>
        <input
          type="date"
          className="p-2 rounded text-black"
          value={selectedLift?.maintenance_date || ""}
          onChange={(e) => handleSchedule(e.target.value)}
        />

        {selectedLift?.maintenance_date && (
          <p className="mt-2 text-sm">
            Scheduled for:{" "}
            <span className="font-semibold">
              {selectedLift.maintenance_date}
            </span>
          </p>
        )}
      </div>

      {/* Right Panel - Sticky Scroll */}
      <div className="w-2/3 flex justify-center items-center p-6">
        <div className="w-full max-w-7xl">
          {stickyContent.length > 0 ? (
            <StickyScroll
              content={stickyContent}
              onActiveCardChange={(index) => setActiveCard(index)}
            />
          ) : (
            <p className="text-white text-center">
              Loading lift maintenance logs...
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
