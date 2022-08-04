const router = require('express').Router();

const AuthController = require('../controllers/auth.controller');
const validatorMiddleware = require('../middleware/validators/index');

router.post('/login', validatorMiddleware('login'), AuthController.login);

module.exports = router;
