"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Save, Store, Truck, CreditCard, Bell, Shield, Globe, Mail, Phone } from "lucide-react";

const TABS = [
  { id: "loja", label: "Loja", icon: Store },
  { id: "entrega", label: "Entrega", icon: Truck },
  { id: "pagamentos", label: "Pagamentos", icon: CreditCard },
  { id: "notificacoes", label: "NotificaÃ§Ãµes", icon: Bell },
  { id: "seguranca", label: "SeguranÃ§a", icon: Shield },
];

function Field({ label, defaultValue, type = "text", placeholder = "" }: { label: string; defaultValue?: string; type?: string; placeholder?: string }) {
  return (
    <div>
      <label className="text-xs text-gray-400 mb-1.5 block">{label}</label>
      <input
        type={type}
        defaultValue={defaultValue}
        placeholder={placeholder}
        className="w-full bg-bilhar-dark border border-bilhar-green/20 rounded-xl px-4 py-3 text-sm text-white placeholder:text-gray-500 focus:border-bilhar-green focus:outline-none transition-colors"
      />
    </div>
  );
}

function Toggle({ label, desc, defaultChecked = false }: { label: string; desc: string; defaultChecked?: boolean }) {
  const [on, setOn] = useState(defaultChecked);
  return (
    <div className="flex items-start justify-between gap-4">
      <div>
        <p className="text-sm text-white font-medium">{label}</p>
        <p className="text-xs text-gray-400 mt-0.5">{desc}</p>
      </div>
      <button
        onClick={() => setOn(!on)}
        className="flex-shrink-0 w-10 h-5 rounded-full transition-all duration-200 relative"
        style={{ background: on ? "#820000" : "rgba(255,255,255,0.1)" }}
      >
        <div
          className="absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-all duration-200"
          style={{ left: on ? "calc(100% - 18px)" : "2px" }}
        />
      </button>
    </div>
  );
}

