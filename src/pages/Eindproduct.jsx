// -- CREATE TABLE eindproducten (
//   id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
//   leerling_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
//   project text NOT NULL,
//   type text NOT NULL,
//   titel text NOT NULL,
//   url text,
//   beschrijving text,
//   aangemaakt_op timestamptz DEFAULT now(),
//   bijgewerkt_op timestamptz DEFAULT now()
// );
// -- ALTER TABLE eindproducten ENABLE ROW LEVEL SECURITY;
// -- CREATE POLICY "Users manage own eindproducten" ON eindproducten USING (auth.uid() = leerling_id) WITH CHECK (auth.uid() = leerling_id);

import { useState, useEffect } from 'react'
import { supabase } from '../supabase'
import { useAuth } from '../App'
import { briefing } from '../data/briefing'
import {
  Trophy, Upload, Link, FileText, Video, Image, Send,
  CheckCircle, Edit3, Lightbulb, ExternalLink,
} from 'lucide-react'

const MAX_BESCHRIJVING = 500

// Map a vorm label to a suitable icon component
function VormIcon({ label }) {
  const l = label.toLowerCase()
  if (l.includes('video') || l.includes('reportage')) return <Video className="w-4 h-4" />
  if (l.includes('foto') || l.includes('infographic') || l.includes('groei') || l.includes('poster')) return <Image className="w-4 h-4" />
  if (l.includes('verslag') || l.includes('onderzoek') || l.includes('interview')) return <FileText className="w-4 h-4" />
  if (l.includes('link') || l.includes('url')) return <Link className="w-4 h-4" />
  return <Upload className="w-4 h-4" />
}

