import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import * as Icons from 'lucide-react';
import { BRAND_CONFIG } from '../config';

export default function Home() {
  const [activeFaq, setActiveFaq] = useState(null);

  const toggleFaq = (index) => {
    if (activeFaq === index) {
      setActiveFaq(null);
    } else {
      setActiveFaq(index);
    }
  };

  // Render a specific Lucide Icon by its string name
  const renderIcon = (iconName, size = 24, color = 'var(--dark)') => {
    const IconComponent = Icons[iconName] || Icons.Zap;
    return <IconComponent size={size} color={color} />;
  };

  // Get first 4 services to teaser on home page
  const featuredServices = BRAND_CONFIG.services.slice(0, 4);

  return (
    <div>
      {/* 1. Hero Section */}
      <section 
        className="hero" 
        style={{ backgroundImage: `url(${BRAND_CONFIG.heroBgImage})` }}
      >
        <div className="container">
          <div className="hero-content">
            <span className="hero-tagline">
              {renderIcon('Shield', 14, 'var(--primary)')} {BRAND_CONFIG.responseTime}
            </span>
            <h1>
              {BRAND_CONFIG.title.split(' ')[0]} <span>{BRAND_CONFIG.title.split(' ').slice(1).join(' ')}</span>
            </h1>
            <p>{BRAND_CONFIG.subtitle}</p>
            <div className="hero-buttons">
              <Link to="/contact" className="btn btn-primary">
                {renderIcon('Calendar', 18, 'var(--dark)')} จองคิวช่าง / นัดหมาย
              </Link>
              <a href={`tel:${BRAND_CONFIG.phoneRaw}`} className="btn btn-outline-white">
                {renderIcon('Phone', 18, '#ffffff')} โทรด่วน: {BRAND_CONFIG.phone}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Trust Partner Logos */}
      <section className="trust-logos">
        <div className="container">
          <div className="logos-grid">
            <div className="logo-item">CJ MORE</div>
            <div className="logo-item">PTT GROUP</div>
            <div className="logo-item">เมืองไทยประกันภัย</div>
            <div className="logo-item">สมหวังเงินสั่งได้</div>
            <div className="logo-item">ปตท.</div>
            <div className="logo-item">THAIFOODS</div>
          </div>
        </div>
      </section>

      {/* 3. Featured Services Teaser */}
      <section className="section">
        <div className="container">
          <div className="section-title-wrapper">
            <h2 className="section-title">บริการหลักของเรา</h2>
            <p className="section-subtitle">บริการงานช่างระบบไฟฟ้าและอุปกรณ์เทคโนโลยีในบ้านที่ครอบคลุมทุกความต้องการ</p>
          </div>
          
          <div className="services-grid">
            {featuredServices.map((service) => (
              <article key={service.id} className="service-card">
                <div className="service-image-wrapper">
                  <img src={service.image} alt={service.title} loading="lazy" />
                  <div className="service-icon-badge">
                    {renderIcon(service.icon, 24, 'var(--dark)')}
                  </div>
                </div>
                <div className="service-card-content">
                  <h3>{service.title}</h3>
                  <p>{service.shortDesc}</p>
                  <Link to={`/services#${service.id}`} className="service-card-link">
                    ดูรายละเอียดเพิ่มเติม {renderIcon('ArrowRight', 16, 'currentColor')}
                  </Link>
                </div>
              </article>
            ))}
          </div>
          
          <div style={{ textAlign: 'center', marginTop: '3.5rem' }}>
            <Link to="/services" className="btn btn-dark">
              ดูบริการทั้งหมดของ {BRAND_CONFIG.shortName} {renderIcon('ArrowRight', 18, '#ffffff')}
            </Link>
          </div>
        </div>
      </section>

      {/* 3.5. Workflow Section (Baanmefai inspired) */}
      <section className="section" style={{ backgroundColor: '#ffffff', borderTop: '1px solid var(--border-color)' }}>
        <div className="container">
          <div className="section-title-wrapper">
            <h2 className="section-title">ขั้นตอนการให้บริการ</h2>
            <p className="section-subtitle">สะดวก รวดเร็ว และโปร่งใสในทุกขั้นตอนเพื่อความอุ่นใจของคุณ</p>
          </div>

          <div className="workflow-grid">
            {BRAND_CONFIG.workSteps.map((step) => (
              <div key={step.step} className="workflow-card">
                <span className="workflow-step-num">{step.step}</span>
                <h3>{step.title}</h3>
                <p>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Why Choose Us / Highlights */}
      <section className="section" style={{ backgroundColor: '#ffffff', borderTop: '1px solid var(--border-color)', borderBottom: '1px solid var(--border-color)' }}>
        <div className="container">
          <div className="section-title-wrapper">
            <h2 className="section-title">ทำไมจึงต้องเลือกเรา?</h2>
            <p className="section-subtitle">เพราะความปลอดภัยและความรวดเร็วในคุณภาพงานของบ้านคุณ คือสิ่งที่สำคัญที่สุดสำหรับเรา</p>
          </div>

          <div className="highlights-container">
            <div className="highlights-image-side">
              <img 
                src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80" 
                alt="ช่างไฟฟ้ามืออาชีพสวมชุดนิรภัย" 
                loading="lazy"
              />
            </div>
            
            <div className="highlights-list">
              {BRAND_CONFIG.highlights.map((item, index) => (
                <div key={item.id} className="highlight-item">
                  <div className="highlight-num">{index + 1}</div>
                  <div className="highlight-text">
                    <h4>{item.title}</h4>
                    <p>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 4.5. Safety Standards Section (Baanmefai inspired) */}
      <section className="section" style={{ borderTop: '1px solid var(--border-color)' }}>
        <div className="container">
          <div className="section-title-wrapper">
            <h2 className="section-title">{BRAND_CONFIG.safetyStandards.title}</h2>
            <p className="section-subtitle">{BRAND_CONFIG.safetyStandards.desc}</p>
          </div>

          <div className="safety-grid">
            {BRAND_CONFIG.safetyStandards.items.map((item, index) => {
              // Map icon name string to Lucide component
              let iconName = 'Shield';
              if (item.icon === 'Camera') iconName = 'Video';
              if (item.icon === 'UserCheck') iconName = 'UserCheck';
              if (item.icon === 'ShieldAlert') iconName = 'ShieldAlert';
              if (item.icon === 'Compass') iconName = 'Compass';
              
              return (
                <div key={index} className="safety-card">
                  <div className="safety-icon-wrapper">
                    {renderIcon(iconName, 28, 'var(--dark)')}
                  </div>
                  <div className="safety-text">
                    <h4>{item.title}</h4>
                    <p>{item.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. Customer Testimonials */}
      <section className="section">
        <div className="container">
          <div className="section-title-wrapper">
            <h2 className="section-title">เสียงตอบรับจากลูกค้า</h2>
            <p className="section-subtitle">ความประทับใจและความพึงพอใจจากเจ้าของบ้านและสำนักงานที่เคยใช้บริการของเราจริง</p>
          </div>

          <div className="reviews-grid">
            {BRAND_CONFIG.reviews.map((review) => (
              <div key={review.id} className="review-card">
                <div className="review-stars">
                  {Array.from({ length: review.stars }).map((_, i) => (
                    <Icons.Star key={i} size={16} fill="currentColor" />
                  ))}
                </div>
                <p className="review-text">"{review.text}"</p>
                <div className="review-author">
                  <span className="author-name">{review.name}</span>
                  <span className="author-location">{review.location}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5.5. Knowledge Articles Section (Inspired by baanmefai.com) */}
      <section className="section" style={{ borderTop: '1px solid var(--border-color)', backgroundColor: '#ffffff' }}>
        <div className="container">
          <div className="section-title-wrapper">
            <h2 className="section-title">บทความน่ารู้คู่บ้าน</h2>
            <p className="section-subtitle">สาระน่ารู้เกี่ยวกับระบบไฟฟ้า คอมพิวเตอร์เน็ตเวิร์ก และระบบบ้านอัจฉริยะที่คุณควรรู้</p>
          </div>

          <div className="services-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))' }}>
            {BRAND_CONFIG.articles.map((article) => (
              <article key={article.id} className="service-card" style={{ cursor: 'default' }}>
                <div className="service-image-wrapper" style={{ height: '180px' }}>
                  <img src={article.image} alt={article.title} loading="lazy" />
                  <div 
                    style={{
                      position: 'absolute',
                      top: '1rem',
                      left: '1rem',
                      backgroundColor: 'var(--primary)',
                      color: 'var(--dark)',
                      padding: '0.25rem 0.75rem',
                      borderRadius: 'var(--radius-sm)',
                      fontSize: '0.75rem',
                      fontWeight: '600'
                    }}
                  >
                    {article.date}
                  </div>
                </div>
                <div className="service-card-content" style={{ padding: '1.5rem' }}>
                  <h3 style={{ fontSize: '1.15rem', marginBottom: '0.75rem', lineHeight: '1.4' }}>{article.title}</h3>
                  <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '0' }}>{article.desc}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 5.8. Service Areas Section (Baanmefai inspired) */}
      <section className="section" style={{ backgroundColor: '#ffffff', borderTop: '1px solid var(--border-color)', borderBottom: '1px solid var(--border-color)' }}>
        <div className="container">
          <div className="section-title-wrapper">
            <h2 className="section-title">{BRAND_CONFIG.serviceAreas.title}</h2>
            <p className="section-subtitle">{BRAND_CONFIG.serviceAreas.subtitle}</p>
          </div>

          <div className="area-grid">
            {BRAND_CONFIG.serviceAreas.regions.map((region, index) => (
              <div key={index} className="area-card">
                <h3>
                  {renderIcon('MapPin', 18, 'var(--primary)')}
                  {region.name}
                </h3>
                <p>{region.detail}</p>
              </div>
            ))}
          </div>

          <div 
            style={{ 
              backgroundColor: 'var(--light)', 
              border: '1px solid var(--border-color)',
              borderRadius: 'var(--radius-md)',
              padding: '1.5rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '1rem',
              flexWrap: 'wrap',
              textAlign: 'center'
            }}
          >
            <span style={{ display: 'inline-flex', alignSelf: 'center', color: 'var(--primary)' }}>
              {renderIcon('AlertTriangle', 20, 'var(--primary)')}
            </span>
            <span style={{ fontWeight: '600', color: 'var(--dark)' }}>
              {BRAND_CONFIG.serviceAreas.mapTitle}
            </span>
            <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
              มีทีมช่างแสตนด์บายพร้อมให้บริการเคสเร่งด่วนฉุกเฉินตลอด 24 ชั่วโมง
            </span>
          </div>
        </div>
      </section>

      {/* 6. FAQ Accordion */}
      <section className="section" style={{ borderTop: '1px solid var(--border-color)' }}>
        <div className="container">
          <div className="section-title-wrapper">
            <h2 className="section-title">คำถามที่พบบ่อย</h2>
            <p className="section-subtitle">ไขข้อข้องใจและแนะนำการดูแลรักษาระบบไฟฟ้าเบื้องต้นภายในบ้าน</p>
          </div>

          <div className="faqs-container">
            {BRAND_CONFIG.faqs.map((faq, index) => {
              const isActive = activeFaq === index;
              return (
                <div key={faq.id} className={`faq-item ${isActive ? 'active' : ''}`}>
                  <button 
                    className="faq-header" 
                    onClick={() => toggleFaq(index)}
                    aria-expanded={isActive}
                  >
                    <span>{faq.question}</span>
                    <Icons.ChevronDown size={20} className="faq-icon" />
                  </button>
                  <div 
                    className="faq-body"
                    style={{ maxHeight: isActive ? '300px' : '0px' }}
                  >
                    <div className="faq-content">
                      <p>{faq.answer}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
