// ─── Gedeelde lesarrays ────────────────────────────────────────────────────────
// WH_GEDEELD_1 = basis.moeilijk én midden.makkelijk (Wormenhotel)
const WH_GEDEELD_1 = [
  {
    type: 'info',
    titel: 'Kringlopen in de natuur',
    tekst: 'In de natuur gaat niets verloren — alles wordt hergebruikt. Dode planten worden afgebroken door bacteriën en schimmels. De vrijgekomen voedingsstoffen gaan terug in de bodem. Nieuwe planten nemen die voedingsstoffen op via hun wortels. Dieren eten de planten, en als die dieren dood gaan, breken bacteriën ze ook af. Dit noemen we een kringloop of cyclus. Bekende kringlopen zijn de stikstofkringloop, de koolstofkringloop en de waterkringloop.',
    feit: 'De stikstof in jouw lichaam is waarschijnlijk ooit onderdeel geweest van een dinosaurus, een boom en talloze andere organismen.',
  },
  {
    type: 'vraag',
    vraag: 'Wat is het kenmerk van een kringloop in de natuur?',
    antwoorden: [
      'Stoffen worden steeds hergebruikt — niets gaat verloren',
      'Afval wordt verbrand en verdwijnt',
      'Energie wordt opgeslagen in batterijen',
      'Water verdampt en komt nooit meer terug',
    ],
    correct: 0,
    uitleg: 'In een kringloop worden stoffen continu hergebruikt. Dood materiaal wordt afgebroken en levert voedingsstoffen voor nieuw leven.',
  },
  {
    type: 'info',
    titel: 'Lineaire economie vs. circulaire economie',
    tekst: 'In onze huidige maatschappij werken we vaak lineair: we halen grondstoffen uit de aarde, maken er producten van, gebruiken die producten, en gooien ze weg. Dit heet de lineaire economie: maak → gebruik → gooi weg. Dit is een probleem, want grondstoffen raken op en afval stapelt zich op. Bij een circulaire economie wordt het "afval" van het ene product de grondstof van iets nieuws — net zoals in de natuur. Een wormenhotel is een perfect voorbeeld van circulaire economie.',
    feit: 'Als iedereen op aarde zo leeft als de gemiddelde Nederlander, hebben we 3,6 planeten nodig. We hebben er maar één.',
  },
  {
    type: 'vraag',
    vraag: 'Wat is het verschil tussen een lineaire en een circulaire economie?',
    antwoorden: [
      'Lineair = maken-gebruiken-weggooien; circulair = afval wordt grondstof voor iets nieuws',
      'Lineair is beter voor het milieu dan circulair',
      'Ze betekenen precies hetzelfde',
      'Lineair gaat over energie, circulair over water',
    ],
    correct: 0,
    uitleg: 'Bij een lineaire economie eindigt alles als afval. Bij een circulaire economie worden stoffen steeds opnieuw gebruikt — net zoals in de natuur.',
  },
  {
    type: 'info',
    titel: 'Micro-organismen: de onzichtbare werkers',
    tekst: 'Bacteriën en schimmels zijn microscopisch klein — je kunt ze niet zien zonder microscoop. Toch zijn ze onmisbaar voor het leven op aarde. In de bodem breken ze organisch materiaal af en zetten ze dat om in voedingsstoffen die planten kunnen opnemen. In een wormenhotel werken wormen, bacteriën en schimmels samen als een team. In één gram gezonde compost leven meer dan 100 miljoen bacteriën!',
    feit: 'Schimmels kunnen draden (mycelium) maken die meters lang zijn. Ze verbinden zelfs bomen met elkaar ondergronds — het "wood wide web".',
  },
  {
    type: 'vraag',
    vraag: 'Welke rol spelen bacteriën en schimmels bij het composteren?',
    antwoorden: [
      'Ze breken organisch materiaal af en zetten het om in voedingsstoffen',
      'Ze houden organisch materiaal intact zodat het niet rot',
      'Ze produceren zuurstof',
      'Ze beschermen de compost tegen regen',
    ],
    correct: 0,
    uitleg: 'Bacteriën en schimmels zijn de motor achter compostering. Ze breken organisch materiaal af in voedingsstoffen die planten via hun wortels kunnen opnemen.',
  },
]

// WH_GEDEELD_2 = midden.moeilijk én havo.makkelijk (Wormenhotel)
const WH_GEDEELD_2 = [
  {
    type: 'info',
    titel: 'De stikstofkringloop in detail',
    tekst: 'Stikstof (N) is een van de meest essentiële voedingsstoffen voor planten. De lucht bestaat voor 78% uit stikstofgas (N₂), maar planten kunnen dit niet direct opnemen. Speciale bacteriën in de bodem zetten stikstofgas om in een vorm die planten wél kunnen opnemen: nitraat (NO₃). Dit noemen we stikstoffixatie. Andere bacteriën breken organisch afval af en zetten eiwitten om in ammonium (NH₄) en later nitraat — dit is de stikstofmineralisatie. Wormen versnellen dit proces doordat hun uitwerpselen bacteriën voeden.',
    feit: 'Sommige planten, zoals klaver en soja, leven samen met stikstoffixerende bacteriën in hun wortels. Ze "bemesten" zichzelf!',
  },
  {
    type: 'vraag',
    vraag: 'Waarom kunnen planten stikstof uit de lucht niet direct opnemen?',
    antwoorden: [
      'Stikstofgas (N₂) moet eerst door bacteriën worden omgezet in nitraat voordat planten het kunnen opnemen',
      'Planten hebben geen stikstof nodig',
      'De lucht bevat te weinig stikstof',
      'Planten kunnen stikstof alleen via de bladeren opnemen, niet via de wortels',
    ],
    correct: 0,
    uitleg: 'Hoewel lucht voor 78% uit stikstof bestaat, kunnen planten dit gas niet direct gebruiken. Bacteriën zetten het eerst om in opneembare vormen zoals nitraat.',
  },
  {
    type: 'info',
    titel: 'Vermicompostering vs. industriële compostering',
    tekst: 'Er zijn twee grote manieren om organisch afval te composteren. Bij industriële compostering wordt afval op grote schaal verwerkt in installaties. Dit gaat snel (6-8 weken) maar verbruikt energie voor transport en machines. Bij vermicompostering (wormenhotel) doen wormen het werk. Dit gaat langzamer (3-6 maanden), verbruikt nauwelijks energie, kan lokaal — zelfs in een klas. Bovendien is vermicompost rijker: het bevat meer opneembare voedingsstoffen en meer nuttige micro-organismen dan industrieel compost.',
    feit: 'Vermicompost bevat tot 5x meer stikstof, 7x meer fosfor en 11x meer kalium dan gewone tuinaarde.',
  },
  {
    type: 'vraag',
    vraag: 'Wat is een voordeel van vermicompostering ten opzichte van industriële compostering?',
    antwoorden: [
      'Het verbruikt nauwelijks energie, kan lokaal en produceert rijkere compost',
      'Het gaat veel sneller dan industriële compostering',
      'Het kan grotere hoeveelheden verwerken',
      'Het heeft geen wormen nodig',
    ],
    correct: 0,
    uitleg: 'Vermicompostering is energieneutraal, lokaal uitvoerbaar en produceert rijkere compost. Het nadeel is de lagere verwerkingssnelheid bij grote hoeveelheden.',
  },
  {
    type: 'info',
    titel: 'Bodembiodiversiteit en ecosysteemdiensten',
    tekst: 'Bodem is een van de meest biodiverse ecosystemen op aarde. In gezonde grond leven niet alleen wormen en bacteriën, maar ook schimmels, springstaarten, mijten, nematoden en tientallen andere organismen. Al deze organismen vervullen een functie: afbraak van organisch materiaal, luchtigheid van de bodem, waterdoorlatendheid, ziekteonderdrukking bij planten. Dit noemen we ecosysteemdiensten — diensten die de natuur gratis levert. Kunstmest vervangt slechts één van die diensten (voeding), maar vernietigt de rest.',
    feit: 'Eén vierkante meter gezonde bodem kan tot 1000 liter water per uur opnemen. Dezelfde oppervlakte verslechterde landbouwgrond: minder dan 10 liter.',
  },
  {
    type: 'vraag',
    vraag: 'Wat zijn "ecosysteemdiensten" van bodem?',
    antwoorden: [
      'Diensten die het bodemecosysteem gratis levert, zoals afbraak van afval, wateropslag en ziektebestrijding bij planten',
      'Commerciële diensten die bedrijven bieden voor bodemanalyse',
      'De functies van een computer in een ecosysteem',
      'Diensten die de overheid levert om de bodem schoon te houden',
    ],
    correct: 0,
    uitleg: 'Ecosysteemdiensten zijn de voordelen die een gezond ecosysteem levert zonder kosten: wateropslag, afbraak van afval, ziekteonderdrukking, CO₂-opslag en meer.',
  },
]

