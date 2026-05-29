import { Link } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag } from "lucide-react";
import { useCartStore } from "@/stores/cart";
import { useIsMobile } from "@/hooks/use-mobile";

export default function MobileOrderBar() {
  const isMobile = useIsMobile();
  const itemCount = useCartStore((s) => s.itemCount);
  const total = useCartStore((s) => s.total);
  const openCart = useCartStore((s) => s.openCart);

  if (!isMobile) return null;

  return (
    <AnimatePresence>
      {itemCount() > 0 && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="fixed inset-x-0 bottom-0 z-50 border-t border-gold/20 bg-cocoa/95 backdrop-blur-lg px-4 py-3 md:hidden"
        >
          <div className="flex items-center justify-between gap-3">
            <button
              onClick={openCart}
              className="flex items-center gap-2 text-cream"
            >
              <div className="relative">
                <ShoppingBag size={20} />
                <span className="absolute -right-1.5 -top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-gold text-[9px] font-bold text-cocoa">
                  {itemCount()}
                </span>
              </div>
              <span className="font-button text-xs uppercase tracking-wider">
                {itemCount()} items · ₹{total()}
              </span>
            </button>
            <Link
              to="/checkout"
              className="rounded-full bg-gold px-5 py-2.5 font-button text-xs uppercase tracking-widest text-cocoa shadow-lg transition-colors hover:bg-gold-soft"
            >
              Order Now →
            </Link>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
