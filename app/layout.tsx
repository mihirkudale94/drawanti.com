import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Link from 'next/link';
import './globals.css';
import ScrollToTop from '@/components/ScrollToTop';
import MobileStickyCTA from '@/components/MobileStickyCTA';
import Navbar from '@/components/Navbar';
import { faqs } from '@/data/faqs';
import SmoothScroll from '@/components/SmoothScroll';

const inter = Inter({ subsets: ['latin'] });

const siteUrl = 'https://www.drawanti.com';
const siteName = 'Dr. Awanti Dhadphale';
const phoneDisplay = '+91-9511213851';
const phoneHref = 'tel:+919511213851';
const email = 'consult.drawanti@gmail.com';
const clinicAddress = {
  streetAddress: 'Showroom no. 1, 1st Floor, Anant Rukmini Co-op Hsg Soc,, Besides Tathawade garden',
  addressLocality: 'Karve Nagar, Pune',
  addressRegion: 'Maharashtra',
  postalCode: '411052',
  addressCountry: 'IN',
};
const title = 'Dr. Awanti Dhadphale | Homeopathic Doctor & Psychologist in Pune';
const description =
  'Expert homeopathy and clinical psychology services by Dr. Awanti Dhadphale in Pune. Book online or in-clinic consultations for holistic physical and emotional care.';
