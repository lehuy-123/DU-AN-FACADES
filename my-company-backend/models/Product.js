const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  shortDesc: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  image: { type: String },
  descriptionImages: [{ type: String }], // ✅ thêm mảng ảnh mô tả
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
  },
  views: { type: Number, default: 0 },
  sales: { type: Number, default: 0 },
  rating: { type: Number, default: 0 },
  seoScore: { type: Number, default: 0 },
  isHot: { type: Boolean, default: false },
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);
