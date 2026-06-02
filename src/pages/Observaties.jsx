/*
-- CREATE TABLE observaties (
--   id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
--   leerling_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
--   project text NOT NULL,
--   week integer NOT NULL,
--   data jsonb NOT NULL DEFAULT '{}',
--   aangemaakt_op timestamptz DEFAULT now(),
--   UNIQUE(leerling_id, project, week)
-- );
-- ALTER TABLE observaties ENABLE ROW LEVEL SECURITY;
-- CREATE POLICY "Users manage own observaties" ON observaties USING (auth.uid() = leerling_id) WITH CHECK (auth.uid() = leerling_id);
*/

import { useState, useEffect, useRef } from 'react'
import { supabase } from '../supabase'
import { useAuth } from '../App'
import { Microscope, Save, CheckCircle, AlertCircle, ChevronLeft, ChevronRight, Camera, X, Sun, Cloud, CloudRain, Wind, CloudSun, Minus, FlaskConical, Leaf } from 'lucide-react'

// ---------------------------------------------------------------------------
// Defaults
// ---------------------------------------------------------------------------

function defaultWormenhotel() {
  return {
    temperatuur_c: '',
    vochtigheid: 3,
    geur: 'neutraal',
    activiteit: 'beetje beweging',
    aantal_wormen: '',
    eicocons: false,
    verteringssnelheid: 'normaal',
    afval_toegevoegd: false,
    afval_omschrijving: '',
    compost_hoeveelheid: 'geen',
    notities: '',
    foto_url: null,
  }
}

function defaultPot() {
  return {
    hoogte_cm:         '',         // rozethoogte
    knol_diameter_mm:  '',         // knoldiameter — hoofdmeting
    knol_zichtbaar:    false,      // knol boven grond zichtbaar
    grondvochtigheid:  'matig',
    geen_bladvorming:  false,
    bladeren:          '',
    bladkleur:         'lichtgroen',
    bladgrootte:       'middel',
    conditie:          'goed',
    ziekte:            'geen',
    bolschieten:       false,      // bolschieten = ongewenst bij radijs
  }
}

function defaultKeuringsdienst() {
  return {
    pot1: defaultPot(),
    pot2: defaultPot(),
    pot3: defaultPot(),
    notities: '',
    foto_url: null,
  }
}

function defaultVoorProject(proj) {
  if (proj === 'keuringsdienst') return defaultKeuringsdienst()
  return defaultWormenhotel()
}

// ---------------------------------------------------------------------------
// Shared input style helpers
// ---------------------------------------------------------------------------

const inputCls =
  'w-full border border-gray-200 rounded-xl px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-emerald-400 bg-white'

const selectCls = inputCls

// ---------------------------------------------------------------------------
// FotoUpload — uploadt een foto naar Supabase Storage
// ---------------------------------------------------------------------------

function FotoUpload({ userId, project, week, fotoUrl, onUpload }) {
  const fileRef = useRef(null)
  const [bezig, setBezig] = useState(false)
  const [fout, setFout] = useState('')

  async function uploaden(e) {
    const file = e.target.files?.[0]
    if (!file) return
    setBezig(true)
    setFout('')
    try {
      const ext = file.name.split('.').pop() || 'jpg'
      const naam = `observaties/${userId}/${project}-w${week}-${Date.now()}.${ext}`
      const { error } = await supabase.storage.from('logboek-fotos').upload(naam, file)
      if (error) throw error
      const url = supabase.storage.from('logboek-fotos').getPublicUrl(naam).data.publicUrl
      onUpload(url)
    } catch (err) {
      setFout('Upload mislukt: ' + (err.message || 'onbekende fout'))
    } finally {
      setBezig(false)
      if (fileRef.current) fileRef.current.value = ''
    }
  }

  return (
    <div>
      <p className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-1.5">
        <Camera className="w-4 h-4" /> Foto bij deze week
      </p>
      {fotoUrl ? (
        <div className="relative inline-block">
          <img src={fotoUrl} alt="Observatie" className="rounded-xl max-h-48 border border-gray-200" />
          <button
            type="button"
            onClick={() => onUpload(null)}
            className="absolute -top-2 -right-2 w-7 h-7 bg-white border border-gray-200 rounded-full flex items-center justify-center text-gray-500 hover:text-red-600 shadow"
            title="Foto verwijderen"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => fileRef.current?.click()}
          disabled={bezig}
          className="w-full border-2 border-dashed border-gray-200 hover:border-emerald-400 hover:bg-emerald-50 disabled:opacity-50 text-gray-500 hover:text-emerald-700 rounded-xl py-6 transition-colors flex flex-col items-center gap-2"
        >
          <Camera className="w-6 h-6" />
          <span className="text-sm font-semibold">{bezig ? 'Uploaden...' : 'Foto toevoegen'}</span>
        </button>
      )}
      <input
        type="file"
        accept="image/*"
        ref={fileRef}
        onChange={uploaden}
        className="hidden"
      />
      {fout && (
        <p className="mt-2 text-sm text-red-600 flex items-center gap-1.5">
          <AlertCircle className="w-3.5 h-3.5" /> {fout}
        </p>
      )}
    </div>
  )
}

// ---------------------------------------------------------------------------
// Wormenhotel visualisatie
// ---------------------------------------------------------------------------

