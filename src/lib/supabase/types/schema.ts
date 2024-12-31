import { Database as GeneratedDatabase } from '@/types/supabase';

export type Database = GeneratedDatabase;

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];