const previewImage = '/dravanti.jpg';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  applicationName: siteName,
  authors: [{ name: siteName }],
  keywords: [
    'Dr Awanti Dhadphale',
    'homeopathic doctor Pune',
    'clinical psychologist Pune',
    'homeopathy Karve Nagar',
    'counselling Pune',
  ],
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    url: '/',
    siteName,
    title,
    description,
    images: [
      {
        url: previewImage,
        width: 1200,
        height: 630,
        alt: 'Dr. Awanti Dhadphale, homeopathic doctor and clinical psychologist in Pune',
      },
    ],
    locale: 'en_IN',
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
    images: [previewImage],
  },
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const faqMainEntity = faqs.map((faq) => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: [faq.answer, ...(faq.bullets ?? [])].join(' '),
    },
  }));

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': ['MedicalClinic', 'LocalBusiness'],
        '@id': `${siteUrl}/#clinic`,
        name: 'Dr. Awanti Dhadphale Clinic',
        url: siteUrl,
        image: `${siteUrl}${previewImage}`,
        logo: `${siteUrl}${previewImage}`,
        telephone: phoneDisplay,
        email,
        priceRange: '₹₹',
        description:
          'Holistic healing through classical homeopathy and psychological counselling in Pune, including homeopathy, REBT therapy, adolescent counselling, parenting guidance, and soft skills workshops.',
        address: {
          '@type': 'PostalAddress',
          ...clinicAddress,
        },
        geo: {
          '@type': 'GeoCoordinates',
          latitude: '18.4895',
          longitude: '73.8202',
        },
        openingHoursSpecification: [
          {
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
            opens: '09:30',
            closes: '14:00',
          },
          {
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
            opens: '16:00',
            closes: '20:00',
          },
        ],
        areaServed: [
          { '@type': 'City', name: 'Pune' },
          { '@type': 'AdministrativeArea', name: 'Maharashtra' },
        ],
        medicalSpecialty: ['Homeopathy', 'Clinical Psychology', 'Counseling'],
        hasMap: 'https://maps.google.com/maps?q=Dr+Awanti+Dhadphale',
        sameAs: [
          'https://www.linkedin.com/in/awantidhadphale/',
          'https://www.instagram.com/dr_awanti/',
          'https://www.facebook.com/people/Dr-Awanti-Dhadphale/61590658990675/'
        ],
        founder: { '@id': `${siteUrl}/#physician` },
      },
      {
        '@type': 'Physician',
        '@id': `${siteUrl}/#physician`,
        name: 'Dr. Awanti Dhadphale',
        url: siteUrl,
        telephone: phoneDisplay,
        email,
        description:
          'Homeopathic doctor and clinical psychologist with 15+ years of experience. B.H.M.S., M.A. (Psychology).',
        image: `${siteUrl}${previewImage}`,
        address: {
          '@type': 'PostalAddress',
          ...clinicAddress,
        },
        medicalSpecialty: ['Homeopathy', 'Clinical Psychology'],
        hasCredential: [
          {
            '@type': 'EducationalOccupationalCredential',
            credentialCategory: 'degree',
            name: 'Bachelor of Homeopathic Medicine and Surgery (BHMS)',
            recognizedBy: { '@type': 'Organization', name: 'Maharashtra University of Health Sciences' },
          },
          {
            '@type': 'EducationalOccupationalCredential',
            credentialCategory: 'degree',
            name: 'Master of Arts in Psychology (MA Psychology)',
          },
          {
            '@type': 'EducationalOccupationalCredential',
            credentialCategory: 'certificate',
            name: 'Rational Emotive Behavioral Therapy (REBT) Practitioner',
          },
          {
            '@type': 'EducationalOccupationalCredential',
            credentialCategory: 'certificate',
            name: 'Certified Soft Skills Trainer',
          },
        ],
        worksFor: { '@id': `${siteUrl}/#clinic` },
        sameAs: [
          'https://www.linkedin.com/in/awantidhadphale/',
          'https://www.instagram.com/dr_awanti/',
          'https://www.facebook.com/people/Dr-Awanti-Dhadphale/61590658990675/'
        ],
        knowsAbout: [
          'Homeopathy',
          'Clinical Psychology',
          'REBT Therapy',
          'Adolescent Counselling',
          'Parenting Workshops',
          'Stress Management',
          'Flower Remedies',
          'Soft Skills Training',
        ],
      },
      {
        '@type': 'FAQPage',
        '@id': `${siteUrl}/#faq`,
        mainEntity: faqMainEntity,
      },
    ],
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={inter.className} suppressHydrationWarning>
        <SmoothScroll />
        <Navbar />

        {children}

        <MobileStickyCTA />
        <ScrollToTop />
        <footer className="global-footer">
          <div className="footer-container">
            <div className="footer-brand">
              <h2>Dr. Awanti Dhadphale</h2>
              <p className="footer-subtitle">Homeopathic Consultant &amp; Counsellor</p>
              <p>A Sound Mind in A Sound Body &amp; We Take Care of Both.</p>
              <div className="footer-contact-info">
                <a href={phoneHref} className="footer-contact-link">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true">
                    <path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56a.977.977 0 0 0-1.01.24l-2.2 2.2a15.045 15.045 0 0 1-6.59-6.59l2.2-2.2c.28-.28.36-.67.25-1.02C8.79 6.34 8.6 5.15 8.6 3.92c0-.5-.41-.92-.92-.92H4.1c-.5 0-.92.41-.92.92C3.18 13.18 10.82 20.82 20 20.82c.5 0 .92-.41.92-.92v-3.6c0-.5-.41-.92-.91-.92z"/>
                  </svg>
                  <span>{phoneDisplay}</span>
                </a>
                <a href={`mailto:${email}`} className="footer-contact-link">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true">
                    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                  </svg>
                  <span>{email}</span>
                </a>
                <a href="https://www.linkedin.com/in/awantidhadphale/" target="_blank" rel="noopener noreferrer" className="footer-contact-link">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true">
                    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
                  </svg>
                  <span>LinkedIn</span>
                </a>
                <a href="https://www.instagram.com/dr_awanti/" target="_blank" rel="noopener noreferrer" className="footer-contact-link">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/>
                  </svg>
                  <span>Instagram</span>
                </a>
                <a href="https://www.facebook.com/people/Dr-Awanti-Dhadphale/61590658990675/" target="_blank" rel="noopener noreferrer" className="footer-contact-link">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true">
                    <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c4.56-.93 8-4.96 8-9.75z"/>
                  </svg>
                  <span>Facebook</span>
                </a>
              </div>
            </div>
            <div className="footer-links">
              <h3>Quick Links</h3>
              <Link href="/">Home</Link>
              <Link href="/#about">About</Link>
              <Link href="/#core-services">Services</Link>
              <Link href="/patient-reviews">Testimonials</Link>
              <Link href="/#faq">FAQ</Link>
              <Link href="/gallery">Gallery</Link>
              <Link href="/#contact">Contact</Link>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; {new Date().getFullYear()} Dr. Awanti Dhadphale. All rights reserved.</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
