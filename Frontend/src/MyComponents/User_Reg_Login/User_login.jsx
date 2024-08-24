import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { setToken } from "../../Slices/authSlice";
import { useDispatch } from "react-redux";
import { setUser } from "../../Slices/profileSlice";
import '../../index.css';
import EventImage from '../Images/eventbg.jpg';
import { IoPersonSharp } from "react-icons/io5";
import { IoLockClosedSharp } from "react-icons/io5";
import { IoPersonAddSharp } from "react-icons/io5";


function User_login() {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const [role, setRole] = useState(""); // Default role is 'user'
  const dispatch = useDispatch();

  const navigate = useNavigate();
  axios.defaults.withCredentials = true;
  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleRoleChange = (e) => {
    setRole(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      email: values.email,
      password: values.password,
    };

    let authRoute;
    if (role === "user") {
      authRoute = "user_auth";
    } else if (role === "organizer") {
      authRoute = "organizer_auth";
    }

    axios
      .post(`http://localhost:3001/${authRoute}`, formData)
      .then((res) => {
        // console.log(res.data);


        // console.log("meraToken:", token);
        console.log("token:", res.data.data.token);
        console.log(res);
        // localStorage.setItem("token", res.data.token);
        if (role === res.data.data.Role) {
          if (res.data.status === "SUCCESS") {
            alert("Login Successful");
            localStorage.setItem("token", JSON.stringify(res.data.data.token))
            dispatch(setToken(res.data.data.token));
            localStorage.setItem("user", JSON.stringify(res.data.data));
            dispatch(setUser(res.data.data));
            console.log("Role:", res.data.data.Role)
            res.data.data.Role === "organizer" ? navigate("/venue") : navigate("/Venue_search")
          }
        } else {
          alert("Login Failed");
        }
      })
      .catch((err) => {
        alert("An error occurred. Please try again.");

        console.log(err);
      });
  };

  return (
    <>

      {/* <div  className="bg-cover bg-center h-full" style={{ backgroundImage: `url(${eventbg})` }}> */}
      <div className="w-full flex  bg-gray-200">
            <div>
              <img src={EventImage} alt="" className=" flex w-full h-full bg-contain bg-no-repeat relative " />
            </div>
        <div className=" gap-1 justify-between absolute left-[36rem] top-[10rem] rounded-lg">
          <div className="flex-1 flex justify-between ">
            <div className="min-h-screen bg-gray-600 flex flex-col justify-between py-12 sm:px-3 lg:px-8 rounded-md ">
              <div className="w-[26rem]">
                <h2 className="mt-2 text-center text-3xl font-extrabold text-white">
                  Sign in
                </h2>
                <div className="mt-8 bg-white py-4 px-4 shadow sm:rounded-lg sm:px-10">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-700"
                      >
                        <IoPersonSharp className="inline-block h-5 w-5 mr-2 text-gray-500" />
   
                        Email address
                      </label>
                      <div className="mt-1">
                        <input
                          name="email"
                          value={values.email}
                          onChange={handleChange}
                          type="email"
                          autoComplete="email"
                          required
                          className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="password"
                        className="block text-sm font-medium text-gray-700"
                      >
                         <IoLockClosedSharp className="inline-block h-5 w-5 mr-2 text-gray-500" />
   
                        Password
                      </label>
                      <div className="mt-1">
                        <input
                          name="password"
                          type="password"
                          value={values.password}
                          onChange={handleChange}
                          autoComplete="current-password"
                          required
                          className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="role"
                        className="block text-sm font-medium text-gray-700"
                      >
                        <IoPersonAddSharp className="inline-block h-5 w-5 mr-2 text-gray-500" />
   
                        Role
                      </label>
                      <div className="mt-1">
                        <select
                          name="role"
                          value={role}
                          onChange={handleRoleChange}
                          className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        >
                          <option value="Active">Select </option>
                          <option value="user">User</option>
                          <option value="organizer">Organizer</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <button
                        type="submit"
                        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                        Sign in
                      </button>
                    </div>
                  </form>
                  <div className="mt-6">
                    <Link
                      to="/User_reg"
                      type="button"
                      className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-gray-500 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Register
                    </Link>
                    <button
                      type="button"
                      className="mt-2 w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-gray-500 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default User_login;
