import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card } from './Card';

const Venue_search = () => {
  const [venues, setVenues] = useState([]);
  const [filteredVenues, setFilteredVenues] = useState([]);
  const [selectedCity, setSelectedCity] = useState('');
  const [citySuggestions, setCitySuggestions] = useState([]);

  useEffect(() => {
    const fetchVenues = async () => {
      try {
        const response = await axios.get('http://localhost:3001/venue_search');
        setVenues(response.data);
      } catch (error) {
        console.error('Error fetching venues:', error);
      }
    };

    fetchVenues();
  }, []);

  useEffect(() => {
    const cities = venues.map((venue) => venue.VenueCity);
    const uniqueCities = Array.from(new Set(cities));
    setCitySuggestions(uniqueCities);
  }, [venues]);

  const handleCityChange = (e) => {
    const selectedCity = e.target.value;
    setSelectedCity(selectedCity);
    const filtered = venues.filter((venue) =>
      venue.VenueCity.toLowerCase().includes(selectedCity.toLowerCase())
    );
    setFilteredVenues(filtered);
  };

  return (
    <div className='mb-[30rem]'>
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold flex justify-center">Select City</h1>
      <div className="mb-4 flex w-[26rem] align-middle items-baseline gap-2 justify-center mx-auto">
        <div className="relative">
          <select
            value={selectedCity}
            onChange={handleCityChange}
            className="border border-gray-300 rounded-md px-4 py-2 mx-auto focus:outline-none focus:border-blue-500 h-10" // Adjust height here
          >
            <option value="">Select City</option>
            {citySuggestions.map((city) => (
              <option key={city} value={city}>{city}</option>
            ))}
          </select>
        </div>
      </div>
      
      <div className="w-fit h-[26rem] gap-3 flex mx-auto">
        {filteredVenues.map((venue) => (
          <div key={venue.venue_id} className="bg-white rounded-lg shadow-md p-4">
            <Card venue={venue}/>
          </div>
        ))}
      </div>
    </div>
  </div>
    
  );
};

export default Venue_search;
