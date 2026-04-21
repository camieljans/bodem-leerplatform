import { useState } from 'react'
import { useAuth } from '../App'
import { lesinhoud } from '../data/lesinhoud'
import { GraduationCap, BookOpen, HelpCircle, Lightbulb, Trophy, Sprout, Dumbbell, RotateCcw, ChevronLeft, ChevronRight, CheckCircle, XCircle } from 'lucide-react'

// Welke lesgroep hoort bij welk schoolniveau
const schoolGroepMapping = {
  'pro':      'basis',
  'vmbo-b':   'basis',
  'vmbo-k':   'midden',
  'vmbo-tl':  'midden',
  'havo':     'havo',
  'vwo':      'havo',
  'anders':   'midden',
}

const moeilijkheidKleuren = {
  makkelijk: {
    bg: 'bg-green-50',
    rand: 'border-green-300',
    knop: 'bg-green-500',
    badge: 'bg-green-100 text-green-800',
    dot: 'bg-green-500',
  },
  gemiddeld: {
    bg: 'bg-yellow-50',
    rand: 'border-yellow-300',
    knop: 'bg-yellow-500',
    badge: 'bg-yellow-100 text-yellow-800',
    dot: 'bg-yellow-400',
  },
  moeilijk: {
    bg: 'bg-red-50',
    rand: 'border-red-300',
    knop: 'bg-red-500',
    badge: 'bg-red-100 text-red-800',
    dot: 'bg-red-500',
  },
}

