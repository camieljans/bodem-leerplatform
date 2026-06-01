import { useState, useRef } from 'react'
import { useAuth } from '../App'
import { briefing } from '../data/briefing'
import {
  FileText, Target, Lightbulb, CheckCircle, BookOpen, Layers,
  ChevronDown, ChevronUp, Sparkles, Clock, Users, ArrowRight, Flag,
  FlaskConical, Leaf, Minus, Info, X, Brain, Wrench,
  Sprout, BarChart2, MapPin, Microscope, Film
} from 'lucide-react'

// Vaste Lucide-iconen per fase-index (0–5), onafhankelijk van projectdata
const FASE_ICONS = [Sprout, FlaskConical, BarChart2, MapPin, Microscope, Film]

// Emerald-gradiënt: alleen icon en badge variëren (donker → licht); bg/border/tekst zijn uniform
const FASE_STIJLEN = [
  { iconBg: 'bg-emerald-800', iconClr: 'text-emerald-50',  badge: 'bg-emerald-800 text-emerald-50'  },
  { iconBg: 'bg-emerald-600', iconClr: 'text-white',        badge: 'bg-emerald-600 text-white'        },
  { iconBg: 'bg-emerald-500', iconClr: 'text-white',        badge: 'bg-emerald-500 text-white'        },
  { iconBg: 'bg-emerald-300', iconClr: 'text-emerald-900',  badge: 'bg-emerald-300 text-emerald-900'  },
  { iconBg: 'bg-emerald-200', iconClr: 'text-emerald-800',  badge: 'bg-emerald-200 text-emerald-800'  },
  { iconBg: 'bg-emerald-100', iconClr: 'text-emerald-700',  badge: 'bg-emerald-100 text-emerald-700'  },
]

