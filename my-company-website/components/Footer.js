export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-about">
          <h4>Thông tin liên hệ</h4>
          <p>Công ty FCD Facade & Construction</p>
          <ul>
            <li>📍 123, Q.12, TP.HCM</li>
            <li>📧 info@fcd.vn</li>
            <li>📞 0909 999 999</li>
            <li>🕗 8:00 - 18:30 | T2 - CN</li>
          </ul>
        </div>

        <div className="footer-links">
          <h4>Sản phẩm</h4>
          <ul>
            <li><a href="#">Mặt dựng nhôm kính</a></li>
            <li><a href="#">Kính cường lực</a></li>
            <li><a href="#">Đèn trang trí</a></li>
            <li><a href="#">Phụ kiện facade</a></li>
            <li><a href="#">Gia công nhôm</a></li>
          </ul>
        </div>

        <div className="footer-links">
          <h4>Liên kết nhanh</h4>
          <ul>
            <li><a href="/">Trang chủ</a></li>
            <li><a href="/gioi-thieu">Giới thiệu</a></li>
            <li><a href="/du-an">Dự án</a></li>
            <li><a href="/san-pham">Sản phẩm</a></li>
            <li><a href="/lien-he">Liên hệ</a></li>
          </ul>
        </div>

        <div className="footer-certification">
          <h4>Chứng nhận</h4>
          <img
            src="/images/foot.png"
            alt="Chứng nhận Bộ Công Thương"
            className="certification-img"
          />
        </div>
      </div>
      <div className="footer-bottom">
        © 2025 FCD Facade & Construction. Thiết kế web bởi Facades.vn
      </div>
    </footer>
  );
}
