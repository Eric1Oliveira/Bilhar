import type { Metadata } from "next";
import { CheckoutClient } from "./checkout-client";

export const metadata: Metadata = {
  title: "Checkout",
  description: "Finalize seu pedido de mesa de sinuca.",
};

export default function CheckoutPage() {
  return <CheckoutClient />;
}
