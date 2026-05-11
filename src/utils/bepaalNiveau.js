// Bepaalt het inhoudsniveau op basis van schoolniveau én leerjaar.
//
// Principe: leerjaar schuift het niveau naar beneden ten opzichte van
// wat je op basis van schooltype zou verwachten.
//
//  vroeg  = leerjaar 1–2  (onderbouw)
//  midden = leerjaar 3–4  (middenbouw)
//  laat   = leerjaar 5–6  (bovenbouw)
//
//              vroeg     midden    laat
// ──────────────────────────────────────
// pro          pro       pro       pro      (altijd PRO-niveau)
// vmbo-b       basis     basis     basis
// vmbo-k       basis     basis     midden
// vmbo-tl      basis     midden    midden
// havo         midden    midden    havo
// vwo          midden    midden    havo
// anders       basis     midden    midden

const matrix = {
  'basisschool': ['basis',  'basis',  'basis' ],
  'vmbo-b':      ['basis',  'basis',  'basis' ],
  'vmbo-k':      ['basis',  'basis',  'midden'],
  'vmbo-tl':     ['basis',  'midden', 'midden'],
  'havo':        ['midden', 'midden', 'havo'  ],
  'vwo':         ['midden', 'midden', 'havo'  ],
  'anders':      ['basis',  'midden', 'midden'],
}

export function bepaalNiveau(schoolNiveau, leerjaar) {
  if (schoolNiveau === 'pro') return 'pro'
  if (schoolNiveau === 'basisschool') return 'basis'

  const rij = matrix[schoolNiveau] || matrix['anders']
  const leerjaarGetal = parseInt(leerjaar) || 2

  let kolom
  if (leerjaarGetal <= 2)      kolom = 0  // vroeg (leerjaar 1-2)
  else if (leerjaarGetal <= 4) kolom = 1  // midden (leerjaar 3-4)
  else                         kolom = 2  // laat (leerjaar 5-6)

  return rij[kolom]
}
