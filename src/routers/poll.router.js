import { Router } from 'express';

import { authRole, authToken } from '../middleware/index.js';
import { PollController } from '../controllers/index.js';

const router = Router();

router.get('/', PollController.getCurrentPoll);
router.post('/create', [authToken, authRole], PollController.createNewPoll);
router.put('/archive/:pollId', [authToken, authRole], PollController.archivePoll);
router.put('/vote/yes/:pollId', [authToken], PollController.voteYesPoll);
router.put('/vote/no/:pollId', [authToken], PollController.voteNoPoll);
