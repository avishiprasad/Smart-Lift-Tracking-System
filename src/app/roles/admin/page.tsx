"use client";
import React, { useState, useEffect } from "react";
import { BackgroundGradient } from "@/components/ui/background-gradient";

interface Lift {
  _id: string;
  title: string;
  description: string;
  start_floor: number;
  end_floor: number;
  current_floor: number;
  direction: string;
  occupancy: string;
  under_maintenance: boolean;
  emergency: boolean;
}

export default function AdminLiftPage() {
  const [lifts, setLifts] = useState<Lift[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [newLift, setNewLift] = useState<Omit<Lift, "_id" | "current_floor">>({
    title: "",
    description: "",
    start_floor: 1,
    end_floor: 1,
    direction: "up",
    occupancy: "empty",
    under_maintenance: false,
    emergency: false,
  });

  // Fetch lifts from MongoDB
  useEffect(() => {
    const fetchLifts = async () => {
      const res = await fetch("/api/lift");
      const data = await res.json();
      setLifts(data);
    };
    fetchLifts();
  }, []);

  // Add new lift
  const handleAddLift = async () => {
    try {
      const res = await fetch("/api/lift", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newLift),
      });

      const result = await res.json();

      if (!res.ok) {
        console.error("Add Lift Error:", result);
        alert("Failed to add lift: " + result.error);
        return;
      }

      setLifts((prev) => [...prev, result]);
      setShowModal(false);
      setNewLift({
        title: "",
        description: "",
        start_floor: 1,
        end_floor: 1,
        direction: "up",
        occupancy: "empty",
        under_maintenance: false,
        emergency: false,
      });
    } catch (error) {
      console.error("Error adding lift:", error);
      alert("Something went wrong while adding lift.");
    }
  };

  // Edit lift inline
  const handleChange = async (id: string, field: keyof Lift, value: any) => {
    const updated = lifts.map((l) =>
      l._id === id ? { ...l, [field]: value } : l
    );
    setLifts(updated);

    await fetch("/api/lift", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, updates: { [field]: value } }),
    });
  };

  return (
    <div className="py-12 bg-gray-900 min-h-screen">
      <div className="text-center">
        <h2 className="text-base text-teal-600 font-semibold tracking-wide uppercase">
          ADMIN PANEL
        </h2>
        <p className="mt-2 text-3xl font-extrabold text-white sm:text-4xl">
          Manage Lifts
        </p>
      </div>

      {/* Display lifts */}
      <div className="mt-10 mx-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-center">
        {lifts.map((lift) => (
          <BackgroundGradient
            key={lift._id}
            className="flex flex-col rounded-[22px] bg-white dark:bg-zinc-900 overflow-hidden max-w-sm p-4 justify-between"
          >
            <div className="flex flex-col space-y-2">
              <input
                type="text"
                value={lift.title}
                onChange={(e) => handleChange(lift._id, "title", e.target.value)}
                className="text-2xl text-white bg-transparent font-bold border-b border-gray-700"
              />
              <textarea
                value={lift.description}
                onChange={(e) =>
                  handleChange(lift._id, "description", e.target.value)
                }
                className="bg-transparent text-gray-300 text-sm border-b border-gray-700"
              />

              <div>
                <label className="text-white">Start Floor:</label>
                <input
                  type="number"
                  value={lift.start_floor}
                  onChange={(e) =>
                    handleChange(lift._id, "start_floor", Number(e.target.value))
                  }
                  className="ml-2 p-1 rounded border border-white text-white"
                />
              </div>
              <div>
                <label className="text-white">End Floor:</label>
                <input
                  type="number"
                  value={lift.end_floor}
                  onChange={(e) =>
                    handleChange(lift._id, "end_floor", Number(e.target.value))
                  }
                  className="ml-2 p-1 rounded border border-white text-white"
                />
              </div>

              <div>
                <label className="text-white">Emergency:</label>
                <input
                  type="checkbox"
                  checked={lift.emergency}
                  onChange={(e) =>
                    handleChange(lift._id, "emergency", e.target.checked)
                  }
                  className="ml-2"
                />
              </div>
              <div>
                <label className="text-white">Under Maintenance:</label>
                <input
                  type="checkbox"
                  checked={lift.under_maintenance}
                  onChange={(e) =>
                    handleChange(lift._id, "under_maintenance", e.target.checked)
                  }
                  className="ml-2"
                />
              </div>
            </div>
          </BackgroundGradient>
        ))}
      </div>

      {/* Add New Lift Button */}
      <div className="mt-10 text-center">
        <button
          onClick={() => setShowModal(true)}
          className="px-4 py-2 rounded bg-teal-600 hover:bg-teal-700 text-white"
        >
          Add New Lift
        </button>
      </div>

      {/* ✅ Add New Lift Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
          <div className="bg-zinc-900 p-6 rounded-lg w-96 shadow-lg border border-gray-700">
            <h2 className="text-xl font-bold text-white mb-4">Add New Lift</h2>

            <input
              type="text"
              placeholder="Title"
              value={newLift.title}
              onChange={(e) => setNewLift({ ...newLift, title: e.target.value })}
              className="w-full mb-2 p-2 bg-transparent text-white border border-gray-600 rounded"
            />
            <input
              type="text"
              placeholder="Description"
              value={newLift.description}
              onChange={(e) =>
                setNewLift({ ...newLift, description: e.target.value })
              }
              className="w-full mb-2 p-2 bg-transparent text-white border border-gray-600 rounded"
            />
            <input
              type="number"
              placeholder="Start Floor"
              value={newLift.start_floor}
              onChange={(e) =>
                setNewLift({
                  ...newLift,
                  start_floor: Number(e.target.value),
                })
              }
              className="w-full mb-2 p-2 bg-transparent text-white border border-gray-600 rounded"
            />
            <input
              type="number"
              placeholder="End Floor"
              value={newLift.end_floor}
              onChange={(e) =>
                setNewLift({
                  ...newLift,
                  end_floor: Number(e.target.value),
                })
              }
              className="w-full mb-2 p-2 bg-transparent text-white border border-gray-600 rounded"
            />

            <div className="flex justify-between mt-4">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-600 hover:bg-gray-700 rounded text-white"
              >
                Cancel
              </button>
              <button
                onClick={handleAddLift}
                className="px-4 py-2 bg-teal-600 hover:bg-teal-700 rounded text-white"
              >
                Add Lift
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
