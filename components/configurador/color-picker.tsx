"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface ColorOption {
  value: string;
  label: string;
  hex: string;
  priceModifier?: number;
}

interface ColorPickerProps {
  options: ColorOption[];
  selected: string;
  onSelect: (value: string) => void;
  felt?: boolean;
}

export function ColorPicker({ options, selected, onSelect, felt }: ColorPickerProps) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
      {options.map((option) => {
        const isSelected = selected === option.value;
        return (
          <motion.button
            key={option.value}
            whileTap={{ scale: 0.96 }}
            onClick={() => onSelect(option.value)}
            className={cn(
              "relative flex flex-col items-center gap-2.5 p-3.5 rounded-2xl border-2 transition-all duration-200 text-left group",
              isSelected
                ? "border-bilhar-green bg-bilhar-green/8 shadow-[0_0_16px_rgba(26,122,82,0.15)]"
                : "border-bilhar-green/10 hover:border-bilhar-green/30 bg-bilhar-dark/50 hover:bg-bilhar-dark/70"
            )}
          >
            {/* Swatch */}
            <div
              className="w-full aspect-[3/2] rounded-xl shadow-md relative overflow-hidden"
              style={{ backgroundColor: option.hex }}
            >
              {/* Felt texture */}
              {felt && (
                <div className="absolute inset-0" style={{
                  backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.05) 3px, rgba(0,0,0,0.05) 4px), repeating-linear-gradient(90deg, transparent, transparent 3px, rgba(0,0,0,0.05) 3px, rgba(0,0,0,0.05) 4px)"
                }} />
              )}
              {/* Selected overlay */}
              {isSelected && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="absolute inset-0 flex items-center justify-center bg-black/25"
                >
                  <div className="w-6 h-6 rounded-full bg-bilhar-green flex items-center justify-center shadow-lg">
                    <Check className="w-3.5 h-3.5 text-white" strokeWidth={3} />
                  </div>
                </motion.div>
              )}
            </div>

            {/* Label */}
            <div className="w-full">
              <p className={cn(
                "text-xs font-semibold leading-tight transition-colors",
                isSelected ? "text-white" : "text-gray-400 group-hover:text-gray-200"
              )}>
                {option.label}
              </p>
              {option.priceModifier !== undefined && option.priceModifier > 0 && (
                <p className={cn(
                  "text-[0.6rem] mt-0.5 font-medium transition-colors",
                  isSelected ? "text-bilhar-green-bright" : "text-gray-600"
                )}>
                  +R$ {option.priceModifier}
                </p>
              )}
            </div>
          </motion.button>
        );
      })}
    </div>
  );
}
