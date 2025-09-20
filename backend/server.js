const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

// Initialize the app
const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// --- DATABASE CONNECTION ---
const uri = process.env.ATLAS_URI || 'mongodb://127.0.0.1:27017/ayurvedaDB';
mongoose.connect(uri);
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
});
// -------------------------

// --- API ROUTES ---
const userRouter = require('./routes/user.route');
app.use('/api/users', userRouter);

const patientRouter = require('./routes/patient.route');
app.use('/api/patients', patientRouter);

const foodItemRouter = require('./routes/foodItem.route');
app.use('/api/foods', foodItemRouter);

const dietPlanRouter = require('./routes/dietPlan.route');
app.use('/api/diet-plans', dietPlanRouter);

const doctorRouter = require('./routes/doctor.route');
app.use('/api/doctors', doctorRouter);

const appointmentRouter = require('./routes/appointment.route');
app.use('/api/appointments', appointmentRouter);

const messageRouter = require('./routes/message.route');
app.use('/api/messages', messageRouter);

// A simple test route
app.get('/', (req, res) => {
  res.send('Ayurveda Diet App Backend is LIVE!');
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