export default function AdminConfiguracoesPage() {
  const [activeTab, setActiveTab] = useState("loja");
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="p-6 lg:p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display font-bold text-3xl text-white">ConfiguraÃ§Ãµes</h1>
          <p className="text-gray-400 mt-1">Gerencie as configuraÃ§Ãµes do painel</p>
        </div>
        <button
          onClick={handleSave}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all ${saved ? "bg-bilhar-green/20 text-bilhar-green-bright border border-bilhar-green/30" : "btn-gold"}`}
        >
          <Save className="w-4 h-4" />
          {saved ? "Salvo!" : "Salvar"}
        </button>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Sidebar */}
        <div className="lg:w-48 flex-shrink-0">
          <div className="glass-card p-2 space-y-1 lg:sticky lg:top-24">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
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
          <motion.div key={activeTab} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>

            {activeTab === "loja" && (
              <div className="space-y-6">
                <div className="glass-card p-6">
                  <h2 className="font-semibold text-white mb-5 flex items-center gap-2">
                    <Globe className="w-4 h-4 text-bilhar-green-bright" /> InformaÃ§Ãµes da Loja
                  </h2>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <Field label="Nome da Loja" defaultValue="Sinuca Ideal" />
                    <Field label="Slogan" defaultValue="A mesa ideal para vocÃª" />
                    <div className="sm:col-span-2">
                      <label className="text-xs text-gray-400 mb-1.5 block">DescriÃ§Ã£o</label>
                      <textarea
                        defaultValue="A maior plataforma brasileira de mesas de sinuca profissionais."
                        rows={3}
                        className="w-full bg-bilhar-dark border border-bilhar-green/20 rounded-xl px-4 py-3 text-sm text-white placeholder:text-gray-500 focus:border-bilhar-green focus:outline-none resize-none"
                      />
                    </div>
                    <Field label="CNPJ" defaultValue="00.000.000/0001-00" />
                    <Field label="RazÃ£o Social" defaultValue="Sinuca Ideal Ltda" />
                  </div>
                </div>
                <div className="glass-card p-6">
                  <h2 className="font-semibold text-white mb-5 flex items-center gap-2">
                    <Mail className="w-4 h-4 text-bilhar-green-bright" /> Contato
                  </h2>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <Field label="E-mail de Contato" defaultValue="contato@sinucaideal.com.br" type="email" />
                    <Field label="E-mail Financeiro" defaultValue="financeiro@sinucaideal.com.br" type="email" />
                    <Field label="Telefone/WhatsApp" defaultValue="(11) 99999-0000" />
                    <Field label="Cidade/Estado" defaultValue="SÃ£o Paulo, SP" />
                  </div>
                </div>
              </div>
            )}

            {activeTab === "entrega" && (
              <div className="space-y-6">
                <div className="glass-card p-6">
                  <h2 className="font-semibold text-white mb-5 flex items-center gap-2">
                    <Truck className="w-4 h-4 text-bilhar-green-bright" /> ConfiguraÃ§Ãµes de Entrega
                  </h2>
                  <div className="grid sm:grid-cols-2 gap-4 mb-6">
                    <Field label="CEP de Origem" defaultValue="01310-100" />
                    <Field label="Prazo MÃ­nimo (dias Ãºteis)" defaultValue="7" type="number" />
                    <Field label="Prazo MÃ¡ximo (dias Ãºteis)" defaultValue="21" type="number" />
                    <Field label="Peso MÃ¡ximo por Entrega (kg)" defaultValue="500" type="number" />
                  </div>
                  <div className="space-y-4">
                    <Toggle label="Frete GrÃ¡tis para Grande SP" desc="CEPs comeÃ§ando com 01-08 tÃªm frete grÃ¡tis" defaultChecked />
                    <Toggle label="Montagem Inclusa no Frete" desc="O valor de montagem Ã© incluÃ­do no cÃ¡lculo do frete" defaultChecked />
                    <Toggle label="Agendamento ObrigatÃ³rio" desc="Exige que o cliente escolha data de entrega no checkout" defaultChecked />
                  </div>
                </div>
                <div className="glass-card p-6">
                  <h2 className="font-semibold text-white mb-4">RegiÃµes e Valores</h2>
                  <div className="space-y-3">
                    {[
                      { region: "Grande SÃ£o Paulo", value: "GrÃ¡tis" },
                      { region: "Interior SP", value: "R$ 350" },
                      { region: "Sul e Sudeste", value: "R$ 450" },
                      { region: "Centro-Oeste e Nordeste", value: "R$ 650" },
                      { region: "Norte", value: "Sob consulta" },
                    ].map((r) => (
                      <div key={r.region} className="flex items-center justify-between py-2" style={{ borderBottom: "1px solid rgba(47,212,138,0.07)" }}>
                        <span className="text-sm text-gray-300">{r.region}</span>
                        <span className="text-sm font-semibold text-white">{r.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === "pagamentos" && (
              <div className="space-y-6">
                <div className="glass-card p-6">
                  <h2 className="font-semibold text-white mb-5 flex items-center gap-2">
                    <CreditCard className="w-4 h-4 text-bilhar-green-bright" /> Gateway de Pagamentos
                  </h2>
                  <div className="grid sm:grid-cols-2 gap-4 mb-6">
                    <Field label="Mercado Pago â€” Public Key" defaultValue="APP_USR-..." placeholder="APP_USR-..." />
                    <Field label="Mercado Pago â€” Access Token" type="password" placeholder="APP_USR-..." />
                  </div>
                  <div className="space-y-4">
                    <Toggle label="Aceitar PIX" desc="Desconto de 5% automÃ¡tico para pagamentos via PIX" defaultChecked />
                    <Toggle label="Aceitar CartÃ£o de CrÃ©dito" desc="Parcelamento em atÃ© 12x sem juros" defaultChecked />
                    <Toggle label="Aceitar Boleto" desc="Desconto de 3% para pagamento via boleto" defaultChecked />
                    <Toggle label="Modo Sandbox (Testes)" desc="Ativar apenas para testes â€” nÃ£o processa pagamentos reais" />
                  </div>
                </div>
                <div className="glass-card p-6">
                  <h2 className="font-semibold text-white mb-4">Descontos</h2>
                  <div className="grid sm:grid-cols-3 gap-4">
                    <Field label="Desconto PIX (%)" defaultValue="5" type="number" />
                    <Field label="Desconto Boleto (%)" defaultValue="3" type="number" />
                    <Field label="MÃ¡x. Parcelas (s/juros)" defaultValue="12" type="number" />
                  </div>
                </div>
              </div>
            )}

            {activeTab === "notificacoes" && (
              <div className="glass-card p-6 space-y-5">
                <h2 className="font-semibold text-white mb-2 flex items-center gap-2">
                  <Bell className="w-4 h-4 text-bilhar-green-bright" /> NotificaÃ§Ãµes por E-mail
                </h2>
                {[
                  { label: "Novo Pedido", desc: "Receba um e-mail a cada novo pedido confirmado", checked: true },
                  { label: "Pagamento Confirmado", desc: "NotificaÃ§Ã£o quando o pagamento for aprovado", checked: true },
                  { label: "Contrato de Aluguel Assinado", desc: "Quando o cliente assinar um novo contrato", checked: true },
                  { label: "Contrato em Atraso", desc: "Alerta quando um aluguel estiver em atraso", checked: true },
                  { label: "Estoque Baixo", desc: "NotificaÃ§Ã£o quando o estoque de um produto for â‰¤3 unidades", checked: false },
                  { label: "Novo Cadastro de Cliente", desc: "Aviso a cada novo usuÃ¡rio registrado", checked: false },
                  { label: "RelatÃ³rio Semanal", desc: "Resumo das vendas enviado toda segunda-feira", checked: true },
                ].map((n) => (
                  <Toggle key={n.label} label={n.label} desc={n.desc} defaultChecked={n.checked} />
                ))}
              </div>
            )}

            {activeTab === "seguranca" && (
              <div className="space-y-6">
                <div className="glass-card p-6">
                  <h2 className="font-semibold text-white mb-5 flex items-center gap-2">
                    <Shield className="w-4 h-4 text-bilhar-green-bright" /> SeguranÃ§a da Conta
                  </h2>
                  <div className="grid sm:grid-cols-2 gap-4 mb-6">
                    <Field label="E-mail do Administrador" defaultValue="admin@sinucaideal.com.br" type="email" />
                    <Field label="Nova Senha" type="password" placeholder="â€¢â€¢â€¢â€¢â€¢â€¢â€¢â€¢â€¢â€¢â€¢â€¢" />
                  </div>
                  <div className="space-y-4">
                    <Toggle label="AutenticaÃ§Ã£o em Dois Fatores (2FA)" desc="Exige cÃ³digo no login alÃ©m da senha" defaultChecked />
                    <Toggle label="SessÃµes SimultÃ¢neas" desc="Permitir login em mÃºltiplos dispositivos ao mesmo tempo" />
                    <Toggle label="Log de Auditoria" desc="Registrar todas as aÃ§Ãµes administrativas no painel" defaultChecked />
                  </div>
                </div>
                <div className="glass-card p-5 flex items-start gap-3" style={{ borderColor: "rgba(239,68,68,0.2)", background: "rgba(239,68,68,0.03)" }}>
                  <Shield className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-semibold text-white">Zona de Perigo</p>
                    <p className="text-xs text-gray-400 mt-1 mb-3">AÃ§Ãµes irreversÃ­veis. Proceda com cautela.</p>
                    <button className="text-xs px-3 py-1.5 rounded-lg border border-red-500/40 text-red-400 hover:bg-red-500/10 transition-all">
                      Limpar todos os dados de sessÃ£o
                    </button>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}

