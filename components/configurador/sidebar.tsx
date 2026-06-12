"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useConfiguratorStore, MOCK_PRODUCTS } from "@/store/configurator";
import { ColorPicker } from "./color-picker";
import { formatCurrency } from "@/lib/utils";
import { ShoppingCart, Save, Eye, ChevronRight, ChevronLeft, Check, RefreshCw } from "lucide-react";
import Link from "next/link";

const WOOD_OPTIONS = [
  { value: "natural",   label: "Natural",   hex: "#DEB887", priceModifier: 0 },
  { value: "nogueira",  label: "Nogueira",  hex: "#6B3A2A", priceModifier: 500 },
  { value: "mogno",     label: "Mogno",     hex: "#8B2500", priceModifier: 800 },
  { value: "carvalho",  label: "Carvalho",  hex: "#9C7B4E", priceModifier: 600 },
  { value: "ebano",     label: "Ébano",     hex: "#2C1810", priceModifier: 1200 },
  { value: "wenge",     label: "Wengê",     hex: "#3D2314", priceModifier: 1500 },
];

const FELT_OPTIONS = [
  { value: "vermelho",  label: "Vermelho",    hex: "#820000", priceModifier: 100 },
  { value: "vinho",     label: "Vinho",       hex: "#722F37", priceModifier: 150 },
  { value: "preto",     label: "Preto",       hex: "#1C1C1C", priceModifier: 200 },
  { value: "verde",     label: "Verde",       hex: "#1a4a2e", priceModifier: 0 },
  { value: "azul",      label: "Azul Royal",  hex: "#1B3A6B", priceModifier: 100 },
  { value: "cinza",     label: "Cinza",       hex: "#4A4A4A", priceModifier: 150 },
];

const LEG_OPTIONS = [
  { value: "torneada",  label: "Torneada",  hex: "#8B4513", priceModifier: 300 },
  { value: "reta",      label: "Reta",      hex: "#6B3A2A", priceModifier: 0 },
  { value: "cromada",   label: "Cromada",   hex: "#C0C0C0", priceModifier: 600 },
  { value: "inox",      label: "Inox",      hex: "#A8A9AD", priceModifier: 900 },
  { value: "fundida",   label: "Fundida",   hex: "#7B5A3A", priceModifier: 450 },
];

const ACCESSORIES = [
  { id: "kit_tacos",           label: "Kit Tacos Premium",    price: 350, desc: "4 tacos profissionais" },
  { id: "suporte_tacos",       label: "Suporte de Tacos",     price: 180, desc: "Para parede ou chão" },
  { id: "luminaria",           label: "Luminária Bilhar",     price: 650, desc: "LED regulável" },
  { id: "placar",              label: "Placar Digital",       price: 120, desc: "Wireless" },
  { id: "cobre_mesa",          label: "Cobre Mesa",           price: 280, desc: "Proteção premium" },
  { id: "bolas_profissionais", label: "Bolas Profissionais",  price: 420, desc: "Jogo completo" },
];

const STEP_TITLES = [
  "Escolha o Modelo",
  "Madeira",
  "Feltro",
  "Tipo de Perna",
  "Acessórios",
  "Dimensões",
];

const STEP_SUBTITLES = [
  "Selecione o tamanho e categoria da mesa",
  "Escolha o acabamento da madeira",
  "Escolha a cor do feltro",
  "Escolha o estilo das pernas",
  "Adicione itens opcionais",
  "Personalize as medidas",
];

