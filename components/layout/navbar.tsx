"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCart, Menu, X, Sparkles } from "lucide-react";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { useCartStore } from "@/store/cart";

const NAV_LINKS = [
  { href: "/catalogo", label: "Produtos" },
  { href: "/configurador", label: "Configurar" },
  { href: "/alugar", label: "Aluguel" },
  { href: "/sobre", label: "Sobre" },
];

export function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const { getItemCount, toggleCart } = useCartStore();
  const itemCount = getItemCount();

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 28);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Body scroll lock */
  useEffect(() => {
    document.body.style.overflow = isMobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isMobileOpen]);

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.55, ease: "easeOut" }}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-400",
          isScrolled
            ? "bg-bilhar-dark/80 backdrop-blur-xl shadow-[0_8px_40px_rgba(0,0,0,0.6)]"
            : "bg-transparent"
        )}
        style={
          isScrolled
            ? { borderBottom: "1px solid rgba(201,168,76,0.1)" }
            : {}
        }
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">

            {/* ── Logo ── */}
            <Link href="/" className="flex items-center gap-3 group flex-shrink-0">
              <div
                className="flex items-center justify-center rounded-lg flex-shrink-0"
                style={{
                  width: 36,
                  height: 36,
                  background: "linear-gradient(135deg, #820000 0%, #b91c1c 100%)",
                  boxShadow: "0 4px 16px rgba(130,0,0,0.3)",
                  transition: "box-shadow 0.25s",
                }}
              >
                <span className="text-white font-display font-bold text-base">S</span>
              </div>
              <div className="hidden sm:block">
                <span className="font-display font-bold text-white" style={{ fontSize: "1.15rem" }}>
                  Sinuca
                </span>
                <span className="font-display font-bold gradient-gold ml-1" style={{ fontSize: "1.15rem" }}>
                  Ideal
                </span>
              </div>
            </Link>

            {/* ── Desktop Nav ── */}
            <div className="hidden md:flex items-center gap-1">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="relative px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 group"
                  style={{
                    color: pathname === link.href ? "#ffffff" : "rgba(156,163,175,1)",
                  }}
                >
                  {/* Hover/active gold text */}
                  <span
                    className="relative z-10 transition-colors duration-200"
                    style={{
                      color: pathname === link.href ? "#ffffff" : undefined,
                    }}
                  >
                    {link.label}
                  </span>
                  {/* Animated underline */}
                  <motion.span
                    className="absolute bottom-0.5 left-4 right-4 h-px rounded-full"
                    style={{ background: "linear-gradient(90deg, #b8962e, #e8c96e, #b8962e)" }}
                    initial={false}
                    animate={{
                      scaleX: pathname === link.href ? 1 : 0,
                      opacity: pathname === link.href ? 1 : 0,
                    }}
                    transition={{ duration: 0.22 }}
                  />
                  {/* Hover underline — CSS approach via group */}
                  <span
                    className="absolute bottom-0.5 left-4 right-4 h-px rounded-full opacity-0 group-hover:opacity-60 transition-opacity duration-200"
                    style={{ background: "linear-gradient(90deg, #b8962e, #e8c96e, #b8962e)" }}
                  />
                </Link>
              ))}
            </div>

            {/* ── Right Actions ── */}
            <div className="flex items-center gap-1 sm:gap-2">

              {/* Cart */}
              <button
                onClick={toggleCart}
                className="relative rounded-lg text-gray-400 hover:text-white transition-colors"
                style={{ padding: "10px", minWidth: 44, minHeight: 44, display: "flex", alignItems: "center", justifyContent: "center" }}
                aria-label="Carrinho de compras"
              >
                <ShoppingCart className="w-5 h-5" />
                <AnimatePresence>
                  {itemCount > 0 && (
                    <motion.span
                      key="badge"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      transition={{ type: "spring", stiffness: 500, damping: 25 }}
                      className="absolute -top-0.5 -right-0.5 flex items-center justify-center rounded-full text-white font-bold"
                      style={{
                        minWidth: 18,
                        height: 18,
                        fontSize: "0.6rem",
                        background: "#ef4444",
                        padding: "0 3px",
                      }}
                    >
                      {itemCount}
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>

              {/* Desktop CTA */}
              <Link
                href="/configurador"
                className="hidden sm:flex btn-gold rounded-lg gap-1.5 ml-1"
                style={{ padding: "10px 20px", fontSize: "0.8rem" }}
              >
                <Sparkles className="w-3.5 h-3.5" />
                Configurar Mesa
              </Link>

              {/* Hamburger */}
              <button
                onClick={() => setIsMobileOpen(!isMobileOpen)}
                className="md:hidden rounded-lg text-gray-400 hover:text-white transition-colors"
                style={{ padding: "10px", minWidth: 44, minHeight: 44, display: "flex", alignItems: "center", justifyContent: "center" }}
                aria-label={isMobileOpen ? "Fechar menu" : "Abrir menu"}
              >
                <AnimatePresence mode="wait">
                  {isMobileOpen ? (
                    <motion.span
                      key="close"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.15 }}
                    >
                      <X className="w-5 h-5" />
                    </motion.span>
                  ) : (
                    <motion.span
                      key="open"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.15 }}
                    >
                      <Menu className="w-5 h-5" />
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>
            </div>
          </div>
        </nav>
      </motion.header>

      {/* ── Full-screen Mobile Menu ── */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 md:hidden flex flex-col"
            style={{ background: "rgba(6,6,6,0.97)", backdropFilter: "blur(24px)" }}
          >
            {/* Top bar */}
            <div className="flex items-center justify-between px-6 py-5" style={{ borderBottom: "1px solid rgba(201,168,76,0.1)" }}>
              <div>
                <span className="font-display font-bold text-white" style={{ fontSize: "1.2rem" }}>Sinuca</span>
                <span className="font-display font-bold gradient-gold ml-1" style={{ fontSize: "1.2rem" }}>Ideal</span>
              </div>
              <button
                onClick={() => setIsMobileOpen(false)}
                className="rounded-lg text-gray-400 hover:text-white transition-colors"
                style={{ padding: "10px", minWidth: 44, minHeight: 44, display: "flex", alignItems: "center", justifyContent: "center" }}
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Nav links — large, centered */}
            <nav className="flex-1 flex flex-col items-center justify-center gap-2 px-8">
              {NAV_LINKS.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.06 * i + 0.05 }}
                  className="w-full text-center"
                >
                  <Link
                    href={link.href}
                    onClick={() => setIsMobileOpen(false)}
                    className="block font-display font-bold transition-colors duration-200 py-3"
                    style={{
                      fontSize: "clamp(1.75rem, 8vw, 3rem)",
                      color: pathname === link.href ? "#c9a84c" : "rgba(255,255,255,0.85)",
                    }}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </nav>

            {/* Bottom section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
              className="px-6 py-8 space-y-4"
              style={{ borderTop: "1px solid rgba(201,168,76,0.1)" }}
            >
              <Link
                href="/configurador"
                onClick={() => setIsMobileOpen(false)}
                className="btn-gold w-full justify-center rounded-xl gap-2.5"
                style={{ padding: "16px 24px", fontSize: "0.95rem" }}
              >
                <Sparkles className="w-4 h-4" />
                Configurar Minha Mesa
              </Link>
              {/* Social links row */}
              <div className="flex items-center justify-center gap-6 pt-2">
                {["Instagram", "WhatsApp", "YouTube"].map((soc) => (
                  <a
                    key={soc}
                    href="#"
                    className="text-gray-600 hover:text-bilhar-gold transition-colors"
                    style={{ fontSize: "0.7rem", letterSpacing: "0.1em", textTransform: "uppercase" }}
                  >
                    {soc}
                  </a>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
