const router = require('express').Router();

router.use('/auth', require('./auth.router'));
router.use('/user', require('./user.router'));
router.use('/requests', require('./request.router'));
router.use('/poll', require('./poll.router'));
router.use('/comments', require('./comment.router'));

module.exports = router;
