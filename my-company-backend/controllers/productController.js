const Product = require('../models/Product');
const Category = require('../models/category');

exports.getAllProducts = async (req, res) => {
  try {
    const { category } = req.query;
    let filter = {};

    if (category) {
      const selectedCategory = await Category.findById(category).populate('parent');
      if (!selectedCategory) {
        return res.status(404).json({ error: 'Category not found' });
      }

      if (!selectedCategory.parent) {
        const childCategories = await Category.find({ parent: selectedCategory._id });
        const categoryIds = [selectedCategory._id, ...childCategories.map(c => c._id)];
        filter.category = { $in: categoryIds };
      } else {
        filter.category = selectedCategory._id;
      }
    }

    const products = await Product.find(filter).populate({
      path: 'category',
      populate: { path: 'parent' }
    });
    res.json(products);
  } catch (err) {
    console.error('Get All Products Error:', err);
    res.status(500).json({ error: 'Server error' });
  }
};

exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate({
      path: 'category',
      populate: { path: 'parent' }
    });
    if (!product) return res.status(404).json({ error: 'Product not found' });
    res.json(product);
  } catch (err) {
    console.error('Get Product By ID Error:', err);
    res.status(500).json({ error: 'Server error' });
  }
};

exports.createProduct = async (req, res) => {
  try {
    const { name, shortDesc, price, category, views, sales, rating, seoScore } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : '';

    const newProduct = new Product({
      name,
      shortDesc,
      price: Number(price),
      image,
      category: category || null,
      views: Number(views) || 0,
      sales: Number(sales) || 0,
      rating: Number(rating) || 0,
      seoScore: Number(seoScore) || 0,
    });

    await newProduct.save();
    const populatedProduct = await Product.findById(newProduct._id).populate({
      path: 'category',
      populate: { path: 'parent' }
    });

    res.json(populatedProduct);
  } catch (err) {
    console.error('Create Product Error:', err);
    res.status(500).json({ error: 'Server error' });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const { name, shortDesc, price, category, views, sales, rating, seoScore } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : undefined;

    const updatedFields = {
      name,
      shortDesc,
      price: Number(price),
      views: Number(views) || 0,
      sales: Number(sales) || 0,
      rating: Number(rating) || 0,
      seoScore: Number(seoScore) || 0,
    };
    if (image) updatedFields.image = image;
    if (category) updatedFields.category = category;

    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      updatedFields,
      { new: true }
    ).populate({
      path: 'category',
      populate: { path: 'parent' }
    });

    if (!updatedProduct) return res.status(404).json({ error: 'Product not found' });
    res.json(updatedProduct);
  } catch (err) {
    console.error('Update Product Error:', err);
    res.status(500).json({ error: 'Server error' });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct) return res.status(404).json({ error: 'Product not found' });
    res.json({ message: 'Product deleted' });
  } catch (err) {
    console.error('Delete Product Error:', err);
    res.status(500).json({ error: 'Server error' });
  }
};

exports.updateHotProducts = async (req, res) => {
  try {
    const products = await Product.find();
    let updatedCount = 0;

    for (const p of products) {
      const isHot = p.views >= 1000 || p.sales >= 50 || p.rating >= 4.5 || p.seoScore >= 80;
      if (p.isHot !== isHot) {
        p.isHot = isHot;
        await p.save();
        updatedCount++;
      }
    }

    res.json({ message: `${updatedCount} sản phẩm đã được cập nhật HOT.` });
  } catch (err) {
    console.error('Update Hot Products Error:', err);
    res.status(500).json({ error: 'Server error' });
  }
};
