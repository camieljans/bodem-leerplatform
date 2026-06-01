# Soil Valley Leerplatform — Overdrachtsdocument

Dit document is bedoeld voor de IT-beheerder die het platform overneemt. Het beschrijft de architectuur, alle gebruikte diensten, en de stappen om eigenaarschap volledig over te dragen.

---

## 1. Wat is dit?

Een educatief webplatform waar leerlingen (basisschool t/m HAVO/VWO en praktijkonderwijs) projecten doen rond bodem, kringloop en biodiversiteit. Drie type gebruikers:

- **Leerling** — doet projecten, vult observaties in, beantwoordt vragen
- **Begeleider** — docent, ziet voortgang van gekoppelde leerlingen
- **Eigenaar** — Soil Valley, beheert projecten en wekelijkse opdrachten via `/beheer`

Twee projecten zijn hardcoded (Wormenhotel, Keuringsdienst van Waarde). Soil Valley kan zelf nieuwe projecten toevoegen via de beheerinterface.

---

## 2. Tech stack

- **Frontend**: React 19 + Vite + Tailwind CSS + React Router
- **Backend / Database**: Supabase (PostgreSQL met Row Level Security)
- **Hosting**: Vercel (auto-deploy bij git push naar `main`)

---

## 3. Diensten + kostenoverzicht

| Dienst | Doel | Plan dat nodig is |
|---|---|---|
| **GitHub** | Code repository | Gratis (Free tier) |
| **Vercel** | Hosting + serverless functions | Hobby (gratis) volstaat tot ~100GB/maand |
| **Supabase** | Database + auth | Free tier (50k MAU, 500MB database) is voldoende voor schoolgebruik |

**Totale kosten bij normaal schoolgebruik: €0/maand** — alles past binnen gratis tiers en is opzegbaar zonder verplichtingen.

---

## 4. Overdracht per dienst

### 4.1 GitHub

**Locatie**: `https://github.com/<camieljans>/soilvalley-leerplatform` (huidige eigenaar: Camiel Jans)

**Optie A — Transfer ownership** (aanbevolen):
1. Soil Valley maakt een GitHub-organisatie aan (bijv. `soil-valley`)
2. Camiel: repo → Settings → Transfer ownership → vul nieuwe org-naam in
3. Soil Valley accepteert de transfer

**Optie B — Behoud in Camiel's account, geef Soil Valley collaborator-rechten:**
1. Repo → Settings → Collaborators → Add people
2. Voeg Soil Valley's GitHub-account toe als Admin

Optie A is schoner — Camiel heeft dan niets meer met de repo te maken.

### 4.2 Vercel

Vercel haalt de code automatisch uit GitHub. Na de GitHub-overdracht:

**Optie A — Transfer project naar Soil Valley's Vercel-account**:
1. Soil Valley maakt een Vercel-account aan
2. Camiel: Project → Settings → General → "Transfer Project" → Soil Valley's team
3. Soil Valley accepteert
4. Soil Valley opnieuw env vars instellen (zie sectie 5)

**Optie B — Nieuwe Vercel-deploy bij Soil Valley**:
1. Soil Valley maakt account → Import Project → kies de GitHub-repo
2. Vercel deployt automatisch
3. Soil Valley voert env vars in
4. Camiel kan zijn oude Vercel-project verwijderen

### 4.3 Supabase

**Belangrijk**: dit is de meest cruciale overdracht — hier staat alle data (gebruikers, observaties, projecten).

**Optie A — Transfer organization** (aanbevolen, behoudt alle data):
1. Soil Valley maakt Supabase-account
2. Camiel: Organization Settings → "Transfer organization" → vul Soil Valley's e-mailadres in
3. Soil Valley accepteert

**Optie B — Nieuwe Supabase-installatie** (data gaat verloren of moet handmatig gemigreerd):
1. Soil Valley maakt nieuw Supabase-project
2. Voer `supabase_setup.sql` en `supabase_beheer_setup.sql` uit (staan in deze repo)
3. Export data via Supabase Dashboard → Table Editor → Export CSV per tabel
4. Import in nieuw project
5. Update env vars in Vercel met nieuwe URL + key

Optie A is sterk aanbevolen — geen datamigratie nodig.

---

## 5. Environment variables (Vercel)

Compleet overzicht van wat in Vercel ingesteld moet zijn:

| Naam | Bron | Voorbeeld |
|---|---|---|
| `VITE_SUPABASE_URL` | Supabase project → Settings → API | `https://xxx.supabase.co` |
| `VITE_SUPABASE_ANON_KEY` | Supabase project → Settings → API → `anon public` | `sb_publishable_...` |

