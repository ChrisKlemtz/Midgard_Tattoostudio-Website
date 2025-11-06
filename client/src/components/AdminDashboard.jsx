import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { galleryAPI, servicesAPI, adminAPI } from '../utils/api';
import '../styles/AdminDashboard.scss';

function AdminDashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('gallery');
  const [images, setImages] = useState([]);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(false);

  // Image Upload State
  const [imageUpload, setImageUpload] = useState({
    file: null,
    title: '',
    category: 'Realistic',
    order: 0
  });

  // Service Form State
  const [serviceForm, setServiceForm] = useState({
    title: '',
    description: '',
    priceInfo: '',
    order: 0
  });

  const [editingService, setEditingService] = useState(null);

  useEffect(() => {
    checkAuth();
    loadData();
  }, []);

  const checkAuth = async () => {
    try {
      await adminAPI.check();
    } catch (error) {
      navigate('/admin/login');
    }
  };

  const loadData = async () => {
    try {
      const [imagesRes, servicesRes] = await Promise.all([
        galleryAPI.getAll(),
        servicesAPI.getAll()
      ]);
      setImages(imagesRes.data);
      setServices(servicesRes.data);
    } catch (error) {
      console.error('Fehler beim Laden:', error);
    }
  };

  const handleLogout = async () => {
    try {
      await adminAPI.logout();
      navigate('/admin/login');
    } catch (error) {
      console.error('Logout Fehler:', error);
    }
  };

  // ===== IMAGE UPLOAD =====
  const handleImageChange = (e) => {
    setImageUpload({ ...imageUpload, file: e.target.files[0] });
  };

  const handleImageUpload = async (e) => {
    e.preventDefault();
    
    if (!imageUpload.file) {
      alert('Bitte wähle ein Bild aus');
      return;
    }

    const formData = new FormData();
    formData.append('image', imageUpload.file);
    formData.append('title', imageUpload.title);
    formData.append('category', imageUpload.category);
    formData.append('order', imageUpload.order);

    setLoading(true);
    try {
      await galleryAPI.upload(formData);
      alert('✅ Bild erfolgreich hochgeladen!');
      setImageUpload({ file: null, title: '', category: 'Realistic', order: 0 });
      document.getElementById('image-file').value = '';
      loadData();
    } catch (error) {
      alert('❌ Fehler beim Hochladen: ' + error.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  const handleImageDelete = async (id) => {
    if (!confirm('Bild wirklich löschen?')) return;

    try {
      await galleryAPI.delete(id);
      alert('✅ Bild gelöscht');
      loadData();
    } catch (error) {
      alert('❌ Fehler beim Löschen');
    }
  };

  // ===== SERVICE MANAGEMENT =====
  const handleServiceSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    try {
      if (editingService) {
        await servicesAPI.update(editingService._id, serviceForm);
        alert('✅ Service aktualisiert');
      } else {
        await servicesAPI.create(serviceForm);
        alert('✅ Service erstellt');
      }
      
      setServiceForm({ title: '', description: '', priceInfo: '', order: 0 });
      setEditingService(null);
      loadData();
    } catch (error) {
      alert('❌ Fehler: ' + error.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  const handleEditService = (service) => {
    setEditingService(service);
    setServiceForm({
      title: service.title,
      description: service.description,
      priceInfo: service.priceInfo,
      order: service.order
    });
  };

  const handleDeleteService = async (id) => {
    if (!confirm('Service wirklich löschen?')) return;

    try {
      await servicesAPI.delete(id);
      alert('✅ Service gelöscht');
      loadData();
    } catch (error) {
      alert('❌ Fehler beim Löschen');
    }
  };

  return (
    <div className="admin-dashboard">
      {/* Header */}
      <header className="admin-header">
        <h1>Admin Dashboard</h1>
        <button onClick={handleLogout} className="btn-logout">Logout</button>
      </header>

      {/* Tabs */}
      <div className="admin-tabs">
        <button 
          className={activeTab === 'gallery' ? 'active' : ''}
          onClick={() => setActiveTab('gallery')}
        >
          📸 Galerie
        </button>
        <button 
          className={activeTab === 'services' ? 'active' : ''}
          onClick={() => setActiveTab('services')}
        >
          🎨 Services
        </button>
      </div>

      <div className="admin-content">
        {/* ===== GALLERY TAB ===== */}
        {activeTab === 'gallery' && (
          <div className="admin-section">
            <h2>Galerie verwalten</h2>

            {/* Upload Form */}
            <form className="admin-form" onSubmit={handleImageUpload}>
              <h3>Neues Bild hochladen</h3>
              
              <div className="form-group">
                <label>Bild auswählen *</label>
                <input
                  type="file"
                  id="image-file"
                  accept="image/*"
                  onChange={handleImageChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Titel *</label>
                <input
                  type="text"
                  value={imageUpload.title}
                  onChange={(e) => setImageUpload({ ...imageUpload, title: e.target.value })}
                  required
                  placeholder="z.B. Drachen Tattoo"
                />
              </div>

              <div className="form-group">
                <label>Kategorie *</label>
                <select
                  value={imageUpload.category}
                  onChange={(e) => setImageUpload({ ...imageUpload, category: e.target.value })}
                >
                  <option>Realistic</option>
                  <option>Traditional</option>
                  <option>Blackwork</option>
                  <option>Neotraditional</option>
                  <option>Fineline</option>
                  <option>Andere</option>
                </select>
              </div>

              <div className="form-group">
                <label>Reihenfolge (optional)</label>
                <input
                  type="number"
                  value={imageUpload.order}
                  onChange={(e) => setImageUpload({ ...imageUpload, order: e.target.value })}
                  placeholder="0"
                />
              </div>

              <button type="submit" className="btn btn-primary" disabled={loading}>
                {loading ? 'Lädt...' : '📤 Bild hochladen'}
              </button>
            </form>

            {/* Images List */}
            <div className="admin-list">
              <h3>Vorhandene Bilder ({images.length})</h3>
              <div className="image-grid">
                {images.map(image => (
                  <div key={image._id} className="image-card">
                    <img src={image.imageUrl} alt={image.title} />
                    <div className="image-info">
                      <h4>{image.title}</h4>
                      <span className="badge">{image.category}</span>
                    </div>
                    <button 
                      className="btn-delete"
                      onClick={() => handleImageDelete(image._id)}
                    >
                      🗑️ Löschen
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ===== SERVICES TAB ===== */}
        {activeTab === 'services' && (
          <div className="admin-section">
            <h2>Services verwalten</h2>

            {/* Service Form */}
            <form className="admin-form" onSubmit={handleServiceSubmit}>
              <h3>{editingService ? 'Service bearbeiten' : 'Neuer Service'}</h3>

              <div className="form-group">
                <label>Titel *</label>
                <input
                  type="text"
                  value={serviceForm.title}
                  onChange={(e) => setServiceForm({ ...serviceForm, title: e.target.value })}
                  required
                  placeholder="z.B. Custom Tattoo"
                />
              </div>

              <div className="form-group">
                <label>Beschreibung *</label>
                <textarea
                  value={serviceForm.description}
                  onChange={(e) => setServiceForm({ ...serviceForm, description: e.target.value })}
                  required
                  rows="4"
                  placeholder="Beschreibe den Service..."
                />
              </div>

              <div className="form-group">
                <label>Preis Info *</label>
                <input
                  type="text"
                  value={serviceForm.priceInfo}
                  onChange={(e) => setServiceForm({ ...serviceForm, priceInfo: e.target.value })}
                  required
                  placeholder="z.B. ab 150€"
                />
              </div>

              <div className="form-group">
                <label>Reihenfolge</label>
                <input
                  type="number"
                  value={serviceForm.order}
                  onChange={(e) => setServiceForm({ ...serviceForm, order: e.target.value })}
                />
              </div>

              <div className="form-actions">
                <button type="submit" className="btn btn-primary" disabled={loading}>
                  {loading ? 'Lädt...' : editingService ? '💾 Aktualisieren' : '➕ Service erstellen'}
                </button>
                {editingService && (
                  <button 
                    type="button" 
                    className="btn btn-secondary"
                    onClick={() => {
                      setEditingService(null);
                      setServiceForm({ title: '', description: '', priceInfo: '', order: 0 });
                    }}
                  >
                    Abbrechen
                  </button>
                )}
              </div>
            </form>

            {/* Services List */}
            <div className="admin-list">
              <h3>Vorhandene Services ({services.length})</h3>
              <div className="services-list">
                {services.map(service => (
                  <div key={service._id} className="service-item">
                    <div className="service-content">
                      <h4>{service.title}</h4>
                      <p>{service.description}</p>
                      <span className="price-badge">{service.priceInfo}</span>
                    </div>
                    <div className="service-actions">
                      <button 
                        className="btn-edit"
                        onClick={() => handleEditService(service)}
                      >
                        ✏️ Bearbeiten
                      </button>
                      <button 
                        className="btn-delete"
                        onClick={() => handleDeleteService(service._id)}
                      >
                        🗑️ Löschen
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminDashboard;
