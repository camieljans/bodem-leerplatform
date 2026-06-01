import { useNavigate } from 'react-router-dom'
import { useAuth } from '../App'
import { supabase } from '../supabase'
import { Worm, Sprout, LogOut } from 'lucide-react'

const projecten = [
  {
    key: 'wormenhotel',
    naam: 'Het Wormenhotel',
    beschrijving: 'Bouw een wormenhotel en maak van keukenafval compost. Ontdek hoe wormen de bodem gezond houden.',
    icon: Worm,
    kleur: 'emerald',
  },
  {
    key: 'keuringsdienst',
    naam: 'Keuringsdienst van Waarde',
    beschrijving: 'Doe een echt experiment met drie potten radijs: één zonder toevoeging, één met kunstmest en één met compostthee. Welke werkt het best?',
    icon: Sprout,
    kleur: 'teal',
  },
]

const kleurMap = {
  emerald: {
    card: 'hover:border-emerald-300',
    icon: 'bg-emerald-100/80 text-emerald-800',
    btn: 'bg-emerald-700 hover:bg-emerald-800',
    badge: 'bg-emerald-100 text-emerald-700',
  },
  teal: {
    card: 'hover:border-emerald-300',
    icon: 'bg-emerald-100/80 text-emerald-800',
    btn: 'bg-emerald-700 hover:bg-emerald-800',
    badge: 'bg-teal-100 text-teal-700',
  },
}

export default function ProjectKeuze() {
  const { profile, selectProject } = useAuth()
  const navigate = useNavigate()

  function kies(key) {
    selectProject(key)
    navigate('/dashboard')
  }

  async function uitloggen() {
    await supabase.auth.signOut()
    navigate('/')
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 page-enter">
      <div className="w-full max-w-2xl">

        {/* Header */}
        <div className="text-center mb-10">
          <div className="w-16 h-16 rounded-3xl bg-emerald-900/90 text-emerald-100 flex items-center justify-center mx-auto mb-5 shadow-xl shadow-emerald-900/20">
            <Sprout className="w-8 h-8" />
          </div>
          <h1 className="text-4xl font-bold text-stone-950 mb-2">
            Welkom{profile?.naam ? `, ${profile.naam.split(' ')[0]}` : ''}!
          </h1>
          <p className="text-stone-600 text-lg">Kies het project waar jij vandaag mee verder gaat.</p>
        </div>

        {/* Projectkaarten */}
        <div className="flex flex-col gap-4 mb-8">
          {projecten.map(p => {
            const k = kleurMap[p.kleur]
            const Icon = p.icon
            return (
              <button
                key={p.key}
                onClick={() => kies(p.key)}
                className={`w-full text-left cinematic-card rounded-3xl p-6 transition-all ${k.card}`}
              >
                <div className="flex items-center gap-5">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 ${k.icon}`}>
                    <Icon className="w-7 h-7" />
                  </div>
                  <div className="flex-1">
                    <h2 className="text-xl font-bold text-stone-950 mb-1">{p.naam}</h2>
                    <p className="text-stone-600 text-sm leading-relaxed">{p.beschrijving}</p>
                  </div>
                  <div className={`shrink-0 text-sm font-semibold px-4 py-2 rounded-xl text-white ${k.btn}`}>
                    Kies dit →
                  </div>
                </div>
              </button>
            )
          })}
        </div>

        {/* Uitloggen */}
        <div className="text-center">
          <button
            onClick={uitloggen}
            className="inline-flex items-center gap-2 text-stone-500 hover:text-stone-700 text-sm transition-colors"
          >
            <LogOut className="w-4 h-4" /> Uitloggen
          </button>
        </div>

      </div>
    </div>
  )
}
