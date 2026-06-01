import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../supabase'
import { maakSleutel } from '../utils/beheerProjecten'
import { ArrowLeft, Save, AlertCircle } from 'lucide-react'

const KLEUREN = ['emerald', 'teal', 'lime', 'amber', 'rose', 'sky']

export default function BeheerNieuwProject() {
  const navigate = useNavigate()
  const [naam, setNaam] = useState('')
  const [ondertitel, setOndertitel] = useState('')
  const [beschrijving, setBeschrijving] = useState('')
  const [centraleVraag, setCentraleVraag] = useState('')
  const [duur, setDuur] = useState('5 weken')
  const [kleur, setKleur] = useState('emerald')
  const [fout, setFout] = useState('')
  const [bezig, setBezig] = useState(false)

  async function opslaan(e) {
    e.preventDefault()
    setFout('')
    if (!naam.trim()) {
      setFout('Geef het project een naam.')
      return
    }
    if (!beschrijving.trim()) {
      setFout('Vul een korte beschrijving in (verschijnt op de projectkeuze-kaart).')
      return
    }
    setBezig(true)
    const sleutel = maakSleutel(naam)
    const { data, error } = await supabase
      .from('beheer_projecten')
      .insert({
        sleutel, naam: naam.trim(), ondertitel: ondertitel.trim() || null,
        beschrijving: beschrijving.trim(),
        centrale_vraag: centraleVraag.trim() || null,
        duur: duur.trim() || null,
        kleur,
      })
      .select()
      .single()
    setBezig(false)
    if (error) {
      if (error.code === '23505') setFout('Er bestaat al een project met deze naam — kies een andere naam.')
      else setFout('Opslaan mislukt: ' + error.message)
      return
    }
    navigate(`/beheer/project/${data.sleutel}`)
  }

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-2xl mx-auto">

        <button
          onClick={() => navigate('/beheer')}
          className="flex items-center gap-2 text-stone-500 hover:text-stone-700 text-sm mb-6"
        >
          <ArrowLeft className="w-4 h-4" /> Terug naar overzicht
        </button>

        <div className="cinematic-panel rounded-3xl p-8">
          <h1 className="text-2xl font-bold text-stone-950 mb-6">Nieuw project</h1>

          <form onSubmit={opslaan} className="space-y-5">

            <Veld label="Projectnaam *" hint="Bijv. 'Het Insectenhuis'">
              <input type="text" value={naam} onChange={e => setNaam(e.target.value)}
                className={inputCls} placeholder="Bijv. Het Insectenhuis" />
            </Veld>

            <Veld label="Ondertitel" hint="Korte krachtige zin onder de titel">
              <input type="text" value={ondertitel} onChange={e => setOndertitel(e.target.value)}
                className={inputCls} placeholder="Insecten als schakel tussen bloem en bodem" />
            </Veld>

            <Veld label="Korte beschrijving *" hint="Verschijnt op het keuze-kaartje (1-2 zinnen)">
              <textarea value={beschrijving} onChange={e => setBeschrijving(e.target.value)}
                rows={3} className={inputCls}
                placeholder="Bouw een insectenhotel naast de bloemenstrook en ontdek hoe insecten en bodem samen de kringloop draaien." />
            </Veld>

            <Veld label="Centrale vraag" hint="De hoofdvraag die het project beantwoordt">
              <textarea value={centraleVraag} onChange={e => setCentraleVraag(e.target.value)}
                rows={2} className={inputCls}
                placeholder="Hoe helpen insecten mee aan een gezonde bodem?" />
            </Veld>

            <div className="grid grid-cols-2 gap-4">
              <Veld label="Duur">
                <input type="text" value={duur} onChange={e => setDuur(e.target.value)}
                  className={inputCls} placeholder="5 weken" />
              </Veld>
              <Veld label="Kleurthema">
                <select value={kleur} onChange={e => setKleur(e.target.value)} className={inputCls}>
                  {KLEUREN.map(k => <option key={k} value={k}>{k}</option>)}
                </select>
              </Veld>
            </div>

            {fout && (
              <div className="flex items-start gap-2 bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-3 text-sm">
                <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" /> {fout}
              </div>
            )}

            <button type="submit" disabled={bezig}
              className="w-full flex items-center justify-center gap-2 bg-emerald-700 hover:bg-emerald-800 disabled:opacity-50 text-white font-semibold py-3 rounded-xl transition-colors">
              <Save className="w-4 h-4" /> {bezig ? 'Opslaan...' : 'Project aanmaken'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

function Veld({ label, hint, children }) {
  return (
    <div>
      <label className="block text-sm font-semibold text-gray-700 mb-1">{label}</label>
      {hint && <p className="text-xs text-stone-500 mb-2">{hint}</p>}
      {children}
    </div>
  )
}

const inputCls = 'w-full border border-gray-200 rounded-xl px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-emerald-400 bg-white'
