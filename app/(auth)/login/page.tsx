"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
import Link from "next/link";
import { Mail, Lock, Eye, EyeOff, Globe, Sparkles, ArrowRight, Check } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

const loginSchema = z.object({
  email: z.string().email("E-mail inválido"),
  password: z.string().min(6, "Mínimo 6 caracteres"),
});
type LoginForm = z.infer<typeof loginSchema>;

const TRUST = [
  "500+ mesas entregues",
  "Configurador 3D exclusivo",
  "Garantia de 5 anos",
];

/* ── Decorative left panel ── */
function AuthPanel() {
  return (
    <div className="hidden lg:flex flex-col relative overflow-hidden bg-bilhar-dark w-[45%] flex-shrink-0">
      {/* Atmosphere */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top_left,rgba(26,122,82,0.18)_0%,transparent_60%)]" />
        <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(ellipse_at_bottom_right,rgba(47,212,138,0.07)_0%,transparent_60%)]" />
        {/* Fine grid */}
        <div className="absolute inset-0 opacity-[0.025]" style={{
          backgroundImage: "linear-gradient(rgba(255,255,255,0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.2) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }} />
      </div>

      {/* Emerald top rule */}
      <div className="absolute top-0 inset-x-0 h-0.5 bg-gradient-to-r from-transparent via-bilhar-green/40 to-transparent" />
      {/* Emerald right rule */}
      <div className="absolute right-0 inset-y-0 w-px bg-gradient-to-b from-transparent via-bilhar-green/20 to-transparent" />

      <div className="relative z-10 flex flex-col h-full px-12 py-14">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group w-fit mb-auto">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-bilhar-green to-bilhar-green-light flex items-center justify-center shadow-lg shadow-bilhar-green/20">
            <span className="text-white font-display font-bold text-lg">S</span>
          </div>
          <div>
            <span className="font-display font-bold text-xl text-white">Sinuca</span>
            <span className="font-display font-bold text-xl gradient-gold ml-1">Ideal</span>
          </div>
        </Link>

        {/* Main message */}
        <div className="my-auto">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <span className="section-label mb-4 block">Bem-vindo de volta</span>
            <h2 className="font-display font-bold text-white leading-tight mb-6"
              style={{ fontSize: "clamp(1.75rem, 3vw, 2.5rem)", letterSpacing: "-0.02em" }}
            >
              Configure sua mesa<br />
              <span className="gradient-emerald">perfeita em 3D</span>
            </h2>
            <p className="text-gray-400 text-sm leading-relaxed max-w-xs mb-10">
              Acesse sua conta para salvar configurações, acompanhar pedidos e visualizar sua mesa em realidade aumentada.
            </p>
          </motion.div>

          {/* Trust items */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="space-y-3"
          >
            {TRUST.map((item, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: "rgba(47,212,138,0.12)", border: "1px solid rgba(47,212,138,0.3)" }}>
                  <Check style={{ width: 10, height: 10, color: "#2FD48A" }} strokeWidth={3} />
                </div>
                <span className="text-sm text-gray-300">{item}</span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Mini table art */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-auto"
        >
          <div className="relative w-full max-w-xs mx-auto" style={{ aspectRatio: "2/1" }}>
            <div className="absolute inset-0 rounded-xl blur-lg opacity-20 scale-95" style={{ background: "#156845" }} />
            <div className="absolute inset-0 rounded-xl overflow-hidden" style={{ background: "#156845" }}>
              <div className="absolute inset-0" style={{
                backgroundImage: "repeating-linear-gradient(0deg,transparent,transparent 4px,rgba(0,0,0,0.04) 4px,rgba(0,0,0,0.04) 5px), repeating-linear-gradient(90deg,transparent,transparent 4px,rgba(0,0,0,0.04) 4px,rgba(0,0,0,0.04) 5px)"
              }} />
              <div className="absolute inset-0 border-[8px] border-bilhar-wood rounded-xl" style={{ background: "transparent" }} />
              {[{t:"4%",l:"4%"},{t:"4%",r:"4%"},{b:"4%",l:"4%"},{b:"4%",r:"4%"}].map((s,i)=>(
                <div key={i} className="absolute w-3.5 h-3.5 rounded-full bg-black border border-bilhar-wood-light"
                  style={{ top: (s as any).t, left: (s as any).l, right: (s as any).r, bottom: (s as any).b }} />
              ))}
              <div className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-white" style={{ boxShadow:"0 0 8px rgba(255,255,255,0.5)" }} />
            </div>
          </div>
          <p className="text-[0.6rem] text-center text-gray-600 tracking-widest uppercase mt-3">
            Mesa Pro 9 · Feltro Verde · Nogueira
          </p>
        </motion.div>
      </div>
    </div>
  );
}

/* ── Input component ── */
function Field({
  label, error, icon: Icon, right, ...props
}: {
  label: string;
  error?: string;
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  right?: React.ReactNode;
} & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div>
      <label className="text-xs font-semibold text-gray-400 tracking-wide mb-2 block">{label}</label>
      <div className="relative group">
        <Icon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600 group-focus-within:text-bilhar-green-bright transition-colors pointer-events-none" />
        <input
          {...props}
          className={`w-full bg-bilhar-dark border-2 rounded-xl pl-11 ${right ? "pr-12" : "pr-4"} py-3.5 text-sm text-white placeholder:text-gray-600 outline-none transition-all duration-200
            ${error
              ? "border-red-500/60 focus:border-red-500"
              : "border-bilhar-green/15 focus:border-bilhar-green/50 hover:border-bilhar-green/25"
            }`}
        />
        {right && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2">{right}</div>
        )}
      </div>
      {error && (
        <motion.p
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-xs text-red-400 mt-1.5 flex items-center gap-1.5"
        >
          <span className="w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
          {error}
        </motion.p>
      )}
    </div>
  );
}

