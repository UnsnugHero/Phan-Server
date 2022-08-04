const router = require('express').Router();

const authToken = require('../middleware/index').authToken;
const validatorMiddleware = require('../middleware/validators/index');
const UserController = require('../controllers/user.controller');

router.get('/', authToken, UserController.getUser);
router.post('/create', validatorMiddleware('create_user'), UserController.createNewUser);
router.put('/:userId', [authToken, ...validatorMiddleware('update_user')], UserController.updateUser);
router.delete('/:userId', authToken, UserController.deleteUser);

module.exports = router;
