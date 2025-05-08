const Category = require('../models/Category');

// Lấy tất cả danh mục, có populate cha
exports.getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find().populate('parent');
    res.json(categories);
  } catch (err) {
    console.error('Get Categories Error:', err);
    res.status(500).json({ error: 'Server error' });
  }
};

// Tạo danh mục mới (có thể gắn vào cha hoặc để trống)
exports.createCategory = async (req, res) => {
  try {
    const { name, parent } = req.body;

    if (!name || name.trim() === '') {
      return res.status(400).json({ error: 'Tên danh mục là bắt buộc' });
    }

    const newCategory = new Category({
      name: name.trim(),
      parent: parent || null,
    });

    await newCategory.save();
    res.json(newCategory);
  } catch (err) {
    console.error('Create Category Error:', err);
    res.status(500).json({ error: 'Server error' });
  }
};
exports.deleteCategory = async (req, res) => {
    try {
      const { id } = req.params;
      await Category.findByIdAndDelete(id);
      res.json({ message: 'Xoá danh mục thành công' });
    } catch (err) {
      res.status(500).json({ error: 'Xoá danh mục thất bại' });
    }
  };
  