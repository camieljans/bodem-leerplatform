// ─── Materialenlijst per project ──────────────────────────────────────────────
// Twee categorieën:
//   soil_valley — wordt geleverd door Soil Valley
//   elders      — regelen via school, kantine, conciërge, bouwmarkt, etc.

export const materialen = {

  // ════════════════════════════════════════════════════════════════════════════
  wormenhotel: {
    intro: 'Voor het Wormenhotel-project komen alle bodem-gerelateerde materialen (compostwormen, aarde, pallethout, bladeren) van Soil Valley. De rest (emmers, gereedschap, etc.) regel je zelf — meestal gratis via de school, kantine of conciërge.',

    soil_valley: [
      {
        naam: 'Compostwormen (Eisenia fetida)',
        hoeveelheid: '250–500 g per wormenhotel',
        opmerkingen: 'De motor van het hotel. Soil Valley levert levende compostwormen, klaar om te starten.',
        tip: 'Plan met Soil Valley dat de wormen op de dag van de bouwles aankomen.',
      },
      {
        naam: 'Restpallethout',
        hoeveelheid: '1 pallet per hotel (~6 planken)',
        opmerkingen: 'Voor de kist (zijwanden, bodem, deksel). Soil Valley levert pallethout dat veilig en chemievrij is.',
        tip: 'Vraag of Soil Valley de pallet alvast uit elkaar wil halen — scheelt veel lestijd.',
      },
      {
        naam: 'Tuinaarde of compost',
        hoeveelheid: '1 emmer per hotel',
        opmerkingen: 'Bovenste laag van de bedding — woonruimte voor de wormen.',
        tip: 'Soil Valley levert vruchtbare aarde. Bewaar koel en gebruik dezelfde dag.',
      },
      {
        naam: 'Bladeren, houtsnippers of stro',
        hoeveelheid: '2 emmers per hotel',
        opmerkingen: 'Eerste vulling van de bedding. Mag gemengd zijn — variatie is goed voor de wormen.',
        tip: 'Soil Valley levert dit als één gemengd pakket.',
      },
    ],

    elders: [
      {
        naam: 'Hergebruikte emmer of bak (10–15 L)',
        hoeveelheid: '1 vangbak per hotel',
        opmerkingen: 'Staat onder het hotel en vangt wormenthee (vocht) op.',
        tip: 'Vraag de schoolkantine, horeca of frituurzaken om gebruikte emmers (mayonaise, frituurvet).',
      },
      {
        naam: 'Gebruikt karton',
        hoeveelheid: '4–5 dozen of platen',
        opmerkingen: 'Onderlaag van de bedding — vochtbuffer en eerste voeding voor wormen.',
        tip: 'Verzamel uit pakketten op school of vraag thuis. Geen glanzend gekleurd karton.',
      },
      {
        naam: 'Hergebruikte schroeven of spijkers',
        hoeveelheid: '20–30 stuks',
        opmerkingen: 'Voor de constructie van de kist.',
        tip: 'Vraag de conciërge of techniekleraar — die hebben vaak een doos met losse schroeven liggen.',
      },
      {
        naam: 'Boormachine + boortje (6–10 mm)',
        hoeveelheid: '1 per klas',
        opmerkingen: 'Voor luchtgaten in het deksel en drainage in de bodem.',
        tip: 'Lenen bij de techniekleraar of conciërge.',
      },
      {
        naam: 'Handzaag of decoupeerzaag',
        hoeveelheid: '1 per klas',
        opmerkingen: 'Voor het op maat zagen van de pallet-planken.',
        tip: 'Vraag de techniekleraar of conciërge.',
      },
      {
        naam: 'Werkhandschoenen + veiligheidsbril',
        hoeveelheid: 'Voor elke leerling',
        opmerkingen: 'Voor het zagen en monteren.',
        tip: 'School heeft deze vaak in de techniek- of biologiekast.',
      },
      {
        naam: 'Smartphone of tablet',
        hoeveelheid: '1 per groep',
        opmerkingen: 'Voor foto\'s in het logboek en de eindpresentatie.',
        tip: 'Eigen telefoon van een leerling of een schooltablet.',
      },
    ],

    voorbereiding_begeleider: [
      'Maak afspraken met Soil Valley over levering van wormen, aarde, hout en bladeren (week 1)',
      'Bestel/regel tijdig zodat alles op de bouwdag aanwezig is',
      'Verzamel emmers via kantine of bedrijven in de buurt',
      'Leen boormachine, zaag, schroeven en handschoenen bij conciërge / techniekleraar',
      'Zorg voor een vaste plek voor het wormenhotel (schaduwrijk, 10-25 °C)',
      'Maak een afspraak met de schoolkantine over wekelijks GFT-afval',
      'Registreer alle leerlingen op het platform',
    ],
  },

  // ════════════════════════════════════════════════════════════════════════════
  keuringsdienst: {
    intro: 'Voor het Keuringsdienst-experiment levert Soil Valley alles wat met de bodem te maken heeft (potgrond, zaadjes, wormenthee). De potten, kunstmest en meetspullen regel je zelf.',

    soil_valley: [
      {
        naam: 'Wormenthee (compostthee)',
        hoeveelheid: '50 ml per pot per week — ~300 ml over 6 weken',
        opmerkingen: 'Voor pot 3 (compostthee-behandeling). Soil Valley levert kant-en-klare wormenthee. Bewaar koel, gebruik op de dag van aanlevering.',
        tip: 'Plan wekelijkse leveringen met Soil Valley (week 1 t/m 6).',
      },
      {
        naam: 'Ongefertiliseerde potgrond',
        hoeveelheid: 'Gelijke hoeveelheid voor alle 3 potten',
        opmerkingen: 'Onbewerkte basisbodem — geen kunstmest of voedingstoevoegingen. Soil Valley levert dit gegarandeerd onbewerkt.',
        tip: 'Vraag Soil Valley om voldoende voor alle groepen in één keer.',
      },
      {
        naam: 'Radijszaadjes',
        hoeveelheid: '5–10 zaadjes per pot',
        opmerkingen: 'Soil Valley levert geschikte radijszaadjes. Gebruik dezelfde soort voor alle 3 potten.',
        tip: 'Dun later uit tot 3 planten per pot voor een eerlijk experiment.',
      },
    ],

    elders: [
      {
        naam: 'Transparante cilinders of potten (Ø ≥ 10 cm)',
        hoeveelheid: '3 per groep (identiek)',
        opmerkingen: 'Voor de drie behandelingen (controle / kunstmest / wormenthee). Transparant zodat wortelontwikkeling zichtbaar is.',
        tip: 'Hergebruikte plastic flessenhalven (2 L) werken prima. Vergeet drainagegaatjes niet.',
      },
      {
        naam: 'Kunstmest (vloeibaar of korrels)',
        hoeveelheid: 'Dosering volgens verpakking',
        opmerkingen: 'Voor pot 2 (kunstmest-behandeling). Standaard NPK-kunstmest.',
        tip: 'Tuincentrum. Noteer merk en concentratie voor de rapportage.',
      },
      {
        naam: 'Liniaal of meetlat (30 cm)',
        hoeveelheid: '1 per groep',
        opmerkingen: 'Voor het wekelijks meten van de planthoogte.',
        tip: 'Schoolkast of wiskundeles. Meet altijd op dezelfde manier (bodem tot hoogste blad).',
      },
      {
        naam: 'Smartphone of tablet',
        hoeveelheid: '1 per groep',
        opmerkingen: 'Voor consistente weekfoto\'s en het bijhouden van het logboek.',
        tip: 'Eigen telefoon of schooltablet. Maak foto\'s altijd vanaf dezelfde afstand.',
      },
      {
        naam: 'Fotostatief of vaste standaard',
        hoeveelheid: '1 per groep',
        opmerkingen: 'Voor consistente weekfoto\'s. Optioneel maar zeer aanbevolen.',
        tip: 'Een omgekeerde bak met tape-markering werkt ook prima.',
        optioneel: true,
      },
    ],

    voorbereiding_begeleider: [
      'Plan wekelijkse wormenthee-leveringen met Soil Valley (week 1 t/m 6)',
      'Bestel ongefertiliseerde potgrond en zaadjes via Soil Valley vóór week 1',
      'Verzamel 3 identieke transparante potten per groep',
      'Koop standaard NPK-kunstmest in tuincentrum',
      'Plan vaste meetmomenten (zelfde dag/tijd elke week)',
      'Registreer alle leerlingen op het platform',
    ],
  },
}
