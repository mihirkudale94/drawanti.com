import React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Online Consultation & Patient Intake | Dr. Awanti Dhadphale',
  description: 'Complete your homoeopathic case record and informed consent prior to your online consultation.',
};

const pdfHref = '/Homeopathic_Case_Record.pdf';

export default function PatientIntakePage() {
  return (
    <main style={{ paddingTop: '10rem', paddingBottom: '6rem', background: '#f8fafc', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ maxWidth: '600px', margin: '0 auto', padding: '0 1rem' }}>
        <section style={{ padding: 0, background: 'white', borderRadius: '24px', boxShadow: '0 10px 25px rgba(0,0,0,0.05)', textAlign: 'center', border: '1px solid #e2e8f0' }}>
          <div style={{ padding: '3rem' }}>
        
            <div style={{ background: 'rgba(30, 58, 138, 0.05)', width: '80px', height: '80px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 2rem' }}>
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                <polyline points="14 2 14 8 20 8"></polyline>
                <line x1="12" y1="18" x2="12" y2="12"></line>
                <line x1="9" y1="15" x2="15" y2="15"></line>
              </svg>
            </div>

            <h1 style={{ fontSize: '2rem', color: 'var(--primary-dark)', fontWeight: '800', marginBottom: '1rem', letterSpacing: '-0.02em' }}>
              Online Consultation Form
            </h1>
            <p style={{ color: '#475569', fontSize: '1.1rem', marginBottom: '2.5rem', lineHeight: '1.6' }}>
              To ensure Dr. Awanti has all the necessary information to provide holistic care, please download and complete the Homoeopathic Case Record before your consultation.
            </p>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <a href={pdfHref} download="Homeopathic_Case_Record.pdf" className="btn-primary" style={{ width: '100%', maxWidth: '300px', display: 'flex', justifyContent: 'center', gap: '0.5rem' }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                  <polyline points="7 10 12 15 17 10"></polyline>
                  <line x1="12" y1="15" x2="12" y2="3"></line>
                </svg>
                Download PDF Form
              </a>
            </div>
            
            <p style={{ fontSize: '0.9rem', color: '#64748b', marginTop: '1.5rem' }}>
              Once completed, please scan or take a clear photo and email it to:<br/>
              <a href="mailto:drawanti@gmail.com" style={{ color: 'var(--primary)', fontWeight: '600', textDecoration: 'none' }}>drawanti@gmail.com</a>
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
