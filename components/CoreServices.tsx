"use client";

import React from 'react';
import { motion } from 'framer-motion';
import Tilt from 'react-parallax-tilt';

export default function CoreServices() {
  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        type: "spring" as const,
        stiffness: 100,
        damping: 18,
        mass: 0.8
      } 
    }
  };

  return (
    <motion.section 
      id="core-services"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={staggerContainer}
      style={{ padding: '6rem 5% 2rem', maxWidth: '100%', margin: '0 auto', background: 'var(--background)' }}
    >
      <motion.h2 variants={fadeInUp} className="section-title" style={{ marginBottom: '3rem' }}>
        Services Offered
      </motion.h2>
      
      <div className="bento-grid" style={{ maxWidth: '1200px', margin: '0 auto' }}>
        
        <Tilt tiltMaxAngleX={3} tiltMaxAngleY={3} scale={1.01} transitionSpeed={2000} className="bento-item bento-half" style={{ display: 'flex' }}>
          <motion.div variants={fadeInUp} style={{ width: '100%' }}>
            <h3>Individual Counselling Services</h3>
            <ul className="service-list">
              <li>Parenting</li>
              <li>Teenage counselling</li>
              <li>Adolescent counselling</li>
              <li>Emotional disorders</li>
              <li>Lifestyle management</li>
              <li>Career guidance</li>
              <li>Geriatric counselling</li>
            </ul>
            <p className="service-target">
              For interpersonal relationships, working professionals, teenagers, parents, elderly
            </p>
          </motion.div>
        </Tilt>
        
        <Tilt tiltMaxAngleX={3} tiltMaxAngleY={3} scale={1.01} transitionSpeed={2000} className="bento-item bento-half" style={{ display: 'flex' }}>
          <motion.div variants={fadeInUp} style={{ width: '100%' }}>
            <h3>Group Counselling Services</h3>
            <ul className="service-list group-list">
              <li>Stress management</li>
              <li>Lifestyle management</li>
              <li>Communication Skills</li>
              <li>Goal Setting</li>
              <li>Time Management</li>
              <li>Interpersonal Relationships</li>
              <li>Business & Social Etiquette</li>
              <li>Emotional Intelligence</li>
              <li>Relationship management</li>
              <li>Classroom behavior management</li>
              <li>Study-skills techniques</li>
              <li>Effective parenting</li>
              <li>Teenage counselling</li>
              <li>Menopause</li>
            </ul>
            <p className="service-target">
              For working professionals, teachers, students & parents
            </p>
          </motion.div>
        </Tilt>

      </div>
    </motion.section>
  );
}
