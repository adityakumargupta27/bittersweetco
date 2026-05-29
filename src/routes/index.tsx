import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import heroBrownie from "@/assets/hero-brownie.jpg";

import { getFeaturedProducts } from "@/lib/api/products.server";
import { getApprovedReviews } from "@/lib/api/reviews.server";

import ShowcaseSection from "@/components/landing/ShowcaseSection";
import FeaturedProducts from "@/components/landing/FeaturedProducts";
import WhyUsSection from "@/components/landing/WhyUsSection";
import ReviewsSection from "@/components/landing/ReviewsSection";
import InstagramGrid from "@/components/landing/InstagramGrid";
import CTASection from "@/components/landing/CTASection";

export const Route = createFileRoute("/")(
  {
    head: () => ({
      meta: [
        { title: "The Bittersweet Co. — Handcrafted Brownies & Cookies" },
        {
          name: "description",
          content:
            "Transforming cravings into bliss. Handcrafted brownies and cookies baked fresh with Belgian cocoa and delivered with love.",
        },
        { property: "og:title", content: "The Bittersweet Co." },
        {
          property: "og:description",
          content:
            "Handcrafted brownies and cookies, baked fresh and delivered with love.",
        },
        { property: "og:image", content: heroBrownie },
      ],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Bakery",
            name: "The Bittersweet Co.",
            description:
              "Handcrafted brownies and cookies baked fresh and delivered with love.",
            url: "https://bittersweet.co",
            servesCuisine: "Bakery",
            priceRange: "₹₹",
            address: {
              "@type": "PostalAddress",
              addressLocality: "Mumbai",
              addressRegion: "Maharashtra",
              addressCountry: "IN",
            },
          }),
        },
      ],
    }),
    loader: async () => {
      const [products, reviews] = await Promise.all([
        getFeaturedProducts().catch(() => [] as Awaited<ReturnType<typeof getFeaturedProducts>>),
        getApprovedReviews().catch(() => [] as Awaited<ReturnType<typeof getApprovedReviews>>),
      ]);
      return { products, reviews };
    },
    component: Index,
  },
);

function Index() {
  const { products, reviews } = Route.useLoaderData();

  return (
    <main className="relative min-h-screen overflow-hidden bg-background text-foreground">
      {/* Hero */}
      <section className="relative flex min-h-screen items-center">
        <motion.div
          initial={{ scale: 1.15 }}
          animate={{ scale: 1 }}
          transition={{ duration: 14, ease: "easeOut" }}
          className="absolute inset-0"
        >
          <img
            src={heroBrownie}
            alt="A freshly baked artisan fudge brownie"
            className="h-full w-full object-cover"
            width={1920}
            height={1280}
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-br from-cocoa/90 via-cocoa/60 to-chocolate/70" />
        <div className="absolute inset-0 bg-gradient-to-t from-cocoa via-transparent to-transparent" />

        {/* Floating particles */}
        {Array.from({ length: 12 }).map((_, i) => (
          <span
            key={i}
            className="pointer-events-none absolute h-1.5 w-1.5 rounded-full bg-gold/60 animate-float-particle"
            style={{
              left: `${(i * 83) % 100}%`,
              top: `${(i * 47) % 100}%`,
              animationDelay: `${i * 0.7}s`,
              animationDuration: `${8 + (i % 4)}s`,
            }}
          />
        ))}

        <div className="relative z-10 mx-auto max-w-5xl px-6 text-center text-cream md:px-12">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="font-button text-xs uppercase tracking-[0.4em] text-gold"
          >
            Handcrafted · Baked Daily · Delivered with Love
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6 font-display text-5xl leading-[1.05] md:text-7xl lg:text-8xl"
          >
            Transforming cravings <br />
            <span className="italic text-gold-shimmer">into bliss</span>.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.9 }}
            className="mx-auto mt-8 max-w-xl text-base leading-relaxed text-cream/85 md:text-lg"
          >
            Belgian cocoa. French butter. Slow baking. Every brownie and cookie
            at The Bittersweet Co. is made by hand the morning it arrives at
            your door.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.85, duration: 0.8 }}
            className="mt-10 flex flex-wrap items-center justify-center gap-4"
          >
            <Link
              to="/menu"
              className="group relative inline-flex items-center gap-2 rounded-full bg-gold px-8 py-4 font-button text-sm uppercase tracking-widest text-cocoa shadow-[0_10px_40px_-10px_rgba(200,179,138,0.7)] transition hover:scale-[1.03] animate-pulse-glow"
            >
              Order Now
              <span aria-hidden>→</span>
            </Link>
            <Link
              to="/menu"
              className="inline-flex items-center gap-2 rounded-full border border-cream/40 px-8 py-4 font-button text-sm uppercase tracking-widest text-cream transition hover:border-gold hover:text-gold"
            >
              Explore Menu
            </Link>
          </motion.div>
        </div>

        {/* Scroll cue */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-center"
        >
          <div className="mx-auto h-12 w-px bg-gradient-to-b from-transparent via-gold to-transparent" />
          <p className="mt-2 font-button text-[10px] uppercase tracking-[0.4em] text-cream/60">
            Scroll
          </p>
        </motion.div>
      </section>

      {/* Quiet brand line */}
      <section className="border-t border-border bg-cream py-24 text-center">
        <p className="mx-auto max-w-2xl px-6 font-display text-2xl italic leading-relaxed text-chocolate md:text-3xl">
          "A small kitchen. Real ingredients. The unhurried craft of something
          made the way it should be."
        </p>
        <p className="mt-6 font-button text-xs uppercase tracking-[0.4em] text-olive">
          — Established with love, baked every dawn
        </p>
      </section>

      {/* Sections */}
      <ShowcaseSection />
      <FeaturedProducts products={products} />
      <WhyUsSection />
      <ReviewsSection reviews={reviews} />
      <InstagramGrid />
      <CTASection />
    </main>
  );
}
