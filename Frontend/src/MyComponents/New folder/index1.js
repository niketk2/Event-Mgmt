import express from 'express';
import mysql from 'mysql2';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { create_user, user_sign, user_signin } from './Controllers/User_auth.js';
import { create_org, org_sign, organizer_signin } from './Controllers/Organizer_auth.js';
import { venue_add ,get_Venue, getVenueById } from './Controllers/venue.js';
import { updateVenueById } from './Controllers/venue.js';
import multer from 'multer';
import path from 'path';
const app = express();

// Set storage engine
// const storage = multer.diskStorage({
//     destination: './uploads/',
//     filename: function (req, file, cb) {
//       cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
//     }
//   });

//   // Init upload
// const upload = multer({
//     storage: storage,
//     limits: { fileSize: 1000000 }, // 1MB limit
//     fileFilter: function (req, file, cb) {
//       checkFileType(file, cb);
//     }
//   }).single('venueImage');

//   // Check file type
// function checkFileType(file, cb) {
//     // Allowed ext
//     const filetypes = /jpeg|jpg|png|gif/;
//     // Check ext
//     const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
//     // Check mime
//     const mimetype = filetypes.test(file.mimetype);
  
//     if (mimetype && extname) {
//       return cb(null, true);
//     } else {
//       cb('Error: Images only!');
//     }
//   }






app.use(express.json());
app.use(cors({
    origin: "http://localhost:3000",
    methods: ["POST", "GET" , "PUT"],
    credentials: true
}));
app.use(cookieParser());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "sarvesh@123",
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

// Fetch venue by Id
app.get("/getVenueById/:id", (req, res) => {
    const id = req.params.id; // Extract id from URL params
    getVenueById(id, res); // Call getVenueById function with id and response object
});

// Venue fetch
app.get("/venue_fetch",get_Venue);

// Update venue by Id
app.put("/updateVenueById/:id", (req, res) => {
    const id = req.params.id; // Extract id from URL params
    updateVenueById(req, res); // Call updateVenueById function with request, response objects
});
  

app.listen(3001, () => {
    console.log("Server is Running");
});