export default function Lessen() {
  const { project, profile } = useAuth()
  const [gekozenMoeilijkheid, setGekozenMoeilijkheid] = useState(null)
  const [index, setIndex] = useState(0)
  const [gekozenAntwoord, setGekozenAntwoord] = useState(null)
  const [score, setScore] = useState(0)
  const [klaar, setKlaar] = useState(false)

  const data = lesinhoud[project]
  if (!data) return <div className="p-8 text-center text-gray-500">Geen project geselecteerd.</div>

  const schoolGroep = schoolGroepMapping[profile?.niveau] || 'midden'
  const niveauData = data.niveaus[schoolGroep]

  function startMoeilijkheid(m) {
    setGekozenMoeilijkheid(m)
    setIndex(0)
    setGekozenAntwoord(null)
    setScore(0)
    setKlaar(false)
  }

  function volgende() {
    const lessen = niveauData[gekozenMoeilijkheid].lessen
    if (index + 1 >= lessen.length) {
      setKlaar(true)
    } else {
      setIndex(index + 1)
      setGekozenAntwoord(null)
    }
  }

  function antwoordKiezen(i) {
    if (gekozenAntwoord !== null) return
    setGekozenAntwoord(i)
    const les = niveauData[gekozenMoeilijkheid].lessen[index]
    if (les.correct === i) setScore(s => s + 1)
  }

  function opnieuw() {
    setGekozenMoeilijkheid(null)
    setIndex(0)
    setGekozenAntwoord(null)
    setScore(0)
    setKlaar(false)
  }

  // ── Moeilijkheidsgraad kiezen ──────────────────────────────────────────────
  if (!gekozenMoeilijkheid) {
    return (
      <div className="min-h-screen p-6">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <div className="w-14 h-14 rounded-2xl bg-emerald-100 flex items-center justify-center mx-auto mb-4">
              <GraduationCap className="w-7 h-7 text-emerald-700" />
            </div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Extra Leermateriaal</h1>
            <p className="text-gray-500">{data.ondertitel}</p>
          </div>

          <h2 className="text-lg font-semibold text-gray-700 mb-4 text-center">Kies je moeilijkheidsgraad:</h2>

          <div className="grid grid-cols-1 gap-4">
            {['makkelijk', 'gemiddeld', 'moeilijk'].map(m => {
              const kleur = moeilijkheidKleuren[m]
              const lesData = niveauData[m]
              const aantalVragen = lesData.lessen.filter(l => l.type === 'vraag').length
              return (
                <button
                  key={m}
                  onClick={() => startMoeilijkheid(m)}
                  className={`bg-white rounded-2xl p-6 shadow hover:shadow-lg transition-all text-left border-2 ${kleur.rand} flex items-center gap-5`}
                >
                  <div className={`w-10 h-10 rounded-full ${kleur.dot} shrink-0`} />
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-800 capitalize">{m}</h3>
                    <p className="text-gray-500 text-sm mt-1">
                      {lesData.lessen.length} onderdelen · {aantalVragen} vragen
                    </p>
                    <span className={`inline-block mt-2 ${kleur.badge} text-sm px-3 py-1 rounded-full font-medium`}>
                      {m === 'makkelijk' ? 'Basisbegrip' : m === 'gemiddeld' ? 'Verdieping' : 'Uitdaging'}
                    </span>
                  </div>
                </button>
              )
            })}
          </div>
        </div>
      </div>
    )
  }

  // ── Klaar scherm ───────────────────────────────────────────────────────────
  if (klaar) {
    const aantalVragen = niveauData[gekozenMoeilijkheid].lessen.filter(l => l.type === 'vraag').length
    const percentage = aantalVragen > 0 ? Math.round((score / aantalVragen) * 100) : 100
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <div className="bg-white rounded-3xl shadow-xl p-10 max-w-md w-full text-center">
          <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 bg-amber-50">
            {percentage >= 70
              ? <Trophy className="w-10 h-10 text-amber-500" />
              : percentage >= 40
              ? <Sprout className="w-10 h-10 text-green-500" />
              : <Dumbbell className="w-10 h-10 text-blue-500" />
            }
          </div>
          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            {percentage >= 70 ? 'Geweldig!' : percentage >= 40 ? 'Goed bezig!' : 'Blijf oefenen!'}
          </h2>
          <p className="text-gray-500 mb-6">Je hebt {score} van de {aantalVragen} vragen goed beantwoord.</p>
          <div className="bg-gray-100 rounded-2xl p-4 mb-6">
            <div className="text-4xl font-bold text-green-600">{percentage}%</div>
            <div className="text-gray-500 text-sm">score</div>
          </div>
          <div className="flex flex-col gap-3">
            <button
              onClick={() => startMoeilijkheid(gekozenMoeilijkheid)}
              className="flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-xl transition-colors"
            >
              <RotateCcw className="w-4 h-4" /> Opnieuw proberen
            </button>
            <button
              onClick={opnieuw}
              className="flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 rounded-xl transition-colors"
            >
              <ChevronLeft className="w-4 h-4" /> Andere moeilijkheidsgraad
            </button>
          </div>
        </div>
      </div>
    )
  }

  // ── Les weergave ───────────────────────────────────────────────────────────
  const lessen = niveauData[gekozenMoeilijkheid].lessen
  const les = lessen[index]
  const totaal = lessen.length
  const voortgang = Math.round((index / totaal) * 100)
  const kleur = moeilijkheidKleuren[gekozenMoeilijkheid]

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center gap-3 mb-6">
          <button onClick={opnieuw} className="flex items-center gap-1 text-gray-400 hover:text-gray-600 text-sm"><ChevronLeft className="w-4 h-4" /> Keuze</button>
          <div className="flex-1 bg-gray-200 rounded-full h-3">
            <div
              className={`${kleur.knop} h-3 rounded-full transition-all duration-500`}
              style={{ width: `${voortgang}%` }}
            />
          </div>
          <span className="text-sm text-gray-500">{index + 1}/{totaal}</span>
        </div>

        {les.type === 'info' ? (
          <div className="bg-white rounded-3xl shadow-lg p-8">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center mb-4">
              <BookOpen className="w-6 h-6 text-emerald-700" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">{les.titel}</h2>
            <p className="text-gray-600 leading-relaxed text-lg mb-6">{les.tekst}</p>
            {les.feit && (
              <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 mb-6 flex gap-3">
                <Lightbulb className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                <p className="text-amber-800 text-sm font-medium">{les.feit}</p>
              </div>
            )}
            <button
              onClick={volgende}
              className="w-full flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold py-4 rounded-xl transition-colors text-lg"
            >
              Volgende <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        ) : (
          <div className="bg-white rounded-3xl shadow-lg p-8">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center mb-4">
              <HelpCircle className="w-6 h-6 text-emerald-700" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-6">{les.vraag}</h2>
            <div className="grid grid-cols-1 gap-3 mb-6">
              {les.antwoorden.map((antwoord, i) => {
                let stijl = 'bg-gray-50 hover:bg-gray-100 border-gray-200 text-gray-700'
                if (gekozenAntwoord !== null) {
                  if (i === les.correct) stijl = 'bg-green-100 border-green-400 text-green-800'
                  else if (i === gekozenAntwoord) stijl = 'bg-red-100 border-red-400 text-red-800'
                  else stijl = 'bg-gray-50 border-gray-200 text-gray-400 opacity-60'
                }
                return (
                  <button
                    key={i}
                    onClick={() => antwoordKiezen(i)}
                    className={`border-2 rounded-xl px-5 py-4 text-left font-medium transition-all ${stijl} ${gekozenAntwoord === null ? 'cursor-pointer' : 'cursor-default'}`}
                  >
                    <span className="mr-2">{['A', 'B', 'C', 'D'][i]}.</span>
                    {antwoord}
                    {gekozenAntwoord !== null && i === les.correct && <CheckCircle className="float-right w-5 h-5 text-green-600" />}
                    {gekozenAntwoord !== null && i === gekozenAntwoord && i !== les.correct && <XCircle className="float-right w-5 h-5 text-red-500" />}
                  </button>
                )
              })}
            </div>

            {gekozenAntwoord !== null && (
              <div className={`rounded-2xl p-4 mb-4 ${gekozenAntwoord === les.correct ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
                <p className={`flex items-start gap-2 text-sm font-medium ${gekozenAntwoord === les.correct ? 'text-green-800' : 'text-red-800'}`}>
                  {gekozenAntwoord === les.correct
                    ? <CheckCircle className="w-4 h-4 shrink-0 mt-0.5" />
                    : <XCircle className="w-4 h-4 shrink-0 mt-0.5" />}
                  {gekozenAntwoord === les.correct ? 'Goed zo! ' : 'Helaas, dat was niet juist. '}
                  {les.uitleg}
                </p>
              </div>
            )}

            {gekozenAntwoord !== null && (
              <button
                onClick={volgende}
                className="w-full flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold py-4 rounded-xl transition-colors text-lg"
              >
                Volgende <ChevronRight className="w-5 h-5" />
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
