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

app.post('/api/users', async (req, res) => {
  try {
    const { name, email, clerkId } = req.body;

    if (!name || !email || !clerkId) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const result = await pool.query(
      'INSERT INTO users (name, email, clerk_id) VALUES ($1, $2, $3) RETURNING *',
      [name, email, clerkId],
    );

    res.status(201).json({ data: result.rows[0] });
  } catch (error) {
    console.error('Error creating user:', error);

    if (error.code === '23505') {
      return res
        .status(409)
        .json({ error: 'User with this email or clerkId already exists' });
    }

    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
