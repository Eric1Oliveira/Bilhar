"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Sparkles, Eye } from "lucide-react";

const STATS = [
  { value: "500+", label: "Mesas Entregues" },
  { value: "5 Anos", label: "Garantia" },
  { value: "4.9★", label: "Avaliação" },
];

const BALLS = [
  { top: "38%", left: "68%", color: "#dc2626" },
  { top: "32%", left: "72%", color: "#f4d03f" },
  { top: "44%", left: "72%", color: "#22c55e" },
  { top: "26%", left: "76%", color: "#3b82f6" },
  { top: "38%", left: "76%", color: "#a855f7" },
  { top: "50%", left: "76%", color: "#f97316" },
];

export function HeroSection() {
  return (
    <section
      className="relative overflow-hidden bg-bilhar-dark"
      style={{ minHeight: "100dvh", display: "flex", flexDirection: "column", justifyContent: "center" }}
    >
      {/* ── Atmospheric Background ── */}
      <div className="absolute inset-0 pointer-events-none select-none">
        {/* Crimson glow — top-left */}
        <div
          className="absolute rounded-full"
          style={{
            top: "-20%",
            left: "-15%",
            width: "65vw",
            height: "65vw",
            maxWidth: "820px",
            maxHeight: "820px",
            background: "radial-gradient(circle, rgba(130,0,0,0.13) 0%, transparent 70%)",
            filter: "blur(80px)",
          }}
        />
        {/* Gold glow — bottom-right */}
        <div
          className="absolute rounded-full"
          style={{
            bottom: "-15%",
            right: "-10%",
            width: "55vw",
            height: "55vw",
            maxWidth: "700px",
            maxHeight: "700px",
            background: "radial-gradient(circle, rgba(201,168,76,0.09) 0%, transparent 70%)",
            filter: "blur(100px)",
          }}
        />
        {/* Diagonal line grid */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(135deg, rgba(201,168,76,0.025) 1px, transparent 1px), linear-gradient(225deg, rgba(201,168,76,0.025) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />
        {/* Vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_50%,transparent_40%,rgba(6,6,6,0.75)_100%)]" />
      </div>

      {/* ── Content ── */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-16 lg:pt-36 lg:pb-24">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* ── Left: Copy ── */}
          <div className="text-center lg:text-left">

            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.55 }}
              className="inline-flex items-center gap-2.5 mb-8"
              style={{
                border: "1px solid rgba(201,168,76,0.28)",
                borderRadius: "9999px",
                padding: "8px 18px",
                background: "rgba(201,168,76,0.04)",
              }}
            >
              <span
                className="rounded-full animate-pulse flex-shrink-0"
                style={{ width: 6, height: 6, background: "#c9a84c" }}
              />
              <span
                style={{
                  fontSize: "0.62rem",
                  fontWeight: 700,
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: "#c9a84c",
                }}
              >
                Configurador 3D Exclusivo no Brasil
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.65 }}
              className="font-display font-bold leading-[1.05] tracking-tight mb-4"
              style={{ fontSize: "clamp(2.5rem, 8vw, 6rem)" }}
            >
              <span className="text-white block">A mesa de</span>
              <span className="text-white block">sinuca</span>
              <span className="gradient-gold text-shadow-gold block">perfeita</span>
            </motion.h1>

            {/* Gold rule */}
            <motion.span
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{ delay: 0.38, duration: 0.55, ease: "easeOut" }}
              className="gold-rule-short mb-7 inline-block origin-left lg:mx-0 mx-auto"
              style={{ display: "block" }}
            />

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.55 }}
              className="text-gray-400 leading-relaxed mb-10 max-w-md mx-auto lg:mx-0"
              style={{ fontSize: "clamp(1rem, 2.5vw, 1.25rem)" }}
            >
              Configure em 3D, visualize no seu espaço em AR e receba montada na sua casa.
              Madeiras nobres, feltros importados, entrega especializada.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45, duration: 0.55 }}
              className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start mb-12"
            >
              <Link
                href="/configurador"
                className="btn-gold rounded-xl gap-2.5 justify-center w-full sm:w-auto"
                style={{ padding: "16px 32px", fontSize: "0.9rem" }}
              >
                <Sparkles className="w-4 h-4 flex-shrink-0" />
                Configurar Minha Mesa
                <ArrowRight className="w-4 h-4 flex-shrink-0" />
              </Link>
              <Link
                href="/catalogo"
                className="btn-outline-gold rounded-xl gap-2.5 justify-center w-full sm:w-auto"
                style={{ padding: "16px 32px", fontSize: "0.9rem" }}
              >
                <Eye className="w-4 h-4 flex-shrink-0" />
                Ver Catálogo
              </Link>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="grid grid-cols-3 gap-0 justify-center lg:justify-start"
              style={{ maxWidth: 380, margin: "0 auto" }}
            >
              {STATS.map((stat, i) => (
                <div
                  key={stat.label}
                  className="text-center lg:text-left"
                  style={{
                    paddingLeft: i > 0 ? "1.25rem" : 0,
                    borderLeft: i > 0 ? "1px solid rgba(201,168,76,0.2)" : "none",
                    paddingRight: i < 2 ? "1.25rem" : 0,
                  }}
                >
                  <div className="font-display font-bold gradient-gold" style={{ fontSize: "clamp(1.25rem, 3vw, 1.75rem)" }}>
                    {stat.value}
                  </div>
                  <div className="text-gray-500 mt-0.5" style={{ fontSize: "0.7rem", letterSpacing: "0.04em" }}>
                    {stat.label}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* ── Right: Luxury 3D Preview Card (desktop only) ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.75, ease: "easeOut" }}
            className="hidden lg:flex items-center justify-center"
          >
            <div className="relative w-full max-w-[500px]">
              {/* Ambient glow behind card */}
              <div
                className="absolute inset-0 rounded-3xl pointer-events-none"
                style={{
                  background: "radial-gradient(circle, rgba(130,0,0,0.1) 0%, transparent 70%)",
                  filter: "blur(40px)",
                  transform: "scale(1.15)",
                }}
              />
              <div
                className="absolute inset-0 rounded-3xl pointer-events-none"
                style={{
                  background: "radial-gradient(circle, rgba(201,168,76,0.06) 0%, transparent 70%)",
                  filter: "blur(60px)",
                  transform: "scale(1.2)",
                }}
              />

              {/* Card */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
                className="relative luxury-card rounded-3xl"
                style={{ padding: "24px" }}
              >
                {/* Corner ornaments */}
                {[
                  "top-3 left-3 border-t border-l rounded-tl-sm",
                  "top-3 right-3 border-t border-r rounded-tr-sm",
                  "bottom-3 left-3 border-b border-l rounded-bl-sm",
                  "bottom-3 right-3 border-b border-r rounded-br-sm",
                ].map((cls) => (
                  <div
                    key={cls}
                    className={`absolute w-5 h-5 ${cls}`}
                    style={{ borderColor: "rgba(201,168,76,0.4)" }}
                  />
                ))}

                {/* Label */}
                <div className="flex items-center justify-between mb-4">
                  <span
                    style={{
                      fontSize: "0.6rem",
                      fontWeight: 700,
                      letterSpacing: "0.2em",
                      textTransform: "uppercase",
                      color: "rgba(201,168,76,0.7)",
                    }}
                  >
                    Pré-visualização 3D
                  </span>
                  <span
                    className="flex items-center gap-1.5"
                    style={{
                      fontSize: "0.6rem",
                      color: "rgba(34,197,94,0.8)",
                      fontWeight: 600,
                    }}
                  >
                    <span
                      className="rounded-full animate-pulse"
                      style={{ width: 5, height: 5, background: "rgba(34,197,94,0.8)" }}
                    />
                    Ao Vivo
                  </span>
                </div>

                {/* Billiard table — top-down CSS art */}
                <div
                  className="relative w-full overflow-hidden rounded-2xl"
                  style={{
                    aspectRatio: "16/9",
                    background: "#820000",
                    backgroundImage:
                      "repeating-linear-gradient(0deg, transparent, transparent 6px, rgba(0,0,0,0.04) 6px, rgba(0,0,0,0.04) 7px), repeating-linear-gradient(90deg, transparent, transparent 6px, rgba(0,0,0,0.04) 6px, rgba(0,0,0,0.04) 7px)",
                    boxShadow: "inset 0 0 60px rgba(0,0,0,0.6), 0 0 40px rgba(130,0,0,0.3)",
                  }}
                >
                  {/* Wood rails */}
                  <div
                    className="absolute inset-0 rounded-2xl"
                    style={{
                      border: "10px solid #6B3A1F",
                      background: "transparent",
                      boxShadow: "inset 0 0 0 2px rgba(139,69,19,0.6)",
                    }}
                  />
                  {/* Corner pockets */}
                  {[
                    { top: "4%", left: "3%" },
                    { top: "4%", right: "3%" },
                    { bottom: "4%", left: "3%" },
                    { bottom: "4%", right: "3%" },
                  ].map((s, i) => (
                    <div
                      key={i}
                      className="absolute rounded-full"
                      style={{
                        ...s,
                        width: 18,
                        height: 18,
                        background: "#050505",
                        border: "2px solid #a0522d",
                      }}
                    />
                  ))}
                  {/* Side pockets */}
                  {[
                    { top: "50%", left: "1.5%", transform: "translateY(-50%)" },
                    { top: "50%", right: "1.5%", transform: "translateY(-50%)" },
                  ].map((s, i) => (
                    <div
                      key={i}
                      className="absolute rounded-full"
                      style={{
                        ...s,
                        width: 16,
                        height: 16,
                        background: "#050505",
                        border: "2px solid #a0522d",
                      }}
                    />
                  ))}
                  {/* Center line */}
                  <div
                    className="absolute"
                    style={{
                      top: "12%",
                      bottom: "12%",
                      left: "50%",
                      width: 1,
                      background: "rgba(255,255,255,0.08)",
                    }}
                  />
                  {/* Cue ball */}
                  <div
                    className="absolute rounded-full"
                    style={{
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                      width: 22,
                      height: 22,
                      background: "#ffffff",
                      boxShadow: "0 0 16px rgba(255,255,255,0.5), inset 0 -3px 6px rgba(0,0,0,0.2)",
                    }}
                  />
                  {/* Rack balls */}
                  {BALLS.map((b, i) => (
                    <div
                      key={i}
                      className="absolute rounded-full"
                      style={{
                        top: b.top,
                        left: b.left,
                        width: 18,
                        height: 18,
                        background: b.color,
                        boxShadow: `0 2px 6px rgba(0,0,0,0.5), inset 0 -2px 4px rgba(0,0,0,0.3)`,
                      }}
                    />
                  ))}
                </div>

                {/* Config chips */}
                <div className="flex gap-2 mt-4 flex-wrap">
                  {[
                    { label: "Mogno Escuro", color: "#6B3A1F" },
                    { label: "Feltro Carmim", color: "#820000" },
                    { label: "Perna Torneada", color: "#4a3020" },
                  ].map((chip) => (
                    <span
                      key={chip.label}
                      className="flex items-center gap-1.5 text-gray-400"
                      style={{
                        fontSize: "0.65rem",
                        padding: "5px 10px",
                        borderRadius: "9999px",
                        background: "rgba(13,13,13,0.8)",
                        border: "1px solid rgba(201,168,76,0.12)",
                      }}
                    >
                      <span
                        className="rounded-full flex-shrink-0"
                        style={{ width: 8, height: 8, background: chip.color }}
                      />
                      {chip.label}
                    </span>
                  ))}
                </div>

                {/* Price row */}
                <div
                  className="mt-4 pt-4 flex items-center justify-between"
                  style={{ borderTop: "1px solid rgba(201,168,76,0.12)" }}
                >
                  <div>
                    <span className="text-gray-600" style={{ fontSize: "0.65rem" }}>
                      Mesa Profissional
                    </span>
                    <div className="font-display font-bold text-white" style={{ fontSize: "0.9rem" }}>
                      Pro 9 Standard
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-gray-600" style={{ fontSize: "0.6rem", display: "block" }}>
                      A partir de
                    </span>
                    <span className="font-display font-bold gradient-gold" style={{ fontSize: "1.4rem" }}>
                      R$&nbsp;7.500
                    </span>
                  </div>
                </div>

                {/* Gold shimmer border overlay */}
                <div
                  className="absolute inset-0 rounded-3xl pointer-events-none"
                  style={{
                    border: "1px solid rgba(201,168,76,0.35)",
                    borderTopColor: "rgba(201,168,76,0.6)",
                  }}
                />
              </motion.div>
            </div>
          </motion.div>

        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        className="absolute bottom-8 left-1/2 hidden sm:block"
        style={{ transform: "translateX(-50%)" }}
      >
        <motion.div
          animate={{ y: [0, 7, 0] }}
          transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2"
        >
          <span
            style={{
              fontSize: "0.55rem",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "rgba(201,168,76,0.4)",
            }}
          >
            Explorar
          </span>
          <div
            className="rounded-full flex items-start justify-center"
            style={{
              width: 20,
              height: 36,
              border: "1px solid rgba(201,168,76,0.2)",
              padding: "5px 0",
            }}
          >
            <div
              className="rounded-full"
              style={{ width: 2, height: 8, background: "rgba(201,168,76,0.5)" }}
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
