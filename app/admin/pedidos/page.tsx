"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Filter, Eye, ShoppingCart } from "lucide-react";
import { formatCurrency, formatDate } from "@/lib/utils";

const ORDERS = [
  { id: "SI-001", client: "Carlos Silva", email: "carlos@email.com", product: "Pro 9 Standard", value: 8200, status: "producao", type: "compra", date: "2024-12-05", city: "SÃ£o Paulo, SP" },
  { id: "SI-002", client: "Ana Lima", email: "ana@email.com", product: "Lazer Plus 8", value: 480, status: "aluguel_ativo", type: "aluguel", date: "2024-12-03", city: "Rio de Janeiro, RJ" },
  { id: "SI-003", client: "Pedro Costa", email: "pedro@email.com", product: "Lazer Plus 8", value: 4800, status: "enviado", type: "compra", date: "2024-11-28", city: "Curitiba, PR" },
  { id: "SI-004", client: "Mariana Souza", email: "mariana@email.com", product: "Pro 9 Standard", value: 9100, status: "pendente", type: "compra", date: "2024-12-06", city: "Belo Horizonte, MG" },
  { id: "SI-005", client: "Roberto Mendes", email: "roberto@email.com", product: "Championship Pro 10", value: 9800, status: "confirmado", type: "compra", date: "2024-11-30", city: "BrasÃ­lia, DF" },
  { id: "SI-006", client: "Fernanda Rocha", email: "fernanda@email.com", product: "Semi Pro 9 Elite", value: 590, status: "aluguel_ativo", type: "aluguel", date: "2024-11-15", city: "Porto Alegre, RS" },
  { id: "SI-007", client: "Lucas Oliveira", email: "lucas@email.com", product: "Compacta Urban 7", value: 3200, status: "entregue", type: "compra", date: "2024-11-10", city: "Fortaleza, CE" },
  { id: "SI-008", client: "Juliana Castro", email: "juliana@email.com", product: "Snooker Royal 12P", value: 12000, status: "producao", type: "compra", date: "2024-12-01", city: "Recife, PE" },
];

const STATUS_STYLES: Record<string, { label: string; class: string }> = {
  pendente: { label: "Pendente", class: "bg-yellow-500/20 text-yellow-300" },
  confirmado: { label: "Confirmado", class: "bg-blue-500/20 text-blue-300" },
  producao: { label: "Em ProduÃ§Ã£o", class: "bg-purple-500/20 text-purple-300" },
  enviado: { label: "Enviado", class: "bg-bilhar-green/20 text-bilhar-green-bright" },
  entregue: { label: "Entregue", class: "bg-gray-500/20 text-gray-300" },
  aluguel_ativo: { label: "Aluguel Ativo", class: "bg-bilhar-green/10 text-bilhar-green-bright" },
  cancelado: { label: "Cancelado", class: "bg-red-500/20 text-red-400" },
};

const STATUS_OPTIONS = ["todos", "pendente", "confirmado", "producao", "enviado", "entregue", "aluguel_ativo"];

export default function AdminPedidosPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("todos");

  const filtered = ORDERS.filter((o) => {
    const matchSearch =
      o.client.toLowerCase().includes(search.toLowerCase()) ||
      o.id.toLowerCase().includes(search.toLowerCase()) ||
      o.product.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "todos" || o.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const revenue = ORDERS.filter((o) => o.type === "compra").reduce((acc, o) => acc + o.value, 0);
  const activeRentals = ORDERS.filter((o) => o.status === "aluguel_ativo").length;
  const pending = ORDERS.filter((o) => o.status === "pendente").length;

  return (
    <div className="p-6 lg:p-8">
      <div className="mb-8">
        <h1 className="font-display font-bold text-3xl text-white">Pedidos</h1>
        <p className="text-gray-400 mt-1">{ORDERS.length} pedidos no total</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { label: "Total de Pedidos", value: ORDERS.length, color: "text-white" },
          { label: "Receita (Compras)", value: formatCurrency(revenue), color: "text-bilhar-green-bright" },
          { label: "AluguÃ©is Ativos", value: activeRentals, color: "text-bilhar-green-bright" },
          { label: "Pendentes", value: pending, color: "text-yellow-300" },
        ].map((s) => (
          <div key={s.label} className="glass-card p-4">
            <p className={`font-display font-bold text-2xl ${s.color}`}>{s.value}</p>
            <p className="text-gray-400 text-sm mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-6">
        <div className="relative flex-1 min-w-48">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Buscar pedido, cliente..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-bilhar-dark-2 border border-bilhar-green/20 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder:text-gray-500 focus:border-bilhar-green focus:outline-none"
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-gray-400" />
          <div className="flex gap-1 flex-wrap">
            {STATUS_OPTIONS.map((s) => (
              <button
                key={s}
                onClick={() => setStatusFilter(s)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all capitalize ${
                  statusFilter === s
                    ? "bg-bilhar-green/20 text-bilhar-green-bright border border-bilhar-green/30"
                    : "text-gray-400 hover:text-white border border-transparent"
                }`}
              >
                {s === "todos" ? "Todos" : STATUS_STYLES[s]?.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="glass-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-xs text-gray-400 uppercase tracking-wider border-b border-bilhar-green/10">
                <th className="text-left px-6 py-3">Pedido</th>
                <th className="text-left px-6 py-3">Cliente</th>
                <th className="text-left px-6 py-3">Produto</th>
                <th className="text-left px-6 py-3">Tipo</th>
                <th className="text-left px-6 py-3">Valor</th>
                <th className="text-left px-6 py-3">Data</th>
                <th className="text-left px-6 py-3">Status</th>
                <th className="text-left px-6 py-3">AÃ§Ãµes</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((order, i) => (
                <motion.tr
                  key={order.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.03 }}
                  className="border-b border-bilhar-green/5 hover:bg-white/[0.02] transition-colors"
                >
                  <td className="px-6 py-4 text-sm font-mono text-bilhar-green-bright font-semibold">{order.id}</td>
                  <td className="px-6 py-4">
                    <p className="text-sm text-white font-medium">{order.client}</p>
                    <p className="text-xs text-gray-500">{order.city}</p>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-300">{order.product}</td>
                  <td className="px-6 py-4">
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${order.type === "aluguel" ? "bg-purple-500/20 text-purple-300" : "bg-blue-500/20 text-blue-300"}`}>
                      {order.type === "aluguel" ? "Aluguel" : "Compra"}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm font-semibold text-white">
                    {formatCurrency(order.value)}
                    {order.type === "aluguel" && <span className="text-xs text-gray-400">/mÃªs</span>}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-400">{formatDate(order.date)}</td>
                  <td className="px-6 py-4">
                    <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${STATUS_STYLES[order.status]?.class}`}>
                      {STATUS_STYLES[order.status]?.label}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <button className="w-7 h-7 rounded-lg flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/5 transition-all">
                      <Eye className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16">
            <ShoppingCart className="w-12 h-12 text-gray-600 mx-auto mb-3" />
            <p className="text-gray-400">Nenhum pedido encontrado</p>
          </div>
        )}
      </div>
    </div>
  );
}

