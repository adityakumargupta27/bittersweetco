import { Link } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { X, Plus, Minus, Trash2, ShoppingBag } from "lucide-react";
import { useCartStore } from "@/stores/cart";
import { getProductImage } from "@/lib/products-images";

export default function CartDrawer() {
  const isOpen = useCartStore((s) => s.isOpen);
  const closeCart = useCartStore((s) => s.closeCart);
  const items = useCartStore((s) => s.items);
  const removeItem = useCartStore((s) => s.removeItem);
  const updateQuantity = useCartStore((s) => s.updateQuantity);
  const subtotal = useCartStore((s) => s.subtotal);
  const deliveryFee = useCartStore((s) => s.deliveryFee);
  const discount = useCartStore((s) => s.discount);
  const total = useCartStore((s) => s.total);
  const coupon = useCartStore((s) => s.coupon);
  const removeCoupon = useCartStore((s) => s.removeCoupon);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            className="fixed inset-0 z-[60] bg-cocoa/50 backdrop-blur-sm"
          />

          {/* Drawer */}
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 280 }}
            className="fixed inset-y-0 right-0 z-[61] flex w-full max-w-md flex-col bg-cream shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-border px-6 py-5">
              <h2 className="font-display text-xl text-cocoa">Your Cart</h2>
              <button
                onClick={closeCart}
                className="flex h-8 w-8 items-center justify-center rounded-full bg-cocoa/5 text-cocoa transition-colors hover:bg-cocoa/10"
                aria-label="Close cart"
              >
                <X size={18} />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto px-6 py-4">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20 text-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-beige/60">
                    <ShoppingBag size={28} className="text-chocolate/40" />
                  </div>
                  <p className="mt-4 font-display text-lg text-cocoa/60">Your cart is empty</p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Browse our menu and add something delicious!
                  </p>
                  <Link
                    to="/menu"
                    onClick={closeCart}
                    className="mt-6 inline-flex items-center gap-2 rounded-full bg-cocoa px-6 py-3 font-button text-xs uppercase tracking-widest text-cream transition-colors hover:bg-chocolate"
                  >
                    Explore Menu
                  </Link>
                </div>
              ) : (
                <ul className="space-y-4">
                  <AnimatePresence mode="popLayout">
                    {items.map((item) => (
                      <motion.li
                        key={item.id}
                        layout
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -30, height: 0 }}
                        className="flex gap-4 rounded-xl border border-border bg-white/60 p-3"
                      >
                        <img
                          src={getProductImage(item.slug, item.image)}
                          alt={item.name}
                          className="h-20 w-20 rounded-lg object-cover"
                        />
                        <div className="flex flex-1 flex-col justify-between">
                          <div>
                            <p className="font-display text-sm text-cocoa">{item.name}</p>
                            <p className="text-sm font-medium text-chocolate">
                              ₹{item.price}
                            </p>
                          </div>
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="flex h-7 w-7 items-center justify-center rounded-full border border-border text-cocoa transition-colors hover:bg-beige"
                              aria-label="Decrease quantity"
                            >
                              <Minus size={14} />
                            </button>
                            <span className="w-6 text-center text-sm font-medium text-cocoa">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="flex h-7 w-7 items-center justify-center rounded-full border border-border text-cocoa transition-colors hover:bg-beige"
                              aria-label="Increase quantity"
                            >
                              <Plus size={14} />
                            </button>
                            <button
                              onClick={() => removeItem(item.id)}
                              className="ml-auto flex h-7 w-7 items-center justify-center rounded-full text-destructive/60 transition-colors hover:bg-destructive/10 hover:text-destructive"
                              aria-label="Remove item"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </div>
                      </motion.li>
                    ))}
                  </AnimatePresence>
                </ul>
              )}
            </div>

            {/* Footer / Totals */}
            {items.length > 0 && (
              <div className="border-t border-border px-6 py-5">
                {coupon && (
                  <div className="mb-3 flex items-center justify-between rounded-lg bg-gold/10 px-3 py-2 text-sm">
                    <span className="font-button text-xs uppercase tracking-wider text-olive">
                      {coupon.code} applied
                    </span>
                    <button
                      onClick={removeCoupon}
                      className="text-xs text-destructive/70 hover:text-destructive"
                    >
                      Remove
                    </button>
                  </div>
                )}
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between text-muted-foreground">
                    <span>Subtotal</span>
                    <span>₹{subtotal()}</span>
                  </div>
                  {discount() > 0 && (
                    <div className="flex justify-between text-olive">
                      <span>Discount</span>
                      <span>-₹{discount()}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-muted-foreground">
                    <span>Delivery</span>
                    <span>{deliveryFee() === 0 ? "Free" : `₹${deliveryFee()}`}</span>
                  </div>
                  <div className="flex justify-between border-t border-border pt-2 font-display text-base text-cocoa">
                    <span>Total</span>
                    <span>₹{total()}</span>
                  </div>
                </div>
                <Link
                  to="/checkout"
                  onClick={closeCart}
                  className="mt-4 flex w-full items-center justify-center gap-2 rounded-full bg-cocoa px-6 py-3.5 font-button text-xs uppercase tracking-widest text-cream shadow-lg transition-all hover:bg-chocolate hover:shadow-xl"
                >
                  Proceed to Checkout
                  <span aria-hidden>→</span>
                </Link>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