export default function Briefing() {
  const { project } = useAuth()
  const data = briefing[project]
  const [openFase, setOpenFase] = useState(null)
  const [activeTab, setActiveTab] = useState('project')
  const [openPot, setOpenPot] = useState(null)

  if (!data) return (
    <div className="p-8 text-center text-gray-500">Geen project geselecteerd.</div>
  )

  const tabs = [
    { id: 'project',   label: 'Project',     icon: FileText },
    { id: 'fases',     label: 'Fases',       icon: Layers },
    { id: 'leerdoelen',label: 'Leerdoelen',  icon: Target },
    { id: 'eindproduct',label: 'Eindproduct',icon: Flag },
    { id: 'weetjes',   label: 'Weetjes',     icon: Sparkles },
  ]

  return (
    <div className="min-h-screen p-4 sm:p-6">
      <div className="max-w-3xl mx-auto">

        {/* Hero */}
        <div className="bg-white rounded-3xl shadow-lg overflow-hidden mb-6">
          <div className="relative overflow-hidden text-white p-8" style={{ background: 'linear-gradient(135deg, #1b4332 0%, #2d6a4f 50%, #40916c 100%)' }}>
            <svg className="absolute inset-0 w-full h-full opacity-20" viewBox="0 0 600 160" preserveAspectRatio="xMidYMid slice">
              <ellipse cx="50" cy="90" rx="40" ry="70" fill="#40916c" />
              <ellipse cx="550" cy="85" rx="38" ry="65" fill="#40916c" />
              <ellipse cx="300" cy="150" rx="300" ry="30" fill="#081c15" />
            </svg>
            <div className="relative">
              <div className="flex items-center gap-2 mb-3">
                {data.themas.map(t => (
                  <span key={t} className="text-xs bg-white/20 rounded-full px-3 py-1 font-medium">{t}</span>
                ))}
              </div>
              <h1 className="text-3xl font-bold mb-1">{data.titel}</h1>
              <p className="text-white/80 text-base">{data.ondertitel}</p>
              <div className="flex items-center gap-4 mt-4 text-sm text-white/70">
                <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" />{data.duur}</span>
              </div>
            </div>
          </div>

          {/* Centrale vraag */}
          <div className="p-6 bg-emerald-50 border-b border-emerald-100">
            <p className="text-xs font-semibold text-emerald-600 uppercase tracking-wide mb-2 flex items-center gap-1.5">
              <Lightbulb className="w-3.5 h-3.5" /> Centrale onderzoeksvraag
            </p>
            <p className="text-gray-900 font-semibold text-lg leading-relaxed">"{data.centrale_vraag}"</p>
            {data.alternatieve_vraag && (
              <p className="text-gray-500 text-sm mt-2 italic">Of: "{data.alternatieve_vraag}"</p>
            )}
          </div>
        </div>

        {/* Experiment overzicht (Keuringsdienst) */}
        {data.experiment && (
          <div className="bg-white rounded-2xl shadow p-6 mb-6">
            <h2 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-emerald-600" /> Het experiment
            </h2>
            <p className="text-gray-600 text-sm mb-4">Gewas: <strong>{data.experiment.gewas}</strong></p>
            {(() => {
              const potten = [data.experiment.pot1, data.experiment.pot2, data.experiment.pot3]
              const cfgs = [
                { bg: 'bg-gray-50',  border: 'border-gray-200',  iconBg: 'bg-gray-100',  iconClr: 'text-gray-400',  Icon: Minus },
                { bg: 'bg-blue-50',  border: 'border-blue-200',  iconBg: 'bg-blue-100',  iconClr: 'text-blue-500',  Icon: FlaskConical },
                { bg: 'bg-green-50', border: 'border-green-200', iconBg: 'bg-green-100', iconClr: 'text-green-600', Icon: Leaf },
              ]
              return (
                <>
                  <div className="grid grid-cols-3 gap-3 mb-3">
                    {potten.map((pot, i) => {
                      const cfg = cfgs[i]
                      const klikbaar = !!pot.dosering
                      return (
                        <button
                          key={i}
                          onClick={() => klikbaar && setOpenPot(openPot === i ? null : i)}
                          className={`rounded-xl p-4 text-center border-2 transition-all ${cfg.bg} ${cfg.border} ${klikbaar ? 'cursor-pointer hover:shadow-md hover:scale-[1.02]' : 'cursor-default'} ${openPot === i ? 'ring-2 ring-offset-1 ring-blue-400' : ''}`}
                        >
                          <div className={`w-10 h-10 rounded-full ${cfg.iconBg} flex items-center justify-center mx-auto mb-3`}>
                            <cfg.Icon className={`w-5 h-5 ${cfg.iconClr}`} />
                          </div>
                          <div className="font-bold text-sm text-gray-800">{pot.naam}</div>
                          <div className="text-xs text-gray-500 mt-1">{pot.label}</div>
                          {klikbaar && (
                            <div className="mt-2 text-xs text-blue-500 flex items-center justify-center gap-1">
                              <Info className="w-3 h-3" /> dosering
                            </div>
                          )}
                        </button>
                      )
                    })}
                  </div>

                  {/* Doseringskaart */}
                  {openPot !== null && potten[openPot]?.dosering && (
                    <div className={`rounded-xl border-2 p-4 mb-4 ${cfgs[openPot].bg} ${cfgs[openPot].border}`}>
                      <div className="flex items-start justify-between mb-3">
                        <h4 className="font-bold text-gray-800 text-sm">Dosering — {potten[openPot].naam}</h4>
                        <button onClick={() => setOpenPot(null)} className="text-gray-400 hover:text-gray-600">
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                      <div className="grid grid-cols-2 gap-2 mb-3">
                        <div className="bg-white rounded-lg p-2">
                          <p className="text-xs text-gray-400 mb-0.5">Per week</p>
                          <p className="text-sm font-semibold text-gray-800">{potten[openPot].dosering.aanbevolen}</p>
                        </div>
                        <div className="bg-white rounded-lg p-2">
                          <p className="text-xs text-gray-400 mb-0.5">Totaal (6 weken)</p>
                          <p className="text-sm font-semibold text-gray-800">{potten[openPot].dosering.totaal}</p>
                        </div>
                      </div>
                      <div className="bg-white rounded-lg p-3 mb-3">
                        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Methode</p>
                        <p className="text-sm text-gray-700 leading-relaxed">{potten[openPot].dosering.methode}</p>
                      </div>
                      <div className="space-y-1.5">
                        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Tips</p>
                        {potten[openPot].dosering.tips.map((tip, j) => (
                          <div key={j} className="flex items-start gap-2 text-sm text-gray-700">
                            <CheckCircle className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                            {tip}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </>
              )
            })()}
            <div className="bg-gray-50 rounded-xl p-4">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Constanten (gelijk voor alle potten)</p>
              <ul className="space-y-1">
                {data.experiment.constanten.map((c, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-gray-700">
                    <CheckCircle className="w-3.5 h-3.5 text-green-500 shrink-0" />{c}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* Tabs */}
        <div className="bg-white rounded-2xl shadow overflow-hidden mb-6">
          <div className="flex overflow-x-auto border-b border-gray-100">
            {tabs.map(tab => {
              const Icon = tab.icon
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-1.5 px-4 py-3.5 text-sm font-semibold whitespace-nowrap transition-colors border-b-2 ${
                    activeTab === tab.id
                      ? 'border-emerald-500 text-emerald-700 bg-emerald-50/50'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <Icon className="w-4 h-4" />{tab.label}
                </button>
              )
            })}
          </div>

          <div className="p-6">

            {/* Project tab */}
            {activeTab === 'project' && (
              <div className="space-y-4">
                <p className="text-gray-700 leading-relaxed">{data.beschrijving}</p>
                <div className="bg-gray-50 rounded-2xl p-5">
                  <h3 className="font-bold text-gray-700 mb-3 text-sm uppercase tracking-wide">Over dit project</h3>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-white rounded-xl p-3">
                      <p className="text-xs text-gray-400">Duur</p>
                      <p className="font-semibold text-gray-800">{data.duur}</p>
                    </div>
                    <div className="bg-white rounded-xl p-3">
                      <p className="text-xs text-gray-400">Thema's</p>
                      <p className="font-semibold text-gray-800">{data.themas.join(', ')}</p>
                    </div>
                    <div className="bg-white rounded-xl p-3">
                      <p className="text-xs text-gray-400">Fases</p>
                      <p className="font-semibold text-gray-800">{data.fases.length} fases</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Fases tab */}
            {activeTab === 'fases' && (
              <div className="space-y-3">
                {data.fases.map((fase, i) => {
                  const stijl = FASE_STIJLEN[i] || FASE_STIJLEN[FASE_STIJLEN.length - 1]
                  const FaseIcon = FASE_ICONS[i] || Leaf
                  const isOpen = openFase === i
                  return (
                    <div key={i} className="rounded-2xl border border-emerald-100 bg-emerald-50 overflow-hidden">
                      <button
                        className="w-full flex items-center gap-4 p-4 text-left"
                        onClick={() => setOpenFase(isOpen ? null : i)}
                      >
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${stijl.iconBg}`}>
                          <FaseIcon className={`w-5 h-5 ${stijl.iconClr}`} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${stijl.badge}`}>Fase {fase.nr}</span>
                            <span className="text-xs text-gray-500">{fase.duur}</span>
                          </div>
                          <p className="font-bold mt-0.5 text-emerald-900">{fase.naam}</p>
                        </div>
                        {isOpen ? <ChevronUp className="w-4 h-4 text-gray-400 shrink-0" /> : <ChevronDown className="w-4 h-4 text-gray-400 shrink-0" />}
                      </button>
                      {isOpen && (
                        <div className="px-4 pb-4 border-t border-emerald-100 pt-3">
                          <p className="text-sm text-gray-700 mb-3 leading-relaxed">{fase.beschrijving}</p>
                          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Activiteiten</p>
                          <ul className="space-y-1.5">
                            {fase.activiteiten.map((act, j) => (
                              <li key={j} className="flex items-start gap-2 text-sm text-gray-700">
                                <ArrowRight className="w-3.5 h-3.5 mt-0.5 shrink-0 text-emerald-600" />
                                {act}
                              </li>
                            ))}
                          </ul>
                          {fase.tip && (
                            <div className="mt-3 bg-amber-50 border border-amber-200 rounded-xl px-3 py-2 text-xs text-amber-800 flex items-start gap-1.5">
                              <Lightbulb className="w-3.5 h-3.5 shrink-0 mt-0.5 text-amber-500" />
                              {fase.tip}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            )}

            {/* Leerdoelen tab */}
            {activeTab === 'leerdoelen' && (
              <div className="space-y-5">
                {[
                  { label: 'Kennis',       Icon: Brain,     items: data.leerdoelen.kennis,        kleur: 'blue'  },
                  { label: 'Vaardigheden', Icon: Wrench,    items: data.leerdoelen.vaardigheden,  kleur: 'green' },
                  { label: 'Houding',      Icon: Lightbulb, items: data.leerdoelen.houding,       kleur: 'amber' },
                ].map(groep => (
                  <div key={groep.label}>
                    <h3 className="font-bold text-gray-700 mb-3 flex items-center gap-2">
                      <groep.Icon className="w-4 h-4 opacity-70" /> {groep.label}
                    </h3>
                    <ul className="space-y-2">
                      {groep.items.map((item, i) => (
                        <li key={i} className="flex items-start gap-3 text-sm text-gray-700">
                          <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            )}

            {/* Eindproduct tab */}
            {activeTab === 'eindproduct' && (
              <div className="space-y-4">
                <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-5">
                  <p className="text-emerald-800 leading-relaxed">{data.eindproduct.beschrijving}</p>
                </div>
                <h3 className="font-bold text-gray-700">Mogelijke vormen</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {data.eindproduct.vormen.map((vorm, i) => {
                    const VormIcon = [Film, Microscope, Users, Wrench, FileText][i % 5]
                    return (
                    <div key={i} className="bg-gray-50 border border-gray-100 rounded-2xl p-4">
                      <div className="w-9 h-9 rounded-xl bg-emerald-100 flex items-center justify-center mb-2">
                        <VormIcon className="w-4 h-4 text-emerald-700" />
                      </div>
                      <p className="font-semibold text-gray-800 mb-1">{vorm.label}</p>
                      <p className="text-sm text-gray-500">{vorm.beschrijving}</p>
                    </div>
                    )
                  })}
                </div>
              </div>
            )}

            {/* Weetjes tab */}
            {activeTab === 'weetjes' && (
              <div className="space-y-3">
                {data.weetjes.map((weetje, i) => (
                  <div key={i} className="flex items-start gap-3 bg-amber-50 border border-amber-200 rounded-2xl p-4">
                    <Sparkles className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                    <p className="text-amber-800 text-sm leading-relaxed">{weetje}</p>
                  </div>
                ))}
              </div>
            )}

          </div>
        </div>

      </div>
    </div>
  )
}
