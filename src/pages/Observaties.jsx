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

import { useState, useEffect } from 'react'
import { supabase } from '../supabase'
import { useAuth } from '../App'
import { Microscope, Save, CheckCircle, AlertCircle, ChevronLeft, ChevronRight } from 'lucide-react'

// ---------------------------------------------------------------------------
// Defaults
// ---------------------------------------------------------------------------

function defaultWormenhotel() {
  return {
    vochtigheid: 3,
    geur: 'neutraal',
    activiteit: 'beetje beweging',
    afval_toegevoegd: false,
    afval_omschrijving: '',
    compost_hoeveelheid: 'geen',
    notities: '',
  }
}

function defaultPot() {
  return { hoogte_cm: '', bladkleur: 'lichtgroen', bladeren: '', conditie: 'goed' }
}

function defaultKeuringsdienst() {
  return {
    pot1: defaultPot(),
    pot2: defaultPot(),
    pot3: defaultPot(),
    notities: '',
  }
}

function defaultWilgenvlechten() {
  return {
    weer: 'bewolkt',
    insecten: [],
    vogels: [],
    bijzonderheden: '',
    notities: '',
  }
}

function defaultVoorProject(proj) {
  if (proj === 'keuringsdienst') return defaultKeuringsdienst()
  if (proj === 'wilgenvlechten') return defaultWilgenvlechten()
  return defaultWormenhotel()
}

// ---------------------------------------------------------------------------
// Shared input style helpers
// ---------------------------------------------------------------------------

const inputCls =
  'w-full border border-gray-200 rounded-xl px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-emerald-400 bg-white'

const selectCls = inputCls

// ---------------------------------------------------------------------------
// Wilgenvlechten: checkbox groep helper
// ---------------------------------------------------------------------------

const INSECTEN_OPTIES = ['Bij', 'Hommel', 'Zweefvlieg', 'Vlinder', 'Mier', 'Lieveheersbeestje', 'Wants', 'Anders']
const VOGELS_OPTIES   = ['Mus', 'Merel', 'Koolmees', 'Pimpelmees', 'Specht', 'Ekster', 'Kraai', 'Anders']

