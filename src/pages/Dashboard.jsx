import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../App'
import { supabase } from '../supabase'
import { opdrachten } from '../data/opdrachten'
import { ClipboardList, BookOpen, MessageSquare, GraduationCap, Bell, ChevronRight, Lightbulb, BarChart2, User, ArrowRight } from 'lucide-react'

const schoolGroepMapping = {
  'pro': 'basis', 'vmbo-b': 'basis',
  'vmbo-k': 'midden', 'vmbo-tl': 'midden',
  'havo': 'havo', 'vwo': 'havo', 'anders': 'midden',
}

const projectInfo = {
  wormenhotel: {
    emoji: '🪱',
    naam: 'Het Wormenhotel',
    bg: 'from-green-400 to-emerald-500',
    licht: 'bg-green-50',
    tekst: 'text-green-800',
    subtekst: 'text-green-600',
    knop: 'bg-green-600 hover:bg-green-700',
    beschrijving: 'Bouw, onderhoud en monitor jullie eigen wormenhotel. Leer hoe afval onderdeel wordt van een circulaire kringloop.',
  },
  keuringsdienst: {
    emoji: '🪴',
    naam: 'Keuringsdienst van Waarde',
    bg: 'from-cyan-400 to-teal-500',
    licht: 'bg-cyan-50',
    tekst: 'text-cyan-800',
    subtekst: 'text-cyan-600',
    knop: 'bg-cyan-600 hover:bg-cyan-700',
    beschrijving: 'Onderzoek het effect van compostthee op plantengroei. Vergelijk drie potten en presenteer jouw bevindingen.',
  },
}

