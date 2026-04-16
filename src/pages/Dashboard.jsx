import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../App'
import { supabase } from '../supabase'

const projectInfo = {
  wormenhotel: {
    emoji: '🪱',
    naam: 'Het Wormenhotel',
    bg: 'from-green-400 to-emerald-500',
    licht: 'bg-green-50',
    tekst: 'text-green-800',
    subtekst: 'text-green-600',
    knop: 'bg-green-600 hover:bg-green-700',
    beschrijving: 'Bouw, onderhoud en monitor jullie eigen wormenhotel. Leer hoe afval onderdeel wordt van een circulaire kringloop.',
  },
  keuringsdienst: {
    emoji: '🪴',
    naam: 'Keuringsdienst van Waarde',
    bg: 'from-cyan-400 to-teal-500',
    licht: 'bg-cyan-50',
    tekst: 'text-cyan-800',
    subtekst: 'text-cyan-600',
    knop: 'bg-cyan-600 hover:bg-cyan-700',
    beschrijving: 'Onderzoek het effect van compostthee op plantengroei. Vergelijk drie potten en presenteer jouw bevindingen.',
  },
}

export default function Dashboard() {
  const { user, profile, project } = useAuth()
  const navigate = useNavigate()
  const info = projectInfo[project] || projectInfo.wormenhotel

  const [verzoeken, setVerzoeken] = useState([]) // wachtende koppelingsverzoeken
  const [reageerBezig, setReageerBezig] = useState({})

  useEffect(() => {
    if (user && profile?.rol === 'leerling') {
      laadVerzoeken()
    }
  }, [user, profile])

  async function laadVerzoeken() {
    const { data: koppelingen } = await supabase
      .from('begeleider_koppeling')
      .select('id, begeleider_id')
      .eq('leerling_id', user.id)
      .eq('status', 'wacht')

    if (!koppelingen || koppelingen.length === 0) {
      setVerzoeken([])
      return
    }

    const ids = koppelingen.map(k => k.begeleider_id)
    const { data: profielen } = await supabase
      .from('profiles')
      .select('id, naam')
      .in('id', ids)

    const profielMap = {}
    for (const p of profielen || []) profielMap[p.id] = p.naam

    setVerzoeken(koppelingen.map(k => ({
      id: k.id,
      begeleider_id: k.begeleider_id,
      naam: profielMap[k.begeleider_id] || 'Onbekend',
    })))
  }

  async function reageer(koppelId, actie) {
    setReageerBezig(prev => ({ ...prev, [koppelId]: actie }))
    await supabase
      .from('begeleider_koppeling')
      .update({ status: actie })
      .eq('id', koppelId)
    await laadVerzoeken()
    setReageerBezig(prev => { const n = { ...prev }; delete n[koppelId]; return n })
  }

  if (profile?.rol === 'begeleider') {
    return (
      <div className="min-h-screen p-6">
        <div className="max-w-2xl mx-auto text-center mt-20">
          <div className="text-6xl mb-4">👩‍🏫</div>
          <h1 className="text-3xl font-bold text-gray-800 mb-3">Welkom, {profile?.naam}!</h1>
          <p className="text-gray-500 mb-8">Je bent ingelogd als begeleider.</p>
          <button
            onClick={() => navigate('/begeleider')}
            className="bg-green-600 hover:bg-green-700 text-white font-semibold px-8 py-4 rounded-2xl text-lg transition-colors"
          >
            📋 Bekijk alle logboeken →
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className={`bg-gradient-to-r ${info.bg} text-white p-8`}>
        <div className="max-w-2xl mx-auto">
          <div className="text-5xl mb-3">{info.emoji}</div>
          <h1 className="text-3xl font-bold mb-1">{info.naam}</h1>
          <p className="opacity-90">Welkom terug, {profile?.naam || 'leerling'}! 👋</p>
        </div>
      </div>

      <div className="max-w-2xl mx-auto p-6">

        {/* Koppelingsverzoeken */}
        {verzoeken.length > 0 && (
          <div className="bg-amber-50 border border-amber-300 rounded-2xl p-5 mb-6">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xl">🔔</span>
              <h2 className="font-bold text-amber-800">Koppelingsverzoeken</h2>
            </div>
            <div className="space-y-3">
              {verzoeken.map(v => (
                <div key={v.id} className="bg-white rounded-xl p-4 flex items-center justify-between gap-3">
                  <div>
                    <p className="font-medium text-gray-800">👩‍🏫 {v.naam}</p>
                    <p className="text-sm text-gray-500">wil jouw logboek inzien</p>
                  </div>
                  <div className="flex gap-2 shrink-0">
                    <button
                      onClick={() => reageer(v.id, 'goedgekeurd')}
                      disabled={!!reageerBezig[v.id]}
                      className="bg-green-600 hover:bg-green-700 disabled:opacity-50 text-white text-sm font-semibold px-3 py-2 rounded-xl transition-colors"
                    >
                      {reageerBezig[v.id] === 'goedgekeurd' ? '...' : '✅ Goedkeuren'}
                    </button>
                    <button
                      onClick={() => reageer(v.id, 'afgewezen')}
                      disabled={!!reageerBezig[v.id]}
                      className="bg-gray-100 hover:bg-gray-200 disabled:opacity-50 text-gray-700 text-sm font-semibold px-3 py-2 rounded-xl transition-colors"
                    >
                      {reageerBezig[v.id] === 'afgewezen' ? '...' : 'Afwijzen'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <p className="text-gray-600 mb-8 leading-relaxed">{info.beschrijving}</p>

        <div className="grid grid-cols-1 gap-4">
          <button
            onClick={() => navigate('/opdrachten')}
            className="bg-white rounded-2xl p-6 shadow hover:shadow-lg transition-all text-left border-2 border-transparent hover:border-green-400 flex items-center gap-5"
          >
            <div className="text-5xl">📋</div>
            <div>
              <h2 className="text-xl font-bold text-gray-800 mb-1">Wekelijkse Opdrachten</h2>
              <p className="text-gray-500">Wekelijkse opdrachten passend bij jouw project en niveau. Start hier!</p>
              <span className="inline-block mt-2 bg-green-100 text-green-700 text-sm px-3 py-1 rounded-full font-medium">
                Aangepast aan jouw niveau
              </span>
            </div>
          </button>

          <button
            onClick={() => navigate('/logboek')}
            className="bg-white rounded-2xl p-6 shadow hover:shadow-lg transition-all text-left border-2 border-transparent hover:border-blue-300 flex items-center gap-5"
          >
            <div className="text-5xl">📓</div>
            <div>
              <h2 className="text-xl font-bold text-gray-800 mb-1">Mijn Logboek</h2>
              <p className="text-gray-500">Schrijf op wat je observeert, ontdekt en leert. Voeg foto's toe van jouw experiment!</p>
              <span className="inline-block mt-2 bg-blue-100 text-blue-700 text-sm px-3 py-1 rounded-full font-medium">
                Jouw persoonlijk notitieboek
              </span>
            </div>
          </button>

          <button
            onClick={() => navigate('/vragen')}
            className="bg-white rounded-2xl p-6 shadow hover:shadow-lg transition-all text-left border-2 border-transparent hover:border-purple-300 flex items-center gap-5"
          >
            <div className="text-5xl">💬</div>
            <div>
              <h2 className="text-xl font-bold text-gray-800 mb-1">Stel een Vraag</h2>
              <p className="text-gray-500">Heb je een vraag over het project? Stel hem aan je begeleider!</p>
              <span className="inline-block mt-2 bg-purple-100 text-purple-700 text-sm px-3 py-1 rounded-full font-medium">
                Je begeleider antwoordt zo snel mogelijk
              </span>
            </div>
          </button>

          <button
            onClick={() => navigate('/lessen')}
            className="bg-white rounded-2xl p-6 shadow hover:shadow-lg transition-all text-left border-2 border-transparent hover:border-amber-300 flex items-center gap-5"
          >
            <div className="text-5xl">📚</div>
            <div>
              <h2 className="text-xl font-bold text-gray-800 mb-1">Extra Leermateriaal</h2>
              <p className="text-gray-500">Verdiep je kennis met interactieve lessen over bodem, circulariteit en duurzaamheid.</p>
              <span className="inline-block mt-2 bg-amber-100 text-amber-700 text-sm px-3 py-1 rounded-full font-medium">
                3 moeilijkheidsgraden
              </span>
            </div>
          </button>
        </div>

        <div className={`mt-6 ${info.licht} rounded-2xl p-5`}>
          <h3 className={`font-semibold ${info.tekst} mb-2`}>💡 Tip voor deze week</h3>
          {project === 'wormenhotel' ? (
            <p className={`${info.subtekst} text-sm leading-relaxed`}>
              Controleer of het wormenhotel de juiste vochtigheid heeft. Knijp een handvol bedding samen — als er een paar druppels water uitkomen, is het perfect!
            </p>
          ) : (
            <p className={`${info.subtekst} text-sm leading-relaxed`}>
              Meet deze week de hoogte van alle drie de radijsplanten en noteer het in je logboek. Vergeet ook niet de bladkleur te beschrijven!
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
