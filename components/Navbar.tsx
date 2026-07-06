"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

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

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="nav-container">
        <Link href="/" className="logo notranslate" translate="no" onClick={closeMenu} aria-label="Dr. Awanti Dhadphale home">
          Dr. Awanti Dhadphale
        </Link>
        
        {/* Desktop Menu */}
        <div className="nav-links desktop-only">
          <Link href="/" onClick={closeMenu}>Home</Link>
          <Link href="/#about" onClick={closeMenu}>About</Link>
          <Link href="/#core-services" onClick={closeMenu}>Services</Link>
          <Link href="/#testimonials" onClick={closeMenu}>Testimonials</Link>
          <Link href="/#faq" onClick={closeMenu}>FAQ</Link>
          <Link href="/gallery" onClick={closeMenu}>Gallery</Link>
          <Link href="/#contact" onClick={closeMenu}>Contact</Link>
        </div>

        {/* Mobile Hamburger Toggle */}
        <button 
          className={`hamburger ${isOpen ? 'active' : ''}`} 
          onClick={toggleMenu}
          aria-label="Toggle navigation menu"
        >
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </button>

        {/* Mobile Menu Overlay */}
        <div className={`mobile-menu ${isOpen ? 'open' : ''}`}>
          <div className="mobile-nav-links">
            <Link href="/" onClick={closeMenu}>Home</Link>
            <Link href="/#about" onClick={closeMenu}>About</Link>
            <Link href="/#core-services" onClick={closeMenu}>Services</Link>
            <Link href="/#testimonials" onClick={closeMenu}>Testimonials</Link>
            <Link href="/#faq" onClick={closeMenu}>FAQ</Link>
            <Link href="/gallery" onClick={closeMenu}>Gallery</Link>
            <Link href="/#contact" onClick={closeMenu}>Contact</Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
