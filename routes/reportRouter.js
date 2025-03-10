const express = require('express');
const reportCtrl = require('../controllers/reportCtrl')
const auth = require('../middleware/auth');

const router = express.Router();

// Crear un reporte
router.post('/reports', auth, reportCtrl.createReport);

// Obtener todos los reportes
router.get('/reports', auth, reportCtrl.getReports);

// Eliminar un reporte por su ID
router.delete('/reports/:id', auth, reportCtrl.deleteReport);

module.exports = router;