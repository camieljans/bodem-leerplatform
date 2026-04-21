import { useNavigate } from 'react-router-dom'
import { useAuth } from '../App'
import { Leaf, FlaskConical, ChevronRight, Recycle, Sprout, Globe, Microscope, BarChart2, BookOpen } from 'lucide-react'

export default function Welkom() {
  const { selectProject, user } = useAuth()
  const navigate = useNavigate()

  function kiesProject(project) {
    selectProject(project)
    navigate(user ? '/dashboard' : '/login')
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6">

      {/* Header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-emerald-100 mb-6">
          <Globe className="w-8 h-8 text-emerald-700" />
        </div>
        <h1 className="text-5xl font-bold text-gray-900 mb-3 tracking-tight">Bodem Leerplatform</h1>
        <p className="text-gray-500 text-lg max-w-md mx-auto">Ontdek de wereld onder je voeten. Kies een project om te beginnen.</p>
      </div>

      {/* Project cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full max-w-3xl">

        {/* Wormenhotel */}
        <button
          onClick={() => kiesProject('wormenhotel')}
          className="group bg-white rounded-2xl p-7 shadow-sm hover:shadow-md border border-gray-100 hover:border-emerald-300 text-left transition-all duration-200"
        >
          <div className="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center mb-5">
            <Leaf className="w-6 h-6 text-emerald-700" />
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">Het Wormenhotel</h2>
          <p className="text-gray-500 text-sm leading-relaxed mb-5">
            Ontdek hoe wormen afval omzetten in voedsel voor de bodem. Leer over circulariteit, composteren en duurzaamheid.
          </p>
          <div className="flex flex-wrap gap-2 mb-6">
            <span className="flex items-center gap-1 bg-emerald-50 text-emerald-700 text-xs px-2.5 py-1 rounded-full font-medium">
              <Recycle className="w-3 h-3" /> Circulariteit
            </span>
            <span className="flex items-center gap-1 bg-emerald-50 text-emerald-700 text-xs px-2.5 py-1 rounded-full font-medium">
              <Sprout className="w-3 h-3" /> Duurzaamheid
            </span>
            <span className="flex items-center gap-1 bg-emerald-50 text-emerald-700 text-xs px-2.5 py-1 rounded-full font-medium">
              <Globe className="w-3 h-3" /> Klimaat
            </span>
          </div>
          <div className="flex items-center gap-2 text-emerald-700 text-sm font-semibold group-hover:gap-3 transition-all">
            Start dit project <ChevronRight className="w-4 h-4" />
          </div>
        </button>

        {/* Keuringsdienst */}
        <button
          onClick={() => kiesProject('keuringsdienst')}
          className="group bg-white rounded-2xl p-7 shadow-sm hover:shadow-md border border-gray-100 hover:border-emerald-300 text-left transition-all duration-200"
        >
          <div className="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center mb-5">
            <FlaskConical className="w-6 h-6 text-emerald-700" />
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">Keuringsdienst van Waarde</h2>
          <p className="text-gray-500 text-sm leading-relaxed mb-5">
            Onderzoek wat compostthee doet met plantengroei. Word een echte bodemonderzoeker en ontdek de geheimen van de bodem.
          </p>
          <div className="flex flex-wrap gap-2 mb-6">
            <span className="flex items-center gap-1 bg-emerald-50 text-emerald-700 text-xs px-2.5 py-1 rounded-full font-medium">
              <Microscope className="w-3 h-3" /> Experimenteren
            </span>
            <span className="flex items-center gap-1 bg-emerald-50 text-emerald-700 text-xs px-2.5 py-1 rounded-full font-medium">
              <BarChart2 className="w-3 h-3" /> Bodemkwaliteit
            </span>
            <span className="flex items-center gap-1 bg-emerald-50 text-emerald-700 text-xs px-2.5 py-1 rounded-full font-medium">
              <BookOpen className="w-3 h-3" /> Landbouw
            </span>
          </div>
          <div className="flex items-center gap-2 text-emerald-700 text-sm font-semibold group-hover:gap-3 transition-all">
            Start dit project <ChevronRight className="w-4 h-4" />
          </div>
        </button>
      </div>

      <p className="mt-10 text-gray-400 text-sm">
        Na het kiezen log je in met je schoolaccount
      </p>
    </div>
  )
}
