import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Plus, Minus, ShoppingBag } from "lucide-react";
import { useCartStore } from "@/stores/cart";
import { getProductImage } from "@/lib/products-images";
import type { Tables } from "@/integrations/supabase/types";

interface ProductModalProps {
  product: Tables<"products"> | null;
  onClose: () => void;
}

export default function ProductModal({ product, onClose }: ProductModalProps) {
  const [quantity, setQuantity] = useState(1);
  const addItem = useCartStore((s) => s.addItem);

  // Reset quantity when product changes
  if (!product) return null;

  function handleAdd() {
    if (!product || product.stock === 0) return;
    addItem(
      {
        id: product.id,
        slug: product.slug,
        name: product.name,
        price: product.price_inr,
        image: product.image_url,
      },
      quantity,
    );
    setQuantity(1);
    onClose();
  }

  return (
    <AnimatePresence>
      {product && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[70] bg-cocoa/60 backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed inset-4 z-[71] m-auto flex max-h-[90vh] max-w-2xl flex-col overflow-hidden rounded-3xl bg-cream shadow-2xl md:inset-auto md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-full"
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-cream/80 text-cocoa shadow-sm backdrop-blur-sm transition-colors hover:bg-cream"
              aria-label="Close product details"
            >
              <X size={18} />
            </button>

            <div className="flex flex-1 flex-col overflow-y-auto md:flex-row">
              {/* Image */}
              <div className="relative aspect-square shrink-0 md:w-1/2">
                <img
                  src={getProductImage(product.slug, product.image_url)}
                  alt={product.name}
                  className="h-full w-full object-cover"
                />
                {product.badge && (
                  <span className="absolute left-4 top-4 rounded-full bg-gold px-3 py-1 font-button text-[10px] uppercase tracking-wider text-cocoa shadow-md">
                    {product.badge}
                  </span>
                )}
              </div>

              {/* Details */}
              <div className="flex flex-1 flex-col p-6 md:p-8">
                <h2 className="font-display text-2xl text-cocoa md:text-3xl">
                  {product.name}
                </h2>
                <p className="mt-2 font-display text-2xl text-chocolate">
                  ₹{product.price_inr}
                </p>

                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                  {product.long_description || product.description}
                </p>

                {product.ingredients && (
                  <div className="mt-4">
                    <p className="font-button text-xs uppercase tracking-wider text-olive">
                      Ingredients
                    </p>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {product.ingredients}
                    </p>
                  </div>
                )}

                {/* Stock info */}
                {product.stock > 0 && product.stock <= 10 && (
                  <p className="mt-4 font-button text-xs uppercase tracking-wider text-chocolate">
                    🔥 Only {product.stock} left — order soon!
                  </p>
                )}

                <div className="mt-auto pt-6">
                  {/* Quantity selector */}
                  <div className="flex items-center gap-4">
                    <span className="text-sm font-medium text-cocoa">Quantity</span>
                    <div className="flex items-center gap-2 rounded-full border border-border bg-white px-2 py-1">
                      <button
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="flex h-7 w-7 items-center justify-center rounded-full text-cocoa transition-colors hover:bg-beige"
                        aria-label="Decrease quantity"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="w-8 text-center text-sm font-medium text-cocoa">
                        {quantity}
                      </span>
                      <button
                        onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                        className="flex h-7 w-7 items-center justify-center rounded-full text-cocoa transition-colors hover:bg-beige"
                        aria-label="Increase quantity"
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                  </div>

                  {/* Add to cart */}
                  <button
                    onClick={handleAdd}
                    disabled={product.stock === 0}
                    className="mt-4 flex w-full items-center justify-center gap-2 rounded-full bg-cocoa px-6 py-3.5 font-button text-xs uppercase tracking-widest text-cream shadow-lg transition-all hover:bg-chocolate hover:shadow-xl disabled:opacity-50 disabled:pointer-events-none"
                  >
                    <ShoppingBag size={16} />
                    {product.stock === 0
                      ? "Sold Out"
                      : `Add to Cart · ₹${product.price_inr * quantity}`}
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
