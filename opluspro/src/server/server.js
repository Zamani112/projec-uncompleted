const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const bcrypt = require('bcrypt');
const helmet = require('helmet');

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(helmet());

// Database connection
const db = new sqlite3.Database(path.join(__dirname, '..', '..', 'oplus.db'), (err) => {
  if (err) {
    console.error('Error connecting to the database:', err.message);
  } else {
    console.log('Connected to the SQLite database.');
  }
});

// Hash password
function hashPassword(password) {
  const salt = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(password, salt);
}

// Validate user input
function validateUserInput(data) {
  if (!data.username || !data.password) {
    return false;
  }
  return true;
}

// API Routes

// Users
app.get('/api/users', (req, res) => {
  db.all('SELECT * FROM Users', [], (err, rows) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to retrieve users' });
      return;
    }
    res.json(rows);
  });
});

// Appointments
app.get('/api/appointments', (req, res) => {
  db.all('SELECT * FROM Appointments', [], (err, rows) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to retrieve appointments' });
      return;
    }
    res.json(rows);
  });
});

app.post('/api/appointments', (req, res) => {
  const { patient_id, doctor_id, appointment_date, appointment_time } = req.body;
  if (!patient_id || !doctor_id || !appointment_date || !appointment_time) {
    res.status(400).json({ error: 'Invalid request data' });
    return;
  }
  db.run(
    'INSERT INTO Appointments (patient_id, doctor_id, appointment_date, appointment_time, status) VALUES (?, ?, ?, ?, ?)',
    [patient_id, doctor_id, appointment_date, appointment_time, 'scheduled'],
    function (err) {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to create appointment' });
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
      console.error(err);
      res.status(500).json({ error: 'Failed to retrieve medical records' });
      return;
    }
    res.json(rows);
  });
});

// Messages
app.get('/api/messages', (req, res ) => {
  db.all('SELECT * FROM Messages', [], (err, rows) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to retrieve messages' });
      return;
    }
    res.json(rows);
  });
});

app.post('/api/messages', (req, res) => {
  const { sender_id, receiver_id, message_content } = req.body;
  if (!sender_id || !receiver_id || !message_content) {
    res.status(400).json({ error: 'Invalid request data' });
    return;
  }
  db.run(
    'INSERT INTO Messages (sender_id, receiver_id, message_content) VALUES (?, ?, ?)',
    [sender_id, receiver_id, message_content],
    function (err) {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to create message' });
        return;
      }
      res.json({ id: this.lastID });
    }
  );
});

// Complaints
app.post('/api/complaints', (req, res) => {
  const { patient_id, complaint_text } = req.body;
  if (!patient_id || !complaint_text) {
    res.status(400).json({ error: 'Invalid request data' });
    return;
  }
  db.run(
    'INSERT INTO Complaints (patient_id, complaint_text, status) VALUES (?, ?, ?)',
    [patient_id, complaint_text, 'submitted'],
    function (err) {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to create complaint' });
        return;
      }
      res.json({ id: this.lastID });
    }
  );
});

// Login
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  if (!validateUserInput(req.body)) {
    res.status(400).json({ error: 'Invalid request data' });
    return;
  }
  db.get('SELECT * FROM Users WHERE username = ?', [username], (err, row) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to authenticate user' });
      return;
    }
    if (!row) {
      res.status(401).json({ error: 'Invalid username or password' });
      return;
    }
    // Compare the provided password with the stored hash
    if (!bcrypt.compareSync(password, row.password)) {
      res.status(401).json({ error: 'Invalid username or password' });
      return;
    }
    // If the user is authenticated, set a session or token
    req.session.userId = row.id;
    res.json({ message: 'Logged in successfully' });
  });
});

app.get('/tables', (req, res) => {
  console.log('Received request to /tables');
  db.all('SELECT name FROM sqlite_master WHERE type="table"', (err, rows) => {
    // ...
  });
});

// Serve static files from the React app in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '..', '..', 'build')));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', '..', 'build', 'index.html'));
  });
}

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});