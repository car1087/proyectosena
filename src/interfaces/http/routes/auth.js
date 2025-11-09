const express = require('express');
const AuthController = require('../controllers/authController');
const MysqlUserRepository = require('../../../infrastructure/repositories/mysqlUserRepository');

const router = express.Router();
const userRepository = new MysqlUserRepository();
const authController = new AuthController(userRepository);

router.post('/login', (req, res) => authController.login(req, res));
router.post('/register', (req, res) => authController.register(req, res));

module.exports = router;