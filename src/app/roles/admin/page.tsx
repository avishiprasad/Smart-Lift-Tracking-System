'use client';
import React, { useState } from "react";
import liftDataJson from "../../../data/liftinfo.json";
import { BackgroundGradient } from "@/components/ui/background-gradient";

interface Lift {
  id: number;
  title: string;
  description: string;
  start_floor: number;
  end_floor: number;
  direction: string;
  occupancy: string;
  under_maintenance: boolean;
  emergency: boolean;
}

export default function AdminLiftPage() {
  const [lifts, setLifts] = useState<Lift[]>(liftDataJson.lifts);
  const [showModal, setShowModal] = useState(false);
  const [newLift, setNewLift] = useState<Omit<Lift, "id">>({
    title: "",
    description: "",
    start_floor: 1,
    end_floor: 1,
    direction: "up",
    occupancy: "empty",
    under_maintenance: false,
    emergency: false
  });

  // Handle lift edits
  const handleChange = (id: number, field: keyof Lift, value: any) => {
    setLifts(lifts.map(l => l.id === id ? { ...l, [field]: value } : l));
  };

  // Handle adding a new lift
  const handleAddLift = () => {
    const nextId = Math.max(...lifts.map(l => l.id)) + 1;
    setLifts([...lifts, { id: nextId, ...newLift }]);
    setShowModal(false);
    // Reset form
    setNewLift({ title: "", description: "", start_floor: 1, end_floor: 1, direction: "up", occupancy: "empty", under_maintenance: false, emergency: false });
  };

  return (
    <div className="py-12 bg-gray-900 min-h-screen">
      <div className="text-center">
        <h2 className="text-base text-teal-600 font-semibold tracking-wide uppercase">ADMIN PANEL</h2>
        <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-white sm:text-4xl">Manage Lifts</p>
      </div>

      <div className="mt-10 mx-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-center">
        {lifts.map((lift) => (
          <BackgroundGradient key={lift.id} className="flex flex-col rounded-[22px] bg-white dark:bg-zinc-900 overflow-hidden  max-w-sm p-4 justify-between">
            <div className="flex flex-col space-y-2">
              <p className="text-2xl text-white dark:text-white font-bold">{lift.title}</p>
              <p className="text-base text-neutral-600 dark:text-neutral-400">{lift.description}</p>
              
              {/* Editable fields */}
              <div>
                <label className="text-white">Start Floor:</label>
                <input type="number" value={lift.start_floor} onChange={(e) => handleChange(lift.id, "start_floor", parseInt(e.target.value))} className="ml-2 p-1 rounded border border-white text-white"/>
              </div>
              <div>
                <label className="text-white">End Floor:</label>
                <input type="number" value={lift.end_floor} onChange={(e) => handleChange(lift.id, "end_floor", parseInt(e.target.value))} className="ml-2 p-1 rounded border border-white text-white"/>
              </div>
              <div>
                <label className="text-white">Emergency:</label>
                <input type="checkbox" checked={lift.emergency} onChange={(e) => handleChange(lift.id, "emergency", e.target.checked)} className="ml-2"/>
              </div>
              <div>
                <label className="text-white">Under Maintenance:</label>
                <input type="checkbox" checked={lift.under_maintenance} onChange={(e) => handleChange(lift.id, "under_maintenance", e.target.checked)} className="ml-2"/>
              </div>
            </div>
          </BackgroundGradient>
        ))}
      </div>

      {/* Add New Lift Button */}
      <div className="mt-10 text-center">
        <button onClick={() => setShowModal(true)} className="px-4 py-2 rounded bg-teal-600 hover:bg-teal-700 text-white">
          Add New Lift
        </button>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-zinc-900 p-6 rounded-lg w-96 space-y-4">
            <h2 className="text-xl font-bold text-white dark:text-white">Add New Lift</h2>
            
            <input type="text" placeholder="Title" value={newLift.title} onChange={(e) => setNewLift({...newLift, title: e.target.value})} className="w-full p-2 border border-black text-white rounded"/>
            <input type="text" placeholder="Description" value={newLift.description} onChange={(e) => setNewLift({...newLift, description: e.target.value})} className="w-full p-2 border border-black text-white rounded"/>
            <input type="number" placeholder="Start Floor" value={newLift.start_floor} onChange={(e) => setNewLift({...newLift, start_floor: parseInt(e.target.value)})} className="w-full p-2 border border-black text-white rounded"/>
            <input type="number" placeholder="End Floor" value={newLift.end_floor} onChange={(e) => setNewLift({...newLift, end_floor: parseInt(e.target.value)})} className="w-full p-2 border border-black text-white rounded"/>
            <select value={newLift.direction} onChange={(e) => setNewLift({...newLift, direction: e.target.value})} className="w-full p-2 border border-black rounded">
              <option value="up">Up</option>
              <option value="down">Down</option>
            </select>
            <select value={newLift.occupancy} onChange={(e) => setNewLift({...newLift, occupancy: e.target.value})} className="w-full p-2 border border-black rounded">
              <option value="empty">Empty</option>
              <option value="half empty">Half Empty</option>
              <option value="full">Full</option>
            </select>
            <div className="flex space-x-2">
              <label className="text-white dark:text-white">
                Maintenance: 
                <input type="checkbox" checked={newLift.under_maintenance} onChange={(e) => setNewLift({...newLift, under_maintenance: e.target.checked})} className="ml-2"/>
              </label>
              <label className="text-white dark:text-white">
                Emergency: 
                <input type="checkbox" checked={newLift.emergency} onChange={(e) => setNewLift({...newLift, emergency: e.target.checked})} className="ml-2"/>
              </label>
            </div>

            <div className="flex justify-end space-x-2 mt-4">
              <button onClick={() => setShowModal(false)} className="px-4 py-2 rounded bg-gray-500 hover:bg-gray-600 text-white">Cancel</button>
              <button onClick={handleAddLift} className="px-4 py-2 rounded bg-teal-600 hover:bg-teal-700 text-white">Add Lift</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
