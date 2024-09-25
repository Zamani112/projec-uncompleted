import express from 'express';
import sqlite3 from 'sqlite3';
import cors from 'cors';

const app = express();
app.use(cors());

const db = new sqlite3.Database('./database/oplus.db', (err) => {
  if (err) console.error(`Error opening database: ${err.message}`);
  else console.log('Connected to the oplus SQLite database.');
});

app.get('/test-connection', async (req, res) => {
  try {
    console.log('Test connection route hit');
    const rows = await db.all("SELECT name FROM sqlite_master WHERE type='table';");
    res.json({ tables: rows });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(5000, () => {
  console.log('Server is running on port 5000');
});