function WormenhotelVisualisatie({ data }) {
  const vochtigheid      = Math.max(1, Math.min(5, Number(data.vochtigheid) || 3))
  const activiteit       = data.activiteit || 'beetje beweging'
  const aantalWormen     = Math.max(0, Math.min(Number(data.aantal_wormen) || 0, 100))
  const eicocons         = !!data.eicocons
  const afvalToegevoegd  = !!data.afval_toegevoegd
  const compost          = data.compost_hoeveelheid || 'geen'
  const temp             = Number(data.temperatuur_c) || null

  const isActief = activiteit !== 'geen beweging'
  // Wiggle + kruipsnelheid op basis van activiteit
  const animDur   = activiteit === 'veel beweging' ? 1.0 : 2.2   // wiggelperiode (s)
  const moveBase  = activiteit === 'veel beweging' ? 10 : 22      // basis kruiptijd (s)
  const moveRange = activiteit === 'veel beweging' ? 8  : 14      // variatie (s)

  // Grondkleur: droger = lichter, natter = donkerder
  const soilPalette = ['#a07840','#8a6030','#6b4520','#523318','#3d2410']
  const soilColor   = soilPalette[vochtigheid - 1]

  // Compostlaag hoogte onderaan
  const compostH = compost === 'veel' ? 36 : compost === 'beetje' ? 20 : 6

  // Visueel aantal wormen = exact het ingevoerde aantal, max 35
  const nWorms = aantalWormen > 0 ? Math.min(aantalWormen, 35) : (isActief ? 8 : 3)

  const W = 240, H = 200
  const padL = 28, padR = W - 28
  const bW   = padR - padL
  const boxTop = 38, boxBot = H - 12
  const bH     = boxBot - boxTop

  // Lagen
  const foodH      = afvalToegevoegd ? 26 : 0
  const foodTop    = boxTop
  const activeTop  = foodTop + foodH
  const activeH    = bH - foodH - compostH - 16
  const compostTop = activeTop + activeH
  const drainTop   = compostTop + compostH

  // Deterministisch willekeurig getal op basis van twee onafhankelijke seeds
  function lcg(a, b) {
    const s = ((a * 48271 + b * 16807 + 1) * 1664525 + 1013904223) & 0x7fffffff
    return s / 0x7fffffff  // 0..1
  }

  // Wormen: elk met een eigen kruippad door de hele grondzone
  const soilTop = activeTop + 4
  const soilBot = drainTop - 4
  const soilH   = soilBot - soilTop
  const soilL   = padL + 4
  const soilR   = padR - 4

  const worms = Array.from({ length: nWorms }, (_, i) => {
    // Unieke x/y via gescheiden seeds
    const x0 = soilL + lcg(i, 1) * (soilR - soilL)
    const y0 = soilTop + lcg(i, 2) * soilH
    const len = 6 + lcg(i, 3) * 5        // 6–11 px
    const amp = 1.5 + lcg(i, 4) * 1.5

    // 3 tussenpunten voor kruippad (allemaal binnen de grond)
    const wx = (n) => soilL + lcg(i * 7 + n, n + 10) * (soilR - soilL)
    const wy = (n) => soilTop + lcg(i * 13 + n, n + 20) * soilH
    const motionPath = `M${x0.toFixed(1)},${y0.toFixed(1)} Q${wx(1).toFixed(1)},${wy(1).toFixed(1)} ${wx(2).toFixed(1)},${wy(2).toFixed(1)} Q${wx(3).toFixed(1)},${wy(3).toFixed(1)} ${wx(4).toFixed(1)},${wy(4).toFixed(1)} Q${wx(5).toFixed(1)},${wy(5).toFixed(1)} ${x0.toFixed(1)},${y0.toFixed(1)}`

    const wigDur   = (animDur * 0.5 + lcg(i, 5) * animDur * 0.7).toFixed(2)
    const moveDur  = (moveBase + lcg(i, 6) * moveRange).toFixed(2)
    const delay    = (lcg(i, 7) * 3).toFixed(2)

    return { x0, y0, len, amp, motionPath, wigDur, moveDur, delay }
  })

  return (
    <div className="rounded-2xl border border-amber-100 bg-gradient-to-b from-amber-50 to-white mb-6">
      <p className="text-center text-xs font-semibold text-amber-700 pt-3 mb-1 tracking-wide uppercase">
        Live wormenhotel
      </p>

      <svg viewBox={`0 0 ${W} ${H}`} xmlns="http://www.w3.org/2000/svg" className="w-full max-w-xs mx-auto block">

        {/* ── Houten zijwanden ── */}
        {/* Links */}
        <rect x={padL - 7} y={boxTop - 2} width={7} height={bH + 4} fill="#8B5E3C"/>
        <rect x={padL - 7} y={boxTop + 14} width={7} height={2} fill="#6b4520" opacity="0.5"/>
        <rect x={padL - 7} y={boxTop + 34} width={7} height={2} fill="#6b4520" opacity="0.5"/>
        {/* Rechts */}
        <rect x={padR} y={boxTop - 2} width={7} height={bH + 4} fill="#8B5E3C"/>
        <rect x={padR} y={boxTop + 14} width={7} height={2} fill="#6b4520" opacity="0.5"/>
        <rect x={padR} y={boxTop + 34} width={7} height={2} fill="#6b4520" opacity="0.5"/>
        {/* Bodem */}
        <rect x={padL - 7} y={boxBot} width={bW + 14} height={7} rx="2" fill="#6b4520"/>

        {/* ── Deksel ── */}
        <rect x={padL - 10} y={boxTop - 12} width={bW + 20} height={12} rx="4" fill="#a07040" stroke="#6b4520" strokeWidth="1"/>
        {/* Ventilatiesleuven */}
        {[0,1,2,3,4].map(i => (
          <rect key={i} x={padL + 10 + i*34} y={boxTop - 9} width={18} height={4} rx="2" fill="#6b4520" opacity="0.35"/>
        ))}

        {/* ── Drainage laag (grind) ── */}
        <rect x={padL} y={drainTop} width={bW} height={boxBot - drainTop} fill="#c8b890"/>
        {Array.from({length: 16}, (_,i) => (
          <ellipse key={i} cx={padL + 8 + (i*13)%(bW-16)} cy={drainTop + 4 + (i*7)%8}
            rx={3 + i%3} ry={2 + i%2} fill="#b0a070" opacity="0.7"/>
        ))}

        {/* ── Volwassen compost (donker onderaan) ── */}
        {compostH > 0 && (
          <rect x={padL} y={compostTop} width={bW} height={compostH} fill="#2a1208"/>
        )}

        {/* ── Actieve compostzone ── */}
        <rect x={padL} y={activeTop} width={bW} height={activeH} fill={soilColor}/>
        {/* Textuur stipjes */}
        {Array.from({length: 18}, (_,i) => (
          <circle key={i} cx={padL + 8 + (i*19)%(bW-16)} cy={activeTop + 6 + (i*11)%(activeH-12)}
            r={1 + i%2} fill="#2e1508" opacity="0.3"/>
        ))}

        {/* Vochtdruppels als vochtigheid hoog is */}
        {vochtigheid >= 4 && Array.from({length: vochtigheid - 2}, (_,i) => {
          const dx = padL + 20 + i * 30
          const dy = activeTop + 18 + (i%2)*20
          return (
            <path key={i}
              d={`M${dx},${dy} Q${dx-3},${dy+7} ${dx},${dy+11} Q${dx+3},${dy+7} ${dx},${dy}`}
              fill="#78b8e0" opacity="0.4"/>
          )
        })}

        {/* ── Voedsellaag bovenin ── */}
        {afvalToegevoegd && (
          <>
            <rect x={padL} y={foodTop} width={bW} height={foodH} fill="#4a7228" opacity="0.65"/>
            {[[padL+18,foodTop+9,'#8dc050'],[padL+45,foodTop+6,'#d4a030'],[padL+75,foodTop+13,'#6b9040'],
              [padL+105,foodTop+7,'#c86030'],[padL+135,foodTop+11,'#90b040'],[padL+160,foodTop+8,'#b8501a']
            ].map(([fx,fy,fc],i)=>(
              <ellipse key={i} cx={fx} cy={fy} rx={6+i%3} ry={3+i%2} fill={fc} opacity="0.85"/>
            ))}
          </>
        )}

        {/* ── Wormen ── */}
        {worms.map(({ x0, y0, len, amp, motionPath, wigDur, moveDur, delay }, i) => {
          const hw = len / 2
          // Worm getekend rondom (0,0) — animateMotion plaatst het op het kruippad
          const d1 = `M${-hw},0 Q${-hw*0.3},${-amp} 0,0 Q${hw*0.4},${amp} ${hw},0`
          const d2 = `M${-hw},0 Q${-hw*0.3},${amp} 0,0 Q${hw*0.4},${-amp} ${hw},0`
          return (
            <path key={i} d={d1}
              fill="none" stroke="#d49860" strokeWidth="1.8" strokeLinecap="round"
            >
              {isActief ? (
                <>
                  {/* Wiebelen */}
                  <animate attributeName="d" values={`${d1};${d2};${d1}`}
                    dur={`${wigDur}s`} begin={`${delay}s`} repeatCount="indefinite"/>
                  {/* Kruipen door de bak — rotate=auto draait worm mee met rijrichting */}
                  <animateMotion path={motionPath}
                    dur={`${moveDur}s`} begin={`${delay}s`} repeatCount="indefinite"
                    rotate="auto"/>
                </>
              ) : (
                /* Geen beweging: worm staat stil op startpositie */
                <animateMotion path={`M${x0.toFixed(1)},${y0.toFixed(1)}`}
                  dur="1s" fill="freeze"/>
              )}
            </path>
          )
        })}

        {/* ── Eicocons ── */}
        {eicocons && [[padL+28,activeTop+18],[padL+95,activeTop+35],[padL+148,activeTop+22]].map(([ex,ey],i) => (
          <ellipse key={i} cx={ex} cy={ey} rx="5" ry="7" fill="#f0e060" stroke="#c8a820" strokeWidth="0.8" opacity="0.9">
            <animate attributeName="opacity" values="0.9;0.6;0.9" dur="3s" begin={`${i*0.8}s`} repeatCount="indefinite"/>
          </ellipse>
        ))}

        {/* ── Temperatuur badge ── */}
        {temp !== null && temp > 0 && (
          <g>
            <rect x={padR - 34} y={boxTop + 4} width={32} height={17} rx="5" fill="white" opacity="0.88"/>
            <text x={padR - 18} y={boxTop + 16} textAnchor="middle" fontSize="9.5" fill="#c84040" fontWeight="bold">
              {temp}°C
            </text>
          </g>
        )}

        {/* ── Glas-outline over box ── */}
        <rect x={padL} y={boxTop} width={bW} height={bH} fill="none" stroke="#6b4520" strokeWidth="1.5"/>

      </svg>

      {/* Legenda */}
      <div className="flex justify-center gap-3 pb-3 flex-wrap px-4">
        <span className="text-[10px] text-amber-700 bg-amber-100 px-2 py-0.5 rounded-full font-medium">
          Vocht {vochtigheid}/5
        </span>
        <span className="text-[10px] text-amber-700 bg-amber-100 px-2 py-0.5 rounded-full font-medium">
          {aantalWormen > 0 ? `~${aantalWormen} wormen` : 'wormen onbekend'}
        </span>
        <span className="text-[10px] text-amber-700 bg-amber-100 px-2 py-0.5 rounded-full font-medium">
          {activiteit}
        </span>
        {eicocons && (
          <span className="text-[10px] text-yellow-700 bg-yellow-100 px-2 py-0.5 rounded-full font-medium">
            eicocons aanwezig
          </span>
        )}
      </div>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Wormenhotel form
// ---------------------------------------------------------------------------

function WormenhotelForm({ data, onChange }) {
  function set(key, value) {
    onChange({ ...data, [key]: value })
  }

  return (
    <div className="space-y-6">
      {/* Temperatuur + wormentelling */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Temperatuur (°C)</label>
          <input
            type="number"
            min={0}
            max={50}
            step={0.5}
            value={data.temperatuur_c ?? ''}
            onChange={e => set('temperatuur_c', e.target.value === '' ? '' : Number(e.target.value))}
            placeholder="20.0"
            className={inputCls}
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Geschat aantal wormen</label>
          <input
            type="number"
            min={0}
            step={1}
            value={data.aantal_wormen ?? ''}
            onChange={e => set('aantal_wormen', e.target.value === '' ? '' : Number(e.target.value))}
            placeholder="0"
            className={inputCls}
          />
        </div>
      </div>

      {/* Eicocons + verteringssnelheid */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Verteringssnelheid</label>
          <select value={data.verteringssnelheid ?? 'normaal'} onChange={e => set('verteringssnelheid', e.target.value)} className={selectCls}>
            <option value="snel">Snel</option>
            <option value="normaal">Normaal</option>
            <option value="langzaam">Langzaam</option>
          </select>
        </div>
        <div className="flex items-end pb-0.5">
          <label className="flex items-center gap-2.5 cursor-pointer select-none h-[46px]">
            <input
              type="checkbox"
              checked={!!data.eicocons}
              onChange={e => set('eicocons', e.target.checked)}
              className="w-4 h-4 rounded accent-emerald-600"
            />
            <span className="text-sm font-semibold text-gray-700">Eicocons gezien</span>
          </label>
        </div>
      </div>

      {/* Vochtigheid */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Vochtigheid{' '}
          <span className="font-normal text-gray-400">
            (1 = erg droog · 3 = ideaal · 5 = erg nat)
          </span>
        </label>
        <div className="flex items-center gap-4">
          <input
            type="range"
            min={1}
            max={5}
            step={1}
            value={data.vochtigheid}
            onChange={e => set('vochtigheid', Number(e.target.value))}
            className="flex-1 accent-emerald-600 h-2 cursor-pointer"
          />
          <span
            className={`w-10 h-10 flex items-center justify-center rounded-xl font-bold text-lg shrink-0 ${
              data.vochtigheid === 3
                ? 'bg-emerald-100 text-emerald-700'
                : data.vochtigheid < 2 || data.vochtigheid > 4
                ? 'bg-red-100 text-red-700'
                : 'bg-amber-100 text-amber-700'
            }`}
          >
            {data.vochtigheid}
          </span>
        </div>
        <div className="flex justify-between text-xs text-gray-400 mt-1 px-0.5">
          <span>Erg droog</span>
          <span>Ideaal</span>
          <span>Erg nat</span>
        </div>
      </div>

      {/* Geur */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">Geur</label>
        <select value={data.geur} onChange={e => set('geur', e.target.value)} className={selectCls}>
          <option value="bosgrond">Bosgrond (aards)</option>
          <option value="neutraal">Neutraal</option>
          <option value="zuur">Zuur</option>
          <option value="stinkt">Stinkt</option>
        </select>
      </div>

      {/* Activiteit */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">Activiteit wormen</label>
        <select
          value={data.activiteit}
          onChange={e => set('activiteit', e.target.value)}
          className={selectCls}
        >
          <option value="veel beweging">Veel beweging</option>
          <option value="beetje beweging">Beetje beweging</option>
          <option value="nauwelijks beweging">Nauwelijks beweging</option>
        </select>
      </div>

      {/* Afval toegevoegd */}
      <div>
        <label className="flex items-center gap-3 cursor-pointer select-none">
          <div className="relative">
            <input
              type="checkbox"
              checked={data.afval_toegevoegd}
              onChange={e => set('afval_toegevoegd', e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:ring-2 peer-focus:ring-emerald-400 rounded-full peer peer-checked:bg-emerald-500 transition-colors" />
            <div className="absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform peer-checked:translate-x-5" />
          </div>
          <span className="text-sm font-semibold text-gray-700">Afval toegevoegd deze week?</span>
        </label>
      </div>

      {/* Afval omschrijving */}
      {data.afval_toegevoegd && (
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Wat heb je toegevoegd?
          </label>
          <input
            type="text"
            value={data.afval_omschrijving}
            onChange={e => set('afval_omschrijving', e.target.value)}
            placeholder="Bijv. groenteschillen, koffiedik, eierschalen..."
            className={inputCls}
          />
        </div>
      )}

      {/* Compost hoeveelheid */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Hoeveelheid klaar compost
        </label>
        <select
          value={data.compost_hoeveelheid}
          onChange={e => set('compost_hoeveelheid', e.target.value)}
          className={selectCls}
        >
          <option value="geen">Geen</option>
          <option value="sporen">Sporen (nauwelijks zichtbaar)</option>
          <option value="beetje">Beetje</option>
          <option value="matig">Matig</option>
          <option value="veel">Veel</option>
        </select>
      </div>

      {/* Notities */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Notities / extra opmerkingen
        </label>
        <textarea
          value={data.notities}
          onChange={e => set('notities', e.target.value)}
          placeholder="Wat viel je op? Wat is er veranderd ten opzichte van vorige week?"
          rows={4}
          className={`${inputCls} resize-none leading-relaxed`}
        />
      </div>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Keuringsdienst: single pot section
// ---------------------------------------------------------------------------

const POT_META = [
  { key: 'pot1', label: 'Pot 1 – Controle (geen toevoeging)', kleur: 'gray' },
  { key: 'pot2', label: 'Pot 2 – Kunstmest', kleur: 'blue' },
  { key: 'pot3', label: 'Pot 3 – Compostthee', kleur: 'emerald' },
]

// ---------------------------------------------------------------------------
// Keuringsdienst: live plant SVG visualisatie
// ---------------------------------------------------------------------------

const LEAF_COLORS = {
  lichtgroen:  { fill: '#7dcf5a', stroke: '#4fa832', vein: '#3d9020' },
  donkergroen: { fill: '#2e8b2e', stroke: '#1d5c1d', vein: '#145014' },
  geel:        { fill: '#ddc24a', stroke: '#b89a20', vein: '#8c7010' },
  bruin:       { fill: '#8b5e3c', stroke: '#5e3a1e', vein: '#3e2010' },
}

// Samengesteld radijsblad: bladsteel + 2-3 paren zijblaadjes + eindblaadje
function radijsBlad(sx, crownY, hoek, lengte, lkl, droop, ziek, idx) {
  // hoek in graden (0 = rechts, -90 = omhoog)
  const droopExtra = droop ? 45 : 0
  const sideSign   = hoek <= -90 ? -1 : 1
  const adjHoek    = hoek + sideSign * droopExtra
  const ar         = adjHoek * Math.PI / 180

  const ex = sx + Math.cos(ar) * lengte
  const ey = crownY + Math.sin(ar) * lengte

  // Perpendiculaire richting voor zijblaadjes
  const px = -Math.sin(ar)
  const py =  Math.cos(ar)

  // Zijblaadje helper
  function zijblad(t, breedte, side) {
    const bx = sx + Math.cos(ar) * lengte * t
    const by = crownY + Math.sin(ar) * lengte * t
    const lx = bx + px * side * breedte
    const ly = by + py * side * breedte
    const bladHoek = adjHoek + side * 55
    return (
      <ellipse
        cx={lx} cy={ly}
        rx={breedte * 0.75} ry={breedte * 0.45}
        fill={ziek ? '#9e7a18' : lkl.fill}
        stroke={lkl.stroke} strokeWidth="0.5"
        transform={`rotate(${bladHoek},${lx},${ly})`}
      />
    )
  }

  const paren = lengte > 35 ? [[0.35, 7], [0.62, 8.5]] : [[0.45, 7]]

  return (
    <g key={idx} opacity={droop ? 0.85 : 1}>
      {/* Bladsteel */}
      <path
        d={`M${sx},${crownY} Q${sx+Math.cos(ar)*lengte*0.5},${crownY+Math.sin(ar)*lengte*0.5} ${ex},${ey}`}
        fill="none" stroke={lkl.vein} strokeWidth="1.5" strokeLinecap="round"
      />
      {/* Zijblaadjes */}
      {paren.map(([t, breedte], pi) =>
        [-1, 1].map(side => (
          <g key={`${pi}-${side}`}>{zijblad(t, breedte, side)}</g>
        ))
      )}
      {/* Eindblaadje (groter) */}
      <ellipse
        cx={ex} cy={ey}
        rx={lengte > 30 ? 11 : 7} ry={lengte > 30 ? 7 : 4.5}
        fill={ziek && idx%2===0 ? '#9e7a18' : lkl.fill}
        stroke={lkl.stroke} strokeWidth="0.5"
        transform={`rotate(${adjHoek},${ex},${ey})`}
      />
      {/* Middennerf eindblaadje */}
      <line
        x1={ex - Math.cos(ar)*7} y1={ey - Math.sin(ar)*7}
        x2={ex + Math.cos(ar)*5} y2={ey + Math.sin(ar)*5}
        stroke={lkl.vein} strokeWidth="0.6" opacity="0.7"
      />
      {/* Ziektespot */}
      {ziek && idx%2===0 && (
        <circle
          cx={ex - Math.cos(ar)*3 + px*4}
          cy={ey - Math.sin(ar)*3 + py*4}
          r="2" fill="#5a2e08" opacity="0.7"
        />
      )}
    </g>
  )
}

function PotVisualisatie({ potData, potIdx }) {
  const hoogte       = Math.max(0, Number(potData.hoogte_cm) || 0)
  const knolDiam     = Math.max(0, Number(potData.knol_diameter_mm) || 0)
  const nBladeren    = potData.geen_bladvorming ? 0 : Math.max(0, Math.min(Number(potData.bladeren) || 0, 10))
  const bladgr       = potData.bladgrootte || 'middel'
  const lkl          = LEAF_COLORS[potData.bladkleur] || LEAF_COLORS.lichtgroen
  const droop        = potData.conditie === 'slecht'
  const sway         = potData.conditie === 'matig'
  const ziek         = (potData.ziekte || 'geen') !== 'geen'
  const bolschieten  = !!potData.bolschieten
  const hasPlant     = hoogte > 0 || knolDiam > 0

  const W = 110, H = 250
  const sx = W / 2

  // Glazen pot geometrie
  const potTopY   = 140   // bovenkant pot (binnenkant)
  const potBotY   = H - 8 // onderkant pot
  const iTopW     = 36    // halve breedte binnenkant boven
  const iBotW     = 26    // halve breedte binnenkant onder
  const oTopW     = 40    // halve breedte buitenkant boven
  const oBotW     = 30    // halve breedte buitenkant onder
  const rimY      = potTopY - 8
  const soilY     = potTopY + 8   // grondoppervlak

  // Knol
  const maxKnol = 18
  const knolR    = knolDiam > 0
    ? Math.min(knolDiam / 45, 1) * maxKnol + 3
    : (hoogte > 0 ? 3 : 0)
  const knolCY   = soilY + knolR * 0.45
  const crownY   = soilY - Math.min(knolR * 0.3, 5)

  // Wortels — penwortel en zijwortels op basis van groeifase
  const rootStart = knolCY + knolR
  const potSpace  = potBotY - 10 - rootStart
  const rootFrac  = hasPlant ? Math.min(0.25 + (knolDiam / 45) * 0.65 + (hoogte / 30) * 0.1, 0.92) : 0
  const mainRootY = rootStart + potSpace * rootFrac

  // Bladeren rozet
  const bladHoeken = []
  if (nBladeren > 0) {
    const spreiding = Math.min(75, 20 + nBladeren * 10)
    for (let i = 0; i < nBladeren; i++) {
      bladHoeken.push(nBladeren === 1
        ? -90
        : -90 + (-spreiding + i * (2 * spreiding / (nBladeren - 1)))
      )
    }
  }
  const bladGrFactor = bladgr === 'groot' ? 1.25 : bladgr === 'klein' ? 0.7 : 1
  const bladLen      = (18 + Math.min(hoogte / 17, 1) * 55) * bladGrFactor
  const boltSteelLen = 45

  const clipId = `gc${potIdx}`

  return (
    <svg viewBox={`0 0 ${W} ${H}`} xmlns="http://www.w3.org/2000/svg" className="w-full">
      <defs>
        <clipPath id={clipId}>
          <path d={`M${sx-iTopW},${potTopY} L${sx-iBotW},${potBotY} L${sx+iBotW},${potBotY} L${sx+iTopW},${potTopY} Z`}/>
        </clipPath>
      </defs>

      {/* ── 1. Grondvulling — hele pot interior ── */}
      <rect x={0} y={potTopY} width={W} height={potBotY - potTopY}
        fill="#7a4a22" clipPath={`url(#${clipId})`}/>
      {/* Lichtere laag bovenin voor variatie */}
      <rect x={0} y={potTopY} width={W} height={22}
        fill="#6b3d1a" clipPath={`url(#${clipId})`} opacity="0.6"/>

      {/* ── 2. Wortels (zichtbaar door glas) ── */}
      {hasPlant && rootFrac > 0 && (
        <g clipPath={`url(#${clipId})`}>
          {/* Penwortel */}
          <path
            d={`M${sx},${rootStart} Q${sx+3},${(rootStart+mainRootY)/2} ${sx},${mainRootY}`}
            fill="none" stroke="#d4aa70" strokeWidth="2" strokeLinecap="round"
          />
          {rootFrac > 0.22 && (
            <path d={`M${sx},${rootStart+potSpace*0.18} Q${sx-10},${rootStart+potSpace*0.24} ${sx-17},${rootStart+potSpace*0.21}`}
              fill="none" stroke="#d4aa70" strokeWidth="1.2" strokeLinecap="round"/>
          )}
          {rootFrac > 0.3 && (
            <path d={`M${sx},${rootStart+potSpace*0.29} Q${sx+9},${rootStart+potSpace*0.34} ${sx+16},${rootStart+potSpace*0.32}`}
              fill="none" stroke="#d4aa70" strokeWidth="1.2" strokeLinecap="round"/>
          )}
          {rootFrac > 0.42 && (
            <path d={`M${sx},${rootStart+potSpace*0.41} Q${sx-8},${rootStart+potSpace*0.48} ${sx-14},${rootStart+potSpace*0.47}`}
              fill="none" stroke="#d4aa70" strokeWidth="1" strokeLinecap="round" opacity="0.85"/>
          )}
          {rootFrac > 0.55 && (
            <>
              <path d={`M${sx},${rootStart+potSpace*0.53} Q${sx+7},${rootStart+potSpace*0.58} ${sx+13},${rootStart+potSpace*0.57}`}
                fill="none" stroke="#d4aa70" strokeWidth="1" strokeLinecap="round" opacity="0.8"/>
              <path d={`M${sx-17},${rootStart+potSpace*0.21} Q${sx-22},${rootStart+potSpace*0.27} ${sx-19},${rootStart+potSpace*0.33}`}
                fill="none" stroke="#c8986a" strokeWidth="0.7" strokeLinecap="round" opacity="0.65"/>
            </>
          )}
          {rootFrac > 0.68 && (
            <>
              <path d={`M${sx},${rootStart+potSpace*0.66} Q${sx-6},${rootStart+potSpace*0.74} ${sx-11},${rootStart+potSpace*0.73}`}
                fill="none" stroke="#d4aa70" strokeWidth="0.9" strokeLinecap="round" opacity="0.7"/>
              <path d={`M${sx+16},${rootStart+potSpace*0.32} Q${sx+19},${rootStart+potSpace*0.42} ${sx+15},${rootStart+potSpace*0.5}`}
                fill="none" stroke="#c8986a" strokeWidth="0.7" strokeLinecap="round" opacity="0.6"/>
            </>
          )}
        </g>
      )}

      {/* ── 3. Grondoppervlak (dekt wortelhals) ── */}
      <ellipse cx={sx} cy={soilY+2} rx={iTopW} ry="7" fill="#3e2208" clipPath={`url(#${clipId})`}/>
      <ellipse cx={sx} cy={soilY}   rx={iTopW-2} ry="5" fill="#5c3518" opacity="0.95" clipPath={`url(#${clipId})`}/>
      {[[sx-11,soilY-1],[sx+8,soilY-2],[sx-2,soilY-4],[sx+14,soilY],[sx-15,soilY]].map(([x,y],i)=>(
        <circle key={i} cx={x} cy={y} r="1.2" fill="#2e1508" opacity="0.5"/>
      ))}

      {/* ── 4. Radijs knol ── */}
      {knolR > 2 && (
        <>
          <ellipse cx={sx} cy={knolCY} rx={knolR} ry={knolR*1.1} fill="#d42b2b" stroke="#a01818" strokeWidth="0.8"/>
          <ellipse cx={sx-knolR*0.28} cy={knolCY-knolR*0.28} rx={knolR*0.28} ry={knolR*0.18} fill="rgba(255,255,255,0.3)"/>
          <ellipse cx={sx} cy={knolCY+knolR*0.85} rx={knolR*0.25} ry={knolR*0.15} fill="#f0e0d0" opacity="0.65"/>
          <ellipse cx={sx} cy={soilY+3} rx={iTopW-1} ry="5.5" fill="#3e2208" clipPath={`url(#${clipId})`}/>
          <ellipse cx={sx} cy={soilY+1} rx={iTopW-3} ry="4" fill="#5c3518" opacity="0.9" clipPath={`url(#${clipId})`}/>
        </>
      )}

      {/* ── 5. Bolschietsteel + bladeren + bloem ── */}
      {bolschieten && hoogte > 0 && (
        <path d={`M${sx},${crownY} Q${sx+8},${crownY-boltSteelLen*0.5} ${sx+5},${crownY-boltSteelLen}`}
          fill="none" stroke="#5a8a34" strokeWidth="2" strokeLinecap="round"/>
      )}
      {bladHoeken.map((hoek, i) =>
        radijsBlad(sx, crownY, hoek, bladLen, lkl, droop || (sway && i%2===0), ziek, i)
      )}
      {bolschieten && hoogte > 0 && (() => {
        const bx = sx + 5, by = crownY - boltSteelLen
        return (
          <g>
            {[0,72,144,216,288].map((a,i) => {
              const r2 = (a-90)*Math.PI/180
              const px2 = bx + Math.cos(r2)*7, py2 = by + Math.sin(r2)*7
              return <ellipse key={i} cx={px2} cy={py2} rx="5" ry="3"
                fill="#fff9e0" stroke="#d4b000" strokeWidth="0.5"
                transform={`rotate(${a},${px2},${py2})`}/>
            })}
            <circle cx={bx} cy={by} r="3.5" fill="#ffe000" stroke="#c8a800" strokeWidth="0.5"/>
          </g>
        )
      })()}

      {/* ── 6. Glas outline — altijd als laatste, tekent over grond ── */}
      <path
        d={`M${sx-oTopW},${potTopY} L${sx-oBotW},${potBotY} L${sx+oBotW},${potBotY} L${sx+oTopW},${potTopY} Z`}
        fill="none" stroke="#89bdd3" strokeWidth="2"
      />
      {/* Glasglans */}
      <path d={`M${sx-oTopW+3},${potTopY+6} L${sx-oBotW+2},${potBotY-6}`}
        fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="1.8" strokeLinecap="round"/>
      {/* Bodem */}
      <ellipse cx={sx} cy={potBotY} rx={oBotW} ry="3.5" fill="rgba(140,200,225,0.2)" stroke="#89bdd3" strokeWidth="2"/>
      {/* Rand / lip */}
      <rect x={sx-oTopW-3} y={rimY} width={(oTopW+3)*2} height="12" rx="5"
        fill="rgba(180,220,240,0.2)" stroke="#89bdd3" strokeWidth="2"/>
      <rect x={sx-oTopW} y={rimY+2} width={oTopW*2} height="3" rx="2" fill="rgba(255,255,255,0.35)"/>
    </svg>
  )
}

const POT_VIS = [
  { key: 'pot1', label: 'Pot 1', sub: 'Controle',    kleurDot: 'bg-gray-400'    },
  { key: 'pot2', label: 'Pot 2', sub: 'Kunstmest',   kleurDot: 'bg-blue-400'    },
  { key: 'pot3', label: 'Pot 3', sub: 'Compostthee', kleurDot: 'bg-emerald-500' },
]

function DriePotenVisualisatie({ data }) {
  return (
    <div className="rounded-2xl border border-sky-100 mb-6 bg-gradient-to-b from-sky-50 to-white">
      <p className="text-center text-xs font-semibold text-sky-400 pt-3 mb-1 tracking-wide uppercase">
        Live radijsweergave
      </p>
      <div className="flex justify-around items-end px-2 pb-3">
        {POT_VIS.map(({ key, label, sub, kleurDot }, i) => (
          <div key={key} className="flex flex-col items-center w-[30%]">
            <PotVisualisatie potData={data[key]} potIdx={i} />
            <div className="flex items-center gap-1 mt-1">
              <div className={`w-2 h-2 rounded-full ${kleurDot} shrink-0`}/>
              <p className="text-xs font-bold text-gray-700">{label}</p>
            </div>
            <p className="text-[10px] text-gray-400">{sub}</p>
            <p className="text-[10px] text-red-500 font-medium mt-0.5">
              {Number(data[key]?.knol_diameter_mm) > 0 ? `${data[key].knol_diameter_mm} mm` : '—'}
            </p>
            <p className="text-[10px] text-emerald-600">
              {Number(data[key]?.hoogte_cm) > 0 ? `${data[key].hoogte_cm} cm` : ''}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}

const potBadge = {
  gray: 'bg-gray-100 text-gray-700 border-gray-200',
  blue: 'bg-blue-50 text-blue-700 border-blue-200',
  emerald: 'bg-emerald-50 text-emerald-700 border-emerald-200',
}

function PotForm({ label, kleur, potData, onChange }) {
  function set(key, value) {
    onChange({ ...potData, [key]: value })
  }

  const geenBladvorming = !!potData.geen_bladvorming

  return (
    <div className={`border rounded-2xl p-5 ${potBadge[kleur]} bg-opacity-30`}>
      <h3 className="font-bold text-base mb-1">{label}</h3>
      <p className="text-[11px] opacity-60 mb-4">Vul de metingen in voor deze pot</p>

      {/* ── Groeiafmetingen ── */}
      <p className="text-[10px] font-bold uppercase tracking-wide opacity-50 mb-2">Groei</p>
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div>
          <label className="block text-xs font-semibold mb-1.5 opacity-80">
            Rozethoogte (cm)
          </label>
          <input
            type="number" min={0} step={0.5}
            value={potData.hoogte_cm}
            onChange={e => set('hoogte_cm', e.target.value === '' ? '' : Number(e.target.value))}
            placeholder="0.0"
            className={inputCls}
          />
        </div>
        <div>
          <label className="block text-xs font-semibold mb-1.5 opacity-80">
            Knoldiameter (mm) — hoofdmeting
          </label>
          <input
            type="number" min={0} step={1}
            value={potData.knol_diameter_mm ?? ''}
            onChange={e => set('knol_diameter_mm', e.target.value === '' ? '' : Number(e.target.value))}
            placeholder="0"
            className={inputCls}
          />
        </div>
      </div>

      {/* Knol zichtbaar */}
      <div className="mb-4">
        <label className="flex items-center gap-2.5 cursor-pointer select-none">
          <input
            type="checkbox"
            checked={!!potData.knol_zichtbaar}
            onChange={e => set('knol_zichtbaar', e.target.checked)}
            className="w-4 h-4 rounded accent-emerald-600"
          />
          <span className="text-xs font-semibold opacity-80">
            Knol zichtbaar boven de grond
          </span>
        </label>
      </div>

      {/* ── Bladeren ── */}
      <p className="text-[10px] font-bold uppercase tracking-wide opacity-50 mb-2">Bladeren</p>
      <div className="mb-3">
        <label className="flex items-center gap-2.5 cursor-pointer select-none">
          <input
            type="checkbox"
            checked={geenBladvorming}
            onChange={e => set('geen_bladvorming', e.target.checked)}
            className="w-4 h-4 rounded accent-emerald-600"
          />
          <span className="text-xs font-semibold opacity-80">Nog geen bladvorming</span>
        </label>
      </div>

      {!geenBladvorming && (
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div>
            <label className="block text-xs font-semibold mb-1.5 opacity-80">Aantal bladeren</label>
            <input
              type="number" min={0} step={1}
              value={potData.bladeren}
              onChange={e => set('bladeren', e.target.value === '' ? '' : Number(e.target.value))}
              placeholder="0"
              className={inputCls}
            />
          </div>
          <div>
            <label className="block text-xs font-semibold mb-1.5 opacity-80">Bladgrootte</label>
            <select
              value={potData.bladgrootte ?? 'middel'}
              onChange={e => set('bladgrootte', e.target.value)}
              className={selectCls}
            >
              <option value="klein">Klein</option>
              <option value="middel">Middel</option>
              <option value="groot">Groot</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-semibold mb-1.5 opacity-80">Bladkleur</label>
            <select
              value={potData.bladkleur}
              onChange={e => set('bladkleur', e.target.value)}
              className={selectCls}
            >
              <option value="lichtgroen">Lichtgroen</option>
              <option value="donkergroen">Donkergroen</option>
              <option value="geel">Geel (chlorose)</option>
              <option value="bruin">Bruin / afstervend</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-semibold mb-1.5 opacity-80">Conditie</label>
            <select
              value={potData.conditie}
              onChange={e => set('conditie', e.target.value)}
              className={selectCls}
            >
              <option value="uitstekend">Uitstekend</option>
              <option value="goed">Goed</option>
              <option value="matig">Matig (slap)</option>
              <option value="slecht">Slecht (hangend)</option>
            </select>
          </div>
        </div>
      )}

      {/* ── Overig ── */}
      <p className="text-[10px] font-bold uppercase tracking-wide opacity-50 mb-2">Overig</p>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-semibold mb-1.5 opacity-80">Grondvochtigheid</label>
          <select
            value={potData.grondvochtigheid ?? 'matig'}
            onChange={e => set('grondvochtigheid', e.target.value)}
            className={selectCls}
          >
            <option value="droog">Droog</option>
            <option value="matig">Matig</option>
            <option value="nat">Nat</option>
          </select>
        </div>
        <div>
          <label className="block text-xs font-semibold mb-1.5 opacity-80">Ziekte / plaag</label>
          <select
            value={potData.ziekte ?? 'geen'}
            onChange={e => set('ziekte', e.target.value)}
            className={selectCls}
          >
            <option value="geen">Geen</option>
            <option value="bladluis">Bladluis</option>
            <option value="aardvlo">Aardvlo (gaatjes)</option>
            <option value="valse meeldauw">Valse meeldauw</option>
            <option value="wortelrot">Wortelrot</option>
            <option value="andere ziekte">Anders</option>
          </select>
        </div>
        <div className="col-span-2">
          <label className="flex items-center gap-2.5 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={!!potData.bolschieten}
              onChange={e => set('bolschieten', e.target.checked)}
              className="w-4 h-4 rounded accent-amber-500"
            />
            <span className="text-xs font-semibold opacity-80">
              Bolschieten zichtbaar{' '}
              <span className="font-normal opacity-60">(ongewenst — knol stopt met groeien)</span>
            </span>
          </label>
        </div>
      </div>
    </div>
  )
}

function KeuringsDienstForm({ data, onChange }) {
  function setPot(key, value) {
    onChange({ ...data, [key]: value })
  }

  return (
    <div className="space-y-5">
      <DriePotenVisualisatie data={data} />

      {POT_META.map(({ key, label, kleur }) => (
        <PotForm
          key={key}
          label={label}
          kleur={kleur}
          potData={data[key]}
          onChange={val => setPot(key, val)}
        />
      ))}

      {/* Notities */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Notities / extra opmerkingen
        </label>
        <textarea
          value={data.notities}
          onChange={e => onChange({ ...data, notities: e.target.value })}
          placeholder="Wat viel je op? Zijn er verschillen tussen de potten?"
          rows={4}
          className={`${inputCls} resize-none leading-relaxed`}
        />
      </div>
    </div>
  )
}

// ---------------------------------------------------------------------------
// SVG chart: Wormenhotel — vochtigheid line chart
// ---------------------------------------------------------------------------

function WormenhotelChart({ observaties }) {
  const W = 560
  const H = 200
  const PAD = { top: 20, right: 20, bottom: 40, left: 44 }
  const weeks = Array.from({ length: 6 }, (_, i) => i + 1)

  // Map week → vochtigheid (or null)
  const punten = weeks.map(w => {
    const obs = observaties.find(o => o.week === w)
    return obs ? Number(obs.data?.vochtigheid ?? null) : null
  })

  const chartW = W - PAD.left - PAD.right
  const chartH = H - PAD.top - PAD.bottom

  // X/Y helpers
  function xOf(weekIdx) {
    return PAD.left + (weekIdx / 7) * chartW
  }
  function yOf(val) {
    // val 1–5
    return PAD.top + chartH - ((val - 1) / 4) * chartH
  }

  // Build polyline points string (skip nulls → split into segments)
  const segments = []
  let current = []
  punten.forEach((v, i) => {
    if (v !== null) {
      current.push(`${xOf(i)},${yOf(v)}`)
    } else {
      if (current.length > 0) { segments.push(current); current = [] }
    }
  })
  if (current.length > 0) segments.push(current)

  // Horizontal gridlines for values 1–5
  const gridVals = [1, 2, 3, 4, 5]

  const hasData = punten.some(v => v !== null)

  return (
    <div>
      <h3 className="font-bold text-gray-700 mb-3 text-sm">Vochtigheid per week</h3>
      {!hasData && (
        <p className="text-sm text-gray-400 italic">Nog geen observaties opgeslagen om te tonen.</p>
      )}
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="w-full"
        style={{ maxHeight: 220 }}
        aria-label="Vochtigheid grafiek"
      >
        {/* Grid lijnen */}
        {gridVals.map(v => (
          <g key={v}>
            <line
              x1={PAD.left}
              x2={W - PAD.right}
              y1={yOf(v)}
              y2={yOf(v)}
              stroke={v === 3 ? '#6ee7b7' : '#e5e7eb'}
              strokeWidth={v === 3 ? 1.5 : 1}
              strokeDasharray={v === 3 ? '6 4' : undefined}
            />
            <text
              x={PAD.left - 8}
              y={yOf(v) + 4}
              textAnchor="end"
              fontSize={10}
              fill="#9ca3af"
            >
              {v}
            </text>
          </g>
        ))}

        {/* Ideaal label */}
        <text x={W - PAD.right + 2} y={yOf(3) + 4} fontSize={9} fill="#10b981" textAnchor="start">
          ideaal
        </text>

        {/* X-as labels */}
        {weeks.map((w, i) => (
          <text
            key={w}
            x={xOf(i)}
            y={H - PAD.bottom + 16}
            textAnchor="middle"
            fontSize={10}
            fill="#9ca3af"
          >
            W{w}
          </text>
        ))}

        {/* X-as lijn */}
        <line
          x1={PAD.left}
          x2={W - PAD.right}
          y1={H - PAD.bottom}
          y2={H - PAD.bottom}
          stroke="#e5e7eb"
          strokeWidth={1}
        />

        {/* Y-as lijn */}
        <line
          x1={PAD.left}
          x2={PAD.left}
          y1={PAD.top}
          y2={H - PAD.bottom}
          stroke="#e5e7eb"
          strokeWidth={1}
        />

        {/* Data lijnen (per segment zodat gaps mogelijk zijn) */}
        {segments.map((seg, si) => (
          <polyline
            key={si}
            points={seg.join(' ')}
            fill="none"
            stroke="#059669"
            strokeWidth={2.5}
            strokeLinejoin="round"
            strokeLinecap="round"
          />
        ))}

        {/* Data punten */}
        {punten.map((v, i) =>
          v !== null ? (
            <g key={i}>
              <circle cx={xOf(i)} cy={yOf(v)} r={5} fill="#059669" stroke="white" strokeWidth={2} />
              <text
                x={xOf(i)}
                y={yOf(v) - 9}
                textAnchor="middle"
                fontSize={10}
                fontWeight="600"
                fill="#065f46"
              >
                {v}
              </text>
            </g>
          ) : null
        )}
      </svg>

      {/* Legenda */}
      <div className="flex items-center gap-2 mt-2">
        <div className="w-5 h-0.5 bg-emerald-600 rounded" />
        <span className="text-xs text-gray-500">Vochtigheid (1–5)</span>
        <div className="w-5 h-0.5 border-t-2 border-dashed border-emerald-400 ml-3" />
        <span className="text-xs text-gray-500">Ideale waarde (3)</span>
      </div>
    </div>
  )
}

// ---------------------------------------------------------------------------
// SVG chart: Keuringsdienst — plant hoogte 3 lijnen
// ---------------------------------------------------------------------------

const POT_CHART_META = [
  { key: 'pot1', label: 'Pot 1 – Controle', stroke: '#6b7280', fill: '#f3f4f6' },
  { key: 'pot2', label: 'Pot 2 – Kunstmest', stroke: '#3b82f6', fill: '#eff6ff' },
  { key: 'pot3', label: 'Pot 3 – Compostthee', stroke: '#10b981', fill: '#ecfdf5' },
]

function KeuringsDienstChart({ observaties }) {
  const W = 560
  const H = 220
  const PAD = { top: 20, right: 20, bottom: 40, left: 48 }
  const weeks = Array.from({ length: 6 }, (_, i) => i + 1)
  const chartW = W - PAD.left - PAD.right
  const chartH = H - PAD.top - PAD.bottom

  // Collect all heights to compute Y scale
  const allHeights = []
  observaties.forEach(obs => {
    POT_CHART_META.forEach(({ key }) => {
      const h = Number(obs.data?.[key]?.hoogte_cm)
      if (!isNaN(h) && h > 0) allHeights.push(h)
    })
  })
  const maxH = allHeights.length > 0 ? Math.max(...allHeights) : 20
  // Round maxH up to nice number
  const yMax = Math.ceil(maxH / 5) * 5 || 20

  function xOf(weekIdx) {
    return PAD.left + (weekIdx / 7) * chartW
  }
  function yOf(val) {
    return PAD.top + chartH - (val / yMax) * chartH
  }

  // Y-grid: 5 lines
  const gridCount = 5
  const gridVals = Array.from({ length: gridCount + 1 }, (_, i) =>
    Math.round((yMax / gridCount) * i)
  )

  const hasData = allHeights.length > 0

  return (
    <div>
      <h3 className="font-bold text-gray-700 mb-3 text-sm">Planthoogte per week (cm)</h3>
      {!hasData && (
        <p className="text-sm text-gray-400 italic">Nog geen observaties opgeslagen om te tonen.</p>
      )}
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="w-full"
        style={{ maxHeight: 240 }}
        aria-label="Planthoogte grafiek"
      >
        {/* Grid lijnen */}
        {gridVals.map(v => (
          <g key={v}>
            <line
              x1={PAD.left}
              x2={W - PAD.right}
              y1={yOf(v)}
              y2={yOf(v)}
              stroke="#e5e7eb"
              strokeWidth={1}
            />
            <text
              x={PAD.left - 6}
              y={yOf(v) + 4}
              textAnchor="end"
              fontSize={10}
              fill="#9ca3af"
            >
              {v}
            </text>
          </g>
        ))}

        {/* X-as labels */}
        {weeks.map((w, i) => (
          <text
            key={w}
            x={xOf(i)}
            y={H - PAD.bottom + 16}
            textAnchor="middle"
            fontSize={10}
            fill="#9ca3af"
          >
            W{w}
          </text>
        ))}

        {/* Assen */}
        <line
          x1={PAD.left} x2={W - PAD.right}
          y1={H - PAD.bottom} y2={H - PAD.bottom}
          stroke="#e5e7eb" strokeWidth={1}
        />
        <line
          x1={PAD.left} x2={PAD.left}
          y1={PAD.top} y2={H - PAD.bottom}
          stroke="#e5e7eb" strokeWidth={1}
        />

        {/* Per pot: lijn + punten */}
        {POT_CHART_META.map(({ key, stroke }) => {
          const punten = weeks.map((w, i) => {
            const obs = observaties.find(o => o.week === w)
            const h = obs ? Number(obs.data?.[key]?.hoogte_cm) : NaN
            return !isNaN(h) && h >= 0 && obs ? { x: xOf(i), y: yOf(h), val: h, hasObs: true } : null
          })

          // Build polyline segments (skip nulls)
          const segments = []
          let cur = []
          punten.forEach(p => {
            if (p) cur.push(`${p.x},${p.y}`)
            else { if (cur.length) { segments.push(cur); cur = [] } }
          })
          if (cur.length) segments.push(cur)

          return (
            <g key={key}>
              {segments.map((seg, si) => (
                <polyline
                  key={si}
                  points={seg.join(' ')}
                  fill="none"
                  stroke={stroke}
                  strokeWidth={2.5}
                  strokeLinejoin="round"
                  strokeLinecap="round"
                />
              ))}
              {punten.map((p, i) =>
                p ? (
                  <g key={i}>
                    <circle cx={p.x} cy={p.y} r={4.5} fill={stroke} stroke="white" strokeWidth={2} />
                    {p.val > 0 && (
                      <text
                        x={p.x}
                        y={p.y - 8}
                        textAnchor="middle"
                        fontSize={9}
                        fontWeight="600"
                        fill={stroke}
                      >
                        {p.val}
                      </text>
                    )}
                  </g>
                ) : null
              )}
            </g>
          )
        })}
      </svg>

      {/* Legenda */}
      <div className="flex flex-wrap gap-4 mt-2">
        {POT_CHART_META.map(({ label, stroke }) => (
          <div key={label} className="flex items-center gap-1.5">
            <div className="w-5 h-0.5 rounded" style={{ backgroundColor: stroke, height: 3 }} />
            <span className="text-xs text-gray-500">{label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Main page
// ---------------------------------------------------------------------------

export default function Observaties() {
  const { user, project } = useAuth()

  const aantalWeken = 6

  const [week, setWeek] = useState(1)
  const [formData, setFormData] = useState(() => defaultVoorProject(project))
  const [bestaandId, setBestaandId] = useState(null)
  const [laden, setLaden] = useState(false)
  const [ladenEntry, setLadenEntry] = useState(false)
  const [opgeslagen, setOpgeslagen] = useState(false)
  const [fout, setFout] = useState('')
  const [alleObservaties, setAlleObservaties] = useState([])

  // Reset formData when project changes
  useEffect(() => {
    setFormData(defaultVoorProject(project))
    setWeek(1)
  }, [project])

  // Load entry for current week
  useEffect(() => {
    if (user && project) {
      laadEntry()
    }
  }, [week, project, user])

  // Load all observations for chart
  useEffect(() => {
    if (user && project) {
      laadAlleObservaties()
    }
  }, [project, user])

  async function laadEntry() {
    setLadenEntry(true)
    setOpgeslagen(false)
    setFout('')

    const { data, error } = await supabase
      .from('observaties')
      .select('*')
      .eq('leerling_id', user.id)
      .eq('project', project)
      .eq('week', week)
      .maybeSingle()

    if (data) {
      setBestaandId(data.id)
      // Merge saved data with defaults to handle new fields gracefully
      const defaults = defaultVoorProject(project)
      if (project === 'keuringsdienst') {
        // Deep merge for nested pot objects
        const merged = { ...defaults, ...data.data }
        for (const k of ['pot1', 'pot2', 'pot3']) {
          merged[k] = { ...defaults.pot1, ...(data.data[k] || {}) }
        }
        setFormData(merged)
      } else {
        setFormData({ ...defaults, ...data.data })
      }
    } else {
      setBestaandId(null)
      setFormData(defaultVoorProject(project))
    }

    setLadenEntry(false)
  }

  async function laadAlleObservaties() {
    const { data } = await supabase
      .from('observaties')
      .select('week, data')
      .eq('leerling_id', user.id)
      .eq('project', project)
      .order('week', { ascending: true })

    setAlleObservaties(data || [])
  }

  async function opslaan() {
    setLaden(true)
    setFout('')
    setOpgeslagen(false)

    const payload = {
      leerling_id: user.id,
      project,
      week,
      data: formData,
    }

    let error
    if (bestaandId) {
      ;({ error } = await supabase
        .from('observaties')
        .update({ data: formData })
        .eq('id', bestaandId))
    } else {
      ;({ error } = await supabase.from('observaties').insert(payload))
    }

    if (error) {
      // Try upsert as fallback (handles race conditions)
      const { error: upsertError } = await supabase.from('observaties').upsert(
        { ...payload },
        { onConflict: 'leerling_id,project,week' }
      )
      if (upsertError) {
        setFout('Opslaan mislukt. Probeer het opnieuw.')
        setLaden(false)
        return
      }
    }

    setOpgeslagen(true)
    setLaden(false)
    laadEntry()
    laadAlleObservaties()
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Banner */}
      <div
        className="relative overflow-hidden text-white p-8"
        style={{
          background: 'linear-gradient(135deg, #1b4332 0%, #2d6a4f 50%, #40916c 100%)',
        }}
      >
        {/* Decoratieve SVG achtergrond */}
        <svg
          className="absolute inset-0 w-full h-full"
          viewBox="0 0 800 160"
          preserveAspectRatio="xMidYMid slice"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="740" cy="38" r="36" fill="#FFF9C4" opacity="0.12" />
          <circle cx="740" cy="38" r="24" fill="#FFEE58" opacity="0.08" />
          <ellipse cx="160" cy="30" rx="52" ry="16" fill="white" opacity="0.07" />
          <ellipse cx="500" cy="22" rx="44" ry="14" fill="white" opacity="0.06" />
          <rect x="20" y="105" width="12" height="55" rx="3" fill="#081c15" opacity="0.45" />
          <ellipse cx="26" cy="82" rx="36" ry="58" fill="#1b4332" opacity="0.50" />
          <ellipse cx="26" cy="62" rx="26" ry="40" fill="#2d6a4f" opacity="0.40" />
          <rect x="768" y="100" width="12" height="60" rx="3" fill="#081c15" opacity="0.45" />
          <ellipse cx="774" cy="76" rx="38" ry="60" fill="#1b4332" opacity="0.50" />
          <ellipse cx="774" cy="56" rx="27" ry="42" fill="#2d6a4f" opacity="0.40" />
          <path
            d="M0,140 Q100,132 200,138 Q300,144 400,138 Q500,132 600,140 Q700,148 800,140 L800,160 L0,160 Z"
            fill="#081c15"
            opacity="0.28"
          />
        </svg>

        <div className="relative max-w-2xl mx-auto flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-white/15 flex items-center justify-center shrink-0">
            <Microscope className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold drop-shadow">Wekelijkse Observaties</h1>
            <p className="text-sm drop-shadow" style={{ opacity: 0.82 }}>
              {project === 'keuringsdienst'
                ? 'Keuringsdienst van Waarde — planten bijhouden'
                : 'Wormenhotel — wekelijks controleren'}
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto p-6 space-y-6">
        {/* Week selector */}
        <div className="bg-white rounded-2xl shadow p-5">
          <p className="text-sm font-semibold text-gray-600 mb-3">Selecteer een week:</p>
          <div className="flex flex-wrap gap-2">
            {Array.from({ length: aantalWeken }, (_, i) => i + 1).map(w => {
              const isActive = week === w
              return (
                <button
                  key={w}
                  onClick={() => { setWeek(w); setOpgeslagen(false) }}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-xl font-semibold text-sm transition-all ${
                    isActive
                      ? 'bg-emerald-600 text-white shadow'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  Week {w}
                </button>
              )
            })}
          </div>
        </div>

        {/* Formulier */}
        <div className="bg-white rounded-2xl shadow p-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-lg font-bold text-gray-800">
              Observatie — Week {week}
            </h2>
            {bestaandId && (
              <span className="text-xs text-gray-400 bg-gray-100 px-2.5 py-1 rounded-full">
                Eerder opgeslagen
              </span>
            )}
          </div>

          {ladenEntry ? (
            <div className="text-center py-12 text-gray-400 text-sm">Laden...</div>
          ) : (
            <>
              {project === 'keuringsdienst' ? (
                <KeuringsDienstForm data={formData} onChange={setFormData} />
              ) : (
                <>
                  <WormenhotelVisualisatie data={formData} />
                  <WormenhotelForm data={formData} onChange={setFormData} />
                </>
              )}

              {/* Foto upload */}
              <div className="mt-6 pt-6 border-t border-gray-100">
                <FotoUpload
                  userId={user.id}
                  project={project}
                  week={week}
                  fotoUrl={formData.foto_url}
                  onUpload={url => setFormData(d => ({ ...d, foto_url: url }))}
                />
              </div>

              {/* Feedback berichten */}
              {fout && (
                <div className="mt-5 flex items-center gap-2 bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-3 text-sm">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  {fout}
                </div>
              )}
              {opgeslagen && (
                <div className="mt-5 flex items-center gap-2 bg-emerald-50 border border-emerald-200 text-emerald-700 rounded-xl px-4 py-3 text-sm">
                  <CheckCircle className="w-4 h-4 shrink-0" />
                  Observatie opgeslagen voor week {week}!
                </div>
              )}

              {/* Opslaan knop */}
              <button
                onClick={opslaan}
                disabled={laden}
                className="mt-6 w-full flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white font-semibold py-3 rounded-xl transition-colors"
              >
                {laden ? (
                  'Opslaan...'
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    {bestaandId ? 'Bijwerken' : 'Opslaan'}
                  </>
                )}
              </button>

              {/* Navigatie knoppen */}
              <div className="flex gap-3 mt-3">
                <button
                  onClick={() => { setWeek(w => w - 1); setOpgeslagen(false) }}
                  disabled={week <= 1}
                  className="flex-1 flex items-center justify-center gap-1.5 bg-gray-100 hover:bg-gray-200 disabled:opacity-30 disabled:cursor-not-allowed text-gray-700 font-semibold py-3 rounded-xl transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" /> Week {week - 1}
                </button>
                <button
                  onClick={() => { setWeek(w => w + 1); setOpgeslagen(false) }}
                  disabled={week >= aantalWeken}
                  className="flex-1 flex items-center justify-center gap-1.5 bg-gray-100 hover:bg-gray-200 disabled:opacity-30 disabled:cursor-not-allowed text-gray-700 font-semibold py-3 rounded-xl transition-colors"
                >
                  Week {week + 1} <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </>
          )}
        </div>

        {/* Grafiek sectie */}
        <div className="bg-white rounded-2xl shadow p-6">
          <h2 className="text-lg font-bold text-gray-800 mb-1">Overzicht alle weken</h2>
          <p className="text-sm text-gray-400 mb-5">
            {project === 'keuringsdienst'
              ? 'Planthoogte van alle drie de potten door de weken heen.'
              : 'Vochtigheid van het wormenhotel door de weken heen.'}
          </p>

          {project === 'keuringsdienst' ? (
            <KeuringsDienstChart observaties={alleObservaties} />
          ) : (
            <WormenhotelChart observaties={alleObservaties} />
          )}
        </div>
      </div>
    </div>
  )
}
