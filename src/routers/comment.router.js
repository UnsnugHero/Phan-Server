const router = require('express').Router();

const authToken = require('../middleware/index').authToken;
const CommentController = require('../controllers/comment.controller');

router.post('/post', authToken, CommentController.postGeneralComment);

module.exports = router;
