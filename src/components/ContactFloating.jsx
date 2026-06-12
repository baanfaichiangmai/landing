import React from 'react';
import { Phone, MessageCircle } from 'lucide-react';
import { BRAND_CONFIG } from '../config';

export default function ContactFloating() {
  return (
    <div className="floating-actions">
      {/* Line Contact Button */}
      <a 
        href={BRAND_CONFIG.lineLink} 
        target="_blank" 
        rel="noopener noreferrer" 
        className="floating-btn floating-line"
        aria-label="Contact via Line"
      >
        <MessageCircle size={24} fill="#ffffff" />
        <span className="floating-tooltip">คุยไลน์แอด {BRAND_CONFIG.lineId}</span>
      </a>

      {/* Direct Phone Call Button */}
      <a 
        href={`tel:${BRAND_CONFIG.phoneRaw}`} 
        className="floating-btn floating-phone"
        aria-label="Call Direct"
      >
        <Phone size={24} fill="var(--dark)" />
        <span className="floating-tooltip">โทรติดต่อ {BRAND_CONFIG.phone}</span>
      </a>
    </div>
  );
}
