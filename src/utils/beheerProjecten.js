import { supabase } from '../supabase'

// ─── Beheer-projecten ophalen ────────────────────────────────────────────
// Haalt alle door eigenaars zelf-toegevoegde projecten op uit Supabase.

export async function haalBeheerProjecten() {
  const { data, error } = await supabase
    .from('beheer_projecten')
    .select('*')
    .order('aangemaakt_op', { ascending: false })
  if (error) {
    console.error('Fout bij ophalen beheer_projecten:', error)
    return []
  }
  return data || []
}

export async function haalBeheerProject(sleutel) {
  const { data, error } = await supabase
    .from('beheer_projecten')
    .select('*')
    .eq('sleutel', sleutel)
    .maybeSingle()
  if (error) {
    console.error('Fout bij ophalen project:', error)
    return null
  }
  return data
}

// ─── Beheer-weken ophalen ────────────────────────────────────────────────

export async function haalBeheerWeken(projectId, niveau) {
  let q = supabase
    .from('beheer_weken')
    .select('*')
    .eq('project_id', projectId)
    .order('week', { ascending: true })
  if (niveau) q = q.eq('niveau', niveau)
  const { data, error } = await q
  if (error) {
    console.error('Fout bij ophalen weken:', error)
    return []
  }
  return data || []
}

// ─── Helpers voor projectsleutel ─────────────────────────────────────────

export function maakSleutel(naam) {
  return naam
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}
