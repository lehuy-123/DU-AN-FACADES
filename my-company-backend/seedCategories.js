const mongoose = require('mongoose');
const Category = require('./models/Category'); // đổi đường dẫn phù hợp dự án bạn

mongoose.connect('mongodb+srv://luc123:luc123@cluster0.pamvnx1.mongodb.net/');

const categories = [
  { name: 'Metal' },
  { name: 'Metal Nhật', parentName: 'Metal' },
  { name: 'Metal Hàn', parentName: 'Metal' },
  { name: 'Nhôm' },
  { name: 'Nhôm loại 1', parentName: 'Nhôm' },
  { name: 'Nhôm loại 2', parentName: 'Nhôm' },
  { name: 'Kính' },
  { name: 'Kính Nhật', parentName: 'Kính' },
  { name: 'Kính Hàn', parentName: 'Kính' }
];

async function seed() {
  await Category.deleteMany({});
  const savedCategories = {};

  // Tạo cha trước
  for (let cat of categories) {
    if (!cat.parentName) {
      const created = await Category.create({ name: cat.name });
      savedCategories[cat.name] = created._id;
    }
  }

  // Tạo con
  for (let cat of categories) {
    if (cat.parentName) {
      const parentId = savedCategories[cat.parentName];
      await Category.create({ name: cat.name, parent: parentId });
    }
  }

  console.log('Seeding done!');
  mongoose.disconnect();
}

seed();


