import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { ConfiguratorState, FeltColor, LegType, Product, WoodColor } from "@/types";

interface ConfiguratorStore extends ConfiguratorState {
  setProduct: (product: Product) => void;
  setWoodColor: (color: WoodColor) => void;
  setFeltColor: (color: FeltColor) => void;
  setLegType: (leg: LegType) => void;
  toggleAccessory: (accessory: string) => void;
  setCustomDimensions: (width: number, length: number) => void;
  setStep: (step: number) => void;
  nextStep: () => void;
  prevStep: () => void;
  calculatePrice: () => void;
  reset: () => void;
  setSavedConfigId: (id: string) => void;
}

const WOOD_COLOR_PRICES: Record<WoodColor, number> = {
  natural: 0,
  nogueira: 500,
  mogno: 800,
  carvalho: 600,
  ebano: 1200,
  wenge: 1500,
};

const FELT_COLOR_PRICES: Record<FeltColor, number> = {
  verde: 0,
  azul: 100,
  vermelho: 100,
  cinza: 150,
  preto: 200,
  vinho: 150,
};

const LEG_TYPE_PRICES: Record<LegType, number> = {
  reta: 0,
  torneada: 300,
  cromada: 600,
  inox: 900,
  fundida: 450,
};

const ACCESSORY_PRICES: Record<string, number> = {
  kit_tacos: 350,
  suporte_tacos: 180,
  luminaria: 650,
  placar: 120,
  cobre_mesa: 280,
  bolas_profissionais: 420,
};

/* ── Mock products for offline configurator ── */
export const MOCK_PRODUCTS: Product[] = [
  {
    id: "pro9",
    name: "Pro 9 Palmos",
    slug: "pro-9-palmos",
    description: "Mesa profissional padrão americano — 9 palmos, ardósia tripla, madeira maciça.",
    category: "profissional",
    base_price: 7500,
    rental_price_6: 890,
    rental_price_12: 750,
    rental_price_24: 620,
    weight_kg: 280,
    dimensions: { width: 127, height: 80, length: 254 },
    features: ["9 palmos", "Ardósia tripla", "Madeira maciça", "Feltro importado"],
    images: [],
    model_3d_url: null,
    ar_model_url: null,
    is_active: true,
    is_featured: true,
    stock: 10,
    created_at: new Date().toISOString(),
  },
  {
    id: "pro12",
    name: "Snooker 12 Palmos",
    slug: "snooker-12-palmos",
    description: "Mesa de snooker padrão oficial de competição — 12 palmos, estrutura de aço.",
    category: "profissional",
    base_price: 12000,
    rental_price_6: 1390,
    rental_price_12: 1150,
    rental_price_24: 950,
    weight_kg: 420,
    dimensions: { width: 178, height: 85, length: 356 },
    features: ["12 palmos", "Padrão oficial", "Estrutura aço/madeira", "Garantia 5 anos"],
    images: [],
    model_3d_url: null,
    ar_model_url: null,
    is_active: true,
    is_featured: true,
    stock: 5,
    created_at: new Date().toISOString(),
  },
  {
    id: "lazer8",
    name: "Lazer 8 Palmos",
    slug: "lazer-8-palmos",
    description: "Perfeita para residências. Design moderno com feltro colorido e montagem rápida.",
    category: "lazer",
    base_price: 4500,
    rental_price_6: 540,
    rental_price_12: 450,
    rental_price_24: 370,
    weight_kg: 180,
    dimensions: { width: 112, height: 78, length: 224 },
    features: ["8 palmos", "Feltro colorido", "Design moderno", "Fácil manutenção"],
    images: [],
    model_3d_url: null,
    ar_model_url: null,
    is_active: true,
    is_featured: false,
    stock: 15,
    created_at: new Date().toISOString(),
  },
  {
    id: "compact7",
    name: "Compacta 7 Palmos",
    slug: "compacta-7-palmos",
    description: "Solução inteligente para espaços reduzidos, sem abrir mão da qualidade.",
    category: "compacta",
    base_price: 3200,
    rental_price_6: 390,
    rental_price_12: 320,
    rental_price_24: 270,
    weight_kg: 140,
    dimensions: { width: 100, height: 76, length: 196 },
    features: ["7 palmos", "Compacta", "Alta durabilidade", "Ideal para apartamentos"],
    images: [],
    model_3d_url: null,
    ar_model_url: null,
    is_active: true,
    is_featured: false,
    stock: 20,
    created_at: new Date().toISOString(),
  },
];

const DEFAULT_PRODUCT = MOCK_PRODUCTS[0];
const DEFAULT_TOTAL =
  DEFAULT_PRODUCT.base_price +
  WOOD_COLOR_PRICES["nogueira"] +
  FELT_COLOR_PRICES["vermelho"] +
  LEG_TYPE_PRICES["torneada"];

const initialState: ConfiguratorState = {
  selectedProduct: DEFAULT_PRODUCT,
  woodColor: "nogueira",
  feltColor: "vermelho",
  legType: "torneada",
  accessories: [],
  currentStep: 0,
  totalPrice: DEFAULT_TOTAL,
};

export const useConfiguratorStore = create<ConfiguratorStore>()(
  persist(
    (set, get) => ({
      ...initialState,

      setProduct: (product) => {
        set({ selectedProduct: product });
        get().calculatePrice();
      },

      setWoodColor: (color) => {
        set({ woodColor: color });
        get().calculatePrice();
      },

      setFeltColor: (color) => {
        set({ feltColor: color });
        get().calculatePrice();
      },

      setLegType: (leg) => {
        set({ legType: leg });
        get().calculatePrice();
      },

      toggleAccessory: (accessory) => {
        const current = get().accessories;
        const updated = current.includes(accessory)
          ? current.filter((a) => a !== accessory)
          : [...current, accessory];
        set({ accessories: updated });
        get().calculatePrice();
      },

      setCustomDimensions: (width, length) => {
        set({ customWidth: width, customLength: length });
        get().calculatePrice();
      },

      setStep: (step) => set({ currentStep: step }),

      nextStep: () => {
        const { currentStep } = get();
        if (currentStep < 5) set({ currentStep: currentStep + 1 });
      },

      prevStep: () => {
        const { currentStep } = get();
        if (currentStep > 0) set({ currentStep: currentStep - 1 });
      },

      calculatePrice: () => {
        const { selectedProduct, woodColor, feltColor, legType, accessories } = get();
        /* always calculate — fall back to Pro 9 base if no product selected */
        const base = selectedProduct?.base_price ?? DEFAULT_PRODUCT.base_price;
        let price = base;
        price += WOOD_COLOR_PRICES[woodColor] ?? 0;
        price += FELT_COLOR_PRICES[feltColor] ?? 0;
        price += LEG_TYPE_PRICES[legType] ?? 0;
        accessories.forEach((acc) => { price += ACCESSORY_PRICES[acc] ?? 0; });
        set({ totalPrice: price });
      },

      reset: () => set(initialState),

      setSavedConfigId: (id) => set({ savedConfigId: id }),
    }),
    {
      name: "sinuca-configurator",
      partialize: (state) => ({
        selectedProduct: state.selectedProduct,
        woodColor: state.woodColor,
        feltColor: state.feltColor,
        legType: state.legType,
        accessories: state.accessories,
        currentStep: state.currentStep,
        totalPrice: state.totalPrice,
        savedConfigId: state.savedConfigId,
      }),
    }
  )
);
