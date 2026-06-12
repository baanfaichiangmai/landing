import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, ShieldAlert, Award, Star, Clock, Heart } from 'lucide-react';
import { BRAND_CONFIG } from '../config';

export default function About() {
  return (
    <div className="section" style={{ paddingTop: '7.5rem' }}>
      <div className="container">
        {/* Banner Grid */}
        <div className="about-grid" style={{ marginBottom: '5rem' }}>
          <div className="about-image-side" style={{ maxHeight: '450px' }}>
            <img 
              src={BRAND_CONFIG.aboutImage} 
              alt="ทีมงานช่างมืออาชีพ" 
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              loading="lazy"
            />
          </div>
          
          <div className="about-content-side">
            <span className="portfolio-tag" style={{ alignSelf: 'flex-start' }}>เกี่ยวกับเรา</span>
            <h1>ยกระดับมาตรฐานงานช่างบริการ</h1>
            <h3 style={{ color: 'var(--primary)', fontWeight: '600', fontSize: '1.25rem' }}>
              ความปลอดภัย รวดเร็ว ได้มาตรฐานสากล
            </h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', lineHeight: '1.8' }}>
              แบรนด์ <strong>{BRAND_CONFIG.title}</strong> ก่อตั้งขึ้นจากความมุ่งมั่นในการแก้ปัญหาและยกระดับงานบริการช่างไฟฟ้าภายในอาคารและระบบเครือข่ายอินเทอร์เน็ตในประเทศไทย 
              เราตระหนักดีว่าปัญหาเรื่องไฟฟ้าและเน็ตเวิร์กภายในบ้านมีความเร่งด่วนและเกี่ยวข้องกับความปลอดภัยในชีวิตและทรัพย์สินของผู้อยู่อาศัยเป็นหลัก
            </p>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', lineHeight: '1.8' }}>
              เราจึงมุ่งเน้นการคัดเลือกเฉพาะช่างฝีมือผู้ชำนาญการที่มีใบประกอบอนุญาตช่างไฟฟ้าภายในอาคารอย่างถูกต้อง พร้อมทั้งฝึกอบรมมารยาทการบริการและความเป็นระเบียบเรียบร้อย 
              เพื่อให้คุณได้รับประสบการณ์การซ่อมแซมและติดตั้งระบบไฟฟ้าที่ดีที่สุด ปลอดภัยและอุ่นใจที่สุดในทุกขั้นตอน
            </p>
          </div>
        </div>

        {/* 4 Pillars of service */}
        <div className="section-title-wrapper" style={{ marginBottom: '3.5rem' }}>
          <h2 className="section-title">มาตรฐานบริการของเรา</h2>
          <p className="section-subtitle">
            ความน่าเชื่อถือและความโปร่งใสคือหัวใจสำคัญในการทำงานช่างที่เรายึดมั่นสูงสุด
          </p>
        </div>

        <div className="about-features" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', marginBottom: '5rem' }}>
          <div className="about-feature-card">
            <ShieldCheck size={36} className="about-feature-icon" />
            <h4>ช่างทุกคนมีใบอนุญาต</h4>
            <p>ผ่านการทดสอบและได้รับหนังสือรับรองความรู้ความสามารถ สาขาช่างไฟฟ้าภายในอาคารอย่างถูกต้องตามกฎหมาย</p>
          </div>

          <div className="about-feature-card">
            <ShieldAlert size={36} className="about-feature-icon" />
            <h4>ตรวจสอบประวัติอาชญากรรม</h4>
            <p>ช่างทุกคนต้องผ่านการตรวจสอบประวัติอย่างเข้มข้นก่อนเข้าร่วมงาน เพื่อความมั่นใจในความปลอดภัยสูงสุดของครอบครัวคุณ</p>
          </div>

          <div className="about-feature-card">
            <Award size={36} className="about-feature-icon" />
            <h4>ติดกล้อง Body Camera</h4>
            <p>ช่างติดตั้งกล้องบันทึกภาพตลอดการทำงาน เพื่อความโปร่งใส ปลอดภัย และบันทึกขั้นตอนการปฏิบัติงานเพื่อตรวจสอบ</p>
          </div>

          <div className="about-feature-card">
            <Heart size={36} className="about-feature-icon" />
            <h4>ความเรียบร้อยและมารยาทดี</h4>
            <p>อบรมมารยาทอย่างเข้มงวด ทำงานสะอาด ปัดกวาดเช็ดถูฝุ่นปูนและเก็บเศษสายไฟเรียบร้อยก่อนปิดงานเสมอ</p>
          </div>
        </div>

        {/* Call to Action */}
        <div 
          style={{ 
            background: 'linear-gradient(135deg, var(--dark-soft) 0%, var(--dark) 100%)',
            color: '#ffffff',
            borderRadius: 'var(--radius-lg)',
            padding: '4rem 3rem',
            textAlign: 'center',
            boxShadow: 'var(--shadow-lg)'
          }}
        >
          <h2 style={{ color: '#ffffff', marginBottom: '1rem' }}>เกิดปัญหาระบบไฟฟ้าขัดข้อง หรือต้องการติดตั้งระบบใหม่?</h2>
          <p style={{ color: 'rgba(255,255,255,0.85)', maxWidth: '700px', margin: '0 auto 2.5rem auto', fontSize: '1.1rem' }}>
            ทีมงาน {BRAND_CONFIG.title} พร้อมสแตนด์บายดูแลคุณอย่างเร่งด่วน ประเมินราคาก่อนเริ่มงาน ไม่มีค่าใช้จ่ายแอบแฝง
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '1.25rem' }}>
            <Link to="/contact" className="btn btn-primary">
              จองคิวช่าง / นัดหมายประเมินราคา
            </Link>
            <a href={`tel:${BRAND_CONFIG.phoneRaw}`} className="btn btn-outline-white">
              โทรติดต่อด่วน: {BRAND_CONFIG.phone}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
