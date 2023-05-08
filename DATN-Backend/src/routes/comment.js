const express = require('express');
const router = express.Router();

const commentController = require('../app/controllers/commentController');
const middlewareController = require('../app/controllers/middlewareController');

// POST COMMENT
router.post(
  '/',
  middlewareController.verifyToken,
  commentController.createComment
);

// GET ALL
router.get(
  '/',
  middlewareController.verifyTokenAndAdminAuth,
  commentController.getAllComment
);

// GET COMMENT
router.get(
  '/find/:productId',
  middlewareController.verifyToken,
  commentController.getComment
);

router.get(
  '/findComment/:commentId',
  middlewareController.verifyToken,
  commentController.getDetail
)
// UPDATE COMMENT
router.put(
  '/:id',
  middlewareController.verifyToken,
  commentController.updateComment
);

// DELETE COMMENT
router.delete(
  '/:id',
  middlewareController.verifyToken,
  commentController.deleteComment
);

module.exports = router;
