import { createFileRoute } from "@tanstack/react-router";
import { Star } from "lucide-react";
import { getApprovedReviews } from "@/lib/api/reviews.server";
import SectionHeading from "@/components/SectionHeading";
import ScrollReveal from "@/components/ScrollReveal";

export const Route = createFileRoute("/reviews")({
  head: () => ({
    meta: [
      { title: "Reviews — The Bittersweet Co." },
      {
        name: "description",
        content: "See what our customers say about The Bittersweet Co. brownies and cookies.",
      },
    ],
  }),
  loader: async () => {
    const reviews = await getApprovedReviews().catch(() => [] as Awaited<ReturnType<typeof getApprovedReviews>>);
    return { reviews };
  },
  component: ReviewsPage,
});

function ReviewsPage() {
  const { reviews } = Route.useLoaderData();

  return (
    <main className="min-h-screen bg-background pb-20 pt-28">
      <div className="mx-auto max-w-7xl px-6 md:px-8">
        <SectionHeading
          title="Customer Reviews"
          subtitle="Kind Words from Happy Customers"
        />

        {reviews.length > 0 ? (
          <div className="mt-12 columns-1 gap-6 space-y-6 sm:columns-2 lg:columns-3">
            {reviews.map((review, i) => (
              <ScrollReveal key={review.id} delay={i * 0.04}>
                <div className="break-inside-avoid rounded-2xl border border-border bg-white p-6 shadow-sm">
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
                  <p className="mt-3 text-sm leading-relaxed text-cocoa/80">
                    "{review.body}"
                  </p>
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
        ) : (
          <div className="py-20 text-center">
            <p className="font-display text-xl text-cocoa/60">No reviews yet</p>
            <p className="mt-2 text-sm text-muted-foreground">
              Be the first to share your experience!
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
