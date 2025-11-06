import { useState } from 'react';
import '../styles/ContactForm.scss';

function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // WhatsApp Nachricht erstellen
    const whatsappMessage = `
🎨 Neue Tattoo-Anfrage

👤 Name: ${formData.name}
📧 Email: ${formData.email}
📱 Telefon: ${formData.phone}

💬 Nachricht:
${formData.message}
    `.trim();

    // WICHTIG: Ersetze diese Nummer mit der echten Studio-Nummer
    const phoneNumber = '491234567890'; // Format: 49 (Deutschland) + Nummer ohne 0
    
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(whatsappMessage)}`;
    
    // WhatsApp öffnen
    window.open(whatsappURL, '_blank');
    
    // Formular zurücksetzen
    setSubmitted(true);
    setFormData({
      name: '',
      email: '',
      phone: '',
      message: ''
    });
    
    // Success Message nach 3 Sekunden ausblenden
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <section className="contact-section" id="contact">
      <div className="container">
        <div className="contact-wrapper">
          {/* Linke Seite - Info */}
          <div className="contact-info">
            <h2>Kontaktiere uns</h2>
            <p className="contact-subtitle">
              Hast du Fragen oder möchtest einen Termin vereinbaren? 
              Schreib uns über WhatsApp!
            </p>
            
            <div className="contact-details">
              <div className="contact-item">
                <div className="contact-icon">📍</div>
                <div>
                  <h4>Adresse</h4>
                  <p>Hauptstraße 123<br />69117 Heidelberg</p>
                </div>
              </div>
              
              <div className="contact-item">
                <div className="contact-icon">📞</div>
                <div>
                  <h4>Telefon</h4>
                  <p>06221 / 123456</p>
                </div>
              </div>
              
              <div className="contact-item">
                <div className="contact-icon">📧</div>
                <div>
                  <h4>Email</h4>
                  <p>info@tattoo-studio.de</p>
                </div>
              </div>
              
              <div className="contact-item">
                <div className="contact-icon">🕐</div>
                <div>
                  <h4>Öffnungszeiten</h4>
                  <p>Mo - Fr: 10:00 - 19:00<br />Sa: 11:00 - 17:00<br />So: Geschlossen</p>
                </div>
              </div>
            </div>
          </div>

          {/* Rechte Seite - Formular */}
          <div className="contact-form-wrapper">
            <form className="contact-form" onSubmit={handleSubmit}>
              <h3>Terminanfrage via WhatsApp</h3>
              
              {submitted && (
                <div className="success-message">
                  ✅ WhatsApp wird geöffnet! Deine Nachricht ist vorausgefüllt.
                </div>
              )}
              
              <div className="form-group">
                <label htmlFor="name">Name *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Dein Name"
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="email">Email *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="deine@email.de"
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="phone">Telefon</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="0123 456789"
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="message">Deine Nachricht *</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="5"
                  placeholder="Beschreibe deine Tattoo-Idee, gewünschte Größe, Platzierung, etc."
                ></textarea>
              </div>
              
              <button type="submit" className="btn btn-primary">
                📱 Via WhatsApp senden
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ContactForm;