// KD_GEDEELD_1 = basis.moeilijk én midden.makkelijk (Keuringsdienst)
const KD_GEDEELD_1 = [
  {
    type: 'info',
    titel: 'De wetenschappelijke methode',
    tekst: 'Bij wetenschappelijk onderzoek volgen wetenschappers altijd dezelfde stappen: (1) Observeer iets en stel een vraag. (2) Formuleer een hypothese: een voorspelling die je kunt testen. (3) Ontwerp een experiment om je hypothese te testen. (4) Voer het experiment uit en verzamel data. (5) Analyseer je data. (6) Trek een conclusie: klopt je hypothese? (7) Deel je bevindingen. Door deze stappen te volgen, zijn resultaten betrouwbaar en kunnen anderen het experiment herhalen.',
    feit: 'De wetenschappelijke methode is al meer dan 400 jaar oud en ligt aan de basis van alle wetenschappelijke kennis die we hebben.',
  },
  {
    type: 'vraag',
    vraag: 'Wat is een hypothese?',
    antwoorden: [
      'Een testbare voorspelling die aangeeft wat je verwacht dat er zal gebeuren',
      'De uitkomst van een experiment',
      'Een fout die je maakt tijdens een experiment',
      'De naam voor het materiaal dat je gebruikt',
    ],
    correct: 0,
    uitleg: 'Een hypothese is een voorspelling die je vóór het experiment opstelt. Na het experiment controleer je of de hypothese klopt met de resultaten.',
  },
  {
    type: 'info',
    titel: 'Variabelen in een experiment',
    tekst: 'In een experiment heb je drie soorten variabelen. De onafhankelijke variabele is wat jij verandert (in jullie geval: de bodemtoevoeging — niets, kunstmest of compostthee). De afhankelijke variabele is wat je meet (plantgroei, bladkleur, grootte radijs). De gecontroleerde variabelen zijn alle factoren die je gelijk houdt (water, licht, grondsoort, temperatuur). Als je gecontroleerde variabelen niet gelijk houdt, weet je nooit of de uitkomst door jouw variabele komt of door iets anders.',
    feit: 'De begrippen "onafhankelijke variabele" en "afhankelijke variabele" worden gebruikt in alle wetenschappelijke disciplines, van biologie tot natuurkunde.',
  },
  {
    type: 'vraag',
    vraag: 'Wat is de onafhankelijke variabele in jullie experiment?',
    antwoorden: [
      'De bodemtoevoeging: niets, kunstmest of compostthee',
      'De hoogte van de plant',
      'De hoeveelheid water',
      'De kleur van de pot',
    ],
    correct: 0,
    uitleg: 'De onafhankelijke variabele is wat je bewust verandert. In jullie experiment is dat de toevoeging aan de bodem. De groei van de plant is de afhankelijke variabele die je meet.',
  },
  {
    type: 'info',
    titel: 'Micro-organismen in de bodem',
    tekst: 'De bodem is vol met microscopisch kleine levende wezens: bacteriën, schimmels, protisten en nematoden. Deze micro-organismen zijn onmisbaar voor planten. Ze breken organisch materiaal af en maken voedingsstoffen beschikbaar. Ze beschermen planten tegen ziektes. Ze helpen wortels water op te nemen. Kunstmest geeft planten wel voedsel, maar voedt de micro-organismen niet. Compostthee geeft zowel voedingsstoffen als micro-organismen, waardoor het hele bodemecosysteem wordt versterkt.',
    feit: 'In één gram gezonde bodem leven meer bacteriën dan er mensen op aarde zijn (meer dan 8 miljard!).',
  },
  {
    type: 'vraag',
    vraag: 'Waarom is compostthee mogelijk beter voor de bodem op lange termijn dan kunstmest?',
    antwoorden: [
      'Compostthee voegt naast voedingsstoffen ook micro-organismen toe, die het bodemecosysteem versterken',
      'Compostthee is goedkoper dan kunstmest',
      'Compostthee werkt sneller dan kunstmest',
      'Compostthee heeft geen geur, kunstmest wel',
    ],
    correct: 0,
    uitleg: 'Kunstmest geeft alleen voedingsstoffen. Compostthee geeft ook micro-organismen die het bodemleven versterken — dit levert langdurige voordelen voor de bodemgezondheid.',
  },
]

// KD_GEDEELD_2 = midden.moeilijk én havo.makkelijk (Keuringsdienst)
const KD_GEDEELD_2 = [
  {
    type: 'info',
    titel: 'Bodemecologie: een systeem in balans',
    tekst: 'De bodem is een complex ecosysteem met vele lagen en interacties. Bacteriën breken eenvoudige organische stoffen af. Schimmels (mycorrhiza) vormen netwerken rond plantenwortels en helpen bij de opname van fosfor. Nematoden (rondwormen) eten bacteriën en schimmels en reguleren hun populaties. Wormen vermengen lagen en creëren habitats voor micro-organismen. Dit systeem werkt als een precisemachine: elk organisme heeft een functie. Kunstmest verstoort dit systeem doordat het bacteriepopulaties verandert en het bodemleven op den duur verarmt.',
    feit: 'Mycorrhizaschimmels leven in symbiose met 90% van alle landplanten. Ze vergroten het worteloppervlak effectief met 700%.',
  },
  {
    type: 'vraag',
    vraag: 'Hoe beïnvloedt langdurig kunstmestgebruik het bodemecosysteem?',
    antwoorden: [
      'Het verandert bacteriepopulaties, vermindert bodemleven en verlaagt het organische stofgehalte op lange termijn',
      'Het verbetert het bodemleven door extra voedingsstoffen toe te voegen',
      'Het heeft geen effect op het bodemleven',
      'Het verhoogt het aantal wormen in de bodem',
    ],
    correct: 0,
    uitleg: 'Kunstmest levert voedingsstoffen maar voedt het bodemleven niet. Op lange termijn daalt het organische stofgehalte, verarmt het ecosysteem en wordt de bodem afhankelijk van kunstmest.',
  },
  {
    type: 'info',
    titel: 'Stikstofvervuiling en het milieu',
    tekst: 'Kunstmest bevat veel stikstof. Een deel hiervan wordt opgenomen door planten, maar een groot deel spoelt weg naar het grondwater (als nitraat) of verdampt als lachgas (N₂O — een sterk broeikasgas). Nitraat in het grondwater kan drinkwater vervuilen en leidt tot algenbloei in rivieren en meren, wat vissen doodt. Dit heet eutrofiëring. Nederland kampt sterk met stikstofproblematiek: te veel stikstofneerslag beschadigt natuur en ecosystemen. Compostthee heeft een aanzienlijk lager risico op stikstofuitspoeling.',
    feit: 'Lachgas (N₂O) uit kunstmest is 298 keer sterker als broeikasgas dan CO₂.',
  },
  {
    type: 'vraag',
    vraag: 'Wat is eutrofiëring en waardoor wordt het veroorzaakt?',
    antwoorden: [
      'Overmatige algengroei in water door teveel stikstof en fosfor, vaak afkomstig van kunstmest',
      'Een tekort aan zuurstof in de bodem door te veel water',
      'Een ziekte bij planten die door schimmels wordt veroorzaakt',
      'Het verdwijnen van bodemleven door pesticiden',
    ],
    correct: 0,
    uitleg: 'Eutrofiëring treedt op wanneer teveel stikstof en fosfor in water terechtkomen. Algen exploderen in aantal, verbruiken alle zuurstof en doden andere waterorganismen.',
  },
  {
    type: 'info',
    titel: 'Duurzame landbouw: modellen en principes',
    tekst: 'Er zijn verschillende modellen voor duurzamere landbouw. Bij biologische landbouw worden geen synthetische pesticiden of kunstmest gebruikt; compost en organische mest zijn de basis. Bij regeneratieve landbouw gaat het verder: actief bodemherstel, biodiversiteitsbevordering en koolstofvastlegging. Bij circulaire landbouw worden alle nutriënten in een gesloten kringloop gehouden. Elk model erkent dat bodemgezondheid de kern is van duurzame voedselproductie. Compostthee past in alle drie deze modellen.',
    feit: 'Regeneratieve landbouw kan de bodem in 5-10 jaar zodanig herstellen dat het koolstofgehalte meetbaar stijgt.',
  },
  {
    type: 'vraag',
    vraag: 'Wat onderscheidt regeneratieve landbouw van biologische landbouw?',
    antwoorden: [
      'Regeneratieve landbouw richt zich actief op herstel van bodem en biodiversiteit, biologisch alleen op vermijden van schade',
      'Biologische landbouw is duurzamer dan regeneratieve landbouw',
      'Ze zijn precies hetzelfde',
      'Regeneratieve landbouw gebruikt kleine hoeveelheden kunstmest, biologische landbouw niet',
    ],
    correct: 0,
    uitleg: 'Biologisch = geen kunstmest/pesticiden. Regeneratief = actief bodemherstel, biodiversiteitstoename en koolstofvastlegging. Regeneratief is een uitbreiding van biologisch.',
  },
]

// ─── Wormenhotel: lesinhoud per niveau ────────────────────────────────────────

const WH_BASIS_MAK = [
  {
    type: 'info',
    titel: 'Wat is een worm?',
    tekst: 'Een regenworm is een klein dier zonder poten of ogen. Het lichaam van een worm bestaat uit losse ringetjes. Wormen leven onder de grond. Ze bewegen door zich uit te rekken en samen te trekken. Wormen houden van vochtige, donkere plekken. In een tuin of schoolgaard kun je wormen vinden onder stenen of dood blad.',
    feit: 'Een regenworm heeft geen longen. Hij ademt gewoon door zijn huid!',
  },
  {
    type: 'vraag',
    vraag: 'Hoe beweegt een regenworm?',
    antwoorden: [
      'Door zich uit te rekken en samen te trekken',
      'Met kleine pootjes aan de onderkant',
      'Door te rollen als een bal',
      'Met vleugels',
    ],
    correct: 0,
    uitleg: 'Een worm heeft geen poten. Hij beweegt door spieren te gebruiken: uitrekken en samentrekken. Zo "kruipt" hij door de grond.',
  },
  {
    type: 'info',
    titel: 'Wat eet een worm?',
    tekst: 'Wormen eten dood plantmateriaal: gevallen bladeren, stukjes gras, groenteresten en fruit. Ze eten ook de bacteriën die op dit materiaal leven. Een worm trekt eten mee de grond in en eet het daar op. Ze eten bijna alles wat ooit een plant was. Vlees, plastic en glas eten ze niet.',
    feit: 'Een worm kan per dag zijn eigen gewicht aan voedsel eten!',
  },
  {
    type: 'vraag',
    vraag: 'Wat eet een regenworm?',
    antwoorden: [
      'Dode bladeren, groenteresten en ander plantaardig materiaal',
      'Vlees en visresten',
      'Zand en steentjes',
      'Plastic zakjes',
    ],
    correct: 0,
    uitleg: 'Wormen eten plantaardig materiaal dat al een beetje begint te rotten. Vlees, plastic en glas eten ze niet.',
  },
  {
    type: 'info',
    titel: 'Wat is grond?',
    tekst: 'Grond (ook wel bodem of aarde genoemd) is een mengsel van kleine steentjes en zandkorrels, stukjes dood plantenmateriaal en kleine beestjes zoals wormen, bacteriën en insecten. Grond ziet er gewoon uit, maar het is eigenlijk heel bijzonder! Zonder grond kunnen planten niet groeien, en zonder planten hebben mensen en dieren niets te eten.',
    feit: 'In één lepel tuinaarde leven meer kleine beestjes dan er mensen op de hele aarde zijn!',
  },
  {
    type: 'vraag',
    vraag: 'Waaruit bestaat grond?',
    antwoorden: [
      'Zandkorrels, stukjes dode planten en kleine beestjes',
      'Alleen zand',
      'Alleen water',
      'Plastic en rommel',
    ],
    correct: 0,
    uitleg: 'Grond is een mengsel van zandkorrels, stukjes dode planten (organisch materiaal) en miljoenen kleine beestjes zoals bacteriën en wormen.',
  },
  {
    type: 'info',
    titel: 'Wat is een wormenhotel?',
    tekst: 'Een wormenhotel is een bak met wormen erin. Je gooit er groente- en fruitresten in. De wormen eten dat op. Na een tijdje maken de wormen donkere, rijke aarde — dit heet compost. Die compost is heel goed voor planten. Een wormenhotel is een manier om afval te hergebruiken en verspilling tegen te gaan.',
    feit: 'Compostwormen zijn roodachtig en kleiner dan gewone regenwormen. Ze zijn snelle eters!',
  },
  {
    type: 'vraag',
    vraag: 'Wat doen de wormen in een wormenhotel?',
    antwoorden: [
      'Ze eten groente- en fruitresten op en maken compost',
      'Ze bewaken de bak',
      'Ze produceren honing',
      'Ze zuiveren water',
    ],
    correct: 0,
    uitleg: 'De wormen in een wormenhotel eten groente- en fruitresten op. Wat ze uitpoepen is compost — een donkere, rijke stof die goed is voor planten.',
  },
  {
    type: 'info',
    titel: 'Wat mag er in het wormenhotel?',
    tekst: 'In een wormenhotel mag je gooien: schillen van groente en fruit, koffiedik, theezakjes, beschimmeld brood en nattig karton. Wat er NIET in mag: vlees, vis, kaas en andere zuivelproducten. Die trekken ratten en vliegen aan en stinken heel erg. Houd het bij plantaardig materiaal, dan werkt het wormenhotel het beste.',
    feit: 'Wormen houden van koffiedik! Het helpt de compost luchtig en goed van structuur te houden.',
  },
  {
    type: 'vraag',
    vraag: 'Wat mag je NIET in een wormenhotel gooien?',
    antwoorden: [
      'Vlees en visresten',
      'Appelschillen',
      'Koffiedik',
      'Slablaadjes',
    ],
    correct: 0,
    uitleg: 'Vlees en vis trekken ratten en vliegen aan en geven nare geuren. Groente- en fruitresten zijn perfect voor het wormenhotel.',
  },
  {
    type: 'info',
    titel: 'Wat kun je met compost doen?',
    tekst: 'Compost is de donkere, rijke aarde die wormen maken van je groenteresten. Je kunt compost gebruiken voor de schooltuin: schep het over de grond zodat planten beter groeien. Je kunt het ook door potgrond mixen voor kamerplanten. Of verdun het in water en giet het over planten als vloeibaar plantenvoedsel. Zo kringlopen de voedingsstoffen terug naar de natuur!',
    feit: 'Wormcompost is 5 keer rijker aan voedingsstoffen dan gewone tuinaarde!',
  },
  {
    type: 'vraag',
    vraag: 'Hoe kun je compost uit het wormenhotel gebruiken?',
    antwoorden: [
      'Over de schooltuin strooien of door potgrond mixen',
      'Weggooien bij het plastic afval',
      'Bewaren in de koelkast',
      'Teruggeven aan de supermarkt',
    ],
    correct: 0,
    uitleg: 'Compost is heel waardevol! Je kunt het in de tuin strooien, door potgrond mixen of verdunnen als vloeibare plantvoeding. Zo gaat niets verloren.',
  },
]

