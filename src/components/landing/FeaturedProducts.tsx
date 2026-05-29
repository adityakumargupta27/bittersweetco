import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ShoppingBag } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import ScrollReveal from "@/components/ScrollReveal";
import { useCartStore } from "@/stores/cart";
import { getProductImage } from "@/lib/products-images";

interface FeaturedProduct {
  id: string;
  slug: string;
  name: string;
  description: string;
  price_inr: number;
  image_url: string;
  badge: string | null;
  stock: number;
  featured: boolean;
}

interface FeaturedProductsProps {
  products: FeaturedProduct[];
}

export default function FeaturedProducts({ products }: FeaturedProductsProps) {
  const addItem = useCartStore((s) => s.addItem);

  if (products.length === 0) return null;

  return (
    <section className="bg-beige/40 py-20 md:py-32">
      <div className="mx-auto max-w-7xl px-6 md:px-8">
        <SectionHeading title="Fresh Favourites" subtitle="Today's Batch" />

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product, i) => (
            <ScrollReveal key={product.id} delay={i * 0.08}>
              <motion.div
                whileHover={{ y: -8 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="group relative overflow-hidden rounded-2xl border border-border bg-white shadow-sm transition-shadow hover:shadow-xl hover:shadow-gold/10"
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
                    <span className="font-display text-xl text-chocolate">
                      ₹{product.price_inr}
                    </span>
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        addItem({
                          id: product.id,
                          slug: product.slug,
                          name: product.name,
                          price: product.price_inr,
                          image: product.image_url,
                        });
                      }}
                      className="flex h-10 w-10 items-center justify-center rounded-full bg-cocoa text-cream transition-all hover:bg-chocolate hover:scale-110"
                      aria-label={`Add ${product.name} to cart`}
                    >
                      <ShoppingBag size={16} />
                    </button>
                  </div>
                </div>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            to="/menu"
            className="inline-flex items-center gap-2 rounded-full border-2 border-cocoa px-8 py-3.5 font-button text-xs uppercase tracking-widest text-cocoa transition-all hover:bg-cocoa hover:text-cream"
          >
            View Full Menu
            <span aria-hidden>→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
