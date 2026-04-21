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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex flex-col items-center justify-center p-6">

      {/* Header */}
      <div className="text-center mb-14">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-emerald-500/20 border border-emerald-500/30 mb-6">
          <Globe className="w-8 h-8 text-emerald-400" />
        </div>
        <h1 className="text-5xl font-bold text-white mb-3 tracking-tight">Bodem Leerplatform</h1>
        <p className="text-slate-400 text-lg max-w-md mx-auto">Ontdek de wereld onder je voeten. Kies een project om te beginnen.</p>
      </div>

      {/* Project cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full max-w-3xl">

        {/* Wormenhotel */}
        <button
          onClick={() => kiesProject('wormenhotel')}
          className="group relative bg-slate-800/60 hover:bg-slate-700/70 border border-slate-700 hover:border-emerald-500/50 rounded-2xl p-7 text-left transition-all duration-200 overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:bg-emerald-500/10 transition-all" />
          <div className="relative">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center mb-5">
              <Leaf className="w-6 h-6 text-emerald-400" />
            </div>
            <h2 className="text-xl font-bold text-white mb-2">Het Wormenhotel</h2>
            <p className="text-slate-400 text-sm leading-relaxed mb-5">
              Ontdek hoe wormen afval omzetten in voedsel voor de bodem. Leer over circulariteit, composteren en duurzaamheid.
            </p>
            <div className="flex flex-wrap gap-2 mb-5">
              <span className="flex items-center gap-1 bg-emerald-500/10 text-emerald-400 text-xs px-2.5 py-1 rounded-full border border-emerald-500/20 font-medium">
                <Recycle className="w-3 h-3" /> Circulariteit
              </span>
              <span className="flex items-center gap-1 bg-emerald-500/10 text-emerald-400 text-xs px-2.5 py-1 rounded-full border border-emerald-500/20 font-medium">
                <Sprout className="w-3 h-3" /> Duurzaamheid
              </span>
              <span className="flex items-center gap-1 bg-emerald-500/10 text-emerald-400 text-xs px-2.5 py-1 rounded-full border border-emerald-500/20 font-medium">
                <Globe className="w-3 h-3" /> Klimaat
              </span>
            </div>
            <div className="flex items-center gap-2 text-emerald-400 text-sm font-semibold group-hover:gap-3 transition-all">
              Start dit project <ChevronRight className="w-4 h-4" />
            </div>
          </div>
        </button>

        {/* Keuringsdienst */}
        <button
          onClick={() => kiesProject('keuringsdienst')}
          className="group relative bg-slate-800/60 hover:bg-slate-700/70 border border-slate-700 hover:border-cyan-500/50 rounded-2xl p-7 text-left transition-all duration-200 overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:bg-cyan-500/10 transition-all" />
          <div className="relative">
            <div className="w-12 h-12 rounded-xl bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center mb-5">
              <FlaskConical className="w-6 h-6 text-cyan-400" />
            </div>
            <h2 className="text-xl font-bold text-white mb-2">Keuringsdienst van Waarde</h2>
            <p className="text-slate-400 text-sm leading-relaxed mb-5">
              Onderzoek wat compostthee doet met plantengroei. Word een echte bodemonderzoeker en ontdek de geheimen van de bodem.
            </p>
            <div className="flex flex-wrap gap-2 mb-5">
              <span className="flex items-center gap-1 bg-cyan-500/10 text-cyan-400 text-xs px-2.5 py-1 rounded-full border border-cyan-500/20 font-medium">
                <Microscope className="w-3 h-3" /> Experimenteren
              </span>
              <span className="flex items-center gap-1 bg-cyan-500/10 text-cyan-400 text-xs px-2.5 py-1 rounded-full border border-cyan-500/20 font-medium">
                <BarChart2 className="w-3 h-3" /> Bodemkwaliteit
              </span>
              <span className="flex items-center gap-1 bg-cyan-500/10 text-cyan-400 text-xs px-2.5 py-1 rounded-full border border-cyan-500/20 font-medium">
                <BookOpen className="w-3 h-3" /> Landbouw
              </span>
            </div>
            <div className="flex items-center gap-2 text-cyan-400 text-sm font-semibold group-hover:gap-3 transition-all">
              Start dit project <ChevronRight className="w-4 h-4" />
            </div>
          </div>
        </button>
      </div>

      <p className="mt-10 text-slate-600 text-sm">
        Na het kiezen log je in met je schoolaccount
      </p>
    </div>
  )
}
