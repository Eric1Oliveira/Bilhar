"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Search, SlidersHorizontal, ArrowRight, Sparkles, ShoppingCart } from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import { useCartStore } from "@/store/cart";
import type { Product } from "@/types";

const MOCK_PRODUCTS: Product[] = [
  {
    id: "1", name: "Pro 9 Standard", slug: "pro-9-standard",
    description: "Mesa profissional 9 palmos com ardósia tripla e feltro importado. Ideal para salões e clubs.",
    category: "profissional", base_price: 7500,
    rental_price_6: 890, rental_price_12: 750, rental_price_24: 620,
    weight_kg: 320, dimensions: { width: 127, height: 80, length: 254 },
    features: ["Ardósia tripla 45mm", "Feltro Simonis 860", "Madeira maciça", "Garantia 5 anos"],
    images: [], model_3d_url: null, ar_model_url: null,
    is_active: true, is_featured: true, stock: 5,
    created_at: "2024-01-01",
  },
  {
    id: "2", name: "Snooker Royal 12P", slug: "snooker-royal-12p",
    description: "Mesa de snooker padrão oficial 12 palmos. Construção robusta para uso intensivo.",
    category: "profissional", base_price: 12000,
    rental_price_6: 1450, rental_price_12: 1200, rental_price_24: 980,
    weight_kg: 480, dimensions: { width: 175, height: 85, length: 357 },
    features: ["12 palmos padrão oficial", "Ardósia 5 peças", "Estrutura aço e madeira", "Bolsos de couro"],
    images: [], model_3d_url: null, ar_model_url: null,
    is_active: true, is_featured: true, stock: 2,
    created_at: "2024-01-01",
  },
  {
    id: "3", name: "Lazer Plus 8", slug: "lazer-plus-8",
    description: "Mesa 8 palmos para residências. Perfeita para reuniões e entretenimento familiar.",
    category: "lazer", base_price: 4500,
    rental_price_6: 590, rental_price_12: 480, rental_price_24: 390,
    weight_kg: 220, dimensions: { width: 100, height: 78, length: 200 },
    features: ["8 palmos", "Feltro colorido disponível", "Design moderno", "Fácil montagem"],
    images: [], model_3d_url: null, ar_model_url: null,
    is_active: true, is_featured: false, stock: 8,
    created_at: "2024-01-01",
  },
  {
    id: "4", name: "Semi Pro 9 Elite", slug: "semi-pro-9-elite",
    description: "O equilíbrio perfeito entre qualidade profissional e preço acessível.",
    category: "semi-profissional", base_price: 5800,
    rental_price_6: 720, rental_price_12: 590, rental_price_24: 480,
    weight_kg: 280, dimensions: { width: 127, height: 80, length: 254 },
    features: ["9 palmos", "Ardósia dupla 30mm", "MDF com revestimento", "Garantia 3 anos"],
    images: [], model_3d_url: null, ar_model_url: null,
    is_active: true, is_featured: false, stock: 6,
    created_at: "2024-01-01",
  },
  {
    id: "5", name: "Compacta Urban 7", slug: "compacta-urban-7",
    description: "Máxima diversão em espaços reduzidos. 7 palmos com design contemporâneo.",
    category: "compacta", base_price: 3200,
    rental_price_6: 420, rental_price_12: 350, rental_price_24: 290,
    weight_kg: 160, dimensions: { width: 89, height: 76, length: 178 },
    features: ["7 palmos", "Ideal para apartamentos", "Pernas dobráveis", "MDF Premium"],
    images: [], model_3d_url: null, ar_model_url: null,
    is_active: true, is_featured: false, stock: 10,
    created_at: "2024-01-01",
  },
  {
    id: "6", name: "Championship Pro 10", slug: "championship-pro-10",
    description: "Mesa 10 palmos para campeonatos regionais. Construção premium com ardósia italiana.",
    category: "profissional", base_price: 9800,
    rental_price_6: 1200, rental_price_12: 990, rental_price_24: 820,
    weight_kg: 380, dimensions: { width: 140, height: 82, length: 280 },
    features: ["10 palmos", "Ardósia italiana", "Bolsos couro genuíno", "Garantia 7 anos"],
    images: [], model_3d_url: null, ar_model_url: null,
    is_active: true, is_featured: true, stock: 3,
    created_at: "2024-01-01",
  },
];

const CATEGORIES = [
  { value: "todos", label: "Todos" },
  { value: "profissional", label: "Profissional" },
  { value: "semi-profissional", label: "Semi-Pro" },
  { value: "lazer", label: "Lazer" },
  { value: "compacta", label: "Compacta" },
];

const FELT_COLORS: Record<string, string> = {
  verde: "#1a4a2e", azul: "#1B3A6B", vermelho: "#8B0000",
};

