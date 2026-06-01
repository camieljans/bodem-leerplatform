import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { supabase } from '../supabase'
import { haalBeheerProject, haalBeheerWeken } from '../utils/beheerProjecten'
import ProjectFormTabs, { dbNaarVorm, vormNaarPayload } from '../components/ProjectFormTabs'
import {
  ArrowLeft, Plus, Edit2, Trash2, GraduationCap, Save, AlertCircle,
  CheckCircle, FileText, ClipboardList,
} from 'lucide-react'

const NIVEAUS = [
  { key: 'basis',  label: 'Basis (VMBO-B/K)' },
  { key: 'midden', label: 'Midden (VMBO-TL)' },
  { key: 'havo',   label: 'HAVO/VWO' },
  { key: 'pro',    label: 'Pro (praktijkonderwijs)' },
]

export default function BeheerProject() {
  const { sleutel } = useParams()
  const navigate = useNavigate()
  const [tab, setTab] = useState('weken')
  const [project, setProject] = useState(null)
  const [weken, setWeken] = useState([])
  const [niveau, setNiveau] = useState('basis')
  const [laden, setLaden] = useState(true)

  useEffect(() => { laad() }, [sleutel])
  useEffect(() => { if (project) laadWeken() }, [project, niveau])

  async function laad() {
    setLaden(true)
    const p = await haalBeheerProject(sleutel)
    setProject(p)
    setLaden(false)
  }
  async function laadWeken() {
    const w = await haalBeheerWeken(project.id, niveau)
    setWeken(w)
  }
  async function verwijderWeek(week) {
    if (!confirm(`Week ${week.week} (${week.titel}) verwijderen?`)) return
    const { error } = await supabase.from('beheer_weken').delete().eq('id', week.id)
    if (error) { alert('Mislukt: ' + error.message); return }
    laadWeken()
  }

  if (laden) return <p className="text-stone-500 text-center py-20">Laden...</p>
  if (!project) return <p className="text-stone-500 text-center py-20">Project niet gevonden.</p>

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-4xl mx-auto">

        <button onClick={() => navigate('/beheer')}
          className="flex items-center gap-2 text-stone-500 hover:text-stone-700 text-sm mb-6">
          <ArrowLeft className="w-4 h-4" /> Terug naar overzicht
        </button>

        <div className="cinematic-panel rounded-3xl p-6 mb-6">
          <h1 className="text-2xl font-bold text-stone-950">{project.naam}</h1>
          {project.ondertitel && <p className="text-stone-600 italic mt-1">{project.ondertitel}</p>}
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          <TabKnop actief={tab === 'projectinfo'} icon={FileText} onClick={() => setTab('projectinfo')}>
            Projectinfo
          </TabKnop>
          <TabKnop actief={tab === 'weken'} icon={ClipboardList} onClick={() => setTab('weken')}>
            Weken
          </TabKnop>
        </div>

        {tab === 'projectinfo' && (
          <ProjectInfoBewerken project={project} onUpdated={p => setProject(p)} />
        )}

        {tab === 'weken' && (
          <div>
            {/* Niveau selector */}
            <div className="bg-white rounded-2xl shadow p-5 mb-5">
              <p className="text-sm font-semibold text-gray-600 mb-3 flex items-center gap-1.5">
                <GraduationCap className="w-4 h-4" /> Niveau
              </p>
              <div className="flex flex-wrap gap-2">
                {NIVEAUS.map(n => (
                  <button key={n.key} onClick={() => setNiveau(n.key)}
                    className={`px-4 py-2 rounded-xl font-semibold text-sm transition-all ${
                      niveau === n.key ? 'bg-emerald-600 text-white shadow' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}>
                    {n.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Toevoegen */}
            <button
              onClick={() => navigate(`/beheer/project/${sleutel}/week/nieuw?niveau=${niveau}`)}
              className="w-full mb-4 flex items-center justify-center gap-2 bg-emerald-700 hover:bg-emerald-800 text-white font-semibold py-3 rounded-xl transition-colors shadow"
            >
              <Plus className="w-4 h-4" /> Nieuwe week toevoegen ({niveau})
            </button>

            {/* Weken lijst */}
            {weken.length === 0 ? (
              <p className="text-stone-500 text-center py-10 cinematic-panel rounded-2xl">
                Nog geen weken voor dit niveau.
              </p>
            ) : (
              <div className="space-y-3">
                {weken.map(w => (
                  <div key={w.id} className="cinematic-panel rounded-2xl p-5">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-baseline gap-2 mb-1">
                          <span className="text-emerald-700 font-bold">Week {w.week}</span>
                          <span className="text-stone-900 font-semibold">— {w.titel}</span>
                        </div>
                        {w.intro && <p className="text-sm text-stone-600 mb-2 italic">{w.intro}</p>}
                        <p className="text-xs text-stone-500">
                          {(w.taken || []).length} taken · {(w.reflectie || []).length} reflectievragen
                        </p>
                      </div>
                      <div className="flex flex-col gap-2 shrink-0">
                        <button onClick={() => navigate(`/beheer/project/${sleutel}/week/${w.id}`)}
                          className="flex items-center gap-1.5 px-3 py-2 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 rounded-lg text-sm font-semibold transition-colors">
                          <Edit2 className="w-3.5 h-3.5" /> Bewerken
                        </button>
                        <button onClick={() => verwijderWeek(w)}
                          className="flex items-center gap-1.5 px-3 py-2 bg-red-50 text-red-700 hover:bg-red-100 rounded-lg text-sm font-semibold transition-colors">
                          <Trash2 className="w-3.5 h-3.5" /> Verwijderen
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

// ─── Projectinfo bewerken ──────────────────────────────────────────────────
function ProjectInfoBewerken({ project, onUpdated }) {
  const [vorm, setVorm] = useState(() => dbNaarVorm(project))
  const [bezig, setBezig] = useState(false)
  const [fout, setFout] = useState('')
  const [opgeslagen, setOpgeslagen] = useState(false)

  async function opslaan() {
    setFout('')
    if (!vorm.naam.trim()) return setFout('Geef het project een naam.')
    if (!vorm.beschrijving.trim()) return setFout('Vul een korte beschrijving in.')
    setBezig(true)
    const payload = { ...vormNaarPayload(vorm), bijgewerkt_op: new Date().toISOString() }
    const { data, error } = await supabase
      .from('beheer_projecten')
      .update(payload)
      .eq('id', project.id)
      .select()
      .single()
    setBezig(false)
    if (error) { setFout('Opslaan mislukt: ' + error.message); return }
    onUpdated(data)
    setOpgeslagen(true)
    setTimeout(() => setOpgeslagen(false), 2500)
  }

  return (
    <div className="cinematic-panel rounded-3xl p-8">
      <div className="flex items-start justify-between mb-1 gap-4">
        <h2 className="text-xl font-bold text-stone-950">Projectinfo bewerken</h2>
        {opgeslagen && (
          <span className="text-xs text-emerald-700 font-semibold flex items-center gap-1 mt-2 shrink-0">
            <CheckCircle className="w-3.5 h-3.5" /> Opgeslagen
          </span>
        )}
      </div>
      <p className="text-sm text-stone-600 mb-6">Wijzigingen worden pas opgeslagen als je hieronder op "Opslaan" klikt.</p>

      <ProjectFormTabs vorm={vorm} setVorm={setVorm} />

      {fout && (
        <div className="mt-6 flex items-start gap-2 bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-3 text-sm">
          <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" /> {fout}
        </div>
      )}

      <button onClick={opslaan} disabled={bezig}
        className="mt-6 w-full flex items-center justify-center gap-2 bg-emerald-700 hover:bg-emerald-800 disabled:opacity-50 text-white font-semibold py-3 rounded-xl transition-colors">
        <Save className="w-4 h-4" /> {bezig ? 'Opslaan...' : 'Wijzigingen opslaan'}
      </button>
    </div>
  )
}

function TabKnop({ actief, icon: Icon, onClick, children }) {
  return (
    <button onClick={onClick}
      className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
        actief ? 'bg-emerald-700 text-white' : 'bg-white text-stone-600 hover:bg-stone-100'
      }`}>
      <Icon className="w-4 h-4" /> {children}
    </button>
  )
}
