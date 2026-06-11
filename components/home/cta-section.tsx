"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Sparkles, Eye } from "lucide-react";

const TRUST_ITEMS = [
  "Sem compromisso inicial",
  "Entrega em todo o Brasil",
  "Garantia de 5 anos",
  "Parcelamento em até 12x",
];

/* Floating gold particles */
const PARTICLES = [
  { top: "12%", left: "8%", size: 3, delay: 0 },
  { top: "22%", left: "18%", size: 2, delay: 0.8 },
  { top: "8%", left: "35%", size: 4, delay: 1.5 },
  { top: "70%", left: "12%", size: 2, delay: 0.4 },
  { top: "80%", left: "25%", size: 3, delay: 2.2 },
  { top: "15%", right: "10%", size: 3, delay: 1.0 },
  { top: "30%", right: "20%", size: 2, delay: 0.3 },
  { top: "60%", right: "8%", size: 4, delay: 1.8 },
  { top: "75%", right: "18%", size: 2, delay: 0.7 },
  { top: "45%", left: "5%", size: 2, delay: 2.5 },
  { top: "50%", right: "5%", size: 3, delay: 1.2 },
  { top: "88%", left: "42%", size: 2, delay: 0.6 },
];

export function CTASection() {
  return (
    <section
      className="relative overflow-hidden"
      style={{ padding: "96px 0 112px", background: "#060606" }}
    >
      {/* ── Deep crimson felt texture overlay ── */}
      <div
        className="absolute inset-0"
        style={{
          background: "#820000",
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent, transparent 5px, rgba(0,0,0,0.06) 5px, rgba(0,0,0,0.06) 6px), repeating-linear-gradient(90deg, transparent, transparent 5px, rgba(0,0,0,0.06) 5px, rgba(0,0,0,0.06) 6px)",
          opacity: 0.22,
        }}
      />
      <div
        className="absolute inset-0"
        style={{ background: "linear-gradient(to bottom, #060606 0%, transparent 30%, transparent 70%, #060606 100%)" }}
      />
      <div
        className="absolute inset-0"
        style={{ background: "linear-gradient(to right, #060606 0%, transparent 25%, transparent 75%, #060606 100%)" }}
      />

      {/* ── Atmospheric glows ── */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute rounded-full"
          style={{
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "55vw",
            height: "55vw",
            maxWidth: 700,
            maxHeight: 700,
            background: "radial-gradient(circle, rgba(130,0,0,0.14) 0%, transparent 70%)",
            filter: "blur(80px)",
          }}
        />
        <div
          className="absolute rounded-full"
          style={{
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "30vw",
            height: "30vw",
            maxWidth: 400,
            maxHeight: 400,
            background: "radial-gradient(circle, rgba(201,168,76,0.07) 0%, transparent 70%)",
            filter: "blur(60px)",
          }}
        />
      </div>

      {/* ── Corner bracket ornaments ── */}
      {/* Top-left */}
      <div
        className="absolute hidden sm:block"
        style={{
          top: 32,
          left: 32,
          width: 56,
          height: 56,
          borderTop: "2px solid rgba(201,168,76,0.22)",
          borderLeft: "2px solid rgba(201,168,76,0.22)",
          borderTopLeftRadius: 8,
        }}
      />
      {/* Top-right */}
      <div
        className="absolute hidden sm:block"
        style={{
          top: 32,
          right: 32,
          width: 56,
          height: 56,
          borderTop: "2px solid rgba(201,168,76,0.22)",
          borderRight: "2px solid rgba(201,168,76,0.22)",
          borderTopRightRadius: 8,
        }}
      />
      {/* Bottom-left */}
      <div
        className="absolute hidden sm:block"
        style={{
          bottom: 32,
          left: 32,
          width: 56,
          height: 56,
          borderBottom: "2px solid rgba(201,168,76,0.22)",
          borderLeft: "2px solid rgba(201,168,76,0.22)",
          borderBottomLeftRadius: 8,
        }}
      />
      {/* Bottom-right */}
      <div
        className="absolute hidden sm:block"
        style={{
          bottom: 32,
          right: 32,
          width: 56,
          height: 56,
          borderBottom: "2px solid rgba(201,168,76,0.22)",
          borderRight: "2px solid rgba(201,168,76,0.22)",
          borderBottomRightRadius: 8,
        }}
      />

      {/* ── Floating gold particles ── */}
      {PARTICLES.map((p, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full pointer-events-none"
          style={{
            top: p.top,
            left: "left" in p ? p.left : undefined,
            right: "right" in p ? (p as { right?: string }).right : undefined,
            width: p.size,
            height: p.size,
            background: "rgba(201,168,76,0.55)",
          }}
          animate={{ y: [0, -12, 0], opacity: [0.4, 0.9, 0.4] }}
          transition={{
            repeat: Infinity,
            duration: 3.5 + (i % 3) * 0.8,
            delay: p.delay,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* ── Content ── */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65 }}
        >
          <span className="section-label mb-4">Comece agora</span>
          <span className="gold-rule-short mx-auto mb-8" style={{ display: "block" }} />

          <h2
            className="font-display font-bold text-white leading-tight mb-6"
            style={{
              fontSize: "clamp(2rem, 6vw, 4rem)",
              letterSpacing: "-0.02em",
            }}
          >
            Sua mesa ideal a{" "}
            <span className="gradient-gold text-shadow-gold">um clique</span>
          </h2>

          <p
            className="text-gray-300 leading-relaxed mb-12 max-w-2xl mx-auto"
            style={{ fontSize: "clamp(1rem, 2.5vw, 1.2rem)" }}
          >
            Configure agora mesmo sem criar conta. Salve sua configuração e finalize quando quiser.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link
              href="/configurador"
              className="btn-gold rounded-xl gap-3 justify-center group w-full sm:w-auto"
              style={{ padding: "18px 40px", fontSize: "1rem" }}
            >
              <Sparkles className="w-5 h-5 flex-shrink-0" />
              Configurar Minha Mesa
              <ArrowRight className="w-5 h-5 flex-shrink-0 group-hover:translate-x-1 transition-transform duration-200" />
            </Link>
            <Link
              href="/catalogo"
              className="btn-outline-gold rounded-xl gap-3 justify-center w-full sm:w-auto"
              style={{ padding: "18px 40px", fontSize: "1rem" }}
            >
              <Eye className="w-5 h-5 flex-shrink-0" />
              Ver Catálogo
            </Link>
          </div>

          {/* Trust items */}
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-3">
            {TRUST_ITEMS.map((item) => (
              <span
                key={item}
                className="flex items-center gap-2 text-gray-400"
                style={{ fontSize: "0.82rem" }}
              >
                <span
                  className="rounded-full flex-shrink-0"
                  style={{ width: 5, height: 5, background: "#c9a84c" }}
                />
                {item}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
