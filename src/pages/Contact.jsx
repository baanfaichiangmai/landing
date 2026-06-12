import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Phone, Mail, MapPin, Clock, Send, CheckCircle, AlertCircle } from 'lucide-react';
import { BRAND_CONFIG } from '../config';

export default function Contact() {
  const location = useLocation();
  
  // Form States
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [serviceType, setServiceType] = useState('general');
  const [message, setMessage] = useState('');
  
  // Validation States
  const [errors, setErrors] = useState({});
  const [isSuccess, setIsSuccess] = useState(false);

  // Load subject from query parameter if present
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const serviceParam = params.get('service');
    if (serviceParam) {
      // Find matching service title in config
      const matchingService = BRAND_CONFIG.services.find(
        s => s.title.toLowerCase() === serviceParam.toLowerCase()
      );
      if (matchingService) {
        setServiceType(matchingService.id);
      }
    }
    window.scrollTo(0, 0);
  }, [location]);

  // Handle submit form
  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!name.trim()) {
      newErrors.name = 'กรุณากรอกชื่อ-นามสกุล';
    }
    
    if (!phone.trim()) {
      newErrors.phone = 'กรุณากรอกเบอร์โทรศัพท์ติดต่อ';
    } else if (!/^[0-9\-+() ]{9,15}$/.test(phone.trim())) {
      newErrors.phone = 'รูปแบบเบอร์โทรศัพท์ไม่ถูกต้อง';
    }

    if (email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      newErrors.email = 'รูปแบบอีเมลไม่ถูกต้อง';
    }

    if (!message.trim()) {
      newErrors.message = 'กรุณากรอกรายละเอียดปัญหาหรือข้อความของคุณ';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      setErrors({});
      setIsSuccess(true);
      
      // Log mock contact message to console for development verification
      console.log('Contact message received:', {
        name,
        phone,
        email,
        serviceType: BRAND_CONFIG.services.find(s => s.id === serviceType)?.title || 'ทั่วไป',
        message
      });

      // Clear Form Fields
      setName('');
      setPhone('');
      setEmail('');
      setServiceType('general');
      setMessage('');
    }
  };

  return (
    <div className="section" style={{ paddingTop: '7.5rem' }}>
      <div className="container">
        {/* Section title */}
        <div className="section-title-wrapper">
          <h1 className="section-title">ติดต่อเรา</h1>
          <p className="section-subtitle">
            คุณสามารถทักแชทไลน์ โทรศัพท์ หรือส่งรายละเอียดข้อความเพื่อประเมินราคาระบบงานช่างได้ตลอดเวลา
          </p>
        </div>

        <div className="contact-container">
          {/* Left Column: Direct Contacts */}
          <div className="contact-info-side">
            <div className="contact-info-card">
              <h3 className="contact-info-title">ช่องทางการติดต่อ</h3>
              <div className="contact-methods">
                
                <div className="contact-method-item">
                  <div className="contact-method-icon">
                    <Phone size={18} fill="currentColor" />
                  </div>
                  <div className="contact-method-text">
                    <h5>เบอร์โทรศัพท์ติดต่อด่วน</h5>
                    <p>
                      <a href={`tel:${BRAND_CONFIG.phoneRaw}`} style={{ color: 'var(--dark)' }}>
                        {BRAND_CONFIG.phone}
                      </a>
                    </p>
                  </div>
                </div>

                <div className="contact-method-item">
                  <div className="contact-method-icon">
                    <Send size={18} />
                  </div>
                  <div className="contact-method-text">
                    <h5>Line Official Account</h5>
                    <p>
                      <a href={BRAND_CONFIG.lineLink} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--dark)' }}>
                        {BRAND_CONFIG.lineId}
                      </a>
                    </p>
                  </div>
                </div>

                <div className="contact-method-item">
                  <div className="contact-method-icon">
                    <Mail size={18} />
                  </div>
                  <div className="contact-method-text">
                    <h5>อีเมลติดต่อ</h5>
                    <p>
                      <a href={`mailto:${BRAND_CONFIG.email}`} style={{ color: 'var(--dark)' }}>
                        {BRAND_CONFIG.email}
                      </a>
                    </p>
                  </div>
                </div>

                <div className="contact-method-item">
                  <div className="contact-method-icon">
                    <Clock size={18} />
                  </div>
                  <div className="contact-method-text">
                    <h5>เวลาทำการ</h5>
                    <p>{BRAND_CONFIG.workingHours}</p>
                  </div>
                </div>

                <div className="contact-method-item">
                  <div className="contact-method-icon">
                    <MapPin size={18} />
                  </div>
                  <div className="contact-method-text">
                    <h5>พื้นที่การให้บริการหลัก</h5>
                    <p>{BRAND_CONFIG.address}</p>
                  </div>
                </div>

              </div>
            </div>

            {/* Service Area Simulated Map Overlay */}
            <div className="contact-map-sim">
              <img 
                src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=600&q=80" 
                alt="พื้นที่การให้บริการครอบคลุมกรุงเทพฯและปริมณฑล" 
                loading="lazy" 
              />
              <div className="map-overlay">
                <div>
                  <MapPin size={36} fill="var(--primary)" color="var(--dark)" style={{ display: 'inline-block', marginBottom: '0.5rem' }} />
                  <p>ให้บริการทั่วกรุงเทพมหานคร<br />และจังหวัดปริมณฑล</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="contact-form-side">
            <h3 style={{ marginBottom: '1.5rem', fontSize: '1.4rem' }}>ส่งข้อความนัดหมายช่าง</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '2rem' }}>
              กรอกฟอร์มเพื่อลงทะเบียนแจ้งอาการเสียหรือประเมินราคาเบื้องต้น แอดมินจะตอบกลับและนัดช่างให้คุณภายใน 15 นาที
            </p>
            
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label" htmlFor="name">ชื่อ-นามสกุลของคุณ <span style={{ color: '#dc2626' }}>*</span></label>
                <input 
                  type="text" 
                  id="name" 
                  className={`form-control ${errors.name ? 'input-error' : ''}`}
                  placeholder="เช่น สมชาย สุขสบาย"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                {errors.name && <span className="error-text">{errors.name}</span>}
              </div>

              <div className="form-group-row">
                <div className="form-group">
                  <label className="form-label" htmlFor="phone">เบอร์โทรศัพท์ติดต่อ <span style={{ color: '#dc2626' }}>*</span></label>
                  <input 
                    type="tel" 
                    id="phone" 
                    className={`form-control ${errors.phone ? 'input-error' : ''}`}
                    placeholder="เช่น 0812345678"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                  {errors.phone && <span className="error-text">{errors.phone}</span>}
                </div>
                
                <div className="form-group">
                  <label className="form-label" htmlFor="email">อีเมลติดต่อ (ถ้ามี)</label>
                  <input 
                    type="email" 
                    id="email" 
                    className={`form-control ${errors.email ? 'input-error' : ''}`}
                    placeholder="เช่น example@domain.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  {errors.email && <span className="error-text">{errors.email}</span>}
                </div>
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="serviceType">เลือกประเภทบริการที่ต้องการ</label>
                <select 
                  id="serviceType" 
                  className="form-control"
                  value={serviceType}
                  onChange={(e) => setServiceType(e.target.value)}
                >
                  <option value="general">สอบถามบริการทั่วไป / ประเมินราคางานช่าง</option>
                  {BRAND_CONFIG.services.map(s => (
                    <option key={s.id} value={s.id}>{s.title}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="message">อธิบายอาการเสีย / งานที่ต้องการให้ติดตั้ง <span style={{ color: '#dc2626' }}>*</span></label>
                <textarea 
                  id="message" 
                  className={`form-control ${errors.message ? 'input-error' : ''}`}
                  placeholder="เช่น ต้องการเพิ่มจุดปลั๊กไฟห้องรับแขก 2 จุด หรือ แจ้งตู้ไฟที่บ้านทริปบ่อยครั้ง..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
                {errors.message && <span className="error-text">{errors.message}</span>}
              </div>

              <button type="submit" className="btn btn-dark" style={{ width: '100%', padding: '1rem', marginTop: '1rem' }}>
                <Send size={18} /> ส่งข้อมูลนัดหมายช่าง
              </button>
            </form>
          </div>
        </div>

        {/* Success Lightbox Popup Modal */}
        {isSuccess && (
          <div className="modal-overlay" onClick={() => setIsSuccess(false)}>
            <div className="modal-container success-modal" style={{ maxWidth: '400px', gridTemplateColumns: '1fr' }} onClick={(e) => e.stopPropagation()}>
              <button className="modal-close-btn" onClick={() => setIsSuccess(false)}>
                <CheckCircle size={20} />
              </button>
              <div className="success-icon">
                <CheckCircle size={48} />
              </div>
              <h2 style={{ fontSize: '1.5rem', marginBottom: '0.75rem' }}>ส่งข้อมูลนัดหมายสำเร็จ!</h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginBottom: '1.75rem' }}>
                ขอบคุณที่ไว้วางใจบริการช่างของเรา ทีมงานแอดมินและช่างจะรีบติดต่อกลับไปยังเบอร์โทรศัพท์ที่ท่านระบุโดยด่วนที่สุดครับ
              </p>
              <button className="btn btn-primary" style={{ width: '100%' }} onClick={() => setIsSuccess(false)}>
                ตกลง
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
