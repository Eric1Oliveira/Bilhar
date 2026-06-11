import type { Metadata } from "next";
import { ARPageClient } from "./ar-client";

export const metadata: Metadata = {
  title: "Visualizar em AR",
  description: "Veja como ficará a mesa de sinuca no seu ambiente real com Realidade Aumentada.",
};

export default function ARPage() {
  return <ARPageClient />;
}
