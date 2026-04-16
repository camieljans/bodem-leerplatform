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
import Navbar from './components/Navbar'
import NatuurAchtergrond from './components/NatuurAchtergrond'

export const AuthContext = createContext(null)

export function useAuth() {
  return useContext(AuthContext)
}

function ProtectedRoute({ children }) {
  const { user, loading } = useAuth()
  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-green-50">
      <div className="text-center">
        <div className="text-5xl mb-4 animate-bounce">🌱</div>
        <p className="text-green-700 font-medium">Laden...</p>
      </div>
    </div>
  )
  if (!user) return <Navigate to="/login" />
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
        {user && toonNatuur && <NatuurAchtergrond />}
        {user && <Navbar />}
        <Routes>
          <Route path="/" element={<Welkom />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/opdrachten" element={<ProtectedRoute><Opdrachten /></ProtectedRoute>} />
          <Route path="/lessen" element={<ProtectedRoute><Lessen /></ProtectedRoute>} />
          <Route path="/logboek" element={<ProtectedRoute><Logboek /></ProtectedRoute>} />
          <Route path="/begeleider" element={<ProtectedRoute><Begeleider /></ProtectedRoute>} />
          <Route path="/vragen" element={<ProtectedRoute><Vragen /></ProtectedRoute>} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </AuthContext.Provider>
  )
}
