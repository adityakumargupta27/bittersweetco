import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import ScrollReveal from "@/components/ScrollReveal";
import MagneticButton from "@/components/MagneticButton";

export default function CTASection() {
  return (
    <section className="relative overflow-hidden bg-cocoa py-24 md:py-36">
      {/* Decorative particles */}
      {Array.from({ length: 8 }).map((_, i) => (
        <span
          key={i}
          className="pointer-events-none absolute h-1 w-1 rounded-full bg-gold/40 animate-float-particle"
          style={{
            left: `${(i * 71) % 100}%`,
            top: `${(i * 53) % 100}%`,
            animationDelay: `${i * 0.9}s`,
            animationDuration: `${7 + (i % 5)}s`,
          }}
        />
      ))}

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-cocoa via-chocolate/30 to-cocoa" />

      <div className="relative z-10 mx-auto max-w-3xl px-6 text-center md:px-8">
        <ScrollReveal>
          <p className="font-button text-xs uppercase tracking-[0.4em] text-gold">
            Ready to Indulge?
          </p>
          <h2 className="mt-4 font-display text-4xl leading-tight text-cream md:text-5xl lg:text-6xl">
            Life's too short for{" "}
            <span className="italic text-gold-shimmer">ordinary</span> desserts.
          </h2>
          <p className="mx-auto mt-6 max-w-lg text-base text-cream/70 md:text-lg">
            Order your box of handcrafted brownies and cookies today. Baked fresh,
            delivered with love.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link to="/menu">
              <MagneticButton className="bg-gold text-cocoa shadow-[0_10px_40px_-10px_rgba(200,179,138,0.6)] hover:bg-gold-soft">
                Order Now
                <span aria-hidden>→</span>
              </MagneticButton>
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 rounded-full border border-cream/30 px-8 py-4 font-button text-xs uppercase tracking-widest text-cream transition-colors hover:border-gold hover:text-gold"
            >
              Get in Touch
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
