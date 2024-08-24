import React, { useState } from 'react'
import contactbg from '../Images/contactbg.jpg'
const contact = () => {
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     message: ''
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // Add your form submission logic here
//     console.log(formData);
//   };

  return (
    <>
    <div className='flex '>
      <div className='flex-1'>
        <img src={contactbg} alt="" />
      </div>
        <h1 className='text-black text-3xl mt-[1rem]  font-bold'>Get in touch</h1>
      <div className='flex-1'>

        <form action=" " className='p-[2rem] rounded-lg mt-[6rem] mb-[3rem] mr-[4rem] bg-gray-800'>
        <div className="mb-4 ">
          <label htmlFor="name" className="block text-white">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            // value={formData.name}
            // onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
            placeholder="Your Name"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-white">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            // value={formData.email}
            // onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
            placeholder="Your Email"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="message" className="block text-white">Message</label>
          <textarea
            id="message"
            name="message"
            // value={formData.message} 
            // onChange={handleChange}
            rows="5"
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
            placeholder="Your Message"
            required
          ></textarea>
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Submit
        </button>
        </form>
      </div>
    </div>
    </>
  );
};

export default contact;
