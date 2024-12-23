import bookingService from "../services/bookingService.js";

export const createBooking = async (req, res) => {
  try {
    const newBooking = await bookingService.createBooking(req.body);
    const addInHistory= await bookingService.addBookingToHistory(req.user,newBooking);
    if(!addInHistory){
      res.status(400).json({ error: "Booking not added to history" });
    }
    res.status(201).json(newBooking);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getBookings = async (req, res) => {
  try {
    const bookings = await bookingService.getAllBookings();
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
