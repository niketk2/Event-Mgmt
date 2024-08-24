import { response } from "express";
import db from "../index.js";
export const book_Venue = (request, response) => {
  console.log(request.body);
  const sql =
    "INSERT INTO booking (booking_username, booking_email, booking_phone,booking_date, preferred_slot, Id, venue_id) VALUES (?, ?, ?, ?, ?, ?, ?)";

  const {
    booking_username,
    booking_email,
    booking_phone,
    booking_date,
    preferred_slot,
    Id,
    venue_id,
  } = request.body;

  const values = [
    booking_username,
    booking_email,
    booking_phone,
    booking_date,
    preferred_slot,
    Id,
    venue_id,
  ];

  // console.log(values);
  db.query(sql, values, (error, result) => {
    if (error) {
      console.error("Error in Inserting Data:", error);
      return response.status(500).json({ error: "Error in Inserting Data" });
    }
    console.log("Data Inserted Successfully");
    return response.status(200).json({ status: "SUCCESS" });
  });
};

// Check Preferred Slot
export const get_prefslot = (request, response) => {
  const booking_date = request.body.booking_date;
  const vid = request.body.venue_id;
  console.log(vid);
  console.log(booking_date);
  if (booking_date) {
    const formattedDate = new Date(booking_date).toISOString();
    // console.log(formattedDate);
    // console.log(d1);
    // console.log(formattedDate);
    const sql =
      "SELECT preferred_slot FROM booking where booking_date = ? and venue_id =? ";
    db.query(sql, [formattedDate,vid], (err, data) => {
      if (err) {
        return response.json({ Error: "Error" });
      }
      // console.log(data);
      const preferredSlots = data.map((booking) => booking.preferred_slot);
      // console.log(preferredSlots);
      return response.json(preferredSlots);
    });
  }
};

// fetch User bookings
export const get_Bookings = (request, response) => {
  const user_id = request.body.Id;
  console.log(request.body.Id);
  const sql = "SELECT * FROM booking where Id = ?";

  console.log(user_id);
  db.query(sql, [user_id], (err, data) => {
    if (err) return response.json({ Error: "Error" });
    // console.log(response);
    return response.json(data);
  });
};

//get_Bookings_org
export const get_Bookings_org = (request, response) => {
  const id = request.body.Id;
  console.log(request.body);
  const sql =
    "SELECT * FROM booking WHERE venue_id IN (SELECT venue_id FROM venue WHERE Id = ?) ";
  db.query(sql, [id], (err, data) => {
    if (err) {
      return response.json({ Error: "Error1" });
    }
    return response.json(data);
  });
};

// Cancel the status
export const delete_bookVenue = (request, response) => {
  const sql = "UPDATE booking SET status = 'cancelled' WHERE booking_id = ?";
  const id = request.params.booking_id;

  db.query(sql, [id], (err, data) => {
    if (err) {
      console.error(err);
      return response.status(500).json({ error: "Error Cancelling booking" });
    }
    console.log(`Cancelled booking with ID ${id}`);
    return response.status(200).json({ message: "Cancelled booking" });
  });
};

// approve booking
export const approve_booking = async (req, res) => {
  const bookingId = req.params.booking_id;
  const sql = "UPDATE booking SET status = 'approved' WHERE booking_id = ?";
  try {
    db.query(sql, [bookingId]);
    res.json({ success: true, message: "Booking Approved successfully" });
  } catch (err) {
    console.error("Error approving booking:", err);
    res
      .status(500)
      .json({ success: false, message: "Failed to approve booking" });
  }
};

// Cancel booking 
export const cancelled_booking = async (req, res) => {
  const bookingId = req.params.booking_id;
  const sql = "UPDATE booking SET status = 'cancelled' WHERE booking_id = ?";
  try {
    db.query(sql, [bookingId]);
    res.json({ success: true, message: "Booking Cancled successfully" });
  } catch (err) {
    console.error("Error approving booking:", err);
    res
      .status(500)
      .json({ success: false, message: "Failed to Cancelled booking" });
  }
};