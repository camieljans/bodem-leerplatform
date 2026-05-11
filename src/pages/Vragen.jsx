import { useState, useEffect, useRef } from 'react'
import { supabase } from '../supabase'
import { useAuth } from '../App'
import {
  Send, Bot, GraduationCap, User, Clock, Sparkles, MessageSquare, Loader2, AlertCircle
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

// ─── AI-chat ──────────────────────────────────────────────────────────────────

const AI_WELKOM = {
  rol: 'assistant',
  inhoud: 'Hé, ik ben jouw biologieassistent! 🌱 Ik ben specialist in bodem, wormen, planten, insecten en voedselbossen. Stel me gerust een vraag over jouw project of over de natuur!',
  tijd: new Date().toISOString(),
}

function AiChat({ userId, project }) {
  const STORAGE_KEY = `ai_chat_${userId}_${project}`

  const [berichten, setBerichten] = useState(() => {
    try {
      const opgeslagen = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
      return opgeslagen.length ? opgeslagen : [AI_WELKOM]
    } catch {
      return [AI_WELKOM]
    }
  })
  const [invoer, setInvoer] = useState('')
  const [laden, setLaden] = useState(false)
  const [fout, setFout] = useState('')
  const onderRef = useRef(null)
  const inputRef = useRef(null)

  useEffect(() => {
    onderRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [berichten, laden])

  useEffect(() => {
    if (berichten.length > 1) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(berichten.slice(-40)))
    }
  }, [berichten])

  async function stuurBericht(e) {
    e.preventDefault()
    const tekst = invoer.trim()
    if (!tekst || laden) return

    const nieuwBericht = { rol: 'user', inhoud: tekst, tijd: new Date().toISOString() }
    const bijgewerkt = [...berichten, nieuwBericht]
    setBerichten(bijgewerkt)
    setInvoer('')
    setLaden(true)
    setFout('')

    // Bouw context op voor de API (max 20 laatste berichten, zonder welkomstbericht)
    const context = bijgewerkt
      .filter(b => b !== AI_WELKOM)
      .slice(-20)
      .map(b => ({ rol: b.rol, inhoud: b.inhoud }))

    try {
      const resp = await fetch('/api/ai-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ berichten: context, project }),
      })

      let json
      try {
        json = await resp.json()
      } catch {
        throw new Error(`HTTP ${resp.status}: geen geldige JSON (is de API-route actief?)`)
      }

      if (json.antwoord) {
        setBerichten(prev => [
          ...prev,
          { rol: 'assistant', inhoud: json.antwoord, tijd: new Date().toISOString() },
        ])
      } else {
        setFout(json.fout || 'Onbekende fout van de AI.')
      }
    } catch (err) {
      setFout(err.message?.includes('JSON')
        ? 'De AI-route is niet bereikbaar. Neem contact op met de beheerder.'
        : 'Geen verbinding. Controleer je internet en probeer opnieuw.')
    } finally {
      setLaden(false)
      inputRef.current?.focus()
    }
  }

  function nieuwGesprek() {
    setBerichten([{ ...AI_WELKOM, tijd: new Date().toISOString() }])
    localStorage.removeItem(STORAGE_KEY)
  }

  return (
    <div className="flex flex-col h-full">
      {/* Berichten */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {berichten.map((b, i) => (
          <div key={i} className={`flex gap-2 ${b.rol === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
            {/* Avatar */}
            <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 self-end ${
              b.rol === 'user' ? 'bg-emerald-100' : 'bg-violet-100'
            }`}>
              {b.rol === 'user'
                ? <User className="w-4 h-4 text-emerald-700" />
                : <Bot className="w-4 h-4 text-violet-600" />}
            </div>

            {/* Bubble */}
            <div className={`max-w-[78%] ${b.rol === 'user' ? 'items-end' : 'items-start'} flex flex-col gap-1`}>
              <div className={`px-4 py-2.5 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap ${
                b.rol === 'user'
                  ? 'bg-emerald-600 text-white rounded-br-sm'
                  : 'bg-white border border-gray-100 text-gray-800 rounded-bl-sm shadow-sm'
              }`}>
                {b.inhoud}
              </div>
              <span className="text-xs text-gray-400 px-1">{tijdLabel(b.tijd)}</span>
            </div>
          </div>
        ))}

        {/* Laad-indicator */}
        {laden && (
          <div className="flex gap-2 flex-row">
            <div className="w-8 h-8 rounded-full bg-violet-100 flex items-center justify-center shrink-0 self-end">
              <Bot className="w-4 h-4 text-violet-600" />
            </div>
            <div className="bg-white border border-gray-100 rounded-2xl rounded-bl-sm px-4 py-3 shadow-sm">
              <div className="flex gap-1 items-center h-4">
                <span className="w-2 h-2 bg-violet-300 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <span className="w-2 h-2 bg-violet-300 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <span className="w-2 h-2 bg-violet-300 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          </div>
        )}

        {fout && (
          <div className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-3 text-sm">
            <AlertCircle className="w-4 h-4 shrink-0" /> {fout}
          </div>
        )}

        <div ref={onderRef} />
      </div>

      {/* Gesprek wissen */}
      {berichten.length > 2 && (
        <div className="px-4 pb-1 text-right">
          <button onClick={nieuwGesprek} className="text-xs text-gray-400 hover:text-gray-600 transition-colors">
            Nieuw gesprek starten
          </button>
        </div>
      )}

      {/* Invoer */}
      <form onSubmit={stuurBericht} className="p-4 border-t border-gray-100 bg-white flex gap-2">
        <input
          ref={inputRef}
          type="text"
          value={invoer}
          onChange={e => setInvoer(e.target.value)}
          placeholder="Stel een vraag aan de biologieassistent..."
          disabled={laden}
          className="flex-1 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-violet-400 disabled:opacity-60"
        />
        <button
          type="submit"
          disabled={!invoer.trim() || laden}
          className="bg-violet-600 hover:bg-violet-700 disabled:opacity-40 text-white rounded-xl px-4 py-2.5 transition-colors flex items-center gap-1.5"
        >
          {laden ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
        </button>
      </form>
    </div>
  )
}

// ─── Begeleider-chat ───────────────────────────────────────────────────────────

function BegeleiderChat({ userId, project }) {
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
  const { user, project } = useAuth()
  const [actieveTab, setActieveTab] = useState('ai')

  const tabs = [
    { id: 'ai',         label: 'AI Assistent',  icon: Sparkles,     kleur: 'violet' },
    { id: 'begeleider', label: 'Begeleider',     icon: GraduationCap, kleur: 'blue'  },
  ]

  const kleurMap = {
    violet: { actief: 'bg-violet-600 text-white', inactief: 'text-gray-500 hover:text-violet-600 hover:bg-violet-50' },
    blue:   { actief: 'bg-blue-600 text-white',   inactief: 'text-gray-500 hover:text-blue-600 hover:bg-blue-50'   },
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="bg-white border-b border-gray-100 px-4 py-4">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-xl font-bold text-gray-800 mb-3">Chat</h1>

          {/* Tabs */}
          <div className="flex gap-2">
            {tabs.map(tab => {
              const Icon = tab.icon
              const actief = actieveTab === tab.id
              return (
                <button
                  key={tab.id}
                  onClick={() => setActieveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                    actief ? kleurMap[tab.kleur].actief : kleurMap[tab.kleur].inactief
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {tab.label}
                  {actief && tab.id === 'ai' && (
                    <span className="text-xs bg-white/20 px-1.5 py-0.5 rounded-full">Beta</span>
                  )}
                </button>
              )
            })}
          </div>
        </div>
      </div>

      {/* Chat venster */}
      <div className="flex-1 max-w-2xl w-full mx-auto flex flex-col" style={{ height: 'calc(100vh - 130px)' }}>
        {actieveTab === 'ai' ? (
          <AiChat userId={user.id} project={project} />
        ) : (
          <BegeleiderChat userId={user.id} project={project} />
        )}
      </div>
    </div>
  )
}
