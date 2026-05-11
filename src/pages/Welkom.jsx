import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { useAuth } from '../App'
import { Sprout, ChevronRight, LogIn } from 'lucide-react'

export default function Welkom() {
  const { user, profile } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (user && profile) navigate('/dashboard')
  }, [user, profile])

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 page-enter">
      <div className="max-w-md w-full text-center cinematic-panel rounded-[2rem] p-8">

        {/* Logo */}
        <div className="w-20 h-20 rounded-3xl bg-emerald-900 flex items-center justify-center mx-auto mb-8 shadow-xl shadow-emerald-900/20">
          <Sprout className="w-10 h-10 text-emerald-100" />
        </div>

        {/* Titel */}
        <h1 className="text-4xl font-bold text-stone-950 mb-3 tracking-tight">
          Circulair Leerplatform
        </h1>
        <p className="text-stone-600 text-lg mb-10 leading-relaxed">
          Ontdek de wereld onder je voeten.<br />
          Doe mee aan een spannend project over bodem, natuur en duurzaamheid.
        </p>

        {/* Knoppen */}
        <div className="flex flex-col gap-3">
          <button
            onClick={() => navigate('/login?tab=registreer')}
            className="w-full flex items-center justify-center gap-2 bg-emerald-800 hover:bg-emerald-900 text-white font-semibold py-4 px-6 rounded-2xl transition-colors shadow-sm text-base"
          >
            Registreer en doe mee <ChevronRight className="w-5 h-5" />
          </button>
          <button
            onClick={() => navigate('/login?tab=login')}
            className="w-full flex items-center justify-center gap-2 bg-white/80 hover:bg-white text-stone-700 font-semibold py-4 px-6 rounded-2xl border border-white transition-colors text-base"
          >
            <LogIn className="w-5 h-5" /> Ik heb al een account
          </button>
        </div>

        <p className="text-stone-500 text-xs mt-8">
          Na het inloggen kies je zelf met welk project je aan de slag gaat.
        </p>
      </div>
    </div>
  )
}
