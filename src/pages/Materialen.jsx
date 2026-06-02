import { useAuth } from '../App'
import { materialen } from '../data/materialen'
import {
  Package, Lightbulb, CheckCircle, ClipboardList, Info, Box,
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

        {/* Categorieën */}
        {data.categorieen?.map((cat, i) => (
          <CategorieBlok key={i} cat={cat} />
        ))}

        {/* Voorbereiding begeleider — alleen tonen voor begeleiders */}
        {isBegeleider && data.voorbereiding_begeleider && data.voorbereiding_begeleider.length > 0 && (
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6 mt-6">
            <h2 className="font-bold text-amber-900 mb-3 flex items-center gap-2">
              <ClipboardList className="w-5 h-5" /> Voorbereiding voor de begeleider
            </h2>
            <ul className="space-y-2">
              {data.voorbereiding_begeleider.map((v, i) => (
                <li key={i} className="text-sm text-amber-900 flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-amber-600 mt-0.5 shrink-0" /> {v}
                </li>
              ))}
            </ul>
          </div>
        )}

      </div>
    </div>
  )
}

function CategorieBlok({ cat }) {
  return (
    <div className="bg-white rounded-2xl shadow p-6 mb-4">
      <h2 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
        <span className="text-xl">{cat.icon || '📦'}</span> {cat.naam}
      </h2>
      <div className="space-y-3">
        {cat.items.map((m, i) => (
          <div key={i} className="border border-gray-100 rounded-xl p-4 hover:border-emerald-200 transition-colors">
            <div className="flex items-start justify-between gap-3 mb-1">
              <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                {m.naam}
                {m.optioneel && (
                  <span className="text-xs bg-gray-100 text-gray-500 rounded-full px-2 py-0.5 font-semibold">
                    Optioneel
                  </span>
                )}
              </h3>
              {m.hoeveelheid && (
                <span className="text-xs bg-emerald-50 text-emerald-700 rounded-full px-2 py-0.5 font-semibold shrink-0">
                  {m.hoeveelheid}
                </span>
              )}
            </div>
            {m.opmerkingen && <p className="text-sm text-gray-600 mb-2 leading-relaxed">{m.opmerkingen}</p>}
            {m.tip && (
              <p className="text-xs text-emerald-700 bg-emerald-50 rounded-lg px-3 py-1.5 flex items-start gap-1.5">
                <Lightbulb className="w-3 h-3 mt-0.5 shrink-0" /> {m.tip}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
