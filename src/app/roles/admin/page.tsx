'use client';
import React from "react";
import liftData from "../../../data/liftinfo.json";
import Link from "next/link";
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

const Page = () => {
  const lifts = liftData.lifts; // Access lifts array from JSON

  return (
    <div className="py-12 bg-gray-900">
      <div className="text-center">
        <h2 className="text-base text-teal-600 font-semibold tracking-wide uppercase">
          WELCOME ADMIN
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
                  <p className="text-2xl sm:text-3xl text-black mt-4 mb-2 dark:text-neutral-200">
                    {lift.title}    
                  </p>
                  <p className="text-1xl text-neutral-600 dark:text-neutral-400 flex-grow">
                    {lift.description}
                  </p>
                  <p className="text-sm mt-2">
  <span className="text-white font-medium">Floors: </span>
  <span className="text-neutral-400">{lift.start_floor} - {lift.end_floor}</span>
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
                    <p className="text-yellow-500 font-bold mt-2">Under Maintenance</p>
                  )}
                  {lift.emergency && (
                    <p className="text-red-500 font-bold mt-2">Emergency Alert!</p>
                  )}
                </div>
              </BackgroundGradient>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-20 text-center">
        <Link
          href={"/admin/add-lift"}
          className="px-4 py-2 rounded border border-neutral-600 text-neutral-700 bg-white hover:bg-gray-100 transition duration-200"
        >
          Add New Lift
        </Link>
      </div>
    </div>
  );
};

export default Page;
