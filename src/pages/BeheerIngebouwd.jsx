import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { briefing } from '../data/briefing'
import { opdrachten } from '../data/opdrachten'
import {
  ArrowLeft, Lock, Clock, Lightbulb, FileText, Target, Flag, Layers,
  Sparkles, GraduationCap, ClipboardList,
} from 'lucide-react'

const NIVEAUS = [
  { key: 'basis',  label: 'Basis (VMBO-B/K)' },
  { key: 'midden', label: 'Midden (VMBO-TL)' },
  { key: 'havo',   label: 'HAVO/VWO' },
  { key: 'pro',    label: 'Pro' },
]

export default function BeheerIngebouwd() {
  const { sleutel } = useParams()
  const navigate = useNavigate()
  const [tab, setTab] = useState('basis')
  const [niveau, setNiveau] = useState('midden')

  const data = briefing[sleutel]
  const projectOpdrachten = opdrachten[sleutel]
  if (!data) return <p className="p-8 text-center text-stone-500">Project niet gevonden.</p>

  const tabs = [
    { id: 'basis',       label: 'Basis',       icon: FileText },
    { id: 'leerdoelen',  label: 'Leerdoelen',  icon: Target },
    { id: 'eindproduct', label: 'Eindproduct', icon: Flag },
    { id: 'fases',       label: 'Fases',       icon: Layers },
    { id: 'weetjes',     label: 'Weetjes',     icon: Sparkles },
    { id: 'opdrachten',  label: 'Wekelijkse opdrachten', icon: ClipboardList },
  ]

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-4xl mx-auto">

        <button onClick={() => navigate('/beheer')}
          className="flex items-center gap-2 text-stone-500 hover:text-stone-700 text-sm mb-6">
          <ArrowLeft className="w-4 h-4" /> Terug naar overzicht
        </button>

        {/* Hero */}
        <div className="bg-white rounded-3xl shadow-lg overflow-hidden mb-6">
          <div className="relative overflow-hidden text-white p-8" style={{ background: 'linear-gradient(135deg, #1b4332 0%, #2d6a4f 50%, #40916c 100%)' }}>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xs bg-white/20 rounded-full px-3 py-1 font-medium flex items-center gap-1.5">
                <Lock className="w-3 h-3" /> Ingebouwd project
              </span>
              {(data.themas || []).map(t => (
                <span key={t} className="text-xs bg-white/20 rounded-full px-3 py-1 font-medium">{t}</span>
              ))}
            </div>
            <h1 className="text-3xl font-bold mb-1">{data.titel}</h1>
            <p className="text-white/80 text-base">{data.ondertitel}</p>
            {data.duur && (
              <div className="flex items-center gap-4 mt-4 text-sm text-white/70">
                <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" />{data.duur}</span>
              </div>
            )}
          </div>
          {data.centrale_vraag && (
            <div className="p-6 bg-emerald-50 border-b border-emerald-100">
              <p className="text-xs font-semibold text-emerald-600 uppercase tracking-wide mb-2 flex items-center gap-1.5">
                <Lightbulb className="w-3.5 h-3.5" /> Centrale onderzoeksvraag
              </p>
              <p className="text-gray-900 font-semibold text-lg leading-relaxed">"{data.centrale_vraag}"</p>
            </div>
          )}
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mb-6">
          {tabs.map(t => {
            const Icon = t.icon
            return (
              <button key={t.id} onClick={() => setTab(t.id)}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-semibold transition-colors ${
                  tab === t.id ? 'bg-emerald-700 text-white' : 'bg-white text-stone-600 hover:bg-stone-100'
                }`}>
                <Icon className="w-4 h-4" /> {t.label}
              </button>
            )
          })}
        </div>

        {/* Tab inhoud */}
        {tab === 'basis' && (
          <Panel><p className="text-stone-700 leading-relaxed">{data.beschrijving}</p></Panel>
        )}

        {tab === 'leerdoelen' && data.leerdoelen && (
          <Panel>
            {['kennis', 'vaardigheden', 'houding'].map(cat => (
              <div key={cat} className="mb-5 last:mb-0">
                <h3 className="font-bold text-stone-800 mb-2 capitalize">{cat}</h3>
                <ul className="list-disc list-inside space-y-1 text-stone-700 text-sm">
                  {(data.leerdoelen[cat] || []).map((d, i) => <li key={i}>{d}</li>)}
                </ul>
              </div>
            ))}
          </Panel>
        )}

        {tab === 'eindproduct' && data.eindproduct && (
          <Panel>
            <p className="text-stone-700 leading-relaxed mb-4">{data.eindproduct.beschrijving}</p>
            <h3 className="font-bold text-stone-800 mb-2">Mogelijke vormen</h3>
            <div className="space-y-2">
              {(data.eindproduct.vormen || []).map((v, i) => (
                <div key={i} className="bg-stone-50 rounded-xl p-3">
                  <p className="font-semibold text-stone-900 text-sm">{v.label}</p>
                  <p className="text-stone-700 text-sm">{v.beschrijving}</p>
                </div>
              ))}
            </div>
          </Panel>
        )}

        {tab === 'fases' && (
          <div className="space-y-3">
            {(data.fases || []).map((f, i) => (
              <Panel key={i}>
                <div className="flex items-baseline gap-2 mb-2">
                  <span className="text-emerald-700 font-bold">Fase {f.nr}</span>
                  <span className="text-stone-900 font-bold">— {f.naam}</span>
                  {f.duur && <span className="text-stone-500 text-sm">({f.duur})</span>}
                </div>
                <p className="text-stone-700 text-sm italic mb-3">{f.beschrijving}</p>
                {(f.activiteiten || []).length > 0 && (
                  <>
                    <p className="font-semibold text-stone-800 text-sm mb-1">Activiteiten:</p>
                    <ul className="list-disc list-inside space-y-1 text-stone-700 text-sm mb-3">
                      {f.activiteiten.map((a, ai) => <li key={ai}>{a}</li>)}
                    </ul>
                  </>
                )}
                {f.tip && (
                  <div className="bg-emerald-50 border-l-4 border-emerald-600 rounded-r-lg p-3 text-sm text-emerald-900">
                    <strong>Tip:</strong> {f.tip}
                  </div>
                )}
              </Panel>
            ))}
          </div>
        )}

        {tab === 'weetjes' && (
          <Panel>
            <ul className="list-disc list-inside space-y-2 text-stone-700">
              {(data.weetjes || []).map((w, i) => <li key={i}>{w}</li>)}
            </ul>
          </Panel>
        )}

        {tab === 'opdrachten' && projectOpdrachten && (
          <>
            <div className="bg-white rounded-2xl shadow p-4 mb-4">
              <p className="text-sm font-semibold text-stone-600 mb-2 flex items-center gap-1.5">
                <GraduationCap className="w-4 h-4" /> Niveau
              </p>
              <div className="flex flex-wrap gap-2">
                {NIVEAUS.filter(n => projectOpdrachten[n.key]).map(n => (
                  <button key={n.key} onClick={() => setNiveau(n.key)}
                    className={`px-3 py-1.5 rounded-lg text-sm font-semibold ${
                      niveau === n.key ? 'bg-emerald-600 text-white' : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                    }`}>
                    {n.label}
                  </button>
                ))}
              </div>
            </div>
            <div className="space-y-3">
              {(projectOpdrachten[niveau] || []).map(w => (
                <Panel key={w.week}>
                  <div className="mb-2">
                    <span className="text-emerald-700 font-bold">Week {w.week}</span>
                    <span className="text-stone-900 font-semibold ml-1">— {w.titel}</span>
                  </div>
                  {w.intro && <p className="text-stone-600 text-sm italic mb-3">{w.intro}</p>}
                  <p className="font-semibold text-stone-800 text-sm mb-2">Taken:</p>
                  <div className="space-y-1.5 mb-3">
                    {(w.taken || []).map((t, ti) => (
                      <div key={ti} className="flex gap-2 text-sm">
                        <span className="font-bold text-emerald-700 uppercase shrink-0 w-20">{t.type}</span>
                        <span className="text-stone-700">{t.tekst}</span>
                      </div>
                    ))}
                  </div>
                  {(w.reflectie || []).length > 0 && (
                    <>
                      <p className="font-semibold text-stone-800 text-sm mb-1">Reflectievragen:</p>
                      <ul className="list-disc list-inside space-y-0.5 text-stone-700 text-sm">
                        {w.reflectie.map((r, ri) => <li key={ri}>{r}</li>)}
                      </ul>
                    </>
                  )}
                </Panel>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}

function Panel({ children }) {
  return <div className="bg-white rounded-2xl shadow p-6">{children}</div>
}
