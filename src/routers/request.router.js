const router = require('express').Router();

const authToken = require('../middleware/index').authToken;
const validatorMiddleware = require('../middleware/validators/index');
const RequestController = require('../controllers/request.controller');

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

module.exports = router;
