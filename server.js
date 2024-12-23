// server.js
const express = require('express');
const { Pool } = require('pg');

const pool = new Pool({
  user: 'uber_user',
  host: 'localhost',
  database: 'uber_clone',
  password: 'Max123456',
  port: 5432,
});

const app = express();
const port = 3000;

app.use(express.json());

app.get('/api/time', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW()');
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Database connection error:', err);
    res.status(500).send('Database connection error');
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
