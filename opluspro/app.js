import express from 'express';
import cors from 'cors';
import sqlite3 from 'sqlite3';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import path from 'path'; // Imported at the top for static file serving

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Database connection
const db = new sqlite3.Database(join(__dirname, 'oplus.db'), (err) => {
  if (err) {
    console.error('Error connecting to the database:', err.message);
  } else {
    console.log('Connected to the SQLite database.');
  }
});

// API Routes
// Users
app.get('/api/users', (req, res) => {
  db.all('SELECT * FROM Users', [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

// Appointments
app.get('/api/appointments', (req, res) => {
  db.all('SELECT * FROM Appointments', [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

app.post('/api/appointments', (req, res) => {
  const { patient_id, doctor_id, appointment_date, appointment_time } = req.body;
  db.run(
    'INSERT INTO Appointments (patient_id, doctor_id, appointment_date, appointment_time, status) VALUES (?, ?, ?, ?, ?)',
    [patient_id, doctor_id, appointment_date, appointment_time, 'scheduled'],
    function (err) {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json({ id: this.lastID });
    }
  );
});

// Medical Records
app.get('/api/medical-records', (req, res) => {
  db.all('SELECT * FROM MedicalRecords', [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

// Messages
app.get('/api/messages', (req, res) => {
  db.all('SELECT * FROM Messages', [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

app.post('/api/messages', (req, res) => {
  const { sender_id, receiver_id, message_content } = req.body;
  db.run(
    'INSERT INTO Messages (sender_id, receiver_id, message_content) VALUES (?, ?, ?)',
    [sender_id, receiver_id, message_content],
    function (err) {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json({ id: this.lastID });
    }
  );
});

// Complaints
app.post('/api/complaints', (req, res) => {
  const { patient_id, complaint_text } = req.body;
  db.run(
    'INSERT INTO Complaints (patient_id, complaint_text, status) VALUES (?, ?, ?)',
    [patient_id, complaint_text, 'submitted'],
    function (err) {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json({ id: this.lastID });
    }
  );
});

// Serve static files from the React app in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'build')));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
  });
}

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
