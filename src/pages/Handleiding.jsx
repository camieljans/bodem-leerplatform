import { useState } from 'react'
import { useAuth } from '../App'
import { handleiding } from '../data/handleiding'
import { materialen } from '../data/materialen'
import {
  GraduationCap,
  ChevronDown,
  ChevronUp,
  Lightbulb,
  CheckSquare,
  BookOpen,
  Package,
  ClipboardList,
  Lock,
  CheckCircle,
} from 'lucide-react'

const projectNamen = {
  wormenhotel: 'Het Wormenhotel',
  keuringsdienst: 'Keuringsdienst van Waarde',
}

const kleurClasses = {
  blue: {
    header: 'bg-blue-50 border-blue-200',
    badge: 'bg-blue-100 text-blue-700',
    icon: 'text-blue-600',
    titel: 'text-blue-800',
  },
  green: {
    header: 'bg-emerald-50 border-emerald-200',
    badge: 'bg-emerald-100 text-emerald-700',
    icon: 'text-emerald-600',
    titel: 'text-emerald-800',
  },
  purple: {
    header: 'bg-purple-50 border-purple-200',
    badge: 'bg-purple-100 text-purple-700',
    icon: 'text-purple-600',
    titel: 'text-purple-800',
  },
  gray: {
    header: 'bg-gray-50 border-gray-200',
    badge: 'bg-gray-100 text-gray-600',
    icon: 'text-gray-500',
    titel: 'text-gray-700',
  },
}

