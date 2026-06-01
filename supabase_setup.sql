-- ─── Bodem Leerplatform — Supabase SQL Setup ────────────────────────────────
-- Voer dit script uit in de Supabase SQL editor om de nieuwe tabellen aan te maken.
-- Bestaande tabellen (profiles, logboek, opdracht_voortgang, vragen, begeleider_koppeling)
-- worden hier niet opnieuw aangemaakt.

-- ─── Tabel: observaties ──────────────────────────────────────────────────────
-- Slaat wekelijkse observaties en metingen op per leerling per project.
-- De 'data' kolom bevat projectspecifieke meetvelden als JSON:
--
-- Wormenhotel:
--   { "vochtigheid": 3, "geur": "bosgrond", "activiteit": "veel beweging",
--     "afval_toegevoegd": true, "afval_omschrijving": "appelschillen",
--     "compost_hoeveelheid": "beetje", "notities": "..." }
--
-- Keuringsdienst:
--   { "pot1": {"hoogte_cm": 5.2, "bladkleur": "lichtgroen", "bladeren": 3, "conditie": "goed"},
--     "pot2": {"hoogte_cm": 7.1, "bladkleur": "donkergroen", "bladeren": 4, "conditie": "goed"},
--     "pot3": {"hoogte_cm": 6.8, "bladkleur": "donkergroen", "bladeren": 4, "conditie": "goed"},
--     "notities": "..." }
--
-- Wilgenvlechten:
--   { "weer": "zonnig", "insecten": ["bij", "zweefvlieg"], "vogels": ["mus"],
--     "bijzonderheden": "...", "notities": "..." }

CREATE TABLE IF NOT EXISTS observaties (
  id             uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  leerling_id    uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  project        text NOT NULL,
  week           integer NOT NULL,
  data           jsonb NOT NULL DEFAULT '{}',
  aangemaakt_op  timestamptz DEFAULT now() NOT NULL,
  bijgewerkt_op  timestamptz DEFAULT now() NOT NULL,
  UNIQUE(leerling_id, project, week)
);

ALTER TABLE observaties ENABLE ROW LEVEL SECURITY;

-- Leerlingen kunnen alleen hun eigen observaties zien en bewerken
CREATE POLICY "Leerlingen beheren eigen observaties"
  ON observaties
  USING (auth.uid() = leerling_id)
  WITH CHECK (auth.uid() = leerling_id);

-- Begeleiders kunnen observaties lezen van gekoppelde leerlingen
CREATE POLICY "Begeleiders lezen observaties van gekoppelde leerlingen"
  ON observaties FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM begeleider_koppeling
      WHERE begeleider_id = auth.uid()
        AND leerling_id = observaties.leerling_id
        AND status = 'goedgekeurd'
    )
  );


-- ─── Tabel: eindproducten ─────────────────────────────────────────────────────
-- Slaat het eindproduct van een leerling op (link naar video, poster, etc.)

CREATE TABLE IF NOT EXISTS eindproducten (
  id             uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  leerling_id    uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  project        text NOT NULL,
  type           text NOT NULL,          -- bijv. 'Video', 'Poster', 'Pitch'
  titel          text NOT NULL,
  url            text,                   -- optioneel: YouTube/Drive link
  beschrijving   text,                   -- optioneel: toelichting
  aangemaakt_op  timestamptz DEFAULT now() NOT NULL,
  bijgewerkt_op  timestamptz DEFAULT now() NOT NULL,
  UNIQUE(leerling_id, project)           -- één eindproduct per leerling per project
);

ALTER TABLE eindproducten ENABLE ROW LEVEL SECURITY;

-- Leerlingen kunnen alleen hun eigen eindproduct beheren
CREATE POLICY "Leerlingen beheren eigen eindproduct"
  ON eindproducten
  USING (auth.uid() = leerling_id)
  WITH CHECK (auth.uid() = leerling_id);

-- Begeleiders kunnen eindproducten lezen van gekoppelde leerlingen
CREATE POLICY "Begeleiders lezen eindproducten van gekoppelde leerlingen"
  ON eindproducten FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM begeleider_koppeling
      WHERE begeleider_id = auth.uid()
        AND leerling_id = eindproducten.leerling_id
        AND status = 'goedgekeurd'
    )
  );


-- ─── Controleer bestaande tabellen ───────────────────────────────────────────
-- Voer dit uit om te controleren of alle tabellen aanwezig zijn:
-- SELECT table_name FROM information_schema.tables
--   WHERE table_schema = 'public'
--   ORDER BY table_name;
--
-- Verwachte output:
--   begeleider_koppeling
--   eindproducten          ← nieuw
--   logboek
--   observaties            ← nieuw
--   opdracht_voortgang
--   profiles
--   vragen
