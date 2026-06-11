import type { Metadata } from "next";
import { CatalogoClient } from "./catalogo-client";

export const metadata: Metadata = {
  title: "Catálogo de Mesas",
  description: "Conheça toda a linha de mesas de sinuca Sinuca Ideal. Modelos profissionais, semi-profissionais e para lazer.",
};

export default function CatalogoPage() {
  return <CatalogoClient />;
}
