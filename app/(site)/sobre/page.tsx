"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Shield, Award, Truck, Users, Target, Heart, ArrowRight } from "lucide-react";

const STATS = [
  { value: "500+", label: "Mesas Entregues" },
  { value: "5+",   label: "Anos no Mercado" },
  { value: "4.9/5", label: "Avaliação Média" },
  { value: "12",   label: "Estados Atendidos" },
];

const VALUES = [
  { Icon: Shield, title: "Qualidade sem Compromisso",  desc: "Cada mesa sai da fábrica com inspeção rigorosa. Utilizamos somente materiais de primeira linha — ardósia certificada, feltros importados e madeiras nobres.",        ic: "#2FD48A",  bg: "rgba(47,212,138,0.08)", bd: "rgba(47,212,138,0.2)" },
  { Icon: Target, title: "Precisão Artesanal",         desc: "Cada detalhe é pensado por mestres marceneiros com décadas de experiência no bilhar profissional. O nivelamento e acabamento são testados antes da entrega.",       ic: "#E0B258",  bg: "rgba(201,150,58,0.08)", bd: "rgba(201,150,58,0.22)" },
  { Icon: Truck,  title: "Entrega Especializada",      desc: "Nossa equipe própria entrega e instala a mesa no local escolhido, com agendamento flexível. Nenhum terceiro manuseando o seu investimento.",                          ic: "#60a5fa",  bg: "rgba(59,130,246,0.08)", bd: "rgba(59,130,246,0.2)" },
  { Icon: Heart,  title: "Suporte Pós-Venda Real",     desc: "Não sumimos após a venda. Nosso suporte continua disponível durante toda a vida útil do produto, com peças originais sempre em estoque.",                           ic: "#c084fc",  bg: "rgba(168,85,247,0.08)", bd: "rgba(168,85,247,0.2)" },
  { Icon: Award,  title: "Inovação Contínua",          desc: "Primeiro configurador 3D de mesas de bilhar no Brasil. Investimos constantemente em tecnologia para que você tome a melhor decisão.",                               ic: "#2FD48A",  bg: "rgba(47,212,138,0.08)", bd: "rgba(47,212,138,0.2)" },
  { Icon: Users,  title: "Comunidade",                 desc: "Mais de 500 clientes satisfeitos formam uma comunidade que cresce junto. Eventos, torneios e um grupo exclusivo de bilhar profissional.",                           ic: "#E0B258",  bg: "rgba(201,150,58,0.08)", bd: "rgba(201,150,58,0.22)" },
];

const TIMELINE = [
  { year: "2019", title: "Fundação",         desc: "Nascemos em São Paulo com a missão de democratizar o acesso a mesas de bilhar profissionais." },
  { year: "2020", title: "Expansão Nacional", desc: "Começamos a atender todo o Brasil com logística própria e equipe de instalação treinada." },
  { year: "2022", title: "Configurador 3D",   desc: "Lançamos o primeiro configurador 3D de mesas de bilhar do Brasil, revolucionando a experiência de compra." },
  { year: "2023", title: "Aluguel e AR",      desc: "Introduzimos os planos de aluguel flexível e a visualização em Realidade Aumentada, trazendo o produto até você." },
  { year: "2024", title: "500 Clientes",      desc: "Superamos 500 mesas entregues em 12 estados, mantendo avaliação média de 4.9 estrelas." },
];

const EB = "rgba(47,212,138,0.1)";

