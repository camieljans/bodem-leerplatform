import { useState, useEffect } from 'react'
import { useAuth } from '../App'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../supabase'
import { opdrachten } from '../data/opdrachten'
import { ClipboardList, MessageCircle, Microscope, Wrench, PenLine, Palette, Brain, BookOpen, Lightbulb, ChevronLeft, ChevronRight } from 'lucide-react'

const schoolGroepMapping = {
  'pro':      'basis',
  'vmbo-b':   'basis',
  'vmbo-k':   'midden',
  'vmbo-tl':  'midden',
  'havo':     'havo',
  'vwo':      'havo',
  'anders':   'midden',
}

const taakConfig = {
  bespreek:  { icon: MessageCircle, label: 'Bespreek',   kleur: 'bg-blue-50 border-blue-200 text-blue-800',     iconClr: 'text-blue-600',   vink: 'bg-blue-500' },
  onderzoek: { icon: Microscope,    label: 'Onderzoek',  kleur: 'bg-purple-50 border-purple-200 text-purple-800', iconClr: 'text-purple-600', vink: 'bg-purple-500' },
  doe:       { icon: Wrench,        label: 'Doe',         kleur: 'bg-orange-50 border-orange-200 text-orange-800', iconClr: 'text-orange-600', vink: 'bg-orange-500' },
  schrijf:   { icon: PenLine,       label: 'Schrijf',    kleur: 'bg-green-50 border-green-200 text-green-800',   iconClr: 'text-green-600',  vink: 'bg-green-500' },
  teken:     { icon: Palette,       label: 'Maak/Teken', kleur: 'bg-pink-50 border-pink-200 text-pink-800',      iconClr: 'text-pink-600',   vink: 'bg-pink-500' },
  denk:      { icon: Brain,         label: 'Denk na',    kleur: 'bg-amber-50 border-amber-200 text-amber-800',   iconClr: 'text-amber-600',  vink: 'bg-amber-500' },
}

const niveauLabels = {
  basis:  { label: 'PRO & VMBO Basis',     kleur: 'bg-green-100 text-green-800' },
  midden: { label: 'VMBO Kader & VMBO-TL', kleur: 'bg-blue-100 text-blue-800' },
  havo:   { label: 'HAVO & VWO',           kleur: 'bg-purple-100 text-purple-800' },
}

