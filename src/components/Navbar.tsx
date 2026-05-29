import { useState, useEffect } from "react";
import { Link, useMatches } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, Menu, X } from "lucide-react";
import { useCartStore } from "@/stores/cart";
import { cn } from "@/lib/utils";
import MobileNav from "./MobileNav";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/menu", label: "Menu" },
  { to: "/about", label: "About" },
  { to: "/reviews", label: "Reviews" },
  { to: "/contact", label: "Contact" },
] as const;

// Pages that have a dark/image hero where the navbar overlays on top.
// On these pages the *initial* (un-scrolled) text is cream.
// All other pages have a light background so text should always be dark.
const DARK_HERO_PAGES = new Set(["/"]);

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const openCart = useCartStore((s) => s.openCart);
  const itemCount = useCartStore((s) => s.itemCount);
  const matches = useMatches();
  const currentPath = matches[matches.length - 1]?.fullPath ?? "/";

  // Only the homepage has a full-bleed dark hero image;
  // every other page has a light cream background from the start.
  const hasDarkHero = DARK_HERO_PAGES.has(currentPath);

  // On pages without a dark hero the text should ALWAYS be dark.
  // On the homepage the text starts cream and switches to dark on scroll.
  const useDarkText = scrolled || !hasDarkHero;

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 40);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile nav on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [currentPath]);

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-500",
          scrolled || !hasDarkHero
            ? "border-b border-gold/10 bg-cream/90 py-3 shadow-lg backdrop-blur-lg"
            : "bg-transparent py-5",
        )}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 md:px-8">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-gold to-gold-soft text-cocoa transition-transform group-hover:scale-110">
              <span className="font-display text-base font-bold">B</span>
            </div>
            <span
              className={cn(
                "font-display text-base tracking-wide transition-colors md:text-lg",
                useDarkText ? "text-cocoa" : "text-cream",
              )}
            >
              The Bittersweet Co.
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-8 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={cn(
                  "font-button text-xs uppercase tracking-[0.15em] transition-colors hover:text-gold pb-1 border-b-2 border-transparent",
                  useDarkText ? "text-cocoa/80" : "text-cream/90",
                )}
                activeProps={{
                  className: useDarkText 
                    ? "!text-cocoa font-semibold !border-gold" 
                    : "!text-gold",
                }}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-3">
            {/* Cart button */}
            <button
              onClick={openCart}
              className={cn(
                "relative flex h-10 w-10 items-center justify-center rounded-full transition-colors",
                useDarkText
                  ? "bg-cocoa/5 text-cocoa hover:bg-cocoa/10"
                  : "bg-cream/10 text-cream hover:bg-cream/20",
              )}
              aria-label="Open cart"
            >
              <ShoppingBag size={20} />
              <AnimatePresence>
                {itemCount() > 0 && (
                  <motion.span
                    key="badge"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-gold text-[10px] font-bold text-cocoa"
                  >
                    {itemCount()}
                  </motion.span>
                )}
              </AnimatePresence>
            </button>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className={cn(
                "flex h-10 w-10 items-center justify-center rounded-full transition-colors md:hidden",
                useDarkText
                  ? "bg-cocoa/5 text-cocoa hover:bg-cocoa/10"
                  : "bg-cream/10 text-cream hover:bg-cream/20",
              )}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile nav */}
      <MobileNav open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
}
