"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

const MotionLink = motion.create(Link);

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const mobileMenuId = 'mobile-navigation-menu';

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(min-width: 992px)');
    const handleBreakpointChange = () => {
      if (mediaQuery.matches) {
        setIsOpen(false);
      }
    };

    handleBreakpointChange();
    mediaQuery.addEventListener('change', handleBreakpointChange);
    return () => mediaQuery.removeEventListener('change', handleBreakpointChange);
  }, []);

  const toggleMenu = () => setIsOpen((open) => !open);
  const closeMenu = () => setIsOpen(false);

  const springTransition = { type: "spring" as const, stiffness: 400, damping: 20 };
  const navLinkTransition = { type: "spring" as const, stiffness: 400, damping: 25 };

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="nav-container">
        <MotionLink 
          href="/" 
          className="logo notranslate" 
          translate="no" 
          onClick={closeMenu} 
          aria-label="Dr. Awanti Dhadphale home"
          whileHover={{ scale: 1.02, y: -1 }}
          whileTap={{ scale: 0.98 }}
          transition={springTransition}
        >
          Dr. Awanti Dhadphale
        </MotionLink>
        
        {/* Desktop Menu */}
        <div className="nav-links desktop-only">
          {[
            { name: 'Home', href: '/' },
            { name: 'About', href: '/#about' },
            { name: 'Services', href: '/#core-services' },
            { name: 'Testimonials', href: '/patient-reviews' },
            { name: 'FAQ', href: '/#faq' },
            { name: 'Gallery', href: '/gallery' },
            { name: 'Contact', href: '/#contact' }
          ].map((link) => (
            <MotionLink 
              key={link.name} 
              href={link.href} 
              onClick={closeMenu}
              whileHover={{ y: -2 }}
              whileTap={{ y: 0 }}
              transition={navLinkTransition}
              style={{ display: 'inline-block' }}
            >
              {link.name}
            </MotionLink>
          ))}
        </div>

        {/* Mobile Hamburger Toggle */}
        <motion.button 
          className={`hamburger ${isOpen ? 'active' : ''}`} 
          onClick={toggleMenu}
          aria-label="Toggle navigation menu"
          aria-controls={mobileMenuId}
          aria-expanded={isOpen}
          whileTap={{ scale: 0.9 }}
          transition={{ type: "spring", stiffness: 500, damping: 15 }}
        >
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </motion.button>

        {/* Mobile Menu Overlay */}
        <div
          id={mobileMenuId}
          className={`mobile-menu ${isOpen ? 'open' : ''}`}
          aria-hidden={!isOpen}
          hidden={!isOpen}
        >
          <div className="mobile-nav-links">
            <Link href="/" onClick={closeMenu}>Home</Link>
            <Link href="/#about" onClick={closeMenu}>About</Link>
            <Link href="/#core-services" onClick={closeMenu}>Services</Link>
            <Link href="/patient-reviews" onClick={closeMenu}>Testimonials</Link>
            <Link href="/#faq" onClick={closeMenu}>FAQ</Link>
            <Link href="/gallery" onClick={closeMenu}>Gallery</Link>
            <Link href="/#contact" onClick={closeMenu}>Contact</Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

