import { useNavigate, useLocation } from 'react-router-dom'
import { supabase } from '../supabase'
import { useAuth } from '../App'
import { Home, ClipboardList, BookOpen, MessageSquare, Users, LogOut, Worm, Sprout, Microscope, BookA, Trophy, Map, GraduationCap } from 'lucide-react'

const projectInfo = {
  wormenhotel:    { icon: Worm,   naam: 'Wormenhotel',             kleur: 'text-emerald-400' },
  keuringsdienst: { icon: Sprout, naam: 'Keuringsdienst',          kleur: 'text-teal-400' },
  wilgenvlechten: { icon: Map,    naam: 'Wilgenvlechten',           kleur: 'text-lime-400' },
}

const leerlingLinks = [
  { pad: '/dashboard',   label: 'Home',         icon: Home },
  { pad: '/briefing',    label: 'Project',      icon: Map },
  { pad: '/opdrachten',  label: 'Opdrachten',   icon: ClipboardList },
  { pad: '/lessen',      label: 'Lessen',       icon: GraduationCap },
  { pad: '/observaties', label: 'Observaties',  icon: Microscope },
  { pad: '/logboek',     label: 'Logboek',      icon: BookOpen },
  { pad: '/eindproduct', label: 'Eindproduct',  icon: Trophy },
  { pad: '/vragen',      label: 'Vragen',       icon: MessageSquare },
  { pad: '/woordenlijst',label: 'Woordenlijst', icon: BookA },
]

export default function Navbar() {
  const { profile, project, selectProject } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const info = projectInfo[project] || { icon: Worm, naam: 'Circulair Leerplatform', kleur: 'text-emerald-400' }
  const ProjectIcon = info.icon

  async function uitloggen() {
    await supabase.auth.signOut()
    navigate('/')
  }

  const isBegeleider = profile?.rol === 'begeleider'

  const links = isBegeleider
    ? [{ pad: '/begeleider', label: 'Overzicht', icon: Users }]
    : leerlingLinks

  return (
    <aside
      className="fixed top-0 left-0 h-full w-52 text-white flex flex-col z-40 no-print"
      style={{
        background:
          'radial-gradient(circle at 20% 0%, rgba(245, 211, 141, 0.14), transparent 13rem), linear-gradient(180deg, #07150d 0%, #102116 48%, #18351f 100%)',
        boxShadow: '18px 0 55px rgba(17, 35, 22, 0.24)',
      }}
    >

      {/* Logo / projectnaam */}
      <button
        onClick={() => navigate('/dashboard')}
        className="flex items-center gap-2.5 px-5 py-5 hover:opacity-80 transition-opacity shrink-0 border-b border-white/10"
      >
        <div className="w-7 h-7 rounded-lg bg-emerald-400/15 ring-1 ring-emerald-200/15 flex items-center justify-center shrink-0">
          <ProjectIcon className={`w-4 h-4 ${info.kleur}`} />
        </div>
        <span className="font-semibold text-sm text-white leading-tight">{info.naam}</span>
      </button>

      {/* Projectwisselaar voor iedereen */}
      {(
        <div className="px-3 pt-3 pb-1 border-b border-white/10">
          <p className="text-[10px] text-emerald-100/40 uppercase tracking-wider px-1 mb-1.5">Project wisselen</p>
          {Object.entries(projectInfo).map(([key, proj]) => {
            const Icon = proj.icon
            const actief = project === key
            return (
              <button
                key={key}
                onClick={() => { selectProject(key); navigate('/dashboard') }}
                className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium transition-all mb-0.5 ${
                  actief
                    ? 'bg-emerald-300/15 text-emerald-50 ring-1 ring-emerald-200/10'
                    : 'text-emerald-100/58 hover:text-white hover:bg-white/10'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 shrink-0 ${actief ? proj.kleur : ''}`} />
                {proj.naam}
              </button>
            )
          })}
        </div>
      )}

      {/* Navigatielinks */}
      <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
        {links.map(link => {
          const Icon = link.icon
          const actief = location.pathname === link.pad
          return (
            <button
              key={link.pad}
              onClick={() => navigate(link.pad)}
              className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm font-medium transition-all text-left ${
                actief
                  ? 'bg-emerald-300/15 text-white ring-1 ring-emerald-200/10'
                  : 'text-emerald-100/62 hover:text-white hover:bg-white/10'
              }`}
            >
              <Icon className="w-4 h-4 shrink-0" />
              {link.label}
            </button>
          )
        })}
      </nav>

      {/* Gebruiker + uitloggen */}
      <div className="px-3 py-4 border-t border-white/10 space-y-1">
        <p className="text-xs text-emerald-100/45 px-3 truncate">{profile?.naam}</p>
        <button
          onClick={uitloggen}
          className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm font-medium text-emerald-100/58 hover:text-white hover:bg-white/10 transition-all"
        >
          <LogOut className="w-4 h-4 shrink-0" />
          Uitloggen
        </button>
      </div>
    </aside>
  )
}
