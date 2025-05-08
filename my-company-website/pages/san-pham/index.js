import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [openParent, setOpenParent] = useState(null); // <== NEW

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const fetchProducts = async () => {
    const res = await axios.get('http://localhost:5001/api/products');
    setProducts(res.data);
  };

  const fetchCategories = async () => {
    const res = await axios.get('http://localhost:5001/api/categories');
    setCategories(res.data);
  };

  const getFilteredProducts = () => {
    if (!selectedCategory) return products;
    return products.filter(p => p.category?._id === selectedCategory);
  };

  const hotProducts = products.filter(p => p.isHot);

  const handleParentClick = (parentId) => {
    setOpenParent(openParent === parentId ? null : parentId);
  };

  return (
    <div className="product-page">
      {/* HOT PRODUCTS */}
      <section className="hot-products">
        <h2 className="section-title">SẢN PHẨM BÁN CHẠY</h2>
        <div className="product-grid">
          {hotProducts.length === 0 ? (
            <p className="no-products">Không có sản phẩm hot.</p>
          ) : (
            hotProducts.map(product => (
              <Link key={product._id} href={`/san-pham/${product.slug || product._id}`} className="product-link">
                <div className="product-card">
                  <img src={`http://localhost:5001${product.image}`} alt={product.name}
                    onError={e => (e.target.src = 'https://via.placeholder.com/150')} />
                  <h3>{product.name}</h3>
                  <p className="price">{Number(product.price).toLocaleString()} đ</p>
                  <span className="detail-btn">Xem chi tiết</span>
                </div>
              </Link>
            ))
          )}
        </div>
      </section>

      {/* CATEGORY + PRODUCT */}
      <h1 className="page-title">Sản phẩm của chúng tôi</h1>
      <div className="product-layout">
        <div className="category-sidebar">
          <h3>Danh mục</h3>
          <ul>
            <li className={!selectedCategory ? 'active' : ''}
                onClick={() => setSelectedCategory(null)}>Tất cả</li>
            {categories.filter(c => !c.parent).map(parent => (
              <div key={parent._id}>
                <li className={selectedCategory === parent._id ? 'active' : ''}
                    onClick={() => handleParentClick(parent._id)}>
                  {parent.name}
                </li>
                {openParent === parent._id && (
                  <ul className="child-category">
                    {categories.filter(c => c.parent?._id === parent._id).map(child => (
                      <li key={child._id}
                          className={selectedCategory === child._id ? 'active' : ''}
                          onClick={() => setSelectedCategory(child._id)}>
                        {child.name}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </ul>
        </div>

        <div className="product-list">
          {getFilteredProducts().length === 0 ? (
            <p className="no-products">Không có sản phẩm.</p>
          ) : (
            <div className="product-grid">
              {getFilteredProducts().map(product => (
                <Link key={product._id} href={`/san-pham/${product.slug || product._id}`} className="product-link">
                  <div className="product-card">
                    <img src={`http://localhost:5001${product.image}`} alt={product.name}
                      onError={e => (e.target.src = 'https://via.placeholder.com/150')} />
                    <h3>{product.name}</h3>
                    <p className="price">{Number(product.price).toLocaleString()} đ</p>
                    <span className="detail-btn">Xem chi tiết</span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
