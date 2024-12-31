/*
  # Initial Database Setup
  
  1. New Tables
    - users (handled by Supabase Auth)
    - portfolios (user portfolios)
    - assets (portfolio assets)
    - transactions (trading history)
    - recommendations (AI recommendations)
    - waitlist (early access signup)

  2. Security
    - Enable RLS on all tables
    - Add appropriate access policies
    - Set up secure functions
*/

-- Create enum types
CREATE TYPE asset_type AS ENUM ('crypto', 'stock', 'commodity');
CREATE TYPE transaction_type AS ENUM ('buy', 'sell', 'transfer');
CREATE TYPE transaction_status AS ENUM ('pending', 'completed', 'failed');

-- Create portfolios table
CREATE TABLE portfolios (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users NOT NULL,
  name text NOT NULL,
  description text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create assets table
CREATE TABLE assets (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  portfolio_id uuid REFERENCES portfolios ON DELETE CASCADE NOT NULL,
  type asset_type NOT NULL,
  symbol text NOT NULL,
  name text NOT NULL,
  quantity numeric NOT NULL DEFAULT 0,
  cost_basis numeric NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(portfolio_id, symbol)
);

-- Create transactions table
CREATE TABLE transactions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  portfolio_id uuid REFERENCES portfolios ON DELETE CASCADE NOT NULL,
  asset_id uuid REFERENCES assets NOT NULL,
  type transaction_type NOT NULL,
  quantity numeric NOT NULL,
  price numeric NOT NULL,
  timestamp timestamptz DEFAULT now(),
  status transaction_status DEFAULT 'pending',
  notes text
);

-- Create recommendations table
CREATE TABLE recommendations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  portfolio_id uuid REFERENCES portfolios ON DELETE CASCADE NOT NULL,
  asset_id uuid REFERENCES assets NOT NULL,
  action text NOT NULL,
  quantity numeric NOT NULL,
  price numeric NOT NULL,
  confidence numeric NOT NULL CHECK (confidence >= 0 AND confidence <= 1),
  reasoning text NOT NULL,
  created_at timestamptz DEFAULT now(),
  expires_at timestamptz DEFAULT (now() + interval '24 hours')
);

-- Create waitlist table
CREATE TABLE waitlist (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  name text NOT NULL,
  created_at timestamptz DEFAULT now(),
  position serial,
  status text DEFAULT 'pending'
);

-- Enable Row Level Security
ALTER TABLE portfolios ENABLE ROW LEVEL SECURITY;
ALTER TABLE assets ENABLE ROW LEVEL SECURITY;
ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE recommendations ENABLE ROW LEVEL SECURITY;
ALTER TABLE waitlist ENABLE ROW LEVEL SECURITY;

-- Create RLS Policies
CREATE POLICY "Users can manage their own portfolios"
  ON portfolios
  USING (auth.uid() = user_id);

CREATE POLICY "Users can manage their portfolio assets"
  ON assets
  USING (portfolio_id IN (
    SELECT id FROM portfolios WHERE user_id = auth.uid()
  ));

CREATE POLICY "Users can manage their transactions"
  ON transactions
  USING (portfolio_id IN (
    SELECT id FROM portfolios WHERE user_id = auth.uid()
  ));

CREATE POLICY "Users can view their recommendations"
  ON recommendations
  USING (portfolio_id IN (
    SELECT id FROM portfolios WHERE user_id = auth.uid()
  ));

CREATE POLICY "Anyone can join waitlist"
  ON waitlist
  FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Users can view their waitlist status"
  ON waitlist
  FOR SELECT
  USING (true);

-- Create indexes for better performance
CREATE INDEX idx_portfolios_user_id ON portfolios(user_id);
CREATE INDEX idx_assets_portfolio ON assets(portfolio_id);
CREATE INDEX idx_transactions_portfolio ON transactions(portfolio_id);
CREATE INDEX idx_recommendations_portfolio ON recommendations(portfolio_id);
CREATE INDEX idx_waitlist_email ON waitlist(email);

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Add updated_at triggers
CREATE TRIGGER update_portfolios_timestamp
  BEFORE UPDATE ON portfolios
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_assets_timestamp
  BEFORE UPDATE ON assets
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();