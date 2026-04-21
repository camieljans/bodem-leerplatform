import { useState, useEffect } from 'react'
import { supabase } from '../supabase'
import { useAuth } from '../App'
import { MessageSquare, PenLine, Send, ClipboardList, User, CheckCircle, Clock, Trash2, GraduationCap, AlertCircle } from 'lucide-react'

export default function Vragen() {
  const { user, project } = useAuth()
  const [vragen, setVragen] = useState([])
  const [nieuweVraag, setNieuweVraag] = useState('')
  const [laden, setLaden] = useState(false)
  const [versturen, setVersturen] = useState(false)
  const [verwijderenId, setVerwijderenId] = useState(null)
  const [fout, setFout] = useState('')

  useEffect(() => {
    laadVragen()
  }, [project])

  async function laadVragen() {
    setLaden(true)
    const { data } = await supabase
      .from('vragen')
      .select('*')
      .eq('leerling_id', user.id)
      .eq('project', project)
      .order('aangemaakt_op', { ascending: false })
    setVragen(data || [])
    setLaden(false)
    // Markeer alle beantwoorde vragen als gezien
    const beantwoord = (data || []).filter(v => v.antwoord).map(v => v.id)
    const gezien = JSON.parse(localStorage.getItem('gezieneAntwoorden') || '[]')
    const nieuw = [...new Set([...gezien, ...beantwoord])]
    localStorage.setItem('gezieneAntwoorden', JSON.stringify(nieuw))
  }

  function isNieuw(vraag) {
    if (!vraag.antwoord || !vraag.beantwoord_op) return false
    const gezien = JSON.parse(localStorage.getItem('gezieneAntwoordenGezien') || '[]')
    return !gezien.includes(vraag.id)
  }

  async function vraagVersturen(e) {
    e.preventDefault()
    if (!nieuweVraag.trim()) return
    setVersturen(true)
    setFout('')
    const { error } = await supabase.from('vragen').insert({
      leerling_id: user.id,
      project,
      vraag: nieuweVraag.trim(),
    })
    if (error) {
      setFout('Vraag kon niet worden verstuurd. Probeer het opnieuw.')
    } else {
      setNieuweVraag('')
      laadVragen()
    }
    setVersturen(false)
  }

  async function vraagVerwijderen(id) {
    setVerwijderenId(id)
    await supabase.from('vragen').delete().eq('id', id)
    setVerwijderenId(null)
    laadVragen()
  }

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <div className="w-14 h-14 rounded-2xl bg-emerald-100 flex items-center justify-center mx-auto mb-4">
            <MessageSquare className="w-7 h-7 text-emerald-700" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-1">Vragen aan de begeleider</h1>
          <p className="text-gray-500">Stel een vraag en je begeleider beantwoordt hem zo snel mogelijk</p>
        </div>

        {/* Nieuwe vraag */}
        <div className="bg-white rounded-2xl shadow p-6 mb-6">
          <h2 className="flex items-center gap-2 font-bold text-gray-700 mb-4"><PenLine className="w-4 h-4 text-gray-400" /> Nieuwe vraag stellen</h2>
          <form onSubmit={vraagVersturen} className="space-y-4">
            <textarea
              value={nieuweVraag}
              onChange={e => setNieuweVraag(e.target.value)}
              placeholder="Wat wil je vragen aan je begeleider? Wees zo duidelijk mogelijk!"
              rows={4}
              className="w-full border border-gray-200 rounded-xl p-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-400 resize-none"
            />
            {fout && (
              <div className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-3 text-sm">
                <AlertCircle className="w-4 h-4 shrink-0" /> {fout}
              </div>
            )}
            <button
              type="submit"
              disabled={versturen || !nieuweVraag.trim()}
              className="w-full flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 disabled:opacity-50 text-white font-semibold py-3 rounded-xl transition-colors"
            >
              {versturen ? 'Versturen...' : <><Send className="w-4 h-4" /> Vraag versturen</>}
            </button>
          </form>
        </div>

        {/* Vragenlijst */}
        <div>
          <h2 className="flex items-center gap-2 font-bold text-gray-700 mb-4"><ClipboardList className="w-4 h-4 text-gray-400" /> Jouw vragen</h2>
          {laden ? (
            <div className="text-center text-gray-400 py-8">Laden...</div>
          ) : vragen.length === 0 ? (
            <div className="bg-white rounded-2xl shadow p-8 text-center text-gray-400">
              <MessageSquare className="w-12 h-12 mx-auto mb-3 text-gray-200" />
              <p>Je hebt nog geen vragen gesteld.</p>
              <p className="text-sm mt-1">Gebruik het formulier hierboven om een vraag te stellen!</p>
            </div>
          ) : (
            <div className="space-y-4">
              {vragen.map(v => (
                <div key={v.id} className="bg-white rounded-2xl shadow p-5">
                  <div className="flex items-start gap-3 mb-3">
                    <div className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center shrink-0 mt-0.5">
                      <User className="w-4 h-4 text-gray-500" />
                    </div>
                    <div className="flex-1">
                      <p className="text-gray-800 font-medium">{v.vraag}</p>
                      <p className="text-xs text-gray-400 mt-1">
                        {new Date(v.aangemaakt_op).toLocaleDateString('nl-NL', {
                          day: 'numeric', month: 'long', year: 'numeric'
                        })}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <div className="flex items-center gap-2">
                        {v.antwoord && v.beantwoord_op && new Date(v.beantwoord_op) > new Date(Date.now() - 48*60*60*1000) && (
                          <span className="text-xs bg-blue-500 text-white px-2 py-0.5 rounded-full font-bold animate-pulse">Nieuw!</span>
                        )}
                        <span className={`flex items-center gap-1 text-xs px-3 py-1 rounded-full font-medium ${v.antwoord ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                          {v.antwoord ? <><CheckCircle className="w-3 h-3" /> Beantwoord</> : <><Clock className="w-3 h-3" /> In behandeling</>}
                        </span>
                      </div>
                      <button
                        onClick={() => vraagVerwijderen(v.id)}
                        disabled={verwijderenId === v.id}
                        title="Vraag intrekken"
                        className="text-gray-300 hover:text-red-400 transition-colors disabled:opacity-50"
                      >
                        {verwijderenId === v.id ? '...' : <Trash2 className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  {v.antwoord && (
                    <div className="bg-green-50 border border-green-200 rounded-xl p-4 mt-3 flex gap-3">
                      <div className="w-8 h-8 rounded-full bg-green-200 flex items-center justify-center shrink-0">
                        <GraduationCap className="w-4 h-4 text-green-700" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-green-800 mb-1">Antwoord van je begeleider:</p>
                        <p className="text-green-700 text-sm leading-relaxed">{v.antwoord}</p>
                        {v.beantwoord_op && (
                          <p className="text-xs text-green-400 mt-2">
                            {new Date(v.beantwoord_op).toLocaleDateString('nl-NL', { day: 'numeric', month: 'long' })}
                          </p>
                        )}
                      </div>
                    </div>
                  )}

                  {!v.antwoord && (
                    <p className="text-xs text-gray-400 italic mt-1 ml-9">
                      Je kunt deze vraag intrekken zolang er nog geen antwoord is.
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