export default function SobrePage() {
  return (
    <div className="min-h-screen bg-bilhar-dark pt-20">

      {/* Hero */}
      <section className="relative overflow-hidden" style={{ padding: "80px 0 100px", background: "#09090F" }}>
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute rounded-full" style={{ top: "-15%", right: "-10%", width: "50vw", height: "50vw", maxWidth: 650, maxHeight: 650, background: "radial-gradient(circle, rgba(26,122,82,0.1) 0%, transparent 70%)", filter: "blur(80px)" }} />
          <div className="absolute rounded-full" style={{ bottom: "0", left: "-5%", width: "35vw", height: "35vw", maxWidth: 450, maxHeight: 450, background: "radial-gradient(circle, rgba(47,212,138,0.05) 0%, transparent 70%)", filter: "blur(70px)" }} />
        </div>
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-center">
            <span className="section-label mb-4">Nossa história</span>
            <span className="gold-rule-short mx-auto mb-8" style={{ display: "block" }} />
            <h1 className="font-display font-bold text-white leading-tight mb-6" style={{ fontSize: "clamp(2.2rem, 6vw, 4rem)", letterSpacing: "-0.02em" }}>
              Nascemos para elevar o padrão{" "}
              <span className="gradient-emerald">do bilhar no Brasil</span>
            </h1>
            <p className="text-gray-400 leading-relaxed max-w-2xl mx-auto" style={{ fontSize: "clamp(1rem, 2.5vw, 1.15rem)" }}>
              A Sinuca Ideal nasceu da paixão pelo bilhar e da frustração com o que o mercado oferecia. Decidimos mudar isso — de ponta a ponta.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section style={{ padding: "64px 0", background: "#0E0E1A", borderTop: `1px solid ${EB}` }}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {STATS.map((stat, i) => (
              <motion.div key={stat.label} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                className="glass-card p-6 text-center">
                <div className="font-display font-bold gradient-gold mb-1" style={{ fontSize: "clamp(2rem, 4vw, 2.5rem)" }}>{stat.value}</div>
                <div className="text-gray-400 text-sm">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Story + Timeline */}
      <section style={{ padding: "80px 0", background: "#09090F", borderTop: `1px solid ${EB}` }}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <motion.div initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <span className="section-label mb-3">Quem somos</span>
              <span className="gold-rule-short mb-6" style={{ display: "block" }} />
              <h2 className="section-title mb-6">Mais do que mesas —{" "}<span className="gradient-emerald">experiências</span></h2>
              <div className="space-y-4 text-gray-400 leading-relaxed" style={{ fontSize: "0.95rem" }}>
                <p>A Sinuca Ideal foi fundada em 2019 por apaixonados pelo bilhar que viram um mercado carente de inovação e qualidade consistente. A proposta era simples: criar a melhor experiência de compra de mesa de bilhar do Brasil — do primeiro clique até a mesa nivelada na sua sala.</p>
                <p>Desenvolvemos parcerias exclusivas com fabricantes europeus de feltro e ardósia, e trabalhamos com marceneiros especializados que entendem o impacto de cada milímetro no desempenho do jogo.</p>
                <p>Em 2022, lançamos o configurador 3D — uma tecnologia inédita no mercado brasileiro que permite visualizar, personalizar e precificar sua mesa em tempo real, antes mesmo de fazer o pedido.</p>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="space-y-4">
              {TIMELINE.map((item, i) => (
                <motion.div key={item.year} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                  className="flex gap-5 items-start">
                  <div className="flex-shrink-0 font-display font-bold gradient-emerald text-right" style={{ fontSize: "1rem", minWidth: 40 }}>{item.year}</div>
                  <div style={{ borderLeft: "2px solid rgba(47,212,138,0.25)", paddingLeft: 20 }}>
                    <h4 className="font-semibold text-white text-sm mb-1">{item.title}</h4>
                    <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section style={{ padding: "80px 0", background: "#0E0E1A", borderTop: `1px solid ${EB}` }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <span className="section-label mb-3">Nossos valores</span>
            <span className="gold-rule-short mx-auto mb-5" style={{ display: "block" }} />
            <h2 className="section-title">O que <span className="gradient-emerald">nos guia</span></h2>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {VALUES.map(({ Icon, title, desc, ic, bg, bd }, i) => (
              <motion.div key={title} initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                className="glass-card p-6 card-hover">
                <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-5" style={{ background: bg, border: `1px solid ${bd}` }}>
                  <Icon style={{ width: 20, height: 20, color: ic }} />
                </div>
                <h3 className="font-semibold text-white text-base mb-2">{title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: "80px 0", background: "#09090F", borderTop: `1px solid ${EB}` }}>
        <div className="max-w-3xl mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="font-display font-bold text-3xl text-white mb-4">
              Pronto para ter a sua{" "}<span className="gradient-emerald">mesa ideal?</span>
            </h2>
            <p className="text-gray-400 mb-8">Configure do jeito que você sempre quis. Sem compromisso, sem burocracia.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/configurador" className="btn-gold rounded-xl gap-2 py-4 px-8 text-sm font-semibold flex items-center justify-center">
                Configurar Mesa <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="/catalogo" className="btn-outline-gold rounded-xl gap-2 py-4 px-8 text-sm font-semibold flex items-center justify-center">
                Ver Catálogo
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
