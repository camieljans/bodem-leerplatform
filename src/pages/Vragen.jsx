import { useState, useEffect, useRef } from 'react'
import { supabase } from '../supabase'
import { useAuth } from '../App'
import {
  Send, GraduationCap, User, Clock, MessageSquare, Loader2, AlertCircle
} from 'lucide-react'

// ─── helpers ──────────────────────────────────────────────────────────────────

function tijdLabel(iso) {
  if (!iso) return ''
  const d = new Date(iso)
  return d.toLocaleTimeString('nl-NL', { hour: '2-digit', minute: '2-digit' })
}

function datumLabel(iso) {
  if (!iso) return ''
  const d = new Date(iso)
  return d.toLocaleDateString('nl-NL', { day: 'numeric', month: 'long' })
}

// ─── Begeleider-chat ───────────────────────────────────────────────────────────

function BegeleiderChat({ userId, project, profile }) {
  const [vragen, setVragen] = useState([])
  const [invoer, setInvoer] = useState('')
  const [versturen, setVersturen] = useState(false)
  const [laden, setLaden] = useState(true)
  const [fout, setFout] = useState('')
  const onderRef = useRef(null)

  useEffect(() => {
    laadVragen()
    // Poll elke 15 seconden voor nieuwe antwoorden
    const interval = setInterval(laadVragen, 15000)
    return () => clearInterval(interval)
  }, [project])

  useEffect(() => {
    onderRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [vragen])

  async function laadVragen() {
    const { data } = await supabase
      .from('vragen')
      .select('*')
      .eq('leerling_id', userId)
      .eq('project', project)
      .order('aangemaakt_op', { ascending: true })
    setVragen(data || [])
    setLaden(false)
  }

  async function stuurBericht(e) {
    e.preventDefault()
    const tekst = invoer.trim()
    if (!tekst || versturen) return
    setVersturen(true)
    setFout('')
    const { error } = await supabase.from('vragen').insert({
      leerling_id: userId,
      project,
      vraag: tekst,
    })
    if (error) {
      setFout('Bericht kon niet worden verstuurd. Probeer het opnieuw.')
    } else {
      setInvoer('')
      laadVragen()
      // E-mailnotificatie naar alle begeleiders van dezelfde school
      try {
        const { data: begeleiders } = await supabase
          .from('profiles')
          .select('email, naam')
          .eq('school', profile?.school)
          .eq('rol', 'begeleider')
        for (const b of begeleiders ?? []) {
          if (b.email) {
            await fetch('/api/send-email', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                naar: b.email,
                onderwerp: `Nieuwe vraag van ${profile?.naam}`,
                tekst: `${profile?.naam} heeft een vraag gesteld:\n\n"${tekst}"\n\nBeantwoord via: ${window.location.origin}/begeleider`,
              }),
            })
          }
        }
      } catch { /* e-mail fout is niet kritiek */ }
    }
    setVersturen(false)
  }

  return (
    <div className="flex flex-col h-full">
      {/* Berichten */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {laden ? (
          <div className="text-center text-gray-400 py-10 text-sm">Laden...</div>
        ) : vragen.length === 0 ? (
          <div className="text-center text-gray-400 py-10">
            <MessageSquare className="w-10 h-10 mx-auto mb-3 text-gray-200" />
            <p className="text-sm">Nog geen berichten. Stel je begeleider een vraag!</p>
          </div>
        ) : (
          vragen.map((v, i) => {
            const vorigeDatum = i > 0 ? datumLabel(vragen[i - 1].aangemaakt_op) : null
            const huidigeDatum = datumLabel(v.aangemaakt_op)
            const toonDatum = huidigeDatum !== vorigeDatum

            return (
              <div key={v.id}>
                {/* Datumscheidingslijn */}
                {toonDatum && (
                  <div className="flex items-center gap-3 my-4">
                    <div className="flex-1 h-px bg-gray-100" />
                    <span className="text-xs text-gray-400 shrink-0">{huidigeDatum}</span>
                    <div className="flex-1 h-px bg-gray-100" />
                  </div>
                )}

                {/* Vraag van leerling — rechts */}
                <div className="flex gap-2 flex-row-reverse">
                  <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center shrink-0 self-end">
                    <User className="w-4 h-4 text-emerald-700" />
                  </div>
                  <div className="max-w-[78%] flex flex-col items-end gap-1">
                    <div className="px-4 py-2.5 rounded-2xl rounded-br-sm bg-emerald-600 text-white text-sm leading-relaxed">
                      {v.vraag}
                    </div>
                    <span className="text-xs text-gray-400 px-1">{tijdLabel(v.aangemaakt_op)}</span>
                  </div>
                </div>

                {/* Antwoord van begeleider — links */}
                {v.antwoord ? (
                  <div className="flex gap-2 flex-row mt-2">
                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center shrink-0 self-end">
                      <GraduationCap className="w-4 h-4 text-blue-700" />
                    </div>
                    <div className="max-w-[78%] flex flex-col items-start gap-1">
                      <div className="px-4 py-2.5 rounded-2xl rounded-bl-sm bg-white border border-gray-100 shadow-sm text-gray-800 text-sm leading-relaxed">
                        {v.antwoord}
                      </div>
                      <span className="text-xs text-gray-400 px-1">
                        Begeleider · {tijdLabel(v.beantwoord_op)}
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className="flex gap-2 mt-1.5 ml-10">
                    <span className="flex items-center gap-1 text-xs text-gray-400 italic">
                      <Clock className="w-3 h-3" /> Je begeleider is dit aan het lezen...
                    </span>
                  </div>
                )}
              </div>
            )
          })
        )}

        {fout && (
          <div className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-3 text-sm">
            <AlertCircle className="w-4 h-4 shrink-0" /> {fout}
          </div>
        )}

        <div ref={onderRef} />
      </div>

      {/* Invoer */}
      <form onSubmit={stuurBericht} className="p-4 border-t border-gray-100 bg-white flex gap-2">
        <input
          type="text"
          value={invoer}
          onChange={e => setInvoer(e.target.value)}
          placeholder="Schrijf een bericht aan je begeleider..."
          disabled={versturen}
          className="flex-1 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:opacity-60"
        />
        <button
          type="submit"
          disabled={!invoer.trim() || versturen}
          className="bg-blue-600 hover:bg-blue-700 disabled:opacity-40 text-white rounded-xl px-4 py-2.5 transition-colors flex items-center gap-1.5"
        >
          {versturen ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
        </button>
      </form>
    </div>
  )
}

// ─── Hoofdpagina ───────────────────────────────────────────────────────────────

export default function Vragen() {
  const { user, project, profile } = useAuth()

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="bg-white border-b border-gray-100 px-4 py-4">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-xl font-bold text-gray-800 flex items-center gap-2">
            <GraduationCap className="w-5 h-5 text-blue-600" /> Vragen aan je begeleider
          </h1>
        </div>
      </div>

      {/* Chat venster */}
      <div className="flex-1 max-w-2xl w-full mx-auto flex flex-col" style={{ height: 'calc(100vh - 100px)' }}>
        <BegeleiderChat userId={user.id} project={project} profile={profile} />
      </div>
    </div>
  )
}
