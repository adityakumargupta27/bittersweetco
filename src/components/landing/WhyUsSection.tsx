import { Cookie, Truck, Heart, ShieldCheck } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import GlassCard from "@/components/GlassCard";
import ScrollReveal from "@/components/ScrollReveal";

const reasons = [
  {
    icon: Cookie,
    title: "Premium Ingredients",
    description:
      "Belgian cocoa, French butter, organic eggs — we never cut corners on what goes into your treats.",
  },
  {
    icon: Heart,
    title: "Baked with Love",
    description:
      "Every brownie and cookie is hand-poured, hand-topped, and individually wrapped with care.",
  },
  {
    icon: Truck,
    title: "Same-Day Delivery",
    description:
      "Order before noon and get your fresh batch delivered the same day. Free delivery above ₹499.",
  },
  {
    icon: ShieldCheck,
    title: "Freshness Guaranteed",
    description:
      "Baked the morning of delivery. If it's not fresh, it's on us — guaranteed.",
  },
];

export default function WhyUsSection() {
  return (
    <section className="bg-cream py-20 md:py-32">
      <div className="mx-auto max-w-7xl px-6 md:px-8">
        <SectionHeading title="Why Choose Us" subtitle="Our Promise" />

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {reasons.map((reason, i) => (
            <ScrollReveal key={reason.title} delay={i * 0.1}>
              <GlassCard className="h-full text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gold/10">
                  <reason.icon size={26} className="text-gold" />
                </div>
                <h3 className="mt-5 font-display text-lg text-cocoa">{reason.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {reason.description}
                </p>
              </GlassCard>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
