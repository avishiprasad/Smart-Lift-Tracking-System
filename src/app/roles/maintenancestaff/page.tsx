"use client";
import React, { useState } from "react";
import { StickyScroll } from "@/components/ui/sticky-scroll-reveal";

interface LiftLog {
  id: number;
  title: string;
  description: string;
  maintenanceDate?: string; // optional future maintenance date
}

const initialLogs: LiftLog[] = [
  {
    id: 1,
    title: "Lift 1 - Maintenance Log",
    description:
      "Checked motor functionality and replaced worn-out cables. Lift operating normally. No emergency events reported.",
  },
  {
    id: 2,
    title: "Lift 2 - Maintenance Log",
    description:
      "Routine inspection completed. Emergency alarm system tested successfully. No issues found with the doors or sensors.",
  },
  {
    id: 3,
    title: "Lift 3 - Maintenance Log",
    description:
      "Emergency stop button was triggered during testing; corrected minor wiring issue. Lift is safe for operation now.",
  },
  {
    id: 4,
    title: "Lift 4 - Maintenance Log",
    description:
      "Hydraulic system inspected. Lubrication applied to all moving parts. Under maintenance flag cleared after successful tests.",
  },
  {
    id: 5,
    title: "Lift 5 - Maintenance Log",
    description:
      "Minor door alignment issue fixed. Operational tests completed with full load. Emergency system functioning properly.",
  },
  {
    id: 6,
    title: "Lift 6 - Maintenance Log",
    description:
      "Control panel firmware updated. Occupancy sensor recalibrated. No emergency events reported since last inspection.",
  },
  {
    id: 7,
    title: "Lift 7 - Maintenance Log",
    description:
      "Emergency stop button tested successfully. Bearings lubricated, and floor level calibration verified. Ready for normal operation.",
  },
];

// Match colors with StickyScroll gradients (optional, can customize)
const panelColors = [
  "bg-gradient-to-br from-cyan-500 to-emerald-500",
  "bg-gradient-to-br from-pink-500 to-indigo-500",
  "bg-gradient-to-br from-orange-500 to-yellow-500",
];

export default function LiftMaintenanceLogs() {
  const [logs, setLogs] = useState<LiftLog[]>(initialLogs);
  const [selectedLog, setSelectedLog] = useState<LiftLog | null>(logs[0]);
  const [activeCard, setActiveCard] = useState(0); // active card index

  const handleEditLog = (newDescription: string) => {
    if (!selectedLog) return;
    const updated = logs.map((log) =>
      log.id === selectedLog.id ? { ...log, description: newDescription } : log
    );
    setLogs(updated);
    setSelectedLog({ ...selectedLog, description: newDescription });
  };

  const handleSchedule = (date: string) => {
    if (!selectedLog) return;
    const updated = logs.map((log) =>
      log.id === selectedLog.id ? { ...log, maintenanceDate: date } : log
    );
    setLogs(updated);
    setSelectedLog({ ...selectedLog, maintenanceDate: date });
  };

  const stickyContent = logs.map((log) => ({
    title: log.title,
    description: log.description,
  }));

  return (
    <div className="flex min-h-screen bg-gray-900">
      {/* Left Panel: Edit & Schedule */}
      <div
        className={`w-1/3 p-6 flex flex-col space-y-4 text-white border-r border-gray-700 transition-colors duration-500 ${
          panelColors[activeCard % panelColors.length]
        }`}
      >
        <h2 className="text-3xl font-bold">Edit Lift Log</h2>

        <label className="text-2xl font-semibold">Select Lift:</label>
        <select
          className="p-2 rounded text-black"
          value={selectedLog?.id}
          onChange={(e) =>
            setSelectedLog(
              logs.find((log) => log.id === Number(e.target.value)) || null
            )
          }
        >
          {logs.map((log) => (
            <option key={log.id} value={log.id}>
              {log.title}
            </option>
          ))}
        </select>

        <label className="text-2xl font-semibold">Edit Description:</label>
        <textarea
          className="p-2 rounded text-black h-40"
          value={selectedLog?.description || ""}
          onChange={(e) => handleEditLog(e.target.value)}
        />

        <label className="text-2xl font-semibold">Schedule Maintenance:</label>
        <input
          type="date"
          className="p-2 rounded text-black"
          value={selectedLog?.maintenanceDate || ""}
          onChange={(e) => handleSchedule(e.target.value)}
        />

        {selectedLog?.maintenanceDate && (
          <p>Scheduled Date: {selectedLog.maintenanceDate}</p>
        )}
      </div>

      {/* Right Panel: StickyScroll */}
      <div className="w-2/3 flex justify-center items-center p-6">
        <div className="w-full max-w-7xl">
          <StickyScroll
            content={stickyContent}
            onActiveCardChange={(index) => setActiveCard(index)}
          />
        </div>
      </div>
    </div>
  );
}
