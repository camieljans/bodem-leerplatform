import { useState, useEffect } from 'react'
import { supabase } from '../supabase'
import { useAuth } from '../App'

export default function Logboek() {
  const { user, project } = useAuth()
  const [week, setWeek] = useState(1)
  const [inhoud, setInhoud] = useState('')
  const [opgeslagen, setOpgeslagen] = useState(false)
  const [laden, setLaden] = useState(false)
  const [fout, setFout] = useState('')
  const [bestaand, setBestaand] = useState(null)
  const [ladenEntry, setLadenEntry] = useState(false)
  const [foto, setFoto] = useState(null)
  const [fotoUrl, setFotoUrl] = useState('')
  const [uploaden, setUploaden] = useState(false)

  useEffect(() => {
    laadEntry()
  }, [week, project])

  async function laadEntry() {
    setLadenEntry(true)
    setOpgeslagen(false)
    setFout('')
    const { data } = await supabase
      .from('logboek')
      .select('*')
      .eq('leerling_id', user.id)
      .eq('project', project)
      .eq('week', week)
      .single()
    if (data) {
      setInhoud(data.inhoud || '')
      setFotoUrl(data.foto_url || '')
      setBestaand(data)
    } else {
      setInhoud('')
      setFotoUrl('')
      setBestaand(null)
    }
    setLadenEntry(false)
  }

  async function uploadFoto(bestand) {
    setUploaden(true)
    const bestandsnaam = `${user.id}/${project}/week${week}_${Date.now()}.${bestand.name.split('.').pop()}`
    const { error } = await supabase.storage.from('logboek-fotos').upload(bestandsnaam, bestand)
    if (error) {
      setFout('Foto uploaden mislukt. Controleer of je een afbeelding selecteert.')
      setUploaden(false)
      return null
    }
    const { data } = supabase.storage.from('logboek-fotos').getPublicUrl(bestandsnaam)
    setUploaden(false)
    return data.publicUrl
  }

  async function opslaan() {
    setLaden(true)
    setFout('')
    setOpgeslagen(false)

    let url = fotoUrl
    if (foto) {
      const geuploadUrl = await uploadFoto(foto)
      if (geuploadUrl) url = geuploadUrl
    }

    if (bestaand) {
      const { error } = await supabase
        .from('logboek')
        .update({ inhoud, foto_url: url })
        .eq('id', bestaand.id)
      if (error) { setFout('Opslaan mislukt. Probeer het opnieuw.'); setLaden(false); return }
    } else {
      const { error } = await supabase
        .from('logboek')
        .insert({ leerling_id: user.id, project, week, inhoud, foto_url: url })
      if (error) { setFout('Opslaan mislukt. Probeer het opnieuw.'); setLaden(false); return }
    }

    setFotoUrl(url)
    setFoto(null)
    setOpgeslagen(true)
    laadEntry()
    setLaden(false)
  }

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <div className="text-5xl mb-3">📓</div>
          <h1 className="text-3xl font-bold text-gray-800 mb-1">Mijn Logboek</h1>
          <p className="text-gray-500">Schrijf op wat je observeert, ontdekt en leert</p>
        </div>

        {/* Week selector */}
        <div className="bg-white rounded-2xl shadow p-4 mb-6">
          <p className="text-sm font-medium text-gray-600 mb-3">Selecteer een week:</p>
          <div className="flex flex-wrap gap-2">
            {Array.from({ length: 8 }, (_, i) => i + 1).map(w => (
              <button
                key={w}
                onClick={() => setWeek(w)}
                className={`px-4 py-2 rounded-xl font-semibold text-sm transition-all ${
                  week === w
                    ? 'bg-green-600 text-white shadow'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                Week {w}
              </button>
            ))}
          </div>
        </div>

        {/* Editor */}
        <div className="bg-white rounded-2xl shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-gray-800">Week {week}</h2>
            <div className="flex items-center gap-2">
              {bestaand && <span className="text-xs text-gray-400 bg-gray-100 px-2 py-1 rounded-full">Eerder opgeslagen</span>}
              {bestaand?.inhoud && (
                <button
                  onClick={() => window.print()}
                  className="no-print text-xs bg-gray-100 hover:bg-gray-200 text-gray-600 px-3 py-1 rounded-full transition-colors"
                >
                  🖨️ Afdrukken
                </button>
              )}
            </div>
          </div>

          {ladenEntry ? (
            <div className="text-center py-8 text-gray-400">Laden...</div>
          ) : (
            <>
              <textarea
                value={inhoud}
                onChange={e => setInhoud(e.target.value)}
                placeholder={`Wat heb je deze week geobserveerd? Wat viel je op? Wat ging goed of minder goed?\n\nSchrijf hier je aantekeningen...`}
                rows={10}
                className="w-full border border-gray-200 rounded-xl p-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-400 resize-none leading-relaxed"
              />

              {/* Foto upload */}
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-600 mb-2">📷 Foto toevoegen (optioneel)</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={e => {
                    const bestand = e.target.files[0]
                    if (!bestand) return
                    if (!bestand.type.startsWith('image/')) {
                      setFout('Alleen afbeeldingen zijn toegestaan (jpg, png, etc.).')
                      e.target.value = ''
                      return
                    }
                    if (bestand.size > 5 * 1024 * 1024) {
                      setFout('De foto mag maximaal 5 MB zijn.')
                      e.target.value = ''
                      return
                    }
                    setFout('')
                    setFoto(bestand)
                  }}
                  className="text-sm text-gray-500 file:mr-3 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-green-100 file:text-green-700 file:font-medium hover:file:bg-green-200 cursor-pointer"
                />
                {foto && <p className="text-xs text-green-600 mt-1">📎 {foto.name} geselecteerd</p>}
                {fotoUrl && !foto && (
                  <div className="mt-3">
                    <img src={fotoUrl} alt="Foto week" className="rounded-xl max-h-48 object-cover border border-gray-200" />
                    <p className="text-xs text-gray-400 mt-1">Huidige foto</p>
                  </div>
                )}
              </div>

              {/* Feedback van begeleider */}
              {bestaand?.feedback && (
                <div className="mt-4 bg-green-50 border border-green-200 rounded-xl p-4">
                  <p className="text-xs font-semibold text-green-600 uppercase tracking-wide mb-1">👩‍🏫 Feedback van je begeleider</p>
                  <p className="text-green-800 text-sm leading-relaxed">{bestaand.feedback}</p>
                  {bestaand.feedback_op && (
                    <p className="text-xs text-green-400 mt-1">
                      {new Date(bestaand.feedback_op).toLocaleDateString('nl-NL', { day: 'numeric', month: 'long' })}
                    </p>
                  )}
                </div>
              )}

              {fout && (
                <div className="mt-4 bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-3 text-sm">
                  ⚠️ {fout}
                </div>
              )}
              {opgeslagen && (
                <div className="mt-4 bg-green-50 border border-green-200 text-green-700 rounded-xl px-4 py-3 text-sm">
                  ✅ Opgeslagen!
                </div>
              )}

              <button
                onClick={opslaan}
                disabled={laden || uploaden || !inhoud.trim()}
                className="mt-5 w-full bg-green-600 hover:bg-green-700 disabled:opacity-50 text-white font-semibold py-3 rounded-xl transition-colors"
              >
                {uploaden ? '📤 Foto uploaden...' : laden ? 'Opslaan...' : '💾 Opslaan'}
              </button>

              {/* Week navigatie */}
              <div className="flex gap-3 mt-3">
                <button
                  onClick={() => setWeek(w => w - 1)}
                  disabled={week <= 1}
                  className="flex-1 bg-gray-100 hover:bg-gray-200 disabled:opacity-30 disabled:cursor-not-allowed text-gray-700 font-semibold py-3 rounded-xl transition-colors"
                >
                  ← Week {week - 1}
                </button>
                <button
                  onClick={() => setWeek(w => w + 1)}
                  disabled={week >= 8}
                  className="flex-1 bg-gray-100 hover:bg-gray-200 disabled:opacity-30 disabled:cursor-not-allowed text-gray-700 font-semibold py-3 rounded-xl transition-colors"
                >
                  Week {week + 1} →
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