const WH_BASIS_GEM = [
  {
    type: 'info',
    titel: 'Wat is bodem?',
    tekst: 'Bodem is veel meer dan gewoon "aarde" of "zand". Het is een levende laag die bestaat uit zandkorrels, klei, stukjes steen en organisch materiaal — dat zijn resten van dode planten en dieren. In de bodem leven ook miljoenen kleine beestjes, bacteriën en schimmels. Zonder bodem kunnen er geen planten groeien, en zonder planten geen dieren en mensen. De bodem is de basis van bijna al het leven op land.',
    feit: 'In één handvol tuinaarde leven meer kleine wezens dan er mensen op de hele aarde zijn!',
  },
  {
    type: 'vraag',
    vraag: 'Waaruit bestaat bodem?',
    antwoorden: [
      'Zandkorrels, klei, organisch materiaal en kleine levende wezens',
      'Alleen zand en stenen',
      'Alleen water en lucht',
      'Plastic en chemicaliën',
    ],
    correct: 0,
    uitleg: 'Bodem is een mengsel van zandkorrels, klei, organisch materiaal en miljoenen kleine levende wezens zoals bacteriën, schimmels en insecten.',
  },
  {
    type: 'info',
    titel: 'Wat is organisch afval?',
    tekst: 'Organisch afval is al het afval dat afkomstig is van planten of dieren. Denk aan schillen van fruit en groente, koffiedik, theezakjes, bladeren en etensresten. Dit soort afval wordt ook wel GFT-afval genoemd: Groente, Fruit en Tuin. Organisch afval is heel anders dan plastic of glas: het kan worden afgebroken door kleine beestjes en bacteriën. Uiteindelijk verdwijnt het in de bodem.',
    feit: 'De gemiddelde Nederlander gooit per jaar zo\'n 47 kilo groente- en fruitafval weg. Dat is bijna een volle koffer!',
  },
  {
    type: 'vraag',
    vraag: 'Wat is organisch afval?',
    antwoorden: [
      'Afval van planten of dieren, zoals fruitschillen en bladeren',
      'Plastic flessen en plastic zakjes',
      'Glas en metaal',
      'Verf en chemicaliën',
    ],
    correct: 0,
    uitleg: 'Organisch afval komt van planten of dieren en kan worden afgebroken in de natuur. Plastic en glas zijn dat niet — die blijven heel lang bestaan.',
  },
  {
    type: 'info',
    titel: 'Afbreken: hoe werkt dat?',
    tekst: 'Wanneer een appel op de grond valt, begint hij al snel te rotten. Dit komt doordat kleine beestjes, bacteriën en schimmels de appel opeten en afbreken in steeds kleinere deeltjes. Uiteindelijk worden die deeltjes zo klein dat ze opgaan in de bodem. Dit noemen we afbraak of decompostie. Zonder dit proces zou de wereld vol liggen met dood materiaal!',
    feit: 'Een dood blad wordt volledig afgebroken in 6 maanden tot 2 jaar, afhankelijk van warmte en vocht.',
  },
  {
    type: 'vraag',
    vraag: 'Wat gebeurt er bij het afbreken van organisch afval?',
    antwoorden: [
      'Kleine beestjes en bacteriën breken het af tot kleine deeltjes die in de bodem verdwijnen',
      'Het afval verdampt vanzelf in de lucht',
      'Het afval wordt harder en verandert in steen',
      'Het afval verandert in plastic',
    ],
    correct: 0,
    uitleg: 'Bij afbraak eten bacteriën, schimmels en kleine beestjes organisch materiaal op. Ze zetten het om in kleine deeltjes die voedingsstoffen worden voor de bodem.',
  },
  {
    type: 'info',
    titel: 'De regenworm',
    tekst: 'Regenwormen zijn een van de belangrijkste dieren op aarde. Ze leven in de bodem en eten organisch afval zoals bladeren en dode planten. Terwijl ze eten, graven ze gangen door de bodem. Die gangen zijn heel handig: ze zorgen ervoor dat lucht en water goed in de bodem kunnen doordringen, zodat plantenwortels kunnen ademen. De uitwerpselen van wormen zijn ook superwaardevol: ze zitten vol met voedingsstoffen voor planten.',
    feit: 'Eén regenworm kan per jaar zijn eigen gewicht aan organisch materiaal verwerken. Er zijn meer dan 3.000 soorten wormen!',
  },
  {
    type: 'vraag',
    vraag: 'Wat doen regenwormen voor de bodem?',
    antwoorden: [
      'Ze maken de bodem luchtiger, verwerken organisch afval en produceren voedingsrijke uitwerpselen',
      'Ze beschermen de bodem tegen regen',
      'Ze maken de bodem harder zodat planten steviger staan',
      'Ze eten schadelijke insecten op',
    ],
    correct: 0,
    uitleg: 'Regenwormen zijn echte bodembouwers: ze graven gangen (lucht en water), eten organisch afval op en scheiden voedingsrijke mest uit.',
  },
  {
    type: 'info',
    titel: 'Wat zijn voedingsstoffen voor planten?',
    tekst: 'Net zoals jij eten nodig hebt om te groeien, hebben planten voedingsstoffen nodig. De drie allerbelangrijkste zijn: stikstof (N) voor de groei van bladeren en stengels, fosfor (P) voor de ontwikkeling van sterke wortels, en kalium (K) voor bloemen en vruchten. Planten halen deze stoffen uit de bodem via hun wortels. Als de bodem arm is aan voedingsstoffen, groeien planten slecht.',
    feit: 'Op zakjes kunstmest staat altijd NPK vermeld — dat staat voor Stikstof (N), Fosfor (P) en Kalium (K).',
  },
  {
    type: 'vraag',
    vraag: 'Welke drie voedingsstoffen zijn het belangrijkst voor planten?',
    antwoorden: [
      'Stikstof (N), fosfor (P) en kalium (K)',
      'Zout, suiker en vet',
      'Koolstof, waterstof en zuurstof',
      'Calcium, magnesium en ijzer',
    ],
    correct: 0,
    uitleg: 'De drie hoofdvoedingsstoffen voor planten zijn stikstof (bladgroei), fosfor (wortels) en kalium (bloemen/vruchten). Dit wordt ook wel NPK genoemd.',
  },
  {
    type: 'info',
    titel: 'Wat is compost?',
    tekst: 'Compost is het eindproduct van het afbraakproces. Wanneer organisch afval volledig is afgebroken door wormen, bacteriën en schimmels, ontstaat er een donkere, kruimelige stof die lijkt op aarde. Dit is compost. Het zit boordevol voedingsstoffen en is fantastisch voor planten. Compost kun je zelf maken thuis of op school — in een composthoop buiten, of in een wormenhotel!',
    feit: 'Goede compost ruikt naar bosgrond — fris en aards. Ruikt het naar rotte eieren of ammonia? Dan is er iets mis.',
  },
  {
    type: 'vraag',
    vraag: 'Wat is compost?',
    antwoorden: [
      'Donkere, kruimelige stof vol voedingsstoffen, ontstaan uit afgebroken organisch afval',
      'Een soort kunstmest die je in de winkel koopt',
      'Gewone tuinaarde zonder bijzondere eigenschappen',
      'Een mengsel van zand en water',
    ],
    correct: 0,
    uitleg: 'Compost ontstaat wanneer organisch afval volledig is afgebroken. Het is donker, kruimelig en vol voedingsstoffen — perfect voor planten.',
  },
  {
    type: 'info',
    titel: 'Hoe werkt een wormenhotel?',
    tekst: 'Een wormenhotel is een bak met lagen. Onderaan zit een laag voor drainage (afvoer van vocht). Daarboven komt een laag vochtige bedding van karton en bladeren — dit is het huis van de wormen. Vervolgens voeg je compostwormen toe en gooi je er regelmatig GFT-afval op. De wormen eten dit op en produceren compost. Na een paar weken kun je de compost oogsten en gebruiken voor planten.',
    feit: 'Compostwormen (Eisenia fetida) zijn roodachtig en kleiner dan gewone regenwormen. Ze zijn echte afvalverwerkers!',
  },
  {
    type: 'vraag',
    vraag: 'Wat gaat er NIET in een wormenhotel?',
    antwoorden: [
      'Vlees, vis of zuivelproducten',
      'Fruitschillen',
      'Koffiedik en theezakjes',
      'Groenteresten',
    ],
    correct: 0,
    uitleg: 'Vlees, vis en zuivel trekken ratten en vliegen aan en veroorzaken nare geuren. GFT-afval van groente en fruit is juist ideaal.',
  },
  {
    type: 'vraag',
    vraag: 'Hoe weet je dat je wormenhotel goed werkt?',
    antwoorden: [
      'Het ruikt naar bosgrond en de wormen zijn actief en bewegen',
      'Het ruikt sterk naar rotte eieren',
      'Er zitten veel vliegjes in',
      'De wormen liggen stil en bewegen niet',
    ],
    correct: 0,
    uitleg: 'Een gezond wormenhotel ruikt fris zoals bosgrond. Actieve wormen betekenen dat ze eten en compost produceren. Vieze geuren of vliegjes zijn een teken dat er iets mis is.',
  },
  {
    type: 'info',
    titel: 'Wat kun je met compost doen?',
    tekst: 'Compost uit je wormenhotel kun je op verschillende manieren gebruiken. Je kunt het mengen met potgrond voor kamerplanten of schooltuinplanten. Je kunt het ook over de schooltuin strooien als bodemverbeteraar. Een andere optie is het verdunnen met water — dit noem je compostthee — en het als vloeibaar plantenvoedsel gebruiken. Zo gaat niets verloren en geef je de voedingsstoffen terug aan de natuur.',
    feit: 'Wormcompost is 5x rijker aan stikstof dan gewone tuinaarde!',
  },
  {
    type: 'vraag',
    vraag: 'Hoe kun je compost uit een wormenhotel gebruiken?',
    antwoorden: [
      'Mengen met potgrond, strooien in de tuin of verdunnen als vloeibaar plantenvoedsel',
      'Weggooien bij het restafval',
      'Verbranden voor energie',
      'Terugleggen in het wormenhotel zonder iets te doen',
    ],
    correct: 0,
    uitleg: 'Compost is te waardevol om weg te gooien! Je kunt het mengen met potgrond, in de tuin strooien of verdunnen als compostthee voor planten.',
  },
]

