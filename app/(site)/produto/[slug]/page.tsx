"use client";

import { notFound, useParams } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Sparkles, ShoppingCart, Check, Ruler, Weight, ArrowRight, Eye, Shield, Truck, Star } from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import { useCartStore } from "@/store/cart";
import { useState } from "react";
import type { Product } from "@/types";

const PRODUCTS: Product[] = [
  {
    id: "1",
    name: "Pro 9 Standard",
    slug: "pro-9-standard",
    description: "Mesa profissional 9 palmos com ardósia tripla e feltro importado. Ideal para salões, clubs e jogadores que exigem o melhor desempenho. Fabricada com madeira maciça selecionada e sistemas de nivelamento profissional.",
    category: "profissional",
    base_price: 7500,
    rental_price_6: 890,
    rental_price_12: 750,
    rental_price_24: 620,
    weight_kg: 320,
    dimensions: { width: 127, height: 80, length: 254 },
    features: ["Ardósia tripla 45mm", "Feltro Simonis 860 importado", "Madeira maciça selecionada", "Garantia 5 anos", "Nivelamento profissional", "Bolsos de couro genuíno", "Entrega + montagem inclusa"],
    images: [],
    model_3d_url: null,
    ar_model_url: null,
    is_active: true,
    is_featured: true,
    stock: 5,
    created_at: "2024-01-01",
  },
  {
    id: "2",
    name: "Snooker Royal 12P",
    slug: "snooker-royal-12p",
    description: "Mesa de snooker padrão oficial 12 palmos, certificada para competições regionais. Construção robusta em aço e madeira maciça para uso intensivo em clubes e campeonatos.",
    category: "profissional",
    base_price: 12000,
    rental_price_6: 1450,
    rental_price_12: 1200,
    rental_price_24: 980,
    weight_kg: 480,
    dimensions: { width: 175, height: 85, length: 357 },
    features: ["12 palmos padrão oficial", "Ardósia 5 peças 45mm", "Estrutura aço e madeira", "Bolsos de couro genuíno", "Certificada para competições", "Garantia 7 anos", "Entrega + montagem inclusa"],
    images: [],
    model_3d_url: null,
    ar_model_url: null,
    is_active: true,
    is_featured: true,
    stock: 2,
    created_at: "2024-01-01",
  },
  {
    id: "3",
    name: "Lazer Plus 8",
    slug: "lazer-plus-8",
    description: "Mesa 8 palmos para residências e espaços de lazer. Perfeita para reuniões familiares e entretenimento em casa. Design moderno com feltro colorido disponível em diversas opções.",
    category: "lazer",
    base_price: 4500,
    rental_price_6: 590,
    rental_price_12: 480,
    rental_price_24: 390,
    weight_kg: 220,
    dimensions: { width: 100, height: 78, length: 200 },
    features: ["8 palmos", "Feltro colorido disponível", "Design moderno", "Fácil montagem", "Ideal para residências", "Garantia 3 anos", "Entrega + montagem inclusa"],
    images: [],
    model_3d_url: null,
    ar_model_url: null,
    is_active: true,
    is_featured: false,
    stock: 8,
    created_at: "2024-01-01",
  },
  {
    id: "4",
    name: "Semi Pro 9 Elite",
    slug: "semi-pro-9-elite",
    description: "O equilíbrio perfeito entre qualidade profissional e preço acessível. Mesa 9 palmos com ardósia dupla para jogadores exigentes que buscam alta performance sem o custo de uma linha profissional completa.",
    category: "semi-profissional",
    base_price: 5800,
    rental_price_6: 720,
    rental_price_12: 590,
    rental_price_24: 480,
    weight_kg: 280,
    dimensions: { width: 127, height: 80, length: 254 },
    features: ["9 palmos", "Ardósia dupla 30mm", "MDF com revestimento premium", "Garantia 3 anos", "Feltro semi-profissional", "Pernas torneadas", "Entrega + montagem inclusa"],
    images: [],
    model_3d_url: null,
    ar_model_url: null,
    is_active: true,
    is_featured: false,
    stock: 6,
    created_at: "2024-01-01",
  },
  {
    id: "5",
    name: "Compacta Urban 7",
    slug: "compacta-urban-7",
    description: "Máxima diversão em espaços reduzidos. 7 palmos com design contemporâneo, ideal para apartamentos e salas pequenas. As pernas dobráveis facilitam o armazenamento quando necessário.",
    category: "compacta",
    base_price: 3200,
    rental_price_6: 420,
    rental_price_12: 350,
    rental_price_24: 290,
    weight_kg: 160,
    dimensions: { width: 89, height: 76, length: 178 },
    features: ["7 palmos", "Pernas dobráveis", "Ideal para apartamentos", "MDF Premium", "Design contemporâneo", "Garantia 2 anos", "Entrega + montagem inclusa"],
    images: [],
    model_3d_url: null,
    ar_model_url: null,
    is_active: true,
    is_featured: false,
    stock: 10,
    created_at: "2024-01-01",
  },
  {
    id: "6",
    name: "Championship Pro 10",
    slug: "championship-pro-10",
    description: "Mesa 10 palmos para campeonatos regionais. Construção premium com ardósia italiana e acabamento de altíssimo padrão. Para quem não aceita nada menos que o melhor.",
    category: "profissional",
    base_price: 9800,
    rental_price_6: 1200,
    rental_price_12: 990,
    rental_price_24: 820,
    weight_kg: 380,
    dimensions: { width: 140, height: 82, length: 280 },
    features: ["10 palmos", "Ardósia italiana premium", "Bolsos couro genuíno", "Garantia 7 anos", "Ideal para campeonatos", "Estrutura aço reforçado", "Entrega + montagem inclusa"],
    images: [],
    model_3d_url: null,
    ar_model_url: null,
    is_active: true,
    is_featured: true,
    stock: 3,
    created_at: "2024-01-01",
  },
];

