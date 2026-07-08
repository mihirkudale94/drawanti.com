import type { Metadata } from 'next';
import Link from 'next/link';
import LiveTestimonials from '@/components/LiveTestimonials';

export const metadata: Metadata = {
  title: 'Testimonials | Dr. Awanti Dhadphale',
  description:
    "Read testimonials from Dr. Awanti Dhadphale's Google Business profile for homeopathy, counselling, and holistic care in Pune.",
  openGraph: {
    type: 'website',
    url: 'https://www.drawanti.com/patient-reviews',
    title: 'Testimonials | Dr. Awanti Dhadphale',
    description:
      "Read testimonials from Dr. Awanti Dhadphale's Google Business profile.",
    images: [
      {
        url: 'https://www.drawanti.com/dravanti.jpg',
        width: 1200,
        height: 630,
        alt: 'Testimonials for Dr. Awanti Dhadphale',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Testimonials | Dr. Awanti Dhadphale',
    description: "Read testimonials from Dr. Awanti Dhadphale's Google Business profile.",
    images: ['https://www.drawanti.com/dravanti.jpg'],
  },
  alternates: {
    canonical: 'https://www.drawanti.com/patient-reviews',
  },
};

export default function PatientReviewsPage() {
  return (
    <main className="reviews-page">
      <section className="reviews-page-hero animate-fade-up">
        <div className="reviews-page-badge">Google testimonials</div>
        <h1>Testimonials</h1>
        <p>
          Read what patients have shared about their experience with Dr. Awanti Dhadphale,
          collected from her Google Business profile in one easy-to-browse place.
        </p>
        <div className="reviews-page-actions">
          <Link href="/patient-intake" className="btn-primary">
            Start Online Consultation
          </Link>
          <Link href="/#contact" className="btn-primary reviews-page-secondary-action">
            Contact Clinic
          </Link>
        </div>
      </section>

      <LiveTestimonials
        heading="All Google Reviews"
        intro="Collected from"
      />
    </main>
  );
}
