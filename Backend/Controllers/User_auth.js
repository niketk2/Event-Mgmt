import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import db from '../index.js';


const salt = 10;

export const user_sign = (request, response) => {
    const sql = "SELECT * FROM users";
    db.query(sql, (err, data) => {
        if (err) {
            return response.json({ Error: "Error1" });
        }
        return response.json(data);
    });
};

export const create_user = (request, response) => {
    const sql = "INSERT INTO users (Name, Email, Password, Gender, Contact, Address , Role) VALUES (?, ?, ?, ?, ?, ?,?)";
    
    bcrypt.hash(request.body.password, salt, (err, hash) => {
        if (err) {
            console.error("Error from Hashing Password:", err);
            return response.json({ Error: "Error from Hashing Password" });
        }

        const values = [
            request.body.user_name,
            request.body.email,
            hash,
            request.body.gender,
            request.body.contact,
            request.body.user_address,
            request.body.role
        ];
        console.log(values);
        db.query(sql, values, (err, data) => {
            if (err) {
                console.error("Error in Inserting Data:", err);
                return response.json({ Error: "Error in Inserting Data" });
            }
            return response.json({ Status: "SUCCESS" });
        });
    });
};

export const user_signin = (request, response) => {
    const { email, password } = request.body;
    const sql = 'SELECT * FROM users WHERE Email = ?';
    db.query(sql, [email], (err, data) => {
        if (err) {
            console.error("Login error:", err);
            return response.json({ Error: "Login error" });
        }
       console.log("DATA:", data)

        if (data.length > 0) {
            bcrypt.compare(password, data[0].Password, (err, result) => {
                // console.log(password,data[0].password.toString());
                if (err) {
                    console.error("Password Compare error:", err);
                    return response.json({ Error: "Password Compare error" });
                }
                if (result) {
                    const name = data[0].name;
                    const token = jwt.sign({ name }, "jwt-secret-key", { expiresIn: '1d' });
                    console.log(response)
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
    });
};
