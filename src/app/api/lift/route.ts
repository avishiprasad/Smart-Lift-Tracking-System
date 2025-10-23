import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { Lift } from "@/models/Lift";
import { startLiftSimulation } from "@/lib/simulator";

startLiftSimulation();

export async function GET() {
  await connectDB();
  const lifts = await Lift.find();
  return NextResponse.json(lifts);
}

export async function POST(request: Request) {
  try {
    await connectDB();
    const body = await request.json();
    const lift = await Lift.create(body);
    return NextResponse.json(lift);
  } catch (error) {
    console.error("POST error:", error);
    return NextResponse.json({ error: "Failed to create lift" }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  try {
    await connectDB();
    const { id, updates } = await request.json();
    const updated = await Lift.findByIdAndUpdate(id, updates, { new: true });
    return NextResponse.json(updated);
  } catch (error) {
    console.error("PATCH error:", error);
    return NextResponse.json({ error: "Failed to update lift" }, { status: 500 });
  }
}
