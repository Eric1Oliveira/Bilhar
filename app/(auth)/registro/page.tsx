"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
import Link from "next/link";
import { Mail, Lock, Eye, EyeOff, User, Globe, ArrowRight, Shield, Sparkles, Zap } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

const registroSchema = z.object({
  full_name: z.string().min(3, "Nome completo obrigatório"),
  email: z.string().email("E-mail inválido"),
  password: z.string().min(8, "Mínimo 8 caracteres"),
  confirm_password: z.string(),
}).refine((d) => d.password === d.confirm_password, {
  message: "As senhas não coincidem",
  path: ["confirm_password"],
});
type RegistroForm = z.infer<typeof registroSchema>;

const PERKS = [
  { icon: Sparkles, label: "Salve configurações de mesa" },
  { icon: Zap, label: "Acompanhe pedidos em tempo real" },
  { icon: Shield, label: "Acesso exclusivo a promoções" },
];

/* ── Decorative left panel ── */
function AuthPanel() {
  return (
    <div className="hidden lg:flex flex-col relative overflow-hidden bg-bilhar-dark w-[45%] flex-shrink-0">
      {/* Atmosphere */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top_left,rgba(26,122,82,0.18)_0%,transparent_60%)]" />
        <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(ellipse_at_bottom_right,rgba(47,212,138,0.07)_0%,transparent_60%)]" />
        <div className="absolute inset-0 opacity-[0.025]" style={{
          backgroundImage: "linear-gradient(rgba(255,255,255,0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.2) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }} />
      </div>

      <div className="absolute top-0 inset-x-0 h-0.5 bg-gradient-to-r from-transparent via-bilhar-green/40 to-transparent" />
      <div className="absolute right-0 inset-y-0 w-px bg-gradient-to-b from-transparent via-bilhar-green/20 to-transparent" />

      <div className="relative z-10 flex flex-col h-full px-12 py-14">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group w-fit">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-bilhar-green to-bilhar-green-light flex items-center justify-center shadow-lg shadow-bilhar-green/20">
            <span className="text-white font-display font-bold text-lg">S</span>
          </div>
          <div>
            <span className="font-display font-bold text-xl text-white">Sinuca</span>
            <span className="font-display font-bold text-xl gradient-emerald ml-1">Ideal</span>
          </div>
        </Link>

        {/* Main message */}
        <div className="my-auto">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <span className="section-label mb-4 block">Crie sua conta</span>
            <h2 className="font-display font-bold text-white leading-tight mb-6"
              style={{ fontSize: "clamp(1.75rem, 3vw, 2.5rem)", letterSpacing: "-0.02em" }}
            >
              Comece a configurar<br />
              <span className="gradient-emerald">sua mesa hoje</span>
            </h2>
            <p className="text-gray-400 text-sm leading-relaxed max-w-xs mb-10">
              Crie sua conta gratuitamente e acesse todas as ferramentas exclusivas da maior plataforma de bilhar do Brasil.
            </p>
          </motion.div>

          {/* Perks */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="space-y-4"
          >
            {PERKS.map(({ icon: Icon, label }, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg border flex items-center justify-center flex-shrink-0" style={{ background: "rgba(47,212,138,0.08)", borderColor: "rgba(47,212,138,0.2)" }}>
                  <Icon style={{ width: 14, height: 14, color: "#2FD48A" }} />
                </div>
                <span className="text-sm text-gray-300">{label}</span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-auto flex gap-8"
        >
          {[{ v: "500+", l: "Mesas entregues" }, { v: "4.9★", l: "Avaliação" }, { v: "100%", l: "Gratuito" }].map((s, i) => (
            <div key={i}>
              <div className="font-display font-bold text-lg gradient-emerald leading-none">{s.v}</div>
              <div className="text-xs text-gray-600 mt-1">{s.l}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}

/* ── Password strength indicator ── */
function PasswordStrength({ password }: { password: string }) {
  if (!password) return null;
  const checks = [
    password.length >= 8,
    /[A-Z]/.test(password),
    /[0-9]/.test(password),
    /[^a-zA-Z0-9]/.test(password),
  ];
  const strength = checks.filter(Boolean).length;
  const labels = ["Fraca", "Razoável", "Boa", "Forte"];
  const colors = ["bg-red-500", "bg-orange-400", "bg-yellow-400", "bg-green-400"];

  return (
    <div className="mt-2">
      <div className="flex gap-1 mb-1">
        {[0,1,2,3].map(i => (
          <div key={i} className={`flex-1 h-1 rounded-full transition-all duration-300 ${i < strength ? colors[strength - 1] : "bg-bilhar-dark"}`} />
        ))}
      </div>
      <p className="text-[0.6rem] text-gray-600">{labels[strength - 1] ?? "Digite uma senha"}</p>
    </div>
  );
}

/* ── Page ── */
export default function RegistroPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);

  const { register, handleSubmit, watch, formState: { errors } } = useForm<RegistroForm>({
    resolver: zodResolver(registroSchema),
  });

  const passwordValue = watch("password") ?? "";

  const onSubmit = async (data: RegistroForm) => {
    setIsLoading(true);
    setAuthError(null);
    const supabase = createClient();
    const { error } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
      options: {
        data: { full_name: data.full_name },
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    });
    setIsLoading(false);
    if (error) {
      setAuthError(
        error.message === "User already registered"
          ? "Este e-mail já está cadastrado. Faça login."
          : error.message
      );
      return;
    }
    setSuccess(true);
  };

  const handleGoogle = async () => {
    const supabase = createClient();
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: `${window.location.origin}/auth/callback` },
    });
  };

  const inputCls = (hasError: boolean) =>
    `w-full bg-bilhar-dark border-2 rounded-xl pl-11 pr-4 py-3.5 text-sm text-white placeholder:text-gray-600 outline-none transition-all duration-200 ${
      hasError
        ? "border-red-500/60 focus:border-red-500"
        : "border-bilhar-green/15 focus:border-bilhar-green/50 hover:border-bilhar-green/25"
    }`;

  return (
    <div className="min-h-screen flex bg-bilhar-dark overflow-hidden">
      <AuthPanel />

      {/* ── Form panel ── */}
      <div className="flex-1 flex flex-col items-center justify-center p-6 sm:p-10 relative overflow-y-auto">
        {/* Mobile background */}
        <div className="lg:hidden absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(26,122,82,0.12)_0%,transparent_60%)]" />
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
                <span className="font-display font-bold text-xl gradient-emerald ml-1">Ideal</span>
              </div>
            </Link>
          </div>

          {/* Heading */}
          <div className="mb-7">
            <h1 className="font-display font-bold text-2xl sm:text-3xl text-white leading-tight mb-1.5">
              Criar conta grátis
            </h1>
            <p className="text-sm text-gray-500">Leva menos de 1 minuto</p>
          </div>

          {success ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              className="luxury-card p-8 text-center"
            >
              <div className="w-14 h-14 rounded-full border" style={{ background: "rgba(47,212,138,0.12)", borderColor: "rgba(47,212,138,0.3)" }} flex items-center justify-center mx-auto mb-5">
                <Sparkles style={{ width: 24, height: 24, color: "#2FD48A" }} />
              </div>
              <h3 className="font-display font-bold text-white text-xl mb-2">Conta criada!</h3>
              <p className="text-sm text-gray-400 leading-relaxed mb-6">
                Verifique seu e-mail para ativar a conta e começar a configurar sua mesa.
              </p>
              <Link href="/login" className="btn-gold px-6 py-3 rounded-xl text-sm inline-flex items-center gap-2">
                Ir para o Login
                <ArrowRight className="w-4 h-4" />
              </Link>
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
                Cadastrar com Google
              </button>

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

              {/* Divider */}
              <div className="flex items-center gap-3">
                <div className="flex-1 h-px bg-bilhar-green/10" />
                <span className="text-[0.65rem] font-bold tracking-widest uppercase text-gray-600">ou preencha</span>
                <div className="flex-1 h-px bg-bilhar-green/10" />
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-3.5">
                {/* Name */}
                <div>
                  <label className="text-xs font-semibold text-gray-400 tracking-wide mb-2 block">Nome Completo</label>
                  <div className="relative group">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600 group-focus-within:text-bilhar-green-bright transition-colors pointer-events-none" />
                    <input {...register("full_name")} type="text" placeholder="Seu nome completo" autoComplete="name"
                      className={inputCls(!!errors.full_name)} />
                  </div>
                  {errors.full_name && <p className="text-xs text-red-400 mt-1.5 flex items-center gap-1.5"><span className="w-1 h-1 rounded-full bg-red-400" />{errors.full_name.message}</p>}
                </div>

                {/* Email */}
                <div>
                  <label className="text-xs font-semibold text-gray-400 tracking-wide mb-2 block">E-mail</label>
                  <div className="relative group">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600 group-focus-within:text-bilhar-green-bright transition-colors pointer-events-none" />
                    <input {...register("email")} type="email" placeholder="seu@email.com" autoComplete="email"
                      className={inputCls(!!errors.email)} />
                  </div>
                  {errors.email && <p className="text-xs text-red-400 mt-1.5 flex items-center gap-1.5"><span className="w-1 h-1 rounded-full bg-red-400" />{errors.email.message}</p>}
                </div>

                {/* Password */}
                <div>
                  <label className="text-xs font-semibold text-gray-400 tracking-wide mb-2 block">Senha</label>
                  <div className="relative group">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600 group-focus-within:text-bilhar-green-bright transition-colors pointer-events-none" />
                    <input {...register("password")} type={showPassword ? "text" : "password"}
                      placeholder="Mínimo 8 caracteres" autoComplete="new-password"
                      className={`${inputCls(!!errors.password)} pr-12`} />
                    <button type="button" onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-600 hover:text-gray-300 transition-colors p-1">
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  <PasswordStrength password={passwordValue} />
                  {errors.password && <p className="text-xs text-red-400 mt-1 flex items-center gap-1.5"><span className="w-1 h-1 rounded-full bg-red-400" />{errors.password.message}</p>}
                </div>

                {/* Confirm password */}
                <div>
                  <label className="text-xs font-semibold text-gray-400 tracking-wide mb-2 block">Confirmar Senha</label>
                  <div className="relative group">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600 group-focus-within:text-bilhar-green-bright transition-colors pointer-events-none" />
                    <input {...register("confirm_password")} type={showPassword ? "text" : "password"}
                      placeholder="Repita a senha" autoComplete="new-password"
                      className={`${inputCls(!!errors.confirm_password)} pr-12`} />
                  </div>
                  {errors.confirm_password && <p className="text-xs text-red-400 mt-1.5 flex items-center gap-1.5"><span className="w-1 h-1 rounded-full bg-red-400" />{errors.confirm_password.message}</p>}
                </div>

                {/* Terms */}
                <p className="text-[0.65rem] text-gray-600 leading-relaxed pt-1">
                  Ao criar conta, você concorda com os{" "}
                  <a href="/termos" className="text-bilhar-green-bright hover:text-white transition-colors">Termos de Uso</a>
                  {" "}e a{" "}
                  <a href="/privacidade" className="text-bilhar-green-bright hover:text-white transition-colors">Política de Privacidade</a>.
                </p>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full btn-gold py-4 rounded-xl font-bold text-sm flex items-center justify-center gap-2.5 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-bilhar-dark/30 border-t-bilhar-dark rounded-full animate-spin" />
                      Criando conta...
                    </>
                  ) : (
                    <>
                      Criar Conta Grátis
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            </div>
          )}

          <p className="text-center text-sm text-gray-500 mt-7">
            Já tem conta?{" "}
            <Link href="/login" className="text-bilhar-green-bright hover:text-white transition-colors font-semibold">
              Entrar
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
