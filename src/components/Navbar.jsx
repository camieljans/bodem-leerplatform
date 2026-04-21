import { useNavigate, useLocation } from 'react-router-dom'
import { supabase } from '../supabase'
import { useAuth } from '../App'
import { Home, ClipboardList, BookOpen, MessageSquare, GraduationCap, Users, LogOut, Worm, Sprout } from 'lucide-react'

const projectInfo = {
  wormenhotel:    { icon: Worm,   naam: 'Wormenhotel' },
  keuringsdienst: { icon: Sprout, naam: 'Keuringsdienst' },
}

export default function Navbar() {
  const { profile, project } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const info = projectInfo[project] || { icon: Leaf, naam: 'Bodem Leerplatform' }
  const ProjectIcon = info.icon

  async function uitloggen() {
    await supabase.auth.signOut()
    navigate('/')
  }

  const isBegeleider = profile?.rol === 'begeleider'

  const links = isBegeleider
    ? [{ pad: '/begeleider', label: 'Overzicht', icon: Users }]
    : [
        { pad: '/dashboard',  label: 'Home',          icon: Home },
        { pad: '/opdrachten', label: 'Opdrachten',    icon: ClipboardList },
        { pad: '/logboek',    label: 'Logboek',       icon: BookOpen },
        { pad: '/vragen',     label: 'Vragen',        icon: MessageSquare },
        { pad: '/lessen',     label: 'Leermateriaal', icon: GraduationCap },
      ]

  return (
    <nav className="bg-slate-900 text-white px-6 py-3.5 no-print">
      <div className="max-w-5xl mx-auto flex items-center justify-between gap-4">
        <button
          onClick={() => navigate('/dashboard')}
          className="flex items-center gap-2.5 font-semibold text-base hover:opacity-80 transition-opacity shrink-0"
        >
          <div className="w-7 h-7 rounded-lg bg-emerald-500/20 flex items-center justify-center">
            <ProjectIcon className="w-4 h-4 text-emerald-400" />
          </div>
          <span className="hidden sm:block text-white">{info.naam}</span>
        </button>

        <div className="flex items-center gap-0.5">
          {links.map(link => {
            const Icon = link.icon
            const actief = location.pathname === link.pad
            return (
              <button
                key={link.pad}
                onClick={() => navigate(link.pad)}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                  actief
                    ? 'bg-white/15 text-white'
                    : 'text-slate-400 hover:text-white hover:bg-white/10'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="hidden md:block">{link.label}</span>
              </button>
            )
          })}
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <span className="text-sm text-slate-400 hidden lg:block">{profile?.naam}</span>
          <button
            onClick={uitloggen}
            className="flex items-center gap-1.5 text-sm text-slate-400 hover:text-white px-3 py-2 rounded-lg hover:bg-white/10 transition-all"
          >
            <LogOut className="w-4 h-4" />
            <span className="hidden sm:block">Uitloggen</span>
          </button>
        </div>
      </div>
    </nav>
  )
}
