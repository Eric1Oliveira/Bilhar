"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { useCartStore } from "@/store/cart";
import { formatCurrency } from "@/lib/utils";
import { CreditCard, QrCode, FileText, MapPin, User, Package, ChevronRight, Lock, Truck } from "lucide-react";

const checkoutSchema = z.object({
  // Personal
  full_name: z.string().min(3, "Nome completo obrigatório"),
  email: z.string().email("E-mail inválido"),
  phone: z.string().min(10, "Telefone inválido"),
  cpf: z.string().min(11, "CPF inválido"),
  // Address
  cep: z.string().min(8, "CEP inválido"),
  logradouro: z.string().min(3, "Endereço obrigatório"),
  numero: z.string().min(1, "Número obrigatório"),
  complemento: z.string().optional(),
  bairro: z.string().min(2, "Bairro obrigatório"),
  cidade: z.string().min(2, "Cidade obrigatória"),
  estado: z.string().length(2, "Estado inválido"),
});

type CheckoutForm = z.infer<typeof checkoutSchema>;

const PAYMENT_METHODS = [
  { id: "pix", label: "PIX", desc: "Aprovação imediata", icon: QrCode, discount: "5% de desconto" },
  { id: "cartao_credito", label: "Cartão de Crédito", desc: "Até 12x sem juros", icon: CreditCard, discount: null },
  { id: "boleto", label: "Boleto", desc: "Vence em 3 dias úteis", icon: FileText, discount: "3% de desconto" },
];

