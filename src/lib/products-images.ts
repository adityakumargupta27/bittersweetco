import classicBrownie from "@/assets/product-classic-brownie.jpg";
import chocoChunk from "@/assets/product-choco-chunk.jpg";
import walnutBrownie from "@/assets/product-walnut-brownie.jpg";
import chocoChipCookie from "@/assets/product-choco-chip-cookie.jpg";
import oatsCookie from "@/assets/product-oats-cookie.jpg";
import giftBox from "@/assets/product-gift-box.jpg";

export const PRODUCT_IMAGES: Record<string, string> = {
  "classic-brownie": classicBrownie,
  "choco-chunk-brownie": chocoChunk,
  "walnut-brownie": walnutBrownie,
  "choco-chip-cookie": chocoChipCookie,
  "oats-cookie": oatsCookie,
  "gift-box": giftBox,
};

export function getProductImage(slug: string, fallback?: string): string {
  return PRODUCT_IMAGES[slug] ?? fallback ?? classicBrownie;
}