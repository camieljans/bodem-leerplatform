import { useAuth } from '../App'
import { materialen } from '../data/materialen'
import {
  Lightbulb, CheckCircle, ClipboardList, Info, Box, Sprout, Hammer,
} from 'lucide-react'

export default function Materialen() {
  const { project, profile } = useAuth()
  const data = materialen[project]
  const isBegeleider = profile?.rol === 'begeleider'

  if (!project) return (
    <div className="p-8 text-center text-gray-500">Geen project geselecteerd.</div>
  )
  if (!data) return (
    <div className="p-8 text-center text-gray-500">
      Voor dit project zijn nog geen materialen ingevuld.
    </div>
  )

  return (
    <div className="min-h-screen p-4 sm:p-6">
      <div className="max-w-3xl mx-auto">

        {/* Hero */}
        <div className="bg-white rounded-3xl shadow-lg overflow-hidden mb-6">
          <div className="relative text-white p-8" style={{ background: 'linear-gradient(135deg, #1b4332 0%, #2d6a4f 50%, #40916c 100%)' }}>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-12 h-12 rounded-2xl bg-white/15 flex items-center justify-center">
                <Box className="w-6 h-6" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">Benodigdheden</h1>
                <p className="text-sm text-white/80">Alles wat je nodig hebt voor het fysieke gedeelte van dit project</p>
              </div>
            </div>
          </div>
          {data.intro && (
            <div className="p-6 bg-emerald-50 border-b border-emerald-100">
              <p className="text-sm text-emerald-900 leading-relaxed flex items-start gap-2">
                <Info className="w-4 h-4 mt-0.5 shrink-0" /> {data.intro}
              </p>
            </div>
          )}
        </div>

        {/* Soil Valley levert */}
        {data.soil_valley && data.soil_valley.length > 0 && (
          <Sectie
            titel="Bij Soil Valley regelen"
            ondertitel="Soil Valley levert dit kant-en-klaar aan school"
            icon={Sprout}
            kleur="emerald"
            items={data.soil_valley}
          />
        )}

        {/* Zelf regelen */}
        {data.elders && data.elders.length > 0 && (
          <Sectie
            titel="Zelf regelen"
            ondertitel="Hergebruikt of geleend via school, kantine, conciërge of bouwmarkt"
            icon={Hammer}
            kleur="amber"
            items={data.elders}
          />
        )}

        {/* Voorbereiding begeleider — alleen tonen voor begeleiders */}
        {isBegeleider && data.voorbereiding_begeleider && data.voorbereiding_begeleider.length > 0 && (
          <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6 mt-6">
            <h2 className="font-bold text-blue-900 mb-3 flex items-center gap-2">
              <ClipboardList className="w-5 h-5" /> Voorbereiding voor de begeleider
            </h2>
            <ul className="space-y-2">
              {data.voorbereiding_begeleider.map((v, i) => (
                <li key={i} className="text-sm text-blue-900 flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-blue-600 mt-0.5 shrink-0" /> {v}
                </li>
              ))}
            </ul>
          </div>
        )}

      </div>
    </div>
  )
}

function Sectie({ titel, ondertitel, icon: Icon, kleur, items }) {
  const kleuren = {
    emerald: {
      header: 'bg-emerald-700',
      headerTekst: 'text-emerald-50',
      itemHover: 'hover:border-emerald-300',
      badge: 'bg-emerald-50 text-emerald-700',
      tipBg: 'bg-emerald-50 text-emerald-700',
    },
    amber: {
      header: 'bg-amber-600',
      headerTekst: 'text-amber-50',
      itemHover: 'hover:border-amber-300',
      badge: 'bg-amber-50 text-amber-800',
      tipBg: 'bg-amber-50 text-amber-800',
    },
  }
  const k = kleuren[kleur] || kleuren.emerald

  return (
    <div className="bg-white rounded-2xl shadow overflow-hidden mb-5">
      <div className={`${k.header} ${k.headerTekst} px-6 py-4 flex items-center gap-3`}>
        <div className="w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center shrink-0">
          <Icon className="w-5 h-5" />
        </div>
        <div>
          <h2 className="font-bold text-lg">{titel}</h2>
          <p className="text-xs opacity-80">{ondertitel}</p>
        </div>
      </div>
      <div className="p-5 space-y-3">
        {items.map((m, i) => (
          <div key={i} className={`border border-gray-100 rounded-xl p-4 ${k.itemHover} transition-colors`}>
            <div className="flex items-start justify-between gap-3 mb-1">
              <h3 className="font-semibold text-gray-900 flex items-center gap-2 flex-wrap">
                {m.naam}
                {m.optioneel && (
                  <span className="text-xs bg-gray-100 text-gray-500 rounded-full px-2 py-0.5 font-semibold">
                    Optioneel
                  </span>
                )}
              </h3>
              {m.hoeveelheid && (
                <span className={`text-xs rounded-full px-2 py-0.5 font-semibold shrink-0 ${k.badge}`}>
                  {m.hoeveelheid}
                </span>
              )}
            </div>
            {m.opmerkingen && <p className="text-sm text-gray-600 mb-2 leading-relaxed">{m.opmerkingen}</p>}
            {m.tip && (
              <p className={`text-xs rounded-lg px-3 py-1.5 flex items-start gap-1.5 ${k.tipBg}`}>
                <Lightbulb className="w-3 h-3 mt-0.5 shrink-0" /> {m.tip}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