const WH_MIDDEN_GEM = [
  {
    type: 'info',
    titel: 'Bodemstructuur: waarom kruimelig beter is',
    tekst: 'Goede bodem heeft een kruimelige structuur, een beetje zoals een brownie. Dit is belangrijk om drie redenen: (1) plantenwortels kunnen er makkelijk doorheen groeien, (2) water wordt goed vastgehouden maar stroomt ook door zodat wortels niet rotten, en (3) er zit genoeg lucht in de bodem voor de wortels om te ademen. Compost verbetert de structuur van slechte bodem door organisch materiaal toe te voegen. Harde, dichtgepakte grond is slecht — water loopt er niet in en wortels kunnen er niet doorheen.',
    feit: 'Slechte, harde bodem laat regenwater niet in — dit zorgt voor overstromingen in steden.',
  },
  {
    type: 'vraag',
    vraag: 'Wat zijn de drie voordelen van een kruimelige bodemstructuur?',
    antwoorden: [
      'Wortels kunnen groeien, water wordt vastgehouden en er is lucht in de bodem',
      'De grond ziet er netjes uit, is makkelijk te harken en weegt minder',
      'Planten worden groter, bloemen zijn kleurrijker en fruit wordt zoeter',
      'Er zijn minder onkruiden, minder slakken en minder regenwormen',
    ],
    correct: 0,
    uitleg: 'Goede bodemstructuur zorgt dat wortels kunnen doorgroeien, water goed wordt gereguleerd en er voldoende lucht is voor de wortelademhaling.',
  },
  {
    type: 'info',
    titel: 'Bodem en klimaatverandering',
    tekst: 'CO₂ (koolstofdioxide) is een gas dat bijdraagt aan klimaatverandering als er te veel van in de atmosfeer zit. Wist je dat de bodem een gigantische opslagplaats voor koolstof is? Gezonde bodem, vol organisch materiaal, slaat enorme hoeveelheden koolstof op. Als bodem verslechtert door intensieve landbouw of overmatig ploegen, komt die opgeslagen koolstof vrij als CO₂ in de atmosfeer. Door compost te maken en de bodem gezond te houden, help je dus klimaatverandering te vertragen.',
    feit: 'De bodem slaat 2 tot 3 keer meer koolstof op dan alle bossen op aarde bij elkaar!',
  },
  {
    type: 'vraag',
    vraag: 'Hoe draagt gezonde bodem bij aan het tegengaan van klimaatverandering?',
    antwoorden: [
      'Gezonde bodem slaat koolstof op en houdt het weg uit de atmosfeer',
      'Gezonde bodem produceert extra zuurstof die CO₂ neutraliseert',
      'Gezonde bodem reflecteert zonlicht terug de ruimte in',
      'Gezonde bodem absorbeert radioactieve straling',
    ],
    correct: 0,
    uitleg: 'Koolstof wordt opgeslagen in organisch materiaal in de bodem. Slechte bodem laat die koolstof vrij als CO₂. Compost helpt de bodem gezond houden en koolstof vast te houden.',
  },
  {
    type: 'info',
    titel: 'Voedselverspilling en afval',
    tekst: 'In Nederland wordt per jaar ongeveer 2,5 miljard kilo voedsel verspild. Dat is bijna 140 kilo per persoon! Het meeste van dat voedsel belandt in de verbrandingsoven of op de stortplaats. Dit is zonde, want in dat voedsel zitten waardevolle voedingsstoffen. Door GFT-afval te composteren in een wormenhotel, geef je die voedingsstoffen terug aan de bodem in plaats van ze te verspillen.',
    feit: 'Als voedselverspilling een land was, zou het na de VS en China de meeste CO₂ uitstoten ter wereld.',
  },
  {
    type: 'vraag',
    vraag: 'Waarom is composteren van GFT-afval beter dan het verbranden ervan?',
    antwoorden: [
      'Bij composteren gaan de voedingsstoffen terug in de bodem; bij verbranden gaan ze verloren als CO₂',
      'Verbranden is eigenlijk beter, want het levert energie op',
      'Ze zijn even goed voor het milieu',
      'Composteren stoot meer CO₂ uit dan verbranden',
    ],
    correct: 0,
    uitleg: 'Bij verbranding gaan alle voedingsstoffen verloren en komt CO₂ vrij. Bij composteren worden voedingsstoffen teruggegeven aan de bodem en blijft koolstof opgeslagen.',
  },
  {
    type: 'vraag',
    vraag: 'Welke schakel ontbreekt in deze circulaire kringloop: GFT-afval → wormen → ??? → planten',
    antwoorden: [
      'Compost',
      'Kunstmest',
      'Water',
      'Zuurstof',
    ],
    correct: 0,
    uitleg: 'Wormen zetten GFT-afval om in compost. Die compost is voedsel voor planten. Zo is de kringloop gesloten: plant → GFT → wormen → compost → plant.',
  },
]

const WH_HAVO_GEM = [
  {
    type: 'info',
    titel: 'Koolstof, humus en bodemgezondheid',
    tekst: 'Wanneer organisch materiaal wordt afgebroken maar niet volledig verdwijnt, vormt het humus — een donkere, stabiele stof die koolstof voor lange tijd in de bodem vasthoudt. Humus is de motor van vruchtbare bodem: het verbetert de structuur, houdt water vast, voorziet planten van voedingsstoffen en biedt een leefomgeving voor micro-organismen. Door compost toe te voegen aan de bodem, bouw je het humusgehalte op. Intensieve landbouw met kunstmest doet het tegenovergestelde: het verlaagt het humusgehalte.',
    feit: 'Het opbouwen van 1 centimeter humusrijke topbodem duurt in de natuur 200-1000 jaar. Intensieve landbouw kan die laag in 20 jaar vernietigen.',
  },
  {
    type: 'vraag',
    vraag: 'Wat is humus en waarom is het belangrijk?',
    antwoorden: [
      'Humus is stabiel organisch materiaal dat koolstof opslaat, bodemstructuur verbetert en voedingsstoffen levert',
      'Humus is een soort kunstmest die je in de winkel kunt kopen',
      'Humus is een schimmelziekte die planten beschadigt',
      'Humus is een laag zand die wortels beschermt',
    ],
    correct: 0,
    uitleg: 'Humus is de rijke, donkere stof in bodem die koolstof langdurig opslaat. Het is de kern van bodemvruchtbaarheid en ontstaat uit gedeeltelijk afgebroken organisch materiaal.',
  },
  {
    type: 'info',
    titel: 'Cradle to Cradle: een nieuw ontwerpconcept',
    tekst: 'Cradle to Cradle (van wieg tot wieg) is een ontwerpconcept waarbij producten zo worden gemaakt dat alle materialen na gebruik volledig worden hergebruikt — als voedsel voor nieuwe biologische processen (zoals compost) of als technische grondstof (zoals gerecycled metaal). Het is het tegenovergestelde van Cradle to Grave (van wieg tot graf), waarbij producten eindigen als afval op de stortplaats. Een wormenhotel past perfect in Cradle to Cradle: organisch afval wordt omgezet in compost dat nieuw leven voedt.',
    feit: 'Het concept Cradle to Cradle werd in 2002 geïntroduceerd door architect William McDonough en chemicus Michael Braungart.',
  },
  {
    type: 'vraag',
    vraag: 'Hoe past een wormenhotel in het Cradle to Cradle-concept?',
    antwoorden: [
      'Organisch afval (einde van leven) wordt compost (begin van nieuw leven) — niets eindigt als afval',
      'Een wormenhotel maakt producten duurzamer zodat ze langer meegaan',
      'Een wormenhotel recyclet plastic tot nieuwe producten',
      'Wormen filteren giftige stoffen uit de grond',
    ],
    correct: 0,
    uitleg: 'In Cradle to Cradle is er geen "afval" — alleen grondstoffen voor nieuwe cycli. Een wormenhotel zet biologisch afval om in compost: de perfecte biologische grondstof.',
  },
  {
    type: 'vraag',
    vraag: 'Waarom is het humusgehalte van de bodem een indicator voor de bodemgezondheid?',
    antwoorden: [
      'Hoog humusgehalte betekent meer koolstofopslag, betere waterhuishouding en rijkere voedingsstoffen',
      'Hoog humusgehalte maakt de grond lichter van kleur en dus beter zichtbaar',
      'Humusgehalte bepaalt de pH van de bodem',
      'Hoog humusgehalte trekt meer onkruiden aan',
    ],
    correct: 0,
    uitleg: 'Humusgehalte is een maatstaf voor de hoeveelheid opgeslagen organisch materiaal in de bodem. Meer humus betekent meer koolstofopslag, beter waterbeheer en rijkere voedingsstoffen.',
  },
]

