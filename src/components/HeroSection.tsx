"use client";
import React from "react";
import { motion } from "motion/react";
import { LampContainer } from "./ui/lamp";

import Link from "next/link";

function HeroSection() {
  return (
    //<div className="h-auto md:h-[40rem] w-full rounded-md flex flex-col items-center justify-center relative overflow-hidden mx-auto py-10 md:py-0">
      <LampContainer>
        <motion.h1
          initial={{ opacity: 0.5, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.3,
            duration: 1.5,
            ease: "easeInOut",
          }}
          //className="mt-8 bg-gradient-to-br from-slate-300 to-slate-500 py-4 bg-clip-text text-center text-4xl font-medium tracking-tight text-transparent md:text-7xl"
        >
          <div className="p-4 relative z-10 w-full text-center">
            <h1 className="mt-20 md:mt-0 text-4xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400">
              Smart Lift Tracking System
            </h1>
            <p className="mt-4 font-normal text-base md:text-lg text-neutral-300 max-w-lg mx-auto">
              In large buildings, elevator users face uncertainty about which
              lift is nearest, its direction, or availability, causing delays,
              inefficiency, and frustration. The Smart Lift Tracking System
              (SLTS) solves this by providing real-time elevator location,
              direction, and occupancy data via a web app, while enabling admins
              to configure operations and track maintenance for smoother traffic
              flow and better user experience.
            </p>
            {/* <div className="mt-4">
              <Link href={"/courses"}>Explore courses</Link>
            </div> */}
          </div>
        </motion.h1>
      </LampContainer>
    //</div>
  );
}

export default HeroSection;
