import { useState, useEffect } from 'react'
import { supabase } from '../supabase'
import { useAuth } from '../App'
import { useNavigate } from 'react-router-dom'

const scholen = [
  { value: 'olympus', label: 'Olympus College' },
  { value: 'liemers', label: 'Liemers College' },
  { value: 'candea', label: 'Candea College' },
  { value: 'produs', label: 'Produs College' },
]

const schoolLabels = {
  olympus: 'Olympus College',
  liemers: 'Liemers College',
  candea: 'Candea College',
  produs: 'Produs College',
}

const niveauLabels = {
  'pro': 'PRO', 'vmbo-b': 'VMBO-B', 'vmbo-k': 'VMBO-K',
  'vmbo-tl': 'VMBO-TL', 'havo': 'HAVO', 'vwo': 'VWO', 'anders': 'Anders',
}

const projectNaam = {
  wormenhotel: '🪱 Wormenhotel',
  keuringsdienst: '🪴 Keuringsdienst',
}

export default function Begeleider() {
  const { user, profile, loadProfile } = useAuth()
  const navigate = useNavigate()

  const [tab, setTab] = useState('leerlingen')
  const [leerlingen, setLeerlingen] = useState([])
  const [koppelingen, setKoppelingen] = useState({}) // leerlingId → status
  const [gekozenLeerling, setGekozenLeerling] = useState(null)
  const [logboekEntries, setLogboekEntries] = useState([])
  const [gekozenProject, setGekozenProject] = useState('alle')
  const [laden, setLaden] = useState(true)

  // Vragen
  const [vragen, setVragen] = useState([])
  const [ladenVragen, setLadenVragen] = useState(false)
  const [antwoorden, setAntwoorden] = useState({})
  const [versturenId, setVersturenId] = useState(null)

  // Feedback op logboek
  const [feedbackTekst, setFeedbackTekst] = useState({}) // entryId → tekst
  const [feedbackBezig, setFeedbackBezig] = useState(null)
  const [feedbackOpgeslagen, setFeedbackOpgeslagen] = useState(null)

  // School instellen (als dat nog niet gedaan is)
  const [schoolKeuze, setSchoolKeuze] = useState('')
  const [schoolLaden, setSchoolLaden] = useState(false)

  // Verzoek sturen
  const [verzoekenBezig, setVerzoekenBezig] = useState(new Set())

  // Voortgang per leerling
  const [leerlingStats, setLeerlingStats] = useState({}) // leerlingId → { logboekWeken, opdrachten }

  useEffect(() => {
    if (profile?.rol !== 'begeleider') {
      navigate('/dashboard')
      return
    }
    if (profile?.school) {
      laadLeerlingen()
      laadKoppelingen()
    }
  }, [profile])

  // Herlaad vragen + stats als koppelingen zijn geladen
  useEffect(() => {
    if (Object.keys(koppelingen).length > 0) {
      laadVragen()
      const goedgekeurdeIds = Object.entries(koppelingen)
        .filter(([, status]) => status === 'goedgekeurd')
        .map(([id]) => id)
      laadLeerlingStats(goedgekeurdeIds)
    }
  }, [koppelingen])

  async function slaSchoolOp() {
    if (!schoolKeuze) return
    setSchoolLaden(true)
    await supabase.from('profiles').update({ school: schoolKeuze }).eq('id', user.id)
    await loadProfile(user.id)
    setSchoolLaden(false)
  }

  async function laadLeerlingen() {
    setLaden(true)
    const { data } = await supabase
      .from('profiles')
      .select('*')
      .eq('rol', 'leerling')
      .eq('school', profile.school)
      .order('naam')
    setLeerlingen(data || [])
    setLaden(false)
  }

  async function laadKoppelingen() {
    const { data } = await supabase
      .from('begeleider_koppeling')
      .select('leerling_id, status')
      .eq('begeleider_id', user.id)
    const map = {}
    for (const row of data || []) {
      map[row.leerling_id] = row.status
    }
    setKoppelingen(map)
  }

  async function stuurVerzoek(leerlingId) {
    setVerzoekenBezig(prev => new Set([...prev, leerlingId]))
    await supabase
      .from('begeleider_koppeling')
      .insert({ begeleider_id: user.id, leerling_id: leerlingId })
    await laadKoppelingen()
    setVerzoekenBezig(prev => { const s = new Set(prev); s.delete(leerlingId); return s })
  }

  async function laadLeerlingStats(goedgekeurdeIds) {
    if (goedgekeurdeIds.length === 0) return
    const [{ data: logboekData }, { data: opdrachtData }] = await Promise.all([
      supabase.from('logboek').select('leerling_id, week').in('leerling_id', goedgekeurdeIds),
      supabase.from('opdracht_voortgang').select('leerling_id').in('leerling_id', goedgekeurdeIds),
    ])
    const stats = {}
    for (const id of goedgekeurdeIds) {
      stats[id] = {
        logboekWeken: (logboekData || []).filter(e => e.leerling_id === id).length,
        opdrachten: (opdrachtData || []).filter(e => e.leerling_id === id).length,
      }
    }
    setLeerlingStats(stats)
  }

  async function slaFeedbackOp(entryId) {
    const tekst = feedbackTekst[entryId]
    if (!tekst?.trim()) return
    setFeedbackBezig(entryId)
    await supabase
      .from('logboek')
      .update({ feedback: tekst.trim(), feedback_op: new Date().toISOString() })
      .eq('id', entryId)
    setFeedbackBezig(null)
    setFeedbackOpgeslagen(entryId)
    setTimeout(() => setFeedbackOpgeslagen(null), 3000)
    if (gekozenLeerling) laadLogboek(gekozenLeerling.id)
  }

  async function laadVragen() {
    setLadenVragen(true)
    const goedgekeurdeIds = Object.entries(koppelingen)
      .filter(([, status]) => status === 'goedgekeurd')
      .map(([id]) => id)

    if (goedgekeurdeIds.length === 0) {
      setVragen([])
      setLadenVragen(false)
      return
    }

    const { data } = await supabase
      .from('vragen')
      .select('*')
      .in('leerling_id', goedgekeurdeIds)
      .order('aangemaakt_op', { ascending: false })

    // Naam toevoegen vanuit al geladen leerlingenlijst
    const naamMap = {}
    for (const l of leerlingen) naamMap[l.id] = l.naam
    const metNaam = (data || []).map(v => ({ ...v, leerling: { naam: naamMap[v.leerling_id] || 'Onbekend' } }))
    setVragen(metNaam)
    setLadenVragen(false)
  }

  async function antwoordVersturen(vraagId) {
    const tekst = antwoorden[vraagId]
    if (!tekst?.trim()) return
    setVersturenId(vraagId)
    await supabase
      .from('vragen')
      .update({
        antwoord: tekst.trim(),
        beantwoord_door: profile.id,
        beantwoord_op: new Date().toISOString(),
      })
      .eq('id', vraagId)
    setAntwoorden(prev => ({ ...prev, [vraagId]: '' }))
    setVersturenId(null)
    laadVragen()
  }

  async function laadLogboek(leerlingId) {
    let query = supabase
      .from('logboek')
      .select('*')
      .eq('leerling_id', leerlingId)
      .order('week')
    if (gekozenProject !== 'alle') query = query.eq('project', gekozenProject)
    const { data } = await query
    setLogboekEntries(data || [])
  }

  function kiesLeerling(leerling) {
    setGekozenLeerling(leerling)
    laadLogboek(leerling.id)
  }

  const goedgekeurde = leerlingen.filter(l => koppelingen[l.id] === 'goedgekeurd')
  const onbeantwoord = vragen.filter(v => !v.antwoord).length

  // ── School instellen ────────────────────────────────────────────────────────
  if (!profile?.school) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <div className="bg-white rounded-3xl shadow-xl p-10 max-w-md w-full text-center">
          <div className="text-6xl mb-4">🏫</div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Welkom, {profile?.naam}!</h1>
          <p className="text-gray-500 mb-6">
            Kies de school waar jij begeleider bent. Je ziet dan alleen de leerlingen van jouw school.
          </p>
          <select
            value={schoolKeuze}
            onChange={e => setSchoolKeuze(e.target.value)}
            className="w-full border border-gray-200 rounded-xl px-4 py-3 mb-4 focus:outline-none focus:ring-2 focus:ring-green-400"
          >
            <option value="">Kies je school...</option>
            {scholen.map(s => (
              <option key={s.value} value={s.value}>{s.label}</option>
            ))}
          </select>
          <button
            onClick={slaSchoolOp}
            disabled={!schoolKeuze || schoolLaden}
            className="w-full bg-green-600 hover:bg-green-700 disabled:opacity-50 text-white font-semibold py-3 rounded-xl transition-colors"
          >
            {schoolLaden ? 'Opslaan...' : 'Opslaan en doorgaan →'}
          </button>
        </div>
      </div>
    )
  }

  // ── Hoofdweergave ───────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen p-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <div className="text-5xl mb-3">👩‍🏫</div>
          <h1 className="text-3xl font-bold text-gray-800 mb-1">Begeleidersoverzicht</h1>
          <p className="text-gray-500">{schoolLabels[profile.school] || profile.school}</p>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 justify-center">
          <button
            onClick={() => setTab('leerlingen')}
            className={`px-5 py-2 rounded-xl font-semibold text-sm transition-all ${tab === 'leerlingen' ? 'bg-green-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-100'}`}
          >
            👥 Leerlingen
          </button>
          <button
            onClick={() => setTab('logboeken')}
            className={`px-5 py-2 rounded-xl font-semibold text-sm transition-all flex items-center gap-2 ${tab === 'logboeken' ? 'bg-green-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-100'}`}
          >
            📓 Logboeken
            {goedgekeurde.length > 0 && (
              <span className={`text-xs px-2 py-0.5 rounded-full font-bold ${tab === 'logboeken' ? 'bg-white text-green-700' : 'bg-green-100 text-green-700'}`}>
                {goedgekeurde.length}
              </span>
            )}
          </button>
          <button
            onClick={() => { setTab('vragen'); laadVragen() }}
            className={`px-5 py-2 rounded-xl font-semibold text-sm transition-all flex items-center gap-2 ${tab === 'vragen' ? 'bg-green-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-100'}`}
          >
            💬 Vragen
            {onbeantwoord > 0 && (
              <span className={`text-xs px-2 py-0.5 rounded-full font-bold ${tab === 'vragen' ? 'bg-white text-green-700' : 'bg-red-500 text-white'}`}>
                {onbeantwoord}
              </span>
            )}
          </button>
        </div>

        {/* ── Leerlingen tab ── */}
        {tab === 'leerlingen' && (
          <div className="space-y-3">
            {laden ? (
              <div className="text-center text-gray-400 py-12">Laden...</div>
            ) : leerlingen.length === 0 ? (
              <div className="bg-white rounded-2xl shadow p-10 text-center text-gray-400">
                <div className="text-5xl mb-3">🎒</div>
                <p>Nog geen leerlingen geregistreerd op {schoolLabels[profile.school] || profile.school}.</p>
              </div>
            ) : (
              <>
                <p className="text-sm text-gray-500 text-center mb-4">
                  Stuur een koppelingsverzoek. De leerling moet dit goedkeuren voordat jij hun logboek kunt inzien.
                </p>
                {leerlingen.map(l => {
                  const status = koppelingen[l.id]
                  const bezig = verzoekenBezig.has(l.id)
                  return (
                    <div key={l.id} className="bg-white rounded-2xl shadow p-5 flex items-center justify-between gap-4">
                      <div>
                        <div className="font-semibold text-gray-800">👤 {l.naam}</div>
                        <div className="text-sm text-gray-400 mt-0.5">
                          {niveauLabels[l.niveau] || ''}
                          {l.niveau && l.project ? ' · ' : ''}
                          {l.project ? projectNaam[l.project] || l.project : ''}
                        </div>
                      </div>

                      <div className="shrink-0">
                        {!status && (
                          <button
                            onClick={() => stuurVerzoek(l.id)}
                            disabled={bezig}
                            className="bg-green-600 hover:bg-green-700 disabled:opacity-50 text-white text-sm font-semibold px-4 py-2 rounded-xl transition-colors"
                          >
                            {bezig ? 'Versturen...' : '📨 Verzoek sturen'}
                          </button>
                        )}
                        {status === 'wacht' && (
                          <span className="bg-yellow-100 text-yellow-700 text-sm font-medium px-4 py-2 rounded-xl">
                            ⏳ Wacht op goedkeuring
                          </span>
                        )}
                        {status === 'goedgekeurd' && (
                          <span className="bg-green-100 text-green-700 text-sm font-medium px-4 py-2 rounded-xl">
                            ✅ Gekoppeld
                          </span>
                        )}
                        {status === 'afgewezen' && (
                          <span className="bg-red-100 text-red-700 text-sm font-medium px-4 py-2 rounded-xl">
                            ❌ Afgewezen
                          </span>
                        )}
                      </div>
                    </div>
                  )
                })}
              </>
            )}
          </div>
        )}

        {/* ── Logboeken tab ── */}
        {tab === 'logboeken' && (
          <>
            {goedgekeurde.length === 0 ? (
              <div className="bg-white rounded-2xl shadow p-10 text-center text-gray-400">
                <div className="text-5xl mb-3">🔒</div>
                <p className="font-medium text-gray-600 mb-1">Nog geen goedgekeurde koppelingen</p>
                <p className="text-sm">Stuur eerst een koppelingsverzoek bij het tabblad Leerlingen. Als een leerling dit goedkeurt, zie jij hier het logboek.</p>
              </div>
            ) : (
              <>
                <div className="flex gap-2 mb-6 justify-center">
                  {['alle', 'wormenhotel', 'keuringsdienst'].map(p => (
                    <button
                      key={p}
                      onClick={() => { setGekozenProject(p); if (gekozenLeerling) laadLogboek(gekozenLeerling.id) }}
                      className={`px-4 py-2 rounded-xl font-medium text-sm transition-all ${gekozenProject === p ? 'bg-gray-700 text-white' : 'bg-white text-gray-600 hover:bg-gray-100'}`}
                    >
                      {p === 'alle' ? '📋 Alle' : p === 'wormenhotel' ? '🪱 Wormenhotel' : '🪴 Keuringsdienst'}
                    </button>
                  ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="md:col-span-1">
                    <div className="bg-white rounded-2xl shadow p-4">
                      <h2 className="font-bold text-gray-700 mb-3 text-sm uppercase tracking-wide">Leerlingen ({goedgekeurde.length})</h2>
                      <div className="space-y-2">
                        {goedgekeurde.map(l => (
                          <button
                            key={l.id}
                            onClick={() => kiesLeerling(l)}
                            className={`w-full text-left px-3 py-3 rounded-xl transition-all text-sm ${gekozenLeerling?.id === l.id ? 'bg-green-600 text-white' : 'hover:bg-gray-100 text-gray-700'}`}
                          >
                            <div className="font-medium">👤 {l.naam}</div>
                            <div className={`text-xs mt-0.5 ${gekozenLeerling?.id === l.id ? 'text-green-100' : 'text-gray-400'}`}>
                              {niveauLabels[l.niveau] || ''}
                              {leerlingStats[l.id] && (
                                <span className="ml-1">
                                  · 📓 {leerlingStats[l.id].logboekWeken}w · ✅ {leerlingStats[l.id].opdrachten}
                                </span>
                              )}
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="md:col-span-2">
                    {!gekozenLeerling ? (
                      <div className="bg-white rounded-2xl shadow p-8 text-center text-gray-400">
                        <div className="text-4xl mb-3">👈</div>
                        <p>Klik op een leerling om het logboek te bekijken</p>
                      </div>
                    ) : (
                      <div className="bg-white rounded-2xl shadow p-6">
                        <h2 className="text-xl font-bold text-gray-800 mb-4">📓 Logboek van {gekozenLeerling.naam}</h2>
                        {logboekEntries.length === 0 ? (
                          <p className="text-gray-400 text-sm">Deze leerling heeft nog niets geschreven.</p>
                        ) : (
                          <div className="space-y-4">
                            {logboekEntries.map(entry => (
                              <div key={entry.id} className="border border-gray-200 rounded-xl p-4">
                                <div className="flex justify-between items-center mb-2">
                                  <span className="font-semibold text-gray-700">Week {entry.week}</span>
                                  <span className="text-xs text-gray-400 bg-gray-100 px-2 py-1 rounded-full">
                                    {projectNaam[entry.project] || entry.project}
                                  </span>
                                </div>
                                <p className="text-gray-600 text-sm leading-relaxed whitespace-pre-wrap">{entry.inhoud}</p>
                                {entry.foto_url && (
                                  <img src={entry.foto_url} alt="Logboek foto" className="mt-3 rounded-lg max-h-48 object-cover border border-gray-200" />
                                )}
                                <p className="text-xs text-gray-300 mt-2">{new Date(entry.aangemaakt_op).toLocaleDateString('nl-NL')}</p>

                                {/* Feedback sectie */}
                                <div className="mt-4 border-t border-gray-100 pt-4">
                                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">👩‍🏫 Jouw feedback</p>
                                  {entry.feedback && (
                                    <div className="bg-green-50 border border-green-200 rounded-xl p-3 mb-3 text-sm text-green-800 leading-relaxed">
                                      {entry.feedback}
                                      <p className="text-xs text-green-400 mt-1">
                                        {entry.feedback_op && new Date(entry.feedback_op).toLocaleDateString('nl-NL', { day: 'numeric', month: 'long' })}
                                      </p>
                                    </div>
                                  )}
                                  <div className="flex gap-2">
                                    <textarea
                                      value={feedbackTekst[entry.id] ?? (entry.feedback || '')}
                                      onChange={e => setFeedbackTekst(prev => ({ ...prev, [entry.id]: e.target.value }))}
                                      placeholder="Schrijf hier je feedback..."
                                      rows={2}
                                      className="flex-1 border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-400 resize-none"
                                    />
                                    <button
                                      onClick={() => slaFeedbackOp(entry.id)}
                                      disabled={feedbackBezig === entry.id}
                                      className="bg-green-600 hover:bg-green-700 disabled:opacity-50 text-white px-3 py-2 rounded-xl text-sm font-semibold transition-colors self-end"
                                    >
                                      {feedbackBezig === entry.id ? '...' : feedbackOpgeslagen === entry.id ? '✅' : 'Opslaan'}
                                    </button>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </>
            )}
          </>
        )}

        {/* ── Vragen tab ── */}
        {tab === 'vragen' && (
          <div className="space-y-4">
            {goedgekeurde.length === 0 ? (
              <div className="bg-white rounded-2xl shadow p-10 text-center text-gray-400">
                <div className="text-5xl mb-3">🔒</div>
                <p className="font-medium text-gray-600 mb-1">Nog geen goedgekeurde koppelingen</p>
                <p className="text-sm">Zodra een leerling jouw verzoek goedkeurt, zie je hier hun vragen.</p>
              </div>
            ) : ladenVragen ? (
              <div className="text-center text-gray-400 py-12">Laden...</div>
            ) : vragen.length === 0 ? (
              <div className="bg-white rounded-2xl shadow p-10 text-center text-gray-400">
                <div className="text-5xl mb-3">💬</div>
                <p>Er zijn nog geen vragen gesteld door jouw leerlingen.</p>
              </div>
            ) : (
              vragen.map(v => (
                <div key={v.id} className="bg-white rounded-2xl shadow p-5">
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex items-start gap-3">
                      <span className="text-2xl">🙋</span>
                      <div>
                        <p className="font-semibold text-gray-500 text-sm">
                          {v.leerling?.naam} · {projectNaam[v.project] || v.project}
                        </p>
                        <p className="text-gray-800 mt-1">{v.vraag}</p>
                        <p className="text-xs text-gray-400 mt-1">
                          {new Date(v.aangemaakt_op).toLocaleDateString('nl-NL', { day: 'numeric', month: 'long' })}
                        </p>
                      </div>
                    </div>
                    <span className={`shrink-0 text-xs px-3 py-1 rounded-full font-medium ${v.antwoord ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                      {v.antwoord ? '✅ Beantwoord' : '⏳ Wacht op antwoord'}
                    </span>
                  </div>

                  {v.antwoord ? (
                    <div className="bg-green-50 border border-green-200 rounded-xl p-4 flex gap-3">
                      <span className="text-xl">👩‍🏫</span>
                      <p className="text-green-800 text-sm leading-relaxed">{v.antwoord}</p>
                    </div>
                  ) : (
                    <div className="mt-3 flex gap-2">
                      <textarea
                        value={antwoorden[v.id] || ''}
                        onChange={e => setAntwoorden(prev => ({ ...prev, [v.id]: e.target.value }))}
                        placeholder="Typ hier je antwoord..."
                        rows={2}
                        className="flex-1 border border-gray-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-400 resize-none"
                      />
                      <button
                        onClick={() => antwoordVersturen(v.id)}
                        disabled={versturenId === v.id || !antwoorden[v.id]?.trim()}
                        className="bg-green-600 hover:bg-green-700 disabled:opacity-50 text-white px-4 py-2 rounded-xl text-sm font-semibold transition-colors"
                      >
                        {versturenId === v.id ? '...' : 'Stuur'}
                      </button>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  )
}
