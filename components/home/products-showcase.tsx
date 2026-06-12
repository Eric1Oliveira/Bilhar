"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Sparkles, Eye } from "lucide-react";
import { formatCurrency } from "@/lib/utils";

const PRODUCTS = [
  {
    id: "1", slug: "pro-9-standard",
    name: "Pro 9 Standard", category: "Profissional", base_price: 7500,
    description: "Mesa 9 palmos profissional com madeira maciça e ardósia tripla importada.",
    feltColor: "#156845", woodColor: "#5C3318",
    badge: "Mais Vendida", badgeBg: "rgba(47,212,138,0.15)", badgeText: "#2FD48A",
    features: ["9 palmos", "Ardósia tripla", "Madeira maciça"],
  },
  {
    id: "2", slug: "snooker-royal-12p",
    name: "Snooker Royal 12P", category: "Snooker", base_price: 12000,
    description: "Mesa de snooker padrão oficial, estrutura robusta e acabamento de alto luxo.",
    feltColor: "#1a4a2e", woodColor: "#3D2314",
    badge: "Premium", badgeBg: "rgba(201,150,58,0.18)", badgeText: "#E0B258",
    features: ["12 palmos", "Padrão oficial", "Garantia 5 anos"],
  },
  {
    id: "3", slug: "lazer-plus-8",
    name: "Lazer Plus 8", category: "Lazer", base_price: 4500,
    description: "Perfeita para residências. Design moderno com feltro colorido e montagem rápida.",
    feltColor: "#1B3A6B", woodColor: "#7A4520",
    badge: "Para Casa", badgeBg: "rgba(96,165,250,0.15)", badgeText: "#60a5fa",
    features: ["8 palmos", "Feltro colorido", "Design moderno"],
  },
  {
    id: "4", slug: "compacta-urban-7",
    name: "Compacta Urban 7", category: "Compacta", base_price: 3200,
    description: "Ideal para espaços menores. Versatilidade sem abrir mão da qualidade.",
    feltColor: "#2D2D3D", woodColor: "#3D2314",
    badge: "Novo", badgeBg: "rgba(168,85,247,0.14)", badgeText: "#c084fc",
    features: ["7 palmos", "Compacta", "Fácil manutenção"],
  },
];

const POCKETS_CORNER = [{ top: "5%", left: "3.5%" }, { top: "5%", right: "3.5%" }, { bottom: "5%", left: "3.5%" }, { bottom: "5%", right: "3.5%" }];

