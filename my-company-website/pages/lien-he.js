import Head from 'next/head';
import { useState } from 'react';

export default function LienHe() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message }),
      });
      const data = await res.json();
      setStatus(data.message);
      setName('');
      setEmail('');
      setMessage('');
    } catch (error) {
      setStatus('Có lỗi xảy ra. Vui lòng thử lại!');
    }
  };

  return (
    <>
      <Head>
        <title>Liên hệ | FCD Facade & Construction</title>
      </Head>
      <main className="contact-page">
        <h1>Liên hệ</h1>
        <p>Chúng tôi sẵn sàng tư vấn cho bạn!</p>
        <div className="contact-container">
          <div className="contact-info">
            <h2>Thông tin liên hệ</h2>
            <p>📍 123, Q.12, TP.HCM</p>
            <p>📧 info@fcd.vn</p>
            <p>📞 0909 999 999</p>
            <p>🕗 8:00 - 18:30 | Thứ 2 - Chủ nhật</p>
          </div>

          <div className="contact-form">
            <h2>Gửi tin nhắn</h2>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Họ và tên"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <textarea
                placeholder="Nội dung"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
              ></textarea>
              <button type="submit">Gửi liên hệ</button>
              {status && <p style={{ marginTop: '10px', color: 'green' }}>{status}</p>}
            </form>
          </div>
        </div>

        <section className="about-section">
            <div className="about-content">
                <h2> Về FCD Facade & Construction</h2>
                <p>FCD là đơn vị tiên phong trong giải pháp mặt dựng nhôm kính, kính cường lực, phụ kiện facadevà thi công công trình hiện đại. Với đội ngũ giàu kinh nghiệm, chúng tôi cam kết mang lại 
                    <strong> chất lượng vượt trội </strong> và dịch vụ <strong> chuyên nghiệp </strong>.
                    </p>
                     <div className="about-highlights">
                        <div className="highlight-item">
         10+ năm kinh nghiệm
      </div>
      <div className="highlight-item">
         Hàng trăm dự án lớn nhỏ
      </div>
      <div className="highlight-item">
         Đội ngũ kỹ sư giàu chuyên môn
      </div>
    </div>
  </div>
</section>


        <section className="map-section">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d903.4806206569549!2d106.60884445869117!3d10.856043233009816!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752b8f42e5fe6b%3A0x3aa61e2ba73b971f!2zQ8O0bmcgdHkgVE5ISCBUTSBHaeG6o2kgUGjDoXAgRkFDQURF!5e0!3m2!1svi!2s!4v1746678037615!5m2!1svi!2s"
            width="100%"
            height="400"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </section>
      </main>
    </>
  );
}
