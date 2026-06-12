"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCart, Menu, X, Sparkles, Phone } from "lucide-react";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { useCartStore } from "@/store/cart";

const NAV_LINKS = [
  { href: "/catalogo",     label: "Produtos"   },
  { href: "/configurador", label: "Configurar" },
  { href: "/alugar",       label: "Aluguel"    },
  { href: "/sobre",        label: "Sobre"      },
];

const BELT_MSGS = [
  "✦ Frete Grátis para capitais",
  "✦ Feltros importados Simonis",
  "✦ Parcelamento em até 12× sem juros",
  "✦ Configurador 3D exclusivo no Brasil",
  "✦ Garantia 5 anos na estrutura",
  "✦ Entrega e montagem profissional",
  "✦ Ardósia tripla importada",
  "✦ Frete Grátis para capitais",
  "✦ Feltros importados Simonis",
  "✦ Parcelamento em até 12× sem juros",
  "✦ Configurador 3D exclusivo no Brasil",
  "✦ Garantia 5 anos na estrutura",
  "✦ Entrega e montagem profissional",
  "✦ Ardósia tripla importada",
];

function AnnounceBelt() {
  return (
    <div style={{
      height: 34,
      background: "#07071000",
      backgroundImage: "linear-gradient(to right, #09090F, #0E0E1A 20%, #0E0E1A 80%, #09090F)",
      borderBottom: "1px solid rgba(47,212,138,0.12)",
      overflow: "hidden",
      position: "relative",
      display: "flex",
      alignItems: "center",
    }}>
      <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 80, background: "linear-gradient(to right, #09090F, transparent)", zIndex: 2, pointerEvents: "none" }} />
      <div style={{ position: "absolute", right: 0, top: 0, bottom: 0, zIndex: 2, display: "flex", alignItems: "center", paddingRight: 20, background: "linear-gradient(to left, #09090F 55%, transparent)" }}>
        <a href="https://wa.me/5511999999999" target="_blank" rel="noopener noreferrer"
          style={{ display: "flex", alignItems: "center", gap: 5, fontSize: "0.58rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#2FD48A", textDecoration: "none", whiteSpace: "nowrap" }}>
          <Phone style={{ width: 10, height: 10 }} />
          <span className="hidden sm:inline">WhatsApp</span>
        </a>
      </div>
      <div style={{ display: "flex", alignItems: "center", animation: "marquee 42s linear infinite", whiteSpace: "nowrap", willChange: "transform", paddingLeft: 24 }}>
        {BELT_MSGS.map((msg, i) => (
          <span key={i} style={{ fontSize: "0.58rem", fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", color: i % 2 === 0 ? "rgba(47,212,138,0.65)" : "rgba(47,212,138,0.4)", paddingRight: 52, flexShrink: 0 }}>
            {msg}
          </span>
        ))}
      </div>
    </div>
  );
}

