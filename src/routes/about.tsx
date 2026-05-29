import { createFileRoute } from "@tanstack/react-router";
import aboutBakery from "@/assets/about-bakery.jpg";
import SectionHeading from "@/components/SectionHeading";
import ScrollReveal from "@/components/ScrollReveal";
import GlassCard from "@/components/GlassCard";
import ParallaxImage from "@/components/ParallaxImage";
import { Heart, Leaf, Award, Timer } from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "Our Story — The Bittersweet Co." },
      {
        name: "description",
        content:
          "From a small kitchen to your doorstep. Learn about our craft, ingredients, and promise to bake the best brownies and cookies you've ever tasted.",
      },
      { property: "og:title", content: "Our Story — The Bittersweet Co." },
    ],
  }),
  component: AboutPage,
});

const promises = [
  {
    icon: Heart,
    title: "Made with Love",
    body: "Every product is hand-crafted by our team. No machines, no mass production — just artisanal care in every bite.",
  },
  {
    icon: Leaf,
    title: "Real Ingredients",
    body: "Belgian cocoa, French butter, free-range eggs, and pure vanilla extract. We never compromise on quality.",
  },
  {
    icon: Timer,
    title: "Fresh Every Morning",
    body: "Your order is baked the morning it ships. We don't store, freeze, or pre-make — everything is fresh.",
  },
  {
    icon: Award,
    title: "Happiness Guaranteed",
    body: "If you're not delighted, we'll make it right. Your satisfaction is our most important ingredient.",
  },
];

function AboutPage() {
  return (
    <main className="min-h-screen bg-background">
      {/* Hero */}
      <section className="relative h-[50vh] min-h-[400px]">
        <ParallaxImage
          src={aboutBakery}
          alt="Inside our bakery kitchen"
          className="h-full"
          speed={0.1}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-cocoa/80 via-cocoa/40 to-transparent" />
        <div className="absolute inset-0 flex items-end pb-16">
          <div className="mx-auto max-w-3xl px-6 text-center">
            <p className="font-button text-xs uppercase tracking-[0.4em] text-gold">
              Our Story
            </p>
            <h1 className="mt-3 font-display text-4xl text-cream md:text-5xl">
              A small kitchen. <br />
              <span className="italic">Big flavour.</span>
            </h1>
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="bg-cream py-20 md:py-28">
        <div className="mx-auto max-w-3xl px-6 text-center md:px-8">
          <ScrollReveal>
            <p className="font-display text-xl italic leading-relaxed text-chocolate md:text-2xl">
              The Bittersweet Co. began in a tiny apartment kitchen with one mission:
              to bake brownies and cookies so good, they'd make your day better.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.15}>
            <p className="mt-8 text-base leading-relaxed text-muted-foreground">
              We believe that real indulgence starts with real ingredients. No artificial
              flavors, no preservatives, no shortcuts. Just honest baking with the finest
              Belgian cocoa, French butter, and a whole lot of love. Every batch is
              hand-mixed, hand-poured, and baked fresh the morning your order ships.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.3}>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground">
              What started as gifts for friends and family has grown into a brand that
              delivers happiness across the city. But our heart hasn't changed — every
              brownie still gets the same care as if it were for someone we love.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Our Promise */}
      <section className="bg-beige/40 py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6 md:px-8">
          <SectionHeading title="Our Promise" subtitle="What We Stand For" />
          <div className="mt-12 grid gap-6 sm:grid-cols-2">
            {promises.map((p, i) => (
              <ScrollReveal key={p.title} delay={i * 0.1}>
                <GlassCard className="h-full">
                  <div className="flex gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gold/10">
                      <p.icon size={22} className="text-gold" />
                    </div>
                    <div>
                      <h3 className="font-display text-lg text-cocoa">{p.title}</h3>
                      <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                        {p.body}
                      </p>
                    </div>
                  </div>
                </GlassCard>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
