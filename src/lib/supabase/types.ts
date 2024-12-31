export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      waitlist: {
        Row: {
          id: string
          email: string
          name: string
          created_at: string
          confirmed: boolean
          confirmation_token: string | null
          confirmation_sent_at: string | null
          position: number
        }
        Insert: {
          email: string
          name: string
          confirmed?: boolean
          confirmation_token?: string | null
          confirmation_sent_at?: string | null
        }
        Update: {
          email?: string
          name?: string
          confirmed?: boolean
          confirmation_token?: string | null
          confirmation_sent_at?: string | null
        }
      }
    }
  }
}