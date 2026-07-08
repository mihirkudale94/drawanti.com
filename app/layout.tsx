import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Link from 'next/link';
import './globals.css';
import ScrollToTop from '@/components/ScrollToTop';
import WhatsAppFloat from '@/components/WhatsAppFloat';
import Navbar from '@/components/Navbar';
import { faqs } from '@/data/faqs';
import SmoothScroll from '@/components/SmoothScroll';

const inter = Inter({ subsets: ['latin'] });

const siteUrl = 'https://www.drawanti.com';
const siteName = 'Dr. Awanti Dhadphale';
const phoneDisplay = '+91-9511213851';
const phoneHref = 'tel:+919511213851';
const email = 'drawanti@gmail.com';
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
    'REBT practitioner Pune',
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
        priceRange: 'INR',
        description:
          'Holistic healing through classical homeopathy and psychological counselling in Pune, including homeopathy, REBT therapy, adolescent counselling, parenting guidance, and soft skills workshops.',
        address: {
          '@type': 'PostalAddress',
          ...clinicAddress,
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
        sameAs: ['https://www.linkedin.com/in/awantidhadphale/'],
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
        sameAs: ['https://www.linkedin.com/in/awantidhadphale/'],
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
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={inter.className}>
        <SmoothScroll />
        <Navbar />

        {children}

        <WhatsAppFloat />
        <ScrollToTop />
        <footer className="global-footer">
          <div className="footer-container">
            <div className="footer-brand">
              <h2>Dr. Awanti Dhadphale</h2>
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
