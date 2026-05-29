import { Link } from "@tanstack/react-router";
import { Instagram, Mail, Phone, MapPin } from "lucide-react";
import GoldDivider from "./GoldDivider";

const footerLinks = [
  { to: "/", label: "Home" },
  { to: "/menu", label: "Menu" },
  { to: "/about", label: "Our Story" },
  { to: "/reviews", label: "Reviews" },
  { to: "/contact", label: "Contact" },
] as const;

export default function Footer() {
  return (
    <footer className="border-t border-border bg-cocoa text-cream">
      <div className="mx-auto max-w-7xl px-6 py-16 md:px-8">
        <div className="grid gap-12 md:grid-cols-3">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-gold to-gold-soft">
                <span className="font-display text-lg font-bold text-cocoa">B</span>
              </div>
              <span className="font-display text-xl tracking-wide">The Bittersweet Co.</span>
            </div>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-cream/60">
              Transforming cravings into bliss. Handcrafted brownies and cookies baked fresh
              and delivered with love.
            </p>
            <div className="mt-6 flex gap-3">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-cream/10 text-cream/70 transition-colors hover:bg-gold hover:text-cocoa"
                aria-label="Instagram"
              >
                <Instagram size={16} />
              </a>
              <a
                href="mailto:hello@bittersweet.co"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-cream/10 text-cream/70 transition-colors hover:bg-gold hover:text-cocoa"
                aria-label="Email"
              >
                <Mail size={16} />
              </a>
              <a
                href="tel:+919999999999"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-cream/10 text-cream/70 transition-colors hover:bg-gold hover:text-cocoa"
                aria-label="Phone"
              >
                <Phone size={16} />
              </a>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="font-button text-xs uppercase tracking-[0.2em] text-gold">Quick Links</h3>
            <ul className="mt-4 space-y-3">
              {footerLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-sm text-cream/60 transition-colors hover:text-gold"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-button text-xs uppercase tracking-[0.2em] text-gold">
              Get in Touch
            </h3>
            <ul className="mt-4 space-y-3 text-sm text-cream/60">
              <li className="flex items-start gap-2">
                <MapPin size={16} className="mt-0.5 shrink-0 text-gold/50" />
                <span>Mumbai, Maharashtra, India</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone size={16} className="shrink-0 text-gold/50" />
                <a href="tel:+919999999999" className="transition-colors hover:text-gold">
                  +91 99999 99999
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail size={16} className="shrink-0 text-gold/50" />
                <a href="mailto:hello@bittersweet.co" className="transition-colors hover:text-gold">
                  hello@bittersweet.co
                </a>
              </li>
            </ul>
          </div>
        </div>

        <GoldDivider className="my-10" ornament={false} />

        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <p className="text-xs text-cream/40">
            © {new Date().getFullYear()} The Bittersweet Co. All rights reserved.
          </p>
          <p className="text-xs text-cream/30">
            Made with <span className="text-gold">♥</span> and Belgian cocoa
          </p>
        </div>
      </div>
    </footer>
  );
}
