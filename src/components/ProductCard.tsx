import { motion } from "framer-motion";
import { ShoppingBag } from "lucide-react";
import { useCartStore } from "@/stores/cart";
import { getProductImage } from "@/lib/products-images";
import type { Tables } from "@/integrations/supabase/types";

interface ProductCardProps {
  product: Tables<"products">;
  onSelect: (product: Tables<"products">) => void;
}

export default function ProductCard({ product, onSelect }: ProductCardProps) {
  const addItem = useCartStore((s) => s.addItem);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="group relative overflow-hidden rounded-2xl border border-border bg-white shadow-sm transition-shadow hover:shadow-xl hover:shadow-gold/10 cursor-pointer"
      onClick={() => onSelect(product)}
    >
      {/* Badge */}
      {product.badge && (
        <span className="absolute left-4 top-4 z-10 rounded-full bg-gold px-3 py-1 font-button text-[10px] uppercase tracking-wider text-cocoa shadow-md">
          {product.badge}
        </span>
      )}

      {/* Stock badge */}
      {product.stock <= 10 && product.stock > 0 && (
        <span className="absolute right-4 top-4 z-10 rounded-full bg-cocoa/90 px-3 py-1 font-button text-[10px] uppercase tracking-wider text-cream">
          Only {product.stock} left
        </span>
      )}

      {product.stock === 0 && (
        <span className="absolute right-4 top-4 z-10 rounded-full bg-destructive px-3 py-1 font-button text-[10px] uppercase tracking-wider text-white">
          Sold Out
        </span>
      )}

      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={getProductImage(product.slug, product.image_url)}
          alt={product.name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-cocoa/20 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="font-display text-lg text-cocoa">{product.name}</h3>
        <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
          {product.description}
        </p>
        <div className="mt-4 flex items-center justify-between">
          <span className="font-display text-xl text-chocolate">₹{product.price_inr}</span>
          <button
            onClick={(e) => {
              e.stopPropagation();
              if (product.stock === 0) return;
              addItem({
                id: product.id,
                slug: product.slug,
                name: product.name,
                price: product.price_inr,
                image: product.image_url,
              });
            }}
            disabled={product.stock === 0}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-cocoa text-cream transition-all hover:bg-chocolate hover:scale-110 disabled:opacity-50 disabled:pointer-events-none"
            aria-label={`Add ${product.name} to cart`}
          >
            <ShoppingBag size={16} />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
