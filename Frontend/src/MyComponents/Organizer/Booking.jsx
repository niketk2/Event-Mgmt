import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

const Booking = () => {
  const [bookings, setBookings] = useState([]);
  const { user } = useSelector((state) => state.profile);

  useEffect(() => {
    // Fetch bookings data from the server
    axios
      .post("http://localhost:3001/booking_venueorg", user)
      .then((response) => {
        if (response.data) {
          setBookings(response.data);
        } else {
          console.error("Error fetching bookings: Response data is undefined");
        }
      })
      .catch((error) => {
        console.error("Error fetching bookings:", error);
      });
  }, []);

  const handleApproveBooking = (bookingId) => {
    axios
      .put(`http://localhost:3001/booking_approve/${bookingId}`)
      .then((response) => {
        if (response.data.success) {
          setBookings((prevBookings) =>
            prevBookings.map((booking) =>
              booking.booking_id === bookingId
                ? { ...booking, status: "approved" }
                : booking
            )
          );
        } else {
          console.error("Failed to approve booking:", response.data.message);
        }
      })
      .catch((error) => {
        console.error("Error approving booking:", error);
      });
  };

  const handleCancelBooking = (bookingId) => {
    const confirmed = window.confirm(
      "Are you sure you want to Cancel the booking?"
    );
    if (confirmed) {
      axios
        .put(`http://localhost:3001/cancelled_booking/${bookingId}`)
        .then((response) => {
          if (response.data.success) {
            setBookings((prevBookings) =>
              prevBookings.map((booking) =>
                booking.booking_id === bookingId
                  ? { ...booking, status: "cancelled" }
                  : booking
              )
            );
          } else {
            console.error("Failed to cancel booking:", response.data.message);
          }
        })
        .catch((error) => {
          console.error("Error Cancelling Venue:", error);
        });
    }
  };

  return (
    <div className="container mx-10 flex justify-center flex-col items-center mb-[20rem]">
      <h1 className="text-2xl font-semibold my-4">Your Bookings</h1>
      <div className="overflow-x-auto">
        <table className="table-auto bg-gray-50 w-[55rem]">
          <thead>
            <tr className="bg-gray-800 text-white rounded-md">
              <th className="px-4 py-2">Booking Name</th>
              <th className="px-4 py-2">Phone</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Date</th>
              <th className="px-4 py-2">Slot</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking, index) => (
              <tr key={index} className="border-b border-gray-400">
                <td className="px-4 py-2">{booking.booking_username}</td>
                <td className="px-4 py-2">{booking.booking_phone}</td>
                <td className="px-4 py-2">{booking.booking_email}</td>
                <td className="px-4 py-2">{booking.booking_date}</td>
                <td className="px-4 py-2">{booking.preferred_slot}</td>
                <td className="px-4 py-2">{booking.status}</td>
                <td className="px-4 py-2">
                  {booking.status === "pending" ? (
                    <div className="flex">
                      <button
                        className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded-full"
                        onClick={() => handleApproveBooking(booking.booking_id)}
                      >
                        Approve
                      </button>
                      <button
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded-full ml-2"
                        onClick={() => handleCancelBooking(booking.booking_id)}
                      >
                        Cancel
                      </button>
                    </div>
                  ) : booking.status !== "cancelled" ? (
                    <div className="flex">
                      <button
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded-full"
                        onClick={() => handleCancelBooking(booking.booking_id)}
                      >
                        Cancel
                      </button>
                    </div>
                  ) : null}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Booking;
