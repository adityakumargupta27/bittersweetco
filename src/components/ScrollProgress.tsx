import { motion, useScroll, useSpring } from "framer-motion";

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  return (
    <motion.div
      className="fixed inset-x-0 top-0 z-[100] h-[3px] origin-left"
      style={{
        scaleX,
        background: "linear-gradient(90deg, oklch(0.793 0.072 80), oklch(0.92 0.08 85))",
      }}
    />
  );
}
