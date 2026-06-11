import type { Metadata } from "next";
import { ConfiguradorPageClient } from "./configurador-client";

export const metadata: Metadata = {
  title: "Configurador 3D",
  description: "Configure sua mesa de sinuca ideal em tempo real com nosso visualizador 3D.",
};

export default function ConfiguradorPage() {
  return <ConfiguradorPageClient />;
}
