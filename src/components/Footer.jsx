import { Link, useLocation, useNavigate } from 'react-router-dom'
import Logo from '../assets/headerLogo.png'
import { useTranslation } from 'react-i18next'


export default function Footer() {
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();

  const handleHomeClick = (e) => {
    e.preventDefault();

    if (location.pathname === '/') {
      const heroSection = document.getElementById('hero-section');
      if (heroSection) {
        heroSection.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      navigate('/');
      setTimeout(() => {
        const heroSection = document.getElementById('hero-section');
        if (heroSection) {
          heroSection.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  };

  return (
    <>
      <footer className="footer">
        <div className="footer-top">
          <div className="container">
            <div className="row">
              {/* Follow Us */}
              <div className="col-lg-3 col-md-6 mb-4">
                <div className="footer-widget">
                  <img src={Logo}
                    alt="CityWala" style={{ height: 40, filter: 'brightness(10)' }} className="mb-3" />
                  <p style={{ fontSize: 13, color: '#aaa' }}>{t('footer.tagline')}</p>
                  <h3 className="mt-3">{t('footer.follow_us')}</h3>
                  <div className="social-icon mt-2">
                    <ul>
                      <li><a href="#"><i className="fab fa-facebook-f"></i></a></li>
                      <li><a href="#"><i className="fab fa-instagram"></i></a></li>
                      <li><a href="#"><i className="fab fa-linkedin-in"></i></a></li>
                      <li><a href="https://web.whatsapp.com/send?phone=8368741739" target="_blank"><i className="fab fa-whatsapp"></i></a></li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Quick Links */}
              <div className="col-lg-3 col-md-6 col-6 mb-4">
                <div className="footer-widget footer-menu">
                  <h2>{t('footer.quick_links')}</h2>
                  <ul>
                    <li><a href="/" onClick={handleHomeClick}>{t('footer.home')}</a></li>
                    <li><a href="/about-us">{t('footer.about')}</a></li>
                    <li><a href="/contact-us">{t('footer.contact')}</a></li>
                    {/* <li><a href="#">{t('footer.help')}</a></li> */}
                  </ul>
                </div>
              </div>

              {/* Useful Links */}
              <div className="col-lg-3 col-md-6 col-6 mb-4">
                <div className="footer-widget footer-menu">
                  <h2>{t('footer.useful_links')}</h2>
                  <ul>
                    {/* <li><a href="#">{t('footer.cookie')}</a></li> */}
                    <li><a href="/privacy-policy">{t('footer.privacy')}</a></li>
                    <li><a href="/terms-and-conditions">{t('footer.terms')}</a></li>
                    {/* <li><Link to="/plan">{t('footer.business_plan')}</Link></li> */}
                  </ul>
                </div>
              </div>

              {/* Popular Cities */}
              {/* <div className="col-lg-2 col-md-6 col-6 mb-4">
                <div className="footer-widget footer-menu">
                  <h2>{t('footer.popular_cities')}</h2>
                  <ul>
                    {['Bangalore', 'Mumbai', 'Chennai', 'Delhi', 'Hyderabad', 'Pune', 'Lucknow', 'Patna'].map(c => (
                      <li key={c}><a href="#">{c}</a></li>
                    ))}
                  </ul>
                </div>
              </div> */}

              {/* Contact */}
              <div className="col-lg-3 col-md-6 mb-4">
                <div className="footer-widget">
                  <h2>{t('footer.communication')}</h2>
                  <div style={{ fontSize: 14 }}>
                    <div className="d-flex gap-2 align-items-start mb-3">
                      <i className="fa-solid fa-phone mt-1" style={{ color: '#1075be' }}></i>
                      <div>
                        <div style={{ color: '#888', fontSize: 12 }}>{t('footer.call_us')}</div>
                        <a href="tel:+918368741739" style={{ color: '#ccc' }}>+91 836 874 1739</a>
                      </div>
                    </div>
                    <div className="d-flex gap-2 align-items-start">
                      <i className="fa-solid fa-envelope mt-1" style={{ color: '#1075be' }}></i>
                      <div>
                        <div style={{ color: '#888', fontSize: 12 }}>{t('footer.send_message')}</div>
                        <a href="mailto:citywala1959@gmail.com" style={{ color: '#ccc' }}>citywala1959@gmail.com</a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="footer-bottom">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-md-6">
                <p className="mb-0" style={{ fontSize: 13, color: '#888' }}>
                  {t('footer.copyright')}
                </p>
              </div>
              <div className="col-md-6 text-md-end">
                <div className="d-flex gap-2 justify-content-md-end mt-2 mt-md-0">
                  {[1, 2, 3, 4, 5, 6].map(n => (
                    <img key={n} src={`https://citywala.com/assets/images/${n}.svg`}
                      alt="payment" style={{ height: 20 }} onError={e => e.target.style.display = 'none'} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating Buttons */}
      <a href="https://web.whatsapp.com/send?phone=8368741739" target="_blank" className="whatsapp-button">
        <i className="fab fa-whatsapp"></i>
      </a>
      <a href="tel:+918368741739" className="call-button">
        <i className="fa-solid fa-phone"></i>
      </a>
    </>
  )
}