const FELT_COLORS = [
  { name: "Carmim", hex: "#820000" },
  { name: "Verde", hex: "#1a4a2e" },
  { name: "Azul", hex: "#1B3A6B" },
  { name: "Preto", hex: "#1C1C1C" },
  { name: "Cinza", hex: "#5a5a5a" },
  { name: "Vinho", hex: "#722F37" },
];

const WOOD_COLORS = [
  { name: "Nogueira", hex: "#6B3A2A" },
  { name: "Mogno", hex: "#8B2500" },
  { name: "Carvalho", hex: "#9C7B4E" },
  { name: "Natural", hex: "#DEB887" },
  { name: "Ébano", hex: "#2C1810" },
  { name: "Wengê", hex: "#3D2314" },
];

const CATEGORY_LABELS: Record<string, string> = {
  profissional: "Profissional",
  "semi-profissional": "Semi-Profissional",
  lazer: "Lazer",
  compacta: "Compacta",
};

export default function ProdutoPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const product = PRODUCTS.find((p) => p.slug === slug);

  const { addItem } = useCartStore();
  const [pricingTab, setPricingTab] = useState<"compra" | "aluguel">("compra");
  const [selectedFelt, setSelectedFelt] = useState(0);
  const [selectedWood, setSelectedWood] = useState(0);

  if (!product) return notFound();

  const feltColor = FELT_COLORS[selectedFelt].hex;
  const woodColor = WOOD_COLORS[selectedWood].hex;

  const relatedProducts = PRODUCTS.filter((p) => p.id !== product.id && p.category === product.category).slice(0, 3);

  return (
    <div className="min-h-screen bg-bilhar-dark pt-20">
      {/* Breadcrumb */}
      <div className="bg-bilhar-dark-2/50 border-b border-bilhar-green/20 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <Link href="/" className="hover:text-white transition-colors">Início</Link>
            <span>/</span>
            <Link href="/catalogo" className="hover:text-white transition-colors">Catálogo</Link>
            <span>/</span>
            <span className="text-white">{product.name}</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

        {/* Back link */}
        <Link href="/catalogo" className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm mb-8 group">
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
          Voltar ao Catálogo
        </Link>

        {/* Main Product Section */}
        <div className="grid lg:grid-cols-2 gap-12 mb-16">

          {/* Left: Visual */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-4"
          >
            {/* Table preview */}
            <div
              className="relative rounded-2xl overflow-hidden"
              style={{
                aspectRatio: "4/3",
                background: "linear-gradient(160deg, #14141E, #0E0E1A)",
                border: "1px solid rgba(47,212,138,0.18)",
                borderTopColor: "rgba(47,212,138,0.45)",
              }}
            >
              <div className="absolute inset-0 flex items-center justify-center p-10">
                <div
                  className="relative w-full h-full rounded-xl overflow-hidden"
                  style={{
                    backgroundColor: feltColor,
                    backgroundImage:
                      "repeating-linear-gradient(0deg, transparent, transparent 5px, rgba(0,0,0,0.05) 5px, rgba(0,0,0,0.05) 6px), repeating-linear-gradient(90deg, transparent, transparent 5px, rgba(0,0,0,0.05) 5px, rgba(0,0,0,0.05) 6px)",
                    boxShadow: "inset 0 0 60px rgba(0,0,0,0.6)",
                    transition: "background-color 0.4s ease",
                  }}
                >
                  <div
                    className="absolute inset-0 rounded-xl"
                    style={{
                      border: `12px solid ${woodColor}`,
                      background: "transparent",
                      transition: "border-color 0.4s ease",
                    }}
                  />
                  {[{ top: "6%", left: "3.5%" }, { top: "6%", right: "3.5%" }, { bottom: "6%", left: "3.5%" }, { bottom: "6%", right: "3.5%" }].map((s, i) => (
                    <div key={i} className="absolute rounded-full" style={{ ...s, width: 20, height: 20, background: "#040404", border: "2px solid #a0522d" }} />
                  ))}
                  <div className="absolute rounded-full" style={{ top: "50%", left: "1.8%", transform: "translateY(-50%)", width: 18, height: 18, background: "#040404", border: "2px solid #a0522d" }} />
                  <div className="absolute rounded-full" style={{ top: "50%", right: "1.8%", transform: "translateY(-50%)", width: 18, height: 18, background: "#040404", border: "2px solid #a0522d" }} />
                  <div className="absolute" style={{ top: "14%", bottom: "14%", left: "50%", width: 1, background: "rgba(255,255,255,0.07)" }} />
                  <div className="absolute rounded-full" style={{ top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 22, height: 22, background: "#fff", boxShadow: "0 0 14px rgba(255,255,255,0.5)" }} />
                </div>
              </div>

              {product.is_featured && (
                <div className="absolute top-4 left-4">
                  <span className="text-xs font-bold px-2.5 py-1 rounded-full" style={{ background: "linear-gradient(135deg,#b8962e,#e8c96e)", color: "#050505" }}>
                    Destaque
                  </span>
                </div>
              )}

              <div className="absolute bottom-4 right-4 flex items-center gap-1.5">
                <span className="text-xs text-gray-400" style={{ fontSize: "0.6rem" }}>Prévia interativa</span>
                <span className="rounded-full animate-pulse" style={{ width: 5, height: 5, background: "rgba(34,197,94,0.8)" }} />
              </div>
            </div>

            {/* Color pickers */}
            <div className="grid grid-cols-2 gap-3">
              <div className="glass-card p-4">
                <p className="text-xs text-gray-400 mb-3 font-medium">Feltro</p>
                <div className="flex gap-2 flex-wrap">
                  {FELT_COLORS.map((c, i) => (
                    <button
                      key={c.name}
                      onClick={() => setSelectedFelt(i)}
                      title={c.name}
                      className="rounded-md transition-all duration-200"
                      style={{
                        width: 28, height: 28,
                        background: c.hex,
                        border: selectedFelt === i ? "2px solid #2FD48A" : "2px solid transparent",
                        boxShadow: selectedFelt === i ? "0 0 8px rgba(47,212,138,0.4)" : "none",
                        transform: selectedFelt === i ? "scale(1.1)" : "scale(1)",
                      }}
                    />
                  ))}
                </div>
                <p className="text-[10px] mt-2" style={{ color: "#2FD48A" }}>{FELT_COLORS[selectedFelt].name}</p>
              </div>
              <div className="glass-card p-4">
                <p className="text-xs text-gray-400 mb-3 font-medium">Madeira</p>
                <div className="flex gap-2 flex-wrap">
                  {WOOD_COLORS.map((c, i) => (
                    <button
                      key={c.name}
                      onClick={() => setSelectedWood(i)}
                      title={c.name}
                      className="rounded-md transition-all duration-200"
                      style={{
                        width: 28, height: 28,
                        background: c.hex,
                        border: selectedWood === i ? "2px solid #2FD48A" : "2px solid transparent",
                        boxShadow: selectedWood === i ? "0 0 8px rgba(47,212,138,0.4)" : "none",
                        transform: selectedWood === i ? "scale(1.1)" : "scale(1)",
                      }}
                    />
                  ))}
                </div>
                <p className="text-[10px] mt-2" style={{ color: "#2FD48A" }}>{WOOD_COLORS[selectedWood].name}</p>
              </div>
            </div>
          </motion.div>

          {/* Right: Info */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col gap-6"
          >
            <div>
              <span className="text-xs font-bold tracking-widest uppercase text-bilhar-green-bright">{CATEGORY_LABELS[product.category]}</span>
              <h1 className="font-display font-bold text-4xl text-white mt-2 mb-3">{product.name}</h1>
              <p className="text-gray-400 leading-relaxed">{product.description}</p>
            </div>

            {/* Stars */}
            <div className="flex items-center gap-2">
              <div className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" style={{ color: "#c9a84c" }} />
                ))}
              </div>
              <span className="text-sm text-gray-400">4.9 (47 avaliações)</span>
            </div>

            {/* Pricing tabs */}
            <div className="glass-card p-5">
              <div className="flex gap-1 mb-4">
                {(["compra", "aluguel"] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setPricingTab(tab)}
                    className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all capitalize ${
                      pricingTab === tab
                        ? "bg-bilhar-green text-white"
                        : "text-gray-400 hover:text-white"
                    }`}
                  >
                    {tab === "compra" ? "Compra" : "Aluguel"}
                  </button>
                ))}
              </div>

              {pricingTab === "compra" ? (
                <div>
                  <p className="text-xs text-gray-500">Preço a partir de</p>
                  <p className="font-display font-bold text-4xl gradient-gold">{formatCurrency(product.base_price)}</p>
                  <p className="text-xs text-gray-400 mt-1">Em até 12x sem juros no cartão</p>
                  <div className="mt-3 p-3 rounded-xl" style={{ background: "rgba(47,212,138,0.05)", border: "1px solid rgba(47,212,138,0.2)" }}>
                    <p className="text-xs font-medium" style={{ color: "#2FD48A" }}>5% de desconto no PIX</p>
                    <p className="text-xs text-gray-400 mt-0.5">= {formatCurrency(product.base_price * 0.95)} à vista</p>
                  </div>
                </div>
              ) : (
                <div className="space-y-2">
                  {[
                    { months: 6, price: product.rental_price_6, label: "6 meses" },
                    { months: 12, price: product.rental_price_12, label: "12 meses", popular: true },
                    { months: 24, price: product.rental_price_24, label: "24 meses" },
                  ].map((plan) => (
                    <div
                      key={plan.months}
                      className="flex items-center justify-between p-3 rounded-xl"
                      style={{
                        background: plan.popular ? "rgba(47,212,138,0.06)" : "rgba(255,255,255,0.02)",
                        border: plan.popular ? "1px solid rgba(47,212,138,0.3)" : "1px solid rgba(255,255,255,0.06)",
                      }}
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-300">{plan.label}</span>
                        {plan.popular && <span className="text-[10px] px-1.5 py-0.5 rounded-full" style={{ background: "rgba(47,212,138,0.15)", color: "#2FD48A" }}>Popular</span>}
                      </div>
                      <span className="font-display font-bold text-white">{formatCurrency(plan.price)}<span className="text-xs text-gray-400">/mês</span></span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href={`/configurador?produto=${product.id}`}
                className="btn-gold rounded-xl gap-2 flex-1 justify-center py-4"
                style={{ fontSize: "0.9rem" }}
              >
                <Sparkles className="w-4 h-4" />
                Personalizar Mesa
              </Link>
              <button
                onClick={() => addItem(product, pricingTab === "aluguel" ? "aluguel" : "compra")}
                className="btn-outline-gold rounded-xl gap-2 flex-1 justify-center py-4"
                style={{ fontSize: "0.9rem" }}
              >
                <ShoppingCart className="w-4 h-4" />
                Adicionar ao Carrinho
              </button>
            </div>

            {/* Trust badges */}
            <div className="grid grid-cols-3 gap-3">
              {[
                { Icon: Truck, label: "Entrega e Montagem" },
                { Icon: Shield, label: "Garantia 5 Anos" },
                { Icon: Check, label: "Pagamento Seguro" },
              ].map(({ Icon, label }) => (
                <div key={label} className="glass-card p-3 flex flex-col items-center text-center gap-1.5">
                  <Icon style={{ width: 16, height: 16, color: "#2FD48A" }} />
                  <span className="text-[11px] text-gray-400">{label}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Specs + Features */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {/* Technical Specs */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-card p-6"
          >
            <h2 className="font-display font-bold text-xl text-white mb-6 flex items-center gap-2">
              <Ruler style={{ width: 20, height: 20, color: "#2FD48A" }} />
              Especificações Técnicas
            </h2>
            <div className="space-y-3">
              {[
                { label: "Comprimento", value: `${product.dimensions.length} cm` },
                { label: "Largura", value: `${product.dimensions.width} cm` },
                { label: "Altura", value: `${product.dimensions.height} cm` },
                { label: "Peso", value: `${product.weight_kg} kg` },
                { label: "Categoria", value: CATEGORY_LABELS[product.category] },
                { label: "Estoque", value: `${product.stock} unidades` },
              ].map((spec) => (
                <div
                  key={spec.label}
                  className="flex items-center justify-between py-2.5"
                  style={{ borderBottom: "1px solid rgba(47,212,138,0.07)" }}
                >
                  <span className="text-sm text-gray-400">{spec.label}</span>
                  <span className="text-sm font-medium text-white">{spec.value}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Features */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="glass-card p-6"
          >
            <h2 className="font-display font-bold text-xl text-white mb-6 flex items-center gap-2">
              <Weight style={{ width: 20, height: 20, color: "#2FD48A" }} />
              Características
            </h2>
            <ul className="space-y-3">
              {product.features.map((feature) => (
                <li key={feature} className="flex items-center gap-3">
                  <div
                    className="flex-shrink-0 rounded-full flex items-center justify-center"
                    style={{ width: 20, height: 20, background: "rgba(47,212,138,0.12)", border: "1px solid rgba(47,212,138,0.3)" }}
                  >
                    <Check className="w-3 h-3 text-bilhar-green-bright" />
                  </div>
                  <span className="text-sm text-gray-300">{feature}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div>
            <div className="flex items-center justify-between mb-8">
              <h2 className="font-display font-bold text-2xl text-white">
                Produtos <span className="gradient-emerald">Relacionados</span>
              </h2>
              <Link href="/catalogo" className="flex items-center gap-1 transition-colors text-sm" style={{ color: "#2FD48A" }}>
                Ver todos <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedProducts.map((p, i) => (
                <motion.div
                  key={p.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="glass-card overflow-hidden card-hover group"
                >
                  <div className="relative h-44" style={{ background: "#080808" }}>
                    <div className="absolute inset-0 flex items-center justify-center p-7">
                      <div className="relative w-full h-full rounded-lg overflow-hidden" style={{ backgroundColor: "#156845", boxShadow: `0 0 0 8px #5C3318` }}>
                        <div className="absolute inset-0 rounded-lg" style={{ border: "8px solid #5C3318", background: "transparent" }} />
                      </div>
                    </div>
                  </div>
                  <div className="p-4">
                    <span className="text-xs font-bold tracking-widest uppercase text-bilhar-green-bright">{CATEGORY_LABELS[p.category]}</span>
                    <h3 className="font-display font-bold text-lg text-white mt-1 mb-2">{p.name}</h3>
                    <div className="flex items-center justify-between">
                      <p className="font-display font-bold text-lg gradient-gold">{formatCurrency(p.base_price)}</p>
                      <Link href={`/produto/${p.slug}`} className="flex items-center gap-1 transition-colors text-sm" style={{ color: "#2FD48A" }}>
                        Ver <Eye className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
