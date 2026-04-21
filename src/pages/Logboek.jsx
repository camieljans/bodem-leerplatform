import { useState, useEffect, useRef, useCallback } from 'react'
import { supabase } from '../supabase'
import { useAuth } from '../App'
import { BookOpen, Camera, Printer, Paperclip, Save, Upload, AlertCircle, CheckCircle, GraduationCap, ChevronLeft, ChevronRight, Pencil, Eraser, Trash2, PenLine } from 'lucide-react'

const KLEUREN = ['#1a1a1a', '#ef4444', '#3b82f6', '#16a34a', '#d97706', '#7c3aed', '#ec4899']
const PEN_GROOTTES = [2, 5, 10]

function TekenCanvas({ bestaandeUrl, onTekeningGereed }) {
  const canvasRef = useRef(null)
  const [tekenen, setTekenen] = useState(false)
  const [kleur, setKleur] = useState('#1a1a1a')
  const [grootte, setGrootte] = useState(5)
  const [gum, setGum] = useState(false)
  const [heeftTekening, setHeeftTekening] = useState(false)
  const lastPos = useRef(null)

  // Laad bestaande tekening
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    ctx.fillStyle = '#ffffff'
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    if (bestaandeUrl) {
      const img = new Image()
      img.crossOrigin = 'anonymous'
      img.onload = () => {
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
        setHeeftTekening(true)
      }
      img.src = bestaandeUrl
    }
  }, [bestaandeUrl])

  function getPos(e, canvas) {
    const rect = canvas.getBoundingClientRect()
    const scaleX = canvas.width / rect.width
    const scaleY = canvas.height / rect.height
    const clientX = e.touches ? e.touches[0].clientX : e.clientX
    const clientY = e.touches ? e.touches[0].clientY : e.clientY
    return {
      x: (clientX - rect.left) * scaleX,
      y: (clientY - rect.top) * scaleY,
    }
  }

  function startTekenen(e) {
    e.preventDefault()
    const canvas = canvasRef.current
    setTekenen(true)
    lastPos.current = getPos(e, canvas)
  }

  function teken(e) {
    e.preventDefault()
    if (!tekenen) return
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    const pos = getPos(e, canvas)

    ctx.beginPath()
    ctx.moveTo(lastPos.current.x, lastPos.current.y)
    ctx.lineTo(pos.x, pos.y)
    ctx.strokeStyle = gum ? '#ffffff' : kleur
    ctx.lineWidth = gum ? grootte * 4 : grootte
    ctx.lineCap = 'round'
    ctx.lineJoin = 'round'
    ctx.stroke()

    lastPos.current = pos
    setHeeftTekening(true)

    // Geef canvas door aan parent
    onTekeningGereed(canvas)
  }

  function stopTekenen(e) {
    e?.preventDefault()
    setTekenen(false)
    lastPos.current = null
  }

  function wisCanvas() {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    ctx.fillStyle = '#ffffff'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    setHeeftTekening(false)
    onTekeningGereed(null)
  }

  return (
    <div>
      {/* Toolbar */}
      <div className="flex items-center gap-3 mb-2 flex-wrap">
        {/* Kleuren */}
        <div className="flex items-center gap-1.5">
          {KLEUREN.map(k => (
            <button
              key={k}
              onClick={() => { setKleur(k); setGum(false) }}
              className={`w-6 h-6 rounded-full border-2 transition-all ${!gum && kleur === k ? 'border-gray-600 scale-125' : 'border-gray-200 hover:scale-110'}`}
              style={{ backgroundColor: k }}
            />
          ))}
        </div>

        {/* Pen grootte */}
        <div className="flex items-center gap-1">
          {PEN_GROOTTES.map(g => (
            <button
              key={g}
              onClick={() => { setGrootte(g); setGum(false) }}
              className={`flex items-center justify-center w-8 h-8 rounded-lg transition-all ${!gum && grootte === g ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'}`}
            >
              <div className="rounded-full bg-current" style={{ width: g + 4, height: g + 4 }} />
            </button>
          ))}
        </div>

        {/* Gum */}
        <button
          onClick={() => setGum(g => !g)}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${gum ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'}`}
        >
          <Eraser className="w-3.5 h-3.5" /> Gum
        </button>

        {/* Wis alles */}
        <button
          onClick={wisCanvas}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium bg-gray-100 text-gray-500 hover:bg-red-50 hover:text-red-600 transition-all ml-auto"
        >
          <Trash2 className="w-3.5 h-3.5" /> Wis alles
        </button>
      </div>

      {/* Canvas */}
      <canvas
        ref={canvasRef}
        width={700}
        height={350}
        className="w-full border border-gray-200 rounded-xl bg-white touch-none"
        style={{ cursor: gum ? 'cell' : 'crosshair' }}
        onMouseDown={startTekenen}
        onMouseMove={teken}
        onMouseUp={stopTekenen}
        onMouseLeave={stopTekenen}
        onTouchStart={startTekenen}
        onTouchMove={teken}
        onTouchEnd={stopTekenen}
      />
      <p className="text-xs text-gray-400 mt-1">Teken met je muis of vinger</p>
    </div>
  )
}

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
  const [tekenUrl, setTekenUrl] = useState('')
  const [uploaden, setUploaden] = useState(false)
  const tekenCanvasRef = useRef(null) // huidige canvas element

  const handleTekeningGereed = useCallback((canvas) => {
    tekenCanvasRef.current = canvas
  }, [])

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
      setTekenUrl(data.tekening_url || '')
      setBestaand(data)
    } else {
      setInhoud('')
      setFotoUrl('')
      setTekenUrl('')
      setBestaand(null)
    }
    setLadenEntry(false)
  }

  async function uploadFoto(bestand) {
    const bestandsnaam = `${user.id}/${project}/week${week}_${Date.now()}.${bestand.name.split('.').pop()}`
    const { error } = await supabase.storage.from('logboek-fotos').upload(bestandsnaam, bestand)
    if (error) {
      setFout('Foto uploaden mislukt.')
      return null
    }
    const { data } = supabase.storage.from('logboek-fotos').getPublicUrl(bestandsnaam)
    return data.publicUrl
  }

  async function uploadTekening(canvas) {
    return new Promise((resolve) => {
      canvas.toBlob(async (blob) => {
        if (!blob) { resolve(null); return }
        const bestandsnaam = `${user.id}/${project}/week${week}_tekening_${Date.now()}.png`
        const { error } = await supabase.storage.from('logboek-fotos').upload(bestandsnaam, blob, { contentType: 'image/png' })
        if (error) { resolve(null); return }
        const { data } = supabase.storage.from('logboek-fotos').getPublicUrl(bestandsnaam)
        resolve(data.publicUrl)
      }, 'image/png')
    })
  }

  async function opslaan() {
    setLaden(true)
    setFout('')
    setOpgeslagen(false)
    setUploaden(true)

    let fotoResultUrl = fotoUrl
    if (foto) {
      const url = await uploadFoto(foto)
      if (url) fotoResultUrl = url
    }

    let tekenResultUrl = tekenUrl
    if (tekenCanvasRef.current) {
      const url = await uploadTekening(tekenCanvasRef.current)
      if (url) tekenResultUrl = url
    }

    setUploaden(false)

    const velden = { inhoud, foto_url: fotoResultUrl, tekening_url: tekenResultUrl }

    if (bestaand) {
      const { error } = await supabase.from('logboek').update(velden).eq('id', bestaand.id)
      if (error) { setFout('Opslaan mislukt. Probeer het opnieuw.'); setLaden(false); return }
    } else {
      const { error } = await supabase.from('logboek').insert({ leerling_id: user.id, project, week, ...velden })
      if (error) { setFout('Opslaan mislukt. Probeer het opnieuw.'); setLaden(false); return }
    }

    setFotoUrl(fotoResultUrl)
    setTekenUrl(tekenResultUrl)
    setFoto(null)
    tekenCanvasRef.current = null
    setOpgeslagen(true)
    laadEntry()
    setLaden(false)
  }

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <div className="w-14 h-14 rounded-2xl bg-emerald-100 flex items-center justify-center mx-auto mb-4">
            <BookOpen className="w-7 h-7 text-emerald-700" />
          </div>
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
                  week === w ? 'bg-emerald-600 text-white shadow' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
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
                  className="no-print flex items-center gap-1.5 text-xs bg-gray-100 hover:bg-gray-200 text-gray-600 px-3 py-1 rounded-full transition-colors"
                >
                  <Printer className="w-3.5 h-3.5" /> Afdrukken
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
                rows={8}
                className="w-full border border-gray-200 rounded-xl p-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-400 resize-none leading-relaxed"
              />

              {/* Tekenen */}
              <div className="mt-5">
                <label className="flex items-center gap-1.5 text-sm font-medium text-gray-600 mb-3">
                  <PenLine className="w-4 h-4" /> Tekening of schema (optioneel)
                </label>
                <TekenCanvas
                  bestaandeUrl={tekenUrl}
                  onTekeningGereed={handleTekeningGereed}
                />
              </div>

              {/* Foto upload */}
              <div className="mt-5">
                <label className="flex items-center gap-1.5 text-sm font-medium text-gray-600 mb-2">
                  <Camera className="w-4 h-4" /> Foto toevoegen (optioneel)
                </label>
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
                  className="text-sm text-gray-500 file:mr-3 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-emerald-50 file:text-emerald-700 file:font-medium hover:file:bg-emerald-100 cursor-pointer"
                />
                {foto && <p className="flex items-center gap-1 text-xs text-emerald-600 mt-1"><Paperclip className="w-3 h-3" /> {foto.name} geselecteerd</p>}
                {fotoUrl && !foto && (
                  <div className="mt-3">
                    <img src={fotoUrl} alt="Foto week" className="rounded-xl max-h-48 object-cover border border-gray-200" />
                    <p className="text-xs text-gray-400 mt-1">Huidige foto</p>
                  </div>
                )}
              </div>

              {/* Feedback van begeleider */}
              {bestaand?.feedback && (
                <div className="mt-5 bg-emerald-50 border border-emerald-200 rounded-xl p-4">
                  <p className="flex items-center gap-1.5 text-xs font-semibold text-emerald-600 uppercase tracking-wide mb-1">
                    <GraduationCap className="w-3.5 h-3.5" /> Feedback van je begeleider
                  </p>
                  <p className="text-emerald-800 text-sm leading-relaxed">{bestaand.feedback}</p>
                  {bestaand.feedback_op && (
                    <p className="text-xs text-emerald-400 mt-1">
                      {new Date(bestaand.feedback_op).toLocaleDateString('nl-NL', { day: 'numeric', month: 'long' })}
                    </p>
                  )}
                </div>
              )}

              {fout && (
                <div className="mt-4 flex items-center gap-2 bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-3 text-sm">
                  <AlertCircle className="w-4 h-4 shrink-0" /> {fout}
                </div>
              )}
              {opgeslagen && (
                <div className="mt-4 flex items-center gap-2 bg-emerald-50 border border-emerald-200 text-emerald-700 rounded-xl px-4 py-3 text-sm">
                  <CheckCircle className="w-4 h-4 shrink-0" /> Opgeslagen!
                </div>
              )}

              <button
                onClick={opslaan}
                disabled={laden || uploaden || !inhoud.trim()}
                className="mt-5 w-full flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white font-semibold py-3 rounded-xl transition-colors"
              >
                {uploaden ? <><Upload className="w-4 h-4" /> Uploaden...</> : laden ? 'Opslaan...' : <><Save className="w-4 h-4" /> Opslaan</>}
              </button>

              {/* Week navigatie */}
              <div className="flex gap-3 mt-3">
                <button
                  onClick={() => setWeek(w => w - 1)}
                  disabled={week <= 1}
                  className="flex-1 flex items-center justify-center gap-1.5 bg-gray-100 hover:bg-gray-200 disabled:opacity-30 disabled:cursor-not-allowed text-gray-700 font-semibold py-3 rounded-xl transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" /> Week {week - 1}
                </button>
                <button
                  onClick={() => setWeek(w => w + 1)}
                  disabled={week >= 8}
                  className="flex-1 flex items-center justify-center gap-1.5 bg-gray-100 hover:bg-gray-200 disabled:opacity-30 disabled:cursor-not-allowed text-gray-700 font-semibold py-3 rounded-xl transition-colors"
                >
                  Week {week + 1} <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
