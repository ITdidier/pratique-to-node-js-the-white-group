const express = require('express');
const mysql = require('mysql2');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Database connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'propertymanagement_db'
});

// Connect to MySQL
db.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        return;
    }
    console.log('Connected to MySQL database');
});

// GET all properties
app.get('/property', (req, res) => {
    const query = 'SELECT * FROM property';
    db.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching properties:', err);
            return res.status(500).json({ error: 'Internal server error' });
        }
        res.json(results);
    });
});

// GET property by ID
app.get('/property/:id', (req, res) => {
    const { id } = req.params;
    const query = 'SELECT * FROM property WHERE property_id = ?';
    db.query(query, [id], (err, results) => {
        if (err) {
            console.error('Error fetching property:', err);
            return res.status(500).json({ error: 'Internal server error' });
        }
        if (results.length === 0) {
            return res.status(404).json({ message: 'Property not found' });
        }
        res.json(results[0]);
    });
});

// GET all tenants
app.get('/tenants', (req, res) => {
    const query = 'SELECT * FROM tenants';
    db.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching tenants:', err);
            return res.status(500).json({ error: 'Internal server error' });
        }
        res.json(results);
    });
});

// GET tenant by ID
app.get('/tenants/:id', (req, res) => {
    const { id } = req.params;
    const query = 'SELECT * FROM tenants WHERE tenant_id = ?';
    db.query(query, [id], (err, results) => {
        if (err) {
            console.error('Error fetching tenant:', err);
            return res.status(500).json({ error: 'Internal server error' });
        }
        if (results.length === 0) {
            return res.status(404).json({ message: 'Tenant not found' });
        }
        res.json(results[0]);
    });
});

// GET all leases
app.get('/leases', (req, res) => {
    const query = 'SELECT * FROM leases';
    db.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching leases:', err);
            return res.status(500).json({ error: 'Internal server error' });
        }
        res.json(results);
    });
});

// GET lease by ID
app.get('/leases/:id', (req, res) => {
    const { id } = req.params;
    const query = 'SELECT * FROM leases WHERE lease_id = ?';
    db.query(query, [id], (err, results) => {
        if (err) {
            console.error('Error fetching lease:', err);
            return res.status(500).json({ error: 'Internal server error' });
        }
        if (results.length === 0) {
            return res.status(404).json({ message: 'Lease not found' });
        }
        res.json(results[0]);
    });
});


app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});

