import reviewsData from '@/data/reviews.json';

type Review = {
  review_id?: string;
  author_name: string;
  profile_photo_url?: string;
  rating: number;
  text?: string;
  relative_time_description?: string;
  time?: number;
};

type LiveTestimonialsProps = {
  limit?: number;
  heading?: string;
  intro?: string;
  sourceLabel?: string;
};

const googleProfileUrl = 'https://share.google/opMeC2c62E8WG3uPX';

function getInitials(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join('');
}

function getReviewKey(review: Review) {
  if (review.review_id) {
    return review.review_id;
  }

  return [
    review.author_name.trim().toLowerCase(),
    review.rating,
    review.text?.replace(/\s+/g, ' ').trim().toLowerCase() || '',
    review.relative_time_description?.trim().toLowerCase() || ''
  ].join('|');
}

function isRealGoogleReview(review: Review) {
  return Boolean(review.author_name?.trim()) &&
    !/^Google reviewer\s+\d+$/i.test(review.author_name) &&
    !/^Google$/i.test(review.author_name);
}

export function getGoogleReviews() {
  return Array.from(
    new Map(
      (reviewsData as Review[])
        .filter(isRealGoogleReview)
        .map((review) => [getReviewKey(review), review])
    ).values()
  );
}

export function getGoogleReviewCount() {
  return getGoogleReviews().length;
}

export default function LiveTestimonials({
  limit,
  heading = 'Google Reviews',
  intro = 'Verified reviews from',
  sourceLabel = "Dr. Awanti Dhadphale's Google Business profile",
}: LiveTestimonialsProps = {}) {
  const allReviews = getGoogleReviews();
  const visibleReviews = typeof limit === 'number' ? allReviews.slice(0, limit) : allReviews;

  return (
    <section id="testimonials" className="testimonials-section animate-fade-up delay-200">
      <div className="testimonials-header">
        <h2 className="section-title" style={{ marginBottom: '1rem' }}>{heading}</h2>
        <p className="testimonials-subtitle">
          {intro}{' '}
          <a className="testimonials-source-link" href={googleProfileUrl} target="_blank" rel="noopener noreferrer">
            {sourceLabel}
          </a>
        </p>
      </div>

      {visibleReviews.length === 0 && (
        <div className="testimonials-empty">
          Reviews will appear here after they are imported from the Google Business profile.
        </div>
      )}

      {visibleReviews.length > 0 && (
        <div className="reviews-grid">
          {visibleReviews.map((review, index) => {
            const reviewText = review.text?.trim();
            const rating = Math.max(0, Math.min(5, Math.round(review.rating || 0)));

            return (
              <div key={`${getReviewKey(review)}-${index}`} className="testimonial-card">
                <div className="testimonial-header">
                  <div className="testimonial-author-info">
                    <span className="author-avatar-fallback" aria-hidden="true">
                      {getInitials(review.author_name)}
                    </span>
                    <div>
                      <h4 className="author-name">{review.author_name}</h4>
                      <div className="stars" aria-label={`${rating} out of 5 stars`}>
                        {Array.from({ length: rating }).map((_, i) => (
                          <span key={i} className="star" aria-hidden="true">&#9733;</span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="google-icon" title="Google Review" aria-hidden="true">
                    <svg width="24" height="24" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                      <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
                      <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
                      <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
                      <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
                    </svg>
                  </div>
                </div>
                {reviewText ? (
                  <p className="testimonial-text">&quot;{reviewText}&quot;</p>
                ) : null}
                {review.relative_time_description && (
                  <p className="testimonial-time">{review.relative_time_description}</p>
                )}
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}
