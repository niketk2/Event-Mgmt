import React, { useState } from 'react';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

const Organizer_reg = () => {
  const [formData, setFormData] = useState({
    org_name:"",
    gender:"",
    password:"",
    email:"",
    contact:"",
    org_address:"",
  })  
 
 
  // useEffect(() => {
  //     axios.get('http://localhost:3001')
  //     .then(res => setFormData(res.data))
  //     .catch(err => console.log(err))
  // },[])

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  const navigate = useNavigate()
  const handleSubmit = (e) => {
  
    // const {organizerName,gender,password,email,contact,address}=formData
    e.preventDefault(); 
    axios.post('http://localhost:3001/Organizer_reg',formData)
    .then(res => {
      if(res.data.Status === "SUCCESS"){
        alert("Organizer registered Successfully");
        navigate('/Organizer_login')
      }
      else{
        alert("Error");
      }
    }).catch(err => console.log(err))
    // Add your form submission logic here
    console.log(formData);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white p-8 rounded shadow-md">
        <h2 className="text-center text-3xl font-extrabold text-gray-900 mb-6">Organizer Registration</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
          <div>
              <label className="sr-only">Organizer Name</label>
              <input  name="org_name" value={formData.org_name} type="text" autoComplete="organizerName" required className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" placeholder="Name" onChange={handleChange} />
         </div>
            <div>
              <label className="sr-only">Gender</label>
              <input  name="gender" value={formData.gender} type="text" autoComplete="organizerName" required className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" placeholder="Gender" onChange={handleChange} />
            </div>
            <div>
              <label className="sr-only">Password</label>
              <input  name="password" value={formData.password} type="password" autoComplete="current-password" required className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" placeholder="Password" onChange={handleChange} />
            </div>
            <div>
              <label  className="sr-only">Email address</label>
              <input  name="email" value={formData.email} type="email" autoComplete="email" required className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" placeholder="Email address" onChange={handleChange} />
            </div>
            <div>
              <label  className="sr-only">Contact</label>
              <input  name="contact" value={formData.contact} type="text" autoComplete="contact" required className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" placeholder="Contact" onChange={handleChange} />
            </div>
            <div>
              <label  className="sr-only">Address</label>
              <input  name="org_address" value={formData.org_address} type="text" autoComplete="address" required className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" placeholder="Address" onChange={handleChange} />
            </div>
          </div>
          <div>
            <button type="submit"  className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              Register
            </button>
            <button type="button" className="mt-3 w-full py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Organizer_reg;
