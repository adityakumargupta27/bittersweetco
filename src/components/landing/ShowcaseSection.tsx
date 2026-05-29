import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Sparkles, Clock, Leaf, Award } from "lucide-react";
import showcaseBrownie from "@/assets/showcase-brownie.jpg";
import SectionHeading from "@/components/SectionHeading";
import ScrollReveal from "@/components/ScrollReveal";

const features = [
  {
    icon: Sparkles,
    title: "Belgian Cocoa",
    description: "We source the finest Callebaut cocoa for that deep, rich chocolate soul.",
  },
  {
    icon: Clock,
    title: "Baked Fresh Daily",
    description: "Every batch is baked the morning it ships — never frozen, never stale.",
  },
  {
    icon: Leaf,
    title: "Real Ingredients",
    description: "French butter, free-range eggs, pure vanilla. No shortcuts.",
  },
  {
    icon: Award,
    title: "Handcrafted",
    description: "Small batches, hand-poured, individually wrapped with love.",
  },
];

export default function ShowcaseSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const imageScale = useTransform(scrollYProgress, [0, 0.5], [0.9, 1]);
  const imageRotate = useTransform(scrollYProgress, [0, 1], [-3, 3]);

  return (
    <section ref={sectionRef} className="overflow-hidden bg-cream py-20 md:py-32">
      <div className="mx-auto max-w-7xl px-6 md:px-8">
        <SectionHeading title="Our Craft" subtitle="What Makes Us Special" />

        <div className="mt-12 grid items-center gap-12 md:grid-cols-2 md:gap-16">
          {/* Image */}
          <motion.div
            style={{ scale: imageScale, rotate: imageRotate }}
            className="relative aspect-[4/5] overflow-hidden rounded-3xl shadow-2xl"
          >
            <img
              src={showcaseBrownie}
              alt="A freshly baked brownie showcasing our craft"
              className="h-full w-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-cocoa/30 to-transparent" />
          </motion.div>

          {/* Features */}
          <div className="space-y-6">
            {features.map((feature, i) => (
              <ScrollReveal key={feature.title} direction="right" delay={i * 0.1}>
                <div className="flex gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gold/10">
                    <feature.icon size={22} className="text-gold" />
                  </div>
                  <div>
                    <h3 className="font-display text-lg text-cocoa">{feature.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
