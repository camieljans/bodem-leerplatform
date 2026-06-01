import { useState } from 'react'
import { useAuth } from '../App'
import { woordenlijst, categorieKleuren } from '../data/woordenlijst'
import { BookA, Search, ChevronDown, ChevronUp, Tag, BookOpen } from 'lucide-react'

export default function Woordenlijst() {
  const { project } = useAuth()
  const [zoekterm, setZoekterm] = useState('')
  const [actieveCategorie, setActieveCategorie] = useState(null)
  const [openItems, setOpenItems] = useState(new Set())

  const alle = woordenlijst[project] ?? []

  // Collect unique categories present in this project's list
  const categorieen = [...new Set(alle.map(b => b.categorie))].sort()

  // Filter
  const zoek = zoekterm.trim().toLowerCase()
  let gefilterd = alle.filter(b => {
    const matchesZoek =
      !zoek ||
      b.term.toLowerCase().includes(zoek) ||
      b.definitie.toLowerCase().includes(zoek)
    const matchesCat = !actieveCategorie || b.categorie === actieveCategorie
    return matchesZoek && matchesCat
  })

  // Sort: when searching, exact term-matches first, then alphabetical
  if (zoek) {
    gefilterd = gefilterd.sort((a, b) => {
      const aExact = a.term.toLowerCase().startsWith(zoek)
      const bExact = b.term.toLowerCase().startsWith(zoek)
      if (aExact && !bExact) return -1
      if (!aExact && bExact) return 1
      return a.term.localeCompare(b.term, 'nl')
    })
  }
  // Default alphabetical sort is already applied by the data file, preserved here

  function toggleItem(term) {
    setOpenItems(prev => {
      const next = new Set(prev)
      if (next.has(term)) {
        next.delete(term)
      } else {
        next.add(term)
      }
      return next
    })
  }

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-2xl mx-auto">

        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-14 h-14 rounded-2xl bg-emerald-100 flex items-center justify-center mx-auto mb-4">
            <BookA className="w-7 h-7 text-emerald-700" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-1">Woordenlijst</h1>
          <p className="text-gray-500">Alle begrippen uit dit project uitgelegd</p>
        </div>

        {/* Search bar */}
        <div className="bg-white rounded-2xl shadow p-4 mb-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            <input
              type="text"
              value={zoekterm}
              onChange={e => setZoekterm(e.target.value)}
              placeholder="Zoek een begrip of definitie..."
              className="w-full border border-gray-200 rounded-xl pl-10 pr-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-emerald-400 bg-white text-sm"
            />
          </div>
        </div>

        {/* Category filters */}
        <div className="bg-white rounded-2xl shadow p-4 mb-4">
          <div className="flex items-center gap-2 mb-3">
            <Tag className="w-4 h-4 text-gray-400" />
            <span className="text-sm font-medium text-gray-600">Filter op categorie</span>
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setActieveCategorie(null)}
              className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-all ${
                actieveCategorie === null
                  ? 'bg-emerald-600 text-white shadow'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Alle
            </button>
            {categorieen.map(cat => (
              <button
                key={cat}
                onClick={() => setActieveCategorie(actieveCategorie === cat ? null : cat)}
                className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-all ${
                  actieveCategorie === cat
                    ? 'bg-emerald-600 text-white shadow'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Result count */}
        <p className="text-sm text-gray-500 mb-3 px-1">
          {gefilterd.length === 0
            ? 'Geen resultaten gevonden'
            : `${gefilterd.length} ${gefilterd.length === 1 ? 'begrip' : 'begrippen'} gevonden`}
        </p>

        {/* Accordion list */}
        {gefilterd.length === 0 ? (
          <div className="bg-white rounded-2xl shadow p-10 text-center">
            <Search className="w-10 h-10 mx-auto mb-3 text-gray-200" />
            <p className="text-gray-500 font-medium">Geen begrippen gevonden</p>
            <p className="text-gray-400 text-sm mt-1">Probeer een andere zoekterm of verwijder het filter</p>
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            {gefilterd.map(begrip => {
              const isOpen = openItems.has(begrip.term)
              return (
                <div
                  key={begrip.term}
                  className="bg-white rounded-2xl shadow overflow-hidden"
                >
                  {/* Collapsed header */}
                  <button
                    onClick={() => toggleItem(begrip.term)}
                    className="w-full flex items-center justify-between px-5 py-4 text-left group"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <span className="font-semibold text-gray-800 group-hover:text-emerald-700 transition-colors truncate">
                        {begrip.term}
                      </span>
                      <span
                        className={`shrink-0 text-xs font-semibold px-2.5 py-0.5 rounded-full ${
                          categorieKleuren[begrip.categorie] ?? 'bg-gray-100 text-gray-600'
                        }`}
                      >
                        {begrip.categorie}
                      </span>
                    </div>
                    <span className="shrink-0 ml-3 text-gray-400 group-hover:text-emerald-600 transition-colors">
                      {isOpen
                        ? <ChevronUp className="w-5 h-5" />
                        : <ChevronDown className="w-5 h-5" />
                      }
                    </span>
                  </button>

                  {/* Expanded content */}
                  {isOpen && (
                    <div className="px-5 pb-5 border-t border-gray-100">
                      <p className="text-gray-700 text-sm leading-relaxed mt-4">
                        {begrip.definitie}
                      </p>
                      {begrip.voorbeeld && (
                        <p className="text-gray-500 text-sm italic mt-3">
                          <span className="not-italic font-medium text-gray-600">Voorbeeld: </span>
                          {begrip.voorbeeld}
                        </p>
                      )}
                      <div className="mt-4">
                        <span
                          className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                            categorieKleuren[begrip.categorie] ?? 'bg-gray-100 text-gray-600'
                          }`}
                        >
                          {begrip.categorie}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        )}

        {/* Empty state when no project */}
        {alle.length === 0 && (
          <div className="bg-white rounded-2xl shadow p-10 text-center mt-4">
            <BookOpen className="w-10 h-10 mx-auto mb-3 text-gray-200" />
            <p className="text-gray-500 font-medium">Geen begrippen beschikbaar</p>
            <p className="text-gray-400 text-sm mt-1">Er is nog geen project geselecteerd</p>
          </div>
        )}
      </div>
    </div>
  )
}