**Instellen**: Vercel → Project → Settings → Environment Variables → Add → vink alle environments aan (Production, Preview, Development).

Na wijzigen: trigger een nieuwe deploy (Vercel → Deployments → ⋮ → Redeploy).

---

## 6. Lokale ontwikkeling

Voor wijzigingen aan de code:

```bash
git clone <repo-url>
cd soilvalley-leerplatform
npm install
cp .env.example .env  # zie sectie 5 voor inhoud
npm run dev           # draait op http://localhost:5173
```

Build voor verificatie: `npm run build`.

---

## 7. Deployment

Vercel deployt **automatisch** bij elke push naar `main`. Geen handmatige stappen nodig.

- Push naar `main` → Vercel build → live binnen ~1-2 min
- Voor preview-deploys: maak een branch + open Pull Request

---

## 8. Eigenaar-accounts aanmaken

Soil Valley team-leden die het platform moeten beheren krijgen rol `eigenaar`. Geen open registratie — handmatig via Supabase:

1. Supabase Dashboard → Authentication → Users → "Add user" → e-mail + wachtwoord
2. Kopieer de aangemaakte `user_id`
3. SQL Editor → voer uit:
   ```sql
   INSERT INTO profiles (id, naam, rol, school, email)
   VALUES ('<user_id>', '<Naam>', 'eigenaar', 'olympus', '<email>');
   ```
   (`school` moet één van `olympus|liemers|candea|produs` zijn — dit is een hardcoded constraint. Voor eigenaars maakt het niet uit welke je kiest.)

De gebruiker logt vervolgens in via `/beheer-login` op de site.

---

## 9. Database-structuur (samenvatting)

**Tabellen** (alle in schema `public`):

| Tabel | Doel |
|---|---|
| `profiles` | Gebruikersinfo + rol (`leerling`, `begeleider`, `eigenaar`) |
| `observaties` | Wekelijkse observaties per leerling per project |
| `eindproducten` | Eindproduct-inleveringen |
| `logboek` | Vrije logboek-entries van leerlingen |
| `opdracht_voortgang` | Welke taken een leerling heeft afgevinkt |
| `vragen` | Vragen leerling → begeleider + antwoorden |
| `begeleider_koppeling` | Koppeling leerling ↔ begeleider |
| `beheer_projecten` | Door Soil Valley aangemaakte projecten |
| `beheer_weken` | Wekelijkse opdrachten per zelf-toegevoegd project |

Alle tabellen hebben Row Level Security; leerlingen zien alleen eigen data, begeleiders zien data van gekoppelde leerlingen, eigenaars beheren `beheer_*` tabellen.

Volledige schema-definities staan in `supabase_setup.sql` en `supabase_beheer_setup.sql`.

---

## 10. Veelvoorkomende taken

### Bestaande projecten (Wormenhotel, Keuringsdienst) inhoudelijk aanpassen
Deze zitten in code, niet in de database. Wijzig de relevante files:
- Briefing/leerdoelen/fases → `src/data/briefing.js`
- Wekelijkse opdrachten → `src/data/opdrachten.js`
- Woordenlijst → `src/data/woordenlijst.js`
- Materialen → `src/data/materialen.js`

Push naar `main` → live binnen 2 min.

### Een gebruiker verwijderen
1. Supabase → Authentication → Users → zoek user → ⋮ → Delete user
2. Supabase RLS regelt automatisch dat alle gerelateerde data ook verdwijnt (cascade)

### Wachtwoord van een gebruiker resetten
Supabase → Authentication → Users → zoek user → ⋮ → "Send password reset"

### Logo/branding aanpassen
- Logo-component: `src/components/CirkulairLogo.jsx`
- Logo-bestand: `public/soil-valley-logo.png`
- Titel/naam: zoek-vervang "Soil Valley Leerplatform" in `src/pages/` en `index.html`

---

## 11. Aanbevolen vervolgontwikkeling

Wensen die nog niet in de eerste versie zitten en wel handig zijn:

- Bestaande projecten (Wormenhotel, Keuringsdienst) ook bewerkbaar via beheer-UI
- Observatieformulieren per project aanpasbaar via UI
- Quizvragen (kennischeck) per week toevoegen via UI
- Foto-upload voor projecten in beheer
- Soil Valley team-leden onderling kunnen toevoegen via de beheerpagina (i.p.v. via Supabase Dashboard)

---

## 12. Vragen?

Voor technische vragen tijdens de overdracht: Camiel Jans, camieljans@gmail.com.
