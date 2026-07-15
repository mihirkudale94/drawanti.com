"use client";

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import FAQ from '@/components/FAQ';
import ComprehensiveServices from '@/components/ComprehensiveServices';
import CoreServices from '@/components/CoreServices';
import HolisticHealingCTA from '@/components/HolisticHealingCTA';
import VideoInsights from '@/components/VideoInsights';
import { motion } from 'framer-motion';
import Tilt from 'react-parallax-tilt';
import Magnetic from '@/components/Magnetic';

const HERO_HEADING = "A Sound Mind in\nA Sound Body";

const MotionLink = motion.create(Link);

export default function Home() {
  const [typedHeading, setTypedHeading] = useState("");

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduceMotion) {
      const reduceMotionTimer = window.setTimeout(() => {
        setTypedHeading(HERO_HEADING);
      }, 0);

      return () => window.clearTimeout(reduceMotionTimer);
    }

    let index = 0;
    const typeTimer = window.setInterval(() => {
      index += 1;
      setTypedHeading(HERO_HEADING.slice(0, index));

      if (index >= HERO_HEADING.length) {
        window.clearInterval(typeTimer);
      }
    }, 65);

    return () => window.clearInterval(typeTimer);
  }, []);

  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const headingLines = typedHeading.split("\n");

  return (
    <main>
      {/* 1. Hero Section */}
      <section id="hero" className="hero">
        <div className="ambient-calm-bg" aria-hidden="true">
          <div className="ambient-blob ambient-blob-primary"></div>
          <div className="ambient-blob ambient-blob-secondary"></div>
          <div className="ambient-blob ambient-blob-accent"></div>
        </div>
        <motion.div 
          className="hero-content"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={fadeInUp} className="pill-badge">
            <span>✨</span> Now accepting online & in-clinic consultations
          </motion.div>
          <motion.h1
            className="hero-heading"
            variants={fadeInUp}
          >
            {headingLines.map((line, index) => (
              <span className="hero-heading-line" key={`heading-line-${index}`}>
                {line}
                {index === headingLines.length - 1 && (
                  <span className="typewriter-cursor" aria-hidden="true" />
                )}
              </span>
            ))}
          </motion.h1>
          <motion.p variants={fadeInUp}>& We Take Care of Both.</motion.p>
          
          <motion.div variants={fadeInUp} style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'center', marginTop: '1rem' }}>
            <Magnetic>
              <motion.a 
                href="/patient-intake" 
                className="btn-primary" 
                style={{ background: 'var(--secondary)' }}
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: "spring", stiffness: 400, damping: 15 }}
              >
                Start Online Consultation
              </motion.a>
            </Magnetic>
            <Magnetic>
              <motion.a 
                href="#core-services" 
                className="btn-primary" 
                style={{ background: 'transparent', color: 'var(--primary-dark)', border: '1px solid var(--primary-dark)' }}
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: "spring", stiffness: 400, damping: 15 }}
              >
                Explore Services
              </motion.a>
            </Magnetic>
          </motion.div>
          
          <motion.div variants={fadeInUp} className="trust-bar" style={{ marginTop: '4rem' }}>
            <div className="trust-item">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M9 12l2 2 4-4"/></svg>
              15+ Years Experience
            </div>
            <div className="trust-item">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>
              B.H.M.S., M.A. (Psychology)
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* 2. Core Problem Section (Empathy) */}
      <motion.section 
        id="problem" 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeInUp}
      >
        <div style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontSize: '2.5rem', color: 'var(--primary-dark)', fontWeight: '800', lineHeight: '1.2', marginBottom: '1.5rem', letterSpacing: '-0.02em' }}>
            A sanctuary for emotional clarity, holistic healing, and empowered learning
          </h2>
          <p style={{ fontSize: '1.3rem', color: '#475569', marginBottom: '4rem', fontStyle: 'italic' }}>
            Healing is not just about treatment—it&apos;s about trust, empathy, and transformation.
          </p>

          <Tilt tiltMaxAngleX={2} tiltMaxAngleY={2} scale={1.01} transitionSpeed={2000}>
            <div style={{ background: 'linear-gradient(135deg, rgba(0, 128, 128, 0.05), rgba(46, 139, 87, 0.05))', padding: '4rem 3rem', borderRadius: '2rem', border: '1px solid rgba(0, 128, 128, 0.1)' }}>
              <h3 style={{ color: 'var(--primary)', fontSize: '1.2rem', textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: '1rem', fontWeight: '700' }}>
                The Core Problem We solve best
              </h3>
              <h4 style={{ fontSize: '2.2rem', color: 'var(--primary-dark)', marginBottom: '1.5rem', fontWeight: '800', letterSpacing: '-0.02em' }}>
                Emotional disconnection in everyday life
              </h4>
              <p style={{ fontSize: '1.25rem', color: '#475569', lineHeight: '1.8', maxWidth: '700px', margin: '0 auto' }}>
                I help people reconnect—with themselves, their emotions, and their purpose. 
                Whether it&apos;s a teenager, a teacher, or a parent, we address the root cause to guide you towards a balanced and fulfilling life.
              </p>
            </div>
          </Tilt>
        </div>
      </motion.section>

      {/* 3. About Section (The Authority - Moved Up) */}
      <motion.section 
        id="about" 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeInUp}
      >
        <h2 className="section-title">About Dr. Awanti Dhadphale</h2>
        <div className="about-container">
          <Tilt className="about-image" tiltMaxAngleX={4} tiltMaxAngleY={4} scale={1.03} transitionSpeed={2000}>
            <Image 
              src="/dravanti.jpg" 
              alt="Dr. Awanti Dhadphale" 
              width={500} 
              height={500} 
              style={{ width: '100%', height: 'auto', display: 'block' }} 
              priority
            />
          </Tilt>
          <div className="about-text">
            <h3>B.H.M.S., M.A. (Psychology)</h3>
            <p style={{ marginBottom: '1.2rem' }}>
              Dr. Awanti is a compassionate and experienced practitioner who blends classical homeopathy with psychological insight to offer holistic healing. She completed her Bachelor of Homeopathic Medicine and Surgery (BHMS) in 2007 and holds a Master&apos;s degree in Psychology. Her journey has been shaped by a deep commitment to understanding the human mind and emotions, and she has further enriched her practice with training in Rational Emotive Behavioral Therapy (REBT). As a certified soft skills trainer, she brings a unique blend of empathy, communication, and therapeutic depth to every interaction.
            </p>
            <p style={{ marginBottom: '1.2rem' }}>
              Her clinic is a safe, non-judgmental space where individuals of all ages feel seen, heard, and supported. Dr. Awanti&apos;s ability to empathize with clients, offer unconditional positive regard, and create a sense of ease has earned her the trust of countless patients and families. Whether working with children, adolescents, adults, or professionals, she brings clarity, warmth, and insight to every session. Her vast experience in addressing both physical and emotional challenges allows her to treat the whole person—not just the symptoms.
            </p>
            <p style={{ marginBottom: '1.2rem' }}>
              Dr. Awanti uses a thoughtful combination of classical homeopathic medicines, flower remedies, and counseling techniques to support healing. She also offers online consultations, making her services accessible to those beyond her immediate community. Her approach is deeply personalized, rooted in understanding each individual&apos;s emotional landscape and life context.
            </p>
            <p style={{ marginBottom: '1.2rem' }}>
              Beyond her clinical practice, Dr. Awanti is a passionate educator and facilitator. She regularly visits schools, colleges, and organizations to conduct workshops and training programs for students, parents, and professionals. Her sessions cover a wide range of topics including parenting, adolescent counseling, stress management, personality development, and study skills. These workshops are known for being interactive, practical, and emotionally enriching—blending psychological theory with real-life tools.
            </p>
            <p style={{ marginBottom: '1.2rem' }}>
              Her voice extends into the media as well. Dr. Awanti writes insightful articles on parenting and emotional wellness for newspapers like Lokmat, and has been featured in podcasts that explore mental health, youth empowerment, and holistic living. Her ability to connect with the youth, understand body language, and decode emotional cues makes her a powerful guide for those seeking clarity and confidence.
            </p>
            <p>
              At the heart of her work is a simple yet profound mission: to help people feel empowered, emotionally balanced, and deeply understood. Her presence is calming, her listening is intuitive, and her support is unwavering. For those seeking healing, growth, or guidance, Dr. Awanti offers not just treatment—but transformation.
            </p>
          </div>
        </div>
      </motion.section>

      {/* 4. Core Services Section (Individual & Group) */}
      <CoreServices />

      {/* 5. Video Insights Section (Reels - Moved Up) */}
      <VideoInsights />

      {/* 6. Comprehensive Services Section (Programs) */}
      <ComprehensiveServices />

      {/* 7. Insights / Success Stories Section (Deep Validation) */}
      <motion.section 
        id="insights" 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
        style={{ background: 'var(--surface)', borderTop: '1px solid var(--surface-border)' }}
      >
        <motion.h2 variants={fadeInUp} className="section-title">Success Stories & Insights</motion.h2>
        <div className="story-grid">
          
          <Tilt tiltMaxAngleX={2} tiltMaxAngleY={2} scale={1.01} transitionSpeed={2500} style={{ display: 'flex' }}>
            <motion.div variants={fadeInUp} className="story-card">
              <div className="story-header">
                <h3>Beyond the Report Card</h3>
                <p className="story-meta">What a 13-year-old taught me about emotional well-being and academic pressure.</p>
              </div>
              <div className="story-content">
                <p>Just last week, a familiar face walked into my clinic – a bright 13-year-old boy I&apos;ve known for years, accompanied by his mother. The reason for their visit? A failing grade in his final math exam. What struck me immediately, beyond the academic setback, was the dramatic decline in his usually neat handwriting; it was now almost illegible.</p>
                <p>As a Homeopathic doctor and psychologist, I&apos;ve learned that symptoms often tell a deeper story. I kindly asked his mother to wait outside, and that&apos;s when he opened up. He confessed that the memory of his mother&apos;s scolding the day before the exam, coupled with the fear of her reaction to failure, completely overwhelmed him. His mind, instead of focusing on the math problems, was consumed by this emotional turmoil. The result? He couldn&apos;t articulate his answers, leading to the failing grade.</p>
                <p>This experience was a powerful reminder of how deeply our emotional state impacts our cognitive functions, especially in young people. We often overlook the immense pressure and internal conflicts children face.</p>
                <p style={{ fontWeight: '600', color: 'var(--primary)', marginTop: '1.5rem', padding: '1rem', background: 'rgba(0, 128, 128, 0.05)', borderRadius: '0.5rem' }}>Let&apos;s remember to look beyond the surface, to listen with empathy, and to acknowledge the emotional landscapes of our children. Their well-being is the foundation for their success in all aspects of life!</p>
              </div>
            </motion.div>
          </Tilt>

          <Tilt tiltMaxAngleX={2} tiltMaxAngleY={2} scale={1.01} transitionSpeed={2500} style={{ display: 'flex' }}>
            <motion.div variants={fadeInUp} className="story-card">
              <div className="story-header">
                <h3>From Distraction to Direction</h3>
                <p className="story-meta">A holistic approach to guiding a 17-year-old through teenage transformation.</p>
              </div>
              <div className="story-content">
                <p>Recently, I had in the clinic, a bright 17-year-old girl and her parents. &quot;She was a brilliant student in 10th grade,&quot; her parents shared, &quot;but now she&apos;s completely distracted.&quot; Their daughter, once academically strong, was now struggling with focus.</p>
                <p>Additionally, a pattern of concerning behaviors had emerged: speaking lies, hiding junk food, skipping college, continuous phone usage, and ignoring her younger sister. These behaviors, while distressing for parents, were highlighting a few unmet emotional or developmental needs in the girl.</p>
                <p>Our holistic approach was to rebuild foundations:</p>
                <ul>
                  <li><strong>Warmth and Connection:</strong> Emphasized the profound impact of physical affection. &quot;Hug her warmly, give her gentle strokes.&quot;</li>
                  <li><strong>Open Communication:</strong> Improving dialogue with unwavering attention at home was vital.</li>
                  <li><strong>Physical Activity:</strong> We prescribed 2 hours of daily physical exercise to improve mood and cognitive function.</li>
                </ul>
                <p style={{ fontWeight: '600', color: 'var(--primary)', marginTop: '1.5rem', padding: '1rem', background: 'rgba(0, 128, 128, 0.05)', borderRadius: '0.5rem' }}>Showing trust and confidence in our own children is the most powerful tool for building transparency and connection.</p>
              </div>
            </motion.div>
          </Tilt>

        </div>
      </motion.section>

      {/* 8. Testimonials CTA */}
      <motion.section
        id="testimonials"
        className="home-reviews-teaser"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeInUp}
      >
        <div className="home-reviews-teaser-inner">
          <div>
            <p className="home-reviews-kicker">Google testimonials</p>
            <h2>Read patient experiences on the dedicated testimonials page</h2>
            <p>
              Browse the complete Google Reviews collection in one place, then choose the
              consultation path that feels right for you.
            </p>
          </div>
          <Magnetic>
            <MotionLink 
              href="/patient-reviews" 
              className="btn-primary"
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 400, damping: 15 }}
            >
              View All Testimonials
            </MotionLink>
          </Magnetic>
        </div>
      </motion.section>

      {/* 9. Holistic Healing CTA (The Bridge - Moved Down) */}
      <HolisticHealingCTA />

      {/* 10. FAQ Section (Objection Handling) */}
      <FAQ />

      {/* 11. Contact Section (Final CTA) */}
      <motion.section 
        id="contact" 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeInUp}
      >
        <h2 className="section-title">Get in Touch</h2>
        <div className="contact-container">
          
          <div className="contact-info">
            <div>
              <h3>Clinic Address</h3>
              <p>Showroom no. 1, 1st Floor, Anant Rukmini Co-op Hsg Soc,</p>
              <p>Besides Tathawade garden, Karve Nagar 411052</p>
            </div>
            
            <div style={{ height: '1px', background: 'var(--surface-border)' }}></div>
            
            <div>
              <h3>Contact Details</h3>
              <p><strong>Phone:</strong> <a href="tel:+919511213851" style={{ color: 'var(--primary)', textDecoration: 'none', fontWeight: '500' }}>+91-9511213851</a></p>
              <p><strong>Email:</strong> <a href="mailto:consult.drawanti@gmail.com" style={{ color: 'var(--primary)', textDecoration: 'none', fontWeight: '500' }}>consult.drawanti@gmail.com</a></p>
              <p><strong>Consultation Time:</strong> 9:30 am to 2pm and 4pm to 8pm</p>
            </div>
          </div>

          <div className="map-wrapper">
            <iframe 
              width="100%" 
              height="100%" 
              frameBorder="0" 
              scrolling="no" 
              marginHeight={0} 
              marginWidth={0} 
              src="https://maps.google.com/maps?q=Dr+Awanti+Dhadphale&t=&z=15&ie=UTF8&iwloc=&output=embed"
            ></iframe>
          </div>
          
        </div>
      </motion.section>
    </main>
  );
}
