import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy | Dr. Awanti Dhadphale',
  description:
    'How the Dr. Awanti Dhadphale website collects, uses, protects, and handles personal information.',
  alternates: {
    canonical: '/privacy-policy',
  },
};

const pageStyle = {
  maxWidth: '840px',
  margin: '0 auto',
  padding: '10rem 1.25rem 6rem',
  color: '#334155',
  lineHeight: 1.75,
};

const headingStyle = {
  color: 'var(--primary-dark)',
  marginTop: '2rem',
  marginBottom: '0.75rem',
};

export default function PrivacyPolicyPage() {
  return (
    <main style={pageStyle}>
      <h1 style={{ ...headingStyle, marginTop: 0, fontSize: '2.5rem' }}>Privacy Policy</h1>
      <p><strong>Effective date:</strong> 15 July 2026</p>
      <p>
        This policy explains how the website and clinic of Dr. Awanti Dhadphale handle
        personal information that you choose to provide.
      </p>

      <h2 style={headingStyle}>Information we collect</h2>
      <p>
        We may receive your name, phone number, email address, appointment preferences,
        and information you send through email, phone, WhatsApp, or a consultation form.
        Basic technical information may also be recorded by our hosting provider for
        security and website operation.
      </p>

      <h2 style={headingStyle}>How information is used</h2>
      <p>
        Information is used to respond to enquiries, arrange consultations, provide the
        resources you request, maintain professional records, and operate or improve the
        website. We do not sell personal information.
      </p>

      <h2 style={headingStyle}>Health information</h2>
      <p>
        Information shared for a consultation may be sensitive. Please send it only through
        the method requested by the clinic and avoid using a public or shared device. Health
        information is used for consultation and related care, subject to applicable
        professional and legal record-keeping requirements.
      </p>

      <h2 style={headingStyle}>Service providers and external links</h2>
      <p>
        Limited information may be processed by providers used for hosting, email,
        communications, maps, or appointment support. Links to WhatsApp, Google Maps, and
        social platforms are governed by those services&apos; own privacy policies.
      </p>

      <h2 style={headingStyle}>Retention and security</h2>
      <p>
        Information is retained only for as long as reasonably necessary for the purpose for
        which it was collected, professional record-keeping, dispute resolution, or legal
        obligations. Reasonable safeguards are used, although no internet transmission or
        storage method can be guaranteed to be completely secure.
      </p>

      <h2 style={headingStyle}>Your choices</h2>
      <p>
        You may ask to access or correct your contact information, withdraw from optional
        communications, or request deletion where retention is not legally or professionally
        required.
      </p>

      <h2 style={headingStyle}>Contact</h2>
      <p>
        For privacy questions, email{' '}
        <a href="mailto:consult.drawanti@gmail.com">consult.drawanti@gmail.com</a> or call{' '}
        <a href="tel:+919511213851">+91-9511213851</a>.
      </p>
    </main>
  );
}
