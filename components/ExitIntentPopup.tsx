"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ExitIntentPopup() {
  const [isVisible, setIsVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Check if the user has already interacted with the pop-up
    const hasInteracted = localStorage.getItem('dravanti_dismissed_guide') || localStorage.getItem('dravanti_subscribed_guide');
    if (hasInteracted) return;

    // Desktop: Trigger on mouse leaving the top of the screen
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY < 20) {
        setIsVisible(true);
        // Remove listener once triggered
        document.removeEventListener('mouseleave', handleMouseLeave);
      }
    };

    // Mobile: Trigger after a scroll depth of 50% or after 25 seconds
    let scrollTriggered = false;
    const handleScroll = () => {
      if (scrollTriggered) return;
      
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrollPercentage = (scrollTop / docHeight) * 100;
      
      if (scrollPercentage > 50) {
        scrollTriggered = true;
        setIsVisible(true);
        window.removeEventListener('scroll', handleScroll);
      }
    };

    const timer = setTimeout(() => {
      setIsVisible(true);
      document.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('scroll', handleScroll);
    }, 25000); // 25s fallback

    document.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('scroll', handleScroll);

    return () => {
      clearTimeout(timer);
      document.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleDismiss = () => {
    setIsVisible(false);
    localStorage.setItem('dravanti_dismissed_guide', 'true');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;

    setIsLoading(true);
    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, source: 'Exit Intent Guide: Exam Anxiety' }),
      });
      
      if (response.ok) {
        setIsSubmitted(true);
        localStorage.setItem('dravanti_subscribed_guide', 'true');
      } else {
        console.error('Subscription failed');
      }
    } catch (err) {
      console.error('Error submitting subscription:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <div className="popup-backdrop" onClick={handleDismiss}>
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", stiffness: 350, damping: 25 }}
            className="popup-container"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button className="popup-close-btn" onClick={handleDismiss} aria-label="Close pop-up">
              <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>

            <div className="popup-content">
              {/* Left Column: Visual Guide Mockup */}
              <div className="popup-visual">
                <div className="guide-book-mockup">
                  <div className="guide-book-cover">
                    <span className="guide-badge">FREE GUIDE</span>
                    <span className="guide-author">Dr. Awanti Dhadphale</span>
                    <h3 className="guide-title">5 Steps to Manage Exam Anxiety</h3>
                    <div className="guide-footer-pattern">
                      <span>Homeopathy &amp; REBT Tools</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Copy & Form */}
              <div className="popup-form-section">
                {!isSubmitted ? (
                  <>
                    <p>
                      Enter your email to receive Dr. Awanti&apos;s free guide containing practical psychological prompts (REBT) and holistic insights to build confidence and academic resilience.
                    </p>
                    <form onSubmit={handleSubmit} className="popup-email-form">
                      <input
                        type="email"
                        placeholder="Enter your email address"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="popup-input"
                        disabled={isLoading}
                      />
                      <button type="submit" className="popup-submit-btn" disabled={isLoading}>
                        {isLoading ? 'Sending...' : 'Get the Free Guide'}
                      </button>
                    </form>
                    <span className="popup-privacy">No spam. You can unsubscribe at any time.</span>
                  </>
                ) : (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="popup-success-state"
                  >
                    <div className="success-icon-badge">
                      <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                    </div>
                    <h2>Thank You!</h2>
                    <p>
                      The guide **"5 Steps to Manage Exam Anxiety"** is on its way to:
                    </p>
                    <span className="success-email">{email}</span>
                    <p className="success-subtext">
                      Please check your inbox (and spam folder) in a few minutes.
                    </p>
                    <button onClick={handleDismiss} className="popup-dismiss-success-btn">
                      Back to Site
                    </button>
                  </motion.div>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
