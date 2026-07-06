"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { servicesData } from '@/data/servicesData';

export default function ComprehensiveServices() {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <motion.section 
      id="comprehensive-services"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      variants={staggerContainer}
      style={{ padding: '6rem 2rem', maxWidth: '1200px', margin: '0 auto' }}
    >
      <motion.div variants={fadeInUp} style={{ textAlign: 'center', marginBottom: '4rem' }}>
        <h2 className="section-title">Holistic Programs & Consultations</h2>
        <p style={{ fontSize: '1.2rem', color: '#475569', maxWidth: '700px', margin: '0 auto' }}>
          Explore our specialized programs designed for holistic well-being, personal growth, and professional development.
        </p>
      </motion.div>

      <div className="services-grid">
        {servicesData.map((service) => {
          const isExpanded = expandedId === service.id;

          return (
            <motion.div 
              layout
              variants={fadeInUp}
              key={service.id} 
              className={`service-card ${isExpanded ? 'expanded' : ''}`}
              onClick={() => setExpandedId(isExpanded ? null : service.id)}
            >
              <motion.div layout="position" className="service-card-header">
                <div className="service-icon">{service.icon}</div>
                <h3 className="service-title">{service.title}</h3>
              </motion.div>
              
              <AnimatePresence mode="wait">
                {!isExpanded ? (
                  <motion.div 
                    key="short"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, display: 'none' }}
                    transition={{ duration: 0.2 }}
                    className="service-desc-container"
                  >
                    <p className="service-short-desc">{service.shortDescription}</p>
                    <div className="service-action-link">
                      <span>Explore details</span>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div 
                    key="full"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="service-desc-container"
                  >
                    <div className="service-full-desc-text">
                      {service.fullDescription}
                    </div>
                    <div className="service-action-link expanded">
                      <span>Show less</span>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m18 15-6-6-6 6"></path></svg>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </motion.section>
  );
}