export default function Eindproduct() {
  const { user, project } = useAuth()

  const projectData = briefing[project]
  const vormen = projectData?.eindproduct?.vormen ?? []

  // ── State ────────────────────────────────────────────────────────────────────
  const [bestaand, setBestaand] = useState(null)
  const [laden, setLaden] = useState(true)
  const [bewerkModus, setBewerkModus] = useState(false)
  const [opgeslagen, setOpgeslagen] = useState(false)
  const [fout, setFout] = useState('')
  const [opslaan, setOpslaan] = useState(false)

  // Form fields
  const [type, setType] = useState(vormen[0]?.label ?? '')
  const [titel, setTitel] = useState('')
  const [url, setUrl] = useState('')
  const [beschrijving, setBeschrijving] = useState('')

  // ── Load existing submission ─────────────────────────────────────────────────
  useEffect(() => {
    async function laadEindproduct() {
      setLaden(true)
      setOpgeslagen(false)
      setFout('')
      const { data, error } = await supabase
        .from('eindproducten')
        .select('*')
        .eq('leerling_id', user.id)
        .eq('project', project)
        .maybeSingle()

      if (error) {
        setFout('Laden mislukt. Ververs de pagina.')
      } else if (data) {
        setBestaand(data)
        setType(data.type)
        setTitel(data.titel)
        setUrl(data.url ?? '')
        setBeschrijving(data.beschrijving ?? '')
      } else {
        setBestaand(null)
        setType(vormen[0]?.label ?? '')
        setTitel('')
        setUrl('')
        setBeschrijving('')
      }
      setLaden(false)
    }

    if (user && project) laadEindproduct()
  }, [user, project])

  // ── Save (upsert) ────────────────────────────────────────────────────────────
  async function handleOpslaan(e) {
    e.preventDefault()
    if (!titel.trim()) { setFout('Vul een titel in.'); return }
    setOpslaan(true)
    setFout('')
    setOpgeslagen(false)

    const payload = {
      leerling_id: user.id,
      project,
      type,
      titel: titel.trim(),
      url: url.trim() || null,
      beschrijving: beschrijving.trim() || null,
      bijgewerkt_op: new Date().toISOString(),
    }

    let error
    if (bestaand) {
      ;({ error } = await supabase
        .from('eindproducten')
        .update(payload)
        .eq('id', bestaand.id))
    } else {
      ;({ error } = await supabase
        .from('eindproducten')
        .insert({ ...payload, aangemaakt_op: new Date().toISOString() }))
    }

    if (error) {
      setFout('Opslaan mislukt. Probeer het opnieuw.')
      setOpslaan(false)
      return
    }

    // Reload so bestaand is up to date
    const { data: vers } = await supabase
      .from('eindproducten')
      .select('*')
      .eq('leerling_id', user.id)
      .eq('project', project)
      .maybeSingle()

    setBestaand(vers ?? null)
    setOpgeslagen(true)
    setBewerkModus(false)
    setOpslaan(false)
  }

  // ── Derived ──────────────────────────────────────────────────────────────────
  const toonFormulier = !bestaand || bewerkModus
  const vormVoorBestaand = vormen.find(v => v.label === bestaand?.type)

  // ── Loading state ─────────────────────────────────────────────────────────────
  if (laden) {
    return (
      <div className="min-h-screen p-6 flex items-center justify-center">
        <p className="text-gray-400">Laden...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-2xl mx-auto">

        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-14 h-14 rounded-2xl bg-emerald-100 flex items-center justify-center mx-auto mb-4">
            <Trophy className="w-7 h-7 text-emerald-700" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-1">Eindproduct</h1>
          <p className="text-gray-500">Lever hier je eindproduct in</p>
        </div>

        {/* Tip box: possible product forms */}
        {vormen.length > 0 && (
          <div className="bg-white rounded-2xl shadow p-5 mb-6">
            <div className="flex items-start gap-3">
              <div className="shrink-0 w-8 h-8 rounded-xl bg-amber-100 flex items-center justify-center">
                <Lightbulb className="w-4 h-4 text-amber-600" />
              </div>
              <div>
                <p className="font-semibold text-gray-800 mb-2">Mogelijke vormen van het eindproduct</p>
                <ul className="space-y-2">
                  {vormen.map(vorm => (
                    <li key={vorm.label} className="flex items-start gap-2">
                      <span className="text-lg leading-none mt-0.5">{vorm.icon}</span>
                      <div>
                        <span className="font-medium text-gray-700 text-sm">{vorm.label}</span>
                        <span className="text-gray-500 text-sm"> — {vorm.beschrijving}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* Existing submission view */}
        {bestaand && !bewerkModus && (
          <div className="bg-white rounded-2xl shadow p-6 mb-6">
            <div className="flex items-start justify-between gap-4 mb-4">
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 bg-emerald-100 text-emerald-700 text-xs font-semibold px-3 py-1 rounded-full">
                  <VormIcon label={bestaand.type} />
                  {bestaand.type}
                </span>
              </div>
              <button
                onClick={() => { setBewerkModus(true); setOpgeslagen(false) }}
                className="shrink-0 flex items-center gap-1.5 text-sm font-semibold text-gray-600 bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-xl transition-colors"
              >
                <Edit3 className="w-4 h-4" /> Bewerken
              </button>
            </div>

            <h2 className="text-xl font-bold text-gray-800 mb-2">{bestaand.titel}</h2>

            {bestaand.url && (
              <a
                href={bestaand.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm text-emerald-700 font-medium hover:underline mb-3"
              >
                <ExternalLink className="w-4 h-4" />
                {bestaand.url}
              </a>
            )}

            {bestaand.beschrijving && (
              <p className="text-gray-600 text-sm leading-relaxed mt-2">{bestaand.beschrijving}</p>
            )}

            {bestaand.bijgewerkt_op && (
              <p className="text-xs text-gray-400 mt-4">
                Laatst bijgewerkt:{' '}
                {new Date(bestaand.bijgewerkt_op).toLocaleDateString('nl-NL', {
                  day: 'numeric', month: 'long', year: 'numeric',
                })}
              </p>
            )}
          </div>
        )}

        {/* Success message after save */}
        {opgeslagen && !bewerkModus && (
          <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-200 text-emerald-700 rounded-2xl px-5 py-4 mb-6">
            <CheckCircle className="w-5 h-5 shrink-0" />
            <p className="text-sm font-medium">Je eindproduct is opgeslagen!</p>
          </div>
        )}

        {/* Form */}
        {toonFormulier && (
          <form onSubmit={handleOpslaan} className="bg-white rounded-2xl shadow p-6">
            <h2 className="text-lg font-bold text-gray-800 mb-5">
              {bestaand ? 'Eindproduct bewerken' : 'Eindproduct indienen'}
            </h2>

            {/* Type selector */}
            <div className="mb-5">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Type eindproduct <span className="text-red-500">*</span>
              </label>
              {vormen.length > 0 ? (
                <div className="flex flex-col gap-2">
                  {vormen.map(vorm => (
                    <label
                      key={vorm.label}
                      className={`flex items-start gap-3 p-3 rounded-xl border cursor-pointer transition-all ${
                        type === vorm.label
                          ? 'border-emerald-400 bg-emerald-50'
                          : 'border-gray-200 bg-white hover:bg-gray-50'
                      }`}
                    >
                      <input
                        type="radio"
                        name="type"
                        value={vorm.label}
                        checked={type === vorm.label}
                        onChange={() => setType(vorm.label)}
                        className="mt-0.5 accent-emerald-600"
                      />
                      <div>
                        <span className="font-semibold text-gray-800 text-sm">
                          {vorm.icon} {vorm.label}
                        </span>
                        <p className="text-gray-500 text-xs mt-0.5">{vorm.beschrijving}</p>
                      </div>
                    </label>
                  ))}
                </div>
              ) : (
                <input
                  type="text"
                  value={type}
                  onChange={e => setType(e.target.value)}
                  placeholder="Bijv. Video, Poster, Verslag..."
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-emerald-400 bg-white text-sm"
                />
              )}
            </div>

            {/* Titel */}
            <div className="mb-5">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Titel <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={titel}
                onChange={e => setTitel(e.target.value)}
                placeholder="Geef je eindproduct een titel..."
                required
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-emerald-400 bg-white text-sm"
              />
            </div>

            {/* URL */}
            <div className="mb-5">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <span className="flex items-center gap-1.5">
                  <Link className="w-3.5 h-3.5 text-gray-400" />
                  Link naar je product <span className="text-gray-400 font-normal">(optioneel)</span>
                </span>
              </label>
              <input
                type="url"
                value={url}
                onChange={e => setUrl(e.target.value)}
                placeholder="https://... (YouTube, Drive, etc.)"
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-emerald-400 bg-white text-sm"
              />
            </div>

            {/* Beschrijving */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Beschrijving <span className="text-gray-400 font-normal">(optioneel)</span>
              </label>
              <textarea
                value={beschrijving}
                onChange={e => {
                  if (e.target.value.length <= MAX_BESCHRIJVING) setBeschrijving(e.target.value)
                }}
                placeholder="Vertel kort wat je eindproduct inhoudt, hoe je het gemaakt hebt of wat je het leukst vond..."
                rows={4}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-emerald-400 bg-white text-sm resize-none leading-relaxed"
              />
              <p className={`text-xs mt-1 text-right ${beschrijving.length >= MAX_BESCHRIJVING ? 'text-red-500' : 'text-gray-400'}`}>
                {beschrijving.length} / {MAX_BESCHRIJVING} tekens
              </p>
            </div>

            {/* Error */}
            {fout && (
              <div className="mb-4 flex items-center gap-2 bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-3 text-sm">
                {fout}
              </div>
            )}

            {/* Buttons */}
            <div className="flex gap-3">
              {bewerkModus && (
                <button
                  type="button"
                  onClick={() => {
                    setBewerkModus(false)
                    setFout('')
                    // Reset form to saved values
                    if (bestaand) {
                      setType(bestaand.type)
                      setTitel(bestaand.titel)
                      setUrl(bestaand.url ?? '')
                      setBeschrijving(bestaand.beschrijving ?? '')
                    }
                  }}
                  className="flex-1 py-3 rounded-xl border border-gray-200 text-gray-600 font-semibold text-sm hover:bg-gray-50 transition-colors"
                >
                  Annuleren
                </button>
              )}
              <button
                type="submit"
                disabled={opslaan || !titel.trim()}
                className="flex-1 flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white font-semibold py-3 rounded-xl transition-colors text-sm"
              >
                {opslaan
                  ? 'Opslaan...'
                  : <><Send className="w-4 h-4" /> Eindproduct opslaan</>
                }
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}
