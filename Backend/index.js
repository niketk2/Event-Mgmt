    import express from 'express';
    import mysql from 'mysql2';
    import cors from 'cors';
    import cookieParser from 'cookie-parser';
    import { create_user, user_sign, user_signin } from './Controllers/User_auth.js';
    import { create_org, org_sign, organizer_signin } from './Controllers/Organizer_auth.js';
    import { venue_add ,get_Venue ,delete_Venue , updateVenueById , search_Venue , get_VenueImg} from './Controllers/venue.js';
    import { book_Venue, get_Bookings , get_Bookings_org, get_prefslot , delete_bookVenue, approve_booking , cancelled_booking } from './Controllers/booking.js';
  
    const app = express();


    app.use(express.json());
    app.use(cors({
        origin: "http://localhost:3000",
        methods: ["POST", "GET" , "DELETE " , "PUT"],
        credentials: true
    }));
    app.use(cookieParser());
    // app.use("/uploads",express.static('uploads'))
    app.use('/uploads', express.static('uploads'));



    const db = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "Mysql@#@123",
        database: "event_manag_sys"
    });
    export default db;
    db.connect((err) => {
        if (err) {
            
            console.error('Database connection failed:', err.stack);
            return;
        }

        console.log('Connected to database.');
    });

    // Registration of Organizer
    app.get('/Organizer_reg', org_sign);

    // Insertion of organizer
    app.post('/Organizer_reg', create_org);


    app.post("/organizer_auth", organizer_signin);

    // Registration User
    app.get('/User_reg', user_sign);

    // Insertion of User
    app.post('/User_reg', create_user);

    // user signin
    app.post("/user_auth", user_signin);


    // Venue Addition
    app.post("/venue_insert",venue_add);


    // Venue fetch
    app.post("/venue_fetch",get_Venue);

    // // Venue Update
    // app.put("/venue_update/:venue_id",update_Venue);
    app.put("/updateVenueById/:id", (req, res) => {
        const id = req.params.id; // Extract id from URL params
        updateVenueById(req, res); // Call updateVenueById function with request, response objects
    });
    // Venue delete
    app.delete('/venue_delete/:venue_id',delete_Venue);


    // Search venues
    app.get("/venue_search",search_Venue);

    // fetching image
    // app.get('/uploads', get_VenueImg);

    app.get('/uploads/:venue_id', get_VenueImg);


    // Book Venue
    app.post('/venue_book',book_Venue);

    // Fetch Book Venue User
    app.post('/booking_venue',get_Bookings);

    //fetch Book Venue by org
    app.post('/booking_venueorg',get_Bookings_org);

    // app.put('/book_venuedelete/:booking_id',delete_bookVenue);
    
    // fetch available slots
    app.post('/pref_slot',get_prefslot)
// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


// app.put("/approve_booking/:bookingId", async (req, res) => {
//     try {
//       const bookingId = req.params.bookingId;
//       // Assuming your Booking model has a method to update the status
//       const updatedBooking = await Booking.updateStatus(bookingId, "approved");
//       res.json({ success: true, booking: updatedBooking });
//     } catch (err) {
//       console.error("Error approving booking:", err);
//       res.status(500).json({ success: false, message: "Failed to approve booking" });
//     }
//   });
  
    // approve booking
    app.put("/booking_approve/:booking_id",approve_booking);

    // cancel booking
    app.put("/cancelled_booking/:booking_id",cancelled_booking);


    app.listen(3001, () => {
        console.log("Server is Running");
    });
