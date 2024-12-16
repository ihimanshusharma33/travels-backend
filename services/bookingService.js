import Booking from "../models/Booking.js";
import Package from "../models/Package.js";

const createBooking = async (bookingData) => {
  const packageData = await Package.findById(bookingData.packageId);
  if (!packageData) throw new Error("Package not found");

  const totalPrice = packageData.price * bookingData.travelers;
  const newBooking = new Booking({
    ...bookingData,
    packageTitle: packageData.title,
    totalPrice,
  });

  return await newBooking.save();
};

const getAllBookings = async () => {
  return await Booking.find().populate("packageId", "title location");
};

export default {
  getAllBookings,
  createBooking,
};
