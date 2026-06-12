"use client";

import { motion } from "framer-motion";
import { Sliders, CheckCircle2, Hammer, HomeIcon } from "lucide-react";

const STEPS = [
  {
    n: "01", Icon: Sliders,
    title: "Configure em 3D",
    desc: "Monte cada detalhe — madeira, feltro, pernas — com visualização em tempo real.",
    badge: "~10 min",
    ec: "rgba(47,212,138,0.1)", eb: "rgba(47,212,138,0.25)", ic: "#2FD48A",
    tc: "#2FD48A", nb: "rgba(47,212,138,0.08)", nbc: "rgba(47,212,138,0.2)",
  },
  {
    n: "02", Icon: CheckCircle2,
    title: "Aprove o Orçamento",
    desc: "Proposta detalhada em até 24h. Preço fixo, prazo garantido, sem surpresas.",
    badge: "até 24h",
    ec: "rgba(201,150,58,0.1)", eb: "rgba(201,150,58,0.25)", ic: "#E0B258",
    tc: "#E0B258", nb: "rgba(201,150,58,0.08)", nbc: "rgba(201,150,58,0.22)",
  },
  {
    n: "03", Icon: Hammer,
    title: "Produção Artesanal",
    desc: "Fabricada à mão com madeira nobre, feltro Simonis importado e ardósia tripla.",
    badge: "20 dias úteis",
    ec: "rgba(168,85,247,0.1)", eb: "rgba(168,85,247,0.25)", ic: "#c084fc",
    tc: "#c084fc", nb: "rgba(168,85,247,0.08)", nbc: "rgba(168,85,247,0.22)",
  },
  {
    n: "04", Icon: HomeIcon,
    title: "Entrega Montada",
    desc: "Entregamos, montamos e nivelamos na sua casa. Você só precisa escolher onde jogar.",
    badge: "dia agendado",
    ec: "rgba(59,130,246,0.1)", eb: "rgba(59,130,246,0.25)", ic: "#60a5fa",
    tc: "#60a5fa", nb: "rgba(59,130,246,0.08)", nbc: "rgba(59,130,246,0.22)",
  },
];

export function ProcessSection() {
  return (
    <section className="relative overflow-hidden" style={{ padding: "96px 0 104px", background: "#0E0E1A" }}>
      <div className="gold-rule absolute inset-x-0 top-0" />

      {/* Soft center glow */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(26,122,82,0.04) 0%, transparent 70%)" }} />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
          className="text-center mb-16 sm:mb-20">
          <span className="section-label mb-3">Processo</span>
          <span className="gold-rule-short mx-auto mb-6" style={{ display: "block" }} />
          <h2 className="section-title">Da ideia à <span className="gradient-emerald">sua sala</span></h2>
          <p className="text-gray-500 max-w-xl mx-auto mt-4 leading-relaxed" style={{ fontSize: "0.95rem" }}>
            4 passos simples e transparentes. Sem burocracia, sem surpresas.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="relative">
          {/* Connecting dashed line — desktop only, sits at center of icon circles */}
          <div className="absolute hidden lg:block pointer-events-none"
            style={{ top: 88, left: "14%", right: "14%", height: 1, background: "repeating-linear-gradient(90deg, rgba(47,212,138,0.18) 0px, rgba(47,212,138,0.18) 8px, transparent 8px, transparent 18px)" }} />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-4">
            {STEPS.map((step, i) => (
              <motion.div key={step.n}
                initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.55 }}
                className="flex flex-col items-center text-center"
                style={{ padding: "28px 20px 24px", borderRadius: 18, background: "linear-gradient(160deg, #13131E 0%, #0E0E1A 100%)", border: `1px solid ${step.eb}`, borderTopColor: step.eb }}>

                {/* Step number badge */}
                <span className="font-display font-bold mb-5" style={{ fontSize: "0.6rem", letterSpacing: "0.14em", color: step.tc, padding: "4px 12px", borderRadius: 9999, background: step.nb, border: `1px solid ${step.nbc}` }}>
                  PASSO {step.n}
                </span>

                {/* Icon circle */}
                <div className="mb-5 flex items-center justify-center rounded-full"
                  style={{ width: 72, height: 72, background: step.ec, border: `1px solid ${step.eb}`, flexShrink: 0 }}>
                  <step.Icon style={{ width: 30, height: 30, color: step.ic }} />
                </div>

                {/* Time chip */}
                <span className="mb-4" style={{ fontSize: "0.58rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: step.tc, padding: "3px 10px", borderRadius: 9999, background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
                  {step.badge}
                </span>

                <h3 className="font-display font-semibold text-white mb-2 leading-tight" style={{ fontSize: "1rem" }}>{step.title}</h3>
                <p className="text-gray-500 leading-relaxed" style={{ fontSize: "0.82rem" }}>{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <div className="gold-rule absolute inset-x-0 bottom-0" />
    </section>
  );
}