function TablePreview({ feltColor, woodColor }: { feltColor: string; woodColor: string }) {
  return (
    <div className="relative w-full h-full rounded-xl overflow-hidden"
      style={{ background: feltColor, backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 5px, rgba(0,0,0,0.04) 5px, rgba(0,0,0,0.04) 6px), repeating-linear-gradient(90deg, transparent, transparent 5px, rgba(0,0,0,0.04) 5px, rgba(0,0,0,0.04) 6px)", boxShadow: `inset 0 0 50px rgba(0,0,0,0.55), 0 0 0 9px ${woodColor}` }}>
      <div className="absolute inset-0 rounded-xl" style={{ border: `9px solid ${woodColor}`, background: "transparent" }} />
      {POCKETS_CORNER.map((s, i) => (
        <div key={i} className="absolute rounded-full" style={{ ...s, width: 16, height: 16, background: "#020202", border: "2px solid rgba(92,51,24,0.7)" }} />
      ))}
      <div className="absolute rounded-full" style={{ top: "50%", left: "1.5%", transform: "translateY(-50%)", width: 13, height: 13, background: "#020202", border: "2px solid rgba(92,51,24,0.7)" }} />
      <div className="absolute rounded-full" style={{ top: "50%", right: "1.5%", transform: "translateY(-50%)", width: 13, height: 13, background: "#020202", border: "2px solid rgba(92,51,24,0.7)" }} />
      <div className="absolute" style={{ top: "13%", bottom: "13%", left: "50%", width: 1, background: "rgba(255,255,255,0.07)" }} />
      <div className="absolute rounded-full" style={{ top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 17, height: 17, background: "radial-gradient(circle at 35% 30%, #fff, #d8d8d8)", boxShadow: "0 0 10px rgba(255,255,255,0.4)" }} />
    </div>
  );
}

function ProductCard({ product }: { product: typeof PRODUCTS[0] }) {
  return (
    <>
      {/* Table preview */}
      <div className="relative flex-shrink-0" style={{ height: 200, background: "#09090F" }}>
        <div className="absolute inset-0 flex items-center justify-center p-7">
          <TablePreview feltColor={product.feltColor} woodColor={product.woodColor} />
        </div>
        <div className="absolute top-3 left-3">
          <span className="font-bold px-2.5 py-1 rounded-full" style={{ fontSize: "0.6rem", background: product.badgeBg, color: product.badgeText }}>{product.badge}</span>
        </div>
        {/* Hover overlay */}
        <div className="absolute inset-0 flex items-end justify-center pb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{ background: "linear-gradient(to top, rgba(9,9,15,0.92) 0%, rgba(9,9,15,0.2) 50%, transparent 100%)" }}>
          <Link href={`/configurador?produto=${product.id}`} className="btn-gold rounded-lg gap-2" style={{ padding: "9px 16px", fontSize: "0.74rem" }}>
            <Sparkles className="w-3.5 h-3.5" />
            Personalizar
          </Link>
        </div>
      </div>

      {/* Card content */}
      <div className="flex flex-col flex-1 p-5 sm:p-6">
        <div className="mb-3">
          <span className="font-bold tracking-widest uppercase" style={{ fontSize: "0.58rem", color: "#2FD48A" }}>{product.category}</span>
          <h3 className="font-display font-bold text-white mt-1 leading-tight" style={{ fontSize: "1.2rem" }}>{product.name}</h3>
        </div>
        <p className="text-gray-400 leading-relaxed mb-4" style={{ fontSize: "0.875rem" }}>{product.description}</p>
        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-5">
          {product.features.map((f) => (
            <span key={f} className="font-medium" style={{ fontSize: "0.6rem", padding: "4px 10px", borderRadius: "9999px", background: "rgba(47,212,138,0.06)", border: "1px solid rgba(47,212,138,0.14)", color: "rgba(47,212,138,0.75)" }}>{f}</span>
          ))}
        </div>
        {/* Price + actions */}
        <div className="mt-auto pt-4 flex items-end justify-between" style={{ borderTop: "1px solid rgba(47,212,138,0.08)" }}>
          <div>
            <p className="text-gray-600 mb-0.5" style={{ fontSize: "0.6rem" }}>A partir de</p>
            <p className="font-display font-bold gradient-gold" style={{ fontSize: "1.4rem" }}>{formatCurrency(product.base_price)}</p>
          </div>
          <div className="flex gap-2">
            <Link href={`/produto/${product.slug}`} className="btn-outline-gold rounded-lg" style={{ padding: "8px 13px", fontSize: "0.7rem" }}>Detalhes</Link>
            <Link href={`/configurador?produto=${product.id}`} className="btn-gold rounded-lg gap-1.5" style={{ padding: "8px 13px", fontSize: "0.7rem" }}>
              <Sparkles className="w-3 h-3" />Config.
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export function ProductsShowcase() {
  return (
    <section className="relative overflow-hidden" style={{ padding: "96px 0 112px", background: "#09090F" }}>
      <div className="absolute inset-x-0 top-0 h-32 pointer-events-none" style={{ background: "linear-gradient(to bottom, #0E0E1A, transparent)" }} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
          className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6 mb-12 sm:mb-16">
          <div>
            <span className="section-label mb-3">Nossa Coleção</span>
            <span className="gold-rule-short mb-5" style={{ display: "block" }} />
            <h2 className="section-title">Mesas em <span className="gradient-emerald">destaque</span></h2>
          </div>
          <Link href="/catalogo" className="flex items-center gap-2 font-semibold transition-colors group flex-shrink-0" style={{ fontSize: "0.875rem", color: "#2FD48A" }}>
            Ver Catálogo Completo
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
          </Link>
        </motion.div>

        {/* Mobile carousel */}
        <div className="lg:hidden">
          <div className="flex gap-4 pb-4 snap-x snap-mandatory" style={{ overflowX: "auto", scrollbarWidth: "none" }}>
            {PRODUCTS.map((product, i) => (
              <motion.div key={product.id}
                initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07, duration: 0.5 }}
                className="snap-center flex-shrink-0 rounded-2xl overflow-hidden flex flex-col"
                style={{ width: "80vw", maxWidth: 320, background: "linear-gradient(160deg, #14141E 0%, #0E0E1A 100%)", border: "1px solid rgba(47,212,138,0.14)", borderTopColor: "rgba(47,212,138,0.38)" }}>
                <ProductCard product={product} />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Desktop grid — 3 cards */}
        <div className="hidden lg:grid grid-cols-3 gap-8">
          {PRODUCTS.slice(0, 3).map((product, i) => (
            <motion.div key={product.id}
              initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.55 }}
              className="group rounded-2xl overflow-hidden flex flex-col card-hover"
              style={{ background: "linear-gradient(160deg, #14141E 0%, #0E0E1A 100%)", border: "1px solid rgba(47,212,138,0.14)", borderTopColor: "rgba(47,212,138,0.38)" }}>
              <ProductCard product={product} />
            </motion.div>
          ))}
        </div>

        {/* 4th product — horizontal wide card */}
        <motion.div initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3, duration: 0.55 }}
          className="hidden lg:flex rounded-2xl overflow-hidden card-hover mt-8"
          style={{ background: "linear-gradient(160deg, #14141E 0%, #0E0E1A 100%)", border: "1px solid rgba(47,212,138,0.14)", borderTopColor: "rgba(47,212,138,0.38)", minHeight: 200 }}>
          <div className="flex-shrink-0 relative" style={{ width: 280, background: "#09090F" }}>
            <div className="absolute inset-0 flex items-center justify-center p-8">
              <TablePreview feltColor={PRODUCTS[3].feltColor} woodColor={PRODUCTS[3].woodColor} />
            </div>
            <div className="absolute top-4 left-4">
              <span className="text-xs font-bold px-2.5 py-1 rounded-full" style={{ background: PRODUCTS[3].badgeBg, color: PRODUCTS[3].badgeText, fontSize: "0.63rem" }}>{PRODUCTS[3].badge}</span>
            </div>
          </div>
          <div className="flex flex-col justify-center flex-1 px-8 py-8">
            <span className="font-bold tracking-widest uppercase mb-1" style={{ fontSize: "0.58rem", color: "#2FD48A" }}>{PRODUCTS[3].category}</span>
            <h3 className="font-display font-bold text-white mb-2" style={{ fontSize: "1.5rem" }}>{PRODUCTS[3].name}</h3>
            <p className="text-gray-400 mb-6" style={{ fontSize: "0.9rem", maxWidth: 480 }}>{PRODUCTS[3].description}</p>
            <div className="flex items-center gap-6">
              <div>
                <span className="text-gray-600 block" style={{ fontSize: "0.63rem" }}>A partir de</span>
                <span className="font-display font-bold gradient-gold" style={{ fontSize: "1.75rem" }}>{formatCurrency(PRODUCTS[3].base_price)}</span>
              </div>
              <div className="flex gap-3 ml-auto">
                <Link href={`/produto/${PRODUCTS[3].slug}`} className="btn-outline-gold rounded-xl gap-2" style={{ padding: "12px 20px", fontSize: "0.8rem" }}>
                  <Eye className="w-4 h-4" />Ver Detalhes
                </Link>
                <Link href={`/configurador?produto=${PRODUCTS[3].id}`} className="btn-gold rounded-xl gap-2" style={{ padding: "12px 20px", fontSize: "0.8rem" }}>
                  <Sparkles className="w-4 h-4" />Configurar
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
