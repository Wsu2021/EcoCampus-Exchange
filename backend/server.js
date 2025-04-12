const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Database Connection
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD
});

// Create the database if it does not exist
db.connect((err) => {
    if (err) {
        console.error('Database connection failed:', err.stack);
        return;
    }
    console.log('Connected to MySQL server.');

    db.query(`CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME}`, (err) => {
        if (err) {
            console.error('Database creation failed:', err.stack);
            return;
        }
        console.log('Database created or already exists.');

        // Connect to the database
        db.changeUser({ database: process.env.DB_NAME }, (err) => {
            if (err) {
                console.error('Database switch failed:', err.stack);
                return;
            }
            console.log('Connected to the database.');

            // Create the users table if it does not exist
            const createUserTable = `
                CREATE TABLE IF NOT EXISTS users (
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    username VARCHAR(255) NOT NULL UNIQUE,
                    password VARCHAR(255) NOT NULL,
                    email VARCHAR(255) NOT NULL UNIQUE,
                    fullName VARCHAR(255) NOT NULL,
                    address VARCHAR(255) NOT NULL,
                    phoneNumber VARCHAR(255) NOT NULL
                )
            `;
            db.query(createUserTable, (err) => {
                if (err) {
                    console.error('Table creation failed:', err.stack);
                    return;
                }
                console.log('Users table created or already exists.');
            });
        });
    });
});

// Routes
app.use('/api/users', userRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

module.exports = db; // Export the database connection
