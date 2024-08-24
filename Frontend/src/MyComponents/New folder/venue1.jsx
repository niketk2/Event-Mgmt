import React, { useState } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
// import 'react-datepicker/dist/react-datepicker.css';

const Venue = () => {
  const [VenueName, setVenueName] = useState("");
  const [VenueCity, setVenueCity] = useState("");
  const [VenueAddress, setVenueAddress] = useState("");
  const [VenueType, setVenueType] = useState("");
  const [EventType, setEventType] = useState('');
  const [VenueDescription, setVenueDescription] = useState("");
  const [VenueCapacity, setVenueCapacity] = useState("");
  const [VenueFacilities, setVenueFacilities] = useState([]);
  const [VenueContactName, setVenueContactName] = useState("");
  const [VenuePhone, setVenuePhone] = useState("");
  const [VenueEmail, setVenueEmail] = useState("");
  // const [availability, setAvailability] = useState(new Date());
  const [VenuePrice, setVenuePrice] = useState('');
  // const [venueOpeningTime, setVenueOpeningTime] = useState('');
  // const [venueClosingTime, setVenueClosingTime] = useState('');
  const [SlotType, setSlotType] = useState('');
  const [VenueImage, setVenueImage] = useState(null);
  const [VenueCatalogue, setVenueCatalogue] = useState(null);
  
  const [error, setError] = useState('');

  const facilitiesOptions = [
    { id: 1, name: "Parking", value: "parking" },
    { id: 2, name: "Wi-Fi", value: "wifi" },
    { id: 3, name: "Catering", value: "catering" },
    { id: 4, name: "Audio/Visual Equipment", value: "audioVisual" },
    { id: 5, name: "Accessibility", value: "accessibility" },
    { id: 6, name: "Seating", value: "seating" },
    { id: 7, name: "Restrooms", value: "restrooms" },
    { id: 8, name: "Security", value: "security" },
    { id: 9, name: "Outdoor Space", value: "outdoorSpace" },
  ];

  const slotDurationOptions = [
    { value: '4', label: '4 hours' },
    { value: '6', label: '6 hours' },
    { value: '8', label: '8 hours' },
    // Add more options as needed
  ];

  const [values, setValues] = useState({
    VenueName: "",
    VenueCity: "",
    VenueAddress: "",
    VenueType: "",
    EventType: "",
    VenueDescription: "",
    VenueCapacity: "",
    VenueFacilities: "",
    VenueContactName: "",
    VenuePhone: "",
    VenueEmail: "",
    VenuePrice: "",
    SlotType: "",
    VenueImage: "",
    VenueCatalogue: "",
  });
  const handleFacilityChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setVenueFacilities([...VenueFacilities, value]);
    } else {
      setVenueFacilities(VenueFacilities.filter((facility) => facility !== value));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic form validation
    if (!VenueName || !VenueCity || !VenueAddress || !VenueType || !EventType || !VenueDescription ||!VenueCapacity ||
      VenueFacilities.length === 0 || !VenueContactName ||!VenuePhone || !VenueEmail ||  !VenuePrice || !SlotType)
       {
      setError("All fields are required");
      return;
      }

    // Add venue to database
    const formData = new FormData();
    formData.append("VenueName", VenueName);
    formData.append("VenueCity", VenueCity);
    formData.append("VenueAddress", VenueAddress);
    formData.append("VenueDescription", VenueDescription);
    formData.append("VenueType", VenueType);
    formData.append("EventType", EventType);
    formData.append("VenueCapacity", VenueCapacity);
    formData.append("VenueFacilities", VenueFacilities.join(", "));
    formData.append("VenueContactName", VenueContactName);
    formData.append("VenuePhone", VenuePhone);
    formData.append("VenueEmail", VenueEmail);
    // formData.append("availability", availability);
    formData.append('VenuePrice', VenuePrice);
    formData.append('SlotType', SlotType);
    formData.append("VenueImage", VenueImage);
    formData.append("VenueCatalogue",VenueCatalogue)
    
    // const formData = {
    //   venueName: values.venueName,
    //   venueCity: values.venueCity,
    //   venueAddress: values.venueAddress,
    //   venueType: values.venueType,
    //   eventType: values.eventType,
    //   venueDescription: values.venueDescription,
    //   venueCapacity: values.venueCapacity,
    //   venueFacilities: values.venueFacilities,
    //   contactName: values.contactName,
    //   contactPhone: values.contactPhone,
    //   contactEmail: values.contactEmail,
    //   venuePrice: values.venuePrice,
    //   slotDuration: values.slotDuration,
    //   venueImage: values.venueImage,
    //   venuecatalogue: values.venueCatalogue,
    // };

    axios
      .post("http://localhost:3001/venue_insert", formData)
      .then((response) => {
        console.log(formData);
        alert("Venue Added Succesfully");
        console.log("Venue added successfully:", response.data);
        // Reset form fields
        setVenueName("");
        setVenueCity("");
        setVenueAddress("");
        setVenueType("");
        setEventType('');
        setVenueDescription("");
        setVenueCapacity("");
        setVenueFacilities([]);
        setVenueContactName("");
        setVenuePhone("");
        setVenueEmail("");
        setVenuePrice('');
        // setVenueOpeningTime('');
        // setVenueClosingTime('');
        setSlotType('');
        setVenueImage('');
        setVenueCatalogue('');
        setError("");
      })
      .catch((error) => {
        console.error("Error adding venue:", error);
        setError("Error adding venue. Please try again.");
      });
  };

  return (
    <div className="flex flex-col items-center justify-center mt-10 bg-gray-100 p-8 rounded-lg">
      <h2 className="text-2xl font-bold mb-6">Add a Venue</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleSubmit} className="max-w-lg w-full">
        {/* Venue Name */}
        <div className="mb-4">
          <label htmlFor="venueName" className="block mb-1 font-medium">
            Venue Name
          </label>
          <input
            type="text"
            name="venueName"
            // value={values.venueName}
            value={VenueName}  
            onChange={(e) => setVenueName(e.target.value)}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            required
          />
        </div>
        {/* Venue City */}
        <div className="mb-4">
          <label htmlFor="venueCity" className="block mb-1 font-medium">
            Venue City
          </label>
          <input
            type="text"
            name="venueCity"
            autoComplete="venueCity"
            value={VenueCity}
            onChange={(e) => setVenueCity(e.target.value)}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            required
          />
        </div>
        {/* Venue Address */}
        <div className="mb-4">
          <label htmlFor="venueAddress" className="block mb-1 font-medium">
            Venue Address
          </label>
          <input
            type="text"
            value={VenueAddress}
            onChange={(e) => setVenueAddress(e.target.value)}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            required
          />
        </div>
        {/* Venue Type */}
        <div className="mb-4">
          <label htmlFor="venueType" className="block mb-1 font-medium">
            Venue Type
          </label>
          <select
            id="venueType"
            value={VenueType}
            onChange={(e) => setVenueType(e.target.value)}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            required
          >
            <option value="">Select a Venue Type</option>
            <option value="indoor">Indoor</option>
            <option value="outdoor">Outdoor</option>
          </select>
        </div>
        {/* Event Type */}
        <div className="mb-4">
          <label htmlFor="eventType" className="block mb-1 font-medium">
            Event Type
          </label>
          <select
            id="eventType"
            value={EventType}
            onChange={(e) => setEventType(e.target.value)}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            required
          >
            <option value="">Select an Event Type</option>
            <option value="conference">Conference</option>
            <option value="concert">Concert</option>
            <option value="wedding">Wedding</option>
            <option value="party">Party</option>
            <option value="other">Other</option>
          </select>
        </div>
       
        {/* Venue Description */}
        <div className="mb-4">
          <label htmlFor="venueDescription" className="block mb-1 font-medium">
            Venue Description
          </label>
          <textarea
            id="venueDescription"
            value={VenueDescription}
            onChange={(e) => setVenueDescription(e.target.value)}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            required
          ></textarea>
        </div>
        {/* Venue Capacity */}
        <div className="mb-4">
          <label htmlFor="venueCapacity" className="block mb-1 font-medium">
            Venue Capacity
          </label>
          <input
            type="number"
            
            value={VenueCapacity}
            onChange={(e) => setVenueCapacity(e.target.value)}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            required
          />
        </div>
        {/* Venue Facilities */}
        <div className="mb-4">
          <label className="block mb-1 font-medium">Venue Facilities</label>
          <div className="flex flex-wrap">
            {facilitiesOptions.map((facility) => (
              <label key={facility.id} className="inline-flex items-center mr-4 mb-2">
                <input
                  type="checkbox"
                  value={facility.value}
                  checked={VenueFacilities.includes(facility.value)}
                  onChange={handleFacilityChange}
                  className="form-checkbox h-5 w-5 text-blue-500"
                />
                <span className="ml-2">{facility.name}</span>
              </label>
            ))}
          </div>
        </div>
        {/* Contact Name */}
        <div className="mb-4">
          <label htmlFor="contactName" className="block mb-1 font-medium">
            Contact Name
          </label>
          <input
            type="text"
            value={VenueContactName}
            onChange={(e) => setVenueContactName(e.target.value)}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            required
          />
        </div>
        {/* Contact Phone */}
        <div className="mb-4">
          <label htmlFor="contactPhone" className="block mb-1 font-medium">
            Contact Phone
          </label>
          <input
            type="tel"
            value={VenuePhone}
            onChange={(e) => setVenuePhone(e.target.value)}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            required
          />
        </div>
        {/* Contact Email */}
        <div className="mb-4">
          <label htmlFor="contactEmail" className="block mb-1 font-medium">
            Contact Email
          </label>
          <input
            type="email"
            value={VenueEmail}
            onChange={(e) => setVenueEmail(e.target.value)}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            required
          />
        </div>
        {/* Availability */}
        {/* <div className="mb-4">
          <label htmlFor="availability" className="block mb-1 font-medium">Availability</label>
          <DatePicker
            id="availability"
            selected={availability}
            onChange={(date) => setAvailability(date)}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            dateFormat="yyyy-MM-dd"
            required
          />
        </div> */}
        <div className="mb-4">
          <label htmlFor="venuePrice" className="block mb-1 font-medium">Venue Price</label>
          <input
            type="number"
            value={VenuePrice}
            onChange={(e) => setVenuePrice(e.target.value)}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            required
          />
        </div>
        {/* Venue Opening Time */}
        {/* <div className="mb-4">
          <label htmlFor="venueOpeningTime" className="block mb-1 font-medium">Venue Opening Time</label>
          <input
            type="time"
            id="venueOpeningTime"
            value={venueOpeningTime}
            onChange={(e) => setVenueOpeningTime(e.target.value)}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            required
          />
        </div> */}
        {/* Venue Closing Time */}
        {/* <div className="mb-4">
          <label htmlFor="venueClosingTime" className="block mb-1 font-medium">Venue Closing Time</label>
          <input
            type="time"
            id="venueClosingTime"
            value={venueClosingTime}
            onChange={(e) => setVenueClosingTime(e.target.value)}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            required
          />
        </div> */}
         {/* Slot Duration */}
         <div className="mb-4">
          <label htmlFor="slotDuration" className="block mb-1 font-medium">
            Slot Duration
          </label>
          <select
            
            value={SlotType}
            onChange={(e) => setSlotType(e.target.value)}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            required
          >
            <option value="">Select Slot Duration</option>
            {slotDurationOptions.map(option => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>
        </div>  
        {/* Venue Image */}
        <div className="mb-4">
          <label htmlFor="venueImage" className="block mb-1 font-medium">
            Venue Image
          </label>
          <input
            type="file"
           // value={venueImage}
            onChange={(e) => setVenueImage(e.target.files[0])}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            required
          />
        </div>
        {/* Venue Catalogue */}
        <div className="mb-4">
          <label htmlFor="venueCatalogue" className="block mb-1 font-medium">
            Venue Catalogue (.pdf)
          </label>
          <input
            type="file"
            // id="venueCatalogue"
           // value={venueCatalogue}
           accept=".pdf"
            onChange={(e) => setVenueCatalogue(e.target.files[0])}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            required
          />
        </div>
        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none"
        >
          Add Venue
        </button>
      </form>
    </div>
  );
};

export default Venue;