/* ── Page ── */
export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [magicLinkSent, setMagicLinkSent] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);

  const { register, handleSubmit, formState: { errors }, getValues } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginForm) => {
    setIsLoading(true);
    setAuthError(null);
    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({
      email: data.email,
      password: data.password,
    });
    setIsLoading(false);
    if (error) {
      setAuthError(
        error.message === "Invalid login credentials"
          ? "E-mail ou senha incorretos"
          : error.message
      );
      return;
    }
    const redirectTo = new URLSearchParams(window.location.search).get("redirectTo") ?? "/perfil";
    window.location.href = redirectTo;
  };

  const handleMagicLink = async () => {
    const email = getValues("email");
    if (!email) return;
    const supabase = createClient();
    await supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: `${window.location.origin}/auth/callback` },
    });
    setMagicLinkSent(true);
  };

  const handleGoogle = async () => {
    const supabase = createClient();
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: `${window.location.origin}/auth/callback` },
    });
  };

  return (
    <div className="min-h-screen flex bg-bilhar-dark overflow-hidden">
      <AuthPanel />

      {/* ── Form panel ── */}
      <div className="flex-1 flex flex-col items-center justify-center p-6 sm:p-10 relative overflow-y-auto">
        {/* Mobile background */}
        <div className="lg:hidden absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(26,122,82,0.12)_0%,transparent_60%)]" />
          <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-bilhar-dark to-transparent" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative z-10 w-full max-w-sm"
        >
          {/* Mobile logo */}
          <div className="lg:hidden text-center mb-8">
            <Link href="/" className="inline-flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-bilhar-green to-bilhar-green-light flex items-center justify-center shadow-lg shadow-bilhar-green/20">
                <span className="text-white font-display font-bold text-lg">S</span>
              </div>
              <div>
                <span className="font-display font-bold text-xl text-white">Sinuca</span>
                <span className="font-display font-bold text-xl gradient-gold ml-1">Ideal</span>
              </div>
            </Link>
          </div>

          {/* Heading */}
          <div className="mb-8">
            <h1 className="font-display font-bold text-2xl sm:text-3xl text-white leading-tight mb-1.5">
              Entrar na sua conta
            </h1>
            <p className="text-sm text-gray-500">Acesse suas configurações e pedidos</p>
          </div>

          {magicLinkSent ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              className="luxury-card p-8 text-center"
            >
              <div className="w-14 h-14 rounded-full bg-bilhar-green/15 border border-bilhar-green/25 flex items-center justify-center mx-auto mb-5">
                <Mail className="w-6 h-6 text-bilhar-green-bright" />
              </div>
              <h3 className="font-display font-bold text-white text-lg mb-2">Link enviado!</h3>
              <p className="text-sm text-gray-400 leading-relaxed mb-6">
                Verifique seu e-mail e clique no link para entrar sem senha.
              </p>
              <button
                onClick={() => setMagicLinkSent(false)}
                className="text-sm text-bilhar-green-bright hover:text-white transition-colors"
              >
                ← Tentar com senha
              </button>
            </motion.div>
          ) : (
            <div className="space-y-5">
              {/* Google */}
              <button
                type="button"
                onClick={handleGoogle}
                className="w-full flex items-center justify-center gap-3 border-2 border-bilhar-green/15 hover:border-bilhar-green/35 rounded-xl py-3.5 text-sm text-gray-300 hover:text-white transition-all duration-200 hover:bg-bilhar-green/5"
              >
                <Globe className="w-4 h-4 flex-shrink-0" />
                Continuar com Google
              </button>

              {/* Divider */}
              <div className="flex items-center gap-3">
                <div className="flex-1 h-px bg-bilhar-green/10" />
                <span className="text-[0.65rem] font-bold tracking-widest uppercase text-gray-600">ou com e-mail</span>
                <div className="flex-1 h-px bg-bilhar-green/10" />
              </div>

              {/* Auth error */}
              {authError && (
                <motion.div
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-2.5 bg-red-500/8 border border-red-500/25 rounded-xl px-4 py-3"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-red-400 flex-shrink-0" />
                  <p className="text-xs text-red-400">{authError}</p>
                </motion.div>
              )}

              {/* Form */}
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <Field
                  label="E-mail"
                  icon={Mail}
                  type="email"
                  placeholder="seu@email.com"
                  autoComplete="email"
                  error={errors.email?.message}
                  {...register("email")}
                />

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-xs font-semibold text-gray-400 tracking-wide">Senha</label>
                    <a href="#" className="text-[0.65rem] text-bilhar-green-bright hover:text-white transition-colors">
                      Esqueci a senha
                    </a>
                  </div>
                  <div className="relative group">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600 group-focus-within:text-bilhar-green-bright transition-colors pointer-events-none" />
                    <input
                      {...register("password")}
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      autoComplete="current-password"
                      className={`w-full bg-bilhar-dark border-2 rounded-xl pl-11 pr-12 py-3.5 text-sm text-white placeholder:text-gray-600 outline-none transition-all duration-200
                        ${errors.password
                          ? "border-red-500/60 focus:border-red-500"
                          : "border-bilhar-green/15 focus:border-bilhar-green/50 hover:border-bilhar-green/25"
                        }`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-600 hover:text-gray-300 transition-colors p-1"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  {errors.password && (
                    <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} className="text-xs text-red-400 mt-1.5 flex items-center gap-1.5">
                      <span className="w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                      {errors.password.message}
                    </motion.p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full btn-gold py-4 rounded-xl font-bold text-sm flex items-center justify-center gap-2.5 disabled:opacity-60 disabled:cursor-not-allowed mt-2"
                >
                  {isLoading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-bilhar-dark/30 border-t-bilhar-dark rounded-full animate-spin" />
                      Entrando...
                    </>
                  ) : (
                    <>
                      Entrar
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>

              {/* Magic link */}
              <button
                onClick={handleMagicLink}
                className="w-full flex items-center justify-center gap-2 text-sm text-gray-500 hover:text-bilhar-green-bright transition-colors py-1"
              >
                <Sparkles className="w-3.5 h-3.5" />
                Entrar com link mágico (sem senha)
              </button>
            </div>
          )}

          <p className="text-center text-sm text-gray-500 mt-8">
            Não tem conta?{" "}
            <Link href="/registro" className="text-bilhar-green-bright hover:text-white transition-colors font-semibold">
              Criar conta grátis
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
