import { Router } from 'express';

import { authToken } from '../middleware/index.js';
import { RequestController } from '../controllers/index.js';
import { validatorMiddleware } from '../middleware/index.js';

const router = Router();

router.get('/:requestId', RequestController.getRequest);
router.post('/create', [authToken, ...validatorMiddleware('create_request')], RequestController.createRequest);
this._router.put('/:requestId', [authToken, ...validatorMiddleware('update_request')], RequestController.updateRequest);
this._router.delete('/:requestId', authToken, RequestController.deleteRequest);
this._router.post('/search', validatorMiddleware('search_request'), RequestController.searchRequests);

this._router.put('/like/:requestId', authToken, RequestController.likeRequest);
this._router.put('/unlike/:requestId', authToken, RequestController.unlikeRequest);

this._router.post(
  '/comment/:requestId',
  [authToken, ...validatorMiddleware('post_comment')],
  RequestController.postComment
);
this._router.put(
  '/comment/:requestId/:commentId',
  [authToken, ...validatorMiddleware('update_comment')],
  RequestController.updateComment
);
this._router.delete('/comment/:requestId/:commentId', authToken, RequestController.deleteComment);

export default router;
