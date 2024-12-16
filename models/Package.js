import mongoose from "mongoose";

const itinerarySchema = new mongoose.Schema({
  day: { type: Number, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
});

const packageSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  availableDates: [{ type: String, required: true }],
  images: [{ type: String }],
  location: { type: String, required: true },
  duration: { type: String, required: true },
  highlights: [{ type: String }],
  itinerary: [itinerarySchema],
  included: [{ type: String }],
  excluded: [{ type: String }],
});

const Package = mongoose.model("Package", packageSchema);

export default Package;
