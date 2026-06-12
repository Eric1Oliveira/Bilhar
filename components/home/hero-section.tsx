"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Sparkles, Eye } from "lucide-react";

const STATS = [
  { value: "500+",  label: "Mesas Entregues" },
  { value: "4.9★",  label: "Google Rating"   },
  { value: "5 anos", label: "de Garantia"     },
  { value: "12+",    label: "Estados"          },
];

/* Billiard balls for table art */
const BALLS = [
  { top: "26%", left: "60%", color: "#dc2626" },
  { top: "20%", left: "66%", color: "#f4d03f" },
  { top: "34%", left: "63%", color: "#1A7A52" },
  { top: "16%", left: "72%", color: "#3b82f6" },
  { top: "30%", left: "72%", color: "#a855f7" },
  { top: "44%", left: "66%", color: "#f97316" },
  { top: "38%", left: "75%", color: "#ef4444" },
];

export function HeroSection() {
  return (
    <section
      className="relative overflow-hidden"
      style={{ background: "#09090F", minHeight: "100dvh", display: "flex", flexDirection: "column", justifyContent: "center" }}
    >
      {/* ── Background ── */}
      <div className="absolute inset-0 pointer-events-none select-none">
        {/* Emerald glow — top left */}
        <div className="absolute rounded-full" style={{ top: "-20%", left: "-10%", width: "65vw", height: "65vw", maxWidth: 880, maxHeight: 880, background: "radial-gradient(circle, rgba(26,122,82,0.14) 0%, transparent 65%)", filter: "blur(90px)" }} />
        {/* Amber glow — bottom right */}
        <div className="absolute rounded-full" style={{ bottom: "-18%", right: "-8%", width: "52vw", height: "52vw", maxWidth: 680, maxHeight: 680, background: "radial-gradient(circle, rgba(201,150,58,0.08) 0%, transparent 65%)", filter: "blur(100px)" }} />
        {/* Subtle dot grid */}
        <div className="absolute inset-0" style={{ backgroundImage: "radial-gradient(rgba(47,212,138,0.07) 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
        {/* Vignette */}
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 80% 80% at 50% 50%, transparent 35%, rgba(9,9,15,0.85) 100%)" }} />
      </div>

      {/* ── Content ── */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        style={{ paddingTop: "clamp(128px, 18vh, 200px)", paddingBottom: "clamp(64px, 8vh, 96px)" }}>
        <div className="grid lg:grid-cols-[1.05fr_0.95fr] gap-12 lg:gap-16 items-center">

          {/* ── Left: Copy ── */}
          <div className="text-center lg:text-left">

            {/* Pill */}
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08, duration: 0.55 }}
              className="luxury-pill mb-8 mx-auto lg:mx-0 w-fit">
              <span className="diamond" />
              Configurador 3D · Único no Brasil
              <span className="diamond" />
            </motion.div>

            {/* Headline */}
            <motion.h1 initial={{ opacity: 0, y: 36 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.18, duration: 0.7 }}
              className="font-display font-bold tracking-tight mb-5"
              style={{ fontSize: "clamp(3rem, 9vw, 7rem)", lineHeight: 0.96, letterSpacing: "-0.03em" }}>
              <span className="text-white block">Configure.</span>
              <span className="text-white block">Visualize.</span>
              <span className="gradient-emerald text-shadow-emerald block" style={{ fontSize: "0.88em" }}>Receba.</span>
            </motion.h1>

            {/* Emerald rule */}
            <motion.span initial={{ scaleX: 0, opacity: 0 }} animate={{ scaleX: 1, opacity: 1 }}
              transition={{ delay: 0.36, duration: 0.5, ease: "easeOut" }}
              className="gold-rule-short mb-8 origin-left"
              style={{ display: "block", margin: "0 auto 32px" }} />

            {/* Subheadline */}
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.32, duration: 0.55 }}
              className="text-gray-400 leading-relaxed mb-10 max-w-lg mx-auto lg:mx-0"
              style={{ fontSize: "clamp(1rem, 2.2vw, 1.18rem)" }}>
              Mesa de bilhar artesanal, personalizada do zero. Feltros importados, madeiras nobres,
              ardósia tripla.{" "}
              <span style={{ color: "rgba(47,212,138,0.85)" }}>Entregamos montada</span>{" "}
              em qualquer estado do Brasil.
            </motion.p>

            {/* CTAs */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.42, duration: 0.55 }}
              className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start mb-8">
              <Link href="/configurador" className="btn-gold rounded-xl gap-2.5 justify-center w-full sm:w-auto"
                style={{ padding: "16px 32px", fontSize: "0.9rem" }}>
                <Sparkles className="w-4 h-4 flex-shrink-0" />
                Configurar Minha Mesa
                <ArrowRight className="w-4 h-4 flex-shrink-0" />
              </Link>
              <Link href="/catalogo" className="btn-outline-gold rounded-xl gap-2.5 justify-center w-full sm:w-auto"
                style={{ padding: "16px 32px", fontSize: "0.9rem" }}>
                <Eye className="w-4 h-4 flex-shrink-0" />
                Ver Catálogo
              </Link>
            </motion.div>

            {/* Micro trust */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.52, duration: 0.5 }}
              className="flex flex-wrap gap-x-5 gap-y-2 justify-center lg:justify-start mb-10">
              {["Grátis para configurar", "Frete grátis capitais", "Montagem incluída"].map((t) => (
                <span key={t} className="flex items-center gap-1.5 text-gray-500" style={{ fontSize: "0.78rem" }}>
                  <span className="rounded-full flex-shrink-0" style={{ width: 5, height: 5, background: "rgba(47,212,138,0.6)" }} />
                  {t}
                </span>
              ))}
            </motion.div>

            {/* Stats */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.62, duration: 0.5 }}
              className="grid grid-cols-4 gap-0 max-w-sm mx-auto lg:mx-0"
              style={{ borderTop: "1px solid rgba(47,212,138,0.14)", paddingTop: 20 }}>
              {STATS.map((s, i) => (
                <div key={s.label} className="text-center lg:text-left"
                  style={{ paddingLeft: i > 0 ? "0.65rem" : 0, borderLeft: i > 0 ? "1px solid rgba(47,212,138,0.14)" : "none", paddingRight: i < 3 ? "0.65rem" : 0 }}>
                  <div className="font-display font-bold gradient-gold" style={{ fontSize: "clamp(1rem, 2.2vw, 1.4rem)", lineHeight: 1 }}>{s.value}</div>
                  <div className="text-gray-600 mt-1" style={{ fontSize: "0.57rem", letterSpacing: "0.02em", lineHeight: 1.35 }}>{s.label}</div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* ── Right: Premium Table Card (desktop) ── */}
          <motion.div initial={{ opacity: 0, x: 40, scale: 0.95 }} animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ delay: 0.28, duration: 0.8, ease: "easeOut" }}
            className="hidden lg:flex items-center justify-center">
            <div className="relative w-full max-w-[500px]">
              {/* Glows */}
              <div className="absolute inset-0 rounded-3xl pointer-events-none" style={{ background: "radial-gradient(circle at 40% 35%, rgba(26,122,82,0.16) 0%, transparent 60%)", filter: "blur(55px)", transform: "scale(1.22)" }} />
              <div className="absolute inset-0 rounded-3xl pointer-events-none" style={{ background: "radial-gradient(circle at 60% 65%, rgba(201,150,58,0.08) 0%, transparent 60%)", filter: "blur(70px)", transform: "scale(1.28)" }} />

              {/* Floating card */}
              <motion.div animate={{ y: [0, -10, 0] }} transition={{ repeat: Infinity, duration: 5.5, ease: "easeInOut" }}
                className="relative luxury-card rounded-3xl" style={{ padding: "26px" }}>
                {/* Corner ornaments */}
                {["top-3 left-3 border-t border-l", "top-3 right-3 border-t border-r", "bottom-3 left-3 border-b border-l", "bottom-3 right-3 border-b border-r"].map((cls) => (
                  <div key={cls} className={`absolute w-5 h-5 ${cls}`} style={{ borderColor: "rgba(47,212,138,0.4)", borderRadius: 2 }} />
                ))}

                {/* Card header */}
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <span style={{ fontSize: "0.55rem", fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(47,212,138,0.6)", display: "block" }}>Configurador 3D</span>
                    <span className="font-display font-semibold text-white" style={{ fontSize: "0.92rem" }}>Pro 9 Standard</span>
                  </div>
                  <span className="flex items-center gap-1.5" style={{ fontSize: "0.55rem", color: "rgba(74,222,128,0.9)", fontWeight: 700, letterSpacing: "0.08em" }}>
                    <span className="rounded-full animate-pulse flex-shrink-0" style={{ width: 5, height: 5, background: "rgba(74,222,128,0.9)" }} />
                    AO VIVO
                  </span>
                </div>

                {/* Billiard table — EMERALD felt */}
                <div className="relative w-full overflow-hidden rounded-xl"
                  style={{ aspectRatio: "16/9", background: "#156845", backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 6px, rgba(0,0,0,0.04) 6px, rgba(0,0,0,0.04) 7px), repeating-linear-gradient(90deg, transparent, transparent 6px, rgba(0,0,0,0.04) 6px, rgba(0,0,0,0.04) 7px)", boxShadow: "inset 0 0 70px rgba(0,0,0,0.6), 0 0 30px rgba(26,122,82,0.2), 0 8px 32px rgba(0,0,0,0.6)" }}>
                  {/* Wood rails */}
                  <div className="absolute inset-0 rounded-xl" style={{ border: "10px solid #5C3318", background: "transparent", boxShadow: "inset 0 0 0 2px rgba(92,51,24,0.5)" }} />
                  {/* Corner pockets */}
                  {[{ top: "4%", left: "3%" }, { top: "4%", right: "3%" }, { bottom: "4%", left: "3%" }, { bottom: "4%", right: "3%" }].map((s, i) => (
                    <div key={i} className="absolute rounded-full" style={{ ...s, width: 19, height: 19, background: "#020202", border: "2px solid rgba(92,51,24,0.65)", boxShadow: "inset 0 0 6px rgba(0,0,0,0.9)" }} />
                  ))}
                  {/* Side pockets */}
                  {[{ top: "50%", left: "1.5%", transform: "translateY(-50%)" }, { top: "50%", right: "1.5%", transform: "translateY(-50%)" }].map((s, i) => (
                    <div key={i} className="absolute rounded-full" style={{ ...s, width: 16, height: 16, background: "#020202", border: "2px solid rgba(92,51,24,0.65)" }} />
                  ))}
                  {/* Center line */}
                  <div className="absolute" style={{ top: "13%", bottom: "13%", left: "50%", width: 1, background: "rgba(255,255,255,0.06)" }} />
                  {/* Spots */}
                  {[{ top: "50%", left: "25%", transform: "translate(-50%,-50%)" }, { top: "50%", left: "75%", transform: "translate(-50%,-50%)" }].map((s, i) => (
                    <div key={i} className="absolute rounded-full" style={{ ...s, width: 4, height: 4, background: "rgba(255,255,255,0.2)" }} />
                  ))}
                  {/* Cue ball */}
                  <div className="absolute rounded-full" style={{ top: "50%", left: "28%", transform: "translate(-50%,-50%)", width: 21, height: 21, background: "radial-gradient(circle at 35% 30%, #ffffff, #d8d8d8)", boxShadow: "0 0 12px rgba(255,255,255,0.35), inset 0 -3px 7px rgba(0,0,0,0.25), 2px 2px 0 rgba(0,0,0,0.15)" }} />
                  {/* Rack balls */}
                  {BALLS.map((b, i) => (
                    <div key={i} className="absolute rounded-full" style={{ top: b.top, left: b.left, transform: "translate(-50%,-50%)", width: 17, height: 17, background: `radial-gradient(circle at 35% 28%, ${b.color}ee, ${b.color}80)`, boxShadow: `0 2px 8px rgba(0,0,0,0.6), inset 0 -2px 5px rgba(0,0,0,0.4), 1px 1px 0 rgba(255,255,255,0.1)` }} />
                  ))}
                </div>

                {/* Config chips */}
                <div className="flex gap-2 mt-4 flex-wrap">
                  {[{ label: "Nogueira Escura", color: "#5C3318" }, { label: "Feltro Verde", color: "#156845" }, { label: "Perna Torneada", color: "#4a3020" }, { label: "Ardósia Tripla", color: "#444" }].map((c) => (
                    <span key={c.label} className="flex items-center gap-1.5 text-gray-400"
                      style={{ fontSize: "0.6rem", padding: "4px 10px", borderRadius: "9999px", background: "rgba(14,14,26,0.9)", border: "1px solid rgba(47,212,138,0.1)" }}>
                      <span className="rounded-full flex-shrink-0" style={{ width: 7, height: 7, background: c.color }} />
                      {c.label}
                    </span>
                  ))}
                </div>

                {/* Price + CTA */}
                <div className="mt-4 pt-4 flex items-center justify-between" style={{ borderTop: "1px solid rgba(47,212,138,0.1)" }}>
                  <div>
                    <span className="text-gray-600" style={{ fontSize: "0.59rem" }}>A partir de</span>
                    <div className="font-display font-bold gradient-gold" style={{ fontSize: "1.6rem", lineHeight: 1 }}>R$ 7.500</div>
                    <span className="text-gray-600" style={{ fontSize: "0.56rem", display: "block", marginTop: 2 }}>ou 12× de R$ 780</span>
                  </div>
                  <Link href="/configurador" className="btn-gold rounded-xl gap-1.5" style={{ padding: "10px 18px", fontSize: "0.75rem" }}>
                    <Sparkles className="w-3.5 h-3.5" />
                    Personalizar
                  </Link>
                </div>

                {/* Border overlay */}
                <div className="absolute inset-0 rounded-3xl pointer-events-none" style={{ border: "1px solid rgba(47,212,138,0.25)", borderTopColor: "rgba(47,212,138,0.55)" }} />
              </motion.div>
            </div>
          </motion.div>

        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 hidden sm:block" style={{ transform: "translateX(-50%)" }}>
        <motion.div animate={{ y: [0, 7, 0] }} transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2">
          <span style={{ fontSize: "0.5rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(47,212,138,0.32)" }}>Explorar</span>
          <div className="rounded-full flex items-start justify-center" style={{ width: 20, height: 34, border: "1px solid rgba(47,212,138,0.18)", padding: "5px 0" }}>
            <div className="rounded-full" style={{ width: 2, height: 7, background: "rgba(47,212,138,0.45)" }} />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
