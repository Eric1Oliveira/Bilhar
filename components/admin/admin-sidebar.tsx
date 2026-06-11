"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard, Package, ShoppingCart, FileText,
  Users, Settings, BarChart3, LogOut, Sparkles
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/admin", icon: LayoutDashboard, label: "Dashboard", exact: true },
  { href: "/admin/produtos", icon: Package, label: "Produtos" },
  { href: "/admin/pedidos", icon: ShoppingCart, label: "Pedidos" },
  { href: "/admin/contratos", icon: FileText, label: "Contratos" },
  { href: "/admin/clientes", icon: Users, label: "Clientes" },
  { href: "/admin/relatorios", icon: BarChart3, label: "Relatórios" },
  { href: "/admin/configuracoes", icon: Settings, label: "Configurações" },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-60 min-h-screen bg-bilhar-dark-2 border-r border-bilhar-green/20 flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-bilhar-green/20">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-bilhar-green flex items-center justify-center">
            <span className="text-white font-display font-bold">S</span>
          </div>
          <div>
            <span className="font-display font-bold text-white text-sm">Sinuca</span>
            <span className="font-display font-bold gradient-gold text-sm ml-1">Ideal</span>
            <p className="text-[10px] text-gray-500">Admin Panel</p>
          </div>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item) => {
          const isActive = item.exact ? pathname === item.href : pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all",
                isActive
                  ? "bg-bilhar-green/20 text-bilhar-green-bright border border-bilhar-green/30"
                  : "text-gray-400 hover:text-white hover:bg-white/5"
              )}
            >
              <item.icon className="w-4 h-4 flex-shrink-0" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-bilhar-green/20">
        <button className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-400 hover:text-red-400 hover:bg-red-500/5 transition-all w-full">
          <LogOut className="w-4 h-4" />
          Sair
        </button>
      </div>
    </aside>
  );
}
