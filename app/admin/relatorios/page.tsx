import { formatCurrency } from "@/lib/utils";
import { TrendingUp, TrendingDown, BarChart3, Users, ShoppingCart, FileText, Package } from "lucide-react";

const MONTHLY_DATA = [
  { month: "Jul/24", vendas: 32000, alugueis: 8400, pedidos: 8 },
  { month: "Ago/24", vendas: 28500, alugueis: 9200, pedidos: 7 },
  { month: "Set/24", vendas: 41000, alugueis: 9800, pedidos: 10 },
  { month: "Out/24", vendas: 38000, alugueis: 10500, pedidos: 9 },
  { month: "Nov/24", vendas: 45000, alugueis: 11200, pedidos: 11 },
  { month: "Dez/24", vendas: 52000, alugueis: 12400, pedidos: 14 },
];

const TOP_PRODUCTS = [
  { name: "Pro 9 Standard", sold: 12, revenue: 98400, percent: 35 },
  { name: "Championship Pro 10", sold: 5, revenue: 49000, percent: 18 },
  { name: "Snooker Royal 12P", sold: 3, revenue: 36000, percent: 13 },
  { name: "Lazer Plus 8", sold: 9, revenue: 40500, percent: 15 },
  { name: "Semi Pro 9 Elite", sold: 6, revenue: 34800, percent: 12 },
  { name: "Compacta Urban 7", sold: 7, revenue: 22400, percent: 7 },
];

const maxBar = Math.max(...MONTHLY_DATA.map((d) => d.vendas + d.alugueis));

