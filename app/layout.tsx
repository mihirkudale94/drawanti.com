import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Link from 'next/link';
import './globals.css';
import ScrollToTop from '@/components/ScrollToTop';
import WhatsAppFloat from '@/components/WhatsAppFloat';
import Navbar from '@/components/Navbar';
import { faqs } from '@/data/faqs';

const inter = Inter({ subsets: ['latin'] });

const siteUrl = 'https://www.drawanti.com';
const siteName = 'Dr. Awanti Dhadphale';
const phoneDisplay = '+91-9511213851';
const phoneHref = 'tel:+919511213851';
const email = 'awantidhadphale@gmail.com';
const clinicAddress = {
  streetAddress: 'Showroom no. 1, 1st Floor, Anant Rukmini Apt., Besides Tathawade garden',
  addressLocality: 'Karve Nagar, Pune',
  addressRegion: 'Maharashtra',
  postalCode: '411052',
  addressCountry: 'IN',
};
const title = 'Dr. Awanti Dhadphale | Homeopathic Doctor & Clinical Psychologist in Pune';
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
          'Homeopathic doctor and clinical psychologist with 15+ years of experience. B.H.M.S., M.A. (Psychology) | REBT Practitioner | Certified Soft Skills Trainer.',
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
        <Navbar />

        {children}

        <WhatsAppFloat />
        <ScrollToTop />
        <footer className="global-footer">
          <div className="footer-container">
            <div className="footer-brand">
              <h2>Dr. Awanti Dhadphale</h2>
              <p>A Sound Mind in a Sound Body &amp; We Take Care of Both.</p>
              <p style={{ marginTop: '0.75rem', fontSize: '0.9rem', opacity: 0.85 }}>
                <a href={phoneHref} style={{ color: 'inherit', textDecoration: 'none' }}>Call {phoneDisplay}</a>
              </p>
              <p style={{ fontSize: '0.9rem', opacity: 0.85, marginTop: '0.25rem' }}>
                <a href={`mailto:${email}`} style={{ color: 'inherit', textDecoration: 'none' }}>{email}</a>
              </p>
            </div>
            <div className="footer-links">
              <h3>Quick Links</h3>
              <Link href="/">Home</Link>
              <Link href="/#about">About</Link>
              <Link href="/#core-services">Services</Link>
              <Link href="/#testimonials">Testimonials</Link>
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
