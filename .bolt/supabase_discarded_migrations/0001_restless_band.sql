/*
  # Initial Schema Setup

  1. New Tables
    - portfolios: User portfolio management
    - assets: Portfolio asset tracking
    - transactions: Transaction history
    - recommendations: AI-generated trade recommendations

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users to manage their own data
    - Ensure data isolation between users

  3. Relationships
    - portfolios -> auth.users (user_id)
    - assets -> portfolios (portfolio_id)
    - transactions -> portfolios (portfolio_id)
    - recommendations -> portfolios (portfolio_id)
*/

-- Create enum types
CREATE TYPE transaction_type AS ENUM ('buy', 'sell', 'transfer');
CREATE TYPE transaction_status AS ENUM ('completed', 'pending', 'failed');
CREATE TYPE recommendation_action AS ENUM ('buy', 'sell', 'hold');

-- Portfolios table
CREATE TABLE IF NOT EXISTS portfolios (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users NOT NULL,
  name text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Assets table
CREATE TABLE IF NOT EXISTS assets (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  portfolio_id uuid REFERENCES portfolios ON DELETE CASCADE NOT NULL,
  symbol text NOT NULL,
  name text NOT NULL,
  balance numeric NOT NULL DEFAULT 0,
  cost_basis numeric NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(portfolio_id, symbol)
);

-- Transactions table
CREATE TABLE IF NOT EXISTS transactions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  portfolio_id uuid REFERENCES portfolios ON DELETE CASCADE NOT NULL,
  asset_symbol text NOT NULL,
  type transaction_type NOT NULL,
  amount numeric NOT NULL,
  price numeric NOT NULL,
  timestamp timestamptz DEFAULT now(),
  status transaction_status NOT NULL DEFAULT 'pending',
  created_at timestamptz DEFAULT now()
);

-- Recommendations table
CREATE TABLE IF NOT EXISTS recommendations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  portfolio_id uuid REFERENCES portfolios ON DELETE CASCADE NOT NULL,
  asset_symbol text NOT NULL,
  action recommendation_action NOT NULL,
  amount numeric NOT NULL,
  reason text,
  confidence numeric NOT NULL CHECK (confidence >= 0 AND confidence <= 1),
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE portfolios ENABLE ROW LEVEL SECURITY;
ALTER TABLE assets ENABLE ROW LEVEL SECURITY;
ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE recommendations ENABLE ROW LEVEL SECURITY;

-- Policies for portfolios
CREATE POLICY "Users can view own portfolios"
  ON portfolios FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create own portfolios"
  ON portfolios FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own portfolios"
  ON portfolios FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own portfolios"
  ON portfolios FOR DELETE
  USING (auth.uid() = user_id);

-- Policies for assets
CREATE POLICY "Users can view own assets"
  ON assets FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM portfolios
    WHERE portfolios.id = assets.portfolio_id
    AND portfolios.user_id = auth.uid()
  ));

CREATE POLICY "Users can manage own assets"
  ON assets FOR ALL
  USING (EXISTS (
    SELECT 1 FROM portfolios
    WHERE portfolios.id = assets.portfolio_id
    AND portfolios.user_id = auth.uid()
  ));

-- Policies for transactions
CREATE POLICY "Users can view own transactions"
  ON transactions FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM portfolios
    WHERE portfolios.id = transactions.portfolio_id
    AND portfolios.user_id = auth.uid()
  ));

CREATE POLICY "Users can create own transactions"
  ON transactions FOR INSERT
  WITH CHECK (EXISTS (
    SELECT 1 FROM portfolios
    WHERE portfolios.id = transactions.portfolio_id
    AND portfolios.user_id = auth.uid()
  ));

-- Policies for recommendations
CREATE POLICY "Users can view own recommendations"
  ON recommendations FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM portfolios
    WHERE portfolios.id = recommendations.portfolio_id
    AND portfolios.user_id = auth.uid()
  ));

-- Create indexes for better query performance
CREATE INDEX idx_portfolios_user_id ON portfolios(user_id);
CREATE INDEX idx_assets_portfolio_id ON assets(portfolio_id);
CREATE INDEX idx_transactions_portfolio_id ON transactions(portfolio_id);
CREATE INDEX idx_recommendations_portfolio_id ON recommendations(portfolio_id);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Add updated_at triggers
CREATE TRIGGER update_portfolios_updated_at
  BEFORE UPDATE ON portfolios
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_assets_updated_at
  BEFORE UPDATE ON assets
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();