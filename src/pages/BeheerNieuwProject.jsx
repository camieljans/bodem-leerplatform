import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../supabase'
import { maakSleutel } from '../utils/beheerProjecten'
import ProjectFormTabs, { LEEG_PROJECT, vormNaarPayload } from '../components/ProjectFormTabs'
import { ArrowLeft, Save, AlertCircle, RotateCcw, CheckCircle } from 'lucide-react'

const CONCEPT_KEY = 'beheer-nieuw-project-concept-v1'

export default function BeheerNieuwProject() {
  const navigate = useNavigate()
  const [vorm, setVorm] = useState(() => {
    try {
      const opg = JSON.parse(localStorage.getItem(CONCEPT_KEY) || 'null')
      if (opg && typeof opg === 'object') return { ...LEEG_PROJECT, ...opg }
    } catch {}
    return LEEG_PROJECT
  })
  const [fout, setFout] = useState('')
  const [bezig, setBezig] = useState(false)
  const [conceptOpgeslagen, setConceptOpgeslagen] = useState(false)

  // Auto-opslaan in localStorage
  useEffect(() => {
    if (vorm === LEEG_PROJECT) return
    try {
      localStorage.setItem(CONCEPT_KEY, JSON.stringify(vorm))
      setConceptOpgeslagen(true)
      const t = setTimeout(() => setConceptOpgeslagen(false), 1500)
      return () => clearTimeout(t)
    } catch {}
  }, [vorm])

  const heeftConcept = vorm.naam || vorm.beschrijving || vorm.themas.length > 0

  function wisConcept() {
    if (!confirm('Concept wissen en opnieuw beginnen?')) return
    localStorage.removeItem(CONCEPT_KEY)
    setVorm(LEEG_PROJECT)
  }

  async function opslaan() {
    setFout('')
    if (!vorm.naam.trim()) return setFout('Geef het project een naam.')
    if (!vorm.beschrijving.trim()) return setFout('Vul een korte beschrijving in (voor het keuze-kaartje).')

    setBezig(true)
    const sleutel = maakSleutel(vorm.naam)
    const payload = { sleutel, ...vormNaarPayload(vorm) }
    const { data, error } = await supabase
      .from('beheer_projecten')
      .insert(payload)
      .select()
      .single()
    setBezig(false)
    if (error) {
      if (error.code === '23505') setFout('Er bestaat al een project met deze naam — kies een andere naam.')
      else setFout('Opslaan mislukt: ' + error.message)
      return
    }
    // Concept wissen na succes
    localStorage.removeItem(CONCEPT_KEY)
    navigate(`/beheer/project/${data.sleutel}`)
  }

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-3xl mx-auto">

        <button onClick={() => navigate('/beheer')}
          className="flex items-center gap-2 text-stone-500 hover:text-stone-700 text-sm mb-6">
          <ArrowLeft className="w-4 h-4" /> Terug naar overzicht
        </button>

        <div className="cinematic-panel rounded-3xl p-8">
          <div className="flex items-start justify-between mb-1 gap-4">
            <h1 className="text-2xl font-bold text-stone-950">Nieuw project</h1>
            {conceptOpgeslagen ? (
              <span className="text-xs text-emerald-700 font-semibold flex items-center gap-1 mt-2 shrink-0">
                <CheckCircle className="w-3.5 h-3.5" /> Concept bewaard
              </span>
            ) : heeftConcept ? (
              <button onClick={wisConcept}
                className="text-xs text-stone-500 hover:text-red-600 font-semibold flex items-center gap-1 mt-2 shrink-0">
                <RotateCcw className="w-3.5 h-3.5" /> Concept wissen
              </button>
            ) : null}
          </div>
          <p className="text-sm text-stone-600 mb-6">
            Alle velden zijn optioneel behalve naam en beschrijving — vul aan wat je hebt en sla op.
            Je voortgang wordt automatisch in deze browser bewaard, ook als je afsluit en later terugkomt.
          </p>

          <ProjectFormTabs vorm={vorm} setVorm={setVorm} />

          {fout && (
            <div className="mt-6 flex items-start gap-2 bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-3 text-sm">
              <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" /> {fout}
            </div>
          )}

          <button onClick={opslaan} disabled={bezig}
            className="mt-6 w-full flex items-center justify-center gap-2 bg-emerald-700 hover:bg-emerald-800 disabled:opacity-50 text-white font-semibold py-3 rounded-xl transition-colors">
            <Save className="w-4 h-4" /> {bezig ? 'Opslaan...' : 'Project aanmaken'}
          </button>
        </div>
      </div>
    </div>
  )
}
