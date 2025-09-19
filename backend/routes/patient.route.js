const express = require('express');
const router = express.Router();
const { createPatient, getAllPatients } = require('../controllers/patient.controller');

// GET all patients
router.get('/', getAllPatients);

// POST a new patient
router.post('/add', createPatient);

module.exports = router;