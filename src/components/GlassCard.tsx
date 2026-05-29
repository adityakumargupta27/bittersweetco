import { type ReactNode } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}

export default function GlassCard({ children, className, hover = true }: GlassCardProps) {
  return (
    <motion.div
      whileHover={
        hover
          ? {
              y: -6,
              boxShadow: "0 20px 60px -15px oklch(0.793 0.072 80 / 0.4)",
              transition: { type: "spring", stiffness: 300, damping: 20 },
            }
          : undefined
      }
      className={cn("glass-card rounded-2xl p-6", className)}
    >
      {children}
    </motion.div>
  );
}
