import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
const Venue_booking = ({ venue, onClose }) => {
  const [booking_username, setBookingUserName] = useState("");
  const [booking_email, setBookingEmail] = useState("");
  const [booking_phone, setBookingPhone] = useState("");
  const [booking_date, setBookingDate] = useState("");
  const [preferred_slot, setPreferredSlot] = useState("");
  const [availableSlots, setAvailableSlots] = useState([]);
  const { user } = useSelector((state) => state.profile);
  const [formErrors, setFormErrors] = useState({});

  const validateForm = () => {
    const errors = {};
    if (!booking_username.trim()) {
      errors.booking_username = "Name is required";
    }
    if (!booking_email.trim()) {
      errors.booking_email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(booking_email)) {
      errors.booking_email = "Email is invalid";
    }
    if (!booking_phone.trim()) {
      errors.booking_phone = "Phone is required";
    } else if (!/^\d{10}$/.test(booking_phone)) {
      errors.booking_phone = "Phone number is invalid";
    }
    if (!booking_date) {
      errors.booking_date = "Date is required";
    }
    if (!preferred_slot) {
      errors.preferred_slot = "Preferred slot is required";
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const fetchAvailableSlots = (date, bookedSlots) => {
    const openingTime = 8; // Assuming the venue opens at 8:00 AM
    const closingTime = 22; // Assuming the venue closes at 10:00 PM
    const slotDuration = Number(venue.SlotType);

    // Calculate the total number of slots available in a day
    const totalSlots = Math.floor((closingTime - openingTime) / slotDuration);

    // Generate the available slots
    const slots = Array.from({ length: totalSlots }, (_, index) => {
      const startHour = openingTime + index * slotDuration;
      const endHour = startHour + slotDuration;
      const slotLabel = `${startHour}:00 - ${endHour}:00`;
      return slotLabel;
    });

    // Filter out the already booked slots
    const availableSlots = slots.filter((slot) => !bookedSlots.includes(slot));

    setAvailableSlots(availableSlots);
  };
  
  useEffect(() => {
    const venue_id = venue.venue_id; //venue id
    axios
      .post("http://localhost:3001/pref_slot", { booking_date,venue_id})
      .then((res) => {
        const bookedSlots = res.data; // Assuming res.data contains the booked slots
        console.log(bookedSlots);
        if (bookedSlots) {
          fetchAvailableSlots(booking_date, bookedSlots); 
        } else {
          console.log("No booked slots data received.");
        }
      })
      .catch((err) => {
        console.error("Error fetching booked slots:", err);
      });
  }, [booking_date]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }

    const formData = new FormData();
    formData.append("booking_username", booking_username);
    formData.append("booking_email", booking_email);
    formData.append("booking_phone", booking_phone);
    formData.append("booking_date", booking_date);
    formData.append("preferred_slot", preferred_slot);
    formData.append("Id", user.Id);
    formData.append("venue_id", venue.venue_id);

    // Convert FormData to object
    const formDataToObject = (formData) => {
      const data = {};
      for (let [key, value] of formData.entries()) {
        data[key] = value;
      }
      return data;
    };

    // Usage
    const objectData = formDataToObject(formData);
    console.log(objectData);

    axios
      .post("http://localhost:3001/venue_book", objectData)
      .then((res) => {
        console.log(res.data);
        alert("venue booked successfully");
        setBookingUserName("");
        setBookingEmail("");
        setBookingPhone("");
        setBookingDate("");
        setPreferredSlot("");
      })
      .catch((err) => {
        console.error("Error booking venue:", err);
      });
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-md max-w-md w-full">
        <h2 className="text-2xl font-bold">Book Venue: {venue.VenueName}</h2>
        <form onSubmit={handleSubmit} className="mt-4">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Name
          </label>
          <input
            type="text"
            name="booking_username"
            value={booking_username}
            onChange={(e) => setBookingUserName(e.target.value)}
            required
            className="w-full px-3 py-2 mt-1 rounded-md border border-gray-300"
          />
          {formErrors.booking_username && (
            <p className="text-red-500 text-sm">
              {formErrors.booking_username}
            </p>
          )}
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 mt-4"
          >
            Email
          </label>
          <input
            type="email"
            name="booking_email"
            value={booking_email}
            onChange={(e) => setBookingEmail(e.target.value)}
            required
            className="w-full px-3 py-2 mt-1 rounded-md border border-gray-300"
          />
          {formErrors.booking_email && (
            <p className="text-red-500 text-sm">{formErrors.booking_email}</p>
          )}
          <label
            htmlFor="phone"
            className="block text-sm font-medium text-gray-700 mt-4"
          >
            Phone
          </label>
          <input
            type="tel"
            name="booking_phone"
            value={booking_phone}
            onChange={(e) => setBookingPhone(e.target.value)}
            required
            className="w-full px-3 py-2 mt-1 rounded-md border border-gray-300"
          />
          {formErrors.booking_phone && (
            <p className="text-red-500 text-sm">{formErrors.booking_phone}</p>
          )}
          <label
            htmlFor="date"
            className="block text-sm font-medium text-gray-700 mt-4"
          >
            Date
          </label>
          <input
            type="date"
            name="booking_date"
            value={booking_date}
            onChange={(e) => {
              const selectedDate = e.target.value;
              const currentDate = new Date().toISOString().split("T")[0];
              if (selectedDate >= currentDate) {
                setBookingDate(selectedDate);
                fetchAvailableSlots(selectedDate, []);
              } else {
                console.error("Selected date cannot be in the past");
                alert("Selected date cannot be in the past");
              }
            }}
            required
            className="w-full px-3 py-2 mt-1 rounded-md border border-gray-300"
          />
          {formErrors.booking_date && (
            <p className="text-red-500 text-sm">{formErrors.booking_date}</p>
          )}
          {/* <label className="block text-sm font-medium text-gray-700 mt-4">Preferred Slot</label>
                    <div className="mt-1">
                        {availableSlots.map((slot, index) => (
                            <label key={index} className="inline-flex items-center">
                                <input
                                    type="radio"
                                    name="preferred_slot"
                                    value={slot}
                                    checked={preferred_slot === slot}
                                    onChange={() => setPreferredSlot(slot)}
                                    className="form-radio h-4 w-4 text-blue-600"
                                />
                                <span className="ml-2">{slot}</span>
                            </label>
                        ))}
                    </div> */}

          <label className="block text-sm font-medium text-gray-700 mt-4">
            Preferred Slot
          </label>
          {availableSlots.length > 0 && (
            <div className="mt-1">
              {availableSlots.map((slot, index) => (
                <label key={index} className="inline-flex items-center">
                  <input
                    type="radio"
                    name="preferred_slot"
                    value={slot}
                    checked={preferred_slot === slot}
                    onChange={() => setPreferredSlot(slot)}
                    className="form-radio h-4 w-4 text-blue-600"
                  />
                  <span className="ml-2">{slot}</span>
                </label>
              ))}
            </div>
          )}

          {formErrors.preferred_slot && (
            <p className="text-red-500 text-sm">{formErrors.preferred_slot}</p>
          )}
          <div className="flex justify-end mt-4">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md mr-2 focus:outline-none"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none"
            >
              Book
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Venue_booking;