export function CheckoutClient() {
  const { items, getTotal, clearCart } = useCartStore();
  const [paymentMethod, setPaymentMethod] = useState("pix");
  const [step, setStep] = useState<"dados" | "pagamento" | "confirmado">("dados");
  const [cep, setCep] = useState("");
  const [shipping, setShipping] = useState<number | null>(null);
  const [isLoadingCep, setIsLoadingCep] = useState(false);

  const { register, handleSubmit, setValue, formState: { errors } } = useForm<CheckoutForm>({
    resolver: zodResolver(checkoutSchema),
  });

  const total = getTotal();
  const discount = paymentMethod === "pix" ? total * 0.05 : paymentMethod === "boleto" ? total * 0.03 : 0;
  const finalTotal = total - discount + (shipping ?? 0);

  async function handleCepLookup(cepValue: string) {
    if (cepValue.length < 8) return;
    setIsLoadingCep(true);
    try {
      const res = await fetch(`https://viacep.com.br/ws/${cepValue.replace("-", "")}/json/`);
      const data = await res.json();
      if (!data.erro) {
        setValue("logradouro", data.logradouro);
        setValue("bairro", data.bairro);
        setValue("cidade", data.localidade);
        setValue("estado", data.uf);
        setShipping(cepValue.startsWith("01") || cepValue.startsWith("02") ? 0 : 450);
      }
    } catch {}
    setIsLoadingCep(false);
  }

  const onSubmit = (data: CheckoutForm) => {
    setStep("pagamento");
  };

  if (step === "confirmado") {
    return (
      <div className="min-h-screen bg-bilhar-dark pt-20 flex items-center justify-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-center max-w-md mx-auto px-4"
        >
          <div className="w-24 h-24 rounded-full bg-bilhar-green/20 border-4 border-bilhar-green flex items-center justify-center mx-auto mb-6">
            <span className="text-4xl">🎱</span>
          </div>
          <h1 className="font-display font-bold text-3xl text-white mb-3">Pedido Confirmado!</h1>
          <p className="text-gray-400 mb-8">
            Recebemos seu pedido. Você receberá um e-mail com os detalhes e atualizações do status.
          </p>
          <a href="/" className="btn-gold px-8 py-3 rounded-xl inline-flex font-semibold">
            Voltar ao Início
          </a>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bilhar-dark pt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <h1 className="font-display font-bold text-3xl text-white mb-8">
          {step === "dados" ? "Dados do Pedido" : "Pagamento"}
        </h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Form */}
          <div className="lg:col-span-2">
            <AnimatePresence mode="wait">
              {step === "dados" ? (
                <motion.form
                  key="dados"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  onSubmit={handleSubmit(onSubmit)}
                  className="space-y-6"
                >
                  {/* Personal Data */}
                  <div className="glass-card p-6">
                    <h2 className="font-semibold text-white mb-4 flex items-center gap-2">
                      <User style={{ width: 16, height: 16, color: "#2FD48A" }} />
                      Dados Pessoais
                    </h2>
                    <div className="grid sm:grid-cols-2 gap-4">
                      {[
                        { name: "full_name" as const, label: "Nome Completo", placeholder: "Seu nome completo", colSpan: 2 },
                        { name: "email" as const, label: "E-mail", placeholder: "seu@email.com" },
                        { name: "phone" as const, label: "Telefone/WhatsApp", placeholder: "(11) 99999-0000" },
                        { name: "cpf" as const, label: "CPF", placeholder: "000.000.000-00", colSpan: 2 },
                      ].map((field) => (
                        <div key={field.name} className={field.colSpan === 2 ? "sm:col-span-2" : ""}>
                          <label className="text-xs text-gray-400 mb-1.5 block">{field.label}</label>
                          <input
                            {...register(field.name)}
                            placeholder={field.placeholder}
                            className="w-full bg-bilhar-dark border border-bilhar-green/20 rounded-xl px-4 py-3 text-sm text-white placeholder:text-gray-500 focus:border-bilhar-green/50 focus:outline-none transition-colors"
                          />
                          {errors[field.name] && (
                            <p className="text-xs text-red-400 mt-1">{errors[field.name]?.message}</p>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Address */}
                  <div className="glass-card p-6">
                    <h2 className="font-semibold text-white mb-4 flex items-center gap-2">
                      <MapPin style={{ width: 16, height: 16, color: "#2FD48A" }} />
                      Endereço de Entrega
                    </h2>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs text-gray-400 mb-1.5 block">CEP</label>
                        <input
                          {...register("cep")}
                          placeholder="00000-000"
                          maxLength={9}
                          onChange={(e) => {
                            const val = e.target.value.replace(/\D/g, "");
                            setCep(val);
                            if (val.length === 8) handleCepLookup(val);
                          }}
                          className="w-full bg-bilhar-dark border border-bilhar-green/20 rounded-xl px-4 py-3 text-sm text-white placeholder:text-gray-500 focus:border-bilhar-green/50 focus:outline-none"
                        />
                        {isLoadingCep && <p className="text-xs text-bilhar-green-bright mt-1">Buscando endereço...</p>}
                      </div>
                      <div className="sm:col-span-2">
                        <label className="text-xs text-gray-400 mb-1.5 block">Logradouro</label>
                        <input {...register("logradouro")} placeholder="Rua, Av., etc." className="w-full bg-bilhar-dark border border-bilhar-green/20 rounded-xl px-4 py-3 text-sm text-white placeholder:text-gray-500 focus:border-bilhar-green/50 focus:outline-none" />
                      </div>
                      <div>
                        <label className="text-xs text-gray-400 mb-1.5 block">Número</label>
                        <input {...register("numero")} placeholder="123" className="w-full bg-bilhar-dark border border-bilhar-green/20 rounded-xl px-4 py-3 text-sm text-white placeholder:text-gray-500 focus:border-bilhar-green/50 focus:outline-none" />
                      </div>
                      <div>
                        <label className="text-xs text-gray-400 mb-1.5 block">Complemento</label>
                        <input {...register("complemento")} placeholder="Apto, sala, etc." className="w-full bg-bilhar-dark border border-bilhar-green/20 rounded-xl px-4 py-3 text-sm text-white placeholder:text-gray-500 focus:border-bilhar-green/50 focus:outline-none" />
                      </div>
                      <div>
                        <label className="text-xs text-gray-400 mb-1.5 block">Bairro</label>
                        <input {...register("bairro")} placeholder="Seu bairro" className="w-full bg-bilhar-dark border border-bilhar-green/20 rounded-xl px-4 py-3 text-sm text-white placeholder:text-gray-500 focus:border-bilhar-green/50 focus:outline-none" />
                      </div>
                      <div>
                        <label className="text-xs text-gray-400 mb-1.5 block">Cidade</label>
                        <input {...register("cidade")} placeholder="Sua cidade" className="w-full bg-bilhar-dark border border-bilhar-green/20 rounded-xl px-4 py-3 text-sm text-white placeholder:text-gray-500 focus:border-bilhar-green/50 focus:outline-none" />
                      </div>
                      <div>
                        <label className="text-xs text-gray-400 mb-1.5 block">Estado</label>
                        <input {...register("estado")} placeholder="SP" maxLength={2} className="w-full bg-bilhar-dark border border-bilhar-green/20 rounded-xl px-4 py-3 text-sm text-white placeholder:text-gray-500 focus:border-bilhar-green/50 focus:outline-none" />
                      </div>
                    </div>

                    {shipping !== null && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-4 p-4 rounded-xl bg-bilhar-green/10 border border-bilhar-green/30 flex items-center gap-3"
                      >
                        <Truck className="w-4 h-4 text-bilhar-green-bright" />
                        <div>
                          <p className="text-sm text-white font-medium">
                            {shipping === 0 ? "Frete Grátis" : `Frete: ${formatCurrency(shipping)}`}
                          </p>
                          <p className="text-xs text-gray-400">Entrega + montagem profissional</p>
                        </div>
                      </motion.div>
                    )}
                  </div>

                  <button type="submit" className="w-full btn-gold py-4 rounded-xl font-semibold text-base flex items-center justify-center gap-2">
                    Continuar para Pagamento
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </motion.form>
              ) : (
                <motion.div
                  key="pagamento"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-6"
                >
                  {/* Payment Methods */}
                  <div className="glass-card p-6">
                    <h2 className="font-semibold text-white mb-4 flex items-center gap-2">
                      <CreditCard style={{ width: 16, height: 16, color: "#2FD48A" }} />
                      Forma de Pagamento
                    </h2>
                    <div className="space-y-3">
                      {PAYMENT_METHODS.map((method) => (
                        <button
                          key={method.id}
                          onClick={() => setPaymentMethod(method.id)}
                          className={`w-full text-left p-4 rounded-xl border-2 transition-all flex items-center gap-4 ${
                            paymentMethod === method.id
                              ? "border-bilhar-green bg-bilhar-green/5"
                              : "border-bilhar-green/20 hover:border-bilhar-green/40"
                          }`}
                        >
                          <method.icon style={{ width: 20, height: 20, color: paymentMethod === method.id ? "#2FD48A" : "rgba(107,114,128,1)" }} />
                          <div className="flex-1">
                            <p className="text-sm font-medium text-white">{method.label}</p>
                            <p className="text-xs text-gray-400">{method.desc}</p>
                          </div>
                          {method.discount && (
                            <span className="text-xs font-semibold px-2 py-1 rounded-full bg-bilhar-green/20 text-bilhar-green-bright">
                              {method.discount}
                            </span>
                          )}
                        </button>
                      ))}
                    </div>
                  </div>

                  {paymentMethod === "pix" && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="glass-card p-6 text-center"
                    >
                      <div className="w-40 h-40 bg-white rounded-xl mx-auto flex items-center justify-center mb-4">
                        <QrCode className="w-24 h-24 text-bilhar-dark" />
                      </div>
                      <p className="text-sm text-gray-400">QR Code gerado após confirmar o pedido</p>
                      <p className="text-sm font-semibold text-bilhar-green-bright mt-1">
                        Total com desconto: {formatCurrency(total * 0.95)}
                      </p>
                    </motion.div>
                  )}

                  {paymentMethod === "cartao_credito" && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="glass-card p-6 space-y-4"
                    >
                      <div>
                        <label className="text-xs text-gray-400 mb-1.5 block">Número do Cartão</label>
                        <input placeholder="0000 0000 0000 0000" className="w-full bg-bilhar-dark border border-bilhar-green/20 rounded-xl px-4 py-3 text-sm text-white placeholder:text-gray-500 focus:border-bilhar-green/50 focus:outline-none" />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="text-xs text-gray-400 mb-1.5 block">Validade</label>
                          <input placeholder="MM/AA" className="w-full bg-bilhar-dark border border-bilhar-green/20 rounded-xl px-4 py-3 text-sm text-white placeholder:text-gray-500 focus:border-bilhar-green/50 focus:outline-none" />
                        </div>
                        <div>
                          <label className="text-xs text-gray-400 mb-1.5 block">CVV</label>
                          <input placeholder="000" className="w-full bg-bilhar-dark border border-bilhar-green/20 rounded-xl px-4 py-3 text-sm text-white placeholder:text-gray-500 focus:border-bilhar-green/50 focus:outline-none" />
                        </div>
                      </div>
                      <div>
                        <label className="text-xs text-gray-400 mb-1.5 block">Parcelas</label>
                        <select className="w-full bg-bilhar-dark border border-bilhar-green/20 rounded-xl px-4 py-3 text-sm text-white focus:border-bilhar-green/50 focus:outline-none">
                          {[1, 2, 3, 6, 10, 12].map((p) => (
                            <option key={p} value={p}>{p}x de {formatCurrency(total / p)} {p === 1 || p <= 3 ? "(sem juros)" : ""}</option>
                          ))}
                        </select>
                      </div>
                    </motion.div>
                  )}

                  <button
                    onClick={() => setStep("confirmado")}
                    className="w-full btn-gold py-4 rounded-xl font-semibold text-base flex items-center justify-center gap-2"
                  >
                    <Lock className="w-4 h-4" />
                    Finalizar Pedido — {formatCurrency(finalTotal)}
                  </button>

                  <button
                    onClick={() => setStep("dados")}
                    className="w-full text-center text-sm text-gray-400 hover:text-white transition-colors"
                  >
                    ← Voltar aos dados
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Order Summary */}
          <div>
            <div className="glass-card p-6 sticky top-24">
              <h2 className="font-semibold text-white mb-4 flex items-center gap-2">
                <Package style={{ width: 16, height: 16, color: "#2FD48A" }} />
                Resumo do Pedido
              </h2>

              <div className="space-y-3 mb-6">
                {items.map((item, i) => (
                  <div key={i} className="flex items-center justify-between gap-3 py-2 border-b border-bilhar-green/10 last:border-0">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-white truncate">{item.product.name}</p>
                      <p className="text-xs text-gray-400">
                        {item.type === "aluguel" ? `Aluguel ${item.rental_months}m` : "Compra"} × {item.quantity}
                      </p>
                    </div>
                    <p className="text-sm font-semibold text-white flex-shrink-0">
                      {formatCurrency((item.configuration?.total_price ?? item.product.base_price) * item.quantity)}
                    </p>
                  </div>
                ))}
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex justify-between text-gray-400">
                  <span>Subtotal</span>
                  <span>{formatCurrency(total)}</span>
                </div>
                {shipping !== null && (
                  <div className="flex justify-between text-gray-400">
                    <span>Frete</span>
                    <span>{shipping === 0 ? "Grátis" : formatCurrency(shipping)}</span>
                  </div>
                )}
                {discount > 0 && (
                  <div className="flex justify-between text-bilhar-green-bright">
                    <span>Desconto ({paymentMethod === "pix" ? "5% PIX" : "3% Boleto"})</span>
                    <span>-{formatCurrency(discount)}</span>
                  </div>
                )}
                <div className="flex justify-between text-white font-bold text-base pt-2 border-t border-bilhar-green/20">
                  <span>Total</span>
                  <span className="gradient-gold font-display text-xl">{formatCurrency(finalTotal)}</span>
                </div>
              </div>

              <div className="mt-4 flex items-center gap-2 text-xs text-gray-400">
                <Lock className="w-3 h-3" />
                Pagamento seguro e criptografado
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
