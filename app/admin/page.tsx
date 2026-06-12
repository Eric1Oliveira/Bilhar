import { formatCurrency } from "@/lib/utils";
import { TrendingUp, ShoppingCart, Package, Users, ArrowUpRight, Clock } from "lucide-react";

const STATS = [
  { label: "Receita do Mês", value: formatCurrency(48500), change: "+12.5%", icon: TrendingUp, color: "text-bilhar-green-bright", bg: "bg-bilhar-green/10" },
  { label: "Pedidos Ativos", value: "24", change: "+3", icon: ShoppingCart, color: "text-blue-400", bg: "bg-blue-500/10" },
  { label: "Produtos", value: "12", change: "+1", icon: Package, color: "text-bilhar-green-bright", bg: "bg-bilhar-green/10" },
  { label: "Clientes", value: "342", change: "+18", icon: Users, color: "text-purple-400", bg: "bg-purple-500/10" },
];

const RECENT_ORDERS = [
  { id: "SI-001", client: "Carlos Silva", product: "Pro 9 Standard", value: 8200, status: "producao" },
  { id: "SI-002", client: "Ana Lima", product: "Snooker Royal", value: 650, status: "aluguel_ativo", monthly: true },
  { id: "SI-003", client: "Pedro Costa", product: "Lazer Plus 8", value: 4800, status: "enviado" },
  { id: "SI-004", client: "Mariana Souza", product: "Pro 9 Standard", value: 9100, status: "pendente" },
];

const STATUS_STYLES: Record<string, string> = {
  pendente: "bg-yellow-500/20 text-yellow-300",
  producao: "bg-blue-500/20 text-blue-300",
  enviado: "bg-bilhar-green/20 text-bilhar-green-bright",
  entregue: "bg-gray-500/20 text-gray-300",
  aluguel_ativo: "bg-purple-500/20 text-purple-300",
};

const STATUS_LABELS: Record<string, string> = {
  pendente: "Pendente",
  producao: "Em Produção",
  enviado: "Enviado",
  entregue: "Entregue",
  aluguel_ativo: "Aluguel Ativo",
};

export default function AdminDashboard() {
  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="font-display font-bold text-3xl text-white">Dashboard</h1>
        <p className="text-gray-400 mt-1">Bem-vindo ao painel administrativo</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {STATS.map((stat) => (
          <div key={stat.label} className="glass-card p-6">
            <div className="flex items-start justify-between mb-4">
              <div className={`w-10 h-10 rounded-xl ${stat.bg} flex items-center justify-center`}>
                <stat.icon className={`w-5 h-5 ${stat.color}`} />
              </div>
              <span className="text-xs font-medium text-bilhar-green-bright flex items-center gap-0.5">
                <ArrowUpRight className="w-3 h-3" />
                {stat.change}
              </span>
            </div>
            <p className="font-display font-bold text-2xl text-white mb-1">{stat.value}</p>
            <p className="text-sm text-gray-400">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Recent Orders */}
      <div className="glass-card overflow-hidden">
        <div className="p-6 border-b border-bilhar-green/20 flex items-center justify-between">
          <h2 className="font-semibold text-white flex items-center gap-2">
            <Clock className="w-4 h-4 text-bilhar-green-bright" />
            Pedidos Recentes
          </h2>
          <a href="/admin/pedidos" className="text-sm text-bilhar-green-bright hover:text-white transition-colors">
            Ver todos →
          </a>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-xs text-gray-400 uppercase tracking-wider border-b border-bilhar-green/10">
                <th className="text-left px-6 py-3">Pedido</th>
                <th className="text-left px-6 py-3">Cliente</th>
                <th className="text-left px-6 py-3">Produto</th>
                <th className="text-left px-6 py-3">Valor</th>
                <th className="text-left px-6 py-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {RECENT_ORDERS.map((order) => (
                <tr key={order.id} className="border-b border-bilhar-green/5 hover:bg-white/2 transition-colors">
                  <td className="px-6 py-4 text-sm font-mono text-bilhar-green-bright">{order.id}</td>
                  <td className="px-6 py-4 text-sm text-white">{order.client}</td>
                  <td className="px-6 py-4 text-sm text-gray-400">{order.product}</td>
                  <td className="px-6 py-4 text-sm font-semibold text-white">
                    {formatCurrency(order.value)}
                    {order.monthly && <span className="text-xs text-gray-400">/mês</span>}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${STATUS_STYLES[order.status]}`}>
                      {STATUS_LABELS[order.status]}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
