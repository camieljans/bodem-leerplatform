import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../App'
import { supabase } from '../supabase'
import { opdrachten } from '../data/opdrachten'
import { ClipboardList, BookOpen, MessageSquare, GraduationCap, Bell, ChevronRight, Lightbulb, BarChart2, User, ArrowRight, Map, Microscope, Trophy, BookA } from 'lucide-react'

import { bepaalNiveau } from '../utils/bepaalNiveau'

const projectInfo = {
  wilgenvlechten: {
    naam: 'Wilgenvlechten',
    licht: 'bg-lime-50/70',
    tekst: 'text-lime-900',
    subtekst: 'text-lime-800',
    beschrijving: 'Ga naar buiten en bouw met wilgentakken iets dat bijdraagt aan het voedselbos. Leer over biodiversiteit en hoe jij de natuur kunt helpen.',
    tip: 'Pak verse wilgentakken — die zijn flexibeler en makkelijker te vlechten. De takken moeten nat aanvoelen.',
  },
  wormenhotel: {
    naam: 'Het Wormenhotel',
    licht: 'bg-emerald-50/70',
    tekst: 'text-emerald-900',
    subtekst: 'text-emerald-800',
    beschrijving: 'Bouw, onderhoud en monitor jullie eigen wormenhotel. Leer hoe afval onderdeel wordt van een circulaire kringloop.',
    tip: 'Controleer of het wormenhotel de juiste vochtigheid heeft. Knijp een handvol bedding samen — als er een paar druppels water uitkomen, is het perfect!',
  },
  keuringsdienst: {
    naam: 'Keuringsdienst van Waarde',
    licht: 'bg-emerald-50/70',
    tekst: 'text-emerald-900',
    subtekst: 'text-emerald-800',
    beschrijving: 'Onderzoek het effect van compostthee op plantengroei. Vergelijk drie potten en presenteer jouw bevindingen.',
    tip: 'Meet deze week de hoogte van alle drie de radijsplanten en noteer het in je logboek. Vergeet ook niet de bladkleur te beschrijven!',
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
    const schoolGroep = bepaalNiveau(profile?.niveau, profile?.leeftijd)
    const projectData = opdrachten[project] || {}
    const weekenData = projectData[schoolGroep] || projectData.midden || projectData.basis || projectData.havo || projectData.pro || Object.values(projectData)[0] || []
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
    <div className="min-h-screen page-enter">
      <div className="relative overflow-hidden text-white px-8 py-10 cinematic-hero">
        {/* Goudgele gloed rechtsboven */}
        <div className="absolute -top-10 right-0 w-80 h-60 blur-3xl pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(253,230,138,0.28), transparent 70%)' }} />
        {/* Groene gloed linksonder */}
        <div className="absolute bottom-0 left-0 w-64 h-32 blur-2xl pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(52,211,153,0.18), transparent 70%)' }} />
        <div className="relative max-w-2xl mx-auto">
          <p className="text-emerald-300/60 text-xs font-semibold uppercase tracking-[0.18em] mb-3">
            {info.emoji} {info.naam}
          </p>
          <h1 className="text-3xl font-bold mb-1.5 drop-shadow-lg">
            Welkom terug, {profile?.naam?.split(' ')[0] || 'leerling'}
          </h1>
          <p className="text-emerald-100/55 text-sm">Waar ga je vandaag mee aan de slag?</p>
        </div>
      </div>

      <div className="max-w-2xl mx-auto p-6">

        {verzoeken.length > 0 && (
          <div className="cinematic-card rounded-2xl p-5 mb-6 border-amber-200">
            <div className="flex items-center gap-2 mb-3">
              <Bell className="w-5 h-5 text-amber-600" />
              <h2 className="font-bold text-amber-800">Koppelingsverzoeken</h2>
            </div>
            <div className="space-y-3">
              {verzoeken.map(v => (
                <div key={v.id} className="bg-white/75 rounded-xl p-4 flex items-center justify-between gap-3">
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

        {voortgang && voortgang.totaal > 0 && (
          <div className="cinematic-card rounded-2xl p-5 mb-5">
            <div className="flex items-center justify-between mb-2">
              <span className="font-semibold text-gray-700 text-sm flex items-center gap-1.5"><BarChart2 className="w-4 h-4 text-emerald-600" /> Totale voortgang opdrachten</span>
              <span className="text-sm font-bold text-green-700">{voortgang.gedaan}/{voortgang.totaal}</span>
            </div>
            <div className="bg-stone-200/70 rounded-full h-3 overflow-hidden">
              <div
                className="bg-gradient-to-r from-emerald-600 to-lime-500 h-3 rounded-full transition-all duration-500"
                style={{ width: `${Math.min(100, Math.round((voortgang.gedaan / voortgang.totaal) * 100))}%` }}
              />
            </div>
            <p className="text-xs text-gray-400 mt-1">{Math.min(100, Math.round((voortgang.gedaan / voortgang.totaal) * 100))}% voltooid</p>
          </div>
        )}

        {nieuweAntwoorden > 0 && (
          <div className="cinematic-card rounded-2xl p-4 mb-5 flex items-center justify-between">
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

        <div className="cinematic-panel rounded-3xl p-5 mb-6">
          <p className="text-stone-700 leading-relaxed">{info.beschrijving}</p>
        </div>

        <div className="mb-3">
          <p className="text-xs font-semibold uppercase mb-2 px-1 cinematic-section-label">Jouw project</p>
          <div className="grid grid-cols-2 gap-3">
            {[
              { pad: '/briefing',    icon: Map,        iconBg: 'bg-emerald-50', iconClr: 'text-emerald-700', border: 'hover:border-emerald-300', titel: 'Projectbriefing',  omschrijving: 'Overzicht van het project, fases en leerdoelen.' },
              { pad: '/eindproduct', icon: Trophy,     iconBg: 'bg-yellow-50',  iconClr: 'text-yellow-700',  border: 'hover:border-yellow-300',  titel: 'Eindproduct',      omschrijving: 'Upload en deel jouw eindpresentatie.' },
            ].map(item => {
              const Icon = item.icon
              return (
                <button key={item.pad} onClick={() => navigate(item.pad)}
                  className={`cinematic-card rounded-xl p-4 transition-all text-left ${item.border} group`}
                >
                  <div className={`w-10 h-10 rounded-xl ${item.iconBg} flex items-center justify-center mb-3`}>
                    <Icon className={`w-5 h-5 ${item.iconClr}`} />
                  </div>
                  <h2 className="text-sm font-semibold text-stone-950 mb-0.5">{item.titel}</h2>
                  <p className="text-stone-500 text-xs leading-snug">{item.omschrijving}</p>
                </button>
              )
            })}
          </div>
        </div>

        <div className="mb-3">
          <p className="text-xs font-semibold uppercase mb-2 px-1 cinematic-section-label">Dagelijks werk</p>
          <div className="grid grid-cols-1 gap-3">
            {[
              { pad: '/opdrachten',  icon: ClipboardList, iconBg: 'bg-emerald-50', iconClr: 'text-emerald-700', border: 'hover:border-emerald-300', titel: 'Wekelijkse Opdrachten', omschrijving: 'Wekelijkse opdrachten passend bij jouw project en niveau.' },
              { pad: '/observaties', icon: Microscope,    iconBg: 'bg-teal-50',    iconClr: 'text-teal-700',    border: 'hover:border-teal-300',    titel: 'Observaties & Metingen',omschrijving: 'Vul wekelijks je metingen en observaties in. Bekijk je groeigrafiek.' },
              { pad: '/logboek',     icon: BookOpen,      iconBg: 'bg-blue-50',    iconClr: 'text-blue-700',    border: 'hover:border-blue-300',    titel: 'Mijn Logboek',          omschrijving: 'Schrijf op wat je observeert, ontdekt en leert. Voeg foto\'s toe.' },
            ].map(item => {
              const Icon = item.icon
              return (
                <button key={item.pad} onClick={() => navigate(item.pad)}
                  className={`cinematic-card rounded-xl p-4 transition-all text-left ${item.border} flex items-center gap-4 group`}
                >
                  <div className={`w-11 h-11 rounded-xl ${item.iconBg} flex items-center justify-center shrink-0`}>
                    <Icon className={`w-5 h-5 ${item.iconClr}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h2 className="text-sm font-semibold text-stone-950 mb-0.5">{item.titel}</h2>
                    <p className="text-stone-500 text-xs leading-snug">{item.omschrijving}</p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-gray-500 shrink-0 transition-colors" />
                </button>
              )
            })}
          </div>
        </div>

        <div className="mb-3">
          <p className="text-xs font-semibold uppercase mb-2 px-1 cinematic-section-label">Ondersteuning & kennis</p>
          <div className="grid grid-cols-1 gap-3">
            {[
              { pad: '/vragen',      icon: MessageSquare, iconBg: 'bg-violet-50', iconClr: 'text-violet-700', border: 'hover:border-violet-300', titel: 'Stel een Vraag',      omschrijving: 'Heb je een vraag over het project? Stel hem aan je begeleider.' },
              { pad: '/woordenlijst',icon: BookA,         iconBg: 'bg-pink-50',   iconClr: 'text-pink-700',   border: 'hover:border-pink-300',   titel: 'Woordenlijst',        omschrijving: 'Zoek uitleg bij begrippen zoals vermicompost, hypothese en kringloop.' },
            ].map(item => {
              const Icon = item.icon
              return (
                <button key={item.pad} onClick={() => navigate(item.pad)}
                  className={`cinematic-card rounded-xl p-4 transition-all text-left ${item.border} flex items-center gap-4 group`}
                >
                  <div className={`w-11 h-11 rounded-xl ${item.iconBg} flex items-center justify-center shrink-0`}>
                    <Icon className={`w-5 h-5 ${item.iconClr}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h2 className="text-sm font-semibold text-stone-950 mb-0.5">{item.titel}</h2>
                    <p className="text-stone-500 text-xs leading-snug">{item.omschrijving}</p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-gray-500 shrink-0 transition-colors" />
                </button>
              )
            })}
          </div>
        </div>

        <div className={`mt-6 ${info.licht} cinematic-card rounded-2xl p-5`}>
          <h3 className={`flex items-center gap-2 font-semibold ${info.tekst} mb-2`}><Lightbulb className="w-4 h-4" /> Tip voor deze week</h3>
          <p className={`${info.subtekst} text-sm leading-relaxed`}>{info.tip}</p>
        </div>
      </div>
    </div>
  )
}
