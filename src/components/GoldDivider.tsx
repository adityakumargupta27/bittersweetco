import { cn } from "@/lib/utils";

interface GoldDividerProps {
  className?: string;
  ornament?: boolean;
}

export default function GoldDivider({ className, ornament = true }: GoldDividerProps) {
  return (
    <div className={cn("flex items-center justify-center gap-3", className)}>
      <span className="h-px flex-1 bg-gradient-to-r from-transparent via-gold/60 to-gold/30" />
      {ornament && (
        <span className="flex h-2 w-2 rotate-45 border border-gold/60 bg-gold/20" />
      )}
      <span className="h-px flex-1 bg-gradient-to-l from-transparent via-gold/60 to-gold/30" />
    </div>
  );
}
