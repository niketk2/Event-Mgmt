// import React from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { setUser } from '../../Slices/profileSlice';
// import { useNavigate } from 'react-router-dom';

// const Logout = () => {
//   const { user } = useSelector((state) => state.profile);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     localStorage.removeItem('user');
//     dispatch(setUser(null));
//     navigate('/User_login');
//   };

//   // Call handleLogout when component mounts
//   React.useEffect(() => {
//     handleLogout();
//   }, []);

//   // This component doesn't need to render anything
//   return null;
// }

// export default Logout;
