import Layout from '../components/Layout';
import '@fortawesome/fontawesome-free/css/all.min.css';


// Import global CSS
import '../styles/globals.css';
import '../styles/ProductList.css';
import '../styles/ProductDetail.css';
import '../styles/AdminProductPage.css';
import '../styles/HomePage.css';
import '../styles/Footer.css';
import '../styles/LienHe.css';


// Import thư viện CSS ngoài
import 'aos/dist/aos.css';

import { useEffect } from 'react';
import AOS from 'aos';

export default function App({ Component, pageProps }) {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}
