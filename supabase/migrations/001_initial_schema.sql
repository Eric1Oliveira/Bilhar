-- =============================================
-- SINUCA IDEAL — Schema Completo Supabase
-- =============================================

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- =============================================
-- PROFILES
-- =============================================
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  full_name TEXT,
  phone TEXT,
  cpf TEXT,
  avatar_url TEXT,
  address JSONB DEFAULT NULL,
  is_admin BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own profile" ON profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Admins can view all profiles" ON profiles
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND is_admin = TRUE)
  );

-- Auto-create profile on signup
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO profiles (id, email, full_name, avatar_url)
  VALUES (
    NEW.id,
    NEW.email,
    NEW.raw_user_meta_data->>'full_name',
    NEW.raw_user_meta_data->>'avatar_url'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- =============================================
-- PRODUCTS
-- =============================================
CREATE TABLE IF NOT EXISTS products (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  long_description TEXT,
  category TEXT NOT NULL CHECK (category IN ('profissional', 'semi-profissional', 'lazer', 'compacta')),
  base_price NUMERIC(10,2) NOT NULL,
  rental_price_6 NUMERIC(10,2),
  rental_price_12 NUMERIC(10,2),
  rental_price_24 NUMERIC(10,2),
  weight_kg NUMERIC(6,2),
  dimensions JSONB DEFAULT '{"width": 0, "height": 0, "length": 0}'::JSONB,
  features TEXT[] DEFAULT '{}',
  images TEXT[] DEFAULT '{}',
  model_3d_url TEXT,
  ar_model_url TEXT,
  is_active BOOLEAN DEFAULT TRUE,
  is_featured BOOLEAN DEFAULT FALSE,
  stock INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE products ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view active products" ON products
  FOR SELECT USING (is_active = TRUE);

CREATE POLICY "Admins can manage products" ON products
  FOR ALL USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND is_admin = TRUE)
  );

-- =============================================
-- PRODUCT ATTRIBUTES
-- =============================================
CREATE TABLE IF NOT EXISTS product_attributes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  product_id UUID REFERENCES products(id) ON DELETE CASCADE,
  type TEXT NOT NULL CHECK (type IN ('wood_color', 'felt_color', 'leg_type', 'accessory')),
  name TEXT NOT NULL,
  value TEXT NOT NULL,
  price_modifier NUMERIC(10,2) DEFAULT 0,
  color_hex TEXT,
  texture_url TEXT,
  is_default BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE product_attributes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view attributes" ON product_attributes FOR SELECT USING (TRUE);
CREATE POLICY "Admins can manage attributes" ON product_attributes FOR ALL USING (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND is_admin = TRUE)
);

-- =============================================
-- PRODUCT CONFIGURATIONS (saved configs)
-- =============================================
CREATE TABLE IF NOT EXISTS product_configurations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  product_id UUID REFERENCES products(id) ON DELETE CASCADE,
  name TEXT NOT NULL DEFAULT 'Minha Configuração',
  wood_color TEXT NOT NULL DEFAULT 'nogueira',
  felt_color TEXT NOT NULL DEFAULT 'verde',
  leg_type TEXT NOT NULL DEFAULT 'torneada',
  accessories TEXT[] DEFAULT '{}',
  custom_width NUMERIC(6,2),
  custom_length NUMERIC(6,2),
  total_price NUMERIC(10,2) NOT NULL DEFAULT 0,
  configuration_data JSONB DEFAULT '{}'::JSONB,
  thumbnail_url TEXT,
  is_public BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE product_configurations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage own configurations" ON product_configurations
  FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Public configurations are viewable" ON product_configurations
  FOR SELECT USING (is_public = TRUE);

-- =============================================
-- ORDERS
-- =============================================
CREATE TABLE IF NOT EXISTS orders (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
  order_number TEXT UNIQUE NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('compra', 'aluguel')),
  status TEXT NOT NULL DEFAULT 'pendente'
    CHECK (status IN ('pendente', 'confirmado', 'producao', 'enviado', 'entregue', 'cancelado')),
  subtotal NUMERIC(10,2) NOT NULL DEFAULT 0,
  shipping_cost NUMERIC(10,2) NOT NULL DEFAULT 0,
  discount NUMERIC(10,2) NOT NULL DEFAULT 0,
  total NUMERIC(10,2) NOT NULL DEFAULT 0,
  payment_method TEXT CHECK (payment_method IN ('pix', 'cartao_credito', 'cartao_debito', 'boleto')),
  payment_status TEXT DEFAULT 'pendente' CHECK (payment_status IN ('pendente', 'pago', 'estornado')),
  payment_id TEXT, -- Mercado Pago ID
  shipping_address JSONB NOT NULL,
  tracking_code TEXT,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own orders" ON orders
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Admins can manage all orders" ON orders
  FOR ALL USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND is_admin = TRUE)
  );

-- =============================================
-- ORDER ITEMS
-- =============================================
CREATE TABLE IF NOT EXISTS order_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
  product_id UUID REFERENCES products(id) ON DELETE SET NULL,
  configuration_id UUID REFERENCES product_configurations(id) ON DELETE SET NULL,
  quantity INTEGER NOT NULL DEFAULT 1,
  unit_price NUMERIC(10,2) NOT NULL,
  total_price NUMERIC(10,2) NOT NULL,
  product_snapshot JSONB, -- snapshot of product at time of order
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own order items" ON order_items
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM orders WHERE orders.id = order_items.order_id AND orders.user_id = auth.uid())
  );

CREATE POLICY "Admins can manage order items" ON order_items
  FOR ALL USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND is_admin = TRUE)
  );