export default function Opdrachten() {
  const { user, project, profile } = useAuth()
  const navigate = useNavigate()
  const [gekozenWeek, setGekozenWeek] = useState(1)
  const [afgerond, setAfgerond] = useState(new Set())
  const [bezig, setBezig] = useState(false)

  const data = opdrachten[project]
  const schoolGroep = schoolGroepMapping[profile?.niveau] || 'midden'
  const weekenData = data?.[schoolGroep] || []
  const totaalWeken = weekenData.length
  const huidigeWeek = weekenData.find(w => w.week === gekozenWeek) || weekenData[0]
  const niveauInfo = niveauLabels[schoolGroep]

  const aantalTaken = huidigeWeek?.taken?.length || 0
  const aantalAfgerond = afgerond.size
  const voortgangPct = aantalTaken > 0 ? Math.round((aantalAfgerond / aantalTaken) * 100) : 0

  // Laad voortgang wanneer week of project wisselt
  useEffect(() => {
    if (!user || !project) return
    laadVoortgang()
  }, [gekozenWeek, project])

  async function laadVoortgang() {
    const { data: rows } = await supabase
      .from('opdracht_voortgang')
      .select('taak_index')
      .eq('leerling_id', user.id)
      .eq('project', project)
      .eq('week', gekozenWeek)
    setAfgerond(new Set((rows || []).map(r => r.taak_index)))
  }

  async function toggleTaak(i) {
    if (bezig) return
    setBezig(true)

    if (afgerond.has(i)) {
      // Uitvinken → verwijder record
      await supabase
        .from('opdracht_voortgang')
        .delete()
        .eq('leerling_id', user.id)
        .eq('project', project)
        .eq('week', gekozenWeek)
        .eq('taak_index', i)
      setAfgerond(prev => { const s = new Set(prev); s.delete(i); return s })
    } else {
      // Aanvinken → voeg record toe
      await supabase
        .from('opdracht_voortgang')
        .insert({ leerling_id: user.id, project, week: gekozenWeek, taak_index: i })
      setAfgerond(prev => new Set([...prev, i]))
    }
    setBezig(false)
  }

  function navigeerWeek(nieuw) {
    setGekozenWeek(nieuw)
    setAfgerond(new Set())
  }

  if (!data) return (
    <div className="p-8 text-center text-gray-500">Geen project geselecteerd.</div>
  )

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-3xl mx-auto">

        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-14 h-14 rounded-2xl bg-emerald-100 flex items-center justify-center mx-auto mb-4">
            <ClipboardList className="w-7 h-7 text-emerald-700" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Wekelijkse Opdrachten</h1>
          <p className="text-gray-500">Vink af wat je hebt gedaan — je voortgang wordt opgeslagen</p>
        </div>

        {/* Week kiezer */}
        <div className="bg-white rounded-2xl shadow p-4 mb-6">
          <p className="text-xs text-gray-400 uppercase tracking-wide font-semibold mb-3 text-center">Kies een week</p>
          <div className="flex flex-wrap gap-2 justify-center">
            {weekenData.map(w => (
              <button
                key={w.week}
                onClick={() => navigeerWeek(w.week)}
                className={`w-12 h-12 rounded-xl font-bold text-sm transition-all ${
                  gekozenWeek === w.week
                    ? 'bg-green-600 text-white shadow-md scale-110'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {w.week}
              </button>
            ))}
          </div>
        </div>

        {/* Weekopdracht */}
        <div className="bg-white rounded-3xl shadow-lg overflow-hidden">

          {/* Week header + voortgangsbalk */}
          <div className="bg-green-600 px-8 py-6 text-white">
            <div className="flex items-center justify-between mb-2">
              <span className="bg-white/20 rounded-full px-3 py-0.5 text-sm font-semibold">
                Week {huidigeWeek.week} van {totaalWeken}
              </span>
              <span className="text-sm font-semibold bg-white/20 rounded-full px-3 py-0.5">
                {aantalAfgerond}/{aantalTaken} klaar
              </span>
            </div>
            <h2 className="text-2xl font-bold mb-4">{huidigeWeek.titel}</h2>

            {/* Voortgangsbalk */}
            <div className="bg-white/20 rounded-full h-3">
              <div
                className="bg-white h-3 rounded-full transition-all duration-500"
                style={{ width: `${voortgangPct}%` }}
              />
            </div>
            {voortgangPct === 100 && (
              <p className="text-sm mt-2 font-semibold text-white/90">✓ Alle opdrachten afgerond!</p>
            )}
          </div>

          <div className="p-8">
            {/* Intro */}
            <div className="bg-gray-50 rounded-2xl p-5 mb-6 border border-gray-100">
              <p className="text-gray-700 leading-relaxed">{huidigeWeek.intro}</p>
            </div>

            {/* Taken als checklist */}
            <h3 className="text-lg font-bold text-gray-800 mb-4">Opdrachten deze week</h3>
            <div className="space-y-3 mb-8">
              {huidigeWeek.taken.map((taak, i) => {
                const config = taakConfig[taak.type] || taakConfig.doe
                const gedaan = afgerond.has(i)
                return (
                  <button
                    key={i}
                    onClick={() => toggleTaak(i)}
                    className={`w-full rounded-2xl border p-5 text-left transition-all ${
                      gedaan
                        ? 'bg-gray-50 border-gray-200 opacity-60'
                        : `${config.kleur} hover:shadow-md`
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      {/* Checkbox */}
                      <div className={`shrink-0 mt-0.5 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                        gedaan
                          ? 'bg-green-500 border-green-500'
                          : 'border-gray-300 bg-white'
                      }`}>
                        {gedaan && (
                          <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                      </div>

                      {/* Taakinhoud */}
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          {(() => { const Icon = config.icon; return <Icon className={`w-4 h-4 ${gedaan ? 'text-gray-400' : config.iconClr}`} /> })()}
                          <span className={`font-bold text-sm uppercase tracking-wide ${gedaan ? 'text-gray-400' : ''}`}>
                            {config.label}
                          </span>
                        </div>
                        <p className={`text-sm leading-relaxed ${gedaan ? 'line-through text-gray-400' : ''}`}>
                          {taak.tekst}
                        </p>
                      </div>
                    </div>
                  </button>
                )
              })}
            </div>

            {/* Reflectievragen */}
            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Lightbulb className="w-5 h-5 text-amber-600" />
                  <h3 className="font-bold text-amber-800">Reflectievragen</h3>
                </div>
                <button
                  onClick={() => navigate('/logboek')}
                  className="flex items-center gap-1.5 bg-amber-200 hover:bg-amber-300 text-amber-900 text-sm font-semibold px-3 py-1.5 rounded-xl transition-colors"
                >
                  <BookOpen className="w-4 h-4" /> Ga naar logboek
                </button>
              </div>
              <p className="text-amber-700 text-sm mb-3">Beantwoord deze vragen in je logboek van week {gekozenWeek}:</p>
              <ul className="space-y-2">
                {huidigeWeek.reflectie.map((vraag, i) => (
                  <li key={i} className="flex gap-2 text-amber-800 text-sm">
                    <span className="font-bold shrink-0">{i + 1}.</span>
                    <span>{vraag}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Navigatieknoppen */}
            <div className="flex gap-3 mt-6">
              {gekozenWeek > 1 && (
                <button
                  onClick={() => navigeerWeek(gekozenWeek - 1)}
                  className="flex-1 flex items-center justify-center gap-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 rounded-xl transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" /> Week {gekozenWeek - 1}
                </button>
              )}
              {gekozenWeek < totaalWeken && (
                <button
                  onClick={() => navigeerWeek(gekozenWeek + 1)}
                  className="flex-1 flex items-center justify-center gap-1.5 bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-xl transition-colors"
                >
                  Week {gekozenWeek + 1} <ChevronRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}
