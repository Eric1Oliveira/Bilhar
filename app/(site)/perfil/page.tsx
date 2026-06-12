"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { User, Package, FileText, Image, Settings, Sparkles, ArrowRight, Calendar, TrendingUp } from "lucide-react";
import { formatCurrency, formatDate } from "@/lib/utils";

const MOCK_CONFIGS = [
  { id: "1", name: "Mesa do Escritório", product: "Pro 9 Standard", price: 9200, wood: "Nogueira", felt: "Verde", created_at: "2024-11-15" },
  { id: "2", name: "Sala de Jogos", product: "Lazer Plus 8", price: 5800, wood: "Carvalho", felt: "Azul", created_at: "2024-12-01" },
];

const MOCK_ORDERS = [
  { id: "SI-001", product: "Pro 9 Standard", total: 9200, status: "producao", date: "2024-12-05" },
  { id: "SI-002", product: "Lazer Plus 8 (Aluguel)", total: 480, status: "entregue", date: "2024-11-20", monthly: true },
];

const STATUS_INFO: Record<string, { label: string; color: string }> = {
  pendente: { label: "Pendente", color: "text-yellow-300" },
  confirmado: { label: "Confirmado", color: "text-blue-300" },
  producao: { label: "Em Produção", color: "text-purple-300" },
  enviado: { label: "Enviado", color: "text-bilhar-green-bright" },
  entregue: { label: "Entregue", color: "text-gray-300" },
};

const TABS = [
  { id: "configs", label: "Minhas Configurações", icon: Sparkles },
  { id: "pedidos", label: "Meus Pedidos", icon: Package },
  { id: "contratos", label: "Contratos de Aluguel", icon: FileText },
  { id: "galeria", label: "Galeria", icon: Image },
  { id: "conta", label: "Minha Conta", icon: Settings },
];

