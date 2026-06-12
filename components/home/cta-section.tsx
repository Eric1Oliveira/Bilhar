"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Sparkles, Eye } from "lucide-react";

const TRUST_ITEMS = [
  "Sem compromisso inicial",
  "Entrega em todo o Brasil",
  "Garantia de 5 anos",
  "Parcelamento em até 12×",
];

const PARTICLES = [
  { top: "12%", left: "8%",  size: 3, delay: 0   },
  { top: "22%", left: "18%", size: 2, delay: 0.8 },
  { top: "8%",  left: "35%", size: 4, delay: 1.5 },
  { top: "70%", left: "12%", size: 2, delay: 0.4 },
  { top: "80%", left: "25%", size: 3, delay: 2.2 },
  { top: "15%", left: "88%", size: 3, delay: 1.0 },
  { top: "30%", left: "78%", size: 2, delay: 0.3 },
  { top: "60%", left: "90%", size: 4, delay: 1.8 },
  { top: "75%", left: "80%", size: 2, delay: 0.7 },
  { top: "45%", left: "5%",  size: 2, delay: 2.5 },
  { top: "50%", left: "93%", size: 3, delay: 1.2 },
  { top: "88%", left: "42%", size: 2, delay: 0.6 },
];

export function CTASection() {
  return (
    <section className="relative overflow-hidden" style={{ padding: "96px 0 112px", background: "#09090F" }}>
      {/* Emerald felt texture layer */}
      <div className="absolute inset-0" style={{ background: "#156845", backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 5px, rgba(0,0,0,0.05) 5px, rgba(0,0,0,0.05) 6px), repeating-linear-gradient(90deg, transparent, transparent 5px, rgba(0,0,0,0.05) 5px, rgba(0,0,0,0.05) 6px)", opacity: 0.12 }} />
      {/* Fade edges */}
      <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, #09090F 0%, transparent 25%, transparent 75%, #09090F 100%)" }} />
      <div className="absolute inset-0" style={{ background: "linear-gradient(to right, #09090F 0%, transparent 20%, transparent 80%, #09090F 100%)" }} />

      {/* Glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute rounded-full" style={{ top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: "55vw", height: "55vw", maxWidth: 700, maxHeight: 700, background: "radial-gradient(circle, rgba(26,122,82,0.15) 0%, transparent 70%)", filter: "blur(80px)" }} />
        <div className="absolute rounded-full" style={{ top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: "28vw", height: "28vw", maxWidth: 380, maxHeight: 380, background: "radial-gradient(circle, rgba(201,150,58,0.06) 0%, transparent 70%)", filter: "blur(60px)" }} />
      </div>

      {/* Corner ornaments */}
      {[
        { top: 32, left: 32, borderTop: "2px solid rgba(47,212,138,0.2)", borderLeft: "2px solid rgba(47,212,138,0.2)", borderTopLeftRadius: 8 },
        { top: 32, right: 32, borderTop: "2px solid rgba(47,212,138,0.2)", borderRight: "2px solid rgba(47,212,138,0.2)", borderTopRightRadius: 8 },
        { bottom: 32, left: 32, borderBottom: "2px solid rgba(47,212,138,0.2)", borderLeft: "2px solid rgba(47,212,138,0.2)", borderBottomLeftRadius: 8 },
        { bottom: 32, right: 32, borderBottom: "2px solid rgba(47,212,138,0.2)", borderRight: "2px solid rgba(47,212,138,0.2)", borderBottomRightRadius: 8 },
      ].map((s, i) => (
        <div key={i} className="absolute hidden sm:block" style={{ ...s, width: 52, height: 52 }} />
      ))}

      {/* Particles */}
      {PARTICLES.map((p, i) => (
        <motion.div key={i} className="absolute rounded-full pointer-events-none"
          style={{ top: p.top, left: p.left, width: p.size, height: p.size, background: "rgba(47,212,138,0.5)" }}
          animate={{ y: [0, -12, 0], opacity: [0.35, 0.85, 0.35] }}
          transition={{ repeat: Infinity, duration: 3.5 + (i % 3) * 0.8, delay: p.delay, ease: "easeInOut" }} />
      ))}

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.65 }}>
          <span className="section-label mb-4">Comece agora</span>
          <span className="gold-rule-short mx-auto mb-8" style={{ display: "block" }} />
          <h2 className="font-display font-bold text-white leading-tight mb-6"
            style={{ fontSize: "clamp(2rem, 6vw, 4rem)", letterSpacing: "-0.02em" }}>
            Sua mesa ideal a{" "}
            <span className="gradient-emerald text-shadow-emerald">um clique</span>
          </h2>
          <p className="text-gray-300 leading-relaxed mb-12 max-w-2xl mx-auto" style={{ fontSize: "clamp(1rem, 2.5vw, 1.2rem)" }}>
            Configure agora mesmo sem criar conta. Salve sua configuração e finalize quando quiser.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link href="/configurador" className="btn-gold rounded-xl gap-3 justify-center group w-full sm:w-auto"
              style={{ padding: "18px 40px", fontSize: "1rem" }}>
              <Sparkles className="w-5 h-5 flex-shrink-0" />
              Configurar Minha Mesa
              <ArrowRight className="w-5 h-5 flex-shrink-0 group-hover:translate-x-1 transition-transform duration-200" />
            </Link>
            <Link href="/catalogo" className="btn-outline-gold rounded-xl gap-3 justify-center w-full sm:w-auto"
              style={{ padding: "18px 40px", fontSize: "1rem" }}>
              <Eye className="w-5 h-5 flex-shrink-0" />
              Ver Catálogo
            </Link>
          </div>

          {/* Trust items */}
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-3">
            {TRUST_ITEMS.map((item) => (
              <span key={item} className="flex items-center gap-2 text-gray-400" style={{ fontSize: "0.82rem" }}>
                <span className="rounded-full flex-shrink-0" style={{ width: 5, height: 5, background: "#2FD48A" }} />
                {item}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
