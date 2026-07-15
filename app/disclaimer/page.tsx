import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Medical Disclaimer | Dr. Awanti Dhadphale',
  description:
    'Important information about the educational and medical content on the Dr. Awanti Dhadphale website.',
  alternates: {
    canonical: '/disclaimer',
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

export default function DisclaimerPage() {
  return (
    <main style={pageStyle}>
      <h1 style={{ ...headingStyle, marginTop: 0, fontSize: '2.5rem' }}>Medical Disclaimer</h1>
      <p><strong>Last updated:</strong> 15 July 2026</p>

      <h2 style={headingStyle}>Educational information only</h2>
      <p>
        Content on this website is provided for general educational and informational
        purposes. It is not a diagnosis, prescription, or substitute for an individual
        consultation with an appropriately qualified healthcare professional.
      </p>

      <h2 style={headingStyle}>Consultation and treatment</h2>
      <p>
        Visiting this website or sending an enquiry does not by itself create a
        doctor-patient relationship. Recommendations can be made only after an appropriate
        consultation. Do not delay necessary medical evaluation or stop prescribed medicine
        without consulting the treating medical professional.
      </p>

      <h2 style={headingStyle}>Complementary care</h2>
      <p>
        Homeopathy and counselling services described on this website should be understood
        within their appropriate professional scope. They are not a replacement for emergency
        treatment, hospital care, or specialist evaluation when these are required.
      </p>

      <h2 style={headingStyle}>Results and testimonials</h2>
      <p>
        Every person&apos;s circumstances and response are different. Testimonials describe
        individual experiences and do not promise or guarantee a particular outcome.
      </p>

      <h2 style={headingStyle}>Emergencies and crisis support</h2>
      <p>
        This website and its messaging channels are not emergency services. For a medical or
        mental-health emergency, call <strong>112</strong> or go to the nearest emergency
        department. Do not wait for a website, email, or WhatsApp response.
      </p>

      <h2 style={headingStyle}>Contact</h2>
      <p>
        For questions about a consultation, call{' '}
        <a href="tel:+919511213851">+91-9511213851</a> or email{' '}
        <a href="mailto:consult.drawanti@gmail.com">consult.drawanti@gmail.com</a>.
      </p>
    </main>
  );
}