function WeekAccordion({ weekData, defaultOpen }) {
  const [open, setOpen] = useState(defaultOpen)

  return (
    <div className="bg-white rounded-2xl shadow overflow-hidden">
      {/* Altijd zichtbare header */}
      <button
        onClick={() => setOpen(v => !v)}
        className="w-full flex items-center gap-4 px-6 py-5 text-left hover:bg-gray-50 transition-colors"
      >
        <span className="shrink-0 w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 font-bold text-sm flex items-center justify-center">
          W{weekData.week}
        </span>
        <div className="flex-1 min-w-0">
          <div className="font-bold text-gray-800 text-base leading-snug">{weekData.titel}</div>
          <div className="text-sm text-gray-400 mt-0.5">{weekData.duur}</div>
        </div>
        <span className="shrink-0 text-gray-400">
          {open ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
        </span>
      </button>

      {/* Uitklapbare inhoud */}
      {open && (
        <div className="px-6 pb-6 space-y-6 border-t border-gray-100">
          {/* Leerdoelen */}
          <div className="pt-5">
            <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">Leerdoelen</h4>
            <ul className="space-y-2">
              {weekData.leerdoelen.map((doel, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                  <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>{doel}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Activiteiten */}
          <div>
            <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">Activiteiten</h4>
            <div className="space-y-3">
              {weekData.activiteiten.map((act, i) => (
                <div key={i} className="flex gap-3">
                  <span className="shrink-0 w-6 h-6 rounded-full bg-emerald-600 text-white text-xs font-bold flex items-center justify-center mt-0.5">
                    {i + 1}
                  </span>
                  <div>
                    <p className="font-semibold text-gray-800 text-sm">{act.naam}</p>
                    <p className="text-sm text-gray-600 leading-relaxed mt-0.5">{act.beschrijving}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Tips */}
          {weekData.tips && weekData.tips.length > 0 && (
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <Lightbulb className="w-4 h-4 text-amber-600" />
                <span className="text-xs font-bold text-amber-700 uppercase tracking-wider">Tips voor de begeleider</span>
              </div>
              <ul className="space-y-1.5">
                {weekData.tips.map((tip, i) => (
                  <li key={i} className="text-sm text-amber-800 leading-relaxed flex items-start gap-2">
                    <span className="text-amber-400 shrink-0 mt-1">•</span>
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Differentiatie */}
          <div>
            <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">Differentiatie</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                <p className="text-xs font-bold text-blue-700 uppercase tracking-wider mb-1.5">Extra ondersteuning</p>
                <p className="text-sm text-blue-900 leading-relaxed">{weekData.differentiatie.ondersteuning}</p>
              </div>
              <div className="bg-purple-50 border border-purple-200 rounded-xl p-4">
                <p className="text-xs font-bold text-purple-700 uppercase tracking-wider mb-1.5">Verdieping</p>
                <p className="text-sm text-purple-900 leading-relaxed">{weekData.differentiatie.verdieping}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default function Handleiding() {
  const { profile, project } = useAuth()
  const [tab, setTab] = useState('weekplanning')
  const [checklistState, setChecklistState] = useState({})

  // Toegangscontrole
  if (!profile || profile.rol !== 'begeleider') {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <div className="bg-white rounded-2xl shadow p-10 max-w-sm w-full text-center">
          <div className="w-14 h-14 rounded-2xl bg-red-100 flex items-center justify-center mx-auto mb-4">
            <Lock className="w-7 h-7 text-red-500" />
          </div>
          <h2 className="text-xl font-bold text-gray-800 mb-2">Geen toegang</h2>
          <p className="text-gray-500 text-sm">
            Deze pagina is alleen toegankelijk voor begeleiders.
          </p>
        </div>
      </div>
    )
  }

  // Projectcontrole
  if (!project || !handleiding[project] || !materialen[project]) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <div className="bg-white rounded-2xl shadow p-10 max-w-sm w-full text-center">
          <div className="w-14 h-14 rounded-2xl bg-amber-100 flex items-center justify-center mx-auto mb-4">
            <BookOpen className="w-7 h-7 text-amber-600" />
          </div>
          <h2 className="text-xl font-bold text-gray-800 mb-2">Geen project geselecteerd</h2>
          <p className="text-gray-500 text-sm">
            Kies eerst een project op het dashboard om de handleiding te bekijken.
          </p>
        </div>
      </div>
    )
  }

  const data = handleiding[project]
  const matData = materialen[project]

  const tabs = [
    { id: 'weekplanning', label: 'Weekplanning', icon: <BookOpen className="w-4 h-4" /> },
    { id: 'beoordeling', label: 'Beoordeling', icon: <CheckSquare className="w-4 h-4" /> },
    { id: 'materialen', label: 'Materialen', icon: <Package className="w-4 h-4" /> },
    { id: 'voorbereiding', label: 'Voorbereiding', icon: <ClipboardList className="w-4 h-4" /> },
  ]

  function toggleChecklist(i) {
    setChecklistState(prev => ({ ...prev, [i]: !prev[i] }))
  }

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-4xl mx-auto">

        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-14 h-14 rounded-2xl bg-emerald-100 flex items-center justify-center mx-auto mb-4">
            <GraduationCap className="w-7 h-7 text-emerald-700" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-1">Docenthandleiding</h1>
          <p className="text-gray-500">{projectNamen[project] || project}</p>
        </div>

        {/* Tab bar */}
        <div className="flex flex-wrap gap-2 mb-8 justify-center">
          {tabs.map(t => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`flex items-center gap-1.5 px-5 py-2 rounded-xl font-semibold text-sm transition-all ${
                tab === t.id
                  ? 'bg-green-600 text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-100'
              }`}
            >
              {t.icon}
              {t.label}
            </button>
          ))}
        </div>

        {/* ── TAB 1: Weekplanning ────────────────────────────────────────────── */}
        {tab === 'weekplanning' && (
          <div className="space-y-4">
            {/* Inleiding */}
            <div className="bg-white rounded-2xl shadow p-6 mb-6">
              <p className="text-gray-700 leading-relaxed">{data.inleiding}</p>
            </div>

            {/* Week accordions */}
            {data.weken.map(week => (
              <WeekAccordion
                key={week.week}
                weekData={week}
                defaultOpen={week.week === 1}
              />
            ))}
          </div>
        )}

        {/* ── TAB 2: Beoordeling ────────────────────────────────────────────── */}
        {tab === 'beoordeling' && (
          <div className="space-y-6">
            {/* Filosofie */}
            <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-xl bg-blue-100 flex items-center justify-center shrink-0">
                  <GraduationCap className="w-4 h-4 text-blue-700" />
                </div>
                <div>
                  <h3 className="font-bold text-blue-800 mb-1">Beoordelingsfilosofie</h3>
                  <p className="text-blue-900 text-sm leading-relaxed">{data.beoordelingsfilosofie}</p>
                </div>
              </div>
            </div>

            {/* Criteria */}
            <div className="bg-white rounded-2xl shadow overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-100">
                <h3 className="font-bold text-gray-800">Beoordelingscriteria</h3>
              </div>
              <div className="divide-y divide-gray-100">
                {data.beoordelingscriteria.map((c, i) => (
                  <div key={i} className="flex gap-4 px-6 py-4 items-start">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 shrink-0 mt-2" />
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-gray-800 text-sm">{c.criterium}</p>
                      <p className="text-sm text-gray-500 mt-0.5 leading-relaxed">{c.omschrijving}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ── TAB 3: Materialen ─────────────────────────────────────────────── */}
        {tab === 'materialen' && (
          <div className="space-y-6">
            {/* Intro */}
            <div className="bg-white rounded-2xl shadow p-6">
              <p className="text-gray-700 leading-relaxed">{matData.intro}</p>
            </div>

            {/* Categorieen */}
            {matData.categorieen.map((cat, ci) => {
              const kleur = kleurClasses[cat.kleur] || kleurClasses.gray
              return (
                <div key={ci} className="bg-white rounded-2xl shadow overflow-hidden">
                  <div className={`flex items-center gap-3 px-6 py-4 border-b ${kleur.header}`}>
                    <span className="text-xl">{cat.icon}</span>
                    <h3 className={`font-bold text-base ${kleur.titel}`}>{cat.naam}</h3>
                  </div>
                  <div className="divide-y divide-gray-100">
                    {cat.items.map((item, ii) => (
                      <div key={ii} className="px-6 py-4">
                        <div className="flex flex-wrap items-start gap-2 mb-1">
                          <span className="font-semibold text-gray-800 text-sm">{item.naam}</span>
                          {item.optioneel && (
                            <span className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full font-medium">
                              Optioneel
                            </span>
                          )}
                          {item.hoeveelheid && (
                            <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${kleur.badge}`}>
                              {item.hoeveelheid}
                            </span>
                          )}
                        </div>
                        {item.opmerkingen && (
                          <p className="text-sm text-gray-600 leading-relaxed mt-1">{item.opmerkingen}</p>
                        )}
                        {item.tip && (
                          <p className="text-xs text-gray-400 italic mt-1.5">{item.tip}</p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        )}

        {/* ── TAB 4: Voorbereiding ──────────────────────────────────────────── */}
        {tab === 'voorbereiding' && (
          <div className="space-y-4">
            <div className="bg-white rounded-2xl shadow overflow-hidden">
              <div className="px-6 py-5 border-b border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-emerald-100 flex items-center justify-center">
                    <ClipboardList className="w-4 h-4 text-emerald-700" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800">Checklist voor de begeleider</h3>
                    <p className="text-xs text-gray-400 mt-0.5">
                      Vink af wat je al hebt voorbereid. Je voortgang wordt niet opgeslagen.
                    </p>
                  </div>
                </div>
              </div>

              <div className="divide-y divide-gray-100">
                {matData.voorbereiding_begeleider.map((item, i) => (
                  <button
                    key={i}
                    onClick={() => toggleChecklist(i)}
                    className="w-full flex items-start gap-4 px-6 py-4 text-left hover:bg-gray-50 transition-colors group"
                  >
                    <div
                      className={`shrink-0 w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all mt-0.5 ${
                        checklistState[i]
                          ? 'bg-emerald-500 border-emerald-500'
                          : 'border-gray-300 group-hover:border-emerald-400'
                      }`}
                    >
                      {checklistState[i] && (
                        <svg className="w-3.5 h-3.5 text-white" viewBox="0 0 12 10" fill="none">
                          <path d="M1 5l3.5 3.5L11 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      )}
                    </div>
                    <span
                      className={`text-sm leading-relaxed transition-colors ${
                        checklistState[i] ? 'text-gray-400 line-through' : 'text-gray-700'
                      }`}
                    >
                      {item}
                    </span>
                  </button>
                ))}
              </div>

              {/* Voortgangsindicator */}
              <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
                {(() => {
                  const aantalAfgevinkt = Object.values(checklistState).filter(Boolean).length
                  const totaal = matData.voorbereiding_begeleider.length
                  const pct = totaal > 0 ? Math.round((aantalAfgevinkt / totaal) * 100) : 0
                  return (
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-xs font-medium text-gray-500">Voortgang</span>
                        <span className="text-xs font-bold text-emerald-700">{aantalAfgevinkt}/{totaal} afgevinkt</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-emerald-500 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                    </div>
                  )
                })()}
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  )
}
