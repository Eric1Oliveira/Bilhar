"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Search, Edit2, Trash2, Eye, Package, ToggleLeft, ToggleRight } from "lucide-react";
import { formatCurrency } from "@/lib/utils";

const MOCK_PRODUCTS = [
  { id: "1", name: "Pro 9 Standard", category: "profissional", price: 7500, stock: 5, active: true, featured: true },
  { id: "2", name: "Snooker Royal 12P", category: "profissional", price: 12000, stock: 2, active: true, featured: true },
  { id: "3", name: "Lazer Plus 8", category: "lazer", price: 4500, stock: 8, active: true, featured: false },
  { id: "4", name: "Semi Pro 9 Elite", category: "semi-profissional", price: 5800, stock: 6, active: true, featured: false },
  { id: "5", name: "Compacta Urban 7", category: "compacta", price: 3200, stock: 10, active: true, featured: false },
  { id: "6", name: "Championship Pro 10", category: "profissional", price: 9800, stock: 3, active: true, featured: true },
];

const CATEGORY_LABELS: Record<string, string> = {
  profissional: "Profissional",
  "semi-profissional": "Semi-Pro",
  lazer: "Lazer",
  compacta: "Compacta",
};

export default function AdminProdutosPage() {
  const [search, setSearch] = useState("");
  const [products, setProducts] = useState(MOCK_PRODUCTS);

  const filtered = products.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.category.toLowerCase().includes(search.toLowerCase())
  );

  const toggleActive = (id: string) => {
    setProducts((prev) => prev.map((p) => (p.id === id ? { ...p, active: !p.active } : p)));
  };

  const toggleFeatured = (id: string) => {
    setProducts((prev) => prev.map((p) => (p.id === id ? { ...p, featured: !p.featured } : p)));
  };

  return (
    <div className="p-6 lg:p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display font-bold text-3xl text-white">Produtos</h1>
          <p className="text-gray-400 mt-1">{products.length} produtos cadastrados</p>
        </div>
        <button className="btn-gold px-5 py-2.5 rounded-xl text-sm font-semibold flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Novo Produto
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { label: "Total de Produtos", value: products.length, color: "text-white" },
          { label: "Ativos", value: products.filter((p) => p.active).length, color: "text-bilhar-green-bright" },
          { label: "Destaques", value: products.filter((p) => p.featured).length, color: "text-bilhar-green-bright" },
          { label: "Estoque Baixo (â‰¤3)", value: products.filter((p) => p.stock <= 3).length, color: "text-yellow-300" },
        ].map((s) => (
          <div key={s.label} className="glass-card p-4">
            <p className={`font-display font-bold text-2xl ${s.color}`}>{s.value}</p>
            <p className="text-gray-400 text-sm mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Search */}
      <div className="relative mb-6 max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input
          type="text"
          placeholder="Buscar produtos..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-bilhar-dark-2 border border-bilhar-green/20 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder:text-gray-500 focus:border-bilhar-green focus:outline-none"
        />
      </div>

      {/* Table */}
      <div className="glass-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-xs text-gray-400 uppercase tracking-wider border-b border-bilhar-green/10">
                <th className="text-left px-6 py-3">Produto</th>
                <th className="text-left px-6 py-3">Categoria</th>
                <th className="text-left px-6 py-3">PreÃ§o</th>
                <th className="text-left px-6 py-3">Estoque</th>
                <th className="text-left px-6 py-3">Destaque</th>
                <th className="text-left px-6 py-3">Status</th>
                <th className="text-left px-6 py-3">AÃ§Ãµes</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((product, i) => (
                <motion.tr
                  key={product.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.04 }}
                  className="border-b border-bilhar-green/5 hover:bg-white/[0.02] transition-colors"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-bilhar-green/10 flex items-center justify-center flex-shrink-0">
                        <Package className="w-4 h-4 text-bilhar-green-bright" />
                      </div>
                      <span className="text-sm font-medium text-white">{product.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-xs px-2.5 py-1 rounded-full bg-bilhar-dark border border-bilhar-green/20 text-gray-300">
                      {CATEGORY_LABELS[product.category]}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm font-semibold text-white">{formatCurrency(product.price)}</td>
                  <td className="px-6 py-4">
                    <span className={`text-sm font-medium ${product.stock <= 3 ? "text-yellow-300" : "text-gray-300"}`}>
                      {product.stock} un.
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <button onClick={() => toggleFeatured(product.id)} className="transition-colors">
                      {product.featured
                        ? <ToggleRight className="w-5 h-5 text-bilhar-green-bright" />
                        : <ToggleLeft className="w-5 h-5 text-gray-600" />}
                    </button>
                  </td>
                  <td className="px-6 py-4">
                    <button onClick={() => toggleActive(product.id)} className="flex items-center gap-1.5 transition-colors">
                      <span className={`text-xs font-medium ${product.active ? "text-bilhar-green-bright" : "text-gray-500"}`}>
                        {product.active ? "Ativo" : "Inativo"}
                      </span>
                    </button>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button className="w-7 h-7 rounded-lg flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/5 transition-all">
                        <Eye className="w-3.5 h-3.5" />
                      </button>
                      <button className="w-7 h-7 rounded-lg flex items-center justify-center text-gray-400 hover:text-bilhar-green-bright hover:bg-bilhar-green/5 transition-all">
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button className="w-7 h-7 rounded-lg flex items-center justify-center text-gray-400 hover:text-red-400 hover:bg-red-500/5 transition-all">
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16">
            <Package className="w-12 h-12 text-gray-600 mx-auto mb-3" />
            <p className="text-gray-400">Nenhum produto encontrado</p>
          </div>
        )}
      </div>
    </div>
  );
}

