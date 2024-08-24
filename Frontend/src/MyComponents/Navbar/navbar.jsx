import React, { useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

// import { UseDispatch } from "react-redux";
// import logout from "../Logout/logout";
import { useDispatch } from "react-redux";
import { Button } from "@material-tailwind/react";
import { logout } from "../../Slices/profileSlice";
const Navbar = () => {
  const { user } = useSelector((state) => state.profile);

  const dispatch = useDispatch();
  //   const { user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    window.location.href = "/User_login";
  };

  return (
    <header className="shadow sticky z-50 top-0">
      <nav className="bg-gray-900 text-white border-gray-200 px-4 lg:px-6 py-2.5">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
          <Link to="/" className="flex items-center">
            <div className="mr-3 stroke-text uppercase fill-white  text-xl">
              Manage Your Events
            </div>
          </Link>
          <div className="flex items-center lg:order-2">
            {!user ? (
              <NavLink
                to="/User_login"
                className={({ isActive }) =>
                  `text-gray-800  ${
                    isActive ? "text-orange-700" : "text-white"
                  } hover:bg-orange-700 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none`
                }
              >
                LOGIN
              </NavLink>
            ) : (
              <>
                <div className="text-gray-200 text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2">
                  {user.Email}
                </div>
                <Button
                  onClick={handleLogout}
                  className="text-gray-400 text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none"
                >
                  LOGOUT
                </Button>
              </>
            )}
          </div>
          <div
            className="hidden justify-between items-center w-full lg:flex lg:w-auto lg:order-1
                        text-white"
            id="mobile-menu-2"
          >
            <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
              <li>
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    `${
                      isActive ? "text-orange-700" : "text-white "
                    } block py-2 pr-4 pl-3 duration-200 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0`
                  }
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/about"
                  className={({ isActive }) =>
                    `${
                      isActive ? "text-orange-700" : "text-white"
                    } block py-2 pr-4 pl-3 duration-200 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0`
                  }
                >
                  About
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/contact"
                  className={({ isActive }) =>
                    `${
                      isActive ? "text-orange-700" : "text-white"
                    } block py-2 pr-4 pl-3 duration-200 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0`
                  }
                >
                  Contact
                </NavLink>
              </li>
              {user && user.Role === "organizer" && (
                <li>
                  <NavLink
                    to="/venue"
                    className={({ isActive }) =>
                      `${
                        isActive ? "text-orange-700" : "text-white"
                      } block py-2 pr-4 pl-3 duration-200 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0`
                    }
                  >
                    Venue
                  </NavLink>
                </li>
              )}
              {user && user.Role === "organizer" && (
                <li>
                  <NavLink
                    to="/Booking"
                    className={({ isActive }) =>
                      `${
                        isActive ? "text-orange-700" : "text-white"
                      } block py-2 pr-4 pl-3 duration-200 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0`
                    }
                  >
                    Bookings
                  </NavLink>
                </li>
              )}
              {user && user.Role === "organizer" && (
                <li>
                  <NavLink
                    to="/View_venue"
                    className={({ isActive }) =>
                      `${
                        isActive ? "text-orange-700" : "text-white"
                      } block py-2 pr-4 pl-3 duration-200 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0`
                    }
                  >
                    View Venue
                  </NavLink>
                </li>
              )}
             
              {user && user.Role === "user" && (
                <li>
                  <NavLink
                    to="/Venue_search"
                    className={({ isActive }) =>
                      `block py-2 pr-4 pl-3 duration-200 ${
                        isActive ? "text-orange-700" : "text-gray-700"
                      } border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0`
                    }
                  >
                    Venue Search
                  </NavLink>
                </li>
              )}
              {user && user.Role === "user" && (
                <li>
                  <NavLink
                    to="/View_bookings"
                    className={({ isActive }) =>
                      `block py-2 pr-4 pl-3 duration-200 ${
                        isActive ? "text-orange-700" : "text-gray-700"
                      } border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0`
                    }
                  >
                    View Bookings
                  </NavLink>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
