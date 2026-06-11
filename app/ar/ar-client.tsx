"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Navbar } from "@/components/layout/navbar";
import {
  Smartphone, ArrowLeft, RotateCcw, Move, ZoomIn,
  Sparkles, Info, Camera, ChevronRight, Share2
} from "lucide-react";
import { useConfiguratorStore } from "@/store/configurator";
import { formatCurrency } from "@/lib/utils";

type ModelViewerElement = HTMLElement & { activateAR?: () => void };

function ARUnsupported() {
  return (
    <div className="flex flex-col items-center justify-center h-96 gap-6 text-center p-8">
      <div className="w-20 h-20 rounded-full bg-bilhar-green/10 flex items-center justify-center">
        <Smartphone className="w-10 h-10 text-bilhar-green/40" />
      </div>
      <div>
        <h3 className="font-semibold text-white text-lg mb-2">AR não disponível</h3>
        <p className="text-gray-400 text-sm leading-relaxed">
          Para usar a Realidade Aumentada, acesse via celular (iPhone ou Android) com navegador compatível.
        </p>
      </div>
      <Link
        href="/configurador"
        className="flex items-center gap-2 btn-gold px-6 py-3 rounded-xl text-sm font-semibold"
      >
        <Sparkles className="w-4 h-4" />
        Voltar ao Configurador
      </Link>
    </div>
  );
}

