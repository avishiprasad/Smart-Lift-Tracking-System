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
  direction: string;
  occupancy: string;
  under_maintenance: boolean;
  emergency: boolean;
}

const Page = () => {
  //const lifts = liftData.lifts; // Access lifts array from JSON
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
          List of Lifts in the Building
        </p>
      </div>

      <div className="mt-10 mx-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-center">
          {lifts.map((lift: Lift) => (
            <div key={lift.id} className="flex justify-center">
              <BackgroundGradient className="flex flex-col rounded-[22px] bg-white dark:bg-zinc-900 overflow-hidden h-[250px] w-[300px]">
                <div className="p-4 sm:p-6 flex flex-col items-center text-center flex-grow">
                  <div className="flex flex-col items-center justify-center bg-gray-800 text-white text-2xl font-bold rounded-lg w-16 h-16 mb-3">
                    {lift.current_floor}
                    <span className="text-teal-400 text-sm">
                      {lift.direction === "up" ? "↑" : "↓"}
                    </span>
                  </div>

                  <p className="text-2xl sm:text-3xl text-black mt-4 mb-2 dark:text-neutral-200">
                    {lift.title}
                  </p>
                  <p className="text-1xl text-neutral-600 dark:text-neutral-400 flex-grow">
                    {lift.description}
                  </p>
                  <p className="text-sm mt-2">
                    <span className="text-white font-medium">Floors: </span>
                    <span className="text-neutral-400">
                      {lift.start_floor} - {lift.end_floor}
                    </span>
                  </p>
                  <p className="text-sm">
                    <span className="text-white font-medium">Direction: </span>
                    <span className="text-neutral-400">{lift.direction}</span>
                  </p>
                  <p className="text-sm">
                    <span className="text-white font-medium">Occupancy: </span>
                    <span className="text-neutral-400">{lift.occupancy}</span>
                  </p>

                  {lift.under_maintenance && (
                    <p className="text-yellow-500 font-bold mt-2">
                      Under Maintenance
                    </p>
                  )}
                  {lift.emergency && (
                    <p className="text-red-500 font-bold mt-2">
                      Emergency Alert!
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
