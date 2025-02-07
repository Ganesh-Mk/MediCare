const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(cors());

// MongoDB Connection
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

const getAIResponse = require("./routes/getAIResponse");
const signup = require("./routes/signup");
const login = require("./routes/login");

app.get('/', (req, res) => {
  res.send('Welcome to Express.js Server!');
});

app.use(getAIResponse)
app.use(signup)
app.use(login)

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
