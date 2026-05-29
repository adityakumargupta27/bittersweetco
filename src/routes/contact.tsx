import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { Mail, Phone, MapPin, MessageCircle, Send, Loader2 } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import ScrollReveal from "@/components/ScrollReveal";
import GlassCard from "@/components/GlassCard";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — The Bittersweet Co." },
      {
        name: "description",
        content:
          "Get in touch with The Bittersweet Co. for bulk orders, custom boxes, or any queries.",
      },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [sending, setSending] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSending(true);
    // Simulate sending (no real backend for contact form in v1)
    setTimeout(() => {
      setSending(false);
      toast.success("Message sent! We'll get back to you soon.");
      (e.target as HTMLFormElement).reset();
    }, 1000);
  }

  const inputClass =
    "w-full rounded-xl border border-border bg-white px-4 py-3 text-sm text-cocoa placeholder:text-muted-foreground focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/20 transition-all";

  return (
    <main className="min-h-screen bg-background pb-20 pt-28">
      <div className="mx-auto max-w-7xl px-6 md:px-8">
        <SectionHeading
          title="Get in Touch"
          subtitle="We'd Love to Hear from You"
        />

        <div className="mt-12 grid gap-10 md:grid-cols-2">
          {/* Form */}
          <ScrollReveal direction="left">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-cocoa">
                  Name
                </label>
                <input
                  name="name"
                  className={inputClass}
                  placeholder="Your name"
                  required
                />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-cocoa">
                  Email
                </label>
                <input
                  name="email"
                  type="email"
                  className={inputClass}
                  placeholder="you@example.com"
                  required
                />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-cocoa">
                  Message
                </label>
                <textarea
                  name="message"
                  className={inputClass}
                  rows={5}
                  placeholder="Tell us how we can help..."
                  required
                />
              </div>
              <button
                type="submit"
                disabled={sending}
                className="flex w-full items-center justify-center gap-2 rounded-full bg-cocoa px-6 py-3.5 font-button text-xs uppercase tracking-widest text-cream transition-colors hover:bg-chocolate disabled:opacity-50"
              >
                {sending ? (
                  <Loader2 size={14} className="animate-spin" />
                ) : (
                  <Send size={14} />
                )}
                {sending ? "Sending..." : "Send Message"}
              </button>
            </form>
          </ScrollReveal>

          {/* Info */}
          <ScrollReveal direction="right">
            <div className="space-y-6">
              <GlassCard hover={false}>
                <div className="flex gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gold/10">
                    <MapPin size={20} className="text-gold" />
                  </div>
                  <div>
                    <h3 className="font-display text-base text-cocoa">Our Location</h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Mumbai, Maharashtra, India
                    </p>
                  </div>
                </div>
              </GlassCard>

              <GlassCard hover={false}>
                <div className="flex gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gold/10">
                    <Phone size={20} className="text-gold" />
                  </div>
                  <div>
                    <h3 className="font-display text-base text-cocoa">Call Us</h3>
                    <a
                      href="tel:+919999999999"
                      className="mt-1 text-sm text-muted-foreground transition-colors hover:text-gold"
                    >
                      +91 99999 99999
                    </a>
                  </div>
                </div>
              </GlassCard>

              <GlassCard hover={false}>
                <div className="flex gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gold/10">
                    <Mail size={20} className="text-gold" />
                  </div>
                  <div>
                    <h3 className="font-display text-base text-cocoa">Email</h3>
                    <a
                      href="mailto:hello@bittersweet.co"
                      className="mt-1 text-sm text-muted-foreground transition-colors hover:text-gold"
                    >
                      hello@bittersweet.co
                    </a>
                  </div>
                </div>
              </GlassCard>

              <GlassCard hover={false}>
                <div className="flex gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#25D366]/10">
                    <MessageCircle size={20} className="text-[#25D366]" />
                  </div>
                  <div>
                    <h3 className="font-display text-base text-cocoa">WhatsApp</h3>
                    <a
                      href="https://wa.me/919999999999"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-1 text-sm text-muted-foreground transition-colors hover:text-[#25D366]"
                    >
                      Chat with us
                    </a>
                  </div>
                </div>
              </GlassCard>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </main>
  );
}