export function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled]   = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [mounted, setMounted]         = useState(false);
  const { getItemCount, toggleCart }  = useCartStore();

  useEffect(() => {
    setMounted(true);
    const onScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isMobileOpen]);

  const itemCount = mounted ? getItemCount() : 0;

  return (
    <>
      <motion.header
        initial={{ y: -120, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="fixed top-0 left-0 right-0 z-50"
      >
        <AnnounceBelt />
        <div
          className={cn("transition-all duration-400", isScrolled ? "backdrop-blur-xl" : "bg-transparent")}
          style={isScrolled ? { background: "rgba(9,9,15,0.88)", borderBottom: "1px solid rgba(47,212,138,0.1)", boxShadow: "0 8px 40px rgba(0,0,0,0.7)" } : {}}
        >
          <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16 md:h-20">

              {/* Logo */}
              <Link href="/" className="flex items-center gap-3 group flex-shrink-0">
                <div style={{ width: 36, height: 36, borderRadius: 8, background: "linear-gradient(135deg, #0A3D28 0%, #1A7A52 60%, #2FD48A 100%)", boxShadow: "0 4px 16px rgba(26,122,82,0.35), inset 0 1px 0 rgba(255,255,255,0.08)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, transition: "box-shadow 0.25s" }}>
                  <div style={{ width: 13, height: 13, background: "rgba(255,255,255,0.95)", transform: "rotate(45deg)", boxShadow: "0 0 8px rgba(47,212,138,0.5)" }} />
                </div>
                <div className="hidden sm:block leading-tight">
                  <div className="font-display font-bold text-white" style={{ fontSize: "1.08rem", letterSpacing: "-0.01em" }}>
                    Sinuca <span className="gradient-emerald">Ideal</span>
                  </div>
                  <div style={{ fontSize: "0.49rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(47,212,138,0.45)", marginTop: -1 }}>
                    Mesas Artesanais · Desde 2019
                  </div>
                </div>
              </Link>

              {/* Desktop Nav */}
              <div className="hidden md:flex items-center gap-1">
                {NAV_LINKS.map((link) => (
                  <Link key={link.href} href={link.href}
                    className="relative px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 group"
                    style={{ color: pathname === link.href ? "#ffffff" : "rgba(156,163,175,1)" }}>
                    <span className="relative z-10">{link.label}</span>
                    <motion.span
                      className="absolute bottom-0.5 left-4 right-4 h-px rounded-full"
                      style={{ background: "linear-gradient(90deg, #1A7A52, #2FD48A, #1A7A52)" }}
                      initial={false}
                      animate={{ scaleX: pathname === link.href ? 1 : 0, opacity: pathname === link.href ? 1 : 0 }}
                      transition={{ duration: 0.22 }}
                    />
                    <span className="absolute bottom-0.5 left-4 right-4 h-px rounded-full opacity-0 group-hover:opacity-50 transition-opacity duration-200"
                      style={{ background: "linear-gradient(90deg, #1A7A52, #2FD48A, #1A7A52)" }} />
                  </Link>
                ))}
              </div>

              {/* Right actions */}
              <div className="flex items-center gap-1 sm:gap-2">
                <button onClick={toggleCart}
                  className="relative rounded-lg text-gray-400 hover:text-white transition-colors"
                  style={{ padding: "10px", minWidth: 44, minHeight: 44, display: "flex", alignItems: "center", justifyContent: "center" }}
                  aria-label="Carrinho">
                  <ShoppingCart className="w-5 h-5" />
                  <AnimatePresence>
                    {mounted && itemCount > 0 && (
                      <motion.span key="badge"
                        initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}
                        transition={{ type: "spring", stiffness: 500, damping: 25 }}
                        className="absolute -top-0.5 -right-0.5 flex items-center justify-center rounded-full text-white font-bold"
                        style={{ minWidth: 18, height: 18, fontSize: "0.6rem", background: "#1A7A52", padding: "0 3px" }}>
                        {itemCount}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </button>
                <Link href="/configurador" className="hidden sm:flex btn-gold rounded-lg gap-1.5 ml-1"
                  style={{ padding: "10px 20px", fontSize: "0.8rem" }}>
                  <Sparkles className="w-3.5 h-3.5" />
                  Configurar Mesa
                </Link>
                <button onClick={() => setIsMobileOpen(!isMobileOpen)}
                  className="md:hidden rounded-lg text-gray-400 hover:text-white transition-colors"
                  style={{ padding: "10px", minWidth: 44, minHeight: 44, display: "flex", alignItems: "center", justifyContent: "center" }}
                  aria-label={isMobileOpen ? "Fechar" : "Menu"}>
                  <AnimatePresence mode="wait">
                    {isMobileOpen
                      ? <motion.span key="x"    initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90,  opacity: 0 }} transition={{ duration: 0.15 }}><X    className="w-5 h-5" /></motion.span>
                      : <motion.span key="menu" initial={{ rotate:  90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}><Menu className="w-5 h-5" /></motion.span>
                    }
                  </AnimatePresence>
                </button>
              </div>
            </div>
          </nav>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 md:hidden flex flex-col"
            style={{ background: "rgba(9,9,15,0.98)", backdropFilter: "blur(24px)" }}>
            <div className="flex items-center justify-between px-6 py-5" style={{ borderBottom: "1px solid rgba(47,212,138,0.1)" }}>
              <div className="flex items-center gap-2.5">
                <div style={{ width: 30, height: 30, borderRadius: 7, background: "linear-gradient(135deg, #0A3D28, #1A7A52)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <div style={{ width: 10, height: 10, background: "rgba(255,255,255,0.95)", transform: "rotate(45deg)" }} />
                </div>
                <span className="font-display font-bold text-white" style={{ fontSize: "1.05rem" }}>
                  Sinuca <span className="gradient-emerald">Ideal</span>
                </span>
              </div>
              <button onClick={() => setIsMobileOpen(false)} className="text-gray-400 hover:text-white" style={{ padding: "10px", minWidth: 44, minHeight: 44, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <X className="w-5 h-5" />
              </button>
            </div>
            <nav className="flex-1 flex flex-col items-center justify-center gap-1 px-8">
              {NAV_LINKS.map((link, i) => (
                <motion.div key={link.href} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.06 * i + 0.05 }} className="w-full text-center">
                  <Link href={link.href} onClick={() => setIsMobileOpen(false)}
                    className="block font-display font-bold transition-colors duration-200 py-3"
                    style={{ fontSize: "clamp(1.75rem, 8vw, 3rem)", color: pathname === link.href ? "#2FD48A" : "rgba(255,255,255,0.85)" }}>
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </nav>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}
              className="px-6 py-8 space-y-4" style={{ borderTop: "1px solid rgba(47,212,138,0.1)" }}>
              <Link href="/configurador" onClick={() => setIsMobileOpen(false)}
                className="btn-gold w-full justify-center rounded-xl gap-2.5"
                style={{ padding: "16px 24px", fontSize: "0.95rem" }}>
                <Sparkles className="w-4 h-4" />
                Configurar Minha Mesa
              </Link>
              <div className="flex items-center justify-center gap-6 pt-1">
                {["Instagram", "WhatsApp", "YouTube"].map((s) => (
                  <a key={s} href="#" style={{ fontSize: "0.68rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(107,114,128,1)" }}>{s}</a>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
