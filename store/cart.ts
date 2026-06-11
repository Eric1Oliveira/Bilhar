import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CartItem, Product, ProductConfiguration } from "@/types";

interface CartStore {
  items: CartItem[];
  isOpen: boolean;
  addItem: (
    product: Product,
    type: "compra" | "aluguel",
    configuration?: ProductConfiguration,
    rentalMonths?: 6 | 12 | 24
  ) => void;
  removeItem: (productId: string, configId?: string) => void;
  updateQuantity: (productId: string, quantity: number, configId?: string) => void;
  clearCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  getTotal: () => number;
  getItemCount: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,

      addItem: (product, type, configuration, rentalMonths) => {
        const { items } = get();
        const existing = items.find(
          (i) =>
            i.product.id === product.id &&
            i.configuration?.id === configuration?.id &&
            i.type === type
        );

        if (existing) {
          set({
            items: items.map((i) =>
              i.product.id === product.id &&
              i.configuration?.id === configuration?.id &&
              i.type === type
                ? { ...i, quantity: i.quantity + 1 }
                : i
            ),
          });
        } else {
          set({
            items: [
              ...items,
              { product, configuration, quantity: 1, type, rental_months: rentalMonths },
            ],
          });
        }
        set({ isOpen: true });
      },

      removeItem: (productId, configId) => {
        set({
          items: get().items.filter(
            (i) =>
              !(i.product.id === productId && i.configuration?.id === configId)
          ),
        });
      },

      updateQuantity: (productId, quantity, configId) => {
        if (quantity <= 0) {
          get().removeItem(productId, configId);
          return;
        }
        set({
          items: get().items.map((i) =>
            i.product.id === productId && i.configuration?.id === configId
              ? { ...i, quantity }
              : i
          ),
        });
      },

      clearCart: () => set({ items: [] }),

      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),
      toggleCart: () => set({ isOpen: !get().isOpen }),

      getTotal: () => {
        return get().items.reduce((sum, item) => {
          let price = item.configuration?.total_price ?? item.product.base_price;
          if (item.type === "aluguel") {
            const months = item.rental_months ?? 12;
            if (months === 6) price = item.product.rental_price_6;
            else if (months === 12) price = item.product.rental_price_12;
            else price = item.product.rental_price_24;
          }
          return sum + price * item.quantity;
        }, 0);
      },

      getItemCount: () => {
        return get().items.reduce((sum, item) => sum + item.quantity, 0);
      },
    }),
    { name: "sinuca-cart" }
  )
);
