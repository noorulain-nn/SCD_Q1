const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

// Routes
const commentRoutes = require('./routes/comments');
app.use('/api/comments', commentRoutes);

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Comment Service MongoDB connected'))
  .catch(err => console.log(err));

const PORT = process.env.PORT || 3003;
app.listen(PORT, () => console.log(`Comment Service running on port ${PORT}`));