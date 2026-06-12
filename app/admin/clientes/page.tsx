"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Mail, Phone, MapPin, Users, UserCheck, ShoppingCart } from "lucide-react";
import { formatCurrency, formatDate } from "@/lib/utils";

const CLIENTS = [
  { id: "C-001", name: "Carlos Silva", email: "carlos@email.com", phone: "(11) 99999-1111", city: "SÃ£o Paulo, SP", since: "2024-01-15", orders: 2, total: 17300, type: "compra" },
  { id: "C-002", name: "Ana Lima", email: "ana@email.com", phone: "(21) 98888-2222", city: "Rio de Janeiro, RJ", since: "2024-08-10", orders: 1, total: 5760, type: "aluguel" },
  { id: "C-003", name: "Pedro Costa", email: "pedro@email.com", phone: "(41) 97777-3333", city: "Curitiba, PR", since: "2024-10-28", orders: 1, total: 4800, type: "compra" },
  { id: "C-004", name: "Mariana Souza", email: "mariana@email.com", phone: "(31) 96666-4444", city: "Belo Horizonte, MG", since: "2024-12-06", orders: 1, total: 9100, type: "compra" },
  { id: "C-005", name: "Roberto Mendes", email: "roberto@email.com", phone: "(61) 95555-5555", city: "BrasÃ­lia, DF", since: "2024-11-30", orders: 1, total: 9800, type: "compra" },
  { id: "C-006", name: "Fernanda Rocha", email: "fernanda@email.com", phone: "(51) 94444-6666", city: "Porto Alegre, RS", since: "2024-10-15", orders: 1, total: 7080, type: "aluguel" },
  { id: "C-007", name: "Lucas Oliveira", email: "lucas@email.com", phone: "(85) 93333-7777", city: "Fortaleza, CE", since: "2024-09-10", orders: 1, total: 3200, type: "compra" },
  { id: "C-008", name: "Juliana Castro", email: "juliana@email.com", phone: "(81) 92222-8888", city: "Recife, PE", since: "2024-12-01", orders: 1, total: 12000, type: "compra" },
  { id: "C-009", name: "Marcos Vieira", email: "marcos@email.com", phone: "(11) 91111-9999", city: "SÃ£o Paulo, SP", since: "2023-11-01", orders: 1, total: 126000, type: "aluguel" },
  { id: "C-010", name: "Sofia Andrade", email: "sofia@email.com", phone: "(71) 90000-0000", city: "Salvador, BA", since: "2024-11-20", orders: 1, total: 4680, type: "aluguel" },
];

export default function AdminClientesPage() {
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("todos");

  const filtered = CLIENTS.filter((c) => {
    const matchSearch =
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase()) ||
      c.city.toLowerCase().includes(search.toLowerCase());
    const matchType = typeFilter === "todos" || c.type === typeFilter;
    return matchSearch && matchType;
  });

  const totalRevenue = CLIENTS.reduce((acc, c) => acc + c.total, 0);

  return (
    <div className="p-6 lg:p-8">
      <div className="mb-8">
        <h1 className="font-display font-bold text-3xl text-white">Clientes</h1>
        <p className="text-gray-400 mt-1">{CLIENTS.length} clientes cadastrados</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { label: "Total de Clientes", value: CLIENTS.length, icon: Users, color: "text-white", bg: "bg-white/10" },
          { label: "Compradores", value: CLIENTS.filter((c) => c.type === "compra").length, icon: ShoppingCart, color: "text-blue-400", bg: "bg-blue-500/10" },
          { label: "LocatÃ¡rios", value: CLIENTS.filter((c) => c.type === "aluguel").length, icon: UserCheck, color: "text-bilhar-green-bright", bg: "bg-bilhar-green/10" },
          { label: "Receita Total", value: formatCurrency(totalRevenue), icon: ShoppingCart, color: "text-bilhar-green-bright", bg: "bg-bilhar-green/10" },
        ].map((s) => (
          <div key={s.label} className="glass-card p-4 flex items-start gap-3">
            <div className={`w-9 h-9 rounded-xl ${s.bg} flex items-center justify-center flex-shrink-0 mt-0.5`}>
              <s.icon className={`w-4 h-4 ${s.color}`} />
            </div>
            <div>
              <p className={`font-display font-bold text-xl ${s.color}`}>{s.value}</p>
              <p className="text-gray-400 text-xs mt-0.5">{s.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-6">
        <div className="relative flex-1 min-w-48">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Buscar cliente, e-mail..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-bilhar-dark-2 border border-bilhar-green/20 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder:text-gray-500 focus:border-bilhar-green focus:outline-none"
          />
        </div>
        <div className="flex gap-1">
          {["todos", "compra", "aluguel"].map((f) => (
            <button
              key={f}
              onClick={() => setTypeFilter(f)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                typeFilter === f
                  ? "bg-bilhar-green/20 text-bilhar-green-bright border border-bilhar-green/30"
                  : "text-gray-400 hover:text-white border border-transparent"
              }`}
            >
              {f === "todos" ? "Todos" : f === "compra" ? "Compradores" : "LocatÃ¡rios"}
            </button>
          ))}
        </div>
      </div>

      {/* Grid de clientes */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filtered.map((client, i) => (
          <motion.div
            key={client.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.04 }}
            className="glass-card p-5 card-hover"
          >
            {/* Avatar + type */}
            <div className="flex items-start justify-between mb-4">
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center text-white font-display font-bold flex-shrink-0"
                style={{ background: client.type === "aluguel" ? "linear-gradient(135deg,#b8962e,#e8c96e)" : "linear-gradient(135deg,#820000,#b91c1c)", color: client.type === "aluguel" ? "#050505" : "#fff" }}
              >
                {client.name.charAt(0)}
              </div>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${client.type === "aluguel" ? "bg-bilhar-green/10 text-bilhar-green-bright" : "bg-blue-500/20 text-blue-300"}`}>
                {client.type === "aluguel" ? "Aluguel" : "Compra"}
              </span>
            </div>

            <h3 className="font-semibold text-white text-sm mb-1">{client.name}</h3>
            <p className="text-xs text-bilhar-green-bright font-mono mb-3">{client.id}</p>

            <div className="space-y-1.5 mb-4">
              <div className="flex items-center gap-2 text-xs text-gray-400">
                <Mail className="w-3 h-3 flex-shrink-0" />
                <span className="truncate">{client.email}</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-400">
                <Phone className="w-3 h-3 flex-shrink-0" />
                {client.phone}
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-400">
                <MapPin className="w-3 h-3 flex-shrink-0" />
                {client.city}
              </div>
            </div>

            <div className="flex items-end justify-between pt-3" style={{ borderTop: "1px solid rgba(47,212,138,0.08)" }}>
              <div>
                <p className="text-[10px] text-gray-500">Cliente desde</p>
                <p className="text-xs text-gray-300">{formatDate(client.since)}</p>
              </div>
              <div className="text-right">
                <p className="text-[10px] text-gray-500">Total gasto</p>
                <p className="text-sm font-bold text-bilhar-green-bright">{formatCurrency(client.total)}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16">
          <Users className="w-12 h-12 text-gray-600 mx-auto mb-3" />
          <p className="text-gray-400">Nenhum cliente encontrado</p>
        </div>
      )}
    </div>
  );
}

