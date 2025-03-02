const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();
const dotenv = require('dotenv');
dotenv.config();

// Middleware
app.use(express.json());
app.use(cors());

// MongoDB Connection
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Routes
app.use(require("./routes/root"))
app.use(require("./routes/signup"))
app.use(require("./routes/login"))
app.use(require("./routes/getAIResponse"))

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


