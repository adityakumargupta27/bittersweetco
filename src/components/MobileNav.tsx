import { Link } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { Home, UtensilsCrossed, BookOpen, Star, Phone } from "lucide-react";

const navLinks = [
  { to: "/", label: "Home", icon: Home },
  { to: "/menu", label: "Menu", icon: UtensilsCrossed },
  { to: "/about", label: "About", icon: BookOpen },
  { to: "/reviews", label: "Reviews", icon: Star },
  { to: "/contact", label: "Contact", icon: Phone },
] as const;

interface MobileNavProps {
  open: boolean;
  onClose: () => void;
}

export default function MobileNav({ open, onClose }: MobileNavProps) {
  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-40 bg-cocoa/60 backdrop-blur-sm md:hidden"
          />

          {/* Drawer */}
          <motion.nav
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 250 }}
            className="fixed inset-y-0 right-0 z-50 flex w-[280px] flex-col bg-cocoa shadow-2xl md:hidden"
          >
            <div className="flex-1 px-6 pt-24">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.to}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * i }}
                >
                  <Link
                    to={link.to}
                    onClick={onClose}
                    className="flex items-center gap-4 border-b border-cream/10 py-4 font-button text-sm uppercase tracking-widest text-cream/90 transition-colors hover:text-gold"
                    activeProps={{ className: "!text-gold" }}
                  >
                    <link.icon size={18} className="text-gold/60" />
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* Footer */}
            <div className="border-t border-cream/10 px-6 py-6">
              <p className="font-display text-sm text-cream/50">The Bittersweet Co.</p>
              <p className="mt-1 text-xs text-cream/30">Handcrafted with love</p>
            </div>
          </motion.nav>
        </>
      )}
    </AnimatePresence>
  );
}
