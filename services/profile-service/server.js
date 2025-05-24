const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

// Routes
const profileRoutes = require('./routes/profiles');
app.use('/api/profiles', profileRoutes);

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Profile Service MongoDB connected'))
  .catch(err => console.log(err));

const PORT = process.env.PORT || 3004;
app.listen(PORT, () => console.log(`Profile Service running on port ${PORT}`));