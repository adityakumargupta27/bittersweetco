import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { AnimatePresence } from "framer-motion";
import { getActiveProducts } from "@/lib/api/products.server";
import SectionHeading from "@/components/SectionHeading";
import ProductCard from "@/components/ProductCard";
import ProductModal from "@/components/ProductModal";
import type { Tables } from "@/integrations/supabase/types";

const CATEGORIES = [
  { value: "all", label: "All" },
  { value: "brownies", label: "Brownies" },
  { value: "cookies", label: "Cookies" },
  { value: "gift-boxes", label: "Gift Boxes" },
] as const;

export const Route = createFileRoute("/menu")({
  head: () => ({
    meta: [
      { title: "Menu — The Bittersweet Co." },
      {
        name: "description",
        content:
          "Browse our handcrafted brownies, cookies, and gift boxes. Made fresh daily with Belgian cocoa and premium ingredients.",
      },
      { property: "og:title", content: "Menu — The Bittersweet Co." },
      {
        property: "og:description",
        content: "Handcrafted brownies, cookies, and gift boxes. Baked fresh daily.",
      },
    ],
  }),
  loader: async () => {
    const products = await getActiveProducts().catch(() => [] as Awaited<ReturnType<typeof getActiveProducts>>);
    return { products };
  },
  component: MenuPage,
});

function MenuPage() {
  const { products } = Route.useLoaderData();
  const [category, setCategory] = useState("all");
  const [selectedProduct, setSelectedProduct] = useState<Tables<"products"> | null>(null);

  const filtered =
    category === "all"
      ? products
      : products.filter((p) => p.category === category);

  return (
    <main className="min-h-screen bg-background pt-28 pb-20">
      <div className="mx-auto max-w-7xl px-6 md:px-8">
        <SectionHeading title="Our Menu" subtitle="Browse & Order" />

        {/* Category filter */}
        <div className="mt-8 flex flex-wrap justify-center gap-2">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setCategory(cat.value)}
              className={`rounded-full px-5 py-2.5 font-button text-xs uppercase tracking-widest transition-all ${
                category === cat.value
                  ? "bg-cocoa text-cream shadow-lg"
                  : "bg-beige/60 text-cocoa hover:bg-beige"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Products grid */}
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filtered.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onSelect={setSelectedProduct}
              />
            ))}
          </AnimatePresence>
        </div>

        {filtered.length === 0 && (
          <div className="py-20 text-center">
            <p className="font-display text-xl text-cocoa/60">
              No products in this category yet.
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              Check back soon — we're always baking something new!
            </p>
          </div>
        )}
      </div>

      {/* Product modal */}
      <ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />
    </main>
  );
}
