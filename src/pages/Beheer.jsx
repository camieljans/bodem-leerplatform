import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../supabase'
import { useAuth } from '../App'
import { haalBeheerProjecten } from '../utils/beheerProjecten'
import { Settings, Plus, LogOut, Edit2, Trash2, FolderOpen, Sprout } from 'lucide-react'

export default function Beheer() {
  const { profile } = useAuth()
  const navigate = useNavigate()
  const [projecten, setProjecten] = useState([])
  const [laden, setLaden] = useState(true)

  useEffect(() => {
    if (profile?.rol !== 'eigenaar') {
      navigate('/')
      return
    }
    laad()
  }, [profile])

  async function laad() {
    setLaden(true)
    const p = await haalBeheerProjecten()
    setProjecten(p)
    setLaden(false)
  }

  async function verwijderProject(p) {
    if (!confirm(`Weet je zeker dat je het project "${p.naam}" en alle bijbehorende weken wilt verwijderen?`)) return
    const { error } = await supabase.from('beheer_projecten').delete().eq('id', p.id)
    if (error) {
      alert('Verwijderen mislukt: ' + error.message)
      return
    }
    laad()
  }

  async function uitloggen() {
    await supabase.auth.signOut()
    navigate('/')
  }

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-4xl mx-auto">

        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-700 text-white flex items-center justify-center shadow">
              <Settings className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-stone-950">Beheer</h1>
              <p className="text-sm text-stone-600">Welkom {profile?.naam}. Hier kun je projecten en opdrachten beheren.</p>
            </div>
          </div>
          <button
            onClick={uitloggen}
            className="flex items-center gap-2 text-stone-500 hover:text-stone-700 text-sm"
          >
            <LogOut className="w-4 h-4" /> Uitloggen
          </button>
        </div>

        {/* Nieuwe project */}
        <button
          onClick={() => navigate('/beheer/nieuw')}
          className="w-full mb-6 flex items-center justify-center gap-2 bg-emerald-700 hover:bg-emerald-800 text-white font-semibold py-4 rounded-2xl transition-colors shadow"
        >
          <Plus className="w-5 h-5" /> Nieuw project toevoegen
        </button>

        {/* Projectlijst */}
        {laden ? (
          <p className="text-stone-500 text-center py-12">Laden...</p>
        ) : projecten.length === 0 ? (
          <div className="cinematic-panel rounded-3xl p-12 text-center">
            <FolderOpen className="w-12 h-12 mx-auto text-stone-300 mb-4" />
            <p className="text-stone-600 font-semibold mb-1">Nog geen projecten aangemaakt</p>
            <p className="text-stone-500 text-sm">Klik hierboven op "Nieuw project toevoegen" om te beginnen.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {projecten.map(p => (
              <div key={p.id} className="cinematic-panel rounded-2xl p-5">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-4 flex-1 min-w-0">
                    <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
                      <Sprout className="w-6 h-6" />
                    </div>
                    <div className="min-w-0">
                      <h2 className="text-lg font-bold text-stone-950 truncate">{p.naam}</h2>
                      {p.ondertitel && <p className="text-sm text-stone-600 italic truncate">{p.ondertitel}</p>}
                      <p className="text-sm text-stone-700 mt-2 line-clamp-2">{p.beschrijving}</p>
                      <p className="text-xs text-stone-400 mt-2">Sleutel: <code>{p.sleutel}</code> · Duur: {p.duur || '—'}</p>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2 shrink-0">
                    <button
                      onClick={() => navigate(`/beheer/project/${p.sleutel}`)}
                      className="flex items-center gap-1.5 px-3 py-2 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 rounded-lg text-sm font-semibold transition-colors"
                    >
                      <Edit2 className="w-3.5 h-3.5" /> Bewerken
                    </button>
                    <button
                      onClick={() => verwijderProject(p)}
                      className="flex items-center gap-1.5 px-3 py-2 bg-red-50 text-red-700 hover:bg-red-100 rounded-lg text-sm font-semibold transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" /> Verwijderen
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
