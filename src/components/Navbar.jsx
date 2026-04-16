import { useNavigate, useLocation } from 'react-router-dom'
import { supabase } from '../supabase'
import { useAuth } from '../App'

const projectInfo = {
  wormenhotel: { emoji: '🪱', naam: 'Wormenhotel', bg: 'bg-green-700' },
  keuringsdienst: { emoji: '🪴', naam: 'Keuringsdienst', bg: 'bg-cyan-700' },
}

export default function Navbar() {
  const { profile, project } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const info = projectInfo[project] || { emoji: '🌱', naam: 'Bodem', bg: 'bg-green-700' }

  async function uitloggen() {
    await supabase.auth.signOut()
    navigate('/')
  }

  const isBegeleider = profile?.rol === 'begeleider'

  const links = isBegeleider
    ? [{ pad: '/begeleider', label: '📋 Overzicht' }]
    : [
        { pad: '/dashboard',   label: '🏠 Home' },
        { pad: '/opdrachten',  label: '📋 Opdrachten' },
        { pad: '/logboek',     label: '📓 Logboek' },
        { pad: '/vragen',      label: '💬 Vragen' },
        { pad: '/lessen',      label: '📚 Extra leermateriaal' },
      ]

  return (
    <nav className={`${info.bg} text-white px-4 py-3`}>
      <div className="max-w-4xl mx-auto flex items-center justify-between gap-4">
        <button
          onClick={() => navigate('/dashboard')}
          className="font-bold text-lg flex items-center gap-2 hover:opacity-80 transition-opacity"
        >
          {info.emoji} {info.naam}
        </button>

        <div className="flex items-center gap-1">
          {links.map(link => (
            <button
              key={link.pad}
              onClick={() => navigate(link.pad)}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                location.pathname === link.pad
                  ? 'bg-white/20'
                  : 'hover:bg-white/10'
              }`}
            >
              {link.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <span className="text-sm opacity-75 hidden sm:block">{profile?.naam}</span>
          <button
            onClick={uitloggen}
            className="text-sm bg-white/10 hover:bg-white/20 px-3 py-2 rounded-lg transition-all"
          >
            Uitloggen
          </button>
        </div>
      </div>
    </nav>
  )
}
