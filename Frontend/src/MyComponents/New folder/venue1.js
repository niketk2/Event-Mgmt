import { response } from 'express';
import db from '../index.js';
import multer from 'multer';
import path from 'path';

// Set storage engine
const storage = multer.diskStorage({
  destination: './uploads/',
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

// Init upload
const upload = multer({
  storage: storage,
  limits: { fileSize: 1000000 }, // 1MB limit
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  }
}).fields([{ name: 'VenueImage', maxCount: 1 }, { name: 'VenueCatalogue', maxCount: 1 }]);

// Check file type
function checkFileType(file, cb) {
  const filetypes = /jpeg|jpg|png|gif|pdf/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb('Error: Images and PDFs only!');
  }
}

export const venue_add = (request, response) => {
  upload(request, response, (err) => {
    if (err) {
      console.error("Error uploading file:", err);
      return response.json({ Error: "Error uploading file" });
    }

    // Check if files are present in the request
    if (!request.files['VenueImage'] || !request.files['VenueCatalogue']) {
      console.error("Files not found in request");
      return response.json({ Error: "Files not found in request" });
    }
    const currentDate = new Date();
    const formattedDate = currentDate.toISOString().split('T')[0];
    const sql = "INSERT INTO venue (VenueName,VenueCity, VenueAddress, VenueDescription, Date, VenueType, EventType, VenueCapacity, VenueFacilities, VenueContactName, VenuePhone, VenueEmail, VenuePrice, SlotType, VenueImage, VenueCatalogue) VALUES (?, ?, ? , ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
    const values = [
      request.body.VenueName,
      request.body.VenueCity,
      request.body.VenueAddress,
      request.body.VenueDescription,
      formattedDate,
      request.body.VenueType,
      request.body.EventType,
      request.body.VenueCapacity,
      request.body.VenueFacilities,
      request.body.VenueContactName,
      request.body.VenuePhone,
      request.body.VenueEmail,
      request.body.VenuePrice,
      request.body.SlotType,
      request.files['VenueImage'][0].path,
      request.files['VenueCatalogue'][0].path,
    
    ];

    db.query(sql, values, (err, data) => {
      if (err) {
        console.error("Error in Inserting Data:", err);
        return response.json({ Error: "Error in Inserting Data" });
      }
      return response.json({ Status: "SUCCESS" });
    });
  });
};



// Fetch the data

// export const user_sign = (request, response) => {
//     const sql = "SELECT * FROM users";
//     db.query(sql, (err, data) => {
//         if (err) {
//             return response.json({ Error: "Error1" });
//         }
//         return response.json(data);
//     });
// };

export const get_Venue = (request , response ) => {
    const sql = "Select * from venue ";
    db.query(sql,(err,data) =>{
        if(err){
            return response.json({Error:"Error1"});
        }
        return response.json(data);
    }) 

}

export const getVenueById = (id, response) => {
  console.log("object:", id)
  const sql = 'SELECT * FROM venue WHERE venue_id = ?';
  db.query(sql, [id], (err, data) => {
    if (err) {
      return response.json({ Error: "Error fetching venue by ID" });
    }
    return response.json(data);
  });
};


export const updateVenueById = (request, response) => {
  console.log("ello")
  upload(request, response, (err) => {
    if (err) {
      console.error("Error uploading file:", err);
      return response.json({ Error: "Error uploading file" });
    }

    // Check if files are present in the request
    // if (!request.files['VenueImage'] || !request.files['VenueCatalogue']) {
    //   console.error("Files not found in request");
    //   return response.status(404).json({ Error: "Files not found in request" });
    // }
    
    const id = request.params.venue_id; // Assuming the venue ID is passed in the URL parameters
    const updatedVenue = request.body; // Assuming the updated venue data is sent in the request body

    // Construct the SQL query to update the venue
    const sql = `UPDATE venue SET ? WHERE venue_id = ?`;

    const values = {
      VenueName: updatedVenue.venueName,
      VenueCity: updatedVenue.venueCity,
      VenueAddress: updatedVenue.venueAddress,
      VenueDescription: updatedVenue.venueDescription,
      SlotType: updatedVenue.slotType,
      VenueContactName: updatedVenue.Venuecontactname,
      VenuePhone: updatedVenue.contactPhone,
      VenueEmail: updatedVenue.contactEmail,
      VenuePrice: updatedVenue.venuePrice,
      VenueFacilities: updatedVenue.venueFacilities,
      EventType: updatedVenue.eventType,
      VenueCapacity: updatedVenue.venueCapacity,
      
      // Add other fields here
      // VenueImage: request.files['VenueImage'][0].path,
      // VenueCatalogue: request.files['VenueCatalogue'][0].path,
    };

    // Execute the update query
    db.query(sql, [values, id], (err, result) => {
      if (err) {
        console.error("Error updating venue:", err);
        return response.status(500).json({ Error: 5 });
      }

      // Check if any rows were affected by the update operation
      console.log(result);
      if (result.affectedRows === 0) {
        return response.status(404).json({ Error: "Venue not found" });
      }

      // Venue updated successfully
      return response.status(200).json({ Message: "Venue updated successfully" });
    });
  });
};

