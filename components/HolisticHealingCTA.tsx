"use client";

import React from 'react';
import { motion } from 'framer-motion';
import Magnetic from '@/components/Magnetic';

export default function HolisticHealingCTA() {
  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <motion.section 
      id="holistic-healing"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      style={{ padding: '6rem 5%', maxWidth: '100%', margin: '0 auto' }}
    >
      <motion.div 
        variants={fadeInUp} 
        style={{ 
          background: 'linear-gradient(135deg, var(--primary), var(--primary-dark))', 
          color: 'white', 
          alignItems: 'center', 
          textAlign: 'center', 
          padding: 'clamp(2rem, 6vw, 5rem) clamp(1.5rem, 5vw, 3rem)',
          borderRadius: '2rem',
          maxWidth: '1200px',
          margin: '0 auto',
          boxShadow: 'var(--shadow-xl)'
        }}
      >
        <h2 style={{ color: 'white', fontSize: '2.5rem', marginBottom: '1.5rem', fontWeight: '800', letterSpacing: '-0.02em' }}>
          Holistic Healing
        </h2>
        <p style={{ fontSize: '1.25rem', maxWidth: '700px', margin: '0 auto', color: 'rgba(255,255,255,0.9)', lineHeight: '1.8' }}>
          We believe that mental and physical health are deeply interconnected. 
          Our approach treats the whole person—mind, body, and spirit—to ensure 
          long-lasting emotional clarity and physical vitality.
        </p>
        <Magnetic>
          <motion.a 
            href="#contact" 
            className="btn-primary" 
            style={{ 
              marginTop: '2.5rem', 
              background: 'white', 
              color: 'var(--primary-dark)',
              boxShadow: '0 10px 25px rgba(0,0,0,0.1)'
            }}
            whileHover={{ scale: 1.04, y: -2, boxShadow: '0 12px 30px rgba(0,0,0,0.15)' }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 400, damping: 15 }}
          >
            Book an Appointment Today
          </motion.a>
        </Magnetic>
      </motion.div>
    </motion.section>
  );
}
