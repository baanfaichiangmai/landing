import React from 'react';
import { Link } from 'react-router-dom';
import { Zap, Phone, Mail, MapPin, Clock, Facebook, ArrowRight } from 'lucide-react';
import { BRAND_CONFIG } from '../config';
import { version } from '../../package.json';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          {/* Column 1: Brand & Logo */}
          <div className="footer-brand">
            <Link to="/" className="footer-logo">
              <Zap size={28} fill="var(--primary)" color="var(--primary)" style={{ display: 'inline-block', verticalAlign: 'middle', marginRight: '0.4rem' }} />
              {BRAND_CONFIG.title.split(' ')[0]} <span>{BRAND_CONFIG.title.split(' ').slice(1).join(' ')}</span>
            </Link>
            <p className="footer-desc">
              {BRAND_CONFIG.subtitle}
            </p>
            <div className="footer-socials">
              <a href={BRAND_CONFIG.facebook} target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="Facebook">
                <Facebook size={18} />
              </a>
              <a href={BRAND_CONFIG.lineLink} target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="Line ID" style={{ fontWeight: 'bold', fontSize: '0.85rem' }}>
                L
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="footer-column">
            <h4>เมนูนำทาง</h4>
            <div className="footer-links">
              <Link to="/" className="footer-link">หน้าแรก</Link>
              <Link to="/services" className="footer-link">บริการของเรา</Link>
              <Link to="/about" className="footer-link">เกี่ยวกับเรา</Link>
              <Link to="/portfolio" className="footer-link">ผลงานที่ผ่านมา</Link>
              <Link to="/contact" className="footer-link">ติดต่อเรา</Link>
            </div>
          </div>

          {/* Column 3: Service categories */}
          <div className="footer-column">
            <h4>บริการยอดนิยม</h4>
            <div className="footer-links">
              <Link to="/services#urgent-repair" className="footer-link">ซ่อมไฟฟ้าฉุกเฉินด่วน</Link>
              <Link to="/services#wiring-cabling" className="footer-link">เดินสายระบบไฟ / สายแลน</Link>
              <Link to="/services#main-panel" className="footer-link">ติดตั้งและซ่อมแซมตู้ไฟหลัก</Link>
              <Link to="/services#smart-home" className="footer-link">ระบบบ้านอัจฉริยะ Smart Home</Link>
            </div>
          </div>

          {/* Column 4: Direct Contacts */}
          <div className="footer-column">
            <h4>ข้อมูลติดต่อ</h4>
            <div className="footer-contact-info">
              <div className="footer-contact-item">
                <Phone size={16} className="footer-contact-item-icon" />
                <div>
                  <a href={`tel:${BRAND_CONFIG.phoneRaw}`} style={{ fontWeight: '600', color: '#ffffff' }}>
                    {BRAND_CONFIG.phone}
                  </a>
                </div>
              </div>
              <div className="footer-contact-item">
                <Mail size={16} className="footer-contact-item-icon" />
                <div>
                  <a href={`mailto:${BRAND_CONFIG.email}`}>{BRAND_CONFIG.email}</a>
                </div>
              </div>
              <div className="footer-contact-item">
                <Clock size={16} className="footer-contact-item-icon" />
                <div>
                  <p>{BRAND_CONFIG.workingHours}</p>
                </div>
              </div>
              <div className="footer-contact-item">
                <MapPin size={16} className="footer-contact-item-icon" />
                <div>
                  <p>{BRAND_CONFIG.address}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} {BRAND_CONFIG.title}. All Rights Reserved. | v{version}</p>
        </div>
      </div>
    </footer>
  );
}
