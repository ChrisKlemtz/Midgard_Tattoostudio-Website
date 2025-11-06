import '../styles/Footer.scss';

function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>TATTOO STUDIO</h3>
            <p>Professionelle Tattoo-Kunst in Heidelberg seit 2020</p>
          </div>
          
          <div className="footer-section">
            <h4>Kontakt</h4>
            <p>Hauptstraße 123</p>
            <p>69117 Heidelberg</p>
            <p>Tel: 06221 / 123456</p>
            <p>info@tattoo-studio.de</p>
          </div>
          
          <div className="footer-section">
            <h4>Öffnungszeiten</h4>
            <p>Mo - Fr: 10:00 - 19:00</p>
            <p>Sa: 11:00 - 17:00</p>
            <p>So: Geschlossen</p>
          </div>
          
          <div className="footer-section">
            <h4>Social Media</h4>
            <div className="social-links">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; 2024 Tattoo Studio Heidelberg. Alle Rechte vorbehalten.</p>
          <div className="footer-links">
            <a href="/impressum">Impressum</a>
            <a href="/datenschutz">Datenschutz</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;