-- =============================================
-- RENTAL CONTRACTS
-- =============================================
CREATE TABLE IF NOT EXISTS rental_contracts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_id UUID REFERENCES orders(id) ON DELETE SET NULL,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  product_id UUID REFERENCES products(id) ON DELETE SET NULL,
  configuration_id UUID REFERENCES product_configurations(id) ON DELETE SET NULL,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  monthly_value NUMERIC(10,2) NOT NULL,
  status TEXT NOT NULL DEFAULT 'ativo'
    CHECK (status IN ('ativo', 'pausado', 'encerrado', 'atrasado')),
  payment_day INTEGER NOT NULL DEFAULT 10 CHECK (payment_day BETWEEN 1 AND 28),
  next_payment_date DATE,
  installments_paid INTEGER DEFAULT 0,
  total_installments INTEGER NOT NULL,
  stripe_subscription_id TEXT,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE rental_contracts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own rental contracts" ON rental_contracts
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Admins can manage rental contracts" ON rental_contracts
  FOR ALL USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND is_admin = TRUE)
  );

-- =============================================
-- CUSTOMER PHOTOS (galeria)
-- =============================================
CREATE TABLE IF NOT EXISTS customer_photos (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  product_id UUID REFERENCES products(id) ON DELETE SET NULL,
  image_url TEXT NOT NULL,
  caption TEXT,
  is_approved BOOLEAN DEFAULT FALSE,
  likes INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE customer_photos ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Approved photos are public" ON customer_photos
  FOR SELECT USING (is_approved = TRUE);

CREATE POLICY "Users can manage own photos" ON customer_photos
  FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Admins can moderate photos" ON customer_photos
  FOR ALL USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND is_admin = TRUE)
  );

-- =============================================
-- SHIPPING QUOTES
-- =============================================
CREATE TABLE IF NOT EXISTS shipping_quotes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  cep_origem TEXT DEFAULT '01310-100',
  cep_destino TEXT NOT NULL,
  product_id UUID REFERENCES products(id),
  quote_data JSONB,
  price NUMERIC(10,2),
  days INTEGER,
  carrier TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================
-- NOTIFICATIONS
-- =============================================
CREATE TABLE IF NOT EXISTS notifications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  type TEXT DEFAULT 'info' CHECK (type IN ('info', 'success', 'warning', 'error')),
  is_read BOOLEAN DEFAULT FALSE,
  action_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own notifications" ON notifications
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can mark own notifications as read" ON notifications
  FOR UPDATE USING (auth.uid() = user_id);

-- =============================================
-- INDEXES
-- =============================================
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category);
CREATE INDEX IF NOT EXISTS idx_products_is_active ON products(is_active);
CREATE INDEX IF NOT EXISTS idx_products_is_featured ON products(is_featured);
CREATE INDEX IF NOT EXISTS idx_orders_user_id ON orders(user_id);
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);
CREATE INDEX IF NOT EXISTS idx_orders_order_number ON orders(order_number);
CREATE INDEX IF NOT EXISTS idx_rental_contracts_user_id ON rental_contracts(user_id);
CREATE INDEX IF NOT EXISTS idx_rental_contracts_status ON rental_contracts(status);
CREATE INDEX IF NOT EXISTS idx_product_configurations_user_id ON product_configurations(user_id);

-- =============================================
-- UPDATED_AT TRIGGER
-- =============================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON profiles FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_products_updated_at BEFORE UPDATE ON products FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_orders_updated_at BEFORE UPDATE ON orders FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_rental_contracts_updated_at BEFORE UPDATE ON rental_contracts FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_configurations_updated_at BEFORE UPDATE ON product_configurations FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- =============================================
-- SEED DATA — Products
-- =============================================
INSERT INTO products (name, slug, description, category, base_price, rental_price_6, rental_price_12, rental_price_24, weight_kg, dimensions, features, is_active, is_featured, stock) VALUES
(
  'Pro 9 Standard', 'pro-9-standard',
  'Mesa profissional 9 palmos com ardósia tripla e feltro importado.',
  'profissional', 7500, 890, 750, 620, 320,
  '{"width": 127, "height": 80, "length": 254}'::JSONB,
  ARRAY['Ardósia tripla 45mm', 'Feltro Simonis 860', 'Madeira maciça', 'Garantia 5 anos'],
  TRUE, TRUE, 5
),
(
  'Snooker Royal 12P', 'snooker-royal-12p',
  'Mesa de snooker padrão oficial 12 palmos.',
  'profissional', 12000, 1450, 1200, 980, 480,
  '{"width": 175, "height": 85, "length": 357}'::JSONB,
  ARRAY['12 palmos padrão oficial', 'Ardósia 5 peças', 'Estrutura aço e madeira', 'Bolsos de couro'],
  TRUE, TRUE, 2
),
(
  'Lazer Plus 8', 'lazer-plus-8',
  'Mesa 8 palmos para residências com design moderno.',
  'lazer', 4500, 590, 480, 390, 220,
  '{"width": 100, "height": 78, "length": 200}'::JSONB,
  ARRAY['8 palmos', 'Feltro colorido disponível', 'Design moderno', 'Fácil montagem'],
  TRUE, FALSE, 8
),
(
  'Compacta Urban 7', 'compacta-urban-7',
  'Máxima diversão em espaços reduzidos. 7 palmos contemporâneo.',
  'compacta', 3200, 420, 350, 290, 160,
  '{"width": 89, "height": 76, "length": 178}'::JSONB,
  ARRAY['7 palmos', 'Ideal para apartamentos', 'Pernas dobráveis', 'MDF Premium'],
  TRUE, FALSE, 10
);
