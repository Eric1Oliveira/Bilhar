"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Check, ArrowRight, Sparkles, Calendar, Truck, Shield, RefreshCw, Phone, Star } from "lucide-react";
import { formatCurrency } from "@/lib/utils";

const PLANS = [
  {
    months: 6, label: "6 Meses", highlight: false,
    desc: "Ideal para eventos, festas ou experimentar antes de comprar.",
    products: [
      { name: "Lazer Plus 8", price: 590 }, { name: "Compacta Urban 7", price: 420 },
      { name: "Semi Pro 9 Elite", price: 720 }, { name: "Pro 9 Standard", price: 890 },
      { name: "Championship Pro 10", price: 1200 }, { name: "Snooker Royal 12P", price: 1450 },
    ],
  },
  {
    months: 12, label: "12 Meses", highlight: true,
    desc: "O plano mais escolhido. Melhor custo-benefício para uso regular.",
    products: [
      { name: "Lazer Plus 8", price: 480 }, { name: "Compacta Urban 7", price: 350 },
      { name: "Semi Pro 9 Elite", price: 590 }, { name: "Pro 9 Standard", price: 750 },
      { name: "Championship Pro 10", price: 990 }, { name: "Snooker Royal 12P", price: 1200 },
    ],
  },
  {
    months: 24, label: "24 Meses", highlight: false,
    desc: "Para quem quer custo mínimo a longo prazo com a opção de compra ao final.",
    products: [
      { name: "Lazer Plus 8", price: 390 }, { name: "Compacta Urban 7", price: 290 },
      { name: "Semi Pro 9 Elite", price: 480 }, { name: "Pro 9 Standard", price: 620 },
      { name: "Championship Pro 10", price: 820 }, { name: "Snooker Royal 12P", price: 980 },
    ],
  },
];

const BENEFITS = [
  { Icon: Truck,     title: "Entrega e Instalação", desc: "Equipe especializada instala a mesa no local escolhido, sem custo adicional." },
  { Icon: Shield,    title: "Manutenção Inclusa",   desc: "Qualquer problema durante o contrato? A gente resolve sem cobrar nada extra." },
  { Icon: RefreshCw, title: "Troca de Feltro",      desc: "Feltro desgastado? Substituição inclusa uma vez por contrato." },
  { Icon: Calendar,  title: "Opção de Compra",      desc: "Ao término do contrato, você pode adquirir a mesa com desconto especial." },
];

const HOW_IT_WORKS = [
  { num: "01", title: "Escolha o modelo",    desc: "Selecione a mesa que melhor se encaixa no seu espaço e objetivo." },
  { num: "02", title: "Personalize",         desc: "Use o configurador 3D para escolher cor do feltro, madeira e acessórios." },
  { num: "03", title: "Assine o contrato",   desc: "Processo 100% digital. Assine em minutos pelo celular ou computador." },
  { num: "04", title: "Receba em casa",      desc: "Nossa equipe entrega, monta e nivela a mesa no local que você preferir." },
];

const TESTIMONIALS = [
  { name: "Marco Antônio", location: "SP", rating: 5, text: "Aluguei por 12 meses e foi a melhor decisão. No fim, comprei a mesa com ótimo desconto. Atendimento impecável." },
  { name: "Fernanda Lima",  location: "RJ", rating: 5, text: "Precisava de uma mesa para o salão que abri. O aluguel de 24 meses ficou no meu orçamento e a qualidade é profissional." },
];

const EB  = "rgba(47,212,138,0.1)";
const EB2 = "rgba(47,212,138,0.08)";
const EB3 = "rgba(47,212,138,0.22)";

