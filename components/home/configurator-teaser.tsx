"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Sparkles, Package, Settings, Check } from "lucide-react";

const STEPS = [
  { Icon: Package,  num: 1, label: "Escolha o Modelo",    desc: "9 ou 12 palmos, snooker ou americana"    },
  { Icon: Settings, num: 2, label: "Madeira & Pernas",    desc: "Nogueira, mogno, carvalho e muito mais"  },
  { Icon: Sparkles, num: 3, label: "Feltro & Acessórios", desc: "Cores e texturas importadas premium"     },
  { Icon: Check,    num: 4, label: "Finalizar Pedido",    desc: "Entrega e montagem profissional incluídas" },
];

const FELT_SWATCHES = [
  { name: "Verde",   hex: "#156845" },
  { name: "Vinho",   hex: "#722F37" },
  { name: "Preto",   hex: "#1C1C1C" },
  { name: "Azul",    hex: "#1B3A6B" },
  { name: "Cinza",   hex: "#4a4a5a" },
  { name: "Carmim",  hex: "#820000" },
];

const WOOD_SWATCHES = [
  { name: "Nogueira", hex: "#5C3318" },
  { name: "Mogno",    hex: "#7A2800" },
  { name: "Carvalho", hex: "#8C6A3A" },
  { name: "Natural",  hex: "#C8A878" },
  { name: "Ébano",    hex: "#1A1008" },
  { name: "Wengê",    hex: "#3D2314" },
];

const LEG_SWATCHES = [
  { name: "Torneada", hex: "#5C3318" },
  { name: "Quadrada", hex: "#2C1810" },
  { name: "Cônica",   hex: "#8C6A3A" },
  { name: "Moderna",  hex: "#1a1a2a" },
];

const PRICE_MAP: Record<string, number> = {
  "0-0-0": 7500, "0-1-0": 8200, "0-2-0": 7800, "0-3-0": 6500,
  "1-0-0": 8100, "1-1-0": 9000, "2-0-0": 7200, "3-0-0": 6900,
};
function getPrice(fi: number, wi: number, li: number) {
  return PRICE_MAP[`${fi}-${wi}-${li}`] ?? 7500 + fi * 200 + wi * 300 + li * 100;
}

