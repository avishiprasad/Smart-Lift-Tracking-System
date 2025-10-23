import mongoose, { Schema, model, models } from "mongoose";

const LiftSchema = new Schema({
  title: { type: String, required: true },
  description: String,
  start_floor: { type: Number, required: true },
  end_floor: { type: Number, required: true },
  current_floor: { type: Number, default: 1 },
  direction: { type: String, enum: ["up", "down"], default: "up" },
  occupancy: { type: String, enum: ["empty", "half empty", "full"], default: "empty" },
  under_maintenance: { type: Boolean, default: false },
  emergency: { type: Boolean, default: false },
}, { timestamps: true });

export const Lift = models.Lift || model("Lift", LiftSchema);
