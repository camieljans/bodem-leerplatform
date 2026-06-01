import { Resend } from 'resend'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ fout: 'Methode niet toegestaan' })
  }

  const { naar, onderwerp, tekst } = req.body

  if (!naar || !onderwerp || !tekst) {
    return res.status(400).json({ fout: 'Ontbrekende velden' })
  }

  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    return res.status(500).json({ fout: 'E-mail niet geconfigureerd' })
  }

  try {
    const resend = new Resend(apiKey)
    await resend.emails.send({
      from: 'Soil Valley Leerplatform <onboarding@resend.dev>',
      to: naar,
      subject: onderwerp,
      text: tekst,
    })
    return res.status(200).json({ ok: true })
  } catch (err) {
    console.error('Resend fout:', err)
    return res.status(500).json({ fout: 'E-mail verzenden mislukt' })
  }
}
