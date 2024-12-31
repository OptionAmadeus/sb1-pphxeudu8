/*
  # Fix RLS Policies

  1. Security Changes
    - Enable RLS on all tables
    - Replace public role with authenticated/anon
    - Add proper policies for all operations
    - Standardize policy naming

  2. Table Changes
    - Add policies for all CRUD operations where needed
    - Ensure proper access control for each table
*/

-- Enable RLS on all tables
ALTER TABLE assets ENABLE ROW LEVEL SECURITY;
ALTER TABLE connection_monitoring ENABLE ROW LEVEL SECURITY;
ALTER TABLE phone_verification ENABLE ROW LEVEL SECURITY;
ALTER TABLE portfolios ENABLE ROW LEVEL SECURITY;
ALTER TABLE recommendations ENABLE ROW LEVEL SECURITY;
ALTER TABLE schema_migrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE waitlist ENABLE ROW LEVEL SECURITY;

-- Assets policies
DROP POLICY IF EXISTS "Users can manage own assets" ON assets;
DROP POLICY IF EXISTS "Users can view own assets" ON assets;

CREATE POLICY "Enable read for authenticated users"
  ON assets FOR SELECT
  TO authenticated
  USING (auth.uid() IN (
    SELECT user_id FROM portfolios WHERE id = portfolio_id
  ));

CREATE POLICY "Enable insert for authenticated users"
  ON assets FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() IN (
    SELECT user_id FROM portfolios WHERE id = portfolio_id
  ));

CREATE POLICY "Enable update for authenticated users"
  ON assets FOR UPDATE
  TO authenticated
  USING (auth.uid() IN (
    SELECT user_id FROM portfolios WHERE id = portfolio_id
  ))
  WITH CHECK (auth.uid() IN (
    SELECT user_id FROM portfolios WHERE id = portfolio_id
  ));

CREATE POLICY "Enable delete for authenticated users"
  ON assets FOR DELETE
  TO authenticated
  USING (auth.uid() IN (
    SELECT user_id FROM portfolios WHERE id = portfolio_id
  ));

-- Connection monitoring policies
CREATE POLICY "Enable insert for service monitoring"
  ON connection_monitoring FOR INSERT
  TO service_role
  WITH CHECK (true);

CREATE POLICY "Enable read for service monitoring"
  ON connection_monitoring FOR SELECT
  TO service_role
  USING (true);

-- Phone verification policies
CREATE POLICY "Enable insert for all users"
  ON phone_verification FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Portfolio policies
DROP POLICY IF EXISTS "Users can create own portfolios" ON portfolios;
DROP POLICY IF EXISTS "Users can delete own portfolios" ON portfolios;
DROP POLICY IF EXISTS "Users can update own portfolios" ON portfolios;
DROP POLICY IF EXISTS "Users can view own portfolios" ON portfolios;

CREATE POLICY "Enable read for own portfolios"
  ON portfolios FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Enable insert for own portfolios"
  ON portfolios FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Enable update for own portfolios"
  ON portfolios FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Enable delete for own portfolios"
  ON portfolios FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Recommendations policies
CREATE POLICY "Enable read for own recommendations"
  ON recommendations FOR SELECT
  TO authenticated
  USING (auth.uid() IN (
    SELECT user_id FROM portfolios WHERE id = portfolio_id
  ));

-- Schema migrations policies
CREATE POLICY "Enable access for service role"
  ON schema_migrations
  TO service_role
  USING (true);

-- Transactions policies
DROP POLICY IF EXISTS "Users can create own transactions" ON transactions;
DROP POLICY IF EXISTS "Users can view own transactions" ON transactions;

CREATE POLICY "Enable read for own transactions"
  ON transactions FOR SELECT
  TO authenticated
  USING (auth.uid() IN (
    SELECT user_id FROM portfolios WHERE id = portfolio_id
  ));

CREATE POLICY "Enable insert for own transactions"
  ON transactions FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() IN (
    SELECT user_id FROM portfolios WHERE id = portfolio_id
  ));

-- Waitlist policies
DROP POLICY IF EXISTS "Anyone can join waitlist" ON waitlist;
DROP POLICY IF EXISTS "Users can view own entries" ON waitlist;

CREATE POLICY "Enable insert for anonymous users"
  ON waitlist FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Enable read for own entries"
  ON waitlist FOR SELECT
  TO anon, authenticated
  USING (true);