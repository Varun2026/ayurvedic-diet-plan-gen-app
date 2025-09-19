// // Import required packages
// const express = require('express');
// const cors = require('cors');
// require('dotenv').config();

// // Initialize the app
// const app = express();
// const port = process.env.PORT || 5000;

// // Middleware
// app.use(cors());
// app.use(express.json());

// // A simple test route
// app.get('/', (req, res) => {
//   res.send('Ayurveda Diet App Backend is running!');
// });

// // Start the server
// app.listen(port, () => {
//   console.log(`Server is running on port: ${port}`);
// });

// Import required packages
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose'); // Import Mongoose
require('dotenv').config();

// Initialize the app
const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// --- DATABASE CONNECTION ---
// If the ATLAS_URI is defined in .env, use it. Otherwise, use the local DB.
const uri = process.env.ATLAS_URI || 'mongodb://127.0.0.1:27017/ayurvedaDB';

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
});
// -------------------------

// A simple test route
app.get('/', (req, res) => {
  res.send('Ayurveda Diet App Backend is running!');
});

// --- API ROUTES ---
const userRouter = require('./routes/user.route');
app.use('/api/users', userRouter);
// ------------------

const patientRouter = require('./routes/patient.route');
app.use('/api/patients', patientRouter);

const foodItemRouter = require('./routes/foodItem.route');
app.use('/api/foods', foodItemRouter);

const dietPlanRouter = require('./routes/dietPlan.route');
app.use('/api/diet-plans', dietPlanRouter);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});

"68cb7ee786f3b519281bb97e"