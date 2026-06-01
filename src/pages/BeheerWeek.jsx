import { useState, useEffect } from 'react'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { supabase } from '../supabase'
import { haalBeheerProject } from '../utils/beheerProjecten'
import { ArrowLeft, Save, AlertCircle, Plus, X } from 'lucide-react'

const TYPES = [
  { key: 'bespreek', label: 'Bespreek', kleur: 'bg-amber-100 text-amber-800' },
  { key: 'doe',      label: 'Doe',      kleur: 'bg-teal-100 text-teal-800' },
  { key: 'onderzoek',label: 'Onderzoek',kleur: 'bg-blue-100 text-blue-800' },
  { key: 'teken',    label: 'Teken',    kleur: 'bg-red-100 text-red-800' },
  { key: 'schrijf',  label: 'Schrijf',  kleur: 'bg-violet-100 text-violet-800' },
  { key: 'denk',     label: 'Denk',     kleur: 'bg-pink-100 text-pink-800' },
]

export default function BeheerWeek() {
  const { sleutel, weekId } = useParams()
  const [params] = useSearchParams()
  const navigate = useNavigate()
  const nieuwNiveau = params.get('niveau') || 'basis'
  const isNieuw = weekId === undefined || weekId === 'nieuw'

  const [project, setProject] = useState(null)
  const [week, setWeek]       = useState(1)
  const [niveau, setNiveau]   = useState(nieuwNiveau)
  const [titel, setTitel]     = useState('')
  const [intro, setIntro]     = useState('')
  const [taken, setTaken]     = useState([])
  const [reflectie, setReflectie] = useState([''])
  const [fout, setFout]       = useState('')
  const [bezig, setBezig]     = useState(false)

  useEffect(() => { laad() }, [sleutel, weekId])

  async function laad() {
    const p = await haalBeheerProject(sleutel)
    setProject(p)
    if (!isNieuw && p) {
      const { data } = await supabase.from('beheer_weken').select('*').eq('id', weekId).single()
      if (data) {
        setWeek(data.week); setNiveau(data.niveau); setTitel(data.titel)
        setIntro(data.intro || ''); setTaken(data.taken || [])
        setReflectie((data.reflectie || []).length ? data.reflectie : [''])
      }
    }
  }

  function voegTaakToe() {
    setTaken([...taken, { type: 'doe', tekst: '' }])
  }
  function wijzigTaak(i, veld, waarde) {
    const kopie = [...taken]; kopie[i][veld] = waarde; setTaken(kopie)
  }
  function verwijderTaak(i) {
    setTaken(taken.filter((_, idx) => idx !== i))
  }

  function wijzigReflectie(i, waarde) {
    const kopie = [...reflectie]; kopie[i] = waarde; setReflectie(kopie)
  }
  function voegReflectieToe() { setReflectie([...reflectie, '']) }
  function verwijderReflectie(i) {
    setReflectie(reflectie.length > 1 ? reflectie.filter((_, idx) => idx !== i) : [''])
  }

  async function opslaan(e) {
    e.preventDefault()
    setFout('')
    if (!titel.trim()) return setFout('Geef de week een titel.')
    if (taken.length === 0 || taken.some(t => !t.tekst.trim())) {
      return setFout('Voeg minimaal één taak toe en zorg dat alle taken tekst hebben.')
    }
    const schoneTaken = taken.map(t => ({ type: t.type, tekst: t.tekst.trim() }))
    const schoneReflectie = reflectie.map(r => r.trim()).filter(Boolean)

    setBezig(true)
    const payload = {
      project_id: project.id, niveau, week: Number(week), titel: titel.trim(),
      intro: intro.trim() || null, taken: schoneTaken, reflectie: schoneReflectie,
      bijgewerkt_op: new Date().toISOString(),
    }
    const op = isNieuw
      ? supabase.from('beheer_weken').insert(payload)
      : supabase.from('beheer_weken').update(payload).eq('id', weekId)
    const { error } = await op
    setBezig(false)
    if (error) {
      if (error.code === '23505') setFout(`Week ${week} (${niveau}) bestaat al — kies een ander weeknummer of bewerk de bestaande.`)
      else setFout('Opslaan mislukt: ' + error.message)
      return
    }
    navigate(`/beheer/project/${sleutel}`)
  }

  if (!project) return <p className="text-stone-500 text-center py-20">Laden...</p>

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-3xl mx-auto">

        <button
          onClick={() => navigate(`/beheer/project/${sleutel}`)}
          className="flex items-center gap-2 text-stone-500 hover:text-stone-700 text-sm mb-6"
        >
          <ArrowLeft className="w-4 h-4" /> Terug naar {project.naam}
        </button>

        <div className="cinematic-panel rounded-3xl p-8">
          <h1 className="text-2xl font-bold text-stone-950 mb-1">
            {isNieuw ? 'Nieuwe week' : 'Week bewerken'}
          </h1>
          <p className="text-sm text-stone-600 mb-6">Project: {project.naam}</p>

          <form onSubmit={opslaan} className="space-y-5">

            {/* Niveau + weeknummer */}
            <div className="grid grid-cols-2 gap-4">
              <Veld label="Niveau *">
                <select value={niveau} onChange={e => setNiveau(e.target.value)} className={inputCls}>
                  <option value="basis">Basis (VMBO-B/K)</option>
                  <option value="midden">Midden (VMBO-TL)</option>
                  <option value="havo">HAVO/VWO</option>
                  <option value="pro">Pro (praktijkonderwijs)</option>
                </select>
              </Veld>
              <Veld label="Weeknummer *">
                <input type="number" min="1" max="20" value={week} onChange={e => setWeek(e.target.value)}
                  className={inputCls} />
              </Veld>
            </div>

            <Veld label="Titel van de week *">
              <input type="text" value={titel} onChange={e => setTitel(e.target.value)}
                className={inputCls} placeholder="Bijv. 'Bouwen: insectenhotel maken'" />
            </Veld>

            <Veld label="Introtekst" hint="Korte intro die leerlingen bovenaan zien (1-2 zinnen)">
              <textarea value={intro} onChange={e => setIntro(e.target.value)}
                rows={2} className={inputCls}
                placeholder="Deze week timmeren we ons insectenhotel van natuurlijke materialen." />
            </Veld>

            {/* Taken */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-semibold text-gray-700">Taken *</label>
                <button type="button" onClick={voegTaakToe}
                  className="flex items-center gap-1 text-emerald-700 hover:text-emerald-900 text-sm font-semibold">
                  <Plus className="w-3.5 h-3.5" /> Taak toevoegen
                </button>
              </div>
              <p className="text-xs text-stone-500 mb-3">Kies een type en typ de instructie voor de leerling.</p>
              <div className="space-y-3">
                {taken.length === 0 && (
                  <p className="text-sm text-stone-400 italic text-center py-4 bg-stone-50 rounded-xl">
                    Nog geen taken — klik "Taak toevoegen" om er een te maken.
                  </p>
                )}
                {taken.map((t, i) => (
                  <div key={i} className="flex gap-2 items-start">
                    <select value={t.type} onChange={e => wijzigTaak(i, 'type', e.target.value)}
                      className="border border-gray-200 rounded-xl px-3 py-3 text-sm font-semibold bg-white focus:outline-none focus:ring-2 focus:ring-emerald-400 shrink-0">
                      {TYPES.map(tp => <option key={tp.key} value={tp.key}>{tp.label}</option>)}
                    </select>
                    <textarea value={t.tekst} onChange={e => wijzigTaak(i, 'tekst', e.target.value)}
                      rows={2} className={inputCls + ' flex-1'}
                      placeholder="Beschrijf de taak..." />
                    <button type="button" onClick={() => verwijderTaak(i)}
                      className="p-3 text-stone-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors shrink-0"
                      title="Taak verwijderen">
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Reflectie */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-semibold text-gray-700">Reflectievragen</label>
                <button type="button" onClick={voegReflectieToe}
                  className="flex items-center gap-1 text-emerald-700 hover:text-emerald-900 text-sm font-semibold">
                  <Plus className="w-3.5 h-3.5" /> Vraag toevoegen
                </button>
              </div>
              <p className="text-xs text-stone-500 mb-3">Vragen die leerlingen aan het eind beantwoorden of bespreken.</p>
              <div className="space-y-2">
                {reflectie.map((r, i) => (
                  <div key={i} className="flex gap-2">
                    <input type="text" value={r} onChange={e => wijzigReflectie(i, e.target.value)}
                      className={inputCls + ' flex-1'} placeholder={`Reflectievraag ${i + 1}`} />
                    {reflectie.length > 1 && (
                      <button type="button" onClick={() => verwijderReflectie(i)}
                        className="p-3 text-stone-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors">
                        <X className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {fout && (
              <div className="flex items-start gap-2 bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-3 text-sm">
                <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" /> {fout}
              </div>
            )}

            <button type="submit" disabled={bezig}
              className="w-full flex items-center justify-center gap-2 bg-emerald-700 hover:bg-emerald-800 disabled:opacity-50 text-white font-semibold py-3 rounded-xl transition-colors">
              <Save className="w-4 h-4" /> {bezig ? 'Opslaan...' : 'Week opslaan'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

function Veld({ label, hint, children }) {
  return (
    <div>
      <label className="block text-sm font-semibold text-gray-700 mb-1">{label}</label>
      {hint && <p className="text-xs text-stone-500 mb-2">{hint}</p>}
      {children}
    </div>
  )
}

const inputCls = 'w-full border border-gray-200 rounded-xl px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-emerald-400 bg-white'
