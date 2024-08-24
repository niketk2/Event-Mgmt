import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import reportWebVitals from './reportWebVitals.js';

// export Switch from 'react-router-dom';
import Organizer_reg from './MyComponents/Organizer_Reg_Login/Organizer_reg.jsx';
import Organizer_login from './MyComponents/Organizer_Reg_Login/Organizer_login.jsx';
import User_reg from './MyComponents/User_Reg_Login/User_reg.jsx';
import Home from './MyComponents/Home/homee.jsx';
import Navbar  from './MyComponents/Navbar/navbar.jsx';
import User_login from './MyComponents/User_Reg_Login/User_login.jsx';
import Cards from './MyComponents/Home/Cards.jsx';
import Footer from './MyComponents/Footer/footer.jsx';
import About from './MyComponents/About/about.jsx';
import Contact from './MyComponents/Contact/contact.jsx';
import sidebar  from './MyComponents/Dasbhboard/sidebar.jsx';
import { BrowserRouter, Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
// import Venue from './MyComponents/Venue/venue.jsx';
import Dashboard  from './MyComponents/Dasbhboard/dashboard.jsx';
import Venue from './MyComponents/Organizer/venue.jsx';
import { configureStore } from '@reduxjs/toolkit';
import rootReducer from "./reducer"
import { Provider } from 'react-redux';

 export const store = configureStore({
  reducer: rootReducer
})

// const router = createBrowserRouter(
//   createRoutesFromElements(
//     <Route path='/' element={<App />}>
//       <Route path='' element={<Home />} />

//       {/* <Route path='sidebar' element={<sidebar />} /> */}
//       <Route path='Organizer_login' element = {<Organizer_login/>} />
//       <Route path = 'venue' element={<Venue/>}/>
//       <Route path='User_login' element = {<User_login/>} />
      
//       <Route path='User_reg' element = {<User_reg/>} />
//       <Route path='Organizer_reg' element = {<Organizer_reg/>} />
//     </Route>
//   )
// )

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
     <Provider store={store}>
      <BrowserRouter>
        <App/>
      </BrowserRouter>
     </Provider>
  </React.StrictMode>
);

reportWebVitals();
      {/* <Route path='venue' element={<Venue />} /> */}
      {/* <Route path='venue' element={<Ven} */}
      {/* <Route path='about' element={<About />} /> */}
      {/* <Route path='contact' element={<Contact />} /> */}