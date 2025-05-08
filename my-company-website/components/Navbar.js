import Link from 'next/link';

export default function Navbar() {
  return (
    <nav style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '10px 40px',
      borderBottom: '2px solid #ddd',
      position: 'sticky',
      top: 0,
      background: '#fff',
      zIndex: 1000,
      height: '80px'
    }}>
      {/* Logo */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <Link href="/">
          <img src="/images/logo.png" alt="Logo" style={{ height: '50px' }} />
        </Link>
        <span style={{
          fontSize: '12px',
          fontStyle: 'italic',
          color: '#555'
        }}>
          
        </span>
      </div>

      {/* Menu */}
      <div style={{
        display: 'flex',
        gap: '25px',
        alignItems: 'center',
        fontWeight: 'bold',
        fontSize: '14px',
        textTransform: 'uppercase'
      }}>
        <Link href="/">Trang chủ</Link>
        <Link href="/gioi-thieu">Giới thiệu</Link>
        <Link href="/du-an">Dự án</Link>
        
        <Link href="/san-pham">Sản phẩm</Link>
        <Link href="/lien-he">Liên hệ</Link>
      </div>

      {/* Icon bên phải */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
        <span style={{ cursor: 'pointer' }}>🔍</span>
        <Link href="/admin/login">🔒</Link>
        <span style={{ cursor: 'pointer', fontSize: '14px' }}>🇻🇳 | 🇬🇧</span>
      </div>
    </nav>
  );
}
