import React, { useEffect, useState } from 'react';
import axios from 'axios';


export default function AdminProductPage() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    shortDesc: '',
    price: '',
    image: null,
    category: '',
  });
  const [newCategory, setNewCategory] = useState({ name: '', parent: '' });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await axios.get('http://localhost:5001/api/products');
      setProducts(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await axios.get('http://localhost:5001/api/categories');
      setCategories(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({ ...formData, [name]: name === 'image' ? files[0] : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (value) data.append(key, value);
    });

    try {
      if (editingId) {
        await axios.put(`http://localhost:5001/api/products/${editingId}`, data);
      } else {
        await axios.post('http://localhost:5001/api/products', data);
      }
      setFormData({ name: '', shortDesc: '', price: '', image: null, category: '' });
      setEditingId(null);
      document.querySelector('input[name="image"]').value = '';
      fetchProducts();
    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = (product) => {
    setFormData({
      name: product.name,
      shortDesc: product.shortDesc,
      price: product.price,
      image: null,
      category: product.category?._id || '',
    });
    setEditingId(product._id);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5001/api/products/${id}`);
      fetchProducts();
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddCategory = async () => {
    if (!newCategory.name.trim()) return;
    try {
      await axios.post('http://localhost:5001/api/categories', newCategory);
      setNewCategory({ name: '', parent: '' });
      fetchCategories();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteCategory = async (id) => {
    if (window.confirm('Bạn có chắc muốn xoá danh mục này?')) {
      try {
        await axios.delete(`http://localhost:5001/api/categories/${id}`);
        fetchCategories();
      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    <div className="admin-product-page">
      <h1>Quản lý Sản phẩm</h1>

      <div className="category-form">
        <input
          type="text"
          placeholder="Tên danh mục mới"
          value={newCategory.name}
          onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
        />
        <select
          value={newCategory.parent}
          onChange={(e) => setNewCategory({ ...newCategory, parent: e.target.value })}
        >
          <option value="">Chọn danh mục cha (nếu có)</option>
          {categories.filter(cat => !cat.parent).map((parent) => (
            <option key={parent._id} value={parent._id}>
              {parent.name}
            </option>
          ))}
        </select>
        <button onClick={handleAddCategory}>Thêm danh mục</button>
      </div>

      <ul className="category-list">
        {categories.map(cat => (
          <li key={cat._id}>
            {cat.name}
            <button onClick={() => handleDeleteCategory(cat._id)}>Xoá</button>
          </li>
        ))}
      </ul>

      <form onSubmit={handleSubmit} className="product-form">
        <input type="text" name="name" placeholder="Tên sản phẩm" value={formData.name} onChange={handleChange} required />
        <input type="text" name="shortDesc" placeholder="Mô tả ngắn" value={formData.shortDesc} onChange={handleChange} required />
        <input type="number" name="price" placeholder="Giá" value={formData.price} onChange={handleChange} required />
        <input type="file" name="image" accept="image/*" onChange={handleChange} />
        <select name="category" value={formData.category} onChange={handleChange} required>
          <option value="">Chọn danh mục</option>
          {categories.filter(cat => !cat.parent).map(parent => (
            <React.Fragment key={parent._id}>
              <option value={parent._id}>{parent.name}</option>
              {categories.filter(c => c.parent && c.parent._id === parent._id).map(child => (
                <option key={child._id} value={child._id}>└ {child.name}</option>
              ))}
            </React.Fragment>
          ))}
        </select>
        <button type="submit">{editingId ? 'Cập nhật' : 'Tạo'}</button>
      </form>

      <table className="product-table">
        <thead>
          <tr>
            <th>Ảnh</th>
            <th>Tên</th>
            <th>Giá</th>
            <th>Danh mục</th>
            <th>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {products.map(prd => (
            <tr key={prd._id}>
              <td>
                <img src={`http://localhost:5001${prd.image}`} alt={prd.name} width="80" onError={(e) => { e.target.src = 'https://via.placeholder.com/80'; }} />
              </td>
              <td>{prd.name}</td>
              <td>{Number(prd.price).toLocaleString()} đ</td>
              <td>{prd.category ? (prd.category.parent ? `${prd.category.parent.name} → ${prd.category.name}` : prd.category.name) : 'Không có'}</td>
              <td>
                <button onClick={() => handleEdit(prd)}>Sửa</button>
                <button onClick={() => handleDelete(prd._id)}>Xoá</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
