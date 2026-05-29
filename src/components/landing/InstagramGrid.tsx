import { Instagram } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import ScrollReveal from "@/components/ScrollReveal";

import classicBrownie from "@/assets/product-classic-brownie.jpg";
import chocoChunk from "@/assets/product-choco-chunk.jpg";
import walnutBrownie from "@/assets/product-walnut-brownie.jpg";
import chocoChipCookie from "@/assets/product-choco-chip-cookie.jpg";
import oatsCookie from "@/assets/product-oats-cookie.jpg";
import giftBox from "@/assets/product-gift-box.jpg";

const images = [
  { src: classicBrownie, alt: "Classic fudge brownie" },
  { src: chocoChunk, alt: "Choco chunk brownie" },
  { src: walnutBrownie, alt: "Walnut brownie" },
  { src: chocoChipCookie, alt: "Choco chip cookie" },
  { src: oatsCookie, alt: "Oats cookie" },
  { src: giftBox, alt: "Gift box" },
];

export default function InstagramGrid() {
  return (
    <section className="bg-cream py-20 md:py-32">
      <div className="mx-auto max-w-7xl px-6 md:px-8">
        <SectionHeading title="Follow the Crumbs" subtitle="@thebittersweetco" />

        <div className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-3 md:gap-4">
          {images.map((img, i) => (
            <ScrollReveal key={img.alt} delay={i * 0.06}>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative block aspect-square overflow-hidden rounded-xl"
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-cocoa/0 transition-colors duration-300 group-hover:bg-cocoa/50">
                  <Instagram
                    size={28}
                    className="text-cream opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:scale-100 scale-75"
                  />
                </div>
              </a>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
