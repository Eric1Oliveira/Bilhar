"use client";

import { motion } from "framer-motion";
import { Sliders, Zap, Truck, Shield, Star, Award } from "lucide-react";

const FEATURES = [
  { Icon: Sliders,  title: "Configurador 3D Exclusivo",  desc: "A única plataforma no Brasil que permite montar sua mesa do zero em 3D com visualização em tempo real. Madeira, feltro e acabamento na palma da mão.", tag: "Exclusivo",   tc: "#2FD48A",   bg: "rgba(47,212,138,0.08)",  bd: "rgba(47,212,138,0.2)",  ic: "#2FD48A" },
  { Icon: Zap,      title: "Realidade Aumentada",        desc: "Veja a mesa exatamente no seu espaço antes de confirmar. Tecnologia AR que elimina qualquer dúvida sobre tamanho, cor e posicionamento.",               tag: "Inovação",   tc: "#E0B258",   bg: "rgba(201,150,58,0.08)", bd: "rgba(201,150,58,0.22)", ic: "#E0B258" },
  { Icon: Truck,    title: "Entrega em Todo o Brasil",   desc: "Equipe especializada entrega e instala em qualquer estado. Agendamento no horário certo, sem transtorno, zero quebra-galho.",                            tag: "Nacional",   tc: "#60a5fa",   bg: "rgba(59,130,246,0.08)", bd: "rgba(59,130,246,0.2)",  ic: "#60a5fa" },
  { Icon: Shield,   title: "Garantia de 5 Anos",         desc: "5 anos de garantia na estrutura, 2 anos em feltro e acessórios. Peças originais sempre disponíveis. Suporte rápido e eficiente.",                        tag: "5 Anos",     tc: "#c084fc",   bg: "rgba(168,85,247,0.08)", bd: "rgba(168,85,247,0.2)",  ic: "#c084fc" },
  { Icon: Star,     title: "Feltros Simonis Importados", desc: "Trabalhamos apenas com feltros Simonis e Iwan Simonis — os preferidos dos profissionais mundiais. Durabilidade superior e toque de torneio.",           tag: "Importado",  tc: "#fb923c",   bg: "rgba(251,146,60,0.08)", bd: "rgba(251,146,60,0.2)",  ic: "#fb923c" },
  { Icon: Award,    title: "Personalização Total",       desc: "Mais de 200 combinações de madeira, feltro, perna e acessórios. Cada mesa é única — construída exatamente do jeito que você imaginou.",                  tag: "200+ opções", tc: "#2FD48A",  bg: "rgba(47,212,138,0.08)",  bd: "rgba(47,212,138,0.2)",  ic: "#2FD48A" },
];

const TRUST_BAR = [
  { v: "500+",  l: "Mesas Entregues"       },
  { v: "R$20k", l: "Mesa mais cara vendida" },
  { v: "4.9/5", l: "Google Avaliações"      },
  { v: "0",     l: "Reclamações Reclame Aqui" },
];

export function FeaturesSection() {
  return (
    <section className="relative overflow-hidden" style={{ padding: "96px 0 112px", background: "#0E0E1A" }}>
      <div className="absolute inset-x-0 top-0 h-px gold-rule" />

      <div className="absolute pointer-events-none" style={{ top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: "60vw", height: "60vw", maxWidth: 700, maxHeight: 700, background: "radial-gradient(circle, rgba(26,122,82,0.04) 0%, transparent 70%)", filter: "blur(60px)" }} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
          className="text-center mb-16 sm:mb-20">
          <span className="section-label mb-4">Por que escolher</span>
          <span className="gold-rule-short mx-auto mb-6" style={{ display: "block" }} />
          <h2 className="section-title">O padrão que nos <span className="gradient-emerald">separa</span></h2>
          <p className="text-gray-400 max-w-2xl mx-auto leading-relaxed mt-5" style={{ fontSize: "clamp(0.95rem, 2vw, 1.1rem)" }}>
            Não vendemos apenas mesas. Entregamos a experiência completa — da configuração 3D até a mesa nivelada e pronta para o primeiro jogo.
          </p>
        </motion.div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURES.map((f, i) => (
            <motion.div key={f.title}
              initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.55 }}
              className="group relative rounded-2xl card-hover cursor-default"
              style={{ background: "linear-gradient(160deg, #14141E 0%, #0E0E1A 100%)", border: "1px solid rgba(47,212,138,0.12)", borderTopColor: "rgba(47,212,138,0.35)", padding: "30px" }}>
              {/* Hover shimmer */}
              <div className="absolute top-0 left-8 right-8 h-0.5 rounded-b-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: "linear-gradient(90deg, transparent, rgba(47,212,138,0.45), transparent)" }} />
              {/* Icon + tag row */}
              <div className="flex items-start justify-between mb-5">
                <div style={{ width: 50, height: 50, borderRadius: 14, background: f.bg, border: `1px solid ${f.bd}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <f.Icon style={{ width: 21, height: 21, color: f.ic }} />
                </div>
                <span style={{ fontSize: "0.57rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: f.tc, padding: "3px 9px", borderRadius: 9999, background: "rgba(0,0,0,0.35)", border: `1px solid ${f.tc}40` }}>{f.tag}</span>
              </div>
              <h3 className="font-display font-semibold text-white mb-3 leading-tight" style={{ fontSize: "1.08rem" }}>{f.title}</h3>
              <p className="text-gray-400 leading-relaxed" style={{ fontSize: "0.87rem" }}>{f.desc}</p>
              {/* Hover glow */}
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" style={{ boxShadow: "0 0 40px rgba(47,212,138,0.05)" }} />
            </motion.div>
          ))}
        </div>

        {/* Trust bar */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3, duration: 0.6 }}
          className="mt-16 sm:mt-20 rounded-2xl flex flex-wrap items-center justify-center"
          style={{ background: "rgba(47,212,138,0.03)", backdropFilter: "blur(20px)", border: "1px solid rgba(47,212,138,0.1)", padding: "24px 36px" }}>
          {TRUST_BAR.map((item, i) => (
            <div key={item.l} className="text-center flex-1" style={{ minWidth: 110, padding: "0 24px", borderRight: i < 3 ? "1px solid rgba(47,212,138,0.1)" : "none" }}>
              <div className="font-display font-bold gradient-gold mb-1" style={{ fontSize: "clamp(1.3rem, 3.5vw, 1.75rem)" }}>{item.v}</div>
              <div className="text-gray-600" style={{ fontSize: "0.67rem", letterSpacing: "0.04em" }}>{item.l}</div>
            </div>
          ))}
        </motion.div>
      </div>

      <div className="absolute inset-x-0 bottom-0 h-px gold-rule" />
    </section>
  );
}