export function ARPageClient() {
  const { woodColor, feltColor, legType, totalPrice } = useConfiguratorStore();
  const [isModelViewerLoaded, setIsModelViewerLoaded] = useState(false);
  const [arMode, setArMode] = useState<"scene-viewer" | "webxr" | "quick-look" | null>(null);
  const [isInfoOpen, setIsInfoOpen] = useState(false);
  const modelRef = useRef<ModelViewerElement>(null);

  useEffect(() => {
    // Load model-viewer web component
    import("@google/model-viewer").catch(() => {
      console.log("Model viewer not available");
    });
    setIsModelViewerLoaded(true);
  }, []);

  const modelSrc = "/models/mesa-sinuca.glb";
  const modelSrcIOS = "/models/mesa-sinuca.usdz";

  const configSummary = [
    { label: "Madeira", value: woodColor },
    { label: "Feltro", value: feltColor },
    { label: "Pernas", value: legType },
  ];

  return (
    <div className="min-h-screen bg-bilhar-dark flex flex-col">
      <Navbar />

      <div className="pt-16 md:pt-20 flex-1 flex flex-col">
        {/* Header */}
        <div className="bg-bilhar-dark-2/80 backdrop-blur-sm border-b border-bilhar-green/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link
                href="/configurador"
                className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm"
              >
                <ArrowLeft className="w-4 h-4" />
                <span className="hidden sm:block">Voltar ao Configurador</span>
              </Link>
              <div className="w-px h-6 bg-bilhar-green/20 hidden sm:block" />
              <h1 className="font-display font-bold text-white text-lg">
                Visualizar em <span className="gradient-gold">AR</span>
              </h1>
            </div>
            <button
              onClick={() => setIsInfoOpen(!isInfoOpen)}
              className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-all"
            >
              <Info className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 grid lg:grid-cols-3 gap-8">
          {/* Main Viewer */}
          <div className="lg:col-span-2 space-y-4">
            {/* Model Viewer Container */}
            <div className="relative glass-card overflow-hidden" style={{ minHeight: "500px" }}>
              {isModelViewerLoaded ? (
                // @ts-expect-error model-viewer is a custom element
                <model-viewer
                  ref={modelRef}
                  src={modelSrc}
                  ios-src={modelSrcIOS}
                  alt="Mesa de Sinuca 3D"
                  ar
                  ar-modes="scene-viewer webxr quick-look"
                  camera-controls
                  auto-rotate
                  shadow-intensity="1"
                  environment-image="neutral"
                  exposure="1.2"
                  ar-scale="fixed"
                  style={{
                    width: "100%",
                    height: "500px",
                    background: "transparent",
                  }}
                />
              ) : (
                <ARUnsupported />
              )}

              {/* AR Launch Button */}
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3">
                <button
                  onClick={() => {
                    modelRef.current?.activateAR?.();
                  }}
                  className="flex items-center gap-3 bg-bilhar-gold hover:bg-bilhar-gold-light text-bilhar-dark font-semibold px-8 py-4 rounded-xl shadow-xl shadow-bilhar-gold/30 transition-all text-base"
                >
                  <Camera className="w-5 h-5" />
                  Ver no meu Ambiente (AR)
                </button>
                <p className="text-xs text-gray-400">Requer dispositivo compatível</p>
              </div>
            </div>

            {/* Controls Guide */}
            <div className="grid grid-cols-3 gap-3">
              {[
                { icon: RotateCcw, label: "Girar", desc: "1 dedo" },
                { icon: Move, label: "Mover", desc: "2 dedos" },
                { icon: ZoomIn, label: "Zoom", desc: "Pinçar" },
              ].map((ctrl) => (
                <div key={ctrl.label} className="glass-card p-4 text-center">
                  <ctrl.icon className="w-5 h-5 text-bilhar-green-bright mx-auto mb-2" />
                  <p className="text-xs text-white font-medium">{ctrl.label}</p>
                  <p className="text-xs text-gray-400">{ctrl.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            {/* Configuration Summary */}
            <div className="glass-card p-6">
              <h3 className="font-semibold text-white mb-4 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-bilhar-gold" />
                Sua Configuração
              </h3>
              <div className="space-y-3">
                {configSummary.map((item) => (
                  <div key={item.label} className="flex items-center justify-between py-2 border-b border-bilhar-green/10 last:border-0">
                    <span className="text-sm text-gray-400">{item.label}</span>
                    <span className="text-sm font-medium text-white capitalize">{item.value}</span>
                  </div>
                ))}
              </div>
              <div className="mt-4 pt-4 border-t border-bilhar-green/20">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-400">Total</span>
                  <span className="font-display font-bold text-xl gradient-gold">
                    {formatCurrency(totalPrice || 7500)}
                  </span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-3">
              <Link
                href="/configurador"
                className="w-full flex items-center justify-center gap-2 border border-bilhar-green/30 text-bilhar-green-bright hover:bg-bilhar-green/5 py-3 rounded-xl text-sm font-medium transition-all"
              >
                <Sparkles className="w-4 h-4" />
                Editar Personalização
                <ChevronRight className="w-4 h-4" />
              </Link>

              <button className="w-full flex items-center justify-center gap-2 btn-gold py-3 rounded-xl text-sm font-semibold">
                Comprar Esta Mesa
              </button>

              <button className="w-full flex items-center justify-center gap-2 text-gray-400 hover:text-white text-sm transition-colors py-2">
                <Share2 className="w-4 h-4" />
                Compartilhar Configuração
              </button>
            </div>

            {/* AR Instructions */}
            <div className="glass-card p-5 border border-bilhar-green/20">
              <h4 className="text-sm font-semibold text-white mb-3">Como usar o AR</h4>
              <ol className="space-y-2 text-xs text-gray-400">
                <li className="flex gap-2"><span className="text-bilhar-gold font-bold">1.</span> Abra no seu celular</li>
                <li className="flex gap-2"><span className="text-bilhar-gold font-bold">2.</span> Clique em &ldquo;Ver no meu Ambiente&rdquo;</li>
                <li className="flex gap-2"><span className="text-bilhar-gold font-bold">3.</span> Aponte a câmera para o chão</li>
                <li className="flex gap-2"><span className="text-bilhar-gold font-bold">4.</span> Posicione a mesa onde quiser</li>
              </ol>
            </div>
          </div>
        </div>
      </div>

      {/* Info Modal */}
      <AnimatePresence>
        {isInfoOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setIsInfoOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="glass-card p-6 max-w-md w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="font-display font-bold text-white text-lg mb-4">Sobre a Tecnologia AR</h3>
              <p className="text-sm text-gray-400 leading-relaxed mb-4">
                Nossa tecnologia de Realidade Aumentada usa WebXR e ARCore/ARKit para colocar sua mesa em escala real no seu ambiente.
              </p>
              <p className="text-sm text-gray-400 leading-relaxed mb-6">
                <strong className="text-white">Compatível com:</strong> iPhone (iOS 12+), Android com ARCore. Para melhor experiência, use Chrome no Android ou Safari no iOS.
              </p>
              <button
                onClick={() => setIsInfoOpen(false)}
                className="w-full btn-gold py-3 rounded-xl text-sm font-semibold"
              >
                Entendido
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
