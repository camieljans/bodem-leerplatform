import { useState } from 'react'
import {
  Plus, X, FileText, Target, Flag, Layers, Sparkles, Info,
} from 'lucide-react'

export const KLEUREN = ['emerald', 'teal', 'lime', 'amber', 'rose', 'sky']

export const LEEG_PROJECT = {
  naam: '', ondertitel: '', beschrijving: '', centraleVraag: '',
  duur: '5 weken', kleur: 'emerald',
  themas: [],
  leerdoelen: { kennis: [''], vaardigheden: [''], houding: [''] },
  eindproduct: { beschrijving: '', vormen: [{ label: '', beschrijving: '' }] },
  fases: [{ nr: 1, naam: '', duur: '', beschrijving: '', activiteiten: [''], tip: '' }],
  weetjes: [''],
}

// Zet een DB-record om naar vorm-shape (zorgt dat lege arrays een lege regel hebben)
export function dbNaarVorm(p) {
  const ld = p.leerdoelen || {}
  const ep = p.eindproduct || {}
  return {
    naam: p.naam || '',
    ondertitel: p.ondertitel || '',
    beschrijving: p.beschrijving || '',
    centraleVraag: p.centrale_vraag || '',
    duur: p.duur || '',
    kleur: p.kleur || 'emerald',
    themas: p.themas || [],
    leerdoelen: {
      kennis:       (ld.kennis || []).length ? ld.kennis : [''],
      vaardigheden: (ld.vaardigheden || []).length ? ld.vaardigheden : [''],
      houding:      (ld.houding || []).length ? ld.houding : [''],
    },
    eindproduct: {
      beschrijving: ep.beschrijving || '',
      vormen: (ep.vormen || []).length ? ep.vormen : [{ label: '', beschrijving: '' }],
    },
    fases: (p.fases || []).length ? p.fases.map(f => ({
      nr: f.nr, naam: f.naam || '', duur: f.duur || '',
      beschrijving: f.beschrijving || '', activiteiten: (f.activiteiten || []).length ? f.activiteiten : [''],
      tip: f.tip || '',
    })) : LEEG_PROJECT.fases,
    weetjes: (p.weetjes || []).length ? p.weetjes : [''],
  }
}

// Zet vorm-shape om naar DB-payload (lege items eruit)
export function vormNaarPayload(vorm) {
  return {
    naam: vorm.naam.trim(),
    ondertitel: vorm.ondertitel.trim() || null,
    beschrijving: vorm.beschrijving.trim(),
    centrale_vraag: vorm.centraleVraag.trim() || null,
    duur: vorm.duur.trim() || null,
    kleur: vorm.kleur,
    themas: vorm.themas,
    leerdoelen: {
      kennis:       vorm.leerdoelen.kennis.map(s => s.trim()).filter(Boolean),
      vaardigheden: vorm.leerdoelen.vaardigheden.map(s => s.trim()).filter(Boolean),
      houding:      vorm.leerdoelen.houding.map(s => s.trim()).filter(Boolean),
    },
    eindproduct: {
      beschrijving: vorm.eindproduct.beschrijving.trim(),
      vormen: vorm.eindproduct.vormen
        .map(v => ({ label: v.label.trim(), beschrijving: v.beschrijving.trim() }))
        .filter(v => v.label || v.beschrijving),
    },
    fases: vorm.fases.map(f => ({
      nr: Number(f.nr) || 0,
      naam: f.naam.trim(),
      duur: f.duur.trim(),
      beschrijving: f.beschrijving.trim(),
      activiteiten: f.activiteiten.map(a => a.trim()).filter(Boolean),
      tip: f.tip.trim(),
    })).filter(f => f.naam || f.beschrijving),
    weetjes: vorm.weetjes.map(w => w.trim()).filter(Boolean),
  }
}

export const TABS = [
  { id: 'basis',       label: 'Basis',       icon: FileText },
  { id: 'leerdoelen',  label: 'Leerdoelen',  icon: Target },
  { id: 'eindproduct', label: 'Eindproduct', icon: Flag },
  { id: 'fases',       label: 'Fases',       icon: Layers },
  { id: 'weetjes',     label: 'Weetjes',     icon: Sparkles },
]

