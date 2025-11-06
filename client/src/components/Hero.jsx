import { Parallax } from 'react-scroll-parallax';
import '../styles/Hero.scss';

function Hero() {
  return (
    <section className="hero">
      <Parallax speed={-20} className="hero-bg">
        <div className="hero-overlay"></div>
      </Parallax>
      
      <div className="hero-content">
        <Parallax speed={10}>
          <h1 className="hero-title">
            KUNST AUF DER HAUT
          </h1>
          <p className="hero-subtitle">
            Professionelle Tattoos in Heidelberg
          </p>
          <div className="hero-buttons">
            <a href="#contact" className="btn btn-primary">Termin buchen</a>
            <a href="#gallery" className="btn btn-secondary">Galerie ansehen</a>
          </div>
        </Parallax>
      </div>
      
      {/* Scroll Indicator */}
      <div className="scroll-indicator">
        <div className="mouse"></div>
      </div>
    </section>
  );
}

export default Hero;