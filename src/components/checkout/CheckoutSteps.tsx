import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

interface CheckoutStepsProps {
  currentStep: number;
  steps: string[];
}

export default function CheckoutSteps({ currentStep, steps }: CheckoutStepsProps) {
  return (
    <div className="flex items-center justify-center gap-0">
      {steps.map((label, i) => {
        const isCompleted = i < currentStep;
        const isCurrent = i === currentStep;

        return (
          <div key={label} className="flex items-center">
            <div className="flex flex-col items-center gap-2">
              <div
                className={cn(
                  "flex h-10 w-10 items-center justify-center rounded-full text-sm font-medium transition-all",
                  isCompleted && "bg-gold text-cocoa",
                  isCurrent && "bg-cocoa text-cream shadow-lg animate-pulse-glow",
                  !isCompleted && !isCurrent && "bg-beige text-muted-foreground",
                )}
              >
                {isCompleted ? <Check size={18} /> : i + 1}
              </div>
              <span
                className={cn(
                  "font-button text-[10px] uppercase tracking-wider",
                  isCurrent ? "text-cocoa" : "text-muted-foreground",
                )}
              >
                {label}
              </span>
            </div>
            {i < steps.length - 1 && (
              <div
                className={cn(
                  "mx-3 h-px w-12 transition-colors md:w-20",
                  i < currentStep ? "bg-gold" : "bg-border",
                )}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