const WH_HAVO_MOE = [
  {
    type: 'info',
    titel: 'pH van de bodem: zuur of basisch?',
    tekst: 'De pH van de bodem bepaalt welke voedingsstoffen planten kunnen opnemen. pH loopt van 0 (sterk zuur) tot 14 (sterk basisch); pH 7 is neutraal. Regenwormen gedijen het best bij een pH van 6 tot 7. Bij te lage pH (zuur) lost aluminium op in het bodemwater, wat giftig is voor wormen en plantenwortels. Bij te hoge pH worden bepaalde voedingsstoffen onoplosbaar en onbeschikbaar voor planten. Compost buffert de pH: het trekt zure én basische bodems richting neutraal.',
    feit: 'Veengrond heeft een pH van 3,5 tot 5,5 — dit is zo zuur dat veel gewone plantensoorten er niet in kunnen overleven.',
  },
  {
    type: 'vraag',
    vraag: 'Welk pH-bereik is optimaal voor regenwormen en de meeste landbouwgewassen?',
    antwoorden: [
      'pH 6 tot 7 (licht zuur tot neutraal)',
      'pH 2 tot 4 (sterk zuur)',
      'pH 10 tot 12 (sterk basisch)',
      'pH 0 tot 1 (extreem zuur)',
    ],
    correct: 0,
    uitleg: 'Regenwormen en de meeste voedselgewassen gedijen het best bij een licht zure tot neutrale pH (6–7). Extreme pH-waarden remmen opname van voedingsstoffen en zijn toxisch voor bodemleven.',
  },
  {
    type: 'info',
    titel: 'Mycorrhizanetwerken: het wood wide web',
    tekst: 'Mycorrhizaschimmels leven in symbiose met plantenwortels. Ze dringen de cellen van wortels binnen en breiden zich tegelijkertijd ver in de bodem uit via draadachtige hyfen. Via deze hyfen transporteren ze water en mineralen (met name fosfor) naar de plant, in ruil voor suikers die de plant produceert via fotosynthese. Zo zijn bomen in een bos letterlijk met elkaar verbonden via schimmelnetwerken. Wetenschappers noemen dit het "wood wide web". Compost stimuleert de groei van mycorrhiza; synthetische fosfaatmeststof onderdrukt ze (de plant heeft dan geen schimmelpartner nodig).',
    feit: 'Eén gram bosbodem kan meer dan een kilometer aan schimmelhyfen bevatten.',
  },
  {
    type: 'vraag',
    vraag: 'Waarom onderdrukt toevoeging van synthetisch fosfaat de groei van mycorrhizaschimmels?',
    antwoorden: [
      'De plant heeft geen schimmelpartner nodig als fosfaat direct beschikbaar is, waardoor de symbiose niet geactiveerd wordt',
      'Synthetisch fosfaat is giftig voor schimmels',
      'Schimmels eten het fosfaat zelf op',
      'Synthetisch fosfaat verhoogt de pH zodat schimmels sterven',
    ],
    correct: 0,
    uitleg: 'Mycorrhiza ontstaan als reactie op een fosfaattekort. Bij hoge fosfaatbeschikbaarheid investeert de plant niet in de symbiose. Dit verzwakt het bodemnetwerk op lange termijn.',
  },
  {
    type: 'info',
    titel: 'C:N-verhouding in compostering',
    tekst: 'Bij compostering is de verhouding koolstof (C) tot stikstof (N) van het invoermateriaal cruciaal. Micro-organismen hebben beide nodig: koolstof als energiebron, stikstof voor de opbouw van eiwitten. De ideale C:N-verhouding voor snelle compostering is 25:1 tot 30:1. "Bruin" materiaal (droge bladeren, karton) is koolstofrijk; "groen" materiaal (grasmaaisel, groenteresten) is stikstofrijk. Bij een te hoge C:N-ratio (te veel bruin) gaat de afbraak langzaam; bij te laag (te veel groen) ontstaat ammoniakgeur.',
    feit: 'Koffiedik heeft een C:N-verhouding van circa 20:1 — ideaal om te combineren met koolstofrijker materiaal zoals karton.',
  },
  {
    type: 'vraag',
    vraag: 'Wat gebeurt er als de C:N-verhouding in een composthoop te laag is (te veel stikstof)?',
    antwoorden: [
      'Er treedt ammoniakvorming op en er ontstaan nare geuren',
      'De compostering stopt volledig',
      'Er vormt zich schimmel die alle wormen doodt',
      'De bodem wordt te zuur',
    ],
    correct: 0,
    uitleg: 'Bij te veel stikstof ten opzichte van koolstof wordt overtollig stikstof omgezet in ammoniak (NH₃). Dit geeft een penetrante geur en is schadelijk voor wormen. Oplossing: meer bruin materiaal toevoegen.',
  },
  {
    type: 'info',
    titel: 'Bodem als koolstofopslag en klimaatbeleid',
    tekst: 'Bodems bevatten wereldwijd circa 1.500 tot 2.400 gigaton koolstof — meer dan de atmosfeer en alle planten samen. Bij verslechtering van bodemkwaliteit (door erosie, ontbossing of intensieve landbouw) wordt dit koolstof vrijgegeven als CO₂ en methaan. Het "4 promille initiatief" (Frans klimaatakkoord 2015) stelt dat een jaarlijkse toename van het bodemkoolstofgehalte met 0,4% genoeg zou zijn om de netto CO₂-uitstoot van de mensheid te compenseren. Composttoevoeging is een bewezen methode om bodemkoolstof te verhogen.',
    feit: 'Nederland verloor de afgelopen 50 jaar naar schatting 30–50% van het organische stofgehalte in landbouwbodems door intensieve teelt.',
  },
  {
    type: 'vraag',
    vraag: 'Wat houdt het "4 promille initiatief" in en waarom is het relevant voor compostering?',
    antwoorden: [
      'Een jaarlijkse stijging van 0,4% bodemkoolstof compenseert de netto menselijke CO₂-uitstoot; compost verhoogt het bodemkoolstofgehalte',
      'Als 4‰ van alle landbouwgrond biologisch wordt, is klimaatverandering opgelost',
      'Het initiatief verplicht boeren 4 promille minder kunstmest te gebruiken',
      'Het meetprogramma dat bodemkoolstof in Nederland monitort',
    ],
    correct: 0,
    uitleg: 'Het 4 promille initiatief laat zien dat kleine verbeteringen in bodemkoolstof grote klimaateffecten hebben. Compostering is één van de meest effectieve manieren om dit te bereiken.',
  },
  {
    type: 'info',
    titel: 'Functionele bodembiodiversiteit: trofische niveaus',
    tekst: 'Het bodemvoedselweb kent meerdere trofische (voedings-)niveaus. Primaire producenten (plantenresten) worden gegeten door eerste consumenten: bacteriën en schimmels. Die worden gegeten door tweede consumenten: protozoa (eencelligen) en nematoden. Verder eet je springstaarten, mijten en regenwormen. Bovenaan staan grotere roofdieren zoals loopkevers en mollen. Elk niveau heeft een regulerende functie: te veel bacteriën? Protozoa nemen toe en eten ze op. Dit zelfregulerende systeem zorgt voor stabiele bodemgezondheid — iets wat kunstmest nooit kan vervangen.',
    feit: 'Regenwormen functioneren als "ecosystem engineers": ze herstructureren de bodem en creëren habitats voor tientallen andere soorten.',
  },
  {
    type: 'vraag',
    vraag: 'Waarom is een divers bodemvoedselweb veerkrachtiger dan een arm bodemecosysteem?',
    antwoorden: [
      'Meer soorten betekent meer regulerende mechanismen; als één soort wegvalt, nemen anderen de functie over',
      'Meer soorten eten meer organisch afval, waardoor compost sneller gemaakt wordt',
      'Meer soorten produceren meer CO₂ dat planten gebruiken voor fotosynthese',
      'Biodiversiteit heeft geen directe invloed op bodemgezondheid',
    ],
    correct: 0,
    uitleg: 'Ecologische veerkracht ontstaat door functionele redundantie: meerdere soorten vervullen dezelfde rol. Valt één soort weg door ziekte of gifstof, dan zijn er anderen die de taak overnemen.',
  },
]

// ─── Keuringsdienst: lesinhoud per niveau ─────────────────────────────────────

