const express = require('express');
const { createBlog, getBlogs, deleteBlog } = require('../controllers/blogController');
const authMiddleware = require('../middleware/auth');
const router = express.Router();

router.post('/', authMiddleware, createBlog);
router.get('/', getBlogs);
router.delete('/:id', authMiddleware, deleteBlog);

module.exports = router;