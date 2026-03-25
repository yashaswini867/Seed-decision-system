const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = 3000;
const DATA_FILE = path.join(__dirname, 'data.json');
const LOGINS_FILE = path.join(__dirname, 'logins.json');
const USERS_FILE = path.join(__dirname, 'users.json');

app.use(cors());
app.use(express.json());

// Ensure data.json exists
if (!fs.existsSync(DATA_FILE)) {
    fs.writeFileSync(DATA_FILE, '[]');
}

// Ensure logins.json exists
if (!fs.existsSync(LOGINS_FILE)) {
    fs.writeFileSync(LOGINS_FILE, '[]');
}

// Ensure users.json exists
if (!fs.existsSync(USERS_FILE)) {
    fs.writeFileSync(USERS_FILE, '[]');
}

app.post('/login', (req, res) => {
    try {
        const { aadhaar } = req.body;
        if (!aadhaar) return res.status(400).json({ message: 'Aadhaar required' });

        const timestamp = new Date().toISOString();
        
        // Handle unique users
        const rawUsers = fs.readFileSync(USERS_FILE);
        const users = JSON.parse(rawUsers);
        let isNewUser = false;
        
        if (!users.includes(aadhaar)) {
            isNewUser = true;
            users.push(aadhaar);
            fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
        }

        // Handle login history
        const rawLogins = fs.readFileSync(LOGINS_FILE);
        const logins = JSON.parse(rawLogins);

        logins.push({ aadhaar, timestamp });
        fs.writeFileSync(LOGINS_FILE, JSON.stringify(logins, null, 2));

        res.status(200).json({ message: 'Login successful', isNewUser });
    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

app.post('/save-data', (req, res) => {
    try {
        const newData = req.body;
        newData.timestamp = new Date().toISOString();

        // Read existing data
        const rawData = fs.readFileSync(DATA_FILE);
        const data = JSON.parse(rawData);

        // Append new data
        data.push(newData);

        // Save back to file
        fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));

        res.status(200).json({ message: 'Data saved successfully' });
    } catch (error) {
        console.error('Error saving data:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

app.listen(PORT, () => {
    console.log(`Backend server running at http://localhost:${PORT}`);
});