const KD_BASIS_MAK = [
  {
    type: 'info',
    titel: 'Wat is een radijs?',
    tekst: 'Een radijs is een kleine, ronde groente die heel snel groeit. De rode bol die je ziet zitten onder de grond — dat is de wortel van de plant. Radijsjes zijn ideaal om mee te experimenteren: ze groeien in slechts 3 tot 4 weken! In ons experiment planten we radijsjes in potten om te kijken hoe ze groeien.',
    feit: 'Radijs is een van de snelst groeiende groenten ter wereld. In goede omstandigheden zie je al na een week nieuwe blaadjes!',
  },
  {
    type: 'vraag',
    vraag: 'Waarom is een radijs een goede testplant voor ons experiment?',
    antwoorden: [
      'Hij groeit snel (3-4 weken) en is makkelijk te meten',
      'Hij is de lekkerste groente',
      'Hij groeit het best in de zon',
      'Hij heeft weinig water nodig',
    ],
    correct: 0,
    uitleg: 'Radijs groeit razendsnel en is goedkoop. Dat maakt hem perfect voor een schoolexperiment: je ziet resultaten binnen een paar weken.',
  },
  {
    type: 'info',
    titel: 'Wat heeft een plant nodig om te groeien?',
    tekst: 'Elke plant heeft een paar dingen nodig om te groeien: water om te drinken, zonlicht om energie te maken, lucht (CO₂) voor fotosynthese en voedingsstoffen uit de bodem. Die voedingsstoffen halen planten via hun wortels uit de grond. Als de bodem weinig voedingsstoffen heeft, groeit de plant langzamer. Als de bodem rijk is, groeit de plant snel en wordt hij groot.',
    feit: 'Via fotosynthese maakt een plant zijn eigen eten van zonlicht, water en lucht. Het is de enige fabriek ter wereld die niets anders nodig heeft dan natuur!',
  },
  {
    type: 'vraag',
    vraag: 'Hoe haalt een plant voedingsstoffen op?',
    antwoorden: [
      'Via de wortels uit de bodem',
      'Via de bladeren uit de lucht',
      'Via de stengel uit het water',
      'Via de bloemen van de zon',
    ],
    correct: 0,
    uitleg: 'Plantenwortels nemen water en voedingsstoffen op uit de grond. Daarom is de kwaliteit van de bodem zo belangrijk voor hoe goed een plant groeit.',
  },
  {
    type: 'info',
    titel: 'Wat is kunstmest?',
    tekst: 'Kunstmest is gemaakt in een fabriek. Het bevat voedingsstoffen die planten nodig hebben, zoals stikstof, fosfor en kalium. Boeren strooien kunstmest over hun veld om gewassen sneller te laten groeien. Kunstmest werkt snel. Maar het helpt de bodem zelf niet gezonder te worden — het geeft alleen korte termijn voedingsstoffen.',
    feit: 'Kunstmest wordt gemaakt van aardgas en stenen uit de mijn. De productie ervan verbruikt enorm veel energie.',
  },
  {
    type: 'vraag',
    vraag: 'Wat is kunstmest?',
    antwoorden: [
      'Een in de fabriek gemaakt product met voedingsstoffen voor planten',
      'Aarde die je zelf maakt van groenteresten',
      'Een soort insectenverdelger',
      'Gewone grond in een zakje',
    ],
    correct: 0,
    uitleg: 'Kunstmest is een fabrieksproduct dat voedingsstoffen bevat. Het werkt snel, maar helpt de bodem niet echt beter te worden op de lange termijn.',
  },
  {
    type: 'info',
    titel: 'Wat is compostthee?',
    tekst: 'Compostthee is heel simpel: je doet compost in een emmer water, laat het even staan, en dan heb je compostthee. De voedingsstoffen en kleine beestjes (bacteriën) uit de compost lossen op in het water. Die bruine vloeistof giet je dan over je planten. Het is als een gezonde smoothie voor de bodem!',
    feit: 'Compostthee wordt al eeuwenlang gebruikt door tuiniers, lang voordat kunstmest werd uitgevonden.',
  },
  {
    type: 'vraag',
    vraag: 'Hoe maak je compostthee?',
    antwoorden: [
      'Door compost in water te laten weken zodat voedingsstoffen oplossen',
      'Door thee te zetten met composteerblaadjes',
      'Door kunstmest op te lossen in warm water',
      'Door gewone thee te mengen met aarde',
    ],
    correct: 0,
    uitleg: 'Compostthee maak je door compost in water te weken. De voedingsstoffen en bacteriën lossen op in het water en kun je dan als vloeibaar plantenvoedsel gebruiken.',
  },
  {
    type: 'info',
    titel: 'Ons experiment: drie potten',
    tekst: 'In ons experiment gebruiken we drie potten met dezelfde plant (radijs). Pot 1 krijgt geen extra voeding — dit is de controlepot. Pot 2 krijgt kunstmest. Pot 3 krijgt compostthee. Alles wat we verder doen (hoeveel water, hoeveel licht, welke grond) houden we precies gelijk voor alle drie de potten. Zo kunnen we eerlijk vergelijken wat het verschil is.',
    feit: 'Radijs is de ideale testplant: hij groeit snel (2-4 weken), is goedkoop en makkelijk te meten.',
  },
  {
    type: 'vraag',
    vraag: 'Waarom zijn er drie potten in ons experiment?',
    antwoorden: [
      'Eén controlepot (niets), één met kunstmest en één met compostthee — om eerlijk te vergelijken',
      'Drie potten geven meer kans dat er één goed groeit',
      'Drie potten zijn makkelijker te verzorgen dan één grote pot',
      'Elke leerling in de groep krijgt een eigen pot',
    ],
    correct: 0,
    uitleg: 'De drie potten vertegenwoordigen drie verschillende omstandigheden. Zo kun je het effect van kunstmest en compostthee vergelijken met "niets doen".',
  },
  {
    type: 'info',
    titel: 'Hoe meet je hoe goed een plant groeit?',
    tekst: 'Om bij te houden hoe goed je plant groeit, kun je elke week meten: hoe hoog is de stengel? (met een liniaal in centimeters) Hoeveel blaadjes heeft de plant? Hoe groot wordt de radijsbol? Je schrijft alles op met de datum erbij. Na een paar weken heb je een overzicht van hoe elke pot gegroeid is. Dan kun je vergelijken welke plant het beste groeide!',
    feit: 'Wetenschappers noemen dit "data verzamelen". Goede data zijn de basis van elk wetenschappelijk onderzoek.',
  },
  {
    type: 'vraag',
    vraag: 'Hoe houd je de groei van je plant het beste bij?',
    antwoorden: [
      'Elke week de hoogte meten en opschrijven met datum',
      'Eén keer aan het einde meten',
      'Alleen foto\'s maken',
      'Schatten hoe groot de plant is',
    ],
    correct: 0,
    uitleg: 'Door elke week te meten en op te schrijven met de datum, kun je zien hoe de plant week voor week groeit en vergelijken met de andere potten.',
  },
]

const KD_BASIS_GEM = [
  {
    type: 'info',
    titel: 'Wat heeft een plant nodig om te groeien?',
    tekst: 'Een plant heeft zes dingen nodig om goed te groeien: water, licht, lucht (CO₂), warmte, en voedingsstoffen uit de bodem. De voedingsstoffen halen planten uit de grond via hun wortels. De drie belangrijkste voedingsstoffen zijn stikstof (voor bladeren), fosfor (voor wortels) en kalium (voor vruchten en bloemen). Als de bodem arm is aan voedingsstoffen, groeit een plant slecht.',
    feit: 'Een plant maakt zijn eigen voedsel via fotosynthese: met behulp van zonlicht zet hij CO₂ en water om in suikers.',
  },
  {
    type: 'vraag',
    vraag: 'Hoe halen planten voedingsstoffen op?',
    antwoorden: [
      'Via de wortels uit de bodem',
      'Via de bladeren uit de lucht',
      'Via de stengel uit het water',
      'Via de bloemen van de zon',
    ],
    correct: 0,
    uitleg: 'Planten nemen water en voedingsstoffen op via hun wortels. Daarom is de kwaliteit van de bodem zo belangrijk voor plantengroei.',
  },
  {
    type: 'info',
    titel: 'Wat is bodem en waarom is het zo belangrijk?',
    tekst: 'Bodem is de dunne laag aarde op het aardoppervlak waar planten in groeien. Het is een mengsel van zandkorrels, klei, water, lucht en organisch materiaal — resten van dode planten en dieren. Maar bodem is ook levend: er wonen bacteriën, schimmels, wormen en andere kleine beestjes. Samen zorgen ze ervoor dat dood organisch materiaal wordt afgebroken tot voedingsstoffen. Zonder gezonde bodem geen voedsel, want bijna al ons eten wordt verbouwd in de grond.',
    feit: '95% van ons voedsel komt direct of indirect uit de bodem.',
  },
  {
    type: 'vraag',
    vraag: 'Waarom is gezonde bodem zo belangrijk voor voedselproductie?',
    antwoorden: [
      'Bijna al ons voedsel wordt verbouwd in de bodem, die voedingsstoffen en een geschikte groeiomgeving levert',
      'Gezonde bodem maakt regenwater schoon',
      'Gezonde bodem houdt onkruid tegen',
      'Gezonde bodem maakt pesticiden overbodig',
    ],
    correct: 0,
    uitleg: '95% van ons voedsel komt direct of indirect uit de bodem. Goede bodem levert de voedingsstoffen die planten nodig hebben om te groeien.',
  },
  {
    type: 'info',
    titel: 'Wat is kunstmest?',
    tekst: 'Kunstmest is een in de fabriek gemaakt product dat voedingsstoffen bevat die planten nodig hebben, vooral stikstof, fosfor en kalium. Boeren strooien kunstmest over hun akkers zodat planten snel kunnen groeien. Kunstmest werkt snel en is goedkoop. Maar er zijn ook nadelen: het verbetert de bodem niet op de lange termijn, het kan in het grondwater terechtkomen en het bodemleven (wormen, bacteriën) stimuleert het niet.',
    feit: 'Kunstmest wordt gemaakt van aardgas en mineralen uit de mijn. De productie ervan kost veel energie.',
  },
  {
    type: 'vraag',
    vraag: 'Wat is kunstmest?',
    antwoorden: [
      'Een in de fabriek gemaakt product met voedingsstoffen (stikstof, fosfor, kalium) voor planten',
      'Compost dat in een fabriek wordt gemaakt',
      'Een soort pesticiden die onkruid doodt',
      'Grond die speciaal voor potplanten is gemengd',
    ],
    correct: 0,
    uitleg: 'Kunstmest is een industrieel product dat voedingsstoffen bevat. Het werkt snel, maar verbetert het bodemleven niet en kan het grondwater vervuilen.',
  },
  {
    type: 'info',
    titel: 'Wat is compost?',
    tekst: 'Compost is de naam voor organisch afval dat volledig is afgebroken door kleine beestjes, bacteriën en schimmels. Het resultaat is een donkere, kruimelige stof die lijkt op aarde. Compost zit vol met voedingsstoffen en met micro-organismen (kleine levende wezens). Compost verbetert de bodem op meerdere manieren: het voegt voedingsstoffen toe, het verbetert de structuur van de grond en het stimuleert het bodemleven.',
    feit: 'Compost ruikt fris, zoals bosgrond na een regenbui. Het is het resultaat van een prachtig natuurlijk proces.',
  },
  {
    type: 'vraag',
    vraag: 'Wat is compost?',
    antwoorden: [
      'Volledig afgebroken organisch afval, rijk aan voedingsstoffen en micro-organismen',
      'Een soort kunstmest van dierlijke oorsprong',
      'Aarde die je in de winkel kunt kopen voor potplanten',
      'Een mengsel van zand en klei',
    ],
    correct: 0,
    uitleg: 'Compost is het eindproduct van het afbraakproces van organisch materiaal. Het is rijk aan voedingsstoffen en micro-organismen, en verbetert de bodem op meerdere manieren.',
  },
  {
    type: 'info',
    titel: 'Wat is compostthee?',
    tekst: 'Compostthee is vloeibaar gemaakte compost. Je laat compost een tijdje weken in water. De voedingsstoffen en micro-organismen lossen op in het water. Dat bruine water is de compostthee. Je kunt het gebruiken om planten te begieten, net zoals je vloeibare plantenvoeding uit de winkel kunt kopen — maar dan volledig natuurlijk. Compostthee geeft de voordelen van compost direct aan de bodem en de plantenwortels.',
    feit: 'Compostthee wordt al eeuwenlang gebruikt in de landbouw, lang voordat kunstmest werd uitgevonden.',
  },
  {
    type: 'vraag',
    vraag: 'Hoe maak je compostthee?',
    antwoorden: [
      'Door compost in water te laten weken, zodat voedingsstoffen en micro-organismen in het water oplossen',
      'Door thee te trekken van composteerblaadjes',
      'Door kunstmest op te lossen in heet water',
      'Door regenwater te mengen met aarde',
    ],
    correct: 0,
    uitleg: 'Compostthee maak je door compost in water te weken. De voedingsstoffen en micro-organismen uit de compost lossen op in het water, wat je dan als vloeibaar plantenvoedsel kunt gebruiken.',
  },
  {
    type: 'info',
    titel: 'Een experiment: drie potten vergelijken',
    tekst: 'In jullie project vergelijken jullie drie potten met dezelfde plant (radijs). De eerste pot krijgt geen extra voeding — dit is de controlepot. De tweede pot krijgt kunstmest. De derde pot krijgt compostthee. Alle andere omstandigheden (licht, water, grond, temperatuur) blijven gelijk. Door alles gelijk te houden behalve de bodemtoevoeging, kun je eerlijk vergelijken welk effect de toevoegingen hebben op de groei van de plant.',
    feit: 'Radijs is de ideale testplant: hij groeit snel (2-4 weken), is goedkoop en makkelijk te meten.',
  },
  {
    type: 'vraag',
    vraag: 'Waarom zijn er drie potten in het experiment?',
    antwoorden: [
      'Eén controlepot (niets), één met kunstmest en één met compostthee — om eerlijk te vergelijken',
      'Drie potten geven meer zekerheid dat er altijd één zal groeien',
      'Drie potten zijn makkelijker te verzorgen dan één grote pot',
      'Elke leerling in de groep moet een eigen pot hebben',
    ],
    correct: 0,
    uitleg: 'De drie potten vertegenwoordigen de drie condities: geen toevoeging (controle), kunstmest en compostthee. Zo kun je de effecten direct vergelijken.',
  },
  {
    type: 'info',
    titel: 'Wat kun je meten aan een plant?',
    tekst: 'Om te zien of een plant goed groeit, kun je verschillende dingen meten en observeren. De meest gebruikte metingen zijn: de hoogte van de stengel (in centimeters), het aantal en de kleur van de bladeren, de grootte en kleur van de radijs zelf, en de ontwikkeling van de wortels. Je kunt ook letten op stevigheid van de stengel en de algehele gezondheid van de plant. Door dit elke week te meten en op te schrijven, kun je de groei bijhouden.',
    feit: 'Wetenschappers gebruiken ook chlorofylmeting om te bepalen hoe groen en gezond bladeren zijn. Donkergroen = meer chlorofyl = betere fotosynthese.',
  },
  {
    type: 'vraag',
    vraag: 'Welke meting geeft je het meeste inzicht in de groei van een plant over tijd?',
    antwoorden: [
      'De hoogte van de stengel wekelijks meten en noteren',
      'Één keer aan het einde de plant wegen',
      'Tellen hoeveel water je hebt gegeven',
      'De kleur van de pot beoordelen',
    ],
    correct: 0,
    uitleg: 'Door de hoogte wekelijks te meten krijg je een groeicurve die laat zien hoe snel de plant groeit en of er verschillen zijn tussen de drie potten.',
  },
  {
    type: 'vraag',
    vraag: 'Wat is het doel van de controlepot (zonder toevoeging)?',
    antwoorden: [
      'Een referentiepunt bieden om te vergelijken wat kunstmest en compostthee doen',
      'Laten zien dat planten zonder voeding altijd doodgaan',
      'De goedkoopste optie zijn',
      'Het mooiste resultaat opleveren',
    ],
    correct: 0,
    uitleg: 'De controlepot laat zien wat er normaal gebeurt zonder toevoeging. Zo kun je het effect van kunstmest en compostthee meten ten opzichte van de uitgangsituatie.',
  },
]

