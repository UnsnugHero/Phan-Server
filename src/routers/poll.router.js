const router = require('express').Router();

const authRole = require('../middleware/index').authRole;
const authToken = require('../middleware/index').authToken;
const PollController = require('../controllers/poll.controller');

router.get('/', PollController.getCurrentPoll);
router.post('/create', [authToken, authRole], PollController.createNewPoll);
router.put('/archive/:pollId', [authToken, authRole], PollController.archivePoll);
router.put('/vote/yes/:pollId', [authToken], PollController.voteYesPoll);
router.put('/vote/no/:pollId', [authToken], PollController.voteNoPoll);

module.exports = router;
