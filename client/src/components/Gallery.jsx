import { useState, useEffect } from 'react';
import { galleryAPI } from '../utils/api';
import '../styles/Gallery.scss';

function Gallery() {
  const [images, setImages] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('Alle');
  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(true);

  const categories = ['Alle', 'Realistic', 'Traditional', 'Blackwork', 'Neotraditional', 'Fineline', 'Andere'];

  // Bilder laden
  useEffect(() => {
    loadImages();
  }, []);

  const loadImages = async () => {
    try {
      const response = await galleryAPI.getAll();
      setImages(response.data);
    } catch (error) {
      console.error('Fehler beim Laden der Bilder:', error);
    } finally {
      setLoading(false);
    }
  };

  // Bilder filtern
  const filteredImages = selectedCategory === 'Alle' 
    ? images 
    : images.filter(img => img.category === selectedCategory);

  // Lightbox öffnen
  const openLightbox = (image) => {
    setSelectedImage(image);
    document.body.style.overflow = 'hidden';
  };

  // Lightbox schließen
  const closeLightbox = () => {
    setSelectedImage(null);
    document.body.style.overflow = 'auto';
  };

  if (loading) {
    return (
      <div className="loading">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  return (
    <section className="gallery-section" id="gallery">
      <div className="container">
        <h2 className="section-title">Unsere Arbeiten</h2>
        <p className="section-subtitle">
          Jedes Tattoo ist ein Kunstwerk - hier ist eine Auswahl unserer besten Arbeiten
        </p>

        {/* Filter Buttons */}
        <div className="gallery-filter">
          {categories.map(category => (
            <button
              key={category}
              className={`filter-btn ${selectedCategory === category ? 'active' : ''}`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        {filteredImages.length === 0 ? (
          <p className="no-images">Keine Bilder in dieser Kategorie vorhanden.</p>
        ) : (
          <div className="gallery-grid">
            {filteredImages.map((image) => (
              <div 
                key={image._id} 
                className="gallery-item"
                onClick={() => openLightbox(image)}
              >
                <img src={image.imageUrl} alt={image.title} />
                <div className="gallery-overlay">
                  <h3>{image.title}</h3>
                  <span className="category-tag">{image.category}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Lightbox */}
        {selectedImage && (
          <div className="lightbox" onClick={closeLightbox}>
            <button className="lightbox-close">&times;</button>
            <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
              <img src={selectedImage.imageUrl} alt={selectedImage.title} />
              <div className="lightbox-info">
                <h3>{selectedImage.title}</h3>
                <span className="category-tag">{selectedImage.category}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default Gallery;