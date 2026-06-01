import { useState, useEffect } from 'react'
import { supabase } from '../supabase'
import { useAuth } from '../App'
import { useNavigate } from 'react-router-dom'
import { GraduationCap, Users, BookOpen, MessageSquare, User, Send, Lock, Clock, CheckCircle, XCircle, School, LayoutGrid, Worm, Sprout, BarChart2, Map, ArrowRight, TrendingUp, AlertCircle, Microscope, Trophy, ExternalLink } from 'lucide-react'

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
  wormenhotel:    'Wormenhotel',
  keuringsdienst: 'Keuringsdienst',
}

export default function Begeleider() {
  const { user, profile, loadProfile } = useAuth()
  const navigate = useNavigate()

  const [tab, setTab] = useState('leerlingen')
  const [klasStats, setKlasStats] = useState(null)
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

  // Observaties
  const [observatieLeerling, setObservatieLeerling] = useState(null)
  const [observatieData, setObservatieData] = useState([])

  // Eindproducten
  const [eindproducten, setEindproducten] = useState([])

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
      laadKlasStats(goedgekeurdeIds)
    }
  }, [koppelingen])

  async function laadKlasStats(goedgekeurdeIds) {
    if (goedgekeurdeIds.length === 0) { setKlasStats(null); return }
    const [{ data: logboekData }, { data: opdrachtData }, { data: vragenData }, { data: observatieData }] = await Promise.all([
      supabase.from('logboek').select('leerling_id, aangemaakt_op').in('leerling_id', goedgekeurdeIds),
      supabase.from('opdracht_voortgang').select('leerling_id, week').in('leerling_id', goedgekeurdeIds),
      supabase.from('vragen').select('leerling_id, antwoord').in('leerling_id', goedgekeurdeIds),
      supabase.from('observaties').select('leerling_id, week').in('leerling_id', goedgekeurdeIds),
    ])
    const zeveDagenGeleden = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()
    const recentActief = new Set((logboekData || []).filter(e => e.aangemaakt_op > zeveDagenGeleden).map(e => e.leerling_id))
    setKlasStats({
      totaalGekoppeld: goedgekeurdeIds.length,
      totaalLogboekEntries: (logboekData || []).length,
      totaalTakenGedaan: (opdrachtData || []).length,
      totaalVragen: (vragenData || []).length,
      onbeantwoordeVragen: (vragenData || []).filter(v => !v.antwoord).length,
      totaalObservaties: (observatieData || []).length,
      actiefDezeWeek: recentActief.size,
      perLeerling: goedgekeurdeIds.map(id => ({
        id,
        logboek: (logboekData || []).filter(e => e.leerling_id === id).length,
        taken: (opdrachtData || []).filter(e => e.leerling_id === id).length,
        observaties: (observatieData || []).filter(e => e.leerling_id === id).length,
        actiefDezeWeek: recentActief.has(id),
      })),
    })
  }

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

  async function laadObservaties(leerlingId) {
    const { data } = await supabase
      .from('observaties')
      .select('*')
      .eq('leerling_id', leerlingId)
      .order('week')
    setObservatieData(data || [])
  }

  async function laadEindproducten() {
    const goedgekeurdeIds = Object.entries(koppelingen)
      .filter(([, status]) => status === 'goedgekeurd')
      .map(([id]) => id)
    if (goedgekeurdeIds.length === 0) { setEindproducten([]); return }
    const { data } = await supabase
      .from('eindproducten')
      .select('*')
      .in('leerling_id', goedgekeurdeIds)
      .order('bijgewerkt_op', { ascending: false })
    const naamMap = {}
    for (const l of leerlingen) naamMap[l.id] = l.naam
    setEindproducten((data || []).map(e => ({ ...e, leerling_naam: naamMap[e.leerling_id] || 'Onbekend' })))
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
          <div className="w-16 h-16 rounded-2xl bg-emerald-100 flex items-center justify-center mx-auto mb-4">
            <School className="w-8 h-8 text-emerald-700" />
          </div>
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
          <div className="w-14 h-14 rounded-2xl bg-emerald-100 flex items-center justify-center mx-auto mb-4">
            <GraduationCap className="w-7 h-7 text-emerald-700" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-1">Begeleidersoverzicht</h1>
          <p className="text-gray-500">{schoolLabels[profile.school] || profile.school}</p>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 justify-center">
          <button
            onClick={() => setTab('leerlingen')}
            className={`flex items-center gap-1.5 px-5 py-2 rounded-xl font-semibold text-sm transition-all ${tab === 'leerlingen' ? 'bg-green-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-100'}`}
          >
            <Users className="w-4 h-4" /> Leerlingen
          </button>
          <button
            onClick={() => setTab('logboeken')}
            className={`flex items-center gap-1.5 px-5 py-2 rounded-xl font-semibold text-sm transition-all ${tab === 'logboeken' ? 'bg-green-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-100'}`}
          >
            <BookOpen className="w-4 h-4" /> Logboeken
            {goedgekeurde.length > 0 && (
              <span className={`text-xs px-2 py-0.5 rounded-full font-bold ${tab === 'logboeken' ? 'bg-white text-green-700' : 'bg-green-100 text-green-700'}`}>
                {goedgekeurde.length}
              </span>
            )}
          </button>
          <button
            onClick={() => { setTab('vragen'); laadVragen() }}
            className={`flex items-center gap-1.5 px-5 py-2 rounded-xl font-semibold text-sm transition-all ${tab === 'vragen' ? 'bg-green-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-100'}`}
          >
            <MessageSquare className="w-4 h-4" /> Vragen
            {onbeantwoord > 0 && (
              <span className={`text-xs px-2 py-0.5 rounded-full font-bold ${tab === 'vragen' ? 'bg-white text-green-700' : 'bg-red-500 text-white'}`}>
                {onbeantwoord}
              </span>
            )}
          </button>
          <button
            onClick={() => { setTab('observaties'); setObservatieLeerling(null); setObservatieData([]) }}
            className={`flex items-center gap-1.5 px-5 py-2 rounded-xl font-semibold text-sm transition-all ${tab === 'observaties' ? 'bg-green-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-100'}`}
          >
            <Microscope className="w-4 h-4" /> Observaties
          </button>
          <button
            onClick={() => { setTab('eindproduct'); laadEindproducten() }}
            className={`flex items-center gap-1.5 px-5 py-2 rounded-xl font-semibold text-sm transition-all ${tab === 'eindproduct' ? 'bg-green-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-100'}`}
          >
            <Trophy className="w-4 h-4" /> Eindproduct
          </button>
          <button
            onClick={() => setTab('klasoverzicht')}
            className={`flex items-center gap-1.5 px-5 py-2 rounded-xl font-semibold text-sm transition-all ${tab === 'klasoverzicht' ? 'bg-green-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-100'}`}
          >
            <BarChart2 className="w-4 h-4" /> Klasoverzicht
          </button>
          <button
            onClick={() => setTab('handleiding')}
            className={`flex items-center gap-1.5 px-5 py-2 rounded-xl font-semibold text-sm transition-all ${tab === 'handleiding' ? 'bg-green-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-100'}`}
          >
            <Map className="w-4 h-4" /> Handleiding
          </button>
        </div>

        {/* ── Leerlingen tab ── */}
        {tab === 'leerlingen' && (
          <div className="space-y-3">
            {laden ? (
              <div className="text-center text-gray-400 py-12">Laden...</div>
            ) : leerlingen.length === 0 ? (
              <div className="bg-white rounded-2xl shadow p-10 text-center text-gray-400">
                <Users className="w-12 h-12 mx-auto mb-3 text-gray-200" />
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
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center shrink-0">
                          <User className="w-4 h-4 text-gray-500" />
                        </div>
                        <div>
                        <div className="font-semibold text-gray-800">{l.naam}</div>
                        <div className="text-sm text-gray-400 mt-0.5">
                          {niveauLabels[l.niveau] || ''}
                          {l.niveau && l.project ? ' · ' : ''}
                          {l.project ? projectNaam[l.project] || l.project : ''}
                        </div>
                        </div>
                      </div>

                      <div className="shrink-0">
                        {!status && (
                          <button
                            onClick={() => stuurVerzoek(l.id)}
                            disabled={bezig}
                            className="flex items-center gap-1.5 bg-green-600 hover:bg-green-700 disabled:opacity-50 text-white text-sm font-semibold px-4 py-2 rounded-xl transition-colors"
                          >
                            {bezig ? 'Versturen...' : <><Send className="w-3.5 h-3.5" /> Verzoek sturen</>}
                          </button>
                        )}
                        {status === 'wacht' && (
                          <span className="flex items-center gap-1.5 bg-yellow-100 text-yellow-700 text-sm font-medium px-4 py-2 rounded-xl">
                            <Clock className="w-3.5 h-3.5" /> Wacht op goedkeuring
                          </span>
                        )}
                        {status === 'goedgekeurd' && (
                          <span className="flex items-center gap-1.5 bg-green-100 text-green-700 text-sm font-medium px-4 py-2 rounded-xl">
                            <CheckCircle className="w-3.5 h-3.5" /> Gekoppeld
                          </span>
                        )}
                        {status === 'afgewezen' && (
                          <span className="flex items-center gap-1.5 bg-red-100 text-red-700 text-sm font-medium px-4 py-2 rounded-xl">
                            <XCircle className="w-3.5 h-3.5" /> Afgewezen
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
                <Lock className="w-12 h-12 mx-auto mb-3 text-gray-200" />
                <p className="font-medium text-gray-600 mb-1">Nog geen goedgekeurde koppelingen</p>
                <p className="text-sm">Stuur eerst een koppelingsverzoek bij het tabblad Leerlingen. Als een leerling dit goedkeurt, zie jij hier het logboek.</p>
              </div>
            ) : (
              <>
                <div className="flex gap-2 mb-6 justify-center">
                  {[
                    { key: 'alle',           label: 'Alle',          icon: <LayoutGrid className="w-3.5 h-3.5" /> },
                    { key: 'wormenhotel',    label: 'Wormenhotel',   icon: <Worm className="w-3.5 h-3.5" /> },
                    { key: 'keuringsdienst', label: 'Keuringsdienst',icon: <Sprout className="w-3.5 h-3.5" /> },
                  ].map(p => (
                    <button
                      key={p.key}
                      onClick={() => { setGekozenProject(p.key); if (gekozenLeerling) laadLogboek(gekozenLeerling.id) }}
                      className={`flex items-center gap-1.5 px-4 py-2 rounded-xl font-medium text-sm transition-all ${gekozenProject === p.key ? 'bg-gray-700 text-white' : 'bg-white text-gray-600 hover:bg-gray-100'}`}
                    >
                      {p.icon} {p.label}
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
                            className={`w-full text-left px-3 py-3 rounded-xl transition-all text-sm flex items-center gap-2 ${gekozenLeerling?.id === l.id ? 'bg-green-600 text-white' : 'hover:bg-gray-100 text-gray-700'}`}
                          >
                            <User className={`w-4 h-4 shrink-0 ${gekozenLeerling?.id === l.id ? 'text-green-100' : 'text-gray-400'}`} />
                            <div className="flex-1 min-w-0">
                            <div className="font-medium">{l.naam}</div>
                            <div className={`text-xs mt-0.5 ${gekozenLeerling?.id === l.id ? 'text-green-100' : 'text-gray-400'}`}>
                              {niveauLabels[l.niveau] || ''}
                              {leerlingStats[l.id] && (
                                <span className="ml-1">
                                  · {leerlingStats[l.id].logboekWeken}w · {leerlingStats[l.id].opdrachten} taken
                                </span>
                              )}
                            </div>
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="md:col-span-2">
                    {!gekozenLeerling ? (
                      <div className="bg-white rounded-2xl shadow p-8 text-center text-gray-400">
                        <ArrowRight className="w-10 h-10 mx-auto mb-3 text-gray-200 rotate-180" />
                        <p>Klik op een leerling om het logboek te bekijken</p>
                      </div>
                    ) : (
                      <div className="bg-white rounded-2xl shadow p-6">
                        <h2 className="flex items-center gap-2 text-xl font-bold text-gray-800 mb-4"><BookOpen className="w-5 h-5 text-gray-400" /> Logboek van {gekozenLeerling.naam}</h2>
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
                                  <p className="flex items-center gap-1.5 text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2"><GraduationCap className="w-3.5 h-3.5" /> Jouw feedback</p>
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
                                      {feedbackBezig === entry.id ? '...' : feedbackOpgeslagen === entry.id ? <CheckCircle className="w-4 h-4" /> : 'Opslaan'}
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
                <Lock className="w-12 h-12 mx-auto mb-3 text-gray-200" />
                <p className="font-medium text-gray-600 mb-1">Nog geen goedgekeurde koppelingen</p>
                <p className="text-sm">Zodra een leerling jouw verzoek goedkeurt, zie je hier hun vragen.</p>
              </div>
            ) : ladenVragen ? (
              <div className="text-center text-gray-400 py-12">Laden...</div>
            ) : vragen.length === 0 ? (
              <div className="bg-white rounded-2xl shadow p-10 text-center text-gray-400">
                <MessageSquare className="w-12 h-12 mx-auto mb-3 text-gray-200" />
                <p>Er zijn nog geen vragen gesteld door jouw leerlingen.</p>
              </div>
            ) : (
              vragen.map(v => (
                <div key={v.id} className="bg-white rounded-2xl shadow p-5">
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex items-start gap-3">
                      <div className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center shrink-0">
                        <User className="w-4 h-4 text-gray-500" />
                      </div>
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
                    <span className={`flex items-center gap-1 shrink-0 text-xs px-3 py-1 rounded-full font-medium ${v.antwoord ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                      {v.antwoord ? <><CheckCircle className="w-3 h-3" /> Beantwoord</> : <><Clock className="w-3 h-3" /> Wacht op antwoord</>}
                    </span>
                  </div>

                  {v.antwoord ? (
                    <div className="bg-green-50 border border-green-200 rounded-xl p-4 flex gap-3">
                      <div className="w-7 h-7 rounded-full bg-green-200 flex items-center justify-center shrink-0">
                        <GraduationCap className="w-3.5 h-3.5 text-green-700" />
                      </div>
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

        {/* ── Klasoverzicht tab ── */}
        {tab === 'klasoverzicht' && (
          <div className="space-y-5">
            {!klasStats ? (
              <div className="bg-white rounded-2xl shadow p-10 text-center text-gray-400">
                <BarChart2 className="w-12 h-12 mx-auto mb-3 text-gray-200" />
                <p className="font-medium text-gray-600 mb-1">Nog geen goedgekeurde koppelingen</p>
                <p className="text-sm">Koppel eerst leerlingen om het klasoverzicht te zien.</p>
              </div>
            ) : (
              <>
                {/* Statistieken */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {[
                    { label: 'Gekoppelde leerlingen', waarde: klasStats.totaalGekoppeld, kleur: 'text-emerald-700', bg: 'bg-emerald-50' },
                    { label: 'Actief deze week', waarde: klasStats.actiefDezeWeek, kleur: 'text-blue-700', bg: 'bg-blue-50' },
                    { label: 'Logboekentries totaal', waarde: klasStats.totaalLogboekEntries, kleur: 'text-purple-700', bg: 'bg-purple-50' },
                    { label: 'Onbeantwoorde vragen', waarde: klasStats.onbeantwoordeVragen, kleur: klasStats.onbeantwoordeVragen > 0 ? 'text-red-700' : 'text-gray-500', bg: klasStats.onbeantwoordeVragen > 0 ? 'bg-red-50' : 'bg-gray-50' },
                  ].map(stat => (
                    <div key={stat.label} className={`${stat.bg} rounded-2xl p-4 text-center`}>
                      <p className={`text-3xl font-bold ${stat.kleur}`}>{stat.waarde}</p>
                      <p className="text-xs text-gray-500 mt-1">{stat.label}</p>
                    </div>
                  ))}
                </div>

                {/* Voortgang per leerling */}
                <div className="bg-white rounded-2xl shadow p-5">
                  <h2 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-emerald-600" /> Voortgang per leerling
                  </h2>
                  <div className="space-y-3">
                    {klasStats.perLeerling.map(stat => {
                      const leerling = goedgekeurde.find(l => l.id === stat.id)
                      if (!leerling) return null
                      const maxTaken = Math.max(...klasStats.perLeerling.map(s => s.taken), 1)
                      return (
                        <div key={stat.id} className="flex items-center gap-3">
                          <div className="w-28 shrink-0">
                            <p className="text-sm font-medium text-gray-800 truncate">{leerling.naam}</p>
                            <div className="flex items-center gap-1 mt-0.5">
                              {stat.actiefDezeWeek
                                ? <span className="text-xs text-green-600 font-medium flex items-center gap-0.5"><CheckCircle className="w-3 h-3" /> actief</span>
                                : <span className="text-xs text-gray-400 flex items-center gap-0.5"><Clock className="w-3 h-3" /> inactief</span>
                              }
                            </div>
                          </div>
                          <div className="flex-1 space-y-1">
                            <div className="flex items-center gap-2">
                              <span className="text-xs text-gray-400 w-20 shrink-0">Taken</span>
                              <div className="flex-1 bg-gray-100 rounded-full h-2">
                                <div className="bg-emerald-500 h-2 rounded-full transition-all" style={{ width: `${Math.min(100, (stat.taken / maxTaken) * 100)}%` }} />
                              </div>
                              <span className="text-xs text-gray-600 w-6 text-right">{stat.taken}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-xs text-gray-400 w-20 shrink-0">Logboek</span>
                              <div className="flex-1 bg-gray-100 rounded-full h-2">
                                <div className="bg-blue-400 h-2 rounded-full transition-all" style={{ width: `${Math.min(100, (stat.logboek / Math.max(...klasStats.perLeerling.map(s => s.logboek), 1)) * 100)}%` }} />
                              </div>
                              <span className="text-xs text-gray-600 w-6 text-right">{stat.logboek}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-xs text-gray-400 w-20 shrink-0">Observaties</span>
                              <div className="flex-1 bg-gray-100 rounded-full h-2">
                                <div className="bg-teal-400 h-2 rounded-full transition-all" style={{ width: `${Math.min(100, (stat.observaties / Math.max(...klasStats.perLeerling.map(s => s.observaties), 1)) * 100)}%` }} />
                              </div>
                              <span className="text-xs text-gray-600 w-6 text-right">{stat.observaties}</span>
                            </div>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>

                {/* Waarschuwingen */}
                {klasStats.perLeerling.filter(s => !s.actiefDezeWeek).length > 0 && (
                  <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <AlertCircle className="w-4 h-4 text-amber-600" />
                      <p className="font-semibold text-amber-800 text-sm">Inactieve leerlingen deze week</p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {klasStats.perLeerling.filter(s => !s.actiefDezeWeek).map(stat => {
                        const l = goedgekeurde.find(l => l.id === stat.id)
                        return l ? (
                          <span key={stat.id} className="text-xs bg-amber-100 text-amber-800 px-2 py-1 rounded-full">{l.naam}</span>
                        ) : null
                      })}
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        )}

        {/* ── Observaties tab ── */}
        {tab === 'observaties' && (
          <>
            {goedgekeurde.length === 0 ? (
              <div className="bg-white rounded-2xl shadow p-10 text-center text-gray-400">
                <Lock className="w-12 h-12 mx-auto mb-3 text-gray-200" />
                <p className="font-medium text-gray-600 mb-1">Nog geen goedgekeurde koppelingen</p>
                <p className="text-sm">Koppel eerst leerlingen om observaties te bekijken.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-1">
                  <div className="bg-white rounded-2xl shadow p-4">
                    <h2 className="font-bold text-gray-700 mb-3 text-sm uppercase tracking-wide">Leerlingen ({goedgekeurde.length})</h2>
                    <div className="space-y-2">
                      {goedgekeurde.map(l => (
                        <button
                          key={l.id}
                          onClick={() => { setObservatieLeerling(l); laadObservaties(l.id) }}
                          className={`w-full text-left px-3 py-3 rounded-xl transition-all text-sm flex items-center gap-2 ${observatieLeerling?.id === l.id ? 'bg-green-600 text-white' : 'hover:bg-gray-100 text-gray-700'}`}
                        >
                          <User className={`w-4 h-4 shrink-0 ${observatieLeerling?.id === l.id ? 'text-green-100' : 'text-gray-400'}`} />
                          <div>
                            <div className="font-medium">{l.naam}</div>
                            <div className={`text-xs mt-0.5 ${observatieLeerling?.id === l.id ? 'text-green-100' : 'text-gray-400'}`}>
                              {projectNaam[l.project] || '—'}
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="md:col-span-2">
                  {!observatieLeerling ? (
                    <div className="bg-white rounded-2xl shadow p-8 text-center text-gray-400">
                      <div className="text-4xl mb-3">👈</div>
                      <p>Klik op een leerling om de observaties te bekijken</p>
                    </div>
                  ) : observatieData.length === 0 ? (
                    <div className="bg-white rounded-2xl shadow p-8 text-center text-gray-400">
                      <Microscope className="w-10 h-10 mx-auto mb-3 text-gray-200" />
                      <p>Nog geen observaties ingevuld door {observatieLeerling.naam}.</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {observatieData.map(obs => (
                        <div key={obs.id} className="bg-white rounded-2xl shadow p-5">
                          <div className="flex items-center justify-between mb-3">
                            <span className="font-bold text-gray-800">Week {obs.week}</span>
                            <span className="text-xs text-gray-400 bg-gray-100 px-2 py-1 rounded-full">
                              {projectNaam[obs.project] || obs.project}
                            </span>
                          </div>
                          <div className="grid grid-cols-2 gap-2 text-sm">
                            {Object.entries(obs.data || {}).map(([key, val]) => {
                              if (key === 'notities' || key === 'bijzonderheden') return null
                              if (typeof val === 'object' && val !== null) {
                                // Keuringsdienst pot-object
                                const potLabels = {
                                  hoogte_cm:        'Rozethoogte (cm)',
                                  knol_diameter_mm: 'Knoldiameter (mm)',
                                  knol_zichtbaar:   'Knol zichtbaar',
                                  bladeren:         'Aantal bladeren',
                                  bladgrootte:      'Bladgrootte',
                                  bladkleur:        'Bladkleur',
                                  conditie:         'Conditie',
                                  geen_bladvorming: 'Geen bladvorming',
                                  grondvochtigheid: 'Grondvochtigheid',
                                  ziekte:           'Ziekte / plaag',
                                  bolschieten:      'Bolschieten',
                                }
                                const potNamen = { pot1: 'Pot 1 – Controle', pot2: 'Pot 2 – Kunstmest', pot3: 'Pot 3 – Compostthee' }
                                return (
                                  <div key={key} className="col-span-2 bg-gray-50 rounded-xl p-3">
                                    <p className="font-semibold text-gray-600 mb-2">{potNamen[key] ?? key}</p>
                                    {val.geen_bladvorming ? (
                                      <p className="text-xs text-amber-700 font-medium mb-1.5">Nog geen bladvorming</p>
                                    ) : null}
                                    <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-xs">
                                      {Object.entries(val).filter(([k]) => k !== 'geen_bladvorming' && k !== 'bolschieten').map(([k, v]) => {
                                        if (val.geen_bladvorming && (k === 'bladeren' || k === 'bladkleur' || k === 'bladgrootte' || k === 'conditie')) return null
                                        const weergave = typeof v === 'boolean' ? (v ? 'Ja' : 'Nee') : String(v)
                                        if (weergave === '' || weergave === 'null') return null
                                        return (
                                          <div key={k}><span className="text-gray-400">{potLabels[k] ?? k}: </span><span className="font-medium capitalize">{weergave}</span></div>
                                        )
                                      })}
                                    </div>
                                  </div>
                                )
                              }
                              if (Array.isArray(val)) {
                                return (
                                  <div key={key} className="col-span-2">
                                    <span className="text-gray-500 capitalize">{key}: </span>
                                    <span className="font-medium">{val.join(', ') || '—'}</span>
                                  </div>
                                )
                              }
                              return (
                                <div key={key}>
                                  <span className="text-gray-500 capitalize">{key.replace(/_/g, ' ')}: </span>
                                  <span className="font-medium">{String(val)}</span>
                                </div>
                              )
                            })}
                          </div>
                          {(obs.data?.notities || obs.data?.bijzonderheden) && (
                            <div className="mt-3 bg-amber-50 border border-amber-100 rounded-xl p-3 text-sm text-amber-800">
                              <span className="font-semibold">Notities: </span>
                              {obs.data.notities || obs.data.bijzonderheden}
                            </div>
                          )}
                          <p className="text-xs text-gray-300 mt-2">{new Date(obs.bijgewerkt_op || obs.aangemaakt_op).toLocaleDateString('nl-NL')}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}
          </>
        )}

        {/* ── Eindproduct tab ── */}
        {tab === 'eindproduct' && (
          <div className="space-y-4">
            {goedgekeurde.length === 0 ? (
              <div className="bg-white rounded-2xl shadow p-10 text-center text-gray-400">
                <Lock className="w-12 h-12 mx-auto mb-3 text-gray-200" />
                <p className="font-medium text-gray-600 mb-1">Nog geen goedgekeurde koppelingen</p>
                <p className="text-sm">Koppel eerst leerlingen om eindproducten te bekijken.</p>
              </div>
            ) : eindproducten.length === 0 ? (
              <div className="bg-white rounded-2xl shadow p-10 text-center text-gray-400">
                <Trophy className="w-12 h-12 mx-auto mb-3 text-gray-200" />
                <p>Nog geen eindproducten ingediend door jouw leerlingen.</p>
              </div>
            ) : (
              eindproducten.map(ep => (
                <div key={ep.id} className="bg-white rounded-2xl shadow p-5">
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-amber-100 flex items-center justify-center shrink-0">
                        <Trophy className="w-4 h-4 text-amber-600" />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-800">{ep.leerling_naam}</p>
                        <p className="text-xs text-gray-400">{projectNaam[ep.project] || ep.project}</p>
                      </div>
                    </div>
                    <span className="text-xs bg-amber-100 text-amber-700 px-3 py-1 rounded-full font-medium shrink-0">{ep.type}</span>
                  </div>
                  <h3 className="font-bold text-gray-800 mb-1">{ep.titel}</h3>
                  {ep.beschrijving && (
                    <p className="text-sm text-gray-600 leading-relaxed mb-3">{ep.beschrijving}</p>
                  )}
                  {ep.url && (
                    <a
                      href={ep.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-sm text-blue-600 hover:text-blue-800 font-medium"
                    >
                      <ExternalLink className="w-3.5 h-3.5" /> Bekijk eindproduct
                    </a>
                  )}
                  <p className="text-xs text-gray-300 mt-2">
                    Ingediend op {new Date(ep.bijgewerkt_op || ep.aangemaakt_op).toLocaleDateString('nl-NL', { day: 'numeric', month: 'long', year: 'numeric' })}
                  </p>
                </div>
              ))
            )}
          </div>
        )}

        {/* ── Handleiding tab ── */}
        {tab === 'handleiding' && (
          <div className="bg-white rounded-2xl shadow p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center">
                <Map className="w-5 h-5 text-emerald-700" />
              </div>
              <div>
                <h2 className="font-bold text-gray-800">Docenthandleiding</h2>
                <p className="text-sm text-gray-500">Gedetailleerde weekplanning, beoordeling en materialen</p>
              </div>
            </div>
            <p className="text-gray-600 text-sm mb-5 leading-relaxed">
              De volledige docenthandleiding staat op een aparte pagina. Daar vind je per week de activiteiten, didactische tips, differentiatie en de materialenlijst.
            </p>
            <button
              onClick={() => navigate('/handleiding')}
              className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-6 py-3 rounded-xl transition-colors"
            >
              <Map className="w-4 h-4" /> Open docenthandleiding <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

      </div>
    </div>
  )
}