export function CatalogoClient() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("todos");
  const [sortBy, setSortBy] = useState("featured");
  const { addItem } = useCartStore();

  const filtered = MOCK_PRODUCTS.filter((p) => {
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.description.toLowerCase().includes(search.toLowerCase());
    const matchCat = category === "todos" || p.category === category;
    return matchSearch && matchCat;
  });

  return (
    <div className="min-h-screen bg-bilhar-dark pt-20">
      {/* Header */}
      <div className="bg-bilhar-dark-2/50 border-b border-bilhar-green/20 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-display font-bold text-4xl text-white mb-3">
            Catálogo de <span className="gradient-gold">Mesas</span>
          </h1>
          <p className="text-gray-400">
            {filtered.length} produtos encontrados
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters */}
        <div className="flex flex-wrap gap-4 items-center mb-8">
          {/* Search */}
          <div className="relative flex-1 min-w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar mesas..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-bilhar-dark-2 border border-bilhar-green/20 rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder:text-gray-500 focus:border-bilhar-green/50 focus:outline-none"
            />
          </div>

          {/* Category Tabs */}
          <div className="flex gap-1 flex-wrap">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setCategory(cat.value)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  category === cat.value
                    ? "bg-bilhar-green text-white"
                    : "bg-bilhar-dark-2 text-gray-400 hover:text-white border border-bilhar-green/20"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Sort */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-bilhar-dark-2 border border-bilhar-green/20 rounded-xl px-4 py-3 text-sm text-white focus:border-bilhar-green/50 focus:outline-none"
          >
            <option value="featured">Destaques</option>
            <option value="price_asc">Menor Preço</option>
            <option value="price_desc">Maior Preço</option>
          </select>
        </div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.08 }}
              className="group glass-card overflow-hidden card-hover"
            >
              {/* Image */}
              <div className="relative h-52 bg-bilhar-dark overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative w-4/5 h-4/5 rounded-xl overflow-hidden shadow-2xl">
                    <div className="absolute inset-0" style={{ backgroundColor: "#1a4a2e" }} />
                    <div className="absolute inset-0 border-[10px] border-bilhar-wood rounded-xl" style={{ background: "transparent" }} />
                    {[{ top: "5%", left: "5%" }, { top: "5%", right: "5%" }, { bottom: "5%", left: "5%" }, { bottom: "5%", right: "5%" }].map((s, i) => (
                      <div key={i} className="absolute w-5 h-5 rounded-full bg-black border-2 border-bilhar-wood" style={s} />
                    ))}
                  </div>
                </div>
                {product.is_featured && (
                  <div className="absolute top-3 left-3">
                    <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-bilhar-gold text-bilhar-dark">
                      Destaque
                    </span>
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-bilhar-dark-2 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center pb-4 gap-2">
                  <Link
                    href={`/configurador?produto=${product.id}`}
                    className="flex items-center gap-1.5 bg-bilhar-gold text-bilhar-dark text-xs font-semibold px-4 py-2 rounded-lg"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    Configurar
                  </Link>
                  <button
                    onClick={() => addItem(product, "compra")}
                    className="flex items-center gap-1.5 bg-bilhar-green text-white text-xs font-semibold px-4 py-2 rounded-lg"
                  >
                    <ShoppingCart className="w-3.5 h-3.5" />
                    Carrinho
                  </button>
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                <span className="text-xs text-bilhar-green-bright font-medium uppercase tracking-wider capitalize">
                  {product.category}
                </span>
                <h3 className="font-display font-bold text-lg text-white mt-1 mb-2">{product.name}</h3>
                <p className="text-sm text-gray-400 leading-relaxed mb-4 line-clamp-2">{product.description}</p>

                <div className="flex flex-wrap gap-1 mb-4">
                  {product.features.slice(0, 3).map((f) => (
                    <span key={f} className="text-[10px] px-2 py-1 rounded-full bg-bilhar-green/10 border border-bilhar-green/20 text-bilhar-green-bright">
                      {f}
                    </span>
                  ))}
                </div>

                <div className="flex items-end justify-between">
                  <div>
                    <p className="text-xs text-gray-500">A partir de</p>
                    <p className="font-display font-bold text-xl gradient-gold">{formatCurrency(product.base_price)}</p>
                    <p className="text-xs text-gray-400">ou {formatCurrency(product.rental_price_12)}/mês</p>
                  </div>
                  <Link
                    href={`/produto/${product.slug}`}
                    className="flex items-center gap-1 text-sm text-bilhar-green-bright hover:text-white transition-colors group/link"
                  >
                    Detalhes
                    <ArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-0.5 transition-transform" />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-400 text-lg">Nenhum produto encontrado</p>
            <button onClick={() => { setSearch(""); setCategory("todos"); }} className="mt-4 text-bilhar-green-bright hover:text-white transition-colors text-sm">
              Limpar filtros
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
