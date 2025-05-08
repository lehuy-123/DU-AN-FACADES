const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');





router.delete('/:id', categoryController.deleteCategory);


// GET /api/categories — lấy tất cả danh mục
router.get('/', categoryController.getAllCategories);

// POST /api/categories — tạo danh mục mới
router.post('/', categoryController.createCategory);

module.exports = router;
