"use client";

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Tilt from 'react-parallax-tilt';
import Script from 'next/script';

type Reel = {
  id: string;
  src: string;
  title: string;
  description: string;
  permalink: string;
  category: string;
};

const REELS: Reel[] = [
  {
    id: 'reel-1',
    src: '/videos/Reel 1.mp4',
    title: 'Therapy & Well-being',
    description: 'Therapy isn’t just for people with mental illness—it’s for anyone who wants to understand themselves better.',
    permalink: 'https://www.instagram.com/reel/DazXpRRIX7u/?utm_source=ig_embed&utm_campaign=loading',
    category: 'Self-Growth'
  },
  {
    id: 'reel-2',
    src: '/videos/Reel 2.mp4',
    title: 'Mind-Body Connection',
    description: 'Exploring how emotional stress manifests as physical symptoms and addressing them holistically.',
    permalink: 'https://www.instagram.com/reel/DaTFb0PKcUL/?utm_source=ig_embed&utm_campaign=loading',
    category: 'Anxiety & Stress'
  },
  {
    id: 'reel-3',
    src: '/videos/Reel 3.mp4',
    title: 'Psychological Clarity',
    description: 'Building resilience, managing stress, and understanding behavioral therapy in daily life.',
    permalink: 'https://www.instagram.com/reel/DaA_edUoIO0/?utm_source=ig_embed&utm_campaign=loading',
    category: 'Parenting & Family'
  }
];

export default function VideoInsights() {
  const [activeReel, setActiveReel] = useState<Reel | null>(null);
  const [hoveredReelId, setHoveredReelId] = useState<string | null>(null);
  const videoRefs = useRef<{ [key: string]: HTMLVideoElement | null }>({});

  useEffect(() => {
    if (activeReel && typeof window !== 'undefined') {
      const processTimer = setTimeout(() => {
        if ((window as any).instgrm) {
          try {
            (window as any).instgrm.Embeds.process();
          } catch (err) {
            console.error('Error processing Instagram embed:', err);
          }
        }
      }, 50);
      return () => clearTimeout(processTimer);
    }
  }, [activeReel]);

  const handleMouseEnter = (id: string) => {
    setHoveredReelId(id);
    const video = videoRefs.current[id];
    if (video) {
      video.play().catch(() => {
        // Autoplay blocked
      });
    }
  };

  const handleMouseLeave = (id: string) => {
    setHoveredReelId(null);
    const video = videoRefs.current[id];
    if (video) {
      video.pause();
      video.currentTime = 0;
    }
  };

  return (
    <section id="video-insights" className="video-insights-section">
      <div className="section-container">
        <div className="section-header">
          <div className="pill-badge-teal">
            <span>🎥</span> Video Insights
          </div>
          <h2 className="section-title-alt">Moments of Clarity</h2>
          <p className="section-subtitle-alt">
            Short, impactful video insights by Dr. Awanti on homeopathic care, mental health, and emotional resilience.
          </p>
        </div>

        <div className="reels-grid">
          {REELS.map((reel) => (
            <Tilt
              key={reel.id}
              tiltMaxAngleX={4}
              tiltMaxAngleY={4}
              scale={1.02}
              transitionSpeed={1500}
              className="reel-tilt-wrapper"
            >
              <motion.div
                className="reel-card"
                onMouseEnter={() => handleMouseEnter(reel.id)}
                onMouseLeave={() => handleMouseLeave(reel.id)}
                onClick={() => setActiveReel(reel)}
                layoutId={`card-${reel.id}`}
              >
                {/* Video Preview */}
                <div className="reel-video-container">
                  <video
                    ref={(el) => { videoRefs.current[reel.id] = el; }}
                    src={reel.src}
                    muted
                    loop
                    playsInline
                    preload="metadata"
                    className="reel-preview-video"
                  />
                  
                  {/* Subtle Gradient Overlay */}
                  <div className="reel-overlay-gradient" />

                  {/* Category Badge */}
                  <span className="reel-category-badge">{reel.category}</span>

                  {/* Play Button Overlay */}
                  <motion.div 
                    className="reel-play-button-overlay"
                    animate={{ scale: hoveredReelId === reel.id ? 1.1 : 1 }}
                    transition={{ type: "spring", stiffness: 300, damping: 15 }}
                  >
                    <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
                      <path d="M8 5v14l11-7z"/>
                    </svg>
                  </motion.div>

                  {/* Info Panel */}
                  <div className="reel-info">
                    <h3>{reel.title}</h3>
                    <p>{reel.description}</p>
                    <span className="reel-tap-to-play">Tap to watch Reel</span>
                  </div>
                </div>
              </motion.div>
            </Tilt>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {activeReel && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="video-lightbox-backdrop"
            onClick={() => setActiveReel(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="video-lightbox-content"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button 
                className="lightbox-close-btn"
                onClick={() => setActiveReel(null)}
                aria-label="Close video"
              >
                <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>

              {/* Instagram Embed Wrapper */}
              <div className="lightbox-instagram-wrapper">
                <blockquote 
                  key={activeReel.id}
                  className="instagram-media" 
                  data-instgrm-captioned 
                  data-instgrm-permalink={activeReel.permalink}
                  data-instgrm-version="14" 
                  style={{ 
                    background: '#FFF', 
                    border: 0, 
                    borderRadius: '1.25rem', 
                    boxShadow: '0 0 1px 0 rgba(0,0,0,0.5),0 1px 10px 0 rgba(0,0,0,0.15)', 
                    margin: '0 auto', 
                    maxWidth: '440px', 
                    minWidth: '326px', 
                    padding: 0, 
                    width: 'calc(100% - 2px)' 
                  }}
                >
                  <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
                    <a 
                      href={activeReel.permalink} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textDecoration: 'none', color: '#1e293b' }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '50px', height: '50px', borderRadius: '50%', background: '#F4F4F4', marginBottom: '8px' }}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/>
                        </svg>
                      </div>
                      <span style={{ fontSize: '14px', fontWeight: '600', color: '#3897f0', marginBottom: '4px' }}>Loading Reel...</span>
                      <span style={{ fontSize: '12px', color: '#64748b' }}>Click here if it doesn&apos;t load</span>
                    </a>
                  </div>
                </blockquote>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Script 
        src="https://www.instagram.com/embed.js" 
        strategy="lazyOnload" 
        onLoad={() => {
          if (typeof window !== 'undefined' && (window as any).instgrm) {
            (window as any).instgrm.Embeds.process();
          }
        }} 
      />
    </section>
  );
}
