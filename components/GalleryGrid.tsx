'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { createPortal } from 'react-dom';

const PAGE_SIZE = 20;

export default function GalleryGrid({ imageFiles }: { imageFiles: string[] }) {
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  const selectedFile = selectedIndex !== null ? imageFiles[selectedIndex] : null;
  const visibleImages = imageFiles.slice(0, visibleCount);
  const hasMore = visibleCount < imageFiles.length;

  const openLightbox = (index: number) => setSelectedIndex(index);
  const closeLightbox = () => setSelectedIndex(null);

  const goNext = useCallback(() => {
    if (selectedIndex === null) return;
    setSelectedIndex((selectedIndex + 1) % imageFiles.length);
  }, [selectedIndex, imageFiles.length]);

  const goPrev = useCallback(() => {
    if (selectedIndex === null) return;
    setSelectedIndex((selectedIndex - 1 + imageFiles.length) % imageFiles.length);
  }, [selectedIndex, imageFiles.length]);

  useEffect(() => {
    if (selectedIndex === null) return;

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') goNext();
      else if (e.key === 'ArrowLeft') goPrev();
      else if (e.key === 'Escape') closeLightbox();
    };

    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [selectedIndex, goNext, goPrev]);

  useEffect(() => {
    document.body.style.overflow = selectedIndex !== null ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [selectedIndex]);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        .masonry-grid {
          column-count: 1;
          column-gap: 1rem;
        }

        @media (min-width: 480px)  { .masonry-grid { column-count: 2; } }
        @media (min-width: 768px)  { .masonry-grid { column-count: 3; } }
        @media (min-width: 1280px) { .masonry-grid { column-count: 4; } }

        .masonry-item {
          break-inside: avoid;
          margin-bottom: 1rem;
          border-radius: 0.5rem;
          overflow: hidden;
          position: relative;
          cursor: pointer;
          background: #eef2f6;
          box-shadow: 0 1px 3px rgba(15, 23, 42, 0.08);
          isolation: isolate;
          transition: transform 0.28s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.28s ease;
        }

        .masonry-item:hover {
          transform: translateY(-3px);
          box-shadow: 0 18px 42px rgba(15, 23, 42, 0.16);
          z-index: 2;
        }

        .masonry-item:focus-visible {
          outline: 3px solid var(--secondary);
          outline-offset: 3px;
        }

        .masonry-img {
          width: 100%;
          height: auto;
          display: block;
          transition: transform 0.5s ease;
        }

        .masonry-item:hover .masonry-img {
          transform: scale(1.045);
        }

        .masonry-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(2, 6, 23, 0.68) 0%, rgba(2, 6, 23, 0.06) 58%, transparent 100%);
          opacity: 0;
          transition: opacity 0.25s ease;
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          padding: 0.75rem;
        }

        .masonry-item:hover .masonry-overlay {
          opacity: 1;
        }

        .masonry-overlay-icon {
          display: inline-flex;
          align-items: center;
          gap: 0.45rem;
          color: white;
          font-size: 0.8rem;
          font-weight: 700;
          letter-spacing: 0.01em;
          background: rgba(255, 255, 255, 0.14);
          border: 1px solid rgba(255, 255, 255, 0.28);
          border-radius: 999px;
          padding: 0.45rem 0.7rem;
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
        }

        .masonry-overlay-icon svg {
          width: 16px;
          height: 16px;
          flex-shrink: 0;
        }

        .gallery-load-more {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1rem;
          margin-top: 3rem;
        }

        .gallery-count-text {
          font-size: 0.95rem;
          color: #64748b;
          font-weight: 500;
        }

        .load-more-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.6rem;
          background: var(--primary);
          color: white;
          border: none;
          padding: 0.85rem 2.2rem;
          border-radius: 9999px;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          font-family: inherit;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          box-shadow: 0 4px 16px rgba(0, 128, 128, 0.3);
        }

        .load-more-btn:hover {
          background: var(--primary-dark);
          transform: translateY(-3px);
          box-shadow: 0 10px 28px rgba(0, 128, 128, 0.35);
        }

        @keyframes lbFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes viewerImageIn {
          from { opacity: 0; transform: scale(0.985); }
          to { opacity: 1; transform: scale(1); }
        }

        .lightbox-backdrop {
          position: fixed;
          inset: 0;
          background: #05070b;
          z-index: 9999;
          animation: lbFadeIn 0.2s ease forwards;
          color: white;
        }

        .lightbox-chrome {
          position: fixed;
          left: 0;
          right: 0;
          z-index: 2;
          pointer-events: none;
        }

        .lightbox-topbar {
          top: 0;
          display: flex;
          align-items: center;
          justify-content: space-between;
          min-height: 72px;
          padding: max(1rem, env(safe-area-inset-top)) max(1rem, 3vw) 1rem;
          background: linear-gradient(to bottom, rgba(5, 7, 11, 0.9), rgba(5, 7, 11, 0));
        }

        .lightbox-meta {
          display: flex;
          flex-direction: column;
          gap: 0.1rem;
          min-width: 0;
        }

        .lightbox-eyebrow {
          color: rgba(255, 255, 255, 0.52);
          font-size: 0.72rem;
          font-weight: 800;
          letter-spacing: 0.12em;
          text-transform: uppercase;
        }

        .lightbox-counter {
          color: rgba(255, 255, 255, 0.94);
          font-size: 0.95rem;
          font-weight: 700;
        }

        .lightbox-actions {
          display: flex;
          align-items: center;
          gap: 0.65rem;
          pointer-events: auto;
        }

        .lightbox-icon-btn,
        .lightbox-arrow,
        .lightbox-thumb {
          appearance: none;
          border: 0;
          font-family: inherit;
        }

        .lightbox-icon-btn {
          width: 42px;
          height: 42px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          border-radius: 999px;
          background: rgba(255, 255, 255, 0.12);
          color: white;
          border: 1px solid rgba(255, 255, 255, 0.16);
          cursor: pointer;
          transition: transform 0.18s ease, background 0.18s ease, border-color 0.18s ease;
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
        }

        .lightbox-icon-btn:hover,
        .lightbox-arrow:hover {
          background: rgba(255, 255, 255, 0.2);
          border-color: rgba(255, 255, 255, 0.3);
          transform: translateY(-1px);
        }

        .lightbox-icon-btn svg,
        .lightbox-arrow svg {
          width: 20px;
          height: 20px;
        }

        .lightbox-stage {
          min-height: 100vh;
          display: grid;
          place-items: center;
          padding: 5.5rem 5.25rem 7.5rem;
        }

        .lightbox-figure {
          width: 100%;
          height: min(60vh, calc(100vh - 16rem));
          display: grid;
          place-items: center;
          animation: viewerImageIn 0.24s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        .lightbox-img-wrap {
          border-radius: 0.5rem;
          overflow: hidden;
          box-shadow: 0 30px 90px rgba(0, 0, 0, 0.72);
          background: #0b0f16;
          max-width: min(100%, 750px);
          max-height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .lightbox-img {
          display: block;
          max-width: min(100%, 750px);
          max-height: min(60vh, calc(100vh - 16rem));
          width: auto;
          height: auto;
          object-fit: contain;
          border-radius: 0.5rem;
        }

        .lightbox-nav {
          pointer-events: auto;
        }

        .lightbox-arrow {
          position: fixed;
          top: 50%;
          z-index: 2;
          width: 52px;
          height: 52px;
          border-radius: 999px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(255, 255, 255, 0.1);
          color: white;
          border: 1px solid rgba(255, 255, 255, 0.14);
          cursor: pointer;
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          transition: transform 0.18s ease, background 0.18s ease, border-color 0.18s ease;
        }

        .lightbox-arrow-prev {
          left: max(1rem, 3vw);
          transform: translateY(-50%);
        }

        .lightbox-arrow-next {
          right: max(1rem, 3vw);
          transform: translateY(-50%);
        }

        .lightbox-arrow-prev:hover {
          transform: translateY(-50%) translateX(-2px);
        }

        .lightbox-arrow-next:hover {
          transform: translateY(-50%) translateX(2px);
        }

        .lightbox-bottom {
          bottom: 0;
          padding: 1.25rem max(1rem, 3vw) max(1.25rem, env(safe-area-inset-bottom));
          background: linear-gradient(to top, rgba(5, 7, 11, 0.9), rgba(5, 7, 11, 0));
        }

        .lightbox-filmstrip {
          pointer-events: auto;
          display: flex;
          gap: 0.5rem;
          overflow-x: auto;
          scrollbar-width: thin;
          scrollbar-color: rgba(255, 255, 255, 0.26) transparent;
          padding: 0.35rem 0.1rem 0.25rem;
        }

        .lightbox-thumb {
          position: relative;
          width: 58px;
          height: 58px;
          flex: 0 0 58px;
          overflow: hidden;
          border-radius: 0.5rem;
          background: rgba(255, 255, 255, 0.1);
          opacity: 0.48;
          cursor: pointer;
          outline: 2px solid transparent;
          outline-offset: 2px;
          transition: opacity 0.18s ease, transform 0.18s ease, outline-color 0.18s ease;
        }

        .lightbox-thumb:hover {
          opacity: 0.82;
          transform: translateY(-2px);
        }

        .lightbox-thumb.is-active {
          opacity: 1;
          outline-color: white;
        }

        .lightbox-thumb img {
          object-fit: cover;
        }

        .lightbox-hint {
          margin-top: 0.45rem;
          color: rgba(255, 255, 255, 0.44);
          font-size: 0.76rem;
          font-weight: 600;
          text-align: center;
          letter-spacing: 0.04em;
          text-transform: uppercase;
        }

        @media (max-width: 760px) {
          .lightbox-stage {
            padding: 5rem 0.75rem 6.5rem;
          }

          .lightbox-figure {
            height: min(50vh, calc(100vh - 14rem));
          }

          .lightbox-img {
            max-height: min(50vh, calc(100vh - 14rem));
          }

          .lightbox-arrow {
            width: 44px;
            height: 44px;
            top: auto;
            bottom: calc(5.85rem + env(safe-area-inset-bottom));
          }

          .lightbox-arrow-prev,
          .lightbox-arrow-prev:hover {
            left: 1rem;
            transform: none;
          }

          .lightbox-arrow-next,
          .lightbox-arrow-next:hover {
            right: 1rem;
            transform: none;
          }

          .lightbox-bottom {
            padding-bottom: max(0.85rem, env(safe-area-inset-bottom));
          }

          .lightbox-filmstrip {
            padding-left: 3.6rem;
            padding-right: 3.6rem;
          }

          .lightbox-thumb {
            width: 46px;
            height: 46px;
            flex-basis: 46px;
          }

          .lightbox-eyebrow {
            display: none;
          }
        }
      ` }} />

      <div className="masonry-grid">
        {visibleImages.map((filename, index) => (
          <div
            key={filename}
            className="masonry-item"
            onClick={() => openLightbox(index)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                openLightbox(index);
              }
            }}
            tabIndex={0}
            role="button"
            aria-label={`View image ${index + 1} of ${imageFiles.length}`}
          >
            <Image
              src={`/gallery_media/${filename}`}
              alt={`Gallery image ${index + 1}`}
              width={800}
              height={600}
              sizes="(min-width: 1280px) 23vw, (min-width: 768px) 30vw, (min-width: 480px) 46vw, 94vw"
              loading="lazy"
              className="masonry-img"
            />
            <div className="masonry-overlay">
              <span className="masonry-overlay-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
                View photo
              </span>
            </div>
          </div>
        ))}
      </div>

      {hasMore && (
        <div className="gallery-load-more">
          <p className="gallery-count-text">
            Showing {visibleCount} of {imageFiles.length} photos
          </p>
          <button
            className="load-more-btn"
            onClick={() => setVisibleCount((v) => Math.min(v + PAGE_SIZE, imageFiles.length))}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <polyline points="6 9 12 15 18 9" />
            </svg>
            Load More Photos
          </button>
        </div>
      )}

      {mounted && selectedIndex !== null && selectedFile && createPortal(
        <div
          className="lightbox-backdrop"
          onClick={closeLightbox}
          role="dialog"
          aria-modal="true"
          aria-label="Image viewer"
        >
          <div className="lightbox-chrome lightbox-topbar">
            <div className="lightbox-meta">
              <span className="lightbox-eyebrow">Gallery viewer</span>
              <span className="lightbox-counter">Photo {selectedIndex + 1} of {imageFiles.length}</span>
            </div>
            <div className="lightbox-actions">
              <button
                className="lightbox-icon-btn"
                onClick={closeLightbox}
                aria-label="Close image viewer"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M18 6 6 18" />
                  <path d="m6 6 12 12" />
                </svg>
              </button>
            </div>
          </div>

          <div className="lightbox-stage" onClick={(e) => e.stopPropagation()}>
            <figure className="lightbox-figure">
              <div className="lightbox-img-wrap">
                <Image
                  key={selectedIndex}
                  src={`/gallery_media/${selectedFile}`}
                  alt={`Gallery image ${selectedIndex + 1}`}
                  width={1200}
                  height={900}
                  sizes="(max-width: 760px) 96vw, 86vw"
                  className="lightbox-img"
                  priority
                />
              </div>
            </figure>
          </div>

          <div className="lightbox-nav" onClick={(e) => e.stopPropagation()}>
            <button
              className="lightbox-arrow lightbox-arrow-prev"
              onClick={goPrev}
              aria-label="Previous image"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="m15 18-6-6 6-6" />
              </svg>
            </button>
            <button
              className="lightbox-arrow lightbox-arrow-next"
              onClick={goNext}
              aria-label="Next image"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="m9 18 6-6-6-6" />
              </svg>
            </button>
          </div>

          <div className="lightbox-chrome lightbox-bottom" onClick={(e) => e.stopPropagation()}>
            <div className="lightbox-filmstrip" aria-label="Gallery thumbnails">
              {imageFiles.map((filename, index) => (
                <button
                  key={filename}
                  className={`lightbox-thumb${index === selectedIndex ? ' is-active' : ''}`}
                  onClick={() => setSelectedIndex(index)}
                  aria-label={`Open photo ${index + 1}`}
                  aria-current={index === selectedIndex ? 'true' : undefined}
                >
                  <Image
                    src={`/gallery_media/${filename}`}
                    alt=""
                    fill
                    sizes="58px"
                  />
                </button>
              ))}
            </div>
            <p className="lightbox-hint">Arrow keys to navigate / Esc to close</p>
          </div>
        </div>,
        document.body
      )}
    </>
  );
}
