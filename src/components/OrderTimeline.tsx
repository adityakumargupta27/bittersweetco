import { Clock, ChefHat, Flame, Truck, CheckCircle2, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Enums } from "@/integrations/supabase/types";

type OrderStatus = Enums<"order_status">;

const STATUS_CONFIG: Record<OrderStatus, { icon: typeof Clock; label: string; color: string }> = {
  pending: { icon: Clock, label: "Order Placed", color: "text-gold" },
  preparing: { icon: ChefHat, label: "Preparing", color: "text-olive" },
  baking: { icon: Flame, label: "Baking", color: "text-chocolate" },
  out_for_delivery: { icon: Truck, label: "Out for Delivery", color: "text-gold" },
  delivered: { icon: CheckCircle2, label: "Delivered", color: "text-olive" },
  cancelled: { icon: XCircle, label: "Cancelled", color: "text-destructive" },
};

const STATUS_ORDER: OrderStatus[] = [
  "pending",
  "preparing",
  "baking",
  "out_for_delivery",
  "delivered",
];

interface OrderTimelineProps {
  currentStatus: OrderStatus;
}

export default function OrderTimeline({ currentStatus }: OrderTimelineProps) {
  if (currentStatus === "cancelled") {
    const config = STATUS_CONFIG.cancelled;
    return (
      <div className="flex items-center gap-3 rounded-xl bg-destructive/10 px-4 py-3">
        <config.icon size={20} className="text-destructive" />
        <span className="font-display text-sm text-destructive">{config.label}</span>
      </div>
    );
  }

  const currentIdx = STATUS_ORDER.indexOf(currentStatus);

  return (
    <div className="space-y-0">
      {STATUS_ORDER.map((status, i) => {
        const config = STATUS_CONFIG[status];
        const isCompleted = i <= currentIdx;
        const isCurrent = i === currentIdx;

        return (
          <div key={status} className="flex gap-4">
            {/* Vertical line + icon */}
            <div className="flex flex-col items-center">
              <div
                className={cn(
                  "flex h-9 w-9 items-center justify-center rounded-full transition-all",
                  isCompleted ? "bg-gold/20" : "bg-beige",
                  isCurrent && "ring-2 ring-gold ring-offset-2 ring-offset-cream",
                )}
              >
                <config.icon
                  size={16}
                  className={cn(isCompleted ? config.color : "text-muted-foreground")}
                />
              </div>
              {i < STATUS_ORDER.length - 1 && (
                <div
                  className={cn(
                    "w-px flex-1 min-h-[24px]",
                    i < currentIdx ? "bg-gold" : "bg-border",
                  )}
                />
              )}
            </div>

            {/* Label */}
            <div className="pb-6">
              <p
                className={cn(
                  "pt-1.5 font-display text-sm",
                  isCompleted ? "text-cocoa" : "text-muted-foreground",
                  isCurrent && "font-semibold",
                )}
              >
                {config.label}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