export default function AdminRelatoriosPage() {
  const totalRevenue = MONTHLY_DATA.reduce((acc, d) => acc + d.vendas + d.alugueis, 0);
  const lastMonth = MONTHLY_DATA[MONTHLY_DATA.length - 1];
  const prevMonth = MONTHLY_DATA[MONTHLY_DATA.length - 2];
  const growth = (((lastMonth.vendas + lastMonth.alugueis) / (prevMonth.vendas + prevMonth.alugueis)) - 1) * 100;

  return (
    <div className="p-6 lg:p-8">
      <div className="mb-8">
        <h1 className="font-display font-bold text-3xl text-white">RelatÃ³rios</h1>
        <p className="text-gray-400 mt-1">VisÃ£o geral dos Ãºltimos 6 meses</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        {[
          { label: "Receita Total (6m)", value: formatCurrency(totalRevenue), icon: BarChart3, color: "text-bilhar-green-bright", bg: "bg-bilhar-green/10", trend: "+18.2%", up: true },
          { label: "Pedidos (6m)", value: MONTHLY_DATA.reduce((a, d) => a + d.pedidos, 0), icon: ShoppingCart, color: "text-blue-400", bg: "bg-blue-500/10", trend: "+12.5%", up: true },
          { label: "Receita de AluguÃ©is", value: formatCurrency(MONTHLY_DATA.reduce((a, d) => a + d.alugueis, 0)), icon: FileText, color: "text-purple-400", bg: "bg-purple-500/10", trend: "+22.8%", up: true },
          { label: "Crescimento (mÃªs)", value: `${growth.toFixed(1)}%`, icon: TrendingUp, color: "text-bilhar-green-bright", bg: "bg-bilhar-green/10", trend: "vs mÃªs anterior", up: growth >= 0 },
        ].map((kpi, i) => (
          <div key={kpi.label} className="glass-card p-5">
            <div className="flex items-start justify-between mb-3">
              <div className={`w-9 h-9 rounded-xl ${kpi.bg} flex items-center justify-center`}>
                <kpi.icon className={`w-4 h-4 ${kpi.color}`} />
              </div>
              <span className={`flex items-center gap-0.5 text-xs font-medium ${kpi.up ? "text-bilhar-green-bright" : "text-red-400"}`}>
                {kpi.up ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                {kpi.trend}
              </span>
            </div>
            <p className={`font-display font-bold text-2xl ${kpi.color} mb-1`}>{kpi.value}</p>
            <p className="text-gray-400 text-xs">{kpi.label}</p>
          </div>
        ))}
      </div>

      {/* Chart â€” Receita Mensal */}
      <div className="glass-card p-6 mb-8">
        <h2 className="font-semibold text-white mb-6 flex items-center gap-2">
          <BarChart3 className="w-4 h-4 text-bilhar-green-bright" />
          Receita Mensal
        </h2>
        <div className="flex items-end gap-3 h-48">
          {MONTHLY_DATA.map((d) => {
            const totalH = ((d.vendas + d.alugueis) / maxBar) * 100;
            const rentalH = (d.alugueis / (d.vendas + d.alugueis)) * totalH;
            const salesH = totalH - rentalH;
            return (
              <div key={d.month} className="flex-1 flex flex-col items-center gap-1.5">
                <div className="w-full flex flex-col items-stretch justify-end" style={{ height: "100%" }}>
                  <div className="w-full rounded-t-sm" style={{ height: `${salesH}%`, background: "rgba(26,122,82,0.7)", minHeight: 4 }} />
                  <div className="w-full rounded-b-sm" style={{ height: `${rentalH}%`, background: "rgba(47,212,138,0.5)", minHeight: 4 }} />
                </div>
                <p className="text-[10px] text-gray-500 text-center whitespace-nowrap">{d.month}</p>
              </div>
            );
          })}
        </div>
        <div className="flex items-center gap-6 mt-4 justify-center">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-sm" style={{ background: "rgba(26,122,82,0.7)" }} />
            <span className="text-xs text-gray-400">Vendas</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-sm" style={{ background: "rgba(47,212,138,0.5)" }} />
            <span className="text-xs text-gray-400">AluguÃ©is</span>
          </div>
        </div>
      </div>

      {/* Top Products */}
      <div className="glass-card p-6 mb-8">
        <h2 className="font-semibold text-white mb-6 flex items-center gap-2">
          <Package className="w-4 h-4 text-bilhar-green-bright" />
          Produtos Mais Vendidos
        </h2>
        <div className="space-y-4">
          {TOP_PRODUCTS.map((p) => (
            <div key={p.name}>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-sm text-white">{p.name}</span>
                <div className="flex items-center gap-4">
                  <span className="text-xs text-gray-400">{p.sold} unid.</span>
                  <span className="text-sm font-semibold text-bilhar-green-bright">{formatCurrency(p.revenue)}</span>
                </div>
              </div>
              <div className="h-1.5 rounded-full bg-bilhar-dark">
                <div
                  className="h-full rounded-full"
                  style={{
                    width: `${p.percent}%`,
                    background: "linear-gradient(90deg, rgba(26,122,82,0.8), rgba(47,212,138,0.8))",
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Summary table */}
      <div className="glass-card overflow-hidden">
        <div className="p-5 border-b border-bilhar-green/10">
          <h2 className="font-semibold text-white flex items-center gap-2">
            <Users className="w-4 h-4 text-bilhar-green-bright" />
            Resumo Mensal Detalhado
          </h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-xs text-gray-400 uppercase tracking-wider border-b border-bilhar-green/10">
                <th className="text-left px-6 py-3">MÃªs</th>
                <th className="text-left px-6 py-3">Vendas</th>
                <th className="text-left px-6 py-3">AluguÃ©is</th>
                <th className="text-left px-6 py-3">Total</th>
                <th className="text-left px-6 py-3">Pedidos</th>
              </tr>
            </thead>
            <tbody>
              {MONTHLY_DATA.map((row) => (
                <tr key={row.month} className="border-b border-bilhar-green/5">
                  <td className="px-6 py-3 text-sm text-white">{row.month}</td>
                  <td className="px-6 py-3 text-sm text-gray-300">{formatCurrency(row.vendas)}</td>
                  <td className="px-6 py-3 text-sm text-bilhar-green-bright">{formatCurrency(row.alugueis)}</td>
                  <td className="px-6 py-3 text-sm font-semibold text-white">{formatCurrency(row.vendas + row.alugueis)}</td>
                  <td className="px-6 py-3 text-sm text-gray-300">{row.pedidos}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

