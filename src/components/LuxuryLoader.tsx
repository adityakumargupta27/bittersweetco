import { motion } from "framer-motion";

export default function LuxuryLoader() {
  return (
    <div className="fixed inset-0 z-[9998] flex flex-col items-center justify-center bg-cocoa">
      {/* Logo */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="relative flex h-20 w-20 items-center justify-center"
      >
        <div className="absolute inset-0 rounded-full animate-pulse-glow" />
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-gold to-gold-soft">
          <span className="font-display text-2xl font-bold text-cocoa">B</span>
        </div>
      </motion.div>

      {/* Brand name */}
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="mt-6 font-display text-lg tracking-wider text-cream"
      >
        The Bittersweet Co.
      </motion.p>

      {/* Loading bar */}
      <motion.div className="mt-8 h-[2px] w-32 overflow-hidden rounded-full bg-cream/10">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-gold to-gold-soft"
          initial={{ x: "-100%" }}
          animate={{ x: "100%" }}
          transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>
    </div>
  );
}
