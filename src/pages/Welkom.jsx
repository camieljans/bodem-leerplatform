import { useNavigate } from 'react-router-dom'
import { useAuth } from '../App'

export default function Welkom() {
  const { selectProject, user } = useAuth()
  const navigate = useNavigate()

  function kiesProject(project) {
    selectProject(project)
    navigate(user ? '/dashboard' : '/login')
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 via-emerald-50 to-teal-50 flex flex-col items-center justify-center p-6">
      <div className="text-center mb-12">
        <div className="text-7xl mb-4">🌍</div>
        <h1 className="text-5xl font-bold text-green-800 mb-3">Bodem Leerplatform</h1>
        <p className="text-green-600 text-xl">Ontdek de wereld onder je voeten!</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-3xl">
        <button
          onClick={() => kiesProject('wormenhotel')}
          className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-200 border-2 border-transparent hover:border-green-400 text-left cursor-pointer"
        >
          <div className="text-6xl mb-5">🪱</div>
          <h2 className="text-2xl font-bold text-green-800 mb-3">Het Wormenhotel</h2>
          <p className="text-gray-600 leading-relaxed mb-5">
            Ontdek hoe wormen afval omzetten in goud voor de natuur. Leer over circulariteit, composteren en duurzaamheid.
          </p>
          <div className="flex flex-wrap gap-2">
            <span className="bg-green-100 text-green-700 text-sm px-3 py-1 rounded-full font-medium">🔄 Circulariteit</span>
            <span className="bg-green-100 text-green-700 text-sm px-3 py-1 rounded-full font-medium">🌿 Duurzaamheid</span>
            <span className="bg-green-100 text-green-700 text-sm px-3 py-1 rounded-full font-medium">🌍 Klimaat</span>
          </div>
          <div className="mt-6 bg-green-600 text-white text-center py-3 rounded-xl font-semibold">
            Start dit project →
          </div>
        </button>

        <button
          onClick={() => kiesProject('keuringsdienst')}
          className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-200 border-2 border-transparent hover:border-cyan-400 text-left cursor-pointer"
        >
          <div className="text-6xl mb-5">🪴</div>
          <h2 className="text-2xl font-bold text-cyan-800 mb-3">Keuringsdienst van Waarde</h2>
          <p className="text-gray-600 leading-relaxed mb-5">
            Onderzoek wat compostthee doet met plantengroei. Word een echte bodemonderzoeker en ontdek de geheimen van de bodem!
          </p>
          <div className="flex flex-wrap gap-2">
            <span className="bg-cyan-100 text-cyan-700 text-sm px-3 py-1 rounded-full font-medium">🧪 Experimenteren</span>
            <span className="bg-cyan-100 text-cyan-700 text-sm px-3 py-1 rounded-full font-medium">🌱 Bodemkwaliteit</span>
            <span className="bg-cyan-100 text-cyan-700 text-sm px-3 py-1 rounded-full font-medium">🥕 Landbouw</span>
          </div>
          <div className="mt-6 bg-cyan-600 text-white text-center py-3 rounded-xl font-semibold">
            Start dit project →
          </div>
        </button>
      </div>

      <p className="mt-10 text-gray-400 text-sm">
        Na het kiezen log je in met je schoolaccount
      </p>
    </div>
  )
}
