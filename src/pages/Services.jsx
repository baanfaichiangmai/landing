import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import * as Icons from 'lucide-react';
import { BRAND_CONFIG } from '../config';

export default function Services() {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const location = useLocation();

  // Categories list for filtering
  const categories = [
    { id: 'all', title: 'บริการทั้งหมด' },
    { id: 'electrical', title: 'งานระบบไฟฟ้า & ซ่อมบำรุง' },
    { id: 'network', title: 'งานเน็ตเวิร์ก & Wi-Fi' },
    { id: 'automation', title: 'สมาร์ทโฮม & ความปลอดภัย' }
  ];

  // Filter services
  const filteredServices = selectedFilter === 'all' 
    ? BRAND_CONFIG.services 
    : BRAND_CONFIG.services.filter(s => s.category === selectedFilter);

  // Render a specific Lucide Icon by its string name
  const renderIcon = (iconName, size = 24, color = 'var(--dark)') => {
    const IconComponent = Icons[iconName] || Icons.Zap;
    return <IconComponent size={size} color={color} />;
  };

  // Handle hash anchor scroll on load
  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        // Ensure any active filter allows this card to show
        const service = BRAND_CONFIG.services.find(s => s.id === id);
        if (service) {
          setSelectedFilter('all'); // Reset filter to show the target card
          setTimeout(() => {
            element.scrollIntoView({ behavior: 'smooth', block: 'center' });
            element.classList.add('highlight-glow');
            setTimeout(() => element.classList.remove('highlight-glow'), 2000);
          }, 100);
        }
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, [location]);

  return (
    <div className="section" style={{ paddingTop: '7.5rem' }}>
      <div className="container">
        {/* Title */}
        <div className="section-title-wrapper">
          <h1 className="section-title">บริการทั้งหมดของเรา</h1>
          <p className="section-subtitle">
            เราให้บริการงานช่างไฟฟ้า วางระบบเชื่อมต่อคอมพิวเตอร์ และอุปกรณ์บ้านอัจฉริยะครบวงจร ดูแลโดยช่างไฟชำนาญการและมีความปลอดภัยสูง
          </p>
        </div>

        {/* Category Filter Tabs */}
        <div className="portfolio-filters" style={{ marginBottom: '4rem' }}>
          {categories.map((cat) => (
            <button
              key={cat.id}
              className={`filter-btn ${selectedFilter === cat.id ? 'active' : ''}`}
              onClick={() => setSelectedFilter(cat.id)}
            >
              {cat.title}
            </button>
          ))}
        </div>

        {/* Services List Details */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4rem' }}>
          {filteredServices.map((service, index) => {
            const isEven = index % 2 === 0;
            return (
              <div 
                key={service.id} 
                id={service.id}
                className="about-grid" 
                style={{ 
                  backgroundColor: '#ffffff',
                  borderRadius: 'var(--radius-lg)',
                  border: '1px solid var(--border-color)',
                  padding: '2.5rem',
                  boxShadow: 'var(--shadow-sm)',
                  transition: 'all 0.5s ease',
                  scrollMarginTop: '8rem'
                }}
              >
                {/* Image side - changes layout position based on index (even/odd) */}
                <div 
                  className="about-image-side" 
                  style={{ 
                    order: isEven ? 0 : 1,
                    height: '350px',
                    position: 'relative'
                  }}
                >
                  <img 
                    src={service.image} 
                    alt={service.title} 
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    loading="lazy" 
                  />
                  <div 
                    style={{
                      position: 'absolute',
                      top: '1.5rem',
                      left: '1.5rem',
                      backgroundColor: 'var(--primary)',
                      color: 'var(--dark)',
                      padding: '0.75rem',
                      borderRadius: 'var(--radius-md)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: 'var(--shadow-md)'
                    }}
                  >
                    {renderIcon(service.icon, 28, 'var(--dark)')}
                  </div>
                </div>

                {/* Text description side */}
                <div className="about-content-side">
                  <span className="portfolio-tag" style={{ alignSelf: 'flex-start' }}>
                    {categories.find(c => c.id === service.category)?.title}
                  </span>
                  <h2 style={{ fontSize: '1.85rem' }}>{service.title}</h2>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', lineHeight: '1.7' }}>
                    {service.longDesc}
                  </p>
                  
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginTop: '1.5rem' }}>
                    <Link 
                      to={`/contact?service=${encodeURIComponent(service.title)}`} 
                      className="btn btn-primary"
                    >
                      {renderIcon('Calendar', 18, 'var(--dark)')} จองบริการนี้
                    </Link>
                    <a 
                      href={`tel:${BRAND_CONFIG.phoneRaw}`} 
                      className="btn btn-secondary"
                    >
                      {renderIcon('Phone', 18, 'var(--dark)')} {BRAND_CONFIG.phone}
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Empty state */}
        {filteredServices.length === 0 && (
          <div style={{ textAlign: 'center', padding: '3rem', backgroundColor: '#ffffff', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
            {renderIcon('AlertCircle', 48, 'var(--text-secondary)')}
            <h3 style={{ marginTop: '1rem', color: 'var(--text-secondary)' }}>ไม่พบบริการในหมวดหมู่นี้</h3>
          </div>
        )}
      </div>

      {/* CSS style hook for glowing scroll targets */}
      <style dangerouslySetInnerHTML={{ __html: `
        .highlight-glow {
          border-color: var(--primary) !important;
          box-shadow: 0 0 25px var(--primary-glow) !important;
          transform: scale(1.02);
        }
      `}} />
    </div>
  );
}
