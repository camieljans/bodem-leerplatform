import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../supabase'
import { useAuth } from '../App'

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
    wormenhotel: { emoji: '🪱', naam: 'Het Wormenhotel' },
    keuringsdienst: { emoji: '🪴', naam: 'Keuringsdienst van Waarde' },
  }
  const huidigProject = projectInfo[project] || { emoji: '🌱', naam: 'Bodem Leerplatform' }

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

  const inputStijl = "w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-400 bg-white"

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-emerald-100 flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="text-5xl mb-3">{huidigProject.emoji}</div>
          <h1 className="text-2xl font-bold text-gray-800">{huidigProject.naam}</h1>
          <p className="text-gray-500 mt-1">Log in om verder te gaan</p>
        </div>

        <div className="bg-white rounded-3xl shadow-xl p-8">
          <div className="flex mb-6 bg-gray-100 rounded-xl p-1">
            <button onClick={() => setTab('login')} className={`flex-1 py-2 rounded-lg font-semibold transition-all ${tab === 'login' ? 'bg-white shadow text-green-700' : 'text-gray-500'}`}>
              Inloggen
            </button>
            <button onClick={() => setTab('registreer')} className={`flex-1 py-2 rounded-lg font-semibold transition-all ${tab === 'registreer' ? 'bg-white shadow text-green-700' : 'text-gray-500'}`}>
              Registreren
            </button>
          </div>

          {fout && (
            <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-3 mb-4 text-sm">
              ⚠️ {fout}
            </div>
          )}

          {tab === 'login' ? (
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">E-mailadres</label>
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} required placeholder="naam@school.nl" className={inputStijl} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Wachtwoord</label>
                <input type="password" value={wachtwoord} onChange={e => setWachtwoord(e.target.value)} required placeholder="••••••••" className={inputStijl} />
              </div>
              <button type="submit" disabled={laden} className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-xl transition-colors disabled:opacity-50">
                {laden ? 'Bezig...' : 'Inloggen →'}
              </button>
            </form>
          ) : (
            <form onSubmit={handleRegistreer} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Ik ben een...</label>
                <select value={rol} onChange={e => setRol(e.target.value)} className={inputStijl}>
                  <option value="leerling">🎒 Leerling</option>
                  <option value="begeleider">👩‍🏫 Begeleider / Docent</option>
                </select>
              </div>
              {rol === 'leerling' ? (
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Voornaam</label>
                    <input type="text" value={voornaam} onChange={e => setVoornaam(e.target.value)} required placeholder="Emma" className={inputStijl} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Achternaam</label>
                    <input type="text" value={achternaam} onChange={e => setAchternaam(e.target.value)} required placeholder="de Vries" className={inputStijl} />
                  </div>
                </div>
              ) : (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Jouw naam</label>
                  <input type="text" value={naam} onChange={e => setNaam(e.target.value)} required placeholder="Bijv. Camiel Jans" className={inputStijl} />
                </div>
              )}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">E-mailadres</label>
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} required placeholder="naam@school.nl" className={inputStijl} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Wachtwoord</label>
                <input type="password" value={wachtwoord} onChange={e => setWachtwoord(e.target.value)} required minLength={6} placeholder="Minimaal 6 tekens" className={inputStijl} />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Mijn school</label>
                <select value={school} onChange={e => setSchool(e.target.value)} className={inputStijl}>
                  <option value="">Kies je school...</option>
                  {scholen.map(s => (
                    <option key={s.value} value={s.value}>{s.label}</option>
                  ))}
                </select>
              </div>

              {rol === 'begeleider' && (
                <div className="bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 text-sm text-amber-700">
                  💡 Je kunt straks leerlingen van jouw school uitnodigen. Zij moeten jouw verzoek goedkeuren.
                </div>
              )}

              {rol === 'leerling' && (
                <>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Leeftijd</label>
                      <select value={leeftijd} onChange={e => setLeeftijd(e.target.value)} className={inputStijl}>
                        <option value="">Kies...</option>
                        {Array.from({ length: 9 }, (_, i) => i + 10).map(l => (
                          <option key={l} value={l}>{l} jaar</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Schoolniveau</label>
                      <select value={niveau} onChange={e => setNiveau(e.target.value)} className={inputStijl}>
                        <option value="">Kies...</option>
                        {niveaus.map(n => (
                          <option key={n.value} value={n.value}>{n.label}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="bg-blue-50 border border-blue-200 rounded-xl px-4 py-3 text-sm text-blue-700">
                    💡 De lessen worden automatisch afgestemd op jouw niveau.
                  </div>
                </>
              )}

              <button type="submit" disabled={laden} className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-xl transition-colors disabled:opacity-50">
                {laden ? 'Bezig...' : 'Account aanmaken →'}
              </button>
            </form>
          )}
        </div>

        <button onClick={() => navigate('/')} className="mt-4 w-full text-center text-gray-500 hover:text-gray-700 text-sm">
          ← Terug naar projectkeuze
        </button>
      </div>
    </div>
  )
}
