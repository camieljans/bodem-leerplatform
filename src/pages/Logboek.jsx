import { useState, useEffect, useRef, useCallback } from 'react'
import { supabase } from '../supabase'
import { useAuth } from '../App'
import {
  BookOpen, Camera, Printer, Paperclip, Save, Upload,
  AlertCircle, CheckCircle, GraduationCap, ChevronLeft, ChevronRight,
  Pencil, Eraser, Trash2, PenLine, Minus, Square, Type, Circle,
} from 'lucide-react'

const KLEUREN = ['#1a1a1a', '#ef4444', '#3b82f6', '#16a34a', '#d97706', '#7c3aed', '#ec4899']
const PEN_GROOTTES = [2, 5, 10]

function TekenCanvas({ bestaandeUrl, onTekeningGereed }) {
  const canvasRef = useRef(null)
  const [actief, setActief] = useState(false)
  const [tool, setTool] = useState('potlood')
  const [kleur, setKleur] = useState('#1a1a1a')
  const [grootte, setGrootte] = useState(5)
  const snapshotRef = useRef(null)
  const startPosRef = useRef(null)
  const lastPos = useRef(null)

  const [tekstInvoer, setTekstInvoer] = useState('')
  const [tekstPos, setTekstPos] = useState(null)
  const [tekstPixel, setTekstPixel] = useState(null)
  const tekstInputRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    ctx.fillStyle = '#ffffff'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    if (bestaandeUrl) {
      const img = new Image()
      img.crossOrigin = 'anonymous'
      img.onload = () => ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
      img.src = bestaandeUrl
    }
  }, [bestaandeUrl])

  useEffect(() => {
    if (tekstPos) setTimeout(() => tekstInputRef.current?.focus(), 10)
  }, [tekstPos])

  function getPos(e, canvas) {
    const rect = canvas.getBoundingClientRect()
    const scaleX = canvas.width / rect.width
    const scaleY = canvas.height / rect.height
    const src = e.touches ? e.touches[0] : e
    return {
      x: (src.clientX - rect.left) * scaleX,
      y: (src.clientY - rect.top) * scaleY,
    }
  }

  function getPixelPos(e, canvas) {
    const rect = canvas.getBoundingClientRect()
    const src = e.touches ? e.touches[0] : e
    return { left: src.clientX - rect.left, top: src.clientY - rect.top }
  }

  function bevestigTekst() {
    if (!tekstInvoer.trim() || !tekstPos) { setTekstPos(null); return }
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    ctx.font = `bold ${grootte * 3 + 10}px sans-serif`
    ctx.fillStyle = kleur
    ctx.fillText(tekstInvoer, tekstPos.x, tekstPos.y)
    onTekeningGereed(canvas)
    setTekstPos(null)
    setTekstInvoer('')
  }

  function handleDown(e) {
    e.preventDefault()
    if (tool === 'tekst') {
      const canvas = canvasRef.current
      setTekstPos(getPos(e, canvas))
      setTekstPixel(getPixelPos(e, canvas))
      setTekstInvoer('')
      return
    }
    const canvas = canvasRef.current
    const pos = getPos(e, canvas)
    startPosRef.current = pos
    lastPos.current = pos
    if (tool !== 'potlood' && tool !== 'gum') {
      snapshotRef.current = canvas.getContext('2d').getImageData(0, 0, canvas.width, canvas.height)
    }
    setActief(true)
  }

  function handleMove(e) {
    e.preventDefault()
    if (!actief) return
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    const pos = getPos(e, canvas)

    if (tool === 'potlood' || tool === 'gum') {
      ctx.beginPath()
      ctx.moveTo(lastPos.current.x, lastPos.current.y)
      ctx.lineTo(pos.x, pos.y)
      ctx.strokeStyle = tool === 'gum' ? '#ffffff' : kleur
      ctx.lineWidth = tool === 'gum' ? grootte * 5 : grootte
      ctx.lineCap = 'round'
      ctx.lineJoin = 'round'
      ctx.stroke()
      lastPos.current = pos
    } else if (tool === 'lijn') {
      ctx.putImageData(snapshotRef.current, 0, 0)
      ctx.beginPath()
      ctx.moveTo(startPosRef.current.x, startPosRef.current.y)
      ctx.lineTo(pos.x, pos.y)
      ctx.strokeStyle = kleur
      ctx.lineWidth = grootte
      ctx.lineCap = 'round'
      ctx.stroke()
    } else if (tool === 'rechthoek') {
      ctx.putImageData(snapshotRef.current, 0, 0)
      ctx.strokeStyle = kleur
      ctx.lineWidth = grootte
      ctx.strokeRect(
        startPosRef.current.x, startPosRef.current.y,
        pos.x - startPosRef.current.x, pos.y - startPosRef.current.y,
      )
    } else if (tool === 'cirkel') {
      ctx.putImageData(snapshotRef.current, 0, 0)
      const rx = (pos.x - startPosRef.current.x) / 2
      const ry = (pos.y - startPosRef.current.y) / 2
      const cx = startPosRef.current.x + rx
      const cy = startPosRef.current.y + ry
      ctx.beginPath()
      ctx.ellipse(cx, cy, Math.abs(rx), Math.abs(ry), 0, 0, 2 * Math.PI)
      ctx.strokeStyle = kleur
      ctx.lineWidth = grootte
      ctx.stroke()
    }
  }

  function handleUp(e) {
    e?.preventDefault()
    if (!actief) return
    setActief(false)
    onTekeningGereed(canvasRef.current)
  }

  function wisCanvas() {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    ctx.fillStyle = '#ffffff'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    onTekeningGereed(null)
  }

  const tools = [
    { id: 'potlood',   label: 'Potlood',   icon: Pencil  },
    { id: 'lijn',      label: 'Lijn',       icon: Minus   },
    { id: 'rechthoek', label: 'Rechthoek',  icon: Square  },
    { id: 'cirkel',    label: 'Cirkel',     icon: Circle  },
    { id: 'tekst',     label: 'Tekst',      icon: Type    },
    { id: 'gum',       label: 'Gum',        icon: Eraser  },
  ]

  const cursor = { potlood: 'crosshair', lijn: 'crosshair', rechthoek: 'crosshair', cirkel: 'crosshair', tekst: 'text', gum: 'cell' }[tool]

  return (
    <div>
      {/* Toolbar */}
      <div className="border border-gray-200 rounded-xl bg-gray-50 p-3 mb-2 flex flex-col gap-2">

        {/* Rij 1: tekentools */}
        <div className="flex items-center gap-1 flex-wrap">
          {tools.map(t => {
            const Icon = t.icon
            return (
              <button
                key={t.id}
                onClick={() => setTool(t.id)}
                title={t.label}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-semibold border transition-all ${
                  tool === t.id
                    ? 'bg-emerald-600 text-white border-emerald-600'
                    : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-100'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{t.label}</span>
              </button>
            )
          })}
          <button
            onClick={wisCanvas}
            className="ml-auto flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-semibold bg-white border border-gray-200 text-gray-500 hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition-all"
          >
            <Trash2 className="w-4 h-4" /> Wis alles
          </button>
        </div>

        {/* Rij 2: kleur + dikte */}
        <div className="flex items-center gap-4 flex-wrap">
          <div className="flex items-center gap-1.5">
            {KLEUREN.map(k => (
              <button
                key={k}
                onClick={() => setKleur(k)}
                className={`w-6 h-6 rounded-full border-2 transition-all ${kleur === k ? 'border-gray-700 scale-125' : 'border-gray-200 hover:scale-110'}`}
                style={{ backgroundColor: k }}
              />
            ))}
          </div>
          <div className="flex items-center gap-1">
            {PEN_GROOTTES.map(g => (
              <button
                key={g}
                onClick={() => setGrootte(g)}
                className={`flex items-center justify-center w-8 h-8 rounded-lg transition-all ${
                  grootte === g ? 'bg-emerald-100 text-emerald-700' : 'bg-white border border-gray-200 text-gray-500 hover:bg-gray-100'
                }`}
              >
                <div className="rounded-full bg-current" style={{ width: g + 4, height: g + 4 }} />
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Canvas */}
      <div className="relative">
        <canvas
          ref={canvasRef}
          width={700}
          height={350}
          className="w-full border border-gray-200 rounded-xl bg-white touch-none"
          style={{ cursor }}
          onMouseDown={handleDown}
          onMouseMove={handleMove}
          onMouseUp={handleUp}
          onMouseLeave={handleUp}
          onTouchStart={handleDown}
          onTouchMove={handleMove}
          onTouchEnd={handleUp}
        />
        {tekstPos && tekstPixel && (
          <input
            ref={tekstInputRef}
            value={tekstInvoer}
            onChange={e => setTekstInvoer(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter') bevestigTekst(); if (e.key === 'Escape') setTekstPos(null) }}
            onBlur={bevestigTekst}
            placeholder="Typ tekst..."
            className="absolute border-2 border-emerald-400 rounded px-2 bg-white/95 focus:outline-none shadow-md"
            style={{
              left: tekstPixel.left,
              top: tekstPixel.top,
              fontSize: `${grootte * 3 + 10}px`,
              color: kleur,
              minWidth: 140,
              transform: 'translateY(-100%)',
            }}
          />
        )}
      </div>
      <p className="text-xs text-gray-400 mt-1">
        Potlood: vrij tekenen · Lijn/Rechthoek/Cirkel: slepen · Tekst: klik en typ · Gum: uitwissen
      </p>
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
  const tekenCanvasRef = useRef(null)

  const handleTekeningGereed = useCallback((canvas) => {
    tekenCanvasRef.current = canvas
  }, [])

  useEffect(() => { laadEntry() }, [week, project])

  async function laadEntry() {
    setLadenEntry(true)
    setOpgeslagen(false)
    setFout('')
    const { data } = await supabase
      .from('logboek').select('*')
      .eq('leerling_id', user.id).eq('project', project).eq('week', week).single()
    if (data) {
      setInhoud(data.inhoud || '')
      setFotoUrl(data.foto_url || '')
      setTekenUrl(data.tekening_url || '')
      setBestaand(data)
    } else {
      setInhoud(''); setFotoUrl(''); setTekenUrl(''); setBestaand(null)
    }
    setLadenEntry(false)
  }

  async function uploadFoto(bestand) {
    const naam = `${user.id}/${project}/week${week}_${Date.now()}.${bestand.name.split('.').pop()}`
    const { error } = await supabase.storage.from('logboek-fotos').upload(naam, bestand)
    if (error) { setFout('Foto uploaden mislukt.'); return null }
    return supabase.storage.from('logboek-fotos').getPublicUrl(naam).data.publicUrl
  }

  async function uploadTekening(canvas) {
    return new Promise(resolve => {
      canvas.toBlob(async blob => {
        if (!blob) { resolve(null); return }
        const naam = `${user.id}/${project}/week${week}_tekening_${Date.now()}.png`
        const { error } = await supabase.storage.from('logboek-fotos').upload(naam, blob, { contentType: 'image/png' })
        if (error) { resolve(null); return }
        resolve(supabase.storage.from('logboek-fotos').getPublicUrl(naam).data.publicUrl)
      }, 'image/png')
    })
  }

  async function opslaan() {
    setLaden(true); setFout(''); setOpgeslagen(false); setUploaden(true)

    let fotoResultUrl = fotoUrl
    if (foto) { const u = await uploadFoto(foto); if (u) fotoResultUrl = u }

    let tekenResultUrl = tekenUrl
    if (tekenCanvasRef.current) { const u = await uploadTekening(tekenCanvasRef.current); if (u) tekenResultUrl = u }

    setUploaden(false)
    const velden = { inhoud, foto_url: fotoResultUrl, tekening_url: tekenResultUrl }

    if (bestaand) {
      const { error } = await supabase.from('logboek').update(velden).eq('id', bestaand.id)
      if (error) { setFout('Opslaan mislukt.'); setLaden(false); return }
    } else {
      const { error } = await supabase.from('logboek').insert({ leerling_id: user.id, project, week, ...velden })
      if (error) { setFout('Opslaan mislukt.'); setLaden(false); return }
    }

    setFotoUrl(fotoResultUrl); setTekenUrl(tekenResultUrl)
    setFoto(null); tekenCanvasRef.current = null
    setOpgeslagen(true); laadEntry(); setLaden(false)
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
              <button key={w} onClick={() => setWeek(w)}
                className={`px-4 py-2 rounded-xl font-semibold text-sm transition-all ${week === w ? 'bg-emerald-600 text-white shadow' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
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
                <button onClick={() => window.print()}
                  className="no-print flex items-center gap-1.5 text-xs bg-gray-100 hover:bg-gray-200 text-gray-600 px-3 py-1 rounded-full transition-colors">
                  <Printer className="w-3.5 h-3.5" /> Afdrukken
                </button>
              )}
            </div>
          </div>

          {ladenEntry ? <div className="text-center py-8 text-gray-400">Laden...</div> : (
            <>
              <textarea
                value={inhoud} onChange={e => setInhoud(e.target.value)}
                placeholder={`Wat heb je deze week geobserveerd? Wat viel je op?\n\nSchrijf hier je aantekeningen...`}
                rows={8}
                className="w-full border border-gray-200 rounded-xl p-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-400 resize-none leading-relaxed"
              />

              {/* Tekenen */}
              <div className="mt-5">
                <label className="flex items-center gap-1.5 text-sm font-medium text-gray-600 mb-3">
                  <PenLine className="w-4 h-4" /> Tekening of schema (optioneel)
                </label>
                <TekenCanvas bestaandeUrl={tekenUrl} onTekeningGereed={handleTekeningGereed} />
              </div>

              {/* Foto upload */}
              <div className="mt-5">
                <label className="flex items-center gap-1.5 text-sm font-medium text-gray-600 mb-2">
                  <Camera className="w-4 h-4" /> Foto toevoegen (optioneel)
                </label>
                <input type="file" accept="image/*"
                  onChange={e => {
                    const b = e.target.files[0]; if (!b) return
                    if (!b.type.startsWith('image/')) { setFout('Alleen afbeeldingen toegestaan.'); e.target.value = ''; return }
                    if (b.size > 5 * 1024 * 1024) { setFout('Maximaal 5 MB.'); e.target.value = ''; return }
                    setFout(''); setFoto(b)
                  }}
                  className="text-sm text-gray-500 file:mr-3 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-emerald-50 file:text-emerald-700 file:font-medium hover:file:bg-emerald-100 cursor-pointer"
                />
                {foto && <p className="flex items-center gap-1 text-xs text-emerald-600 mt-1"><Paperclip className="w-3 h-3" />{foto.name}</p>}
                {fotoUrl && !foto && (
                  <div className="mt-3">
                    <img src={fotoUrl} alt="Foto week" className="rounded-xl max-h-48 object-cover border border-gray-200" />
                    <p className="text-xs text-gray-400 mt-1">Huidige foto</p>
                  </div>
                )}
              </div>

              {/* Feedback */}
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

              <button onClick={opslaan} disabled={laden || uploaden || !inhoud.trim()}
                className="mt-5 w-full flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white font-semibold py-3 rounded-xl transition-colors">
                {uploaden ? <><Upload className="w-4 h-4" /> Uploaden...</> : laden ? 'Opslaan...' : <><Save className="w-4 h-4" /> Opslaan</>}
              </button>

              <div className="flex gap-3 mt-3">
                <button onClick={() => setWeek(w => w - 1)} disabled={week <= 1}
                  className="flex-1 flex items-center justify-center gap-1.5 bg-gray-100 hover:bg-gray-200 disabled:opacity-30 disabled:cursor-not-allowed text-gray-700 font-semibold py-3 rounded-xl transition-colors">
                  <ChevronLeft className="w-4 h-4" /> Week {week - 1}
                </button>
                <button onClick={() => setWeek(w => w + 1)} disabled={week >= 8}
                  className="flex-1 flex items-center justify-center gap-1.5 bg-gray-100 hover:bg-gray-200 disabled:opacity-30 disabled:cursor-not-allowed text-gray-700 font-semibold py-3 rounded-xl transition-colors">
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
