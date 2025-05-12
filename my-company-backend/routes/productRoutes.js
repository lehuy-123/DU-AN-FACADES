const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const productController = require('../controllers/productController');

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'public/uploads/');
  },
  filename(req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage });

router.post(
  '/',
  upload.fields([
    { name: 'image', maxCount: 1 },
    { name: 'descriptionImages', maxCount: 10 },
  ]),
  productController.createProduct
);

router.put(
  '/:id',
  upload.fields([
    { name: 'image', maxCount: 1 },
    { name: 'descriptionImages', maxCount: 10 },
  ]),
  productController.updateProduct
);

router.get('/', productController.getAllProducts);
router.get('/:id', productController.getProductById);
router.delete('/:id', productController.deleteProduct);
router.patch('/hot/update', productController.updateHotProducts);

module.exports = router;
