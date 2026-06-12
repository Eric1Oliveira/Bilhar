"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

const STEPS = [
  { id: 0, label: "Modelo" },
  { id: 1, label: "Madeira" },
  { id: 2, label: "Feltro" },
  { id: 3, label: "Pernas" },
  { id: 4, label: "Extras" },
  { id: 5, label: "Medidas" },
];

interface StepIndicatorProps {
  currentStep: number;
  onStepClick: (step: number) => void;
}

export function StepIndicator({ currentStep, onStepClick }: StepIndicatorProps) {
  const total = STEPS.length;
  const progressPct = (currentStep / (total - 1)) * 100;

  return (
    <>
      {/* ── Mobile: progress bar + label ── */}
      <div className="sm:hidden flex items-center gap-3 w-full max-w-xs">
        <div className="flex-1 h-1.5 bg-bilhar-dark rounded-full overflow-hidden">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-bilhar-green to-bilhar-green-bright"
            initial={false}
            animate={{ width: `${progressPct}%` }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
          />
        </div>
        <span className="text-[0.65rem] font-bold text-bilhar-green-bright whitespace-nowrap flex-shrink-0">
          {currentStep + 1} / {total}
        </span>
      </div>

      {/* ── Desktop: circles + labels ── */}
      <div className="hidden sm:flex items-center">
        {STEPS.map((step, index) => {
          const done = step.id < currentStep;
          const active = step.id === currentStep;

          return (
            <div key={step.id} className="flex items-center">
              <button
                onClick={() => onStepClick(step.id)}
                className="flex flex-col items-center gap-1.5 group focus:outline-none"
              >
                <motion.div
                  animate={{ scale: active ? 1.12 : 1 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className={cn(
                    "w-7 h-7 rounded-full flex items-center justify-center text-[0.6rem] font-bold border-2 transition-all duration-200",
                    done
                      ? "bg-bilhar-green border-bilhar-green text-white"
                      : active
                      ? "bg-bilhar-green border-bilhar-green text-white shadow-[0_0_12px_rgba(26,122,82,0.4)]"
                      : "bg-transparent border-bilhar-green/20 text-gray-600 group-hover:border-bilhar-green/40"
                  )}
                >
                  {done ? <Check className="w-3 h-3" strokeWidth={3} /> : step.id + 1}
                </motion.div>
                <span className={cn(
                  "text-[0.6rem] font-semibold tracking-wide transition-colors whitespace-nowrap",
                  active ? "text-bilhar-green-bright" : done ? "text-bilhar-green-bright" : "text-gray-600"
                )}>
                  {step.label}
                </span>
              </button>

              {index < STEPS.length - 1 && (
                <div className="w-7 lg:w-10 h-px mx-1 mb-[18px] overflow-hidden rounded-full bg-bilhar-green/10">
                  <motion.div
                    className="h-full bg-bilhar-green"
                    initial={false}
                    animate={{ width: done ? "100%" : "0%" }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </>
  );
}
