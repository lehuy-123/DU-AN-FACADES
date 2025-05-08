import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';

export default function HeroBanner() {
  return (
    <div className="hero-banner-container">
      <Carousel
        autoPlay
        infiniteLoop
        interval={4000}
        showThumbs={false}
        showStatus={false}
      >
        <div>
          <img src="/images/banner1.png" alt="Banner 1" />
        </div>
        <div>
          <img src="/images/banner2.png" alt="Banner 2" />
        </div>
        <div>
          <img src="/images/banner3.png" alt="Banner 3" />
        </div>
      </Carousel>

      {/* Slogan cố định */}
      <div className="hero-slogan">
        <h1>GIẢI PHÁP MẶT DỰNG FACADES</h1>
        <p>Giải pháp xây dựng hiện đại - Uy tín - Chất lượng</p>
      </div>
    </div>
  );
}
