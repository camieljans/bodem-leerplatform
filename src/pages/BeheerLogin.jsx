import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../supabase'
import { useAuth } from '../App'
import { Settings, ArrowLeft, AlertCircle } from 'lucide-react'

export default function BeheerLogin() {
  const navigate = useNavigate()
  const { loadProfile } = useAuth()
  const [email, setEmail]       = useState('')
  const [wachtwoord, setWw]     = useState('')
  const [fout, setFout]         = useState('')
  const [bezig, setBezig]       = useState(false)

  async function inloggen(e) {
    e.preventDefault()
    setFout('')
    if (!email.trim() || !wachtwoord) {
      setFout('Vul e-mail en wachtwoord in.')
      return
    }
    setBezig(true)
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password: wachtwoord,
    })
    if (error) {
      setFout('Inloggen mislukt. Controleer e-mail en wachtwoord.')
      setBezig(false)
      return
    }
    // Controleer of de gebruiker een eigenaar is
    const { data: profiel } = await supabase
      .from('profiles')
      .select('rol')
      .eq('id', data.user.id)
      .maybeSingle()
    if (profiel?.rol !== 'eigenaar') {
      await supabase.auth.signOut()
      setFout('Dit account is geen beheerder. Gebruik de gewone inlogpagina.')
      setBezig(false)
      return
    }
    if (loadProfile) await loadProfile(data.user.id)
    navigate('/beheer')
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6">
      <div className="max-w-md w-full">

        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-stone-500 hover:text-stone-700 text-sm mb-6"
        >
          <ArrowLeft className="w-4 h-4" /> Terug naar startpagina
        </button>

        <div className="cinematic-panel rounded-3xl p-8">

          <div className="text-center mb-7">
            <div className="w-16 h-16 mx-auto rounded-3xl bg-emerald-900/90 text-emerald-100 flex items-center justify-center mb-5 shadow-xl shadow-emerald-900/20">
              <Settings className="w-8 h-8" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900">Soil Valley team</h1>
            <p className="text-gray-500 mt-1 text-sm">Beheer de leerplatform-projecten</p>
          </div>

          <form onSubmit={inloggen} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">E-mail</label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="naam@soilvalley.nl"
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-emerald-400 bg-white"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Wachtwoord</label>
              <input
                type="password"
                value={wachtwoord}
                onChange={e => setWw(e.target.value)}
                placeholder="••••••••"
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-emerald-400 bg-white"
              />
            </div>

            {fout && (
              <div className="flex items-start gap-2 bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-3 text-sm">
                <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" /> {fout}
              </div>
            )}

            <button
              type="submit"
              disabled={bezig}
              className="w-full bg-emerald-700 hover:bg-emerald-800 disabled:opacity-50 text-white font-semibold py-3 rounded-xl transition-colors"
            >
              {bezig ? 'Inloggen...' : 'Inloggen →'}
            </button>
          </form>

          <p className="text-xs text-gray-400 mt-5 text-center leading-relaxed">
            Heb je nog geen beheerder-account? Vraag de IT-beheerder om een account aan te maken via Supabase.
          </p>
        </div>
      </div>
    </div>
  )
}
