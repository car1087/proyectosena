const express = require('express');
const DashboardController = require('../controllers/dashboardController');
const DashboardRepository = require('../../../infrastructure/repositories/dashboardRepository');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();
const dashboardRepository = new DashboardRepository();
const dashboardController = new DashboardController(dashboardRepository);

// Proteger todas las rutas del dashboard con el middleware de autenticación
router.use(authMiddleware);

// Rutas de información médica
router.get('/informacion-medica', 
    (req, res) => dashboardController.getInformacionMedica(req, res)
);

router.post('/informacion-medica', 
    (req, res) => dashboardController.updateInformacionMedica(req, res)
);

// Rutas de contactos de emergencia
router.get('/contactos-emergencia', 
    (req, res) => dashboardController.getContactosEmergencia(req, res)
);

module.exports = router;