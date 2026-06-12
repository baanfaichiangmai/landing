import React, { useState } from 'react';
import * as Icons from 'lucide-react';
import { BRAND_CONFIG } from '../config';

export default function Portfolio() {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [selectedProject, setSelectedProject] = useState(null);

  // Filters categories list
  const categories = [
    { id: 'all', title: 'ทั้งหมด' },
    { id: 'electrical', title: 'งานระบบไฟฟ้า' },
    { id: 'network', title: 'งานระบบ LAN/Wi-Fi' },
    { id: 'automation', title: 'งานกล้อง & สมาร์ทโฮม' }
  ];

  // Filter items
  const filteredProjects = selectedFilter === 'all'
    ? BRAND_CONFIG.portfolio
    : BRAND_CONFIG.portfolio.filter(p => p.category === selectedFilter);

  // Render a specific Lucide Icon by its string name
  const renderIcon = (iconName, size = 24, color = 'var(--dark)') => {
    const IconComponent = Icons[iconName] || Icons.Zap;
    return <IconComponent size={size} color={color} />;
  };

  return (
    <div className="section" style={{ paddingTop: '7.5rem' }}>
      <div className="container">
        {/* Title */}
        <div className="section-title-wrapper">
          <h1 className="section-title">ผลงานที่ผ่านมาของเรา</h1>
          <p className="section-subtitle">
            รวมภาพประมวลการทำงานจริงหน้างานเดินท่อร้อยสายไฟ วางระบบสายแลนสำนักงาน และการติดตั้งระบบสมาร์ทโฮมอัจฉริยะ
          </p>
        </div>

        {/* Categories filters */}
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

        {/* Gallery Grid */}
        <div className="portfolio-grid">
          {filteredProjects.map((project) => (
            <article 
              key={project.id} 
              className="portfolio-card"
              onClick={() => setSelectedProject(project)}
            >
              <div className="portfolio-img-wrapper">
                <img src={project.image} alt={project.title} loading="lazy" />
                <div className="portfolio-overlay">
                  <div className="portfolio-overlay-icon">
                    <Icons.Maximize2 size={20} />
                  </div>
                </div>
              </div>
              <div className="portfolio-info">
                <span className="portfolio-tag">
                  {categories.find(c => c.id === project.category)?.title}
                </span>
                <h3>{project.title}</h3>
                <p>{project.desc}</p>
              </div>
            </article>
          ))}
        </div>

        {/* Empty state */}
        {filteredProjects.length === 0 && (
          <div style={{ textAlign: 'center', padding: '3rem', backgroundColor: '#ffffff', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
            <Icons.AlertCircle size={48} className="faq-icon" style={{ display: 'inline-block' }} />
            <h3 style={{ marginTop: '1rem', color: 'var(--text-secondary)' }}>ไม่พบผลงานในหมวดหมู่นี้</h3>
          </div>
        )}

        {/* Lightbox Details Modal */}
        {selectedProject && (
          <div className="modal-overlay" onClick={() => setSelectedProject(null)}>
            <div className="modal-container" onClick={(e) => e.stopPropagation()}>
              <button 
                className="modal-close-btn" 
                onClick={() => setSelectedProject(null)}
                aria-label="Close details"
              >
                <Icons.X size={20} />
              </button>
              
              <div className="modal-image-side">
                <img src={selectedProject.image} alt={selectedProject.title} />
              </div>
              
              <div className="modal-content-side">
                <span className="portfolio-tag" style={{ alignSelf: 'flex-start' }}>
                  {categories.find(c => c.id === selectedProject.category)?.title}
                </span>
                <h2>{selectedProject.title}</h2>
                <p>{selectedProject.desc}</p>
                <div style={{ display: 'flex', gap: '1rem' }}>
                  <a 
                    href={BRAND_CONFIG.lineLink} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="btn btn-primary"
                    style={{ flexGrow: 1 }}
                  >
                    <Icons.MessageSquare size={18} /> สอบถามข้อมูล/ทักแชท
                  </a>
                  <a 
                    href={`tel:${BRAND_CONFIG.phoneRaw}`} 
                    className="btn btn-secondary"
                    aria-label="Call Direct"
                  >
                    <Icons.Phone size={18} /> โทรเลย
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