export function ConfiguratorTeaser() {
  const [feltIdx, setFeltIdx] = useState(0);
  const [woodIdx, setWoodIdx] = useState(0);
  const [legIdx,  setLegIdx]  = useState(0);

  const price    = getPrice(feltIdx, woodIdx, legIdx);
  const monthly  = Math.round(price / 12);
  const feltColor = FELT_SWATCHES[feltIdx].hex;
  const woodColor = WOOD_SWATCHES[woodIdx].hex;

  const SWATCH_ACTIVE_BORDER = "rgba(47,212,138,0.8)";
  const SWATCH_ACTIVE_GLOW   = "rgba(47,212,138,0.3)";
  const CARD_STYLE = { background: "linear-gradient(160deg, #14141E 0%, #0E0E1A 100%)", border: "1px solid rgba(47,212,138,0.14)", borderTopColor: "rgba(47,212,138,0.38)", borderRadius: 16, padding: "20px" };

  return (
    <section className="relative overflow-hidden" style={{ padding: "96px 0", background: "#09090F" }}>
      <div className="absolute inset-x-0 top-0 h-px gold-rule" />

      {/* Glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute rounded-full" style={{ top: "50%", left: "-5%", transform: "translateY(-50%)", width: "40vw", height: "40vw", maxWidth: 500, maxHeight: 500, background: "radial-gradient(circle, rgba(26,122,82,0.07) 0%, transparent 70%)", filter: "blur(80px)" }} />
        <div className="absolute rounded-full" style={{ bottom: 0, right: "-5%", width: "30vw", height: "30vw", maxWidth: 400, maxHeight: 400, background: "radial-gradient(circle, rgba(201,150,58,0.05) 0%, transparent 70%)", filter: "blur(70px)" }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-[1fr_1fr] gap-12 lg:gap-20 items-start">

          {/* Left: Copy + steps */}
          <motion.div initial={{ opacity: 0, x: -28 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.65 }}>
            <span className="section-label mb-3">Configurador 3D</span>
            <span className="gold-rule-short mb-6" style={{ display: "block" }} />
            <h2 className="section-title mb-5">Monte a mesa dos <br /><span className="gradient-emerald">seus sonhos</span></h2>
            <p className="text-gray-400 leading-relaxed mb-10" style={{ fontSize: "clamp(0.95rem, 2vw, 1.1rem)", maxWidth: 480 }}>
              Nosso configurador 3D permite ver cada detalhe antes de finalizar. Centenas de combinações, resultado instantâneo.
            </p>

            <div className="space-y-5 mb-10">
              {STEPS.map((step, i) => (
                <motion.div key={step.label}
                  initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.09, duration: 0.45 }}
                  className="flex items-start gap-4"
                  style={{ paddingLeft: 16, borderLeft: "2px solid rgba(47,212,138,0.25)" }}>
                  <div className="flex items-center justify-center rounded-lg flex-shrink-0 font-display font-bold"
                    style={{ width: 36, height: 36, background: "rgba(47,212,138,0.08)", border: "1px solid rgba(47,212,138,0.2)", color: "#2FD48A", fontSize: "0.9rem" }}>
                    {step.num}
                  </div>
                  <div>
                    <span className="font-semibold text-white" style={{ fontSize: "0.9rem" }}>{step.label}</span>
                    <span className="text-gray-500 ml-2" style={{ fontSize: "0.8rem" }}>— {step.desc}</span>
                  </div>
                </motion.div>
              ))}
            </div>

            <Link href="/configurador" className="btn-gold rounded-xl gap-2.5 group w-full sm:w-auto justify-center sm:justify-start inline-flex"
              style={{ padding: "16px 32px", fontSize: "0.9rem" }}>
              <Sparkles className="w-4 h-4 flex-shrink-0" />
              Iniciar Configuração
              <ArrowRight className="w-4 h-4 flex-shrink-0 group-hover:translate-x-1 transition-transform duration-200" />
            </Link>
          </motion.div>

          {/* Right: Interactive preview */}
          <motion.div initial={{ opacity: 0, x: 28 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.65 }}
            className="space-y-4">
            {/* Live table preview */}
            <div style={CARD_STYLE}>
              <div className="flex items-center justify-between mb-4">
                <span style={{ fontSize: "0.58rem", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(47,212,138,0.65)" }}>Prévia ao Vivo</span>
                <span className="flex items-center gap-1.5" style={{ fontSize: "0.62rem", color: "rgba(74,222,128,0.85)" }}>
                  <span className="rounded-full animate-pulse" style={{ width: 5, height: 5, background: "rgba(74,222,128,0.85)" }} />
                  Interativo
                </span>
              </div>
              <div className="relative w-full overflow-hidden rounded-xl" style={{ aspectRatio: "16/8" }}>
                <div className="absolute inset-0"
                  style={{ backgroundColor: feltColor, backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 5px, rgba(0,0,0,0.05) 5px, rgba(0,0,0,0.05) 6px), repeating-linear-gradient(90deg, transparent, transparent 5px, rgba(0,0,0,0.05) 5px, rgba(0,0,0,0.05) 6px)", transition: "background-color 0.35s ease", boxShadow: "inset 0 0 50px rgba(0,0,0,0.55)" }} />
                <div className="absolute inset-0 rounded-xl" style={{ border: `10px solid ${woodColor}`, background: "transparent", transition: "border-color 0.35s ease" }} />
                {[{ top: "5%", left: "3%" }, { top: "5%", right: "3%" }, { bottom: "5%", left: "3%" }, { bottom: "5%", right: "3%" }].map((s, i) => (
                  <div key={i} className="absolute rounded-full" style={{ ...s, width: 15, height: 15, background: "#020202", border: "2px solid rgba(92,51,24,0.65)" }} />
                ))}
                <div className="absolute rounded-full" style={{ top: "50%", left: "1.5%", transform: "translateY(-50%)", width: 13, height: 13, background: "#020202", border: "2px solid rgba(92,51,24,0.65)" }} />
                <div className="absolute rounded-full" style={{ top: "50%", right: "1.5%", transform: "translateY(-50%)", width: 13, height: 13, background: "#020202", border: "2px solid rgba(92,51,24,0.65)" }} />
                <div className="absolute rounded-full" style={{ top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 17, height: 17, background: "radial-gradient(circle at 35% 30%, #fff, #d8d8d8)", boxShadow: "0 0 10px rgba(255,255,255,0.5)" }} />
              </div>
            </div>

            {/* Feltro swatches */}
            <div style={CARD_STYLE}>
              <h3 className="font-semibold text-white mb-4" style={{ fontSize: "0.82rem" }}>Feltro</h3>
              <div className="grid grid-cols-6 gap-2.5">
                {FELT_SWATCHES.map((s, i) => (
                  <button key={s.name} onClick={() => setFeltIdx(i)} className="group flex flex-col items-center gap-1.5" aria-label={`Feltro ${s.name}`} style={{ minHeight: 48 }}>
                    <div className="w-full rounded-lg transition-all duration-200" style={{ aspectRatio: "1", background: s.hex, border: feltIdx === i ? `2px solid ${SWATCH_ACTIVE_BORDER}` : "2px solid transparent", boxShadow: feltIdx === i ? `0 0 12px ${SWATCH_ACTIVE_GLOW}` : "none", transform: feltIdx === i ? "scale(1.08)" : "scale(1)" }} />
                    <span style={{ fontSize: "0.53rem", color: feltIdx === i ? "#2FD48A" : "rgba(107,114,128,1)", textAlign: "center", lineHeight: 1.2, transition: "color 0.2s" }}>{s.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Madeira swatches */}
            <div style={CARD_STYLE}>
              <h3 className="font-semibold text-white mb-4" style={{ fontSize: "0.82rem" }}>Madeira</h3>
              <div className="grid grid-cols-6 gap-2.5">
                {WOOD_SWATCHES.map((s, i) => (
                  <button key={s.name} onClick={() => setWoodIdx(i)} className="flex flex-col items-center gap-1.5" aria-label={`Madeira ${s.name}`} style={{ minHeight: 48 }}>
                    <div className="w-full rounded-lg transition-all duration-200" style={{ aspectRatio: "1", background: s.hex, border: woodIdx === i ? `2px solid ${SWATCH_ACTIVE_BORDER}` : "2px solid transparent", boxShadow: woodIdx === i ? `0 0 12px ${SWATCH_ACTIVE_GLOW}` : "none", transform: woodIdx === i ? "scale(1.08)" : "scale(1)" }} />
                    <span style={{ fontSize: "0.53rem", color: woodIdx === i ? "#2FD48A" : "rgba(107,114,128,1)", textAlign: "center", lineHeight: 1.2, transition: "color 0.2s" }}>{s.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Pernas swatches */}
            <div style={CARD_STYLE}>
              <h3 className="font-semibold text-white mb-4" style={{ fontSize: "0.82rem" }}>Pernas</h3>
              <div className="grid grid-cols-4 gap-2.5">
                {LEG_SWATCHES.map((s, i) => (
                  <button key={s.name} onClick={() => setLegIdx(i)} className="flex flex-col items-center gap-1.5" aria-label={`Perna ${s.name}`} style={{ minHeight: 48 }}>
                    <div className="w-full rounded-lg transition-all duration-200" style={{ aspectRatio: "1", background: s.hex, border: legIdx === i ? `2px solid ${SWATCH_ACTIVE_BORDER}` : "2px solid transparent", boxShadow: legIdx === i ? `0 0 12px ${SWATCH_ACTIVE_GLOW}` : "none", transform: legIdx === i ? "scale(1.08)" : "scale(1)" }} />
                    <span style={{ fontSize: "0.56rem", color: legIdx === i ? "#2FD48A" : "rgba(107,114,128,1)", textAlign: "center", lineHeight: 1.2, transition: "color 0.2s" }}>{s.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Price estimate */}
            <motion.div key={price} initial={{ scale: 0.97, opacity: 0.8 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.25 }}
              style={{ ...CARD_STYLE, border: "1px solid rgba(47,212,138,0.28)", borderTopColor: "rgba(47,212,138,0.6)" }}>
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-gray-500 mb-1" style={{ fontSize: "0.68rem" }}>Estimativa de preço</p>
                  <p className="font-display font-bold gradient-gold leading-none" style={{ fontSize: "2rem" }}>
                    R$&nbsp;{price.toLocaleString("pt-BR")}
                  </p>
                  <p className="text-gray-600 mt-1.5" style={{ fontSize: "0.68rem" }}>
                    ou <span style={{ color: "#2FD48A", fontWeight: 600 }}>R$&nbsp;{monthly.toLocaleString("pt-BR")}/mês</span> no aluguel
                  </p>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="font-bold tracking-wide uppercase mb-2" style={{ fontSize: "0.58rem", color: "#2FD48A" }}>Inclui</p>
                  <p className="text-gray-400" style={{ fontSize: "0.7rem" }}>Entrega + Montagem</p>
                  <p className="text-gray-400" style={{ fontSize: "0.7rem" }}>Garantia 5 anos</p>
                </div>
              </div>
              <Link href="/configurador" className="btn-gold w-full justify-center rounded-xl gap-2 mt-4 inline-flex"
                style={{ padding: "14px 24px", fontSize: "0.875rem" }}>
                <Sparkles className="w-4 h-4" />
                Iniciar Configuração
              </Link>
            </motion.div>
          </motion.div>

        </div>
      </div>

      <div className="absolute inset-x-0 bottom-0 h-px gold-rule" />
    </section>
  );
}
