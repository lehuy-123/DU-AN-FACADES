import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import axios from 'axios';
import Showdown from 'showdown';

export default function ProductDetail() {
  const router = useRouter();
  const { slug } = router.query;
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const converter = new Showdown.Converter();

  useEffect(() => {
    if (slug) {
      const fetchProduct = async () => {
        try {
          setLoading(true);
          const res = await axios.get(`http://localhost:5001/api/products/${slug}`);
          setProduct(res.data);
          fetchRelatedProducts(res.data.category?._id);
        } catch (err) {
          console.error(err);
          setError('Không tìm thấy sản phẩm hoặc lỗi server.');
        } finally {
          setLoading(false);
        }
      };
      fetchProduct();
    }
  }, [slug]);

  const fetchRelatedProducts = async (categoryId) => {
    try {
      const res = await axios.get(`http://localhost:5001/api/products?category=${categoryId}`);
      setRelatedProducts(res.data.filter(p => p.slug !== slug));
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <p className="loading">Đang tải sản phẩm...</p>;
  if (error) return <p className="error">{error}</p>;
  if (!product) return <p className="error">Không có dữ liệu sản phẩm.</p>;

  return (
    <>
      <Head>
        <title>{product.name} | FCD</title>
        <meta name="description" content={product.shortDesc || product.description} />
        <meta property="og:title" content={product.name} />
        <meta property="og:description" content={product.shortDesc || product.description} />
        <meta property="og:image" content={`http://localhost:5001${product.image}`} />
        <meta property="og:url" content={`http://localhost:3000/san-pham/${slug}`} />
        <meta property="og:type" content="product" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={product.name} />
        <meta name="twitter:description" content={product.shortDesc || product.description} />
        <meta name="twitter:image" content={`http://localhost:5001${product.image}`} />
        <link rel="canonical" href={`http://localhost:3000/san-pham/${slug}`} />
      </Head>

      <main className="product-detail-container">
        <section className="breadcrumb">
          <a href="/">Trang chủ</a> / <a href="/san-pham">Sản phẩm</a> / {product.name}
        </section>

        <article className="product-detail">
          <figure className="product-detail-image">
            <img
              src={`http://localhost:5001${product.image}`}
              alt={product.name}
              loading="lazy"
              onError={(e) => { e.target.src = 'https://via.placeholder.com/500'; }}
            />
          </figure>

          <div className="product-detail-info">
            <h1>{product.name}</h1>
            <p className="price">{Number(product.price).toLocaleString()} đ</p>
            <p className="short-desc">{product.shortDesc}</p>

            <div className="rating-views">
              <span>⭐ {product.rating || 5} / 5</span> • <span>👁 {product.views || 0} lượt xem</span>
            </div>

            <div className="order-section">
              <label htmlFor="quantity">Số lượng:</label>
              <input id="quantity" type="number" min="1" defaultValue="1" />
              <button className="order-btn">Mua ngay</button>
            </div>

            <div className="product-meta">
              <p><strong>Loại:</strong> {product.category?.name || 'Đang cập nhật'}</p>
              <p>
                <strong>Trạng thái:</strong>{' '}
                {product.inStock ? <span className="in-stock">Còn hàng</span> : <span className="out-stock">Hết hàng</span>}
              </p>
            </div>

            <div className="product-tags">
              <p><strong>Tags:</strong> {product.tags?.join(', ') || '#nhôm #kính #facade #cao cấp'}</p>
            </div>
          </div>
        </article>

        <section className="product-description">
          <h2>Mô tả chi tiết</h2>
          <div
            className="description-content"
            dangerouslySetInnerHTML={{
              __html: converter.makeHtml(product.description || 'Đang cập nhật mô tả chi tiết.')
            }}
          />
        </section>

        <section className="related-products">
          <h2>Sản phẩm liên quan</h2>
          <div className="product-grid">
            {relatedProducts.length === 0 ? (
              <p>Không có sản phẩm liên quan.</p>
            ) : (
              relatedProducts.map((rel) => (
                <a key={rel._id} href={`/san-pham/${rel.slug}`} className="product-card">
                  <img src={`http://localhost:5001${rel.image}`} alt={rel.name} />
                  <h3>{rel.name}</h3>
                  <p className="price">{Number(rel.price).toLocaleString()} đ</p>
                </a>
              ))
            )}
          </div>
        </section>

        <section className="product-extra">
          <h2>Vì sao chọn FCD?</h2>
          <ul>
            <li>🚚 Giao hàng toàn quốc, nhanh chóng</li>
            <li>🛡 Bảo hành chính hãng 12 tháng</li>
            <li>💬 Tư vấn miễn phí 24/7</li>
          </ul>
        </section>
      </main>
    </>
  );
}
