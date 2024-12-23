import Booking from "../models/Booking.js";
import Package from "../models/Package.js";
import User from "../models/User.js";
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

const addBookingToHistory = async (user, bookingDetails) => {
  const { email } = user;
  if (!email) {
    throw new Error("User not found");
  }
  try {
    const updatedUser = await User.findByIdAndUpdate(
      email, // Assuming `user` contains the user's ID
      { $push: { history: bookingDetails } }, 
      { new: true } 
    );

    if (!updatedUser) {
      throw new Error("User not found");
    }

    return updatedUser; // Return the updated user document
  } catch (error) {
    throw new Error("Error adding booking to user history");
  }
};

export default {
  getAllBookings,
  createBooking,
  addBookingToHistory
};