function CheckboxGroep({ label, opties, geselecteerd, onChange }) {
  function toggle(optie) {
    if (geselecteerd.includes(optie)) {
      onChange(geselecteerd.filter(o => o !== optie))
    } else {
      onChange([...geselecteerd, optie])
    }
  }
  return (
    <div>
      <label className="block text-sm font-semibold text-gray-700 mb-2">{label}</label>
      <div className="grid grid-cols-2 gap-2">
        {opties.map(optie => (
          <label
            key={optie}
            className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl border cursor-pointer transition-all select-none ${
              geselecteerd.includes(optie)
                ? 'bg-lime-50 border-lime-400 text-lime-800'
                : 'bg-white border-gray-200 text-gray-700 hover:border-gray-300'
            }`}
          >
            <input
              type="checkbox"
              checked={geselecteerd.includes(optie)}
              onChange={() => toggle(optie)}
              className="sr-only"
            />
            <div
              className={`w-4 h-4 rounded flex items-center justify-center shrink-0 transition-colors ${
                geselecteerd.includes(optie) ? 'bg-lime-500' : 'border-2 border-gray-300'
              }`}
            >
              {geselecteerd.includes(optie) && (
                <svg viewBox="0 0 12 12" className="w-3 h-3">
                  <path d="M2 6l3 3 5-5" stroke="white" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              )}
            </div>
            <span className="text-sm font-medium">{optie}</span>
          </label>
        ))}
      </div>
      {geselecteerd.length === 0 && (
        <p className="text-xs text-gray-400 mt-1.5">
          Niets geselecteerd — klik aan wat je hebt gezien.
        </p>
      )}
    </div>
  )
}

function WilgenvlechtenForm({ data, onChange }) {
  function set(key, value) {
    onChange({ ...data, [key]: value })
  }
  return (
    <div className="space-y-6">
      {/* Weer */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Hoe was het weer?
        </label>
        <select value={data.weer} onChange={e => set('weer', e.target.value)} className={selectCls}>
          <option value="zonnig">☀️  Zonnig</option>
          <option value="bewolkt">⛅  Bewolkt</option>
          <option value="regenachtig">🌧️  Regenachtig</option>
          <option value="winderig">💨  Winderig</option>
          <option value="wisselend">🌤️  Wisselend</option>
        </select>
      </div>

      {/* Insecten */}
      <CheckboxGroep
        label="Welke insecten heb je gezien? 🐝"
        opties={INSECTEN_OPTIES}
        geselecteerd={data.insecten || []}
        onChange={val => set('insecten', val)}
      />

      {/* Vogels */}
      <CheckboxGroep
        label="Welke vogels heb je gezien? 🐦"
        opties={VOGELS_OPTIES}
        geselecteerd={data.vogels || []}
        onChange={val => set('vogels', val)}
      />

      {/* Bijzonderheden */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Bijzonderheden{' '}
          <span className="font-normal text-gray-400">(iets speciaals gezien of gehoord?)</span>
        </label>
        <textarea
          value={data.bijzonderheden}
          onChange={e => set('bijzonderheden', e.target.value)}
          placeholder="Bijv. een egel, een slak op de wilgtakken, een regenwormpje..."
          rows={3}
          className={`${inputCls} resize-none leading-relaxed`}
        />
      </div>

      {/* Notities */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Notities / extra opmerkingen
        </label>
        <textarea
          value={data.notities}
          onChange={e => set('notities', e.target.value)}
          placeholder="Hoe ziet je vlechtwerk eruit na deze week? Zijn er al nieuwe takjes aan het groeien?"
          rows={4}
          className={`${inputCls} resize-none leading-relaxed`}
        />
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

const potBadge = {
  gray: 'bg-gray-100 text-gray-700 border-gray-200',
  blue: 'bg-blue-50 text-blue-700 border-blue-200',
  emerald: 'bg-emerald-50 text-emerald-700 border-emerald-200',
}

function PotForm({ label, kleur, potData, onChange }) {
  function set(key, value) {
    onChange({ ...potData, [key]: value })
  }

  return (
    <div className={`border rounded-2xl p-5 ${potBadge[kleur]} bg-opacity-30`}>
      <h3 className="font-bold text-base mb-4">{label}</h3>
      <div className="grid grid-cols-2 gap-4">
        {/* Hoogte */}
        <div className="col-span-2 sm:col-span-1">
          <label className="block text-xs font-semibold mb-1.5 opacity-80">Hoogte (cm)</label>
          <input
            type="number"
            min={0}
            step={0.1}
            value={potData.hoogte_cm}
            onChange={e => set('hoogte_cm', e.target.value === '' ? '' : Number(e.target.value))}
            placeholder="0.0"
            className={inputCls}
          />
        </div>

        {/* Aantal bladeren */}
        <div className="col-span-2 sm:col-span-1">
          <label className="block text-xs font-semibold mb-1.5 opacity-80">Aantal bladeren</label>
          <input
            type="number"
            min={0}
            step={1}
            value={potData.bladeren}
            onChange={e => set('bladeren', e.target.value === '' ? '' : Number(e.target.value))}
            placeholder="0"
            className={inputCls}
          />
        </div>

        {/* Bladkleur */}
        <div className="col-span-2 sm:col-span-1">
          <label className="block text-xs font-semibold mb-1.5 opacity-80">Bladkleur</label>
          <select
            value={potData.bladkleur}
            onChange={e => set('bladkleur', e.target.value)}
            className={selectCls}
          >
            <option value="lichtgroen">Lichtgroen</option>
            <option value="donkergroen">Donkergroen</option>
            <option value="geel">Geel</option>
            <option value="bruin">Bruin</option>
          </select>
        </div>

        {/* Conditie */}
        <div className="col-span-2 sm:col-span-1">
          <label className="block text-xs font-semibold mb-1.5 opacity-80">Conditie</label>
          <select
            value={potData.conditie}
            onChange={e => set('conditie', e.target.value)}
            className={selectCls}
          >
            <option value="uitstekend">Uitstekend</option>
            <option value="goed">Goed</option>
            <option value="matig">Matig</option>
            <option value="slecht">Slecht</option>
          </select>
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
// SVG chart: Wilgenvlechten — insecten & vogels grouped bar chart
// ---------------------------------------------------------------------------

function WilgenvlechtenChart({ observaties }) {
  const W = 560
  const H = 200
  const PAD = { top: 20, right: 20, bottom: 40, left: 44 }
  const weeks = Array.from({ length: 5 }, (_, i) => i + 1)
  const chartW = W - PAD.left - PAD.right
  const chartH = H - PAD.top - PAD.bottom

  const weekData = weeks.map(w => {
    const obs = observaties.find(o => o.week === w)
    if (!obs) return { insecten: null, vogels: null, hasData: false }
    return {
      insecten: obs.data?.insecten?.length || 0,
      vogels: obs.data?.vogels?.length || 0,
      hasData: true,
    }
  })

  const allVals = weekData.filter(d => d.hasData).flatMap(d => [d.insecten, d.vogels])
  const yMax = Math.max(...allVals, 4)

  const SLOT_W = chartW / weeks.length
  const BAR_W  = (SLOT_W * 0.65) / 2

  function xCenter(i) { return PAD.left + (i + 0.5) * SLOT_W }
  function yOf(val)   { return PAD.top + chartH - (val / yMax) * chartH }

  const gridVals = [0, Math.ceil(yMax / 2), yMax]
  const hasData  = weekData.some(d => d.hasData)

  return (
    <div>
      <h3 className="font-bold text-gray-700 mb-3 text-sm">Waargenomen soorten per week</h3>
      {!hasData && (
        <p className="text-sm text-gray-400 italic">Nog geen observaties opgeslagen om te tonen.</p>
      )}
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full" style={{ maxHeight: 220 }} aria-label="Soorten grafiek">
        {/* Grid */}
        {gridVals.map(v => (
          <g key={v}>
            <line x1={PAD.left} x2={W - PAD.right} y1={yOf(v)} y2={yOf(v)} stroke="#e5e7eb" strokeWidth={1} />
            <text x={PAD.left - 6} y={yOf(v) + 4} textAnchor="end" fontSize={10} fill="#9ca3af">{v}</text>
          </g>
        ))}

        {/* X-labels */}
        {weeks.map((w, i) => (
          <text key={w} x={xCenter(i)} y={H - PAD.bottom + 16} textAnchor="middle" fontSize={10} fill="#9ca3af">W{w}</text>
        ))}

        {/* Assen */}
        <line x1={PAD.left} x2={W - PAD.right} y1={H - PAD.bottom} y2={H - PAD.bottom} stroke="#e5e7eb" strokeWidth={1} />
        <line x1={PAD.left} x2={PAD.left} y1={PAD.top} y2={H - PAD.bottom} stroke="#e5e7eb" strokeWidth={1} />

        {/* Bars per week */}
        {weekData.map((d, i) => {
          if (!d.hasData) return null
          const cx       = xCenter(i)
          const bottom   = H - PAD.bottom
          const insPixH  = (d.insecten / yMax) * chartH
          const vogPixH  = (d.vogels  / yMax) * chartH
          return (
            <g key={i}>
              {/* Insecten — lime */}
              <rect
                x={cx - BAR_W - 1} y={bottom - insPixH}
                width={BAR_W} height={Math.max(insPixH, 2)}
                rx={3} fill="#84cc16" opacity={0.85}
              />
              {d.insecten > 0 && (
                <text x={cx - BAR_W / 2 - 1} y={bottom - insPixH - 4} textAnchor="middle" fontSize={9} fontWeight="600" fill="#65a30d">
                  {d.insecten}
                </text>
              )}
              {/* Vogels — sky */}
              <rect
                x={cx + 1} y={bottom - vogPixH}
                width={BAR_W} height={Math.max(vogPixH, 2)}
                rx={3} fill="#38bdf8" opacity={0.85}
              />
              {d.vogels > 0 && (
                <text x={cx + BAR_W / 2 + 1} y={bottom - vogPixH - 4} textAnchor="middle" fontSize={9} fontWeight="600" fill="#0284c7">
                  {d.vogels}
                </text>
              )}
            </g>
          )
        })}
      </svg>

      {/* Legenda */}
      <div className="flex gap-5 mt-2">
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded bg-lime-400" />
          <span className="text-xs text-gray-500">Insectensoorten</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded bg-sky-400" />
          <span className="text-xs text-gray-500">Vogelsoorten</span>
        </div>
      </div>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Main page
// ---------------------------------------------------------------------------

export default function Observaties() {
  const { user, project } = useAuth()

  const aantalWeken = project === 'wilgenvlechten' ? 5 : project === 'keuringsdienst' ? 6 : 6

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
      setFormData({ ...defaultVoorProject(project), ...data.data })
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
                : project === 'wilgenvlechten'
                ? 'Wilgenvlechten — natuur observeren'
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
            {Array.from({ length: aantalWeken }, (_, i) => i + 1).map(w => (
              <button
                key={w}
                onClick={() => { setWeek(w); setOpgeslagen(false) }}
                className={`px-4 py-2 rounded-xl font-semibold text-sm transition-all ${
                  week === w
                    ? 'bg-emerald-600 text-white shadow'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                Week {w}
              </button>
            ))}
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
              ) : project === 'wilgenvlechten' ? (
                <WilgenvlechtenForm data={formData} onChange={setFormData} />
              ) : (
                <WormenhotelForm data={formData} onChange={setFormData} />
              )}

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
              : project === 'wilgenvlechten'
              ? 'Aantal soorten insecten en vogels dat je hebt waargenomen per week.'
              : 'Vochtigheid van het wormenhotel door de weken heen.'}
          </p>

          {project === 'keuringsdienst' ? (
            <KeuringsDienstChart observaties={alleObservaties} />
          ) : project === 'wilgenvlechten' ? (
            <WilgenvlechtenChart observaties={alleObservaties} />
          ) : (
            <WormenhotelChart observaties={alleObservaties} />
          )}
        </div>
      </div>
    </div>
  )
}
