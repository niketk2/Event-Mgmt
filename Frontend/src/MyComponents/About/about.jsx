import { Carousel } from '@material-tailwind/react';
import React from 'react';
import { Form } from 'react-router-dom';


const about = () => {
  return (
    <>
      <div className="bg-gray-100 min-h-screen">
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-8 text-center">About Us</h1>
        <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-x-8">
          <div className="max-w-full">
            <img
              className="w-full h-auto rounded-lg shadow-md"
              src="https://images.pexels.com/photos/274192/pexels-photo-274192.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              alt="Team"
            />
          </div>
          <div className="max-w-lg">
            <h2 className="text-xl font-semibold mb-4">Our Story</h2>
            <p className="text-gray-700">
             
The Event Management System is a comprehensive platform designed to streamline the planning, organization, and execution of events. It encompasses various modules catering to different aspects of event management. Users can create events, manage guest lists, handle invitations, schedule tasks, and track expenses all within a single interface. The system facilitates seamless communication among event stakeholders, including organizers, vendors, and attendees, ensuring smooth coordination and collaboration throughout the event lifecycle. Features such as venue management, agenda planning, ticketing, and feedback collection enhance efficiency and effectiveness in event execution. Additionally, robust reporting and analytics functionalities provide valuable insights for optimizing future events. With its user-friendly interface and customizable options, the Event Management System empowers event planners to create memorable and successful events while saving time and resources.
            </p>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default about;