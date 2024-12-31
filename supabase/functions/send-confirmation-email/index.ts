import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1'

interface EmailPayload {
  email: string
  name: string
  token: string
}

serve(async (req) => {
  try {
    const { email, name, token } = await req.json() as EmailPayload
    
    // Create Supabase client
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    // Send email using Supabase's built-in email service
    const { error } = await supabaseClient.auth.admin.sendRawEmail({
      email,
      subject: 'Confirm your Self AI waitlist spot',
      template: `
        <h2>Welcome to Self AI!</h2>
        <p>Hi ${name},</p>
        <p>Thanks for joining our waitlist! Please confirm your email address by clicking the link below:</p>
        <p>
          <a href="${Deno.env.get('PUBLIC_SITE_URL')}/confirm-email?token=${token}">
            Confirm Email Address
          </a>
        </p>
        <p>This link will expire in 24 hours.</p>
        <p>Best regards,<br>The Self AI Team</p>
      `
    })

    if (error) throw error

    return new Response(JSON.stringify({ success: true }), {
      headers: { 'Content-Type': 'application/json' },
      status: 200
    })
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { 'Content-Type': 'application/json' },
      status: 400
    })
  }
})