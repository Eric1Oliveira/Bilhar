"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";

const TESTIMONIALS = [
  {
    name: "Carlos Mendonça", location: "São Paulo, SP", rating: 5,
    text: "O configurador 3D é incrível. Consegui ver exatamente como ficaria no meu espaço antes de comprar. Entrega e montagem foram absolutamente impecáveis.",
    product: "Mesa Pro 9 Standard",
    initials: "CM", avatarBg: "linear-gradient(135deg, #0A3D28, #1A7A52)",
    accentBorder: "rgba(47,212,138,0.4)",
  },
  {
    name: "Ana Rodrigues", location: "Rio de Janeiro, RJ", rating: 5,
    text: "O aluguel foi a melhor opção pra mim. Processo simples, mesa chegou montada e o atendimento foi excelente do início ao fim. Qualidade premium.",
    product: "Plano Aluguel 12 meses",
    initials: "AR", avatarBg: "linear-gradient(135deg, #A8813A, #E0B258)",
    accentBorder: "rgba(201,150,58,0.4)",
  },
  {
    name: "Roberto Silva", location: "Belo Horizonte, MG", rating: 5,
    text: "Ardósia de primeira, feltro durável e suporte pós-venda rápido. Usei o AR para ver no ambiente antes de confirmar — ficou perfeito.",
    product: "Snooker Royal 12P",
    initials: "RS", avatarBg: "linear-gradient(135deg, #1A3A7A, #3b82f6)",
    accentBorder: "rgba(96,165,250,0.35)",
  },
];

export function TestimonialsSection() {
  return (
    <section className="relative overflow-hidden" style={{ padding: "96px 0 112px", background: "#0E0E1A" }}>
      <div className="absolute inset-x-0 top-0 h-px gold-rule" />

      {/* Ambient glow */}
      <div className="absolute pointer-events-none" style={{ top: "40%", left: "50%", transform: "translate(-50%,-50%)", width: "70vw", height: "70vw", maxWidth: 800, maxHeight: 800, background: "radial-gradient(circle, rgba(26,122,82,0.03) 0%, transparent 65%)", filter: "blur(40px)" }} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
          className="text-center mb-16 sm:mb-20">
          <span className="section-label mb-4">Depoimentos</span>
          <span className="gold-rule-short mx-auto mb-6" style={{ display: "block" }} />
          <h2 className="section-title">O que nossos <span className="gradient-emerald">clientes</span> dizem</h2>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t, i) => (
            <motion.div key={t.name}
              initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ delay: i * 0.12, duration: 0.55 }}
              className="relative flex flex-col rounded-2xl"
              style={{ background: "linear-gradient(160deg, #14141E 0%, #0E0E1A 100%)", border: "1px solid rgba(47,212,138,0.12)", borderTopColor: t.accentBorder, padding: "32px" }}>
              {/* Large opening quote */}
              <div className="font-display font-bold leading-none mb-4 select-none" style={{ fontSize: "4.5rem", color: "rgba(47,212,138,0.1)", lineHeight: 0.8 }} aria-hidden>&ldquo;</div>
              {/* Stars */}
              <div className="flex gap-1 mb-5">
                {Array.from({ length: t.rating }).map((_, si) => (
                  <Star key={si} className="fill-current" style={{ width: 14, height: 14, color: "#E0B258" }} />
                ))}
              </div>
              {/* Text */}
              <p className="text-gray-300 leading-relaxed flex-1 italic mb-8" style={{ fontSize: "0.925rem" }}>{t.text}</p>
              {/* Divider */}
              <div className="mb-6" style={{ height: 1, background: "rgba(47,212,138,0.1)" }} />
              {/* Author */}
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center rounded-full flex-shrink-0 text-white font-bold"
                  style={{ width: 44, height: 44, background: t.avatarBg, fontSize: "0.75rem", boxShadow: "0 4px 12px rgba(0,0,0,0.4)" }}>
                  {t.initials}
                </div>
                <div>
                  <p className="font-semibold text-white" style={{ fontSize: "0.875rem" }}>{t.name}</p>
                  <p className="text-gray-500 mt-0.5" style={{ fontSize: "0.7rem" }}>{t.location}</p>
                  <p className="mt-0.5" style={{ fontSize: "0.65rem", color: "rgba(47,212,138,0.6)" }}>{t.product}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Trust bar */}
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2, duration: 0.6 }}
          className="mt-16 sm:mt-20 rounded-2xl flex flex-wrap items-center justify-center"
          style={{ background: "rgba(47,212,138,0.025)", backdropFilter: "blur(20px)", border: "1px solid rgba(47,212,138,0.12)", padding: "28px 40px" }}>
          {[{ v: "500+", l: "Clientes" }, { v: "4.9/5", l: "Avaliação" }, { v: "5 Anos", l: "no Mercado" }].map((item, i) => (
            <div key={item.l} className="text-center flex-1" style={{ minWidth: 120, padding: "0 28px", borderRight: i < 2 ? "1px solid rgba(47,212,138,0.1)" : "none" }}>
              <div className="font-display font-bold gradient-gold mb-1" style={{ fontSize: "clamp(1.5rem, 4vw, 2rem)" }}>{item.v}</div>
              <div className="text-gray-500" style={{ fontSize: "0.7rem", letterSpacing: "0.05em" }}>{item.l}</div>
            </div>
          ))}
        </motion.div>
      </div>

      <div className="absolute inset-x-0 bottom-0 h-px gold-rule" />
    </section>
  );
}
