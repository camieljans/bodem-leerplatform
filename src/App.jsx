import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useEffect, useState, createContext, useContext } from 'react'
import { supabase } from './supabase'
import Welkom from './pages/Welkom'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Lessen from './pages/Lessen'
import Opdrachten from './pages/Opdrachten'
import Logboek from './pages/Logboek'
import Begeleider from './pages/Begeleider'
import Vragen from './pages/Vragen'
import Briefing from './pages/Briefing'
import Observaties from './pages/Observaties'
import Woordenlijst from './pages/Woordenlijst'
import Eindproduct from './pages/Eindproduct'
import Materialen from './pages/Materialen'
import Handleiding from './pages/Handleiding'
import ProjectKeuze from './pages/ProjectKeuze'
import CinematicPreview from './pages/CinematicPreview'
import BeheerLogin from './pages/BeheerLogin'
import Beheer from './pages/Beheer'
import BeheerNieuwProject from './pages/BeheerNieuwProject'
import BeheerProject from './pages/BeheerProject'
import BeheerWeek from './pages/BeheerWeek'
import BeheerIngebouwd from './pages/BeheerIngebouwd'
import Navbar from './components/Navbar'
import NatuurAchtergrond from './components/NatuurAchtergrond'

export const AuthContext = createContext(null)

export function useAuth() {
  return useContext(AuthContext)
}

function ProtectedRoute({ children }) {
  const { user, profile, project, loading } = useAuth()
  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-green-50">
      <div className="text-center">
        <div className="mb-4 flex justify-center animate-bounce">
          <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M7 20h10"/><path d="M10 20c5.5-2.5.8-6.4 3-9"/><path d="M9.5 9.4c1.1.8 1.8 2.2 2.3 3.7-2 .4-3.5.4-4.8-.3-1.2-.6-2.3-1.9-2-3.4 1.3 0 2.8.5 4.5 0z"/><path d="M14.1 6a7 7 0 0 0-1.1 4c1.9-.1 3.3-.6 4.3-1.4 1-1 1.6-2.3 1.2-3.7-1.2.1-2.7.6-4.4 1.1z"/></svg>
        </div>
        <p className="text-green-700 font-medium">Laden...</p>
      </div>
    </div>
  )
  if (!user) return <Navigate to="/login" />
  const isBegeleider = profile?.rol === 'begeleider'
  const isEigenaar  = profile?.rol === 'eigenaar'
  if (isEigenaar) return <Navigate to="/beheer" />
  if (!isBegeleider && !project) return <Navigate to="/projectkeuze" />
  return children
}

function BeheerRoute({ children }) {
  const { user, profile, loading } = useAuth()
  if (loading) return null
  if (!user) return <Navigate to="/beheer-login" />
  if (profile?.rol !== 'eigenaar') return <Navigate to="/" />
  return children
}

export default function App() {
  const [user, setUser] = useState(null)
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)
  const [project, setProject] = useState(localStorage.getItem('project') || null)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
      if (session?.user) loadProfile(session.user.id)
      else setLoading(false)
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
      if (session?.user) loadProfile(session.user.id)
      else { setProfile(null); setLoading(false) }
    })

    return () => subscription.unsubscribe()
  }, [])

  async function loadProfile(userId) {
    const { data } = await supabase.from('profiles').select('*').eq('id', userId).single()
    setProfile(data)
    // Geen automatische project-toewijzing — leerling kiest zelf via /projectkeuze
    setLoading(false)
  }

  function selectProject(p) {
    setProject(p)
    localStorage.setItem('project', p)
  }

  const toonNatuur = profile?.niveau !== 'pro'

  return (
    <AuthContext.Provider value={{ user, profile, loading, project, selectProject, loadProfile }}>
      <BrowserRouter>
        <NatuurAchtergrond />
        {(() => {
          const isEigenaar = profile?.rol === 'eigenaar'
          const toonNavbar = !isEigenaar && ((user && project) || (user && profile?.rol === 'begeleider'))
          return (
        <div className={toonNavbar ? 'flex min-h-screen' : ''}>
          {toonNavbar ? <Navbar /> : null}
          <div className={toonNavbar ? 'ml-52 flex-1 min-w-0' : ''}>
        <Routes>
          <Route path="/" element={<Welkom />} />
          <Route path="/cinematic-preview" element={<CinematicPreview />} />
          <Route path="/login" element={<Login />} />
          <Route path="/beheer-login" element={<BeheerLogin />} />
          <Route path="/beheer" element={<BeheerRoute><Beheer /></BeheerRoute>} />
          <Route path="/beheer/nieuw" element={<BeheerRoute><BeheerNieuwProject /></BeheerRoute>} />
          <Route path="/beheer/project/:sleutel" element={<BeheerRoute><BeheerProject /></BeheerRoute>} />
          <Route path="/beheer/project/:sleutel/week/nieuw" element={<BeheerRoute><BeheerWeek /></BeheerRoute>} />
          <Route path="/beheer/project/:sleutel/week/:weekId" element={<BeheerRoute><BeheerWeek /></BeheerRoute>} />
          <Route path="/beheer/ingebouwd/:sleutel" element={<BeheerRoute><BeheerIngebouwd /></BeheerRoute>} />
          <Route path="/projectkeuze" element={user ? <ProjectKeuze /> : <Navigate to="/login" />} />
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/opdrachten" element={<ProtectedRoute><Opdrachten /></ProtectedRoute>} />
          <Route path="/lessen" element={<ProtectedRoute><Lessen /></ProtectedRoute>} />
          <Route path="/logboek" element={<ProtectedRoute><Logboek /></ProtectedRoute>} />
          <Route path="/begeleider" element={<ProtectedRoute><Begeleider /></ProtectedRoute>} />
          <Route path="/vragen" element={<ProtectedRoute><Vragen /></ProtectedRoute>} />
          <Route path="/briefing" element={<ProtectedRoute><Briefing /></ProtectedRoute>} />
          <Route path="/observaties" element={<ProtectedRoute><Observaties /></ProtectedRoute>} />
          <Route path="/woordenlijst" element={<ProtectedRoute><Woordenlijst /></ProtectedRoute>} />
          <Route path="/eindproduct" element={<ProtectedRoute><Eindproduct /></ProtectedRoute>} />
          <Route path="/materialen" element={<ProtectedRoute><Materialen /></ProtectedRoute>} />
          <Route path="/handleiding" element={<ProtectedRoute><Handleiding /></ProtectedRoute>} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
          </div>
        </div>
          )
        })()}
      </BrowserRouter>
    </AuthContext.Provider>
  )
}