const KD_MIDDEN_GEM = [
  {
    type: 'info',
    titel: 'Hoe nemen plantenwortels voedingsstoffen op?',
    tekst: 'Plantenwortels zijn bedekt met heel kleine uitsteeksels: wortelharen. Die zijn zo klein dat ze tussen de bodemdeeltjes kunnen doordringen. Via de wortelharen nemen planten water op, samen met daarin opgeloste voedingsstoffen zoals nitraat, fosfaat en kalium. De voedingsstoffen moeten wel opgelost zijn in water — vaste deeltjes kunnen planten niet opnemen. Daarom is het zo handig dat compostthee al vloeibaar is: de voedingsstoffen zijn direct beschikbaar.',
    feit: 'De totale lengte van alle wortels en wortelharen van één tarweplant is meer dan 500 kilometer!',
  },
  {
    type: 'vraag',
    vraag: 'Waarom moeten voedingsstoffen zijn opgelost in water voordat planten ze kunnen opnemen?',
    antwoorden: [
      'Wortels nemen alleen vloeibare stoffen op via osmose — vaste deeltjes passen niet door de celwanden',
      'Water maakt de voedingsstoffen zoeter',
      'Vaste voedingsstoffen zijn giftig voor planten',
      'Planten nemen water op via de bladeren, niet de wortels',
    ],
    correct: 0,
    uitleg: 'Wortels nemen water op via osmose. Opgeloste stoffen kunnen meereizen met het water. Vaste deeltjes zijn te groot om door de celwanden te gaan.',
  },
  {
    type: 'info',
    titel: 'Goede observaties doen',
    tekst: 'Bij wetenschappelijk onderzoek is nauwkeurig observeren essentieel. Een goede observatie is specifiek (niet "de plant ziet er goed uit", maar "de plant is 12,3 cm hoog"), meetbaar (gebruik altijd een liniaal of weegschaal), herhaalbaar (meet altijd op dezelfde manier) en gedocumenteerd (schrijf alles op met datum). Een foto is ook een goede observatie — het legt de situatie precies vast. Subjectieve meningen zijn geen wetenschappelijke observaties.',
    feit: 'Galileo Galilei maakte in de 17e eeuw al nauwkeurige metingen en tekeningen van zijn observaties. Zijn methode ligt aan de basis van de moderne wetenschap.',
  },
  {
    type: 'vraag',
    vraag: 'Welke observatie is het meest wetenschappelijk?',
    antwoorden: [
      '"De plant in pot B is 8,4 cm hoog en heeft 4 bladeren met een donkergroene kleur" (gemeten op 14-4)',
      '"De plant in pot B groeit heel goed en ziet er gezond uit"',
      '"Pot B lijkt beter te groeien dan pot A"',
      '"De plant heeft water gekregen en groeit"',
    ],
    correct: 0,
    uitleg: 'Een wetenschappelijke observatie is specifiek, meetbaar en gedocumenteerd met datum. Vage beschrijvingen ("groeit heel goed") zijn niet herhaalbaar of vergelijkbaar.',
  },
  {
    type: 'info',
    titel: 'Van data naar conclusie',
    tekst: 'Na weken meten heb je een hoop data verzameld. Hoe trek je daar een conclusie uit? Eerst vergelijk je je metingen: welke pot groeide het snelst? Welke plant zag er het gezondst uit? Dan kijk je of dit overeenkomt met je hypothese. Daarna vraag je je af: waarom zou dit zo zijn? Zoek een verklaring in wat je weet over voedingsstoffen en bodemleven. Een goede conclusie beschrijft zowel wat je gevonden hebt als waarom je denkt dat dit zo is.',
    feit: 'In de wetenschap is een "negatief resultaat" (experiment pakt anders uit dan verwacht) net zo waardevol als een positief resultaat.',
  },
  {
    type: 'vraag',
    vraag: 'Wat doe je als je conclusie niet overeenkomt met je hypothese?',
    antwoorden: [
      'Je past je hypothese aan — een "fout" resultaat is ook een waardevol wetenschappelijk resultaat',
      'Je gooit de data weg en herhaalt het experiment totdat je hypothese klopt',
      'Je past de data aan zodat ze wel overeenkomen',
      'Je stopt met het experiment en begint opnieuw met een andere vraag',
    ],
    correct: 0,
    uitleg: 'In de wetenschap zijn onverwachte resultaten waardevol. Ze tonen aan dat je hypothese bijgesteld moet worden, wat leidt tot beter begrip van het onderwerp.',
  },
  {
    type: 'vraag',
    vraag: 'Stel: plant met compostthee groeit langzamer maar heeft donkerdere bladeren dan plant met kunstmest. Wat zegt dit?',
    antwoorden: [
      'Compostthee stimuleert bladontwikkeling anders dan kunstmest — het effect verschilt per groeifactor',
      'Compostthee werkt helemaal niet',
      'Kunstmest is altijd beter dan compostthee',
      'De planten zijn te oud om nog te groeien',
    ],
    correct: 0,
    uitleg: 'Donkerder bladeren wijzen op meer chlorofyl en daarmee betere fotosynthese. Compostthee kan andere effecten hebben dan kunstmest. Er is zelden één simpel antwoord.',
  },
]

const KD_HAVO_GEM = [
  {
    type: 'info',
    titel: 'Statistische analyse van experimentdata',
    tekst: 'Wetenschappers analyseren data met statistieken. Het gemiddelde (mean) geeft de centrale waarde van metingen. De standaarddeviatie geeft aan hoeveel de metingen van het gemiddelde afwijken — hoe kleiner, hoe consistenter. Een grafiek (lijndiagram of staafdiagram) maakt trends zichtbaar. Bij jullie experiment kun je het gemiddelde van de plantengroei per week berekenen. Als één pot gemiddeld 2 cm per week groeit en een andere 1 cm, suggereert dat een effect — maar je moet ook kijken of de variatie groot is.',
    feit: 'In wetenschappelijk onderzoek worden experimenten vaak 3 tot 10 keer herhaald om betrouwbare statistieken te kunnen berekenen.',
  },
  {
    type: 'vraag',
    vraag: 'Waarom is het nuttig om meerdere radijsplanten per conditie te gebruiken in plaats van één?',
    antwoorden: [
      'Meer planten per conditie levert betrouwbaardere data, want individuele planten kunnen om andere redenen variëren',
      'Meer planten betekent altijd een beter resultaat',
      'Meer planten zijn makkelijker te meten',
      'Het maakt niet uit hoeveel planten je gebruikt',
    ],
    correct: 0,
    uitleg: 'Één plant kan om toevallige redenen slechter of beter groeien. Met meerdere planten per conditie middel je deze toevallige variatie uit en zijn de resultaten betrouwbaarder.',
  },
  {
    type: 'info',
    titel: 'Compostthee: werking en werkzame stoffen',
    tekst: 'Compostthee bevat opgeloste organische verbindingen (humusachtige stoffen), opgeloste minerale voedingsstoffen (stikstof, fosfor, kalium) en levende micro-organismen (bacteriën, schimmels, protisten). De micro-organismen zijn mogelijk de meest waardevolle component: ze kunnen zich in de bodem vermenigvuldigen, organisch materiaal blijven afbreken en ziekten onderdrukken. De effectiviteit van compostthee hangt af van de kwaliteit van de compost en de manier van bereiden.',
    feit: 'Geaëreerde compostthee (waarbij lucht doorheen wordt gepompt) is rijker aan nuttige aerobe bacteriën dan gewone compostthee.',
  },
  {
    type: 'vraag',
    vraag: 'Welke component van compostthee is mogelijk het meest waardevol voor de bodem op lange termijn?',
    antwoorden: [
      'De levende micro-organismen, die zich kunnen vermenigvuldigen en blijven bijdragen aan het bodemecosysteem',
      'De opgeloste minerale voedingsstoffen, want die zijn direct beschikbaar voor planten',
      'Het water zelf, want water is de basis van alle leven',
      'De kleur van de thee, want donkerder is rijker',
    ],
    correct: 0,
    uitleg: 'Voedingsstoffen worden snel opgenomen en zijn dan weg. Micro-organismen kunnen zich vermenigvuldigen en blijven langdurig bijdragen aan de bodemgezondheid.',
  },
  {
    type: 'vraag',
    vraag: 'Stel dat jouw experiment aantoont dat kunstmest op korte termijn betere plantengroei geeft. Welke aanvullende vraag zou je als wetenschapper stellen?',
    antwoorden: [
      'Wat is het effect op de bodemkwaliteit en plantengroei na meerdere seizoenen van gebruik?',
      'Hoe kan ik kunstmest goedkoper maken?',
      'Welke kleur pot geeft het beste resultaat?',
      'Is radijs de juiste plant voor dit experiment?',
    ],
    correct: 0,
    uitleg: 'Korte-termijnresultaten zijn niet altijd representatief voor de lange termijn. Een wetenschapper zou de bodemkwaliteit over meerdere seizoenen willen meten om duurzame effecten te kunnen beoordelen.',
  },
]

