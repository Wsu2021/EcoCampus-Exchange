const db = require('../server'); // Import the database connection
const bcrypt = require('bcryptjs');

const createUserTable = () => {
    const sql = `
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
    db.query(sql, (err) => {
        if (err) throw err;
    });
};

createUserTable();

const User = {
    create: (userData) => {
        const { username, password, email, fullName, address, phoneNumber } = userData;
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(password, salt);
        const sql = 'INSERT INTO users (username, password, email, fullName, address, phoneNumber) VALUES (?, ?, ?, ?, ?, ?)';
        return new Promise((resolve, reject) => {
            db.query(sql, [username, hashedPassword, email, fullName, address, phoneNumber], (err, result) => {
                if (err) reject(err);
                else resolve(result);
            });
        });
    },
    findByUsername: (username) => {
        const sql = 'SELECT * FROM users WHERE username = ?';
        return new Promise((resolve, reject) => {
            db.query(sql, [username], (err, result) => {
                if (err) reject(err);
                else resolve(result[0]);
            });
        });
    }
};

module.exports = User;
