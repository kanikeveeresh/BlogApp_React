const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');

router.post('/create', postController.createPost);
router.get('/', postController.getAllPosts);
router.post('/dashboard', postController.getUserPosts);
router.get('/:slug', postController.getPost);
router.put('/:slug', postController.updatePost);
router.delete('/:slug', postController.deletePost);

module.exports = router;
