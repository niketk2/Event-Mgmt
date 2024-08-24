import React, { useEffect, useState } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import { useParams } from 'react-router-dom';

// import 'react-datepicker/dist/react-datepicker.css';

const UpdateVenue = () => {
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
  // const [VenueImage, setVenueImage] = useState(null);
  // const [VenueCatalogue, setVenueCatalogue] = useState(null);
  
  const [error, setError] = useState('');
  const { id} = useParams()
  const [data, setData] = useState([])
  

  useEffect(() => {
    const fetchData = async (id) => {
        try {
            const response = await axios.get(`http://localhost:3001/getVenueById/${id}`);
            // console.log("Response:", response.data);
            setData(response.data)

            
            setVenueName( response.data[0].VenueName)
            setVenueCity( response.data[0].VenueCity)
            setVenueAddress( response.data[0].VenueAddress)
            setVenueType( response.data[0].VenueType)
            setEventType( response.data[0].EventType)
            setVenueDescription( response.data[0].VenueDescription)
            setVenueCapacity( response.data[0].VenueCapacity)
            setVenueFacilities( response.data[0].VenueFacilities)
            setVenueContactName( response.data[0].VenueContactName)
            setVenuePhone( response.data[0].VenuePhone)
            setVenueEmail( response.data[0].VenueEmail)
            setVenuePrice( response.data[0].VenuePrice)
            setSlotType( response.data[0].SlotType)
            setVenueFacilities( response.data[0].VenueFacilities )

        } catch (error) {
            console.error("Error:", error);
        }
    };
    fetchData(id);
  }, [id])



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
    if (
      !VenueName ||
      !VenueCity ||
      !VenueAddress ||
      !VenueType ||
      !EventType ||
      !VenueDescription ||
      !VenueCapacity ||
      VenueFacilities.length === 0 ||
      !VenueContactName ||
      !VenuePhone ||
      !VenueEmail ||
      !VenuePrice ||
      !SlotType
    ) {
      setError("All fields are required");
      return;
    }
  
    // Constructing form data
    const formData = new FormData();
    formData.append("venueName", VenueName);
    formData.append("venueCity", VenueCity);
    formData.append("venueAddress", VenueAddress);
    formData.append("venueType", VenueType);
    formData.append("eventType", EventType);
    formData.append("venueDescription", VenueDescription);
    formData.append("venueCapacity", VenueCapacity);
    formData.append("venueFacilities", VenueFacilities.join(","));
    formData.append("contactName", VenueContactName);
    formData.append("contactPhone", VenuePhone);
    formData.append("contactEmail", VenueEmail);
    formData.append("venuePrice", VenuePrice);
    formData.append("slotType", SlotType);
    // formData.append("venueImage", VenueImage);
    // formData.append("venueCatalogue", VenueCatalogue);
  
    // Make PUT request to update the venue
    axios
      .put(`http://localhost:3001/updateVenueById/${id}`, formData)
      .then((response) => {
        console.log("Venue Updated successfully:", response.data);
        // Reset form fields
        setVenueName("");
        setVenueCity("");
        setVenueAddress("");
        setVenueType("");
        setEventType("");
        setVenueDescription("");
        setVenueCapacity("");
        setVenueFacilities([]);
        setVenueContactName("");
        setVenuePhone("");
        setVenueEmail("");
        setVenuePrice("");
        setSlotType("");
        // setVenueImage(null);
        // setVenueCatalogue(null);
        setError("");
        alert("Venue Updated Successfully");
      })
      .catch((error) => {
        console.error("Error updating venue:", error);
        setError("Error Updating venue. Please try again.");
      });
  };
  
  return (
    data && <div className="flex flex-col items-center justify-center mt-10 bg-gray-100 p-8 rounded-lg">
      <h2 className="text-2xl font-bold mb-6">Update a Venue</h2>
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
            // defaultValue={data.VenueCity}
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
            
          >
            <option value="">Select Slot Duration</option>
            {slotDurationOptions.map(option => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>
        </div>  
        {/* Venue Image */}
        {/* <div className="mb-4">
          <label htmlFor="venueImage" className="block mb-1 font-medium">
            Venue Image
          </label>
          <input
            type="file"
           // value={venueImage}
            onChange={(e) => setVenueImage(e.target.files[0])}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            
          />
        </div> */}
        {/* Venue Catalogue */}
        {/* <div className="mb-4">
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
            
          />
        </div> */}
        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none"
        >
          Update Venue
        </button>
      </form>
    </div>
  );
};

export default UpdateVenue;
