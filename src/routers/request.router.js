import { Router } from 'express';

import { authToken } from '../middleware/index.js';
import { RequestController } from '../controllers/index.js';
import { validatorMiddleware } from '../middleware/validators/index.js';

const router = Router();

router.get('/:requestId', RequestController.getRequest);
router.post('/create', [authToken, ...validatorMiddleware('create_request')], RequestController.createRequest);
router.put('/:requestId', [authToken, ...validatorMiddleware('update_request')], RequestController.updateRequest);
router.delete('/:requestId', authToken, RequestController.deleteRequest);
router.post('/search', validatorMiddleware('search_request'), RequestController.searchRequests);

router.put('/like/:requestId', authToken, RequestController.likeRequest);
router.put('/unlike/:requestId', authToken, RequestController.unlikeRequest);

router.post('/comment/:requestId', [authToken, ...validatorMiddleware('post_comment')], RequestController.postComment);
router.put(
  '/comment/:requestId/:commentId',
  [authToken, ...validatorMiddleware('update_comment')],
  RequestController.updateComment
);
router.delete('/comment/:requestId/:commentId', authToken, RequestController.deleteComment);

export default router;
