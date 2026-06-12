import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Zap, Menu, X, Phone, MessageSquare } from 'lucide-react';
import { BRAND_CONFIG } from '../config';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const isActive = (path) => location.pathname === path;

  return (
    <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="container header-container">
        <Link to="/" className="logo">
          {BRAND_CONFIG.logoUrl ? (
            <img src={BRAND_CONFIG.logoUrl} alt={BRAND_CONFIG.title} style={{ height: '2.5rem' }} />
          ) : (
            <>
              <Zap size={24} fill="var(--primary)" color="var(--primary)" />
              {BRAND_CONFIG.shortName.split(' ')[0]} <span>{BRAND_CONFIG.shortName.split(' ').slice(1).join(' ')}</span>
            </>
          )}
        </Link>

        <nav className={`nav-links ${isOpen ? 'open' : ''}`}>
          <Link to="/" className={`nav-link ${isActive('/') ? 'active' : ''}`}>
            หน้าแรก
          </Link>
          <Link to="/services" className={`nav-link ${isActive('/services') ? 'active' : ''}`}>
            บริการของเรา
          </Link>
          <Link to="/about" className={`nav-link ${isActive('/about') ? 'active' : ''}`}>
            เกี่ยวกับเรา
          </Link>
          <Link to="/portfolio" className={`nav-link ${isActive('/portfolio') ? 'active' : ''}`}>
            ผลงานที่ผ่านมา
          </Link>
          <Link to="/contact" className={`nav-link ${isActive('/contact') ? 'active' : ''}`}>
            ติดต่อเรา
          </Link>
          
          {/* Mobile Only Quick Contacts */}
          {isOpen && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '100%', marginTop: '1.5rem' }}>
              <a href={`tel:${BRAND_CONFIG.phoneRaw}`} className="btn btn-primary" style={{ width: '100%' }}>
                <Phone size={18} /> โทรด่วน: {BRAND_CONFIG.phone}
              </a>
              <a href={BRAND_CONFIG.lineLink} target="_blank" rel="noopener noreferrer" className="btn btn-dark" style={{ width: '100%', backgroundColor: '#06c755', borderColor: '#06c755' }}>
                <MessageSquare size={18} /> ทักแชท Line
              </a>
            </div>
          )}
        </nav>

        <div className="nav-actions">
          <a href={`tel:${BRAND_CONFIG.phoneRaw}`} className="btn btn-secondary" style={{ padding: '0.5rem 1.25rem', fontSize: '0.875rem' }}>
            <Phone size={16} /> โทร: {BRAND_CONFIG.phone}
          </a>
          <a href={BRAND_CONFIG.lineLink} target="_blank" rel="noopener noreferrer" className="btn btn-primary" style={{ padding: '0.5rem 1.25rem', fontSize: '0.875rem' }}>
            <MessageSquare size={16} /> Line
          </a>
        </div>

        <button className="menu-toggle" onClick={() => setIsOpen(!isOpen)} aria-label="Toggle Menu">
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
    </header>
  );
}
