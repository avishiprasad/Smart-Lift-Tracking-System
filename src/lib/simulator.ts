import { Lift } from "@/models/Lift";
import { connectDB } from "./mongodb";

let simulationRunning = false;

export async function startLiftSimulation() {
  if (simulationRunning) return; // Prevent duplicate intervals
  simulationRunning = true;

  await connectDB();
  console.log("🚀 Lift simulation started...");

  setInterval(async () => {
    try {
      const lifts = await Lift.find();
      for (const lift of lifts) {
        if (lift.under_maintenance || lift.emergency) continue; // Skip inactive lifts

        let newFloor = lift.current_floor;
        let newDirection = lift.direction;

        if (lift.direction === "up") {
          newFloor++;
          if (newFloor >= lift.end_floor) newDirection = "down";
        } else {
          newFloor--;
          if (newFloor <= lift.start_floor) newDirection = "up";
        }

        await Lift.findByIdAndUpdate(lift._id, {
          current_floor: newFloor,
          direction: newDirection,
        });
      }
    } catch (err) {
      console.error("Simulation error:", err);
    }
  }, 3000);
}