export default function PerfilPage() {
  const [activeTab, setActiveTab] = useState("configs");

  return (
    <div className="min-h-screen bg-bilhar-dark pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Profile Header */}
        <div className="glass-card p-6 mb-8 flex flex-col sm:flex-row items-start sm:items-center gap-6">
          <div className="w-20 h-20 rounded-2xl bg-bilhar-green flex items-center justify-center text-3xl font-bold text-white flex-shrink-0">
            C
          </div>
          <div className="flex-1">
            <h1 className="font-display font-bold text-2xl text-white">Carlos Silva</h1>
            <p className="text-gray-400 text-sm mt-0.5">carlos@email.com • Cliente desde jan/2024</p>
            <div className="flex gap-6 mt-3">
              {[
                { label: "Configurações", value: "2" },
                { label: "Pedidos", value: "1" },
                { label: "Aluguéis", value: "1" },
              ].map((s) => (
                <div key={s.label}>
                  <span className="font-bold text-white">{s.value}</span>
                  <span className="text-xs text-gray-400 ml-1">{s.label}</span>
                </div>
              ))}
            </div>
          </div>
          <Link
            href="/configurador"
            className="flex items-center gap-2 btn-gold px-5 py-2.5 rounded-xl text-sm font-semibold"
          >
            <Sparkles className="w-4 h-4" />
            Nova Configuração
          </Link>
        </div>

        {/* Tabs + Content */}
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar tabs */}
          <div className="lg:w-56 flex-shrink-0">
            <div className="glass-card p-2 space-y-1">
              {TABS.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                    activeTab === tab.id
                      ? "bg-bilhar-green/20 text-bilhar-green-bright"
                      : "text-gray-400 hover:text-white hover:bg-white/5"
                  }`}
                >
                  <tab.icon className="w-4 h-4" />
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Content */}
          <div className="flex-1">
            {activeTab === "configs" && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-4"
              >
                {MOCK_CONFIGS.map((config) => (
                  <div key={config.id} className="glass-card p-5 flex flex-col sm:flex-row items-start sm:items-center gap-4">
                    <div className="w-16 h-16 rounded-xl bg-bilhar-green/20 flex items-center justify-center text-2xl flex-shrink-0">
                      🎱
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-white">{config.name}</h3>
                      <p className="text-sm text-gray-400">{config.product} • {config.wood} / {config.felt}</p>
                      <p className="text-xs text-gray-500 mt-0.5">Criado em {formatDate(config.created_at)}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="font-display font-bold text-lg gradient-gold">{formatCurrency(config.price)}</span>
                      <div className="flex gap-2">
                        <Link
                          href={`/configurador?config=${config.id}`}
                          className="text-xs px-3 py-1.5 rounded-lg border border-bilhar-green/30 text-bilhar-green-bright hover:bg-bilhar-green/5 transition-all"
                        >
                          Editar
                        </Link>
                        <Link
                          href="/checkout"
                          className="text-xs px-3 py-1.5 rounded-lg btn-gold"
                        >
                          Comprar
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
                <Link
                  href="/configurador"
                  className="flex items-center justify-center gap-2 py-8 border-2 border-dashed border-bilhar-green/20 rounded-xl text-bilhar-green/50 hover:text-bilhar-green-bright hover:border-bilhar-green/40 transition-all text-sm"
                >
                  <Sparkles className="w-4 h-4" />
                  Criar nova configuração
                </Link>
              </motion.div>
            )}

            {activeTab === "pedidos" && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-4"
              >
                {MOCK_ORDERS.map((order) => (
                  <div key={order.id} className="glass-card p-5 flex flex-col sm:flex-row items-start sm:items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-bilhar-green/10 flex items-center justify-center flex-shrink-0">
                      <Package className="w-5 h-5 text-bilhar-green-bright" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-white text-sm">{order.product}</h3>
                        {order.monthly && <span className="text-[10px] px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300">Aluguel</span>}
                      </div>
                      <p className="text-xs text-gray-400 mt-0.5">#{order.id} • {formatDate(order.date)}</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className={`text-sm font-medium ${STATUS_INFO[order.status]?.color}`}>
                        {STATUS_INFO[order.status]?.label}
                      </span>
                      <span className="font-display font-bold text-lg text-white">
                        {formatCurrency(order.total)}
                        {order.monthly && <span className="text-xs text-gray-400">/mês</span>}
                      </span>
                    </div>
                  </div>
                ))}
              </motion.div>
            )}

            {activeTab === "contratos" && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass-card p-8 text-center"
              >
                <Calendar className="w-12 h-12 text-bilhar-green/30 mx-auto mb-4" />
                <h3 className="font-semibold text-white text-lg mb-2">Contratos de Aluguel</h3>
                <p className="text-gray-400 text-sm mb-6">
                  Você tem 1 contrato ativo. Próximo vencimento: 10/01/2025
                </p>
                <div className="glass-card p-5 text-left">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-medium text-white">Lazer Plus 8</h4>
                    <span className="text-xs px-2.5 py-1 rounded-full bg-bilhar-green/20 text-bilhar-green-bright">Ativo</span>
                  </div>
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div><p className="text-gray-400 text-xs">Mensal</p><p className="text-white font-medium">R$ 480</p></div>
                    <div><p className="text-gray-400 text-xs">Parcelas</p><p className="text-white font-medium">4/12</p></div>
                    <div><p className="text-gray-400 text-xs">Vencimento</p><p className="text-white font-medium">Dia 10</p></div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === "galeria" && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-4"
              >
                <div className="glass-card p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-white text-lg">Galeria de Fotos</h3>
                    <button className="text-xs px-3 py-1.5 rounded-lg btn-gold font-semibold flex items-center gap-1.5">
                      <Image className="w-3.5 h-3.5" />
                      Enviar Foto
                    </button>
                  </div>
                  <p className="text-sm text-gray-400 mb-6">
                    Compartilhe fotos da sua mesa. As melhores são publicadas na galeria pública da Sinuca Ideal.
                  </p>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {[
                      { label: "Mesa do Escritório", approved: true },
                      { label: "Sala de Jogos", approved: false },
                    ].map((photo, i) => (
                      <div
                        key={i}
                        className="relative rounded-xl overflow-hidden"
                        style={{ aspectRatio: "1", background: "linear-gradient(160deg,#14141E,#0E0E1A)", border: "1px solid rgba(47,212,138,0.14)" }}
                      >
                        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 p-3">
                          <div className="text-3xl">🎱</div>
                          <p className="text-xs text-gray-400 text-center leading-tight">{photo.label}</p>
                          {photo.approved ? (
                            <span className="text-[10px] px-2 py-0.5 rounded-full bg-bilhar-green/20 text-bilhar-green-bright">Aprovada</span>
                          ) : (
                            <span className="text-[10px] px-2 py-0.5 rounded-full bg-yellow-500/20 text-yellow-300">Em análise</span>
                          )}
                        </div>
                      </div>
                    ))}
                    <button
                      className="rounded-xl flex flex-col items-center justify-center gap-2 transition-all"
                      style={{ aspectRatio: "1", background: "transparent", border: "2px dashed rgba(47,212,138,0.2)" }}
                    >
                      <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: "rgba(47,212,138,0.08)" }}>
                        <Image style={{ width: 16, height: 16, color: "#2FD48A" }} />
                      </div>
                      <p className="text-xs text-gray-400">Nova foto</p>
                    </button>
                  </div>
                </div>
                <div className="glass-card p-5">
                  <p className="text-sm text-gray-400">
                    <span className="font-semibold" style={{ color: "#2FD48A" }}>Dica:</span>{" "}
                    Fotos aprovadas ganham destaque na página inicial e nas redes sociais. Envie fotos com boa iluminação para maior chance de aprovação.
                  </p>
                </div>
              </motion.div>
            )}

            {activeTab === "conta" && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass-card p-6 space-y-4"
              >
                <h2 className="font-semibold text-white text-lg mb-4">Dados da Conta</h2>
                {[
                  { label: "Nome Completo", value: "Carlos Silva", type: "text" },
                  { label: "E-mail", value: "carlos@email.com", type: "email" },
                  { label: "Telefone", value: "(11) 99999-0000", type: "tel" },
                ].map((field) => (
                  <div key={field.label}>
                    <label className="text-xs text-gray-400 mb-1.5 block">{field.label}</label>
                    <input
                      defaultValue={field.value}
                      type={field.type}
                      className="w-full bg-bilhar-dark border border-bilhar-green/20 rounded-xl px-4 py-3 text-sm text-white focus:border-bilhar-green/50 focus:outline-none"
                    />
                  </div>
                ))}
                <button className="btn-gold px-6 py-2.5 rounded-xl text-sm font-semibold mt-2">
                  Salvar Alterações
                </button>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
