"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Search, FileText, Eye, AlertCircle } from "lucide-react";
import { formatCurrency, formatDate } from "@/lib/utils";

const CONTRACTS = [
  { id: "CT-001", client: "Ana Lima", product: "Lazer Plus 8", monthly: 480, months: 12, paid: 4, status: "ativo", start: "2024-08-10", next_payment: "2025-01-10", city: "Rio de Janeiro, RJ" },
  { id: "CT-002", client: "Fernanda Rocha", product: "Semi Pro 9 Elite", monthly: 590, months: 12, paid: 2, status: "ativo", start: "2024-10-15", next_payment: "2025-01-15", city: "Porto Alegre, RS" },
  { id: "CT-003", client: "Marcos Vieira", product: "Pro 9 Standard", monthly: 750, months: 24, paid: 14, status: "ativo", start: "2023-11-01", next_payment: "2025-01-01", city: "SÃ£o Paulo, SP" },
  { id: "CT-004", client: "Camila Santos", product: "Compacta Urban 7", monthly: 290, months: 6, paid: 6, status: "encerrado", start: "2024-05-01", next_payment: "â€”", city: "Campinas, SP" },
  { id: "CT-005", client: "Diego Pires", product: "Championship Pro 10", monthly: 820, months: 24, paid: 3, status: "atrasado", start: "2024-09-01", next_payment: "2024-12-01", city: "Manaus, AM" },
  { id: "CT-006", client: "Sofia Andrade", product: "Lazer Plus 8", monthly: 390, months: 24, paid: 1, status: "ativo", start: "2024-11-20", next_payment: "2025-01-20", city: "Salvador, BA" },
];

const STATUS_STYLES: Record<string, { label: string; class: string }> = {
  ativo: { label: "Ativo", class: "bg-bilhar-green/20 text-bilhar-green-bright" },
  pausado: { label: "Pausado", class: "bg-yellow-500/20 text-yellow-300" },
  atrasado: { label: "Atrasado", class: "bg-red-500/20 text-red-400" },
  encerrado: { label: "Encerrado", class: "bg-gray-500/20 text-gray-400" },
};

export default function AdminContratosPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("todos");

  const filtered = CONTRACTS.filter((c) => {
    const matchSearch =
      c.client.toLowerCase().includes(search.toLowerCase()) ||
      c.id.toLowerCase().includes(search.toLowerCase()) ||
      c.product.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "todos" || c.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const active = CONTRACTS.filter((c) => c.status === "ativo").length;
  const atrasados = CONTRACTS.filter((c) => c.status === "atrasado").length;
  const mrr = CONTRACTS.filter((c) => c.status === "ativo" || c.status === "atrasado").reduce((acc, c) => acc + c.monthly, 0);

  return (
    <div className="p-6 lg:p-8">
      <div className="mb-8">
        <h1 className="font-display font-bold text-3xl text-white">Contratos de Aluguel</h1>
        <p className="text-gray-400 mt-1">{CONTRACTS.length} contratos cadastrados</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { label: "Contratos Ativos", value: active, color: "text-bilhar-green-bright" },
          { label: "MRR", value: formatCurrency(mrr), color: "text-bilhar-green-bright" },
          { label: "Atrasados", value: atrasados, color: "text-red-400" },
          { label: "Total de Contratos", value: CONTRACTS.length, color: "text-white" },
        ].map((s) => (
          <div key={s.label} className="glass-card p-4">
            <p className={`font-display font-bold text-2xl ${s.color}`}>{s.value}</p>
            <p className="text-gray-400 text-sm mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      {atrasados > 0 && (
        <div className="glass-card p-4 mb-6 flex items-center gap-3 border-red-500/30 bg-red-500/5">
          <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
          <p className="text-sm text-red-300">
            <span className="font-semibold">{atrasados} contrato(s)</span> com pagamento em atraso. Verifique e entre em contato com os clientes.
          </p>
        </div>
      )}

      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-6">
        <div className="relative flex-1 min-w-48">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Buscar contrato ou cliente..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-bilhar-dark-2 border border-bilhar-green/20 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder:text-gray-500 focus:border-bilhar-green focus:outline-none"
          />
        </div>
        <div className="flex gap-1 flex-wrap">
          {["todos", "ativo", "atrasado", "encerrado"].map((s) => (
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

      {/* Table */}
      <div className="glass-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-xs text-gray-400 uppercase tracking-wider border-b border-bilhar-green/10">
                <th className="text-left px-6 py-3">Contrato</th>
                <th className="text-left px-6 py-3">Cliente</th>
                <th className="text-left px-6 py-3">Produto</th>
                <th className="text-left px-6 py-3">Plano</th>
                <th className="text-left px-6 py-3">Mensalidade</th>
                <th className="text-left px-6 py-3">Parcelas</th>
                <th className="text-left px-6 py-3">PrÃ³ximo Pgto</th>
                <th className="text-left px-6 py-3">Status</th>
                <th className="text-left px-6 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((contract, i) => (
                <motion.tr
                  key={contract.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.04 }}
                  className="border-b border-bilhar-green/5 hover:bg-white/[0.02] transition-colors"
                >
                  <td className="px-6 py-4 text-sm font-mono text-bilhar-green-bright font-semibold">{contract.id}</td>
                  <td className="px-6 py-4">
                    <p className="text-sm text-white font-medium">{contract.client}</p>
                    <p className="text-xs text-gray-500">{contract.city}</p>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-300">{contract.product}</td>
                  <td className="px-6 py-4 text-sm text-gray-400">{contract.months} meses</td>
                  <td className="px-6 py-4 text-sm font-semibold text-white">{formatCurrency(contract.monthly)}<span className="text-xs text-gray-400">/mÃªs</span></td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-1.5 rounded-full bg-bilhar-dark" style={{ maxWidth: 60 }}>
                        <div className="h-full rounded-full bg-bilhar-green" style={{ width: `${(contract.paid / contract.months) * 100}%` }} />
                      </div>
                      <span className="text-xs text-gray-400">{contract.paid}/{contract.months}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-400">{contract.next_payment === "â€”" ? "â€”" : formatDate(contract.next_payment)}</td>
                  <td className="px-6 py-4">
                    <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${STATUS_STYLES[contract.status]?.class}`}>
                      {STATUS_STYLES[contract.status]?.label}
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
            <FileText className="w-12 h-12 text-gray-600 mx-auto mb-3" />
            <p className="text-gray-400">Nenhum contrato encontrado</p>
          </div>
        )}
      </div>
    </div>
  );
}