export default function Dashboard() {
  const { user, profile, project } = useAuth()
  const navigate = useNavigate()
  const info = projectInfo[project] || projectInfo.wormenhotel

  const [verzoeken, setVerzoeken] = useState([])
  const [reageerBezig, setReageerBezig] = useState({})
  const [voortgang, setVoortgang] = useState(null)
  const [nieuweAntwoorden, setNieuweAntwoorden] = useState(0)

  useEffect(() => {
    if (user && profile?.rol === 'leerling') {
      laadVerzoeken()
      if (project) {
        laadVoortgang()
        laadNieuweAntwoorden()
      }
    }
  }, [user, profile, project])

  async function laadVoortgang() {
    const schoolGroep = schoolGroepMapping[profile?.niveau] || 'midden'
    const weekenData = opdrachten[project]?.[schoolGroep] || []
    const totaal = weekenData.reduce((sum, w) => sum + (w.taken?.length || 0), 0)
    const { data } = await supabase
      .from('opdracht_voortgang')
      .select('id')
      .eq('leerling_id', user.id)
      .eq('project', project)
    setVoortgang({ gedaan: (data || []).length, totaal })
  }

  async function laadNieuweAntwoorden() {
    const { data } = await supabase
      .from('vragen')
      .select('id')
      .eq('leerling_id', user.id)
      .eq('project', project)
      .not('antwoord', 'is', null)
    const gezien = JSON.parse(localStorage.getItem('gezieneAntwoorden') || '[]')
    const nieuw = (data || []).filter(v => !gezien.includes(v.id)).length
    setNieuweAntwoorden(nieuw)
  }

  async function laadVerzoeken() {
    const { data: koppelingen } = await supabase
      .from('begeleider_koppeling')
      .select('id, begeleider_id')
      .eq('leerling_id', user.id)
      .eq('status', 'wacht')

    if (!koppelingen || koppelingen.length === 0) {
      setVerzoeken([])
      return
    }

    const ids = koppelingen.map(k => k.begeleider_id)
    const { data: profielen } = await supabase
      .from('profiles')
      .select('id, naam')
      .in('id', ids)

    const profielMap = {}
    for (const p of profielen || []) profielMap[p.id] = p.naam

    setVerzoeken(koppelingen.map(k => ({
      id: k.id,
      begeleider_id: k.begeleider_id,
      naam: profielMap[k.begeleider_id] || 'Onbekend',
    })))
  }

  async function reageer(koppelId, actie) {
    setReageerBezig(prev => ({ ...prev, [koppelId]: actie }))
    await supabase
      .from('begeleider_koppeling')
      .update({ status: actie })
      .eq('id', koppelId)
    await laadVerzoeken()
    setReageerBezig(prev => { const n = { ...prev }; delete n[koppelId]; return n })
  }

  if (profile?.rol === 'begeleider') {
    return (
      <div className="min-h-screen p-6">
        <div className="max-w-2xl mx-auto text-center mt-20">
          <div className="w-16 h-16 rounded-2xl bg-emerald-100 flex items-center justify-center mx-auto mb-5">
            <GraduationCap className="w-8 h-8 text-emerald-700" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-3">Welkom, {profile?.naam}!</h1>
          <p className="text-gray-500 mb-8">Je bent ingelogd als begeleider.</p>
          <button
            onClick={() => navigate('/begeleider')}
            className="flex items-center gap-2 mx-auto bg-green-600 hover:bg-green-700 text-white font-semibold px-8 py-4 rounded-2xl text-lg transition-colors"
          >
            <ClipboardList className="w-5 h-5" /> Bekijk alle logboeken <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className={`bg-gradient-to-r ${info.bg} text-white p-8`}>
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold mb-1">{info.naam}</h1>
          <p className="opacity-80 text-sm">Welkom terug, {profile?.naam || 'leerling'}</p>
        </div>
      </div>

      <div className="max-w-2xl mx-auto p-6">

        {/* Koppelingsverzoeken */}
        {verzoeken.length > 0 && (
          <div className="bg-amber-50 border border-amber-300 rounded-2xl p-5 mb-6">
            <div className="flex items-center gap-2 mb-3">
              <Bell className="w-5 h-5 text-amber-600" />
              <h2 className="font-bold text-amber-800">Koppelingsverzoeken</h2>
            </div>
            <div className="space-y-3">
              {verzoeken.map(v => (
                <div key={v.id} className="bg-white rounded-xl p-4 flex items-center justify-between gap-3">
                  <div>
                    <p className="font-medium text-gray-800 flex items-center gap-1.5"><User className="w-4 h-4 text-gray-400" />{v.naam}</p>
                    <p className="text-sm text-gray-500">wil jouw logboek inzien</p>
                  </div>
                  <div className="flex gap-2 shrink-0">
                    <button
                      onClick={() => reageer(v.id, 'goedgekeurd')}
                      disabled={!!reageerBezig[v.id]}
                      className="bg-green-600 hover:bg-green-700 disabled:opacity-50 text-white text-sm font-semibold px-3 py-2 rounded-xl transition-colors"
                    >
                      {reageerBezig[v.id] === 'goedgekeurd' ? '...' : '✅ Goedkeuren'}
                    </button>
                    <button
                      onClick={() => reageer(v.id, 'afgewezen')}
                      disabled={!!reageerBezig[v.id]}
                      className="bg-gray-100 hover:bg-gray-200 disabled:opacity-50 text-gray-700 text-sm font-semibold px-3 py-2 rounded-xl transition-colors"
                    >
                      {reageerBezig[v.id] === 'afgewezen' ? '...' : 'Afwijzen'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Voortgangsindicator */}
        {voortgang && voortgang.totaal > 0 && (
          <div className="bg-white rounded-2xl shadow p-5 mb-5">
            <div className="flex items-center justify-between mb-2">
              <span className="font-semibold text-gray-700 text-sm flex items-center gap-1.5"><BarChart2 className="w-4 h-4 text-emerald-600" /> Totale voortgang opdrachten</span>
              <span className="text-sm font-bold text-green-700">{voortgang.gedaan}/{voortgang.totaal}</span>
            </div>
            <div className="bg-gray-100 rounded-full h-3">
              <div
                className="bg-green-500 h-3 rounded-full transition-all duration-500"
                style={{ width: `${Math.min(100, Math.round((voortgang.gedaan / voortgang.totaal) * 100))}%` }}
              />
            </div>
            <p className="text-xs text-gray-400 mt-1">{Math.min(100, Math.round((voortgang.gedaan / voortgang.totaal) * 100))}% voltooid</p>
          </div>
        )}

        {/* Notificatie nieuwe antwoorden */}
        {nieuweAntwoorden > 0 && (
          <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4 mb-5 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-blue-500 shrink-0" />
              <p className="text-blue-800 font-medium text-sm">
                Je hebt {nieuweAntwoorden} nieuw{nieuweAntwoorden > 1 ? 'e antwoorden' : ' antwoord'} van je begeleider!
              </p>
            </div>
            <button
              onClick={() => {
                const gezien = JSON.parse(localStorage.getItem('gezieneAntwoorden') || '[]')
                localStorage.setItem('gezieneAntwoorden', JSON.stringify([...gezien, ...Array.from({length: nieuweAntwoorden})]))
                navigate('/vragen')
              }}
              className="text-blue-600 text-sm font-semibold hover:underline shrink-0"
            >
              Bekijk →
            </button>
          </div>
        )}

        <p className="text-gray-600 mb-8 leading-relaxed">{info.beschrijving}</p>

        <div className="grid grid-cols-1 gap-3">
          {[
            { pad: '/opdrachten', icon: ClipboardList, iconBg: 'bg-emerald-50', iconClr: 'text-emerald-700', border: 'hover:border-emerald-300', titel: 'Wekelijkse Opdrachten', omschrijving: 'Wekelijkse opdrachten passend bij jouw project en niveau.', badge: 'Aangepast aan jouw niveau', badgeBg: 'bg-emerald-50 text-emerald-700' },
            { pad: '/logboek',    icon: BookOpen,      iconBg: 'bg-blue-50',    iconClr: 'text-blue-700',    border: 'hover:border-blue-300',    titel: 'Mijn Logboek',          omschrijving: 'Schrijf op wat je observeert, ontdekt en leert. Voeg foto\'s toe!', badge: 'Persoonlijk notitieboek', badgeBg: 'bg-blue-50 text-blue-700' },
            { pad: '/vragen',     icon: MessageSquare, iconBg: 'bg-violet-50',  iconClr: 'text-violet-700',  border: 'hover:border-violet-300',  titel: 'Stel een Vraag',        omschrijving: 'Heb je een vraag over het project? Stel hem aan je begeleider.', badge: 'Begeleider antwoordt snel', badgeBg: 'bg-violet-50 text-violet-700' },
            { pad: '/lessen',     icon: GraduationCap, iconBg: 'bg-amber-50',   iconClr: 'text-amber-700',   border: 'hover:border-amber-300',   titel: 'Extra Leermateriaal',   omschrijving: 'Verdiep je kennis met interactieve lessen over bodem en duurzaamheid.', badge: '3 niveaus', badgeBg: 'bg-amber-50 text-amber-700' },
          ].map(item => {
            const Icon = item.icon
            return (
              <button
                key={item.pad}
                onClick={() => navigate(item.pad)}
                className={`bg-white rounded-xl p-5 shadow-sm hover:shadow-md transition-all text-left border border-gray-100 ${item.border} flex items-center gap-4 group`}
              >
                <div className={`w-12 h-12 rounded-xl ${item.iconBg} flex items-center justify-center shrink-0`}>
                  <Icon className={`w-6 h-6 ${item.iconClr}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <h2 className="text-base font-semibold text-gray-900 mb-0.5">{item.titel}</h2>
                  <p className="text-gray-500 text-sm leading-snug">{item.omschrijving}</p>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-gray-500 shrink-0 transition-colors" />
              </button>
            )
          })}
        </div>

        <div className={`mt-6 ${info.licht} rounded-2xl p-5`}>
          <h3 className={`flex items-center gap-2 font-semibold ${info.tekst} mb-2`}><Lightbulb className="w-4 h-4" /> Tip voor deze week</h3>
          {project === 'wormenhotel' ? (
            <p className={`${info.subtekst} text-sm leading-relaxed`}>
              Controleer of het wormenhotel de juiste vochtigheid heeft. Knijp een handvol bedding samen — als er een paar druppels water uitkomen, is het perfect!
            </p>
          ) : (
            <p className={`${info.subtekst} text-sm leading-relaxed`}>
              Meet deze week de hoogte van alle drie de radijsplanten en noteer het in je logboek. Vergeet ook niet de bladkleur te beschrijven!
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
