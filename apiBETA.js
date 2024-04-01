const express = require('express');
const { Pool } = require('pg');
const cors = require('cors'); // Import the cors middleware

const app = express();
const port = 3001;

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'March',
  password: 'Griz2015!',
  port: 5432,
});

// Use the cors middleware
app.use(cors());

app.get('/', (req, res) => {
    res.send('Welcome to the API!');
});

app.get('/api/data', async (req, res) => {
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT * FROM paidMarchBETA');
    const data = result.rows;
    client.release();
    res.json(data);
  } catch (err) {
    console.error('Error executing query', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
