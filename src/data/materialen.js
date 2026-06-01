// ─── Materialenlijst per project ──────────────────────────────────────────────
// Categorieën: benodigdheden (in de klas aanwezig), bestellen, digitaal, optioneel

export const materialen = {

  // ════════════════════════════════════════════════════════════════════════════
  wormenhotel: {
    intro: 'Hieronder staan alle materialen die je nodig hebt voor het Wormenhotel-project. De meeste materialen kunnen worden hergebruikt of zijn gratis verkrijgbaar via de schoolkantine.',

    categorieen: [
      {
        naam: 'Te bestellen / aan te schaffen',
        icon: '🛒',
        kleur: 'blue',
        items: [
          {
            naam: 'Compostwormen (Eisenia fetida)',
            hoeveelheid: '500 gram per wormenhotel',
            opmerkingen: 'Te bestellen via wormenkwekerij of online. Bestel minimaal 1 week van tevoren.',
            tip: 'Tip: sommige boerderijen of tuincentra geven wormen gratis weg.',
            optioneel: false,
          },
          {
            naam: 'Emmers of bakken (20–40 liter)',
            hoeveelheid: '2 stuks per groep (stapelbaar)',
            opmerkingen: 'Liefst hergebruikt. De onderste emmer vangt het vocht op (wormenthee), de bovenste bevat de wormen.',
            tip: 'Vraag bij de schoolkantine of horecabedrijven om gebruikte emmers.',
            optioneel: false,
          },
          {
            naam: 'Boormachine + boor (Ø 6-10mm)',
            hoeveelheid: '1 per school',
            opmerkingen: 'Nodig voor luchtgaten bovenin en vochtsleuf onderin de emmer.',
            tip: 'Kan gedeeld worden tussen groepen.',
            optioneel: false,
          },
        ],
      },
      {
        naam: 'Verzamelen / gratis verkrijgbaar',
        icon: '♻️',
        kleur: 'green',
        items: [
          {
            naam: 'Karton (golfkarton)',
            hoeveelheid: 'Genoeg om de bodem van de emmer te bedekken',
            opmerkingen: 'Scheuren in kleine stukken en natmaken. Dient als bedding voor de wormen.',
            tip: 'Vraag pakketdozen op bij conciërge of kantine.',
            optioneel: false,
          },
          {
            naam: 'GFT-afval (groente- en fruitresten)',
            hoeveelheid: 'Elke week een kleine portie',
            opmerkingen: 'Appelschillen, koffiedik, theefilters, saladeresten. Geen vlees, vis, zuivel of citrus.',
            tip: 'Maak een afspraak met de kantine om wekelijks GFT-afval te leveren.',
            optioneel: false,
          },
          {
            naam: 'Bladeren of stro',
            hoeveelheid: 'Handvol per week',
            opmerkingen: 'Droge bruine bladeren als "carbon bron" voor de bedding. Houdt de pH in balans.',
            tip: 'Verzamelen in de herfst en bewaren in een zak.',
            optioneel: false,
          },
          {
            naam: 'Tuinaarde of potgrond',
            hoeveelheid: '1-2 liter per wormenhotel',
            opmerkingen: 'Geeft de wormen houvast en mineralen bij de start.',
            tip: 'Gewone tuinaarde uit de tuin of van school volstaat.',
            optioneel: false,
          },
        ],
      },
      {
        naam: 'Meetmateriaal',
        icon: '📏',
        kleur: 'purple',
        items: [
          {
            naam: 'pH-teststrips',
            hoeveelheid: '1 pakje per klas',
            opmerkingen: 'Om de zuurgraad van de compost te meten. Wormen gedijen best bij pH 6–7.',
            tip: 'Goedkoop te koop in tuincentrum of drogist.',
            optioneel: true,
          },
          {
            naam: 'Keukenweegschaal',
            hoeveelheid: '1 per klas',
            opmerkingen: 'Voor het wegen van toegevoegd afval en geproduceerde compost.',
            tip: 'Kan worden geleend uit de keuken of gekocht.',
            optioneel: true,
          },
          {
            naam: 'Thermometer',
            hoeveelheid: '1 per wormenhotel',
            opmerkingen: 'Wormen zijn actief tussen 15°C en 25°C. Boven 30°C worden ze inactief.',
            tip: 'Een goedkope keukenthermometer volstaat.',
            optioneel: true,
          },
        ],
      },
      {
        naam: 'Digitaal / voor de klas',
        icon: '💻',
        kleur: 'gray',
        items: [
          {
            naam: 'Smartphone of tablet (per groep)',
            hoeveelheid: '1 per groep',
            opmerkingen: 'Voor het maken van foto\'s voor het logboek.',
            tip: 'Kan ook worden gebruikt voor het opnemen van eindpresentaties.',
            optioneel: false,
          },
          {
            naam: 'Toegang tot dit platform',
            hoeveelheid: 'Account per leerling',
            opmerkingen: 'Voor het bijhouden van logboek, observaties en vragen.',
            tip: 'Registreer leerlingen van tevoren of doe dit in de eerste les.',
            optioneel: false,
          },
        ],
      },
    ],

    voorbereiding_begeleider: [
      'Bestel compostwormen minimaal 1 week voor de bouwles',
      'Verzamel emmers via kantine of bedrijven in de buurt',
      'Boor gaatjes in de emmers vóór de les (bespaar lestijd)',
      'Maak een afspraak met de kantine over wekelijks GFT-afval',
      'Zorg voor een vaste plek voor het wormenhotel (kamertemperatuur, niet in direct zonlicht)',
      'Registreer alle leerlingen op het platform',
    ],
  },

  // ════════════════════════════════════════════════════════════════════════════
  keuringsdienst: {
    intro: 'Hieronder staan alle materialen die je nodig hebt voor het Keuringsdienst van Waarde-project. De compostthee wordt geleverd door Soil Valley.',

    categorieen: [
      {
        naam: 'Experiment: potten en planten',
        icon: '🧪',
        kleur: 'blue',
        items: [
          {
            naam: 'Transparante cilinders of potten (Ø ≥ 10 cm)',
            hoeveelheid: '3 per groep (liefst identiek)',
            opmerkingen: 'Transparant zodat wortelontwikkeling zichtbaar is. Zorg dat ze drainage-gaatjes hebben.',
            tip: 'Transparante opslagpotten werken goed. Ook plastic flessenhalven (2L) zijn een duurzame optie.',
            optioneel: false,
          },
          {
            naam: 'Ongefertiliseerde potgrond',
            hoeveelheid: 'Gelijke hoeveelheid voor alle 3 potten',
            opmerkingen: 'Expliciet ongefertiliseerd — dit is de onbewerkte basisbodem. Niet de standaard "voedingsrijke" potgrond.',
            tip: 'Controleer de verpakking: er mag geen kunstmest of voedingsstoffen aan zijn toegevoegd.',
            optioneel: false,
          },
          {
            naam: 'Radijszaadjes',
            hoeveelheid: '5–10 zaadjes per pot',
            opmerkingen: 'Gebruik dezelfde soort radijs voor alle potten. Zaai op gelijke diepte (±1 cm).',
            tip: 'Dun later uit tot 3 planten per pot voor een eerlijk experiment.',
            optioneel: false,
          },
          {
            naam: 'Compostthee (van Soil Valley)',
            hoeveelheid: 'Dosering volgens instructie van Soil Valley',
            opmerkingen: 'Aangeleverd door Soil Valley. Bewaar koel en gebruik op de dag van aanlevering.',
            tip: 'Neem contact op met Soil Valley voor de juiste dosering en leveringsafspraken.',
            optioneel: false,
          },
          {
            naam: 'Kunstmest (vloeibaar of korrels)',
            hoeveelheid: 'Dosering volgens verpakking',
            opmerkingen: 'Gebruik een standaard NPK-kunstmest. Noteer het merk en de concentratie voor de rapportage.',
            tip: 'Gebruik dezelfde hoeveelheid N als de compostthee bevat voor een eerlijke vergelijking.',
            optioneel: false,
          },
        ],
      },
      {
        naam: 'Meetmateriaal',
        icon: '📏',
        kleur: 'purple',
        items: [
          {
            naam: 'Liniaal of meetlat (30 cm)',
            hoeveelheid: '1 per groep',
            opmerkingen: 'Voor het wekelijks meten van de planthoogte in centimeters.',
            tip: 'Meet altijd op hetzelfde tijdstip en met dezelfde methode (bodem tot hoogste blad).',
            optioneel: false,
          },
          {
            naam: 'Smartphone of tablet',
            hoeveelheid: '1 per groep',
            opmerkingen: 'Voor foto\'s van de wekelijkse groei. Later te gebruiken in de eindpresentatie.',
            tip: 'Maak foto\'s altijd op dezelfde afstand en met dezelfde achtergrond voor eerlijke vergelijking.',
            optioneel: false,
          },
          {
            naam: 'Kleurenkaart bladgroen',
            hoeveelheid: '1 per klas',
            opmerkingen: 'Voor het objectief beoordelen van bladkleur (chlorofylinhoud). Optioneel maar leerzaam.',
            tip: 'Zelfgemaakte kaart met gradaties van groen is ook prima.',
            optioneel: true,
          },
          {
            naam: 'Schuifmaat (of diktemeter)',
            hoeveelheid: '1 per groep',
            opmerkingen: 'Voor het meten van de stengeldikte. Optioneel maar geeft nauwkeuriger data.',
            tip: 'Een goedkope plastic schuifmaat is voldoende.',
            optioneel: true,
          },
          {
            naam: 'Fotostatief of standaard',
            hoeveelheid: '1 per groep',
            opmerkingen: 'Voor het maken van consistente weekfoto\'s op dezelfde plek en hoogte.',
            tip: 'Een omgekeerde bak met tape-markering als vast punt werkt ook prima.',
            optioneel: true,
          },
        ],
      },
      {
        naam: 'Digitaal / voor de klas',
        icon: '💻',
        kleur: 'gray',
        items: [
          {
            naam: 'Toegang tot dit platform',
            hoeveelheid: 'Account per leerling',
            opmerkingen: 'Voor het bijhouden van observaties, logboek en vragen.',
            tip: 'Registreer leerlingen van tevoren of doe dit in de eerste les.',
            optioneel: false,
          },
          {
            naam: 'Video-opnameapparatuur (eindproduct)',
            hoeveelheid: '1 per groep',
            opmerkingen: 'Smartphone volstaat voor de Keuringsdienst-aflevering.',
            tip: 'Eventueel schoolapparaat lenen of de presentatie live doen.',
            optioneel: false,
          },
        ],
      },
    ],

    voorbereiding_begeleider: [
      'Neem contact op met Soil Valley voor compostthee-levering en excursieafspraken',
      'Bestel ongefertiliseerde potgrond — check expliciet dat er geen voedingsstoffen in zitten',
      'Koop radijszaadjes (dezelfde soort voor alle groepen)',
      'Zorg voor drie identieke transparante potten per groep',
      'Kies een vaste meetlocatie met gelijkmatige belichting voor alle potten',
      'Plan een vast wekelijks meetmoment in het rooster',
      'Registreer alle leerlingen op het platform',
      'Plan het Soil Valley-bezoek in: liefst in week 4 of 5 van het project',
    ],
  },
}
