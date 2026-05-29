import ScrollReveal from "./ScrollReveal";
import GoldDivider from "./GoldDivider";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  align?: "center" | "left";
  className?: string;
  light?: boolean;
}

export default function SectionHeading({
  title,
  subtitle,
  align = "center",
  className,
  light = false,
}: SectionHeadingProps) {
  return (
    <ScrollReveal className={cn("mb-12 md:mb-16", align === "center" && "text-center", className)}>
      {subtitle && (
        <p
          className={cn(
            "mb-3 font-button text-xs uppercase tracking-[0.3em]",
            light ? "text-gold" : "text-olive",
          )}
        >
          {subtitle}
        </p>
      )}
      <h2
        className={cn(
          "font-display text-3xl md:text-4xl lg:text-5xl",
          light ? "text-cream" : "text-cocoa",
        )}
      >
        {title}
      </h2>
      <GoldDivider className="mx-auto mt-6 max-w-[200px]" />
    </ScrollReveal>
  );
}