const KD_HAVO_MOE = [
  {
    type: 'info',
    titel: 'Statistisch toetsen: is een verschil significant?',
    tekst: 'Als jouw compostthee-plant 2 cm hoger is dan de kunstmest-plant, is dat dan een echt verschil of gewoon toeval? Statistici gebruiken een p-waarde om dit te bepalen. Een p-waarde kleiner dan 0,05 (5%) betekent: er is minder dan 5% kans dat het verschil op toeval berust — we noemen dit statistisch significant. Met slechts 3 planten per conditie is het moeilijk significantie te bereiken. Professioneel onderzoek naar compostthee heeft vaak n=30 of meer planten per conditie.',
    feit: 'De grens van p < 0,05 is een afspraak in de wetenschap, geen absolute waarheid. In medisch onderzoek wordt soms p < 0,01 vereist.',
  },
  {
    type: 'vraag',
    vraag: 'Wat betekent een p-waarde van 0,03 in de context van jullie experiment?',
    antwoorden: [
      'Er is slechts 3% kans dat het gevonden groeiverschil op toeval berust — het verschil is statistisch significant',
      'De plant is 3% groter dan verwacht',
      'De compostthee bevat 3% meer voedingsstoffen dan kunstmest',
      'Het experiment slaagde voor 97%',
    ],
    correct: 0,
    uitleg: 'Een p-waarde geeft de kans aan dat het gemeten verschil op toeval berust. p=0,03 betekent 3% kans op toeval, dus het resultaat is statistisch significant (p < 0,05).',
  },
  {
    type: 'info',
    titel: 'Plant Growth Promoting Rhizobacteria (PGPR)',
    tekst: 'Bepaalde bacteriën in de bodemzone rond plantenwortels (de rhizosfeer) stimuleren de plantengroei actief. Deze PGPR-bacteriën produceren groeihormonen (auxinen) die wortelvertakking bevorderen, lossen onoplosbaar fosfaat op zodat planten het kunnen opnemen, beschermen planten tegen ziekteveroorzakers en fixeren stikstof. Compostthee bevat een mix van zulke bacteriën. Dit verklaart waarom compostthee-effecten in de praktijk soms verder gaan dan alleen de voedingsstoffen zouden verklaren.',
    feit: 'Het gewicht van alle bacteriën in de rhizosfeer van één maïsplant kan oplopen tot 10 gram — vergelijkbaar met een klein marmertje.',
  },
  {
    type: 'vraag',
    vraag: 'Op welke manier kunnen PGPR-bacteriën de plantengroei stimuleren, anders dan door voedingsstoffen te leveren?',
    antwoorden: [
      'Door groeihormonen (auxinen) te produceren die wortelvertakking bevorderen',
      'Door de bladeren groener te maken via chlorofylproductie',
      'Door de plant meer CO₂ te geven voor fotosynthese',
      'Door insecten weg te jagen die de plant beschadigen',
    ],
    correct: 0,
    uitleg: 'PGPR-bacteriën produceren groeihormonen zoals auxinen die wortelvorming stimuleren. Meer wortels = betere wateropname = betere groei. Dit is een indirect groeimechanisme dat los staat van voedingsstoffen.',
  },
  {
    type: 'info',
    titel: 'Nitrificatie en denitrificatie: de stikstofcyclus in de pot',
    tekst: 'In de potgrond van jullie experiment vinden dezelfde processen plaats als in een akker. Nitrificatie: ammonium (NH₄⁺, uit compost of kunstmest) wordt door Nitrosomonas-bacteriën omgezet in nitriet (NO₂⁻), vervolgens door Nitrobacter in nitraat (NO₃⁻) dat planten opnemen. Denitrificatie: bij zuurstoftekort (waterverzadigde grond) zetten andere bacteriën nitraat om in stikstofgas (N₂) dat verdampt — verloren voor de plant. Compostthee verbetert de bodemstructuur, waardoor waterhuishouding beter is en denitrificatie vermindert.',
    feit: 'Nitrificatiebacteriën zijn zo actief dat ze de pH van de bodem kunnen verlagen — ze produceren namelijk H⁺-ionen als bijproduct.',
  },
  {
    type: 'vraag',
    vraag: 'Wanneer treedt denitrificatie op en wat is het gevolg voor plantengroei?',
    antwoorden: [
      'Bij zuurstoftekort in de bodem: nitraat wordt omgezet in N₂-gas en is dan niet meer beschikbaar voor planten',
      'Bij te veel zonlicht: nitraat verdampt uit de bladeren',
      'Bij te hoge temperatuur: nitraat valt uiteen in zijn elementen',
      'Bij te weinig water: nitraat kristalliseert en wordt onoplosbaar',
    ],
    correct: 0,
    uitleg: 'Denitrificatie treedt op in zuurstofarme (natte) bodems. Bacteriën gebruiken nitraat als alternatieve zuurstofbron en produceren N₂-gas dat verdampt. Dit is een belangrijke vorm van stikstofverlies in waterrijke gronden.',
  },
  {
    type: 'info',
    titel: 'Duurzame voedselsystemen en de rol van compostthee',
    tekst: 'Het huidige mondiale voedselsysteem is sterk afhankelijk van kunstmest (gefabriceerd met aardgas) en pesticiden. Dit systeem voorziet de wereld van voedsel, maar kent grote ecologische kosten: bodemdegradatie, watervervuiling, biodiversiteitsverlies en CO₂-uitstoot. Alternatieven zoals compostthee passen in een transitie naar een meer circulair en regeneratief voedselsysteem. Compostthee is geen wondermiddel, maar illustreert het principe: gebruik lokale biologische bronnen, sluit kringlopen, herstel bodemleven.',
    feit: 'De productie van kunstmest via het Haber-Boschproces verbruikt circa 1-2% van alle energie die de mensheid jaarlijks gebruikt.',
  },
  {
    type: 'vraag',
    vraag: 'Waarom is het Haber-Boschproces (kunstmestproductie) een ecologisch probleem?',
    antwoorden: [
      'Het verbruikt enorm veel energie (aardgas) en draagt zo bij aan CO₂-uitstoot en klimaatverandering',
      'Het produceert giftige bijproducten die in de bodem achterblijven',
      'Het vereist zeldzame mineralen die opraken',
      'Het proces doodt direct bodemleven door hitte',
    ],
    correct: 0,
    uitleg: 'Het Haber-Boschproces converteert N₂ uit de lucht naar ammoniak onder hoge druk en temperatuur, aangedreven door aardgas. De enorme energiebehoefte maakt het een grote bijdrage aan de CO₂-uitstoot van de landbouwsector.',
  },
  {
    type: 'info',
    titel: 'Peer review en wetenschappelijke betrouwbaarheid',
    tekst: 'Voordat wetenschappelijk onderzoek wordt gepubliceerd, wordt het beoordeeld door andere experts in hetzelfde vakgebied — dit heet peer review (collegiale toetsing). Reviewers controleren of de methoden correct zijn, of de conclusies worden ondersteund door de data en of er alternatieve verklaringen mogelijk zijn. Onderzoek naar compostthee heeft wisselende resultaten laten zien. Sommige studies tonen positieve effecten, andere niet. Dit is normaal: effecten hangen af van compostkwaliteit, plant, bodem en klimaat.',
    feit: 'Wetenschappelijke consensus ontstaat pas als meerdere onafhankelijke studies consistent dezelfde resultaten laten zien.',
  },
  {
    type: 'vraag',
    vraag: 'Waarom laten studies naar compostthee wisselende resultaten zien?',
    antwoorden: [
      'Effecten hangen sterk af van compostkwaliteit, bodemtype, gewas en klimaat — er zijn te veel variabelen',
      'Compostthee werkt soms wel en soms niet, afhankelijk van de weersomstandigheden',
      'Wetenschappers zijn het oneens over hoe compostthee gemaakt moet worden',
      'Compostthee is zo nieuw dat er nog geen betrouwbare studies zijn',
    ],
    correct: 0,
    uitleg: 'Wisselende resultaten in onderzoek zijn normaal wanneer er veel variabelen in het spel zijn. Goede wetenschap probeert deze variabelen te controleren, maar in veldsituaties is dat moeilijk. Daarom is herhaalbaarheid zo belangrijk.',
  },
]

// ─── Hoofdexport ──────────────────────────────────────────────────────────────

export const lesinhoud = {
  wormenhotel: {
    titel: 'Het Wormenhotel',
    emoji: '🪱',
    ondertitel: 'Alles over bodem, afval en de kringloop van de natuur',
    niveaus: {
      basis: {
        makkelijk: { label: 'Makkelijk', lessen: WH_BASIS_MAK },
        gemiddeld: { label: 'Gemiddeld', lessen: WH_BASIS_GEM },
        moeilijk:  { label: 'Moeilijk',  lessen: WH_GEDEELD_1 },
      },
      midden: {
        makkelijk: { label: 'Makkelijk', lessen: WH_GEDEELD_1 },
        gemiddeld: { label: 'Gemiddeld', lessen: WH_MIDDEN_GEM },
        moeilijk:  { label: 'Moeilijk',  lessen: WH_GEDEELD_2 },
      },
      havo: {
        makkelijk: { label: 'Makkelijk', lessen: WH_GEDEELD_2 },
        gemiddeld: { label: 'Gemiddeld', lessen: WH_HAVO_GEM },
        moeilijk:  { label: 'Moeilijk',  lessen: WH_HAVO_MOE },
      },
    },
  },

  keuringsdienst: {
    titel: 'Keuringsdienst van Waarde',
    emoji: '🪴',
    ondertitel: 'Wat doet compostthee met bodem en plantengroei?',
    niveaus: {
      basis: {
        makkelijk: { label: 'Makkelijk', lessen: KD_BASIS_MAK },
        gemiddeld: { label: 'Gemiddeld', lessen: KD_BASIS_GEM },
        moeilijk:  { label: 'Moeilijk',  lessen: KD_GEDEELD_1 },
      },
      midden: {
        makkelijk: { label: 'Makkelijk', lessen: KD_GEDEELD_1 },
        gemiddeld: { label: 'Gemiddeld', lessen: KD_MIDDEN_GEM },
        moeilijk:  { label: 'Moeilijk',  lessen: KD_GEDEELD_2 },
      },
      havo: {
        makkelijk: { label: 'Makkelijk', lessen: KD_GEDEELD_2 },
        gemiddeld: { label: 'Gemiddeld', lessen: KD_HAVO_GEM },
        moeilijk:  { label: 'Moeilijk',  lessen: KD_HAVO_MOE },
      },
    },
  },
}
