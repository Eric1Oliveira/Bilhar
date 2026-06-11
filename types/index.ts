export type ProductCategory = "profissional" | "semi-profissional" | "lazer" | "compacta";
export type WoodColor = "nogueira" | "mogno" | "carvalho" | "natural" | "ebano" | "wenge";
export type FeltColor = "verde" | "azul" | "vermelho" | "cinza" | "preto" | "vinho";
export type LegType = "torneada" | "reta" | "cromada" | "inox" | "fundida";
export type OrderStatus = "pendente" | "confirmado" | "producao" | "enviado" | "entregue" | "cancelado";
export type RentalStatus = "ativo" | "pausado" | "encerrado" | "atrasado";
export type PaymentMethod = "pix" | "cartao_credito" | "cartao_debito" | "boleto";
export type OrderType = "compra" | "aluguel";

export interface Profile {
  id: string;
  email: string;
  full_name: string | null;
  phone: string | null;
  avatar_url: string | null;
  address: Address | null;
  created_at: string;
  updated_at: string;
}

export interface Address {
  cep: string;
  logradouro: string;
  numero: string;
  complemento?: string;
  bairro: string;
  cidade: string;
  estado: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  category: ProductCategory;
  base_price: number;
  rental_price_6: number;
  rental_price_12: number;
  rental_price_24: number;
  weight_kg: number;
  dimensions: { width: number; height: number; length: number };
  features: string[];
  images: string[];
  model_3d_url: string | null;
  ar_model_url: string | null;
  is_active: boolean;
  is_featured: boolean;
  stock: number;
  created_at: string;
}

export interface ProductAttribute {
  id: string;
  product_id: string;
  type: "wood_color" | "felt_color" | "leg_type" | "accessory";
  name: string;
  value: string;
  price_modifier: number;
  color_hex?: string;
  texture_url?: string;
  is_default: boolean;
}

export interface ProductConfiguration {
  id: string;
  user_id: string;
  product_id: string;
  name: string;
  wood_color: WoodColor;
  felt_color: FeltColor;
  leg_type: LegType;
  accessories: string[];
  custom_dimensions?: { width: number; length: number };
  total_price: number;
  configuration_data: Record<string, unknown>;
  created_at: string;
}

export interface CartItem {
  product: Product;
  configuration?: ProductConfiguration;
  quantity: number;
  type: OrderType;
  rental_months?: 6 | 12 | 24;
}

export interface Order {
  id: string;
  user_id: string;
  order_number: string;
  type: OrderType;
  status: OrderStatus;
  items: OrderItem[];
  subtotal: number;
  shipping_cost: number;
  discount: number;
  total: number;
  payment_method: PaymentMethod;
  payment_status: "pendente" | "pago" | "estornado";
  shipping_address: Address;
  tracking_code?: string;
  notes?: string;
  created_at: string;
  updated_at: string;
}

export interface OrderItem {
  id: string;
  order_id: string;
  product_id: string;
  product: Product;
  configuration?: ProductConfiguration;
  quantity: number;
  unit_price: number;
  total_price: number;
}

export interface RentalContract {
  id: string;
  order_id: string;
  user_id: string;
  product_id: string;
  product: Product;
  configuration?: ProductConfiguration;
  start_date: string;
  end_date: string;
  monthly_value: number;
  status: RentalStatus;
  payment_day: number;
  next_payment_date: string;
  installments_paid: number;
  total_installments: number;
  created_at: string;
}

export interface CustomerPhoto {
  id: string;
  user_id: string;
  product_id?: string;
  image_url: string;
  caption?: string;
  is_approved: boolean;
  likes: number;
  created_at: string;
}

export interface ConfiguratorState {
  selectedProduct: Product | null;
  woodColor: WoodColor;
  feltColor: FeltColor;
  legType: LegType;
  accessories: string[];
  customWidth?: number;
  customLength?: number;
  currentStep: number;
  totalPrice: number;
  savedConfigId?: string;
}
