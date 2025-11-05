"use client";
import React from "react";
// import liftData from "../../../data/liftinfo.json";
import Link from "next/link";
import { BackgroundGradient } from "@/components/ui/background-gradient";
import { useEffect, useState } from "react";

interface Lift {
  id: number;
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

const Page = () => {
  const [lifts, setLifts] = useState([]);

  useEffect(() => {
    const fetchLifts = async () => {
      const res = await fetch("/api/lift");
      const data = await res.json();
      setLifts(data);
    };
    fetchLifts();

    // Poll every 3s to see updated floors
    const interval = setInterval(fetchLifts, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="py-12 bg-gray-900">
      <div className="text-center">
        <h2 className="text-base text-teal-600 font-semibold tracking-wide uppercase">
          WELCOME USER
        </h2>
        <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-white sm:text-4xl">
          Lifts in the Building
        </p>
      </div>

      <div className="mt-10 mx-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-center">
          {lifts.map((lift: Lift) => (
            <div key={lift.id} className="flex justify-center">
              <BackgroundGradient
              className={`flex flex-col rounded-[22px] bg-white dark:bg-zinc-900 overflow-hidden h-[280px] w-[300px] ${
                lift.emergency ? "border-2 border-red-600" : ""
              } ${lift.under_maintenance ? "border-2 border-yellow-500" : ""}`}
            >
              <div className="p-4 sm:p-6 flex flex-col items-center text-center flex-grow">
                {/* Floor + Direction Box */}
                <div
                  className={`flex flex-col items-center justify-center text-2xl font-bold rounded-lg w-16 h-16 mb-3 ${
                    lift.emergency
                      ? "bg-red-700 text-white"
                      : lift.under_maintenance
                      ? "bg-yellow-500 text-black"
                      : "bg-gray-800 text-white"
                  }`}
                >
                  {lift.current_floor}
                  {!lift.emergency && !lift.under_maintenance && (
                    <span className="text-teal-400 text-sm">
                      {lift.direction === "up" ? "↑" : "↓"}
                    </span>
                  )}
                </div>

                <p className="text-2xl sm:text-3xl text-white mt-2 mb-2 font-semibold">
                  {lift.title}
                </p>
                <p className="text-sm text-gray-400 flex-grow">{lift.description}</p>

                <p className="text-sm mt-2">
                  <span className="text-white font-medium">Floors: </span>
                  <span className="text-neutral-400">
                    {lift.start_floor} - {lift.end_floor}
                  </span>
                </p>
                <p className="text-sm text-neutral-400">
                  Occupancy: {lift.occupancy}
                </p>

                {/* Status Messages */}
                {lift.under_maintenance && (
                  <p className="text-yellow-400 font-bold mt-3">
                    ⚙️ Under Maintenance
                  </p>
                )}
                {lift.emergency && (
                  <p className="text-red-500 font-bold mt-3 animate-pulse">
                    🚨 Emergency Alert!
                  </p>
                )}
              </div>
            </BackgroundGradient>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Page;
