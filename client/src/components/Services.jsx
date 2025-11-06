import { useState, useEffect } from 'react';
import { servicesAPI } from '../utils/api';
import '../styles/Services.scss';

function Services() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadServices();
  }, []);

  const loadServices = async () => {
    try {
      const response = await servicesAPI.getAll();
      setServices(response.data);
    } catch (error) {
      console.error('Fehler beim Laden der Services:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="loading">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  return (
    <section className="services-section" id="services">
      <div className="container">
        <h2 className="section-title">Unsere Services</h2>
        <p className="section-subtitle">
          Professionelle Tattoo-Kunst mit höchsten Qualitätsstandards
        </p>

        <div className="services-grid">
          {services.length === 0 ? (
            <p className="no-services">Aktuell keine Services verfügbar.</p>
          ) : (
            services.map((service) => (
              <div key={service._id} className="service-card">
                <div className="service-icon">🎨</div>
                <h3>{service.title}</h3>
                <p className="service-description">{service.description}</p>
                <div className="service-price">{service.priceInfo}</div>
              </div>
            ))
          )}
        </div>

        <div className="services-cta">
          <h3>Bereit für dein neues Tattoo?</h3>
          <p>Vereinbare jetzt einen kostenlosen Beratungstermin</p>
          <a href="#contact" className="btn btn-primary">Jetzt Termin buchen</a>
        </div>
      </div>
    </section>
  );
}

export default Services;