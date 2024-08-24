import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const View_venue = () => {
    const [data, setData] = useState([]);
    const navigate = useNavigate()

    useEffect(() => {
        axios.get('http://localhost:3001/venue_fetch')
            .then(res => setData(res.data))
            .catch(err => console.log(err));
    }, []);

    const handleUpdate = (id) => {
        console.log(`Update venue with ID ${id}`);
        navigate(`/View_venue/update_venue/${id}`)
        // Implement update logic
    };

    const handleDelete = (id) => {
        console.log(`Delete venue with ID ${id}`);
        // Implement delete logic
    };

    return (
        <div className="container mx-auto">
            <h1 className="text-2xl font-semibold my-4">Your Venues</h1>
            <div className="overflow-x-auto">
                <table className="table-auto border-collapse border border-gray-800">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="px-4 py-2">Venue Name</th>
                            <th className="px-4 py-2">Venue City</th>
                            <th className="px-4 py-2">Description</th>
                            <th className="px-4 py-2">Date</th>
                            <th className="px-4 py-2">VenueType</th>
                            <th className="px-4 py-2">EventType</th>
                            <th className="px-4 py-2">VenueCapacity</th>
                            <th className="px-4 py-2">VenueFacilities</th>
                            <th className="px-4 py-2">VenuePrice</th>
                            <th className="px-4 py-2">SlotType</th>
                            {/* <th className="px-4 py-2">Image</th> */}
                            <th className="px-4 py-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((venue, index) => (
                            <tr key={index} className="border-b border-gray-400">
                                <td className="px-4 py-2">{venue.VenueName}</td>
                                <td className="px-4 py-2">{venue.VenueCity}</td>
                                <td className="px-4 py-2">{venue.VenueDescription}</td>
                                <td className="px-4 py-2">{venue.Date}</td>
                                <td className="px-4 py-2">{venue.VenueType}</td>
                                <td className="px-4 py-2">{venue.EventType}</td>
                                <td className="px-4 py-2">{venue.VenueCapacity}</td>
                                <td className="px-4 py-2">{venue.VenueFacilities}</td>
                                <td className="px-4 py-2">{venue.VenuePrice}</td>
                                <td className="px-4 py-2">{venue.SlotType}</td>
                               

                                <td className="px-4 py-2">
                                    <button
                                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mr-2"
                                        onClick={() => handleUpdate(venue.venue_id)}
                                    >
                                        Update
                                    </button>
                                    <button
                                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full"
                                        onClick={() => handleDelete(venue.id)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default View_venue;
