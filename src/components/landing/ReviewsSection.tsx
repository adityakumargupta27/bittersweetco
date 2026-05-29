import { Star } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import ScrollReveal from "@/components/ScrollReveal";

interface Review {
  id: string;
  customer_name: string;
  rating: number;
  body: string;
  photo_url: string | null;
  location: string | null;
  created_at: string;
}

interface ReviewsSectionProps {
  reviews: Review[];
}

export default function ReviewsSection({ reviews }: ReviewsSectionProps) {
  if (reviews.length === 0) return null;

  // Show up to 6 on landing
  const displayReviews = reviews.slice(0, 6);

  return (
    <section className="bg-beige/30 py-20 md:py-32">
      <div className="mx-auto max-w-7xl px-6 md:px-8">
        <SectionHeading title="What Our Customers Say" subtitle="Kind Words" />

        <div className="mt-12 columns-1 gap-6 space-y-6 sm:columns-2 lg:columns-3">
          {displayReviews.map((review, i) => (
            <ScrollReveal key={review.id} delay={i * 0.06}>
              <div className="break-inside-avoid rounded-2xl border border-border bg-white p-6 shadow-sm">
                {/* Stars */}
                <div className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, s) => (
                    <Star
                      key={s}
                      size={14}
                      className={
                        s < review.rating
                          ? "fill-gold text-gold"
                          : "fill-beige text-beige"
                      }
                    />
                  ))}
                </div>

                {/* Body */}
                <p className="mt-3 text-sm leading-relaxed text-cocoa/80">
                  "{review.body}"
                </p>

                {/* Author */}
                <div className="mt-4 flex items-center gap-3">
                  {review.photo_url ? (
                    <img
                      src={review.photo_url}
                      alt={review.customer_name}
                      className="h-9 w-9 rounded-full object-cover"
                    />
                  ) : (
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gold/15 font-display text-sm text-gold">
                      {review.customer_name.charAt(0)}
                    </div>
                  )}
                  <div>
                    <p className="font-display text-sm text-cocoa">
                      {review.customer_name}
                    </p>
                    {review.location && (
                      <p className="text-xs text-muted-foreground">{review.location}</p>
                    )}
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