export function ConfiguratorSidebar() {
  const {
    currentStep, woodColor, feltColor, legType, accessories,
    totalPrice, selectedProduct,
    setProduct, setWoodColor, setFeltColor, setLegType,
    toggleAccessory, nextStep, prevStep, reset,
  } = useConfiguratorStore();

  return (
    <div className="flex flex-col h-full overflow-hidden">

      {/* ── Price header ── */}
      <div className="flex-shrink-0 px-4 sm:px-5 py-4 border-b border-bilhar-green/10 bg-bilhar-dark/40">
        <div className="flex items-center justify-between gap-3">
          <div className="min-w-0">
            <p className="text-[0.6rem] font-bold tracking-[0.15em] uppercase text-gray-500 mb-0.5">
              Preço total configurado
            </p>
            <AnimatePresence mode="wait">
              <motion.p
                key={totalPrice}
                initial={{ y: -10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 10, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="font-display font-bold text-2xl gradient-gold leading-none"
              >
                {formatCurrency(totalPrice)}
              </motion.p>
            </AnimatePresence>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            <Link
              href="/ar"
              className="flex items-center gap-1.5 text-[0.6rem] font-bold tracking-wider uppercase text-bilhar-green-bright border border-bilhar-green/25 rounded-lg px-2.5 py-1.5 hover:bg-bilhar-green/8 transition-all"
            >
              <Eye className="w-3 h-3" />
              Ver AR
            </Link>
            <button
              onClick={reset}
              title="Reiniciar"
              className="p-1.5 rounded-lg text-gray-600 hover:text-gray-300 hover:bg-white/5 transition-all"
            >
              <RefreshCw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* ── Step content ── */}
      <div className="flex-1 overflow-y-auto overscroll-contain px-4 sm:px-5 py-4 space-y-1">
        {/* Step heading */}
        <div className="mb-4">
          <h2 className="font-display font-bold text-white text-lg leading-tight">
            {STEP_TITLES[currentStep]}
          </h2>
          <p className="text-xs text-gray-500 mt-0.5">{STEP_SUBTITLES[currentStep]}</p>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -16 }}
            transition={{ duration: 0.18 }}
          >

            {/* ── Step 0: Model ── */}
            {currentStep === 0 && (
              <div className="space-y-2.5">
                {MOCK_PRODUCTS.map((model) => {
                  const isSelected = selectedProduct?.id === model.id;
                  return (
                    <button
                      key={model.id}
                      onClick={() => setProduct(model)}
                      className={`w-full text-left p-4 rounded-2xl border-2 transition-all duration-200 ${
                        isSelected
                          ? "border-bilhar-green bg-bilhar-green/8"
                          : "border-bilhar-green/10 hover:border-bilhar-green/30 bg-bilhar-dark/40 hover:bg-bilhar-dark/60"
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-0.5">
                            {isSelected && (
                              <span className="w-4 h-4 rounded-full bg-bilhar-green flex items-center justify-center flex-shrink-0">
                                <Check className="w-2.5 h-2.5 text-white" strokeWidth={3} />
                              </span>
                            )}
                            <p className="font-semibold text-white text-sm leading-tight">{model.name}</p>
                          </div>
                          <p className="text-xs text-gray-500 leading-relaxed mt-1">{model.description}</p>
                          <div className="flex flex-wrap gap-1.5 mt-2">
                            {model.features.slice(0, 3).map((f) => (
                              <span key={f} className="text-[0.6rem] px-2 py-0.5 rounded-full font-medium"
                                style={{ background: "rgba(47,212,138,0.08)", border: "1px solid rgba(47,212,138,0.15)", color: "rgba(47,212,138,0.75)" }}>
                                {f}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div className="text-right flex-shrink-0">
                          <p className="font-display font-bold text-base gradient-gold leading-none">
                            {formatCurrency(model.base_price)}
                          </p>
                          <p className="text-[0.6rem] text-gray-600 mt-1">
                            ou {formatCurrency(model.rental_price_12)}/mês
                          </p>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            )}

            {/* ── Step 1: Wood ── */}
            {currentStep === 1 && (
              <ColorPicker
                options={WOOD_OPTIONS}
                selected={woodColor}
                onSelect={(v) => setWoodColor(v as typeof woodColor)}
              />
            )}

            {/* ── Step 2: Felt ── */}
            {currentStep === 2 && (
              <ColorPicker
                options={FELT_OPTIONS}
                selected={feltColor}
                onSelect={(v) => setFeltColor(v as typeof feltColor)}
                felt
              />
            )}

            {/* ── Step 3: Legs ── */}
            {currentStep === 3 && (
              <ColorPicker
                options={LEG_OPTIONS}
                selected={legType}
                onSelect={(v) => setLegType(v as typeof legType)}
              />
            )}

            {/* ── Step 4: Accessories ── */}
            {currentStep === 4 && (
              <div className="space-y-2">
                {ACCESSORIES.map((acc) => {
                  const isSelected = accessories.includes(acc.id);
                  return (
                    <button
                      key={acc.id}
                      onClick={() => toggleAccessory(acc.id)}
                      className={`w-full text-left p-4 rounded-2xl border-2 transition-all duration-200 flex items-center gap-3 ${
                        isSelected
                          ? "border-bilhar-green bg-bilhar-green/8"
                          : "border-bilhar-green/10 hover:border-bilhar-green/25 bg-bilhar-dark/40"
                      }`}
                    >
                      {/* Checkbox */}
                      <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center flex-shrink-0 transition-all ${
                        isSelected ? "bg-bilhar-green border-bilhar-green" : "border-gray-600"
                      }`}>
                        {isSelected && <Check className="w-3 h-3 text-bilhar-dark" strokeWidth={3} />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-white font-semibold leading-tight">{acc.label}</p>
                        <p className="text-xs text-gray-500 mt-0.5">{acc.desc}</p>
                      </div>
                      <span className={`text-sm font-bold flex-shrink-0 ${isSelected ? "text-bilhar-green-bright" : "text-gray-400"}`}>
                        +{formatCurrency(acc.price)}
                      </span>
                    </button>
                  );
                })}
              </div>
            )}

            {/* ── Step 5: Dimensions ── */}
            {currentStep === 5 && (
              <div className="space-y-4">
                {[
                  { label: "Comprimento (cm)", default: 254 },
                  { label: "Largura (cm)", default: 127 },
                  { label: "Altura (cm)", default: 80 },
                ].map((field) => (
                  <div key={field.label}>
                    <label className="text-xs font-semibold text-gray-400 mb-2 block tracking-wide">
                      {field.label}
                    </label>
                    <input
                      type="number"
                      defaultValue={field.default}
                      className="w-full bg-bilhar-dark border-2 border-bilhar-green/15 focus:border-bilhar-green/50 rounded-xl px-4 py-3 text-white text-sm outline-none transition-colors placeholder-gray-600"
                    />
                  </div>
                ))}
                <p className="text-xs text-gray-600 leading-relaxed">
                  * Dimensões fora do padrão podem gerar acréscimo no valor final. Nossa equipe entrará em contato para confirmar.
                </p>
              </div>
            )}

          </motion.div>
        </AnimatePresence>
      </div>

      {/* ── Navigation footer ── */}
      <div className="flex-shrink-0 px-4 sm:px-5 py-4 border-t border-bilhar-green/10 bg-bilhar-dark/40">
        {currentStep === 5 ? (
          <div className="space-y-2.5">
            <button className="w-full flex items-center justify-center gap-2.5 btn-gold py-3.5 rounded-xl text-sm font-bold">
              <ShoppingCart className="w-4 h-4" />
              Adicionar ao Carrinho
            </button>
            <button className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold border border-bilhar-green/20 text-bilhar-green-bright hover:bg-bilhar-green/5 transition-all">
              <Save className="w-4 h-4" />
              Salvar Configuração
            </button>
          </div>
        ) : (
          <div className="flex gap-2.5">
            {currentStep > 0 && (
              <button
                onClick={prevStep}
                className="flex items-center gap-1.5 px-5 py-3.5 rounded-xl text-sm font-semibold border border-bilhar-green/15 text-gray-300 hover:bg-white/5 hover:border-bilhar-green/30 transition-all"
              >
                <ChevronLeft className="w-4 h-4" />
                Voltar
              </button>
            )}
            <button
              onClick={nextStep}
              className="flex-1 flex items-center justify-center gap-1.5 btn-gold py-3.5 rounded-xl text-sm font-bold"
            >
              {currentStep === 4 ? "Finalizar" : "Próximo"}
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

    </div>
  );
}
