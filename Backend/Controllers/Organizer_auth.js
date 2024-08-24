import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import db from '../index.js';

const salt = 10;



export const org_sign = (request , response) =>{
    const sql = "Select * from users";
    db.query(sql,(err,data) => {
        if(err){
            return response.json({Error:"Error1"})
        }
        return response.json(data)
    })
};


export const create_org = (request,response) =>{
    
    const sql = "INSERT INTO users (Name, Email, Password, Gender, Contact, Address , Role) VALUES (?, ?, ?, ?, ?, ?,?)";
    
    bcrypt.hash(request.body.password, salt, (err, hash) => {
        if (err) {
            console.error("Error from Hashing Password:", err);
            return response.json({ Error: "Error from Hashing Password" });
        }

            const Values = [
                request.body.org_name,
                request.body.email,
                hash,
                request.body.gender,
                request.body.contact,
                request.body.org_address,
                request.body.role
            ]
            console.log(Values[0]);
            db.query(sql,[Values],(err,data) =>{
            if(err)return response.json({Error:"Error in Inserting Data"});
             return response.json({Status : "SUCCESS"})
        // return response.json(data);
        })
    });
};

export const organizer_signin = (request,response) => {

    const { email, password } = request.body;
    const sql = 'SELECT * FROM users WHERE Email = ?';
    db.query(sql, [email], (err, data) => {
        if (err) {
            console.error("Login error:", err);
            return response.json({ Error: "Login error" });
        }
       console.log(data[0])

        if (data.length > 0) {
            bcrypt.compare(password, data[0].Password, (err, result) => {
                if (err) {
                    console.error("Password Compare error:", err);
                    return response.json({ Error: "Password Compare error" });
                }
            
                if (result) {
                    const name = data[0].name;
                    const token = jwt.sign({ name }, "jwt-secret-key", { expiresIn: '1d' });
            
                    response.cookie("token", token, { httpOnly: true, SameSite: 'None', secure: true });
            
                    const responseData = {
                        ...data[0], // Include all properties from the first element of data
                        token: token // Add the token property
                    };
                    return response.status(200).json({
                        "status": "SUCCESS",
                        data: responseData
                    });
                } else {
                    return response.json({ Error: "Password Not Matched" });
                }
            });
            
        } else {
            return response.json({ Error: "No Email Existed" });
        }

    })
};

