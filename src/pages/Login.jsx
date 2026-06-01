import { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { supabase } from '../supabase'
import { AlertCircle, ChevronLeft, ArrowRight } from 'lucide-react'
import CirkulairLogo from '../components/CirkulairLogo'

const SCHOLEN = [
  { value: 'olympus', label: 'Olympus College' },
  { value: 'liemers', label: 'Liemers College' },
  { value: 'candea',  label: 'Candea College' },
  { value: 'produs',  label: 'Produs College' },
]

const NIVEAUS = [
  { value: 'basisschool', label: 'Basisschool (groep 7/8)' },
  { value: 'pro',         label: 'Praktijkonderwijs (PRO)' },
  { value: 'vmbo-b',      label: 'VMBO Basis' },
  { value: 'vmbo-k',      label: 'VMBO Kader' },
  { value: 'vmbo-tl',     label: 'VMBO-TL / MAVO' },
  { value: 'havo',        label: 'HAVO' },
  { value: 'vwo',         label: 'VWO' },
]

const input = 'w-full border border-gray-200 rounded-xl px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-emerald-400 bg-white text-sm'
const label = 'block text-sm font-medium text-gray-700 mb-1.5'

export default function Login() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()

  const [tab, setTab]           = useState(searchParams.get('tab') === 'registreer' ? 'registreer' : 'login')
  const [fout, setFout]         = useState('')
  const [laden, setLaden]       = useState(false)

  // Inloggen
  const [email, setEmail]       = useState('')
  const [wachtwoord, setWachtwoord] = useState('')

  // Registreren
  const [rol, setRol]           = useState('leerling')
  const [voornaam, setVoornaam] = useState('')
  const [achternaam, setAchternaam] = useState('')
  const [naamBegeleider, setNaamBegeleider] = useState('')
  const [regEmail, setRegEmail] = useState('')
  const [regWachtwoord, setRegWachtwoord] = useState('')
  const [school, setSchool]     = useState('')
  const [niveau, setNiveau]     = useState('')
  const [leerjaar, setLeerjaar] = useState('')

  // ── Inloggen ──────────────────────────────────────────────────────────────
  async function handleLogin(e) {
    e.preventDefault()
    setFout('')
    setLaden(true)

    const { data, error } = await supabase.auth.signInWithPassword({ email, password: wachtwoord })

    if (error) {
      setFout('Verkeerd e-mailadres of wachtwoord.')
      setLaden(false)
      return
    }

    // Haal rol op uit profiles om correct door te sturen
    const { data: profiel } = await supabase
      .from('profiles')
      .select('rol')
      .eq('id', data.user.id)
      .single()

    if (profiel?.rol === 'begeleider') {
      navigate('/begeleider')
    } else {
      // Ga direct naar dashboard als er al een project gekozen is
      const opgeslagenProject = localStorage.getItem('project')
      navigate(opgeslagenProject ? '/dashboard' : '/projectkeuze')
    }
    setLaden(false)
  }

  // ── Registreren ───────────────────────────────────────────────────────────
  async function handleRegistreer(e) {
    e.preventDefault()
    setFout('')

    // Validatie
    if (rol === 'leerling') {
      if (!voornaam.trim())   return setFout('Vul je voornaam in.')
      if (!achternaam.trim()) return setFout('Vul je achternaam in.')
      if (!niveau)            return setFout('Kies je schoolniveau.')
      if (!leerjaar && niveau !== 'basisschool') return setFout('Kies je leerjaar.')
    } else {
      if (!naamBegeleider.trim()) return setFout('Vul je naam in.')
    }
    if (!school)          return setFout('Kies je school.')
    if (!regEmail.trim()) return setFout('Vul je e-mailadres in.')
    if (regWachtwoord.length < 6) return setFout('Wachtwoord moet minimaal 6 tekens zijn.')

    setLaden(true)

    // Account aanmaken
    const { data, error } = await supabase.auth.signUp({
      email: regEmail.trim(),
      password: regWachtwoord,
    })

    if (error) {
      setFout('Registratie mislukt: ' + error.message)
      setLaden(false)
      return
    }

    if (!data.user) {
      setFout('Er ging iets mis. Probeer het opnieuw.')
      setLaden(false)
      return
    }

    // Profiel opslaan
    const volledigeNaam = rol === 'leerling'
      ? `${voornaam.trim()} ${achternaam.trim()}`
      : naamBegeleider.trim()

    const { error: profielError } = await supabase.from('profiles').upsert({
      id:       data.user.id,
      naam:     volledigeNaam,
      rol,
      school,
      niveau:   rol === 'leerling' ? niveau : null,
      leeftijd: rol === 'leerling' && leerjaar ? parseInt(leerjaar) : null,
      email:    regEmail.trim(),
    })

    if (profielError) {
      setFout('Profiel opslaan mislukt: ' + profielError.message)
      setLaden(false)
      return
    }

    // Doorsturen op basis van rol
    navigate(rol === 'begeleider' ? '/begeleider' : '/projectkeuze')
    setLaden(false)
  }

  function wisselTab(t) {
    setTab(t)
    setFout('')
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-md">

        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <CirkulairLogo className="w-28 h-28" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Leerplatform</h1>
          <p className="text-gray-500 mt-1 text-sm">
            {tab === 'login' ? 'Log in om verder te gaan' : 'Maak een nieuw account aan'}
          </p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">

          {/* Tab switcher */}
          <div className="flex mb-6 bg-gray-100 rounded-xl p-1">
            <button
              onClick={() => wisselTab('login')}
              className={`flex-1 py-2 rounded-lg text-sm font-semibold transition-all ${tab === 'login' ? 'bg-white shadow-sm text-emerald-700' : 'text-gray-500 hover:text-gray-700'}`}
            >
              Inloggen
            </button>
            <button
              onClick={() => wisselTab('registreer')}
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

          {/* ── INLOGGEN ── */}
          {tab === 'login' && (
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className={label}>E-mailadres</label>
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} required placeholder="naam@school.nl" className={input} />
              </div>
              <div>
                <label className={label}>Wachtwoord</label>
                <input type="password" value={wachtwoord} onChange={e => setWachtwoord(e.target.value)} required placeholder="••••••••" className={input} />
              </div>
              <button type="submit" disabled={laden}
                className="w-full flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 rounded-xl transition-colors disabled:opacity-50">
                {laden ? 'Bezig...' : <> Inloggen <ArrowRight className="w-4 h-4" /> </>}
              </button>
            </form>
          )}

          {/* ── REGISTREREN ── */}
          {tab === 'registreer' && (
            <form onSubmit={handleRegistreer} className="space-y-4">

              {/* Rol */}
              <div>
                <label className={label}>Ik ben een…</label>
                <select value={rol} onChange={e => { setRol(e.target.value); setFout('') }} className={input}>
                  <option value="leerling">Leerling</option>
                  <option value="begeleider">Begeleider / Docent</option>
                </select>
              </div>

              {/* Naam */}
              {rol === 'leerling' ? (
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className={label}>Voornaam</label>
                    <input type="text" value={voornaam} onChange={e => setVoornaam(e.target.value)} placeholder="Emma" className={input} />
                  </div>
                  <div>
                    <label className={label}>Achternaam</label>
                    <input type="text" value={achternaam} onChange={e => setAchternaam(e.target.value)} placeholder="de Vries" className={input} />
                  </div>
                </div>
              ) : (
                <div>
                  <label className={label}>Jouw naam</label>
                  <input type="text" value={naamBegeleider} onChange={e => setNaamBegeleider(e.target.value)} placeholder="Bijv. Jan de Boer" className={input} />
                </div>
              )}

              {/* School */}
              <div>
                <label className={label}>School</label>
                <select value={school} onChange={e => setSchool(e.target.value)} className={input}>
                  <option value="">Kies je school…</option>
                  {SCHOLEN.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
                </select>
              </div>

              {/* Niveau + leerjaar (alleen leerling) */}
              {rol === 'leerling' && (
                <div>
                  <label className={label}>Schoolniveau</label>
                  <select value={niveau} onChange={e => setNiveau(e.target.value)} className={input}>
                    <option value="">Kies je niveau…</option>
                    {NIVEAUS.map(n => <option key={n.value} value={n.value}>{n.label}</option>)}
                  </select>
                </div>
              )}

              {rol === 'leerling' && niveau && niveau !== 'basisschool' && (
                <div>
                  <label className={label}>Leerjaar</label>
                  <select value={leerjaar} onChange={e => setLeerjaar(e.target.value)} className={input}>
                    <option value="">Kies je leerjaar…</option>
                    {[1,2,3,4,5,6].map(j => <option key={j} value={j}>Leerjaar {j}</option>)}
                  </select>
                </div>
              )}

              {/* E-mail + wachtwoord */}
              <div>
                <label className={label}>E-mailadres</label>
                <input type="email" value={regEmail} onChange={e => setRegEmail(e.target.value)} placeholder="naam@school.nl" className={input} />
              </div>
              <div>
                <label className={label}>Wachtwoord <span className="text-gray-400 font-normal">(min. 6 tekens)</span></label>
                <input type="password" value={regWachtwoord} onChange={e => setRegWachtwoord(e.target.value)} placeholder="••••••••" className={input} />
              </div>

              <button type="submit" disabled={laden}
                className="w-full flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 rounded-xl transition-colors disabled:opacity-50">
                {laden ? 'Bezig...' : <> Account aanmaken <ArrowRight className="w-4 h-4" /> </>}
              </button>
            </form>
          )}
        </div>

        <button onClick={() => navigate('/')}
          className="mt-5 w-full flex items-center justify-center gap-1.5 text-gray-400 hover:text-gray-600 text-sm transition-colors">
          <ChevronLeft className="w-4 h-4" /> Terug naar startpagina
        </button>

      </div>
    </div>
  )
}
