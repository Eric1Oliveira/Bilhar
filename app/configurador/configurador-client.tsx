"use client";

import dynamic from "next/dynamic";
import { Suspense, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useConfiguratorStore } from "@/store/configurator";
import { ConfiguratorSidebar } from "@/components/configurador/sidebar";
import { StepIndicator } from "@/components/configurador/step-indicator";
import { Navbar } from "@/components/layout/navbar";
import { RotateCcw, Sparkles, Eye, RefreshCw } from "lucide-react";
import Link from "next/link";
import { formatCurrency } from "@/lib/utils";

const BilliardScene = dynamic(
  () => import("@/components/three/scene").then((m) => m.BilliardScene),
  { ssr: false }
);

/* ── hex maps for 2D preview ── */
const WOOD_HEX: Record<string, string> = {
  natural: "#DEB887", nogueira: "#6B3A2A", mogno: "#8B2500",
  carvalho: "#9C7B4E", ebano: "#2C1810", wenge: "#3D2314",
};
const FELT_HEX: Record<string, string> = {
  verde: "#1a4a2e", azul: "#1B3A6B", vermelho: "#820000",
  cinza: "#4A4A4A", preto: "#1C1C1C", vinho: "#722F37",
};

/* ── Top-down 2D table (mobile preview) ── */
function TablePreview2D() {
  const { feltColor, woodColor } = useConfiguratorStore();
  const feltHex = FELT_HEX[feltColor] ?? "#820000";
  const woodHex = WOOD_HEX[woodColor] ?? "#6B3A2A";

  const pockets = [
    { top: "5%", left: "5%" }, { top: "5%", left: "50%", transform: "translateX(-50%)" }, { top: "5%", right: "5%" },
    { bottom: "5%", left: "5%" }, { bottom: "5%", left: "50%", transform: "translateX(-50%)" }, { bottom: "5%", right: "5%" },
  ];

  return (
    <motion.div
      key={`${feltColor}-${woodColor}`}
      initial={{ opacity: 0.7 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="w-full h-full flex items-center justify-center px-6 py-4"
    >
      <div className="relative w-full max-w-sm" style={{ aspectRatio: "2/1" }}>
        {/* Glow */}
        <div
          className="absolute inset-0 rounded-2xl blur-xl opacity-30 scale-95"
          style={{ background: feltHex }}
        />
        {/* Table */}
        <div
          className="absolute inset-0 rounded-2xl overflow-hidden shadow-2xl"
          style={{ backgroundColor: feltHex }}
        >
          {/* Felt woven texture */}
          <div className="absolute inset-0" style={{
            backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 4px, rgba(0,0,0,0.04) 4px, rgba(0,0,0,0.04) 5px), repeating-linear-gradient(90deg, transparent, transparent 4px, rgba(0,0,0,0.04) 4px, rgba(0,0,0,0.04) 5px)"
          }} />
          {/* Wood rail */}
          <div className="absolute inset-0 rounded-2xl border-[12px]" style={{ borderColor: woodHex, background: "transparent" }} />
          {/* Pockets */}
          {pockets.map((style, i) => (
            <div
              key={i}
              className="absolute w-5 h-5 rounded-full bg-black"
              style={{ ...style, boxShadow: `0 0 0 2px ${woodHex}` }}
            />
          ))}
          {/* Cue ball */}
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-white"
            style={{ boxShadow: "0 0 12px rgba(255,255,255,0.5), 0 2px 4px rgba(0,0,0,0.4)" }}
          />
          {/* Ball rack */}
          {[
            { top: "35%", left: "68%" }, { top: "28%", left: "72%" }, { top: "42%", left: "72%" },
            { top: "22%", left: "76%" }, { top: "35%", left: "76%" }, { top: "49%", left: "76%" },
          ].map((s, i) => (
            <div
              key={i}
              className="absolute w-4 h-4 rounded-full shadow-md"
              style={{ ...s, background: ["#dc2626","#f4d03f","#22c55e","#3b82f6","#a855f7","#f97316"][i] }}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
}

function SceneLoader() {
  return (
    <div className="w-full h-full flex items-center justify-center bg-bilhar-dark">
      <div className="text-center space-y-4">
        <div className="w-12 h-12 rounded-full border-2 border-bilhar-gold/20 border-t-bilhar-gold animate-spin mx-auto" />
        <p className="text-gray-500 text-xs tracking-widest uppercase">Carregando 3D...</p>
      </div>
    </div>
  );
}

export function ConfiguradorPageClient() {
  const { currentStep, setStep, totalPrice, reset } = useConfiguratorStore();
  const [autoRotate, setAutoRotate] = useState(false);

  return (
    <div className="h-[100dvh] bg-bilhar-dark flex flex-col overflow-hidden">
      <Navbar />

      {/* ── Top bar: title + steps + price ── */}
      <div className="pt-16 md:pt-20 flex-shrink-0 bg-bilhar-dark-2 border-b border-bilhar-gold/10">
        <div className="flex items-center justify-between px-4 sm:px-6 py-3 gap-3">
          {/* Left: brand */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <Sparkles className="w-4 h-4 text-bilhar-gold hidden sm:block" />
            <span className="text-xs font-bold tracking-widest uppercase text-bilhar-gold hidden sm:block">
              Configurador 3D
            </span>
          </div>

          {/* Center: step indicator */}
          <div className="flex-1 flex justify-center overflow-x-auto scrollbar-none">
            <StepIndicator currentStep={currentStep} onStepClick={setStep} />
          </div>

          {/* Right: price + AR */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <AnimatePresence mode="wait">
              <motion.span
                key={totalPrice}
                initial={{ y: -8, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="font-display font-bold text-base sm:text-lg gradient-gold"
              >
                {formatCurrency(totalPrice)}
              </motion.span>
            </AnimatePresence>
            <Link
              href="/ar"
              className="hidden sm:flex items-center gap-1.5 text-[0.65rem] font-bold tracking-wider uppercase text-bilhar-gold border border-bilhar-gold/25 rounded-lg px-2.5 py-1.5 hover:bg-bilhar-gold/8 transition-all"
            >
              <Eye className="w-3 h-3" />
              AR
            </Link>
          </div>
        </div>
      </div>

      {/* ── Body ── */}
      <div className="flex-1 min-h-0 flex flex-col lg:flex-row overflow-hidden">

        {/* ── Preview area ── */}
        <div className="relative bg-bilhar-dark flex-shrink-0 h-[220px] sm:h-[260px] lg:h-auto lg:flex-1">

          {/* 3D Canvas (desktop only) */}
          <div className="hidden lg:block absolute inset-0">
            <Suspense fallback={<SceneLoader />}>
              <BilliardScene autoRotate={autoRotate} showControls quality="high" />
            </Suspense>
          </div>

          {/* 2D Preview (mobile/tablet) */}
          <div className="lg:hidden absolute inset-0 bg-bilhar-dark">
            <TablePreview2D />
          </div>

          {/* Viewport controls (desktop) */}
          <div className="hidden lg:flex absolute bottom-4 left-4 gap-2">
            <button
              onClick={() => setAutoRotate(!autoRotate)}
              title="Auto-rotacionar"
              className={`p-2.5 rounded-xl border text-sm transition-all backdrop-blur-sm ${
                autoRotate
                  ? "bg-bilhar-gold/20 border-bilhar-gold/50 text-bilhar-gold"
                  : "bg-bilhar-dark/70 border-bilhar-gold/15 text-gray-500 hover:text-gray-300"
              }`}
            >
              <RotateCcw className="w-4 h-4" />
            </button>
            <button
              onClick={reset}
              title="Reiniciar"
              className="p-2.5 rounded-xl border bg-bilhar-dark/70 border-bilhar-gold/15 text-gray-500 hover:text-gray-300 transition-all backdrop-blur-sm"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>

          {/* Camera hint (desktop) */}
          <div className="hidden lg:block absolute top-4 left-1/2 -translate-x-1/2 pointer-events-none">
            <p className="text-[0.65rem] text-gray-600 tracking-widest uppercase bg-bilhar-dark/60 backdrop-blur-sm px-3 py-1.5 rounded-full border border-white/5">
              Arraste · Scroll para zoom
            </p>
          </div>

          {/* Mobile preview label */}
          <div className="lg:hidden absolute top-2 left-1/2 -translate-x-1/2 pointer-events-none">
            <p className="text-[0.6rem] text-gray-600 tracking-widest uppercase bg-bilhar-dark/80 px-2.5 py-1 rounded-full">
              Preview — atualiza ao vivo
            </p>
          </div>
        </div>

        {/* ── Sidebar ── */}
        <div className="flex-1 lg:flex-none lg:w-96 xl:w-[420px] bg-bilhar-dark-2 border-t lg:border-t-0 lg:border-l border-bilhar-gold/10 flex flex-col min-h-0 overflow-hidden">
          <ConfiguratorSidebar />
        </div>

      </div>
    </div>
  );
}
