import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { cep, product_id } = await request.json();

    if (!cep || cep.length < 8) {
      return NextResponse.json({ error: "CEP inválido" }, { status: 400 });
    }

    const cleanCep = cep.replace(/\D/g, "");

    // Check if it's in São Paulo capital (simplified)
    const isSPCapital = cleanCep.startsWith("01") || cleanCep.startsWith("02") ||
      cleanCep.startsWith("03") || cleanCep.startsWith("04") || cleanCep.startsWith("05");

    const isGrandeeSP = cleanCep.startsWith("06") || cleanCep.startsWith("07") ||
      cleanCep.startsWith("08") || cleanCep.startsWith("09");

    let price = 0;
    let days = 0;
    let region = "";

    if (isSPCapital) {
      price = 0;
      days = 3;
      region = "São Paulo Capital";
    } else if (isGrandeeSP) {
      price = 250;
      days = 5;
      region = "Grande São Paulo";
    } else if (cleanCep.startsWith("1") || cleanCep.startsWith("2") || cleanCep.startsWith("3")) {
      price = 450;
      days = 7;
      region = "Sudeste";
    } else if (cleanCep.startsWith("4") || cleanCep.startsWith("5")) {
      price = 650;
      days = 10;
      region = "Sul / Centro-Oeste";
    } else {
      price = 950;
      days = 15;
      region = "Norte / Nordeste";
    }

    return NextResponse.json({
      price,
      days,
      region,
      includes_assembly: true,
      message: price === 0
        ? "Frete grátis! Entrega e montagem incluídas."
        : `Frete: R$ ${price},00. Entrega em ${days} dias úteis.`,
    });
  } catch {
    return NextResponse.json({ error: "Erro ao calcular frete" }, { status: 500 });
  }
}
