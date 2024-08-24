import React, { useState, useEffect } from "react";
import axios from "axios";
import Venue_booking from "./Venue_booking";

export const Card = ({ venue }) => {
  const [imageUrl, setImageUrl] = useState("");
  const [selectedVenue, setSelectedVenue] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  useEffect(() => {
    axios
      .get(`http://localhost:3001/uploads/${venue.venue_id}`)
      .then((response) => {
        let imageUrl = response.data[0].VenueImage.toString();
        imageUrl = imageUrl.replace("uploads/uploads/", "uploads/");
        setImageUrl(imageUrl);
      })
      .catch((error) => {
        console.error("Error fetching image:", error);
      });
  }, [venue.venue_id]);

  const handleVenueDetails = (venueId) => {
    setSelectedVenue(venue);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedVenue(null);
    setIsModalOpen(false);
  };

  const handleBookVenue = () => {
    setIsBookingOpen(true);
  };

  return (
    imageUrl && (
      <div className="bg-white rounded-lg shadow-md overflow-hidden ">
        <img
          src={`http://localhost:3001/${imageUrl}`}
          alt={venue.VenueName}
          className="w-full h-60  object-cover"
        />
        <div className="p-4">
          <h2 className="text-xl font-bold">{venue.VenueName}</h2>
          <p className="text-gray-600">{venue.VenueCity}</p>
          <div className="mt-4 flex justify-between items-center">
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none"
              onClick={() => handleVenueDetails(venue.venue_id)}
            >
              Check Venue
            </button>
            <button
              className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 focus:outline-none"
              onClick={handleBookVenue}
            >
              Book Venue
            </button>
          </div>
        </div>
        {isModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 ">
            <div className="bg-white p-6 rounded-lg shadow-md max-w-md w-full">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">
                  {selectedVenue.VenueName}
                </h2>
                <button
                  className="text-gray-500 hover:text-gray-700 focus:outline-none"
                  onClick={handleCloseModal}
                >
                  Close
                </button>
              </div>
              <img
                src={`http://localhost:3001/${imageUrl}`}
                alt={selectedVenue.VenueName}
                className="w-full h-40 object-cover rounded-lg mb-4"
              />
              <p className="text-gray-600 flex justify-between" >
                <span className="font-bold">City:</span>{" "}
                <span>{selectedVenue.VenueCity}</span>
              </p>
              <p className="text-gray-600 flex justify-between">
                <span className="font-bold">Address:</span>{" "}
                <span>{selectedVenue.VenueAddress}</span>
              </p>
              <p className="text-gray-600 flex justify-between">
                <span className="font-bold">Venue Type:</span>{" "}
                <span>{selectedVenue.VenueType}</span>
              </p>
              <p className="text-gray-600 flex justify-between">
                <span className="font-bold">Event Type:</span>{" "}
                <span>{selectedVenue.EventType}</span>
              </p>
              <p className="text-gray-600 flex justify-between">
                <span className="font-bold">Description:</span>{" "}
                <span>{selectedVenue.VenueDescription}</span>
              </p>
              <p className="text-gray-600 flex justify-between">
                <span className="font-bold">Facilites:</span>{" "}
                <span>{selectedVenue.VenueFacilities}</span>
              </p>
              <p className="text-gray-600 flex justify-between">
                <span className="font-bold">Contact:</span>{" "}
                <span>{selectedVenue.VenueContactName}</span>
              </p>
              <p className="text-gray-600 flex justify-between">
                <span className="font-bold">Phone:</span>{" "}
                <span>{selectedVenue.VenuePhone}</span>
              </p>
              <p className="text-gray-600 flex justify-between">
                <span className="font-bold">Email:</span>{" "}
                <span>{selectedVenue.VenueEmail}</span>
              </p>
              <p className="text-gray-600 flex justify-between">
                <span className="font-bold">Price:</span>{" "}
                <span>{selectedVenue.VenuePrice}</span>
              </p>
              <p className="text-gray-600 flex justify-between">
                <span className="font-bold">Availability Time:</span>{" "}
                <span>{selectedVenue.SlotType}</span>
              </p>
              <p className="text-gray-600 flex justify-between">
                <span className="font-bold">Capacity:</span>{" "}
                <span>{selectedVenue.VenueCapacity}</span>
              </p>
              {/* <p className="text-gray-600 flex justify-between">
                <span className="font-bold">Catalogue:</span>{" "}
                <span>{selectedVenue.VenueCatalogue}</span>
              </p> */}
              <button
                className="bg-blue-500 text-white px-4 py-2 ml-[21rem] rounded-md hover:bg-blue-600 focus:outline-none mt-4"
                onClick={handleCloseModal}
              >
                Close
              </button>
            </div>
          </div>
        )}
        {isBookingOpen && (
          <Venue_booking
            venue={venue}
            onClose={() => setIsBookingOpen(false)}
          />
        )}
      </div>
    )
  );
};
