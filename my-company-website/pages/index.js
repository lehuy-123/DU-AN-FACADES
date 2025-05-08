import Head from 'next/head';
import HeroBanner from '../components/HeroBanner';

export default function Home() {
  return (
    <>
      <Head>
        <title>Trang chủ | Công ty FACADES</title>
        <meta
          name="description"
          content="Công ty xây dựng FACADES - chuyên thi công dự án, bán sản phẩm xây dựng uy tín."
        />
      </Head>

      <HeroBanner />

      {/* Giới thiệu - Grid kiểu Europaint */}
      <section className="about-grid-section">
        <div className="about-grid-container">
          <div className="about-left" data-aos="fade-right">
            <img src="/images/gt1.jpg" alt="Giới thiệu" />
           
          </div>
          <div className="about-right">
            {[
              {
                icon: 'fas fa-building',
                title: 'Về chúng tôi',
                desc: 'FACADES là đơn vị thi công và cung cấp giải pháp xây dựng hiện đại, uy tín hàng đầu tại Việt Nam.',
                theme: 'dark',
              },
              {
                icon: 'fas fa-hard-hat',
                title: 'Sản phẩm',
                desc: 'Sản phẩm xây dựng đạt chuẩn quốc tế, kiểm định chặt chẽ, phù hợp khí hậu Việt Nam.',
                theme: 'light',
              },
              {
                icon: 'fas fa-users-cog',
                title: 'Giải pháp',
                desc: 'Tư vấn, thiết kế và giám sát công trình chuyên nghiệp, đảm bảo hiệu quả tối ưu.',
                theme: 'light',
              },
              {
                icon: 'fas fa-project-diagram',
                title: 'Dự án',
                desc: 'Hơn 500+ dự án triển khai trên toàn quốc, được khách hàng đánh giá cao.',
                theme: 'dark',
              },
            ].map((item, index) => (
              <div
                key={index}
                className={`about-box ${item.theme}`}
                data-aos="fade-up"
              >
                <i className={item.icon}></i>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Dự án nổi bật */}
      <section className="featured-section">
        <h2 data-aos="fade-up">Dự án Nổi Bật</h2>
        <div className="featured-grid">
          {/* Thêm dự án ở đây */}
          <div className="project-item" data-aos="fade-up">
            <img src="/images/banner1.png" alt="Tên dự án 1" />
            <h3>Tên dự án 1</h3>
            <p>Giới thiệu ngắn gọn về dự án 1...</p>
          </div>
          <div className="project-item" data-aos="fade-up">
            <img src="/images/banner2.png" alt="Tên dự án 2" />
            <h3>Tên dự án 2</h3>
            <p>Giới thiệu ngắn gọn về dự án 2...</p>
          </div>
          <div className="project-item" data-aos="fade-up">
            <img src="/images/banner3.png" alt="Tên dự án 3" />
            <h3>Tên dự án 3</h3>
            <p>Giới thiệu ngắn gọn về dự án 3...</p>
          </div>
        </div>
      </section>

      {/* Dịch vụ & Giải pháp */}
      <section className="service-section">
        <h2 data-aos="fade-up">Dịch Vụ & Giải Pháp</h2>
        <div className="service-grid">
          <div className="service-item" data-aos="fade-right">
            <img src="/images/da1.jpg" alt="Thi công công trình" />
            <h3>Thi công công trình</h3>
            <p>
              Thi công nhà xưởng, nhà ở, công trình công nghiệp với quy trình đạt chuẩn.
            </p>
          </div>
          <div className="service-item" data-aos="fade-up">
            <img src="/images/da2.jpg" alt="Thiết kế kiến trúc" />
            <h3>Thiết kế kiến trúc</h3>
            <p>
              Kiến trúc sư sáng tạo, mang đến những thiết kế đẳng cấp và tối ưu chi phí.
            </p>
          </div>
          <div className="service-item" data-aos="fade-left">
            <img src="/images/da1.jpg" alt="Tư vấn & Giám sát" />
            <h3>Tư vấn & Giám sát</h3>
            <p>
              Đảm bảo chất lượng & tiến độ với dịch vụ tư vấn, giám sát từng hạng mục.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
