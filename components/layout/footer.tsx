import Link from "next/link";
import { Phone, Mail, MapPin, Globe, Share2, PlayCircle } from "lucide-react";

const PRODUCT_LINKS = [
  ["Mesas Profissionais", "/catalogo?cat=profissional"],
  ["Semi-Profissionais", "/catalogo?cat=semi"],
  ["Lazer & Família", "/catalogo?cat=lazer"],
  ["Mesas Compactas", "/catalogo?cat=compacta"],
  ["Acessórios", "/catalogo?cat=acessorios"],
] as const;

const COMPANY_LINKS = [
  ["Configurador 3D", "/configurador"],
  ["Visualização AR", "/ar"],
  ["Aluguel de Mesas", "/alugar"],
  ["Área do Cliente", "/perfil"],
  ["Central de Ajuda", "/ajuda"],
] as const;

const SOCIAL = [
  { Icon: Globe, label: "Site" },
  { Icon: Share2, label: "Redes Sociais" },
  { Icon: PlayCircle, label: "YouTube" },
] as const;

export function Footer() {
  return (
    <footer
      style={{ background: "#060606", borderTop: "1px solid rgba(201,168,76,0.1)" }}
    >
      {/* Gold rule at top */}
      <div className="h-px gold-rule" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 sm:gap-12">

          {/* ── Brand ── */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link href="/" className="flex items-center gap-3 mb-5 group w-fit">
              <div
                className="flex items-center justify-center rounded-lg flex-shrink-0"
                style={{
                  width: 36,
                  height: 36,
                  background: "linear-gradient(135deg, #820000, #b91c1c)",
                  boxShadow: "0 4px 12px rgba(130,0,0,0.25)",
                  transition: "box-shadow 0.25s",
                }}
              >
                <span className="text-white font-display font-bold" style={{ fontSize: "1rem" }}>
                  S
                </span>
              </div>
              <div>
                <span className="font-display font-bold text-white" style={{ fontSize: "1.15rem" }}>
                  Sinuca
                </span>
                <span className="font-display font-bold gradient-gold ml-1" style={{ fontSize: "1.15rem" }}>
                  Ideal
                </span>
              </div>
            </Link>

            <p
              className="text-gray-500 leading-relaxed mb-6"
              style={{ fontSize: "0.875rem", maxWidth: 240 }}
            >
              A maior plataforma brasileira de mesas de sinuca profissionais.
              Configure, visualize em 3D e receba em casa.
            </p>

            {/* Social icons */}
            <div className="flex gap-3">
              {SOCIAL.map(({ Icon, label }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  className="flex items-center justify-center rounded-lg transition-all duration-200 text-gray-500 hover:text-bilhar-gold hover:border-bilhar-gold/30"
                  style={{
                    width: 38,
                    height: 38,
                    background: "rgba(201,168,76,0.04)",
                    border: "1px solid rgba(201,168,76,0.12)",
                  }}
                >
                  <Icon style={{ width: 16, height: 16 }} />
                </a>
              ))}
            </div>
          </div>

          {/* ── Products ── */}
          <div>
            <h3
              className="font-semibold text-white mb-5 flex items-center gap-2"
              style={{ fontSize: "0.875rem" }}
            >
              <span
                className="inline-block"
                style={{ width: 16, height: 1, background: "rgba(201,168,76,0.5)" }}
              />
              Produtos
            </h3>
            <ul className="space-y-3">
              {PRODUCT_LINKS.map(([label, href]) => (
                <li key={label}>
                  <Link
                    href={href}
                    className="text-gray-500 hover:text-bilhar-gold transition-colors duration-200 leading-none"
                    style={{ fontSize: "0.875rem" }}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Empresa ── */}
          <div>
            <h3
              className="font-semibold text-white mb-5 flex items-center gap-2"
              style={{ fontSize: "0.875rem" }}
            >
              <span
                className="inline-block"
                style={{ width: 16, height: 1, background: "rgba(201,168,76,0.5)" }}
              />
              Empresa
            </h3>
            <ul className="space-y-3">
              {COMPANY_LINKS.map(([label, href]) => (
                <li key={label}>
                  <Link
                    href={href}
                    className="text-gray-500 hover:text-bilhar-gold transition-colors duration-200 leading-none"
                    style={{ fontSize: "0.875rem" }}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Contato ── */}
          <div>
            <h3
              className="font-semibold text-white mb-5 flex items-center gap-2"
              style={{ fontSize: "0.875rem" }}
            >
              <span
                className="inline-block"
                style={{ width: 16, height: 1, background: "rgba(201,168,76,0.5)" }}
              />
              Contato
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Phone
                  style={{ width: 16, height: 16, color: "#c9a84c", marginTop: 2, flexShrink: 0 }}
                />
                <div>
                  <p className="text-gray-400" style={{ fontSize: "0.875rem" }}>(11) 99999-0000</p>
                  <p className="text-gray-600 mt-0.5" style={{ fontSize: "0.72rem" }}>
                    WhatsApp disponível
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Mail
                  style={{ width: 16, height: 16, color: "#c9a84c", marginTop: 2, flexShrink: 0 }}
                />
                <p className="text-gray-400" style={{ fontSize: "0.875rem" }}>
                  contato@sinucaideal.com.br
                </p>
              </li>
              <li className="flex items-start gap-3">
                <MapPin
                  style={{ width: 16, height: 16, color: "#c9a84c", marginTop: 2, flexShrink: 0 }}
                />
                <div>
                  <p className="text-gray-400" style={{ fontSize: "0.875rem" }}>São Paulo, SP</p>
                  <p className="text-gray-600 mt-0.5" style={{ fontSize: "0.72rem" }}>
                    Entrega para todo o Brasil
                  </p>
                </div>
              </li>
            </ul>
          </div>

        </div>

        {/* ── Bottom bar ── */}
        <div
          className="mt-14 sm:mt-16 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4"
          style={{ borderTop: "1px solid rgba(201,168,76,0.07)" }}
        >
          <p className="text-center sm:text-left text-gray-600" style={{ fontSize: "0.72rem" }}>
            © {new Date().getFullYear()} Sinuca Ideal. Todos os direitos reservados.
          </p>

          {/* Payment methods */}
          <div className="flex items-center gap-3">
            {["PIX", "Cartão"].map((method) => (
              <span
                key={method}
                className="font-semibold"
                style={{
                  fontSize: "0.6rem",
                  padding: "4px 10px",
                  borderRadius: 6,
                  background: "rgba(201,168,76,0.06)",
                  border: "1px solid rgba(201,168,76,0.14)",
                  color: "rgba(201,168,76,0.7)",
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                }}
              >
                {method}
              </span>
            ))}
            <Link
              href="/privacidade"
              className="text-gray-600 hover:text-gray-400 transition-colors"
              style={{ fontSize: "0.72rem" }}
            >
              Privacidade
            </Link>
            <Link
              href="/termos"
              className="text-gray-600 hover:text-gray-400 transition-colors"
              style={{ fontSize: "0.72rem" }}
            >
              Termos
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
