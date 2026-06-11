"use client";

import { motion } from "framer-motion";
import { Settings, Zap, Truck, Shield, RefreshCw, Award } from "lucide-react";

const FEATURES = [
  {
    Icon: Settings,
    title: "Configurador 3D",
    description:
      "Monte sua mesa ideal em tempo real. Escolha madeira, feltro, pernas e acessórios com visualização instantânea.",
    iconBg: "rgba(130,0,0,0.15)",
    iconBorder: "rgba(130,0,0,0.3)",
    iconColor: "#ef4444",
  },
  {
    Icon: Zap,
    title: "Realidade Aumentada",
    description:
      "Veja a mesa no seu espaço real antes de comprar. Tecnologia AR que elimina dúvidas e surpreende.",
    iconBg: "rgba(201,168,76,0.12)",
    iconBorder: "rgba(201,168,76,0.28)",
    iconColor: "#c9a84c",
  },
  {
    Icon: Truck,
    title: "Entrega Nacional",
    description:
      "Entrega e montagem profissional em todo o Brasil. Equipe treinada, agendamento no horário certo.",
    iconBg: "rgba(59,130,246,0.1)",
    iconBorder: "rgba(59,130,246,0.22)",
    iconColor: "#60a5fa",
  },
  {
    Icon: Shield,
    title: "Garantia de 5 Anos",
    description:
      "Estrutura garantida por 5 anos. Feltro e acessórios com 2 anos. Peças originais sempre disponíveis.",
    iconBg: "rgba(168,85,247,0.1)",
    iconBorder: "rgba(168,85,247,0.22)",
    iconColor: "#c084fc",
  },
  {
    Icon: RefreshCw,
    title: "Feltro Importado",
    description:
      "Trabalhamos somente com feltros importados de primeira linha. Durabilidade superior e toque profissional.",
    iconBg: "rgba(34,197,94,0.08)",
    iconBorder: "rgba(34,197,94,0.2)",
    iconColor: "#4ade80",
  },
  {
    Icon: Award,
    title: "Personalização Total",
    description:
      "Centenas de combinações de acabamento. Crie uma mesa única que reflete seu estilo e espaço.",
    iconBg: "rgba(201,168,76,0.1)",
    iconBorder: "rgba(201,168,76,0.22)",
    iconColor: "#c9a84c",
  },
];

export function FeaturesSection() {
  return (
    <section
      className="relative overflow-hidden"
      style={{ padding: "96px 0", background: "#0d0d0d" }}
    >
      {/* Top rule */}
      <div className="absolute inset-x-0 top-0 h-px gold-rule" />

      {/* Ambient center glow */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "60vw",
          height: "60vw",
          maxWidth: 700,
          maxHeight: 700,
          background: "radial-gradient(circle, rgba(201,168,76,0.03) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 sm:mb-20"
        >
          <span className="section-label mb-4">Por que escolher</span>
          <span className="gold-rule-short mx-auto mb-6" style={{ display: "block" }} />
          <h2 className="section-title mb-5">
            Experiência <span className="gradient-gold">única</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto leading-relaxed" style={{ fontSize: "clamp(0.95rem, 2vw, 1.125rem)" }}>
            Da configuração 3D à entrega na sua casa — a melhor experiência do mercado brasileiro de bilhar.
          </p>
        </motion.div>

        {/* ── Feature Grid ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURES.map((feat, index) => (
            <motion.div
              key={feat.title}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08, duration: 0.55 }}
              className="group relative rounded-2xl card-hover cursor-default"
              style={{
                background: "linear-gradient(160deg, #0f0f0f 0%, #0d0d0d 100%)",
                border: "1px solid rgba(201,168,76,0.14)",
                borderTopColor: "rgba(201,168,76,0.45)",
                padding: "32px",
              }}
            >
              {/* Top gold border accent */}
              <div
                className="absolute top-0 left-8 right-8 h-0.5 rounded-b-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: "linear-gradient(90deg, transparent, rgba(201,168,76,0.5), transparent)" }}
              />

              {/* Icon */}
              <div
                className="flex items-center justify-center rounded-xl mb-6 flex-shrink-0"
                style={{
                  width: 52,
                  height: 52,
                  background: feat.iconBg,
                  border: `1px solid ${feat.iconBorder}`,
                }}
              >
                <feat.Icon style={{ width: 22, height: 22, color: feat.iconColor }} />
              </div>

              <h3
                className="font-display font-semibold text-white mb-3 leading-tight"
                style={{ fontSize: "1.15rem" }}
              >
                {feat.title}
              </h3>
              <p className="text-gray-400 leading-relaxed" style={{ fontSize: "0.9rem" }}>
                {feat.description}
              </p>

              {/* Hover glow */}
              <div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none"
                style={{
                  boxShadow: "0 0 40px rgba(201,168,76,0.06)",
                }}
              />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Bottom rule */}
      <div className="absolute inset-x-0 bottom-0 h-px gold-rule" />
    </section>
  );
}
