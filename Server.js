const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

// 🔹 Middleware
app.use(express.json());
app.use(cors());

// 🔹 Import Routes
const bookRoutes = require('./routes/bookRoutes');
const authorRoutes = require('./routes/authorRoutes');
const studentRoutes = require('./routes/studentRoutes');
const attendantRoutes = require('./routes/attendantRoutes');

// 🔹 Use Routes
app.use('/api/books', bookRoutes);
app.use('/api/authors', authorRoutes);
app.use('/api/students', studentRoutes);
app.use('/api/attendants', attendantRoutes);

// 🔹 Root Route
app.get('/', (req, res) => {
  res.send('Library API is running...');
});

// 🔹 MongoDB Connection
mongoose.connect('mongodb://127.0.0.1:27017/libraryDB')
  .then(() => {
    console.log('MongoDB Connected');
    app.listen(3000, () => {
      console.log('Server running on port 3000');
    });
  })
  .catch((err) => {
    console.error(err);
  });