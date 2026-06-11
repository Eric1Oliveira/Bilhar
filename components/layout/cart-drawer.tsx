"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, ShoppingCart, Trash2, Plus, Minus, ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useCartStore } from "@/store/cart";
import { formatCurrency } from "@/lib/utils";

export function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, updateQuantity, getTotal } = useCartStore();
  const total = getTotal();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-bilhar-dark-2 border-l border-bilhar-green/20 z-50 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-bilhar-green/20">
              <div className="flex items-center gap-3">
                <ShoppingCart className="w-5 h-5 text-bilhar-green-light" />
                <h2 className="font-display font-bold text-xl text-white">Seu Carrinho</h2>
                {items.length > 0 && (
                  <span className="w-6 h-6 rounded-full bg-bilhar-gold text-bilhar-dark text-xs font-bold flex items-center justify-center">
                    {items.length}
                  </span>
                )}
              </div>
              <button
                onClick={closeCart}
                className="p-2 rounded-lg hover:bg-white/5 text-gray-400 hover:text-white transition-all"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto p-6">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full gap-4 text-center">
                  <div className="w-20 h-20 rounded-full bg-bilhar-green/10 flex items-center justify-center">
                    <ShoppingCart className="w-10 h-10 text-bilhar-green/40" />
                  </div>
                  <p className="text-gray-400">Seu carrinho está vazio</p>
                  <Link
                    href="/catalogo"
                    onClick={closeCart}
                    className="btn-green px-6 py-2.5 rounded-lg text-sm"
                  >
                    Ver Catálogo
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {items.map((item, index) => (
                    <motion.div
                      key={`${item.product.id}-${index}`}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: -100 }}
                      className="glass-card p-4"
                    >
                      <div className="flex gap-4">
                        <div className="w-20 h-20 rounded-lg bg-bilhar-green/20 flex-shrink-0 overflow-hidden">
                          {item.product.images?.[0] ? (
                            <Image
                              src={item.product.images[0]}
                              alt={item.product.name}
                              width={80}
                              height={80}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-2xl">🎱</div>
                          )}
                        </div>

                        <div className="flex-1 min-w-0">
                          <h3 className="font-medium text-white text-sm truncate">{item.product.name}</h3>
                          {item.configuration && (
                            <p className="text-xs text-gray-400 mt-0.5">
                              {item.configuration.name}
                            </p>
                          )}
                          <div className="mt-1">
                            {item.type === "aluguel" ? (
                              <p className="text-xs text-bilhar-gold">
                                Aluguel {item.rental_months} meses • {formatCurrency(
                                  item.rental_months === 6
                                    ? item.product.rental_price_6
                                    : item.rental_months === 12
                                    ? item.product.rental_price_12
                                    : item.product.rental_price_24
                                )}/mês
                              </p>
                            ) : (
                              <p className="text-bilhar-gold font-semibold text-sm">
                                {formatCurrency(item.configuration?.total_price ?? item.product.base_price)}
                              </p>
                            )}
                          </div>

                          <div className="flex items-center gap-3 mt-3">
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => updateQuantity(item.product.id, item.quantity - 1, item.configuration?.id)}
                                className="w-7 h-7 rounded-md bg-bilhar-green/20 flex items-center justify-center hover:bg-bilhar-green/40 transition-all"
                              >
                                <Minus className="w-3 h-3" />
                              </button>
                              <span className="text-sm font-medium w-6 text-center">{item.quantity}</span>
                              <button
                                onClick={() => updateQuantity(item.product.id, item.quantity + 1, item.configuration?.id)}
                                className="w-7 h-7 rounded-md bg-bilhar-green/20 flex items-center justify-center hover:bg-bilhar-green/40 transition-all"
                              >
                                <Plus className="w-3 h-3" />
                              </button>
                            </div>
                            <button
                              onClick={() => removeItem(item.product.id, item.configuration?.id)}
                              className="ml-auto p-1.5 rounded-md text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-all"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="p-6 border-t border-bilhar-green/20 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Subtotal</span>
                  <span className="font-display font-bold text-xl text-white">{formatCurrency(total)}</span>
                </div>
                <p className="text-xs text-gray-500">Frete calculado no checkout</p>
                <Link
                  href="/checkout"
                  onClick={closeCart}
                  className="w-full flex items-center justify-center gap-2 btn-gold py-4 rounded-xl text-base font-semibold"
                >
                  Finalizar Compra
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link
                  href="/catalogo"
                  onClick={closeCart}
                  className="w-full flex items-center justify-center text-sm text-gray-400 hover:text-white transition-colors"
                >
                  Continuar Comprando
                </Link>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