export default function AlugarPage() {
  return (
    <div className="min-h-screen bg-bilhar-dark pt-20">

      {/* Hero */}
      <section className="relative overflow-hidden" style={{ padding: "80px 0 100px", background: "#09090F" }}>
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute rounded-full" style={{ top: "-20%", left: "-10%", width: "55vw", height: "55vw", maxWidth: 700, maxHeight: 700, background: "radial-gradient(circle, rgba(26,122,82,0.1) 0%, transparent 70%)", filter: "blur(80px)" }} />
          <div className="absolute rounded-full" style={{ bottom: "-10%", right: "-5%", width: "40vw", height: "40vw", maxWidth: 500, maxHeight: 500, background: "radial-gradient(circle, rgba(47,212,138,0.05) 0%, transparent 70%)", filter: "blur(70px)" }} />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="section-label mb-4">Aluguel de Mesas</span>
            <span className="gold-rule-short mx-auto mb-8" style={{ display: "block" }} />
            <h1 className="font-display font-bold text-white leading-tight mb-6" style={{ fontSize: "clamp(2.2rem, 6vw, 4rem)", letterSpacing: "-0.02em" }}>
              Tenha uma mesa profissional{" "}
              <span className="gradient-emerald">sem pagar tudo de uma vez</span>
            </h1>
            <p className="text-gray-400 leading-relaxed mb-10 max-w-2xl mx-auto" style={{ fontSize: "clamp(1rem, 2.5vw, 1.15rem)" }}>
              Planos flexíveis de 6 a 24 meses. Entrega, montagem e manutenção inclusos. Cancele com aviso prévio de 30 dias.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/configurador" className="btn-gold rounded-xl gap-2.5 justify-center py-4 px-8 text-sm font-semibold flex items-center">
                <Sparkles className="w-4 h-4" />Configurar e Alugar
              </Link>
              <Link href="/catalogo" className="btn-outline-gold rounded-xl gap-2.5 justify-center py-4 px-8 text-sm font-semibold flex items-center">
                Ver Catálogo
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* How it works */}
      <section style={{ padding: "80px 0", background: "#0E0E1A", borderTop: `1px solid ${EB}` }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <span className="section-label mb-3">Como funciona</span>
            <span className="gold-rule-short mx-auto mb-5" style={{ display: "block" }} />
            <h2 className="section-title">4 passos simples</h2>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {HOW_IT_WORKS.map((step, i) => (
              <motion.div key={step.num} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                className="glass-card p-6 card-hover">
                <div className="font-display font-bold gradient-emerald mb-4" style={{ fontSize: "2.5rem" }}>{step.num}</div>
                <h3 className="font-semibold text-white text-base mb-2">{step.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Plans */}
      <section style={{ padding: "80px 0 96px", background: "#09090F", borderTop: `1px solid ${EB}` }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <span className="section-label mb-3">Planos</span>
            <span className="gold-rule-short mx-auto mb-5" style={{ display: "block" }} />
            <h2 className="section-title">Escolha o plano <span className="gradient-emerald">ideal</span></h2>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-6">
            {PLANS.map((plan, i) => (
              <motion.div key={plan.months} initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="relative flex flex-col rounded-2xl overflow-hidden"
                style={{
                  background: "linear-gradient(160deg, #14141E 0%, #0E0E1A 100%)",
                  border: plan.highlight ? "2px solid rgba(47,212,138,0.5)" : "1px solid rgba(47,212,138,0.15)",
                  borderTopColor: plan.highlight ? "rgba(47,212,138,0.8)" : "rgba(47,212,138,0.35)",
                }}>
                {plan.highlight && (
                  <div className="absolute top-0 inset-x-0 flex justify-center">
                    <span className="text-[10px] font-bold px-4 py-1 rounded-b-lg" style={{ background: "linear-gradient(135deg,#156845,#2FD48A)", color: "#fff", letterSpacing: "0.12em" }}>
                      MAIS POPULAR
                    </span>
                  </div>
                )}
                <div className="p-6 pt-8">
                  <h3 className="font-display font-bold text-2xl text-white mb-1">{plan.label}</h3>
                  <p className="text-sm text-gray-400 mb-6">{plan.desc}</p>
                  <div className="space-y-2 mb-6">
                    {plan.products.slice(0, 4).map((p) => (
                      <div key={p.name} className="flex items-center justify-between text-sm">
                        <span className="text-gray-400">{p.name}</span>
                        <span className="font-semibold text-white">{formatCurrency(p.price)}<span className="text-xs text-gray-500">/mês</span></span>
                      </div>
                    ))}
                    <div className="text-xs pt-1" style={{ color: "#2FD48A" }}>+ {plan.products.length - 4} opções de modelo</div>
                  </div>
                  <ul className="space-y-2 mb-6">
                    {["Entrega e montagem", "Manutenção inclusa", "Seguro contra danos", "Suporte prioritário"].map((item) => (
                      <li key={item} className="flex items-center gap-2 text-sm text-gray-300">
                        <Check className="w-3.5 h-3.5 flex-shrink-0" style={{ color: "#2FD48A" }} />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <Link href="/configurador"
                    className={`w-full justify-center rounded-xl gap-2 py-3 text-sm font-semibold flex items-center ${plan.highlight ? "btn-gold" : "btn-outline-gold"}`}>
                    Escolher este Plano <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section style={{ padding: "80px 0", background: "#0E0E1A", borderTop: `1px solid ${EB}` }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <span className="section-label mb-3">Benefícios</span>
            <span className="gold-rule-short mx-auto mb-5" style={{ display: "block" }} />
            <h2 className="section-title">Tudo <span className="gradient-emerald">incluído</span></h2>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {BENEFITS.map(({ Icon, title, desc }, i) => (
              <motion.div key={title} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                className="glass-card p-6 card-hover text-center">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4" style={{ background: EB2, border: `1px solid ${EB3}` }}>
                  <Icon style={{ width: 20, height: 20, color: "#2FD48A" }} />
                </div>
                <h3 className="font-semibold text-white text-base mb-2">{title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section style={{ padding: "72px 0", background: "#09090F", borderTop: `1px solid ${EB}` }}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-6">
            {TESTIMONIALS.map((t, i) => (
              <motion.div key={t.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="glass-card p-6">
                <div className="flex gap-0.5 mb-4">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star key={j} className="fill-current" style={{ width: 14, height: 14, color: "#E0B258" }} />
                  ))}
                </div>
                <p className="text-gray-300 text-sm italic leading-relaxed mb-4">&ldquo;{t.text}&rdquo;</p>
                <p className="text-white font-semibold text-sm">{t.name}</p>
                <p className="text-gray-500 text-xs">{t.location}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: "80px 0", background: "#0E0E1A", borderTop: `1px solid ${EB}` }}>
        <div className="max-w-3xl mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="font-display font-bold text-3xl text-white mb-4">
              Ainda tem <span className="gradient-emerald">dúvidas?</span>
            </h2>
            <p className="text-gray-400 mb-8">Fale com nosso time pelo WhatsApp e receba uma proposta personalizada.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="https://wa.me/5511999990000" className="btn-gold rounded-xl gap-2 py-4 px-8 text-sm font-semibold flex items-center justify-center">
                <Phone className="w-4 h-4" />Falar com Consultor
              </a>
              <Link href="/ajuda" className="btn-outline-gold rounded-xl gap-2 py-4 px-8 text-sm font-semibold flex items-center justify-center">
                Central de Ajuda
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
