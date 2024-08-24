import { Routes, Route } from 'react-router-dom';
import Home from './MyComponents/Home/homee';
import Navbar from './MyComponents/Navbar/navbar';
import User_reg from './MyComponents/User_Reg_Login/User_reg';
import User_login from './MyComponents/User_Reg_Login/User_login';
import About from './MyComponents/About/about';
import Contact from './MyComponents/Contact/contact';
import Error from './MyComponents/Error/error';
import Booking from './MyComponents/Organizer/Booking';
import Venue_search from './MyComponents/Users/Venue_search';
import View_bookings from './MyComponents/Users/View_bookings';
import Footer from './MyComponents/Footer/footer';
import { useSelector } from 'react-redux';
import { PrivateRoute } from './MyComponents/auth/PrivateRoute';
import Venue from './MyComponents/Organizer/venue';

// import view_venue from './MyComponents/Organizer/View_venue';
// import view_venue from './MyComponents/Organizer/view_venue';
// import View_venue from './MyComponents/Organizer/View_venue';
import View_venue from './MyComponents/Organizer/View_venue';
import UpdateVenue from './MyComponents/Organizer/UpdateVenue';

function App() {
  const { user } = useSelector((state) => state.profile);

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/User_reg" element={<User_reg />} />
        <Route path="/User_login" element={<User_login />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<Error />} />
        {
          user && user.Role === "organizer" && <>
            <Route path="/venue" element={<PrivateRoute><Venue /></PrivateRoute>} />
            <Route path="/View_venue" element={<PrivateRoute><View_venue/></PrivateRoute>}/>
            <Route path="/Booking" element={<PrivateRoute><Booking /></PrivateRoute>} />
            <Route path="/Update_venue" element={<PrivateRoute>< UpdateVenue/></PrivateRoute>} />
            {/* <Route path="/View_bookings" element={<PrivateRoute><View_bookings /></PrivateRoute>} /> */}
          </>
        }
         {
          user && user.Role === "user" && <>
            {/* <Route path="/Venue_search" element={<PrivateRoute><Venue_search /></PrivateRoute>} /> */}
            <Route path="/Venue_search" element={<PrivateRoute><Venue_search /></PrivateRoute>} />
            <Route path="/View_bookings" element={<PrivateRoute><View_bookings /></PrivateRoute>} />
          </>
        }
      </Routes>
      {/* <Footer /> */}
    </>
  );
}

export default App;