export default function ProjectFormTabs({ vorm, setVorm }) {
  const [tab, setTab] = useState('basis')
  const set = (key, value) => setVorm(v => ({ ...v, [key]: value }))

  return (
    <div>
      {/* Tabs */}
      <div className="flex flex-wrap gap-2 mb-6 border-b border-stone-200 pb-3">
        {TABS.map(t => {
          const Icon = t.icon
          return (
            <button key={t.id} type="button" onClick={() => setTab(t.id)}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-semibold transition-colors ${
                tab === t.id ? 'bg-emerald-700 text-white' : 'text-stone-600 hover:bg-stone-100'
              }`}>
              <Icon className="w-4 h-4" /> {t.label}
            </button>
          )
        })}
      </div>

      {tab === 'basis'       && <BasisTab vorm={vorm} set={set} />}
      {tab === 'leerdoelen'  && <LeerdoelenTab vorm={vorm} setVorm={setVorm} />}
      {tab === 'eindproduct' && <EindproductTab vorm={vorm} setVorm={setVorm} />}
      {tab === 'fases'       && <FasesTab vorm={vorm} setVorm={setVorm} />}
      {tab === 'weetjes'     && <WeetjesTab vorm={vorm} setVorm={setVorm} />}
    </div>
  )
}

// ─── Tab: Basis ────────────────────────────────────────────────────────────
function BasisTab({ vorm, set }) {
  const [themaTekst, setThemaTekst] = useState('')
  function voegThemaToe() {
    const t = themaTekst.trim()
    if (!t || vorm.themas.includes(t)) return
    set('themas', [...vorm.themas, t])
    setThemaTekst('')
  }
  return (
    <div className="space-y-5">
      <Veld label="Projectnaam *" hint="Bijv. 'Het Insectenhuis'">
        <input type="text" value={vorm.naam} onChange={e => set('naam', e.target.value)}
          className={input} placeholder="Bijv. Het Insectenhuis" />
      </Veld>
      <Veld label="Ondertitel" hint="Korte krachtige zin onder de titel">
        <input type="text" value={vorm.ondertitel} onChange={e => set('ondertitel', e.target.value)}
          className={input} placeholder="Insecten als schakel tussen bloem en bodem" />
      </Veld>
      <Veld label="Korte beschrijving *" hint="Verschijnt op het keuze-kaartje (1-2 zinnen)">
        <textarea value={vorm.beschrijving} onChange={e => set('beschrijving', e.target.value)}
          rows={3} className={input}
          placeholder="Bouw een insectenhotel naast de bloemenstrook en ontdek hoe insecten en bodem samen de kringloop draaien." />
      </Veld>
      <Veld label="Centrale vraag" hint="De hoofdvraag die het project beantwoordt">
        <textarea value={vorm.centraleVraag} onChange={e => set('centraleVraag', e.target.value)}
          rows={2} className={input}
          placeholder="Hoe helpen insecten mee aan een gezonde bodem?" />
      </Veld>
      <div className="grid grid-cols-2 gap-4">
        <Veld label="Duur">
          <input type="text" value={vorm.duur} onChange={e => set('duur', e.target.value)}
            className={input} placeholder="5 weken" />
        </Veld>
        <Veld label="Kleurthema">
          <select value={vorm.kleur} onChange={e => set('kleur', e.target.value)} className={input}>
            {KLEUREN.map(k => <option key={k} value={k}>{k}</option>)}
          </select>
        </Veld>
      </div>
      <Veld label="Thema's" hint="Tags die het project kenmerken (bijv. 'Biodiversiteit', 'Bodemleven')">
        <div className="flex gap-2">
          <input type="text" value={themaTekst} onChange={e => setThemaTekst(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); voegThemaToe() } }}
            className={input + ' flex-1'} placeholder="Typ een thema en druk Enter" />
          <button type="button" onClick={voegThemaToe}
            className="px-4 py-3 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-sm font-semibold">
            <Plus className="w-4 h-4" />
          </button>
        </div>
        <div className="flex flex-wrap gap-2 mt-3">
          {vorm.themas.map((t, i) => (
            <span key={i} className="bg-emerald-100 text-emerald-800 rounded-full px-3 py-1 text-sm font-semibold flex items-center gap-1.5">
              {t}
              <button type="button" onClick={() => set('themas', vorm.themas.filter((_, j) => j !== i))}
                className="hover:bg-emerald-200 rounded-full p-0.5">
                <X className="w-3 h-3" />
              </button>
            </span>
          ))}
        </div>
      </Veld>
    </div>
  )
}

// ─── Tab: Leerdoelen ───────────────────────────────────────────────────────
function LeerdoelenTab({ vorm, setVorm }) {
  function update(categorie, idx, waarde) {
    setVorm(v => {
      const kopie = { ...v.leerdoelen, [categorie]: [...v.leerdoelen[categorie]] }
      kopie[categorie][idx] = waarde
      return { ...v, leerdoelen: kopie }
    })
  }
  function voegToe(categorie) {
    setVorm(v => ({ ...v, leerdoelen: { ...v.leerdoelen, [categorie]: [...v.leerdoelen[categorie], ''] } }))
  }
  function verwijder(categorie, idx) {
    setVorm(v => {
      const arr = v.leerdoelen[categorie].filter((_, i) => i !== idx)
      return { ...v, leerdoelen: { ...v.leerdoelen, [categorie]: arr.length ? arr : [''] } }
    })
  }
  const cats = [
    { key: 'kennis',       label: 'Kennis',       hint: 'Wat de leerling leert (feiten, begrippen)' },
    { key: 'vaardigheden', label: 'Vaardigheden', hint: 'Wat de leerling kan na afloop' },
    { key: 'houding',      label: 'Houding',      hint: 'Welke houding/inzicht de leerling ontwikkelt' },
  ]
  return (
    <div className="space-y-6">
      {cats.map(c => (
        <div key={c.key}>
          <div className="flex items-center justify-between mb-2">
            <div>
              <label className="text-sm font-semibold text-gray-700">{c.label}</label>
              <p className="text-xs text-stone-500">{c.hint}</p>
            </div>
            <button type="button" onClick={() => voegToe(c.key)}
              className="flex items-center gap-1 text-emerald-700 hover:text-emerald-900 text-sm font-semibold">
              <Plus className="w-3.5 h-3.5" /> Doel toevoegen
            </button>
          </div>
          <div className="space-y-2">
            {vorm.leerdoelen[c.key].map((d, i) => (
              <div key={i} className="flex gap-2">
                <input type="text" value={d} onChange={e => update(c.key, i, e.target.value)}
                  className={input + ' flex-1'} placeholder={`${c.label.toLowerCase()}-doel ${i + 1}`} />
                <button type="button" onClick={() => verwijder(c.key, i)}
                  className="p-3 text-stone-400 hover:text-red-600 hover:bg-red-50 rounded-xl">
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

// ─── Tab: Eindproduct ──────────────────────────────────────────────────────
function EindproductTab({ vorm, setVorm }) {
  function update(idx, veld, waarde) {
    setVorm(v => {
      const nieuw = [...v.eindproduct.vormen]; nieuw[idx] = { ...nieuw[idx], [veld]: waarde }
      return { ...v, eindproduct: { ...v.eindproduct, vormen: nieuw } }
    })
  }
  function voegToe() {
    setVorm(v => ({ ...v, eindproduct: { ...v.eindproduct, vormen: [...v.eindproduct.vormen, { label: '', beschrijving: '' }] } }))
  }
  function verwijder(idx) {
    setVorm(v => {
      const arr = v.eindproduct.vormen.filter((_, i) => i !== idx)
      return { ...v, eindproduct: { ...v.eindproduct, vormen: arr.length ? arr : [{ label: '', beschrijving: '' }] } }
    })
  }
  return (
    <div className="space-y-5">
      <Veld label="Beschrijving eindproduct" hint="Wat moet de leerling aan het eind van het project hebben gemaakt?">
        <textarea value={vorm.eindproduct.beschrijving}
          onChange={e => setVorm(v => ({ ...v, eindproduct: { ...v.eindproduct, beschrijving: e.target.value } }))}
          rows={3} className={input}
          placeholder="Een werkend insectenhotel + een presentatie over hoe het de kringloop helpt." />
      </Veld>
      <div>
        <div className="flex items-center justify-between mb-2">
          <div>
            <label className="text-sm font-semibold text-gray-700">Mogelijke vormen</label>
            <p className="text-xs text-stone-500">Verschillende manieren waarop de leerling het kan presenteren</p>
          </div>
          <button type="button" onClick={voegToe}
            className="flex items-center gap-1 text-emerald-700 hover:text-emerald-900 text-sm font-semibold">
            <Plus className="w-3.5 h-3.5" /> Vorm toevoegen
          </button>
        </div>
        <div className="space-y-3">
          {vorm.eindproduct.vormen.map((v, i) => (
            <div key={i} className="flex gap-2 items-start">
              <input type="text" value={v.label} onChange={e => update(i, 'label', e.target.value)}
                className={input + ' w-40'} placeholder="Bijv. 'Video'" />
              <input type="text" value={v.beschrijving} onChange={e => update(i, 'beschrijving', e.target.value)}
                className={input + ' flex-1'} placeholder="Korte omschrijving" />
              <button type="button" onClick={() => verwijder(i)}
                className="p-3 text-stone-400 hover:text-red-600 hover:bg-red-50 rounded-xl shrink-0">
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// ─── Tab: Fases ────────────────────────────────────────────────────────────
function FasesTab({ vorm, setVorm }) {
  function updateFase(idx, veld, waarde) {
    setVorm(v => { const nieuw = [...v.fases]; nieuw[idx] = { ...nieuw[idx], [veld]: waarde }; return { ...v, fases: nieuw } })
  }
  function updateActiviteit(idx, ai, waarde) {
    setVorm(v => {
      const nieuw = [...v.fases]
      const act = [...nieuw[idx].activiteiten]; act[ai] = waarde
      nieuw[idx] = { ...nieuw[idx], activiteiten: act }
      return { ...v, fases: nieuw }
    })
  }
  function voegActiviteitToe(idx) {
    setVorm(v => { const nieuw = [...v.fases]; nieuw[idx] = { ...nieuw[idx], activiteiten: [...nieuw[idx].activiteiten, ''] }; return { ...v, fases: nieuw } })
  }
  function verwijderActiviteit(idx, ai) {
    setVorm(v => {
      const nieuw = [...v.fases]
      const act = nieuw[idx].activiteiten.filter((_, i) => i !== ai)
      nieuw[idx] = { ...nieuw[idx], activiteiten: act.length ? act : [''] }
      return { ...v, fases: nieuw }
    })
  }
  function voegFaseToe() {
    setVorm(v => ({
      ...v, fases: [...v.fases, { nr: v.fases.length + 1, naam: '', duur: '', beschrijving: '', activiteiten: [''], tip: '' }],
    }))
  }
  function verwijderFase(idx) {
    setVorm(v => {
      const arr = v.fases.filter((_, i) => i !== idx)
      return { ...v, fases: arr.length ? arr : LEEG_PROJECT.fases }
    })
  }
  return (
    <div className="space-y-5">
      <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 text-sm text-emerald-800 flex items-start gap-2">
        <Info className="w-4 h-4 mt-0.5 shrink-0" />
        Fases zijn grotere stappen binnen het project. Vergelijkbaar met "Introductie", "Onderzoek", "Bouwen", "Presentatie".
      </div>
      {vorm.fases.map((f, i) => (
        <div key={i} className="border border-stone-200 rounded-2xl p-5 bg-white space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-stone-900">Fase {i + 1}</h3>
            <button type="button" onClick={() => verwijderFase(i)}
              className="text-red-600 hover:bg-red-50 px-3 py-1.5 rounded-lg text-sm font-semibold flex items-center gap-1">
              <X className="w-3.5 h-3.5" /> Fase verwijderen
            </button>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Veld label="Naam">
              <input type="text" value={f.naam} onChange={e => updateFase(i, 'naam', e.target.value)}
                className={input} placeholder="Bijv. 'Introductie'" />
            </Veld>
            <Veld label="Duur">
              <input type="text" value={f.duur} onChange={e => updateFase(i, 'duur', e.target.value)}
                className={input} placeholder="Bijv. '1 les'" />
            </Veld>
          </div>
          <Veld label="Beschrijving">
            <textarea value={f.beschrijving} onChange={e => updateFase(i, 'beschrijving', e.target.value)}
              rows={2} className={input} placeholder="Wat gebeurt er in deze fase?" />
          </Veld>
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-semibold text-gray-700">Activiteiten</label>
              <button type="button" onClick={() => voegActiviteitToe(i)}
                className="text-emerald-700 hover:text-emerald-900 text-sm font-semibold flex items-center gap-1">
                <Plus className="w-3.5 h-3.5" /> Activiteit toevoegen
              </button>
            </div>
            <div className="space-y-2">
              {f.activiteiten.map((a, ai) => (
                <div key={ai} className="flex gap-2">
                  <input type="text" value={a} onChange={e => updateActiviteit(i, ai, e.target.value)}
                    className={input + ' flex-1'} placeholder={`Activiteit ${ai + 1}`} />
                  <button type="button" onClick={() => verwijderActiviteit(i, ai)}
                    className="p-3 text-stone-400 hover:text-red-600 hover:bg-red-50 rounded-xl">
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
          <Veld label="Tip voor de begeleider" hint="Praktisch advies voor de docent">
            <textarea value={f.tip} onChange={e => updateFase(i, 'tip', e.target.value)}
              rows={2} className={input} placeholder="Bijv. 'Plan deze fase op een mooie dag, dan kun je buiten'" />
          </Veld>
        </div>
      ))}
      <button type="button" onClick={voegFaseToe}
        className="w-full border-2 border-dashed border-stone-300 hover:border-emerald-400 hover:bg-emerald-50 text-stone-600 hover:text-emerald-700 rounded-2xl py-4 font-semibold flex items-center justify-center gap-2 transition-colors">
        <Plus className="w-4 h-4" /> Nieuwe fase toevoegen
      </button>
    </div>
  )
}

// ─── Tab: Weetjes ──────────────────────────────────────────────────────────
function WeetjesTab({ vorm, setVorm }) {
  function update(i, waarde) {
    setVorm(v => { const nieuw = [...v.weetjes]; nieuw[i] = waarde; return { ...v, weetjes: nieuw } })
  }
  function voegToe() { setVorm(v => ({ ...v, weetjes: [...v.weetjes, ''] })) }
  function verwijder(i) {
    setVorm(v => {
      const arr = v.weetjes.filter((_, j) => j !== i)
      return { ...v, weetjes: arr.length ? arr : [''] }
    })
  }
  return (
    <div className="space-y-3">
      <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 text-sm text-emerald-800 flex items-start gap-2">
        <Info className="w-4 h-4 mt-0.5 shrink-0" />
        Korte interessante feiten over het project (bijv. "Bijen leven gemiddeld 6 weken").
      </div>
      <div className="flex justify-end">
        <button type="button" onClick={voegToe}
          className="text-emerald-700 hover:text-emerald-900 text-sm font-semibold flex items-center gap-1">
          <Plus className="w-3.5 h-3.5" /> Weetje toevoegen
        </button>
      </div>
      {vorm.weetjes.map((w, i) => (
        <div key={i} className="flex gap-2">
          <textarea value={w} onChange={e => update(i, e.target.value)}
            rows={2} className={input + ' flex-1'} placeholder={`Weetje ${i + 1}`} />
          <button type="button" onClick={() => verwijder(i)}
            className="p-3 text-stone-400 hover:text-red-600 hover:bg-red-50 rounded-xl shrink-0">
            <X className="w-4 h-4" />
          </button>
        </div>
      ))}
    </div>
  )
}

// ─── Helpers ───────────────────────────────────────────────────────────────
function Veld({ label, hint, children }) {
  return (
    <div>
      <label className="block text-sm font-semibold text-gray-700 mb-1">{label}</label>
      {hint && <p className="text-xs text-stone-500 mb-2">{hint}</p>}
      {children}
    </div>
  )
}

const input = 'w-full border border-gray-200 rounded-xl px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-emerald-400 bg-white'
