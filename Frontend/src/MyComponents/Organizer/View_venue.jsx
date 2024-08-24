import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const View_venue = () => {
    const [data, setData] = useState([]);

    const navigate  = useNavigate();
    const  {user}  = useSelector((state) => state.profile);
    console.log(user);
    useEffect(() => {
        axios.post('http://localhost:3001/venue_fetch',user)
            .then(res => setData(res.data))
            .catch(err => console.log(err));
    }, []);


    const handleUpdate = (id) => {
        console.log(`Update venue with ID ${id}`);
        navigate(`/View_venue/Update_venue/${id}`)
        // Implement update logic
    };

    // const handleUpdate = (id) => {
    //     // Get the current date and time in YYYY-MM-DD HH:mm:ss format
    //     const currentDate = new Date().toISOString().slice(0, 19).replace('T', ' ');
        
    //     // Assuming 'db' is your MySQL database connection
    //     const updatedVenueData = {
    //       VenueName: 'Updated Name',
    //       VenueCity: 'Updated City',
    //       VenueDescription: 'Updated Description',
    //       Date: currentDate, // Set the Date to the current date and time
    //       VenueType: 'Updated Type',
    //       EventType: 'Updated Event',
    //       VenueCapacity: 'Updated Capacity',
    //       VenueFacilities: 'Updated Facilities',
    //       VenuePrice: 'Updated Price',
    //       SlotType: 'Updated Slot',
    //     };
    
    //     console.log(`Update venue with ID ${id}`);
    //     axios.put(`http://localhost:3001/venue_update/${id}`, updatedVenueData)
    //       .then(res => {
    //         console.log(res.data); // Log the response from the server
    //         // Implement logic to update UI, such as showing a success message or refreshing the venue list
    //       })
    //       .catch(error => {
    //         console.error('Error updating venue:', error);
    //         // Implement error handling logic, such as displaying an error message to the user
    //       });
    // };
    

      const handleDelete = (venue_id) => {
        const confirmed = window.confirm("Are you sure you want to delete this venue?");
        if (confirmed) {
            console.log(`Delete venue with ID ${venue_id}`);
            axios.delete(`http://localhost:3001/venue_delete/${venue_id}`)
            .then(response => {
                console.log(response.data); // Log the response from the server
                // Implement logic to update UI, such as removing the deleted venue from your state or re-fetching the venue list
            })
            .catch(error => {
                console.error('Error deleting venue:', error);
                // Implement error handling logic, such as displaying an error message to the user
            });
        }
    };
  
    return (
        <div className="w-fit mx-20 shadow-lg mb-[10rem] ">
            <h1 className="text-2xl font-semibold my-4 flex justify-center ">Your Venues</h1>
            <div className="overflow-x-auto w-fit">
                <table className="table-auto  border  bg-gray-600 text-white">
                    <thead>
                        <tr className="bg-gray-800">
                            <th className=" py-1">Venue City</th>
                            <th className=" py-1">Description</th>
                            <th className=" py-1">Venue Name</th>
                            <th className=" py-1">Date</th>
                            <th className=" py-1">VenueType</th>
                            <th className=" py-1">EventType</th>
                            <th className=" py-1">VenueCapacity</th>
                            <th className=" py-1">VenueFacilities</th>
                            <th className=" py-1">VenuePrice</th>
                            <th className=" py-1">SlotType</th>
                            <th className=" py-1">Image</th>
                            {/* <th className=" py-1">Actions</th> */}
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
                                  <img src={`http://localhost:3001/${venue.VenueImage}`} className="h-12 w-12 object-cover" />
                                </td>

                               

                                {/* <td className="px-4 py-2 flex">
                                    <button
                                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mr-2"
                                        onClick={() => handleUpdate(venue.venue_id)}
                                    >
                                        Update
                                    </button>
                                    <button
                                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4  rounded-full"
                                        onClick={() => handleDelete(venue.venue_id)}
                                    >
                                        Delete
                                    </button>
                                </td> */}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default View_venue;
