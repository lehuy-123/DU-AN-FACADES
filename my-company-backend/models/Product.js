const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  shortDesc: { type: String },
  price: { type: Number, required: true },
  image: { type: String }, // tên file ảnh, ví dụ: 'abc.jpg'
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);
