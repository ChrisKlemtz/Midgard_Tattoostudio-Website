import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navbar.scss';

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Navbar Scroll-Effekt
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="container">
        <div className="navbar-content">
          {/* Logo */}
          <Link to="/" className="navbar-logo">
            <span className="logo-text">TATTOO</span>
            <span className="logo-accent">STUDIO</span>
          </Link>

          {/* Desktop Menu */}
          <ul className="navbar-menu">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/gallery">Galerie</Link></li>
            <li><Link to="/services">Services</Link></li>
            <li><Link to="/contact">Kontakt</Link></li>
          </ul>

          {/* Mobile Menu Toggle */}
          <button 
            className="mobile-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <ul className="navbar-mobile">
            <li><Link to="/" onClick={() => setMobileMenuOpen(false)}>Home</Link></li>
            <li><Link to="/gallery" onClick={() => setMobileMenuOpen(false)}>Galerie</Link></li>
            <li><Link to="/services" onClick={() => setMobileMenuOpen(false)}>Services</Link></li>
            <li><Link to="/contact" onClick={() => setMobileMenuOpen(false)}>Kontakt</Link></li>
          </ul>
        )}
      </div>
    </nav>
  );
}

export default Navbar;