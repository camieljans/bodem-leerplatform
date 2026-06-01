-- ─── Soil Valley Leerplatform — Beheer-uitbreiding ─────────────────────────
-- Voeg deze SQL uit in de Supabase SQL editor om de beheer-functionaliteit te
-- activeren. Dit voegt:
--   • De rol 'eigenaar' toe (zonder bestaande rollen aan te tasten)
--   • Tabel beheer_projecten — door Soil Valley aangemaakte projecten
--   • Tabel beheer_weken     — wekelijkse opdrachten per project per niveau

-- ─── Eigenaar-account aanmaken (handmatig) ─────────────────────────────────
-- Stap 1: maak in Authentication → Users een nieuwe gebruiker aan voor Soil Valley
-- Stap 2: voer onderstaande SQL uit, vervang <UUID> door de user id uit Auth:
--
--   INSERT INTO profiles (id, naam, rol, school, email)
--   VALUES ('<UUID>', 'Soil Valley', 'eigenaar', 'Soil Valley', 'info@soilvalley.nl');


-- ─── Tabel: beheer_projecten ───────────────────────────────────────────────
-- Door eigenaars zelf aangemaakte projecten (naast de ingebouwde projecten).

CREATE TABLE IF NOT EXISTS beheer_projecten (
  id              uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  sleutel         text UNIQUE NOT NULL,         -- bijv. 'insectenhuis'
  naam            text NOT NULL,                 -- bijv. 'Het Insectenhuis'
  ondertitel      text,
  beschrijving    text,                          -- korte beschrijving (kaartje)
  centrale_vraag  text,
  duur            text,                          -- bijv. '5 weken'
  kleur           text DEFAULT 'emerald',        -- emerald | teal | lime | amber | rose | sky
  aangemaakt_op   timestamptz DEFAULT now() NOT NULL,
  bijgewerkt_op   timestamptz DEFAULT now() NOT NULL
);

ALTER TABLE beheer_projecten ENABLE ROW LEVEL SECURITY;

-- Iedereen mag projecten lezen (ook leerlingen, om ze te kunnen kiezen)
CREATE POLICY "Iedereen leest beheer_projecten"
  ON beheer_projecten FOR SELECT
  USING (true);

-- Alleen eigenaars mogen projecten aanmaken/bewerken/verwijderen
CREATE POLICY "Eigenaars beheren projecten"
  ON beheer_projecten FOR ALL
  USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND rol = 'eigenaar')
  )
  WITH CHECK (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND rol = 'eigenaar')
  );


-- ─── Tabel: beheer_weken ───────────────────────────────────────────────────
-- Wekelijkse opdrachten per project per niveau.
-- 'taken' is een JSON-array: [{ "type": "doe", "tekst": "..." }, ...]
-- 'reflectie' is een JSON-array van strings: ["vraag 1", "vraag 2"]

CREATE TABLE IF NOT EXISTS beheer_weken (
  id              uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  project_id      uuid REFERENCES beheer_projecten(id) ON DELETE CASCADE NOT NULL,
  niveau          text NOT NULL,                 -- 'basis' | 'midden' | 'havo' | 'pro'
  week            integer NOT NULL,
  titel           text NOT NULL,
  intro           text,
  taken           jsonb NOT NULL DEFAULT '[]'::jsonb,
  reflectie       jsonb NOT NULL DEFAULT '[]'::jsonb,
  aangemaakt_op   timestamptz DEFAULT now() NOT NULL,
  bijgewerkt_op   timestamptz DEFAULT now() NOT NULL,
  UNIQUE(project_id, niveau, week)
);

ALTER TABLE beheer_weken ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Iedereen leest beheer_weken"
  ON beheer_weken FOR SELECT
  USING (true);

CREATE POLICY "Eigenaars beheren weken"
  ON beheer_weken FOR ALL
  USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND rol = 'eigenaar')
  )
  WITH CHECK (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND rol = 'eigenaar')
  );
