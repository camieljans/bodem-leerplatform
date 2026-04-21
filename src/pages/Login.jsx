import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../supabase'
import { useAuth } from '../App'
import { Worm, Sprout, AlertCircle, Lightbulb, ChevronLeft, ArrowRight } from 'lucide-react'

const scholen = [
  { value: 'olympus', label: 'Olympus College' },
  { value: 'liemers', label: 'Liemers College' },
  { value: 'candea', label: 'Candea College' },
  { value: 'produs', label: 'Produs College' },
]

const niveaus = [
  { value: 'pro', label: 'Praktijkonderwijs (PRO)' },
  { value: 'vmbo-b', label: 'VMBO Basis' },
  { value: 'vmbo-k', label: 'VMBO Kader' },
  { value: 'vmbo-tl', label: 'VMBO-TL / MAVO' },
  { value: 'havo', label: 'HAVO' },
  { value: 'vwo', label: 'VWO' },
  { value: 'anders', label: 'Anders' },
]

export default function Login() {
  const [tab, setTab] = useState('login')
  const [naam, setNaam] = useState('')
  const [voornaam, setVoornaam] = useState('')
  const [achternaam, setAchternaam] = useState('')
  const [email, setEmail] = useState('')
  const [wachtwoord, setWachtwoord] = useState('')
  const [rol, setRol] = useState('leerling')
  const [leeftijd, setLeeftijd] = useState('')
  const [niveau, setNiveau] = useState('')
  const [school, setSchool] = useState('')
  const [fout, setFout] = useState('')
  const [laden, setLaden] = useState(false)
  const navigate = useNavigate()
  const { project } = useAuth()

  const projectInfo = {
    wormenhotel:    { icon: Worm,   naam: 'Het Wormenhotel' },
    keuringsdienst: { icon: Sprout, naam: 'Keuringsdienst van Waarde' },
  }
  const huidigProject = projectInfo[project] || { icon: Leaf, naam: 'Bodem Leerplatform' }
  const ProjectIcon = huidigProject.icon

  async function handleLogin(e) {
    e.preventDefault()
    setFout('')
    setLaden(true)
    const { error } = await supabase.auth.signInWithPassword({ email, password: wachtwoord })
    if (error) {
      setFout('Verkeerd e-mailadres of wachtwoord. Probeer het opnieuw.')
    } else {
      navigate('/dashboard')
    }
    setLaden(false)
  }

  async function handleRegistreer(e) {
    e.preventDefault()
    setFout('')
    if (rol === 'leerling') {
      if (!voornaam.trim()) { setFout('Vul je voornaam in.'); return }
      if (!achternaam.trim()) { setFout('Vul je achternaam in.'); return }
    } else {
      if (!naam.trim()) { setFout('Vul je naam in.'); return }
    }
    if (rol === 'leerling' && !leeftijd) { setFout('Vul je leeftijd in.'); return }
    if (rol === 'leerling' && !niveau) { setFout('Kies je schoolniveau.'); return }
    if (!school) { setFout('Kies je school.'); return }
    setLaden(true)
    const volledigeNaam = rol === 'leerling'
      ? `${voornaam.trim()} ${achternaam.trim()}`
      : naam.trim()
    const { data, error } = await supabase.auth.signUp({
      email,
      password: wachtwoord,
      options: {
        data: {
          naam: volledigeNaam,
          rol,
          leeftijd: rol === 'leerling' ? parseInt(leeftijd) : null,
          niveau: rol === 'leerling' ? niveau : null,
          school,
        }
      }
    })
    if (error) {
      setFout('Registratie mislukt: ' + error.message)
      setLaden(false)
      return
    }
    if (data.user) navigate('/dashboard')
    setLaden(false)
  }

  const inputStijl = "w-full border border-gray-200 rounded-xl px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-emerald-400 bg-white text-sm"
  const labelStijl = "block text-sm font-medium text-gray-700 mb-1.5"

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-md">

        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-14 h-14 rounded-2xl bg-emerald-100 flex items-center justify-center mx-auto mb-4">
            <ProjectIcon className="w-7 h-7 text-emerald-700" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">{huidigProject.naam}</h1>
          <p className="text-gray-500 mt-1 text-sm">Log in om verder te gaan</p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">

          {/* Tab switcher */}
          <div className="flex mb-6 bg-gray-100 rounded-xl p-1">
            <button
              onClick={() => { setTab('login'); setFout('') }}
              className={`flex-1 py-2 rounded-lg text-sm font-semibold transition-all ${tab === 'login' ? 'bg-white shadow-sm text-emerald-700' : 'text-gray-500 hover:text-gray-700'}`}
            >
              Inloggen
            </button>
            <button
              onClick={() => { setTab('registreer'); setFout('') }}
              className={`flex-1 py-2 rounded-lg text-sm font-semibold transition-all ${tab === 'registreer' ? 'bg-white shadow-sm text-emerald-700' : 'text-gray-500 hover:text-gray-700'}`}
            >
              Registreren
            </button>
          </div>

          {/* Foutmelding */}
          {fout && (
            <div className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-3 mb-5 text-sm">
              <AlertCircle className="w-4 h-4 shrink-0" /> {fout}
            </div>
          )}

          {/* Inloggen */}
          {tab === 'login' ? (
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className={labelStijl}>E-mailadres</label>
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} required placeholder="naam@school.nl" className={inputStijl} />
              </div>
              <div>
                <label className={labelStijl}>Wachtwoord</label>
                <input type="password" value={wachtwoord} onChange={e => setWachtwoord(e.target.value)} required placeholder="••••••••" className={inputStijl} />
              </div>
              <button
                type="submit"
                disabled={laden}
                className="w-full flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 rounded-xl transition-colors disabled:opacity-50 mt-2"
              >
                {laden ? 'Bezig...' : <> Inloggen <ArrowRight className="w-4 h-4" /></>}
              </button>
            </form>

          ) : (
            /* Registreren */
            <form onSubmit={handleRegistreer} className="space-y-4">
              <div>
                <label className={labelStijl}>Ik ben een...</label>
                <select value={rol} onChange={e => setRol(e.target.value)} className={inputStijl}>
                  <option value="leerling">Leerling</option>
                  <option value="begeleider">Begeleider / Docent</option>
                </select>
              </div>

              {rol === 'leerling' ? (
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className={labelStijl}>Voornaam</label>
                    <input type="text" value={voornaam} onChange={e => setVoornaam(e.target.value)} required placeholder="Emma" className={inputStijl} />
                  </div>
                  <div>
                    <label className={labelStijl}>Achternaam</label>
                    <input type="text" value={achternaam} onChange={e => setAchternaam(e.target.value)} required placeholder="de Vries" className={inputStijl} />
                  </div>
                </div>
              ) : (
                <div>
                  <label className={labelStijl}>Jouw naam</label>
                  <input type="text" value={naam} onChange={e => setNaam(e.target.value)} required placeholder="Bijv. Camiel Jans" className={inputStijl} />
                </div>
              )}

              <div>
                <label className={labelStijl}>E-mailadres</label>
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} required placeholder="naam@school.nl" className={inputStijl} />
              </div>
              <div>
                <label className={labelStijl}>Wachtwoord</label>
                <input type="password" value={wachtwoord} onChange={e => setWachtwoord(e.target.value)} required minLength={6} placeholder="Minimaal 6 tekens" className={inputStijl} />
              </div>
              <div>
                <label className={labelStijl}>Mijn school</label>
                <select value={school} onChange={e => setSchool(e.target.value)} className={inputStijl}>
                  <option value="">Kies je school...</option>
                  {scholen.map(s => (
                    <option key={s.value} value={s.value}>{s.label}</option>
                  ))}
                </select>
              </div>

              {rol === 'leerling' && (
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className={labelStijl}>Leeftijd</label>
                    <select value={leeftijd} onChange={e => setLeeftijd(e.target.value)} className={inputStijl}>
                      <option value="">Kies...</option>
                      {Array.from({ length: 9 }, (_, i) => i + 10).map(l => (
                        <option key={l} value={l}>{l} jaar</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className={labelStijl}>Schoolniveau</label>
                    <select value={niveau} onChange={e => setNiveau(e.target.value)} className={inputStijl}>
                      <option value="">Kies...</option>
                      {niveaus.map(n => (
                        <option key={n.value} value={n.value}>{n.label}</option>
                      ))}
                    </select>
                  </div>
                </div>
              )}

              {rol === 'leerling' && (
                <div className="flex items-start gap-2 bg-emerald-50 border border-emerald-100 rounded-xl px-4 py-3 text-sm text-emerald-800">
                  <Lightbulb className="w-4 h-4 shrink-0 mt-0.5 text-emerald-600" />
                  De lessen worden automatisch afgestemd op jouw niveau.
                </div>
              )}
              {rol === 'begeleider' && (
                <div className="flex items-start gap-2 bg-emerald-50 border border-emerald-100 rounded-xl px-4 py-3 text-sm text-emerald-800">
                  <Lightbulb className="w-4 h-4 shrink-0 mt-0.5 text-emerald-600" />
                  Je kunt straks leerlingen van jouw school uitnodigen. Zij moeten jouw verzoek goedkeuren.
                </div>
              )}

              <button
                type="submit"
                disabled={laden}
                className="w-full flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 rounded-xl transition-colors disabled:opacity-50 mt-2"
              >
                {laden ? 'Bezig...' : <> Account aanmaken <ArrowRight className="w-4 h-4" /></>}
              </button>
            </form>
          )}
        </div>

        <button
          onClick={() => navigate('/')}
          className="mt-5 w-full flex items-center justify-center gap-1.5 text-gray-400 hover:text-gray-600 text-sm transition-colors"
        >
          <ChevronLeft className="w-4 h-4" /> Terug naar projectkeuze
        </button>
      </div>
    </div>
  )
}
