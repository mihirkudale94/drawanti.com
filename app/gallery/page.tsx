import React from 'react';
import GalleryGrid from '@/components/GalleryGrid';
import type { Metadata } from 'next';
import { galleryMedia } from '@/data/galleryMedia';

export const metadata: Metadata = {
  title: 'Gallery | Dr. Awanti Dhadphale',
  description:
    "Browse photos and media from Dr. Awanti Dhadphale's clinic, events, consultations, and healing sessions.",
  openGraph: {
    type: 'website',
    url: 'https://www.drawanti.com/gallery',
    title: 'Gallery | Dr. Awanti Dhadphale',
    description:
      "Browse photos and media from Dr. Awanti Dhadphale's clinic, events, consultations, and healing sessions.",
    images: [
      {
        url: 'https://www.drawanti.com/dravanti.jpg',
        width: 1200,
        height: 630,
        alt: 'Gallery - Dr. Awanti Dhadphale Clinic',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Gallery | Dr. Awanti Dhadphale',
    description: "Browse photos and media from Dr. Awanti Dhadphale's clinic.",
    images: ['https://www.drawanti.com/dravanti.jpg'],
  },
  alternates: {
    canonical: 'https://www.drawanti.com/gallery',
  },
};

export default function GalleryPage() {
  const { videoFile, imageFiles } = galleryMedia;
  const totalPhotos = imageFiles.length;

  return (
    <main style={{ paddingTop: '7rem', paddingBottom: '6rem', background: 'var(--background)', minHeight: '100vh' }}>
      <div style={{ textAlign: 'center', marginBottom: '3.5rem', padding: '0 5%' }} className="animate-fade-up">
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.5rem',
          background: 'rgba(0,128,128,0.08)',
          color: 'var(--primary)',
          padding: '0.4rem 1.1rem',
          borderRadius: '9999px',
          fontSize: '0.9rem',
          fontWeight: '600',
          marginBottom: '1.2rem',
          border: '1px solid rgba(0,128,128,0.15)',
        }}>
          Clinic & Workshops
        </div>
        <h1 style={{
          fontSize: 'clamp(2rem, 5vw, 3.2rem)',
          color: 'var(--primary-dark)',
          fontWeight: '800',
          letterSpacing: '-0.03em',
          marginBottom: '0.9rem',
          lineHeight: 1.15,
        }}>
          A Glimpse of the Clinic
        </h1>
        <p style={{
          fontSize: 'clamp(1rem, 2.5vw, 1.2rem)',
          color: '#64748b',
          maxWidth: '560px',
          margin: '0 auto',
          lineHeight: 1.65,
        }}>
          Experience our holistic healing environment and moments from our transformational workshops.
        </p>
      </div>

      <div style={{ width: '100%', padding: '0 3%' }}>
        <div className="animate-fade-up delay-100">
          {imageFiles.length > 0 ? (
            <GalleryGrid imageFiles={imageFiles} />
          ) : (
            <div style={{
              textAlign: 'center',
              padding: '5rem 2rem',
              color: '#94a3b8',
              fontSize: '1.1rem',
            }}>
              No photos available yet. Check back soon!
            </div>
          )}
        </div>

        {videoFile && (
          <div className="animate-fade-up delay-200" style={{ marginTop: '5rem' }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1.2rem',
              marginBottom: '2.5rem',
            }}>
              <div style={{ flex: 1, height: '1px', background: 'var(--surface-border)' }} />
              <span style={{
                fontSize: '0.8rem',
                fontWeight: '700',
                letterSpacing: '0.12em',
                color: '#94a3b8',
                textTransform: 'uppercase',
                whiteSpace: 'nowrap',
              }}>
                Workshop Video
              </span>
              <div style={{ flex: 1, height: '1px', background: 'var(--surface-border)' }} />
            </div>
            <p style={{
              textAlign: 'center',
              fontSize: '0.85rem',
              fontWeight: '700',
              letterSpacing: '0.12em',
              color: 'var(--primary)',
              textTransform: 'uppercase',
              marginBottom: '1rem',
            }}>
              Featured Workshop Moment
            </p>
            <div style={{
              borderRadius: '1.25rem',
              overflow: 'hidden',
              boxShadow: 'var(--shadow-xl)',
              background: '#000',
              border: '1px solid rgba(0,0,0,0.08)',
            }}>
              <video
                controls
                muted
                playsInline
                preload="metadata"
                style={{ width: '100%', maxHeight: '65vh', objectFit: 'contain', display: 'block' }}
              >
                <source src={`/gallery_media/${videoFile}`} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
