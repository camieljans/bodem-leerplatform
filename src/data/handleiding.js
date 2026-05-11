// ─── Docenthandleiding per project ────────────────────────────────────────────
// Week-voor-week planning voor begeleiders, met didactische tips en differentiatie

export const handleiding = {

  // ════════════════════════════════════════════════════════════════════════════
  wormenhotel: {
    titel: 'Docenthandleiding — Het Wormenhotel',
    inleiding: 'Deze handleiding begeleidt je week voor week door het project "Het Wormenhotel". Het project duurt 6 weken en combineert wetenschap, duurzaamheid en praktisch handelen. Leerlingen bouwen en onderhouden een echt wormenhotel en leren zo over kringlopen en circulariteit.',
    beoordelingsfilosofie: 'Het project hanteert formatieve beoordeling: geen nadruk op cijfers, maar op groei, inzet en reflectie. Beoordelingscriteria zijn: inzet & samenwerking, onderzoek & inzicht, zorg voor het wormenhotel, en kwaliteit van de reflectie.',

    beoordelingscriteria: [
      { criterium: 'Inzet & samenwerking', omschrijving: 'Neemt actief deel, werkt samen, neemt verantwoordelijkheid voor taken' },
      { criterium: 'Onderzoek & inzicht', omschrijving: 'Formuleert goede vragen, zoekt informatie, trekt conclusies uit observaties' },
      { criterium: 'Zorg voor het wormenhotel', omschrijving: 'Voedt en controleert het wormenhotel regelmatig, reageert op problemen' },
      { criterium: 'Logboek & observaties', omschrijving: 'Houdt een consistent logboek bij met observaties, foto\'s en reflecties' },
      { criterium: 'Eindproduct', omschrijving: 'Presenteert bevindingen helder, onderbouwd met observaties uit het project' },
    ],

    weken: [
      {
        week: 1,
        titel: 'Introductie: Afval en kringlopen',
        duur: '1 les (50–90 min)',
        leerdoelen: [
          'Leerlingen begrijpen het verschil tussen lineaire en circulaire economie',
          'Leerlingen kennen de kringloop van organisch afval',
          'Leerlingen formuleren een eigen onderzoeksvraag',
        ],
        activiteiten: [
          {
            naam: 'Startvraag (10 min)',
            beschrijving: 'Stel de vraag: "Wat denk je dat er met je appelschil gebeurt als je hem in de kliko gooit?" Laat leerlingen eerst individueel opschrijven, dan delen.',
          },
          {
            naam: 'Mindmap duurzaamheid (15 min)',
            beschrijving: 'Leerlingen maken in tweetallen een mindmap rondom het woord "duurzaamheid". Bespreek plenair welke begrippen terugkomen.',
          },
          {
            naam: 'Uitleg kringloop en circulaire economie (15 min)',
            beschrijving: 'Korte instructie over de kringloop van organisch afval en het verschil tussen lineair en circulair. Gebruik de lessen op het platform als ondersteuning.',
          },
          {
            naam: 'Onderzoeksvraag formuleren (10 min)',
            beschrijving: 'Leerlingen schrijven hun eigen onderzoeksvraag op. Bespreek de centrale projectvraag: "Hoe kunnen we ons eigen afval omzetten in iets waardevols?"',
          },
        ],
        tips: [
          'Betrek de kantine: hoeveel GFT-afval gooit de kantine dagelijks weg? Dit maakt het concreet.',
          'Laat leerlingen thuis alvast groente- en fruitresten verzamelen voor de volgende les.',
        ],
        differentiatie: {
          ondersteuning: 'Geef leerlingen die moeite hebben een woordweb met sleutelbegrippen als startpunt voor de mindmap.',
          verdieping: 'Laat verdiepingsleerlingen uitrekenen hoeveel CO₂ de school bespaart als al het GFT-afval lokaal wordt verwerkt.',
        },
      },
      {
        week: 2,
        titel: 'Onderzoek: Wat eten wormen?',
        duur: '1–2 lessen',
        leerdoelen: [
          'Leerlingen weten wat wormen wél en niet eten',
          'Leerlingen begrijpen de rol van bacteriën en schimmels bij compostering',
          'Leerlingen kennen de afvalstromen binnen school',
        ],
        activiteiten: [
          {
            naam: 'Wormenonderzoek (20 min)',
            beschrijving: 'Leerlingen zoeken op wat wormen eten. Ze maken twee lijsten: "Mag in het wormenhotel" en "Mag NIET in het wormenhotel". Deel de bevindingen plenair.',
          },
          {
            naam: 'Afvalstroomonderzoek (20 min)',
            beschrijving: 'Leerlingen inventariseren welk GFT-afval de school dagelijks produceert. Eventueel: bezoek aan de kantine voor een concrete inschatting.',
          },
          {
            naam: 'Presentatie bevindingen (15 min)',
            beschrijving: 'Groepjes presenteren hun onderzoek. Bespreek: wat waren jullie verwachtingen? Wat verraasde je?',
          },
        ],
        tips: [
          'Maak het tastbaar: neem een paar groente- en fruitresten mee naar de klas.',
          'Laat leerlingen ook kijken naar afvalstromen thuis: hoeveel GFT-afval gooit het gezin weg?',
        ],
        differentiatie: {
          ondersteuning: 'Geef een voorbeeldlijst met 10 items waarvan leerlingen aangeven of ze wél of niet in het wormenhotel mogen.',
          verdieping: 'Laat verdiepingsleerlingen een vergelijking maken: wat is energiezuiniger — lokale vermicompostering of industriële compostering?',
        },
      },
      {
        week: 3,
        titel: 'Bouwen: Het wormenhotel',
        duur: '2–3 lessen',
        leerdoelen: [
          'Leerlingen kunnen een functioneel wormenhotel bouwen',
          'Leerlingen begrijpen de eisen voor een goed werkend wormenhotel (lucht, vocht, voedsel)',
          'Leerlingen werken samen en verdelen taken',
        ],
        activiteiten: [
          {
            naam: 'Instructie bouw (15 min)',
            beschrijving: 'Bespreek de eisen: voldoende luchtgaten, vochtopvang, juiste bedding. Wijs rollen toe: wie boort, wie vult, wie de wormen plaatst.',
          },
          {
            naam: 'Bouwen (45–60 min)',
            beschrijving: 'Groepjes bouwen het wormenhotel. Jij circuleert en stelt vragen: "Waarom is dit gaatje nodig?" "Wat zou er gebeuren als de bedding te droog is?"',
          },
          {
            naam: 'Eerste observatie (15 min)',
            beschrijving: 'Na het bouwen: eerste observatie invullen op het platform. Foto maken. Leerlingen benoemen hun rol als "wormenambassadeur".',
          },
        ],
        tips: [
          'Boor de gaatjes van tevoren als er tijdgebrek is.',
          'Leg uit dat fouten maken mag — een wormenhotel dat te droog of te nat is, is een leermoment.',
          'Wijs één leerling per groep aan als hoofdverantwoordelijke voor het onderhoud.',
        ],
        differentiatie: {
          ondersteuning: 'Geef een stap-voor-stap bouwhandleiding met tekeningen.',
          verdieping: 'Laat leerlingen een ontwerp tekenen vóór ze gaan bouwen, inclusief labels en uitleg van elke component.',
        },
      },
      {
        week: 4,
        titel: 'Onderhoud: De eerste weken',
        duur: 'Doorlopend (5–10 min per dag)',
        leerdoelen: [
          'Leerlingen kunnen een wormenhotel correct onderhouden',
          'Leerlingen voeren zelfstandig wekelijkse observaties uit',
          'Leerlingen houden een consistent logboek bij',
        ],
        activiteiten: [
          {
            naam: 'Dagelijkse check (5 min)',
            beschrijving: 'Elke dag kort controleren: vochtigheid, geur, wormenactiviteit. Één leerling noteert eventuele bijzonderheden.',
          },
          {
            naam: 'Wekelijkse observatie (10 min)',
            beschrijving: 'Eén keer per week het observatieformulier invullen op het platform: vochtigheid, geur, activiteit, hoeveel compost is er al?',
          },
          {
            naam: 'Voeren (2× per week)',
            beschrijving: 'Kleine porties GFT-afval toevoegen. Vermijd overvoeren! Een vuistregel: voeg pas nieuw voedsel toe als het vorige grotendeels weg is.',
          },
        ],
        tips: [
          'Ruikt het wormenhotel sterk? Dan is er iets mis. Gebruik dit als gespreksstarter: wat kan de oorzaak zijn?',
          'Controleer of de wormen actief zijn. Zijn ze traag of naar de oppervlakte gekropen? Dan kan de pH of temperatuur niet goed zijn.',
          'Zorg dat leerlingen begrijpen dat zorgen voor levende wezens ook verantwoordelijkheid meebrengt — ook in het weekend.',
        ],
        differentiatie: {
          ondersteuning: 'Geef een checklist die leerlingen kunnen afvinken bij hun dagelijkse check.',
          verdieping: 'Laat leerlingen een wetenschappelijk experiment opzetten: verschilt de compostering bij verschillende voedingsbronnen?',
        },
      },
      {
        week: 5,
        titel: 'Oogsten: De compost is klaar',
        duur: '1 les',
        leerdoelen: [
          'Leerlingen weten wanneer compost klaar is',
          'Leerlingen kunnen compost oogsten en verwerken',
          'Leerlingen vergelijken plantengroei met en zonder compost',
        ],
        activiteiten: [
          {
            naam: 'Compost beoordelen (10 min)',
            beschrijving: 'Is de compost klaar? Bespreek criteria: donker van kleur, kruimelig, ruikt naar bosgrond, je kunt het materiaal niet meer herkennen.',
          },
          {
            naam: 'Oogsten (20 min)',
            beschrijving: 'Wormen scheiden van de compost (ze gaan naar het licht). Compost wegen en noteren. Wormenthee opvangen.',
          },
          {
            naam: 'Toepassen (15 min)',
            beschrijving: 'Compost gebruiken in schooltuin of kamerplanten. Vergelijk twee planten: één met compost, één zonder.',
          },
        ],
        tips: [
          'Laat leerlingen de compost vergelijken met gewone tuinaarde: kleur, geur, structuur.',
          'Wormenthee 1:10 verdund met water kan worden gegeven aan de schoolplanten.',
        ],
        differentiatie: {
          ondersteuning: 'Geef een kijkwijzer: wat valt op? (kleur, geur, textuur, wormen zichtbaar?)',
          verdieping: 'Laat leerlingen de nutriënteninhoud van de compost vergelijken met commerciële tuinaarde.',
        },
      },
      {
        week: 6,
        titel: 'Presentatie & Reflectie',
        duur: '1 les',
        leerdoelen: [
          'Leerlingen kunnen reflecteren op het leerproces',
          'Leerlingen presenteren hun bevindingen overtuigend',
          'Leerlingen kunnen terugkoppelen naar de centrale projectvraag',
        ],
        activiteiten: [
          {
            naam: 'Eindproduct presenteren (30 min)',
            beschrijving: 'Groepjes presenteren hun eindproduct (poster, video, pitch). Publiek geeft feedback via een vaste structuur: "Ik vond sterk... Een suggestie is..."',
          },
          {
            naam: 'Reflectie (15 min)',
            beschrijving: 'Terugkoppeling naar de centrale vraag. Wat hebben jullie geleerd? Wat zou je anders doen? Wat gaan jullie thuis anders doen?',
          },
          {
            naam: 'Afsluiting (5 min)',
            beschrijving: 'Vier het! Wat is er bereikt? Eventueel: het wormenhotel overdragen aan een volgende groep of de schooltuin.',
          },
        ],
        tips: [
          'Nodig een gast uit als publiek: medewerker kantine, ouder of conciërge. Dat maakt de presentatie echter.',
          'Gebruik de reflectievragen uit het platform als basis voor het nagesprek.',
        ],
        differentiatie: {
          ondersteuning: 'Geef een presentatiesjabloon: inleiding, wat hebben we gedaan, wat hebben we gevonden, conclusie.',
          verdieping: 'Laat leerlingen een businesscase schrijven: hoe zou je dit project schoolbreed kunnen uitrollen?',
        },
      },
    ],
  },

  // ════════════════════════════════════════════════════════════════════════════
  keuringsdienst: {
    titel: 'Docenthandleiding — Keuringsdienst van Waarde',
    inleiding: 'Deze handleiding begeleidt je week voor week door het project "Keuringsdienst van Waarde". Het project duurt 6 weken en combineert wetenschappelijk onderzoek, bodemkunde en mediaproductie. Leerlingen vergelijken drie bodems en presenteren hun bevindingen als een tv-aflevering.',
    beoordelingsfilosofie: 'De nadruk ligt op het onderzoeksproces, niet op het "juiste antwoord". Een onverwacht resultaat is juist waardevol als leerlingen het kunnen verklaren.',

    beoordelingscriteria: [
      { criterium: 'Betrokkenheid bij experiment', omschrijving: 'Voert consistent metingen uit, reageert op veranderingen in de planten' },
      { criterium: 'Kwaliteit van observaties', omschrijving: 'Metingen zijn nauwkeurig, consistent en volledig ingevuld' },
      { criterium: 'Samenwerking', omschrijving: 'Werkt goed samen, verdeelt taken eerlijk, levert constructieve bijdrage' },
      { criterium: 'Onderbouwing van verklaringen', omschrijving: 'Conclusies zijn gebaseerd op eigen meetdata, niet op aannames' },
      { criterium: 'Eindproduct', omschrijving: 'De Keuringsdienst-aflevering is helder, onderbouwd en aantrekkelijk gepresenteerd' },
    ],

    weken: [
      {
        week: 1,
        titel: 'Introductie: Bodem en plantengroei',
        duur: '1 les (50–90 min)',
        leerdoelen: [
          'Leerlingen begrijpen wat bodemkwaliteit is en waarom het belangrijk is',
          'Leerlingen kennen het verschil tussen kunstmest en compostthee',
          'Leerlingen formuleren een hypothese voor het experiment',
        ],
        activiteiten: [
          {
            naam: 'Programma bekijken (10 min)',
            beschrijving: 'Bekijk samen een fragment van het echte programma Keuringsdienst van Waarde. Bespreek: hoe pakken ze onderzoek aan? Hoe presenteren ze resultaten?',
          },
          {
            naam: 'Introductie bodemkwaliteit (15 min)',
            beschrijving: 'Bespreek wat goede bodemkwaliteit is. Wat zit er in gezonde bodem? Wat is het verschil tussen kunstmest en compostthee?',
          },
          {
            naam: 'Hypothese formuleren (20 min)',
            beschrijving: 'Leerlingen schrijven hun hypothese op: welke behandeling levert de beste groei? Waarom? Bespreek plenair.',
          },
          {
            naam: 'Experimentopzet bespreken (15 min)',
            beschrijving: 'Leg uit wat de drie potten zijn. Wat zijn de constanten? Wat is de onafhankelijke variabele? Wat is de afhankelijke variabele?',
          },
        ],
        tips: [
          'Laat leerlingen hun hypothese opschrijven vóór het experiment — dit maakt de vergelijking achteraf waardevoller.',
          'Vraag: "Wat zou er kunnen misgaan in dit experiment?" Dit bevordert kritisch denken.',
        ],
        differentiatie: {
          ondersteuning: 'Geef een ingevuld hypotheseformulier als voorbeeld. Laat leerlingen alleen het "waarom" aanvullen.',
          verdieping: 'Laat leerlingen zelf een experimentopzet bedenken voor een aanvullende vraag: "Wat als we ook organische mest meenemen?"',
        },
      },
      {
        week: 2,
        titel: 'Experiment starten: Zaaien en meten',
        duur: '1 les',
        leerdoelen: [
          'Leerlingen kunnen een gecontroleerd experiment opzetten',
          'Leerlingen begrijpen het belang van gelijke omstandigheden',
          'Leerlingen voeren een startmeting uit',
        ],
        activiteiten: [
          {
            naam: 'Potten vullen en zaaien (25 min)',
            beschrijving: 'Drie potten gelijkmatig vullen met ongefertiliseerde potgrond. Gelijke hoeveelheid zaadjes op gelijke diepte. Labels aanbrengen.',
          },
          {
            naam: 'Toevoegingen verdelen (10 min)',
            beschrijving: 'Kunstmest toevoegen aan pot 2, compostthee aan pot 3. Documenteer de gebruikte hoeveelheden voor de rapportage.',
          },
          {
            naam: 'Startmeting (15 min)',
            beschrijving: 'Datum noteren, startfoto maken, eventueel grondtemperatuur meten. Alles invullen op het platform.',
          },
        ],
        tips: [
          'Gebruik transparante potten zodat ook de wortelontwikkeling zichtbaar wordt.',
          'Maak van meet af aan foto\'s op vaste momenten en locaties — consistentie is cruciaal.',
          'Laat leerlingen zelf de gelijke hoeveelheid water per week afmeten.',
        ],
        differentiatie: {
          ondersteuning: 'Geef een invulschema: wat ga je meten, hoe, wanneer?',
          verdieping: 'Laat leerlingen een meetprotocol schrijven dat een andere groep zou kunnen volgen.',
        },
      },
      {
        week: 3,
        titel: 'Monitoring: Eerste groei',
        duur: 'Doorlopend (15 min per week)',
        leerdoelen: [
          'Leerlingen kunnen nauwkeurig planthoogte en andere kenmerken meten',
          'Leerlingen registreren observaties systematisch',
          'Leerlingen beginnen patronen te herkennen in de groei',
        ],
        activiteiten: [
          {
            naam: 'Wekelijkse meting (15 min)',
            beschrijving: 'Hoogte meten van alle drie planten. Bladkleur en conditie noteren. Foto\'s maken. Alles invullen in het observatieformulier.',
          },
          {
            naam: 'Tussenreflectie (5 min)',
            beschrijving: 'Kort nadenken: zie je al verschillen? Kloppen die met je hypothese?',
          },
        ],
        tips: [
          'Meet altijd op hetzelfde tijdstip (bijv. maandag 9:00). Licht en waterstatus kunnen anders variëren.',
          'Als zaadjes nog niet zijn opgekomen: dat is normaal tot dag 5-7. Geen reden tot paniek.',
          'Bespreek kleine onregelmatigheden: soms groeit één zaadje harder dan de andere — dit is niet per se fout.',
        ],
        differentiatie: {
          ondersteuning: 'Geef een invultabel op papier als backup voor het platform.',
          verdieping: 'Laat leerlingen een groeisnelheid berekenen (cm per dag) en dit plotten op een grafiek.',
        },
      },
      {
        week: 4,
        titel: 'Bezoek Soil Valley',
        duur: '1 dagdeel',
        leerdoelen: [
          'Leerlingen begrijpen hoe compostthee wordt gemaakt',
          'Leerlingen kunnen hun eigen experiment vergelijken met professioneel onderzoek',
          'Leerlingen stellen goede vragen aan experts',
        ],
        activiteiten: [
          {
            naam: 'Voorbereiding vragen (vooraf)',
            beschrijving: 'Laat leerlingen 2–3 vragen voorbereiden op basis van hun eigen observaties. "Wij zagen dat... Hoe kan dat?"',
          },
          {
            naam: 'Bezoek Soil Valley',
            beschrijving: 'Uitleg over compostthee, vergelijkbaar experiment zien. Leerlingen stellen hun vragen.',
          },
          {
            naam: 'Verwerking (15 min)',
            beschrijving: 'Na het bezoek: notities uitwerken die later in het eindproduct gebruikt worden.',
          },
        ],
        tips: [
          'Bespreek het bezoek direct erna: wat was interessant? Wat verandert er aan jullie verwachtingen?',
          'Laat leerlingen notities of foto\'s maken tijdens het bezoek voor gebruik in het eindproduct.',
        ],
        differentiatie: {
          ondersteuning: 'Geef een vragen-raamwerk: "Wij zien dat... Wij denken dat dit komt doordat... Klopt dat?"',
          verdieping: 'Laat leerlingen onderzoeken: hoe wordt compostthee commercieel geproduceerd? Wat zijn de schaalvoordelen?',
        },
      },
      {
        week: 5,
        titel: 'Analyse: Wat zien we in de data?',
        duur: '1–2 lessen',
        leerdoelen: [
          'Leerlingen kunnen meetgegevens analyseren en visualiseren',
          'Leerlingen kunnen verklaringen formuleren voor gevonden verschillen',
          'Leerlingen vergelijken hun resultaten met hun hypothese',
        ],
        activiteiten: [
          {
            naam: 'Grafieken maken (20 min)',
            beschrijving: 'Leerlingen zetten alle meetgegevens in een grafiek (op papier of digitaal). X-as = weken, Y-as = hoogte in cm. Drie lijnen naast elkaar.',
          },
          {
            naam: 'Verklaringen zoeken (20 min)',
            beschrijving: 'Welke pot presteerde het best? Waarom denk je dat? Gebruik kennis over kunstmest, compostthee en bodemleven.',
          },
          {
            naam: 'Hypothese vergelijken (10 min)',
            beschrijving: 'Vergellijk de resultaten met de hypothese uit week 1. Klopte het? Zo niet: hoe verklaar je het verschil?',
          },
        ],
        tips: [
          'Er is geen fout antwoord. Stimuleer leerlingen om te verklaren, ook als de resultaten onverwacht zijn.',
          'Bespreek: waarom is het belangrijk om eerlijk te rapporteren, ook als de resultaten anders zijn dan gewenst?',
        ],
        differentiatie: {
          ondersteuning: 'Geef een invultabel met de grafieken al gedeeltelijk ingevuld.',
          verdieping: 'Laat leerlingen een statistische vergelijking maken of gemiddelden berekenen.',
        },
      },
      {
        week: 6,
        titel: 'Presentatie: De Keuringsdienst-aflevering',
        duur: '1–2 lessen',
        leerdoelen: [
          'Leerlingen kunnen hun onderzoek helder en aantrekkelijk presenteren',
          'Leerlingen kunnen wetenschappelijke informatie omzetten naar publieksvriendelijke content',
          'Leerlingen reflecteren op het gehele project',
        ],
        activiteiten: [
          {
            naam: 'Aflevering maken of presentatie houden (30–45 min)',
            beschrijving: 'Groepjes presenteren hun Keuringsdienst-aflevering. Onderzoeksvraag, aanpak, resultaten, verklaringen, conclusie.',
          },
          {
            naam: 'Feedbackronde (15 min)',
            beschrijving: 'Publiek geeft feedback. Gebruik de structuur: "Sterk punt was... Een suggestie is..."',
          },
          {
            naam: 'Reflectie en afsluiting (10 min)',
            beschrijving: 'Wat ga je nu anders doen? Wat wil je nog meer weten? Wat zou je verbeteren als je het experiment opnieuw deed?',
          },
        ],
        tips: [
          'Bekijk samen een bestaande aflevering van Keuringsdienst van Waarde ter inspiratie.',
          'Nodige een gast uit: een tuinder, bioloog of medewerker van Soil Valley.',
        ],
        differentiatie: {
          ondersteuning: 'Geef een presentatiestructuur: Inleiding → Experiment → Resultaten → Verklaring → Conclusie.',
          verdieping: 'Laat leerlingen een peer-review uitvoeren op elkaars presentaties met een wetenschappelijke beoordelingsrubric.',
        },
      },
    ],
  },

  // ════════════════════════════════════════════════════════════════════════════
  wilgenvlechten: {
    titel: 'Docenthandleiding — Wilgenvlechten in het Voedselbos',
    inleiding: 'Deze handleiding begeleidt je door het project "Wilgenvlechten in het Voedselbos". Het project duurt 1 week en is in de eerste plaats een buiten- en doproject: leerlingen zijn actief bezig met hun handen, buiten in de natuur. Er is bewust minder nadruk op theorie — het gaat om ervaren, maken en observeren. Geschikt voor groep 7-8 en Praktijkonderwijs.',
    beoordelingsfilosofie: 'Dit project beoordeelt op inzet, samenwerking en creativiteit — niet op het "perfecte" eindresultaat. Een vlechtwerk dat niet helemaal mooi is maar met veel energie en samenwerking tot stand is gekomen, is waardevol. Geef positieve feedback op het proces.',

    beoordelingscriteria: [
      { criterium: 'Samenwerking', omschrijving: 'Werkt actief mee in de groep, helpt anderen, neemt verantwoordelijkheid voor een taak' },
      { criterium: 'Inzet', omschrijving: 'Doet volop mee bij de buitenactiviteiten, geeft niet op bij moeilijkheden' },
      { criterium: 'Vakmanschap vlechten', omschrijving: 'Heeft de vlechttechniek toegepast, constructie is stevig en doordacht' },
      { criterium: 'Observatievermogen', omschrijving: 'Heeft zorgvuldig geobserveerd en goed genoteerd welke dieren er te zien waren' },
      { criterium: 'Reflectie', omschrijving: 'Kan uitleggen wat hij/zij heeft gedaan, geleerd en wat hij/zij zou verbeteren' },
    ],

    weken: [
      {
        week: 1,
        titel: 'Introductie & Onderzoek: Kennismaken met het voedselbos',
        duur: '2 lessen (dag 1 en 2)',
        leerdoelen: [
          'Leerlingen weten wat een voedselbos is en waarom het bijdraagt aan biodiversiteit',
          'Leerlingen kennen een paar eigenschappen van de wilg',
          'Leerlingen hebben buiten geobserveerd wat er in het voedselbos leeft',
        ],
        activiteiten: [
          {
            naam: 'Klassengesprek voedselbos (15 min)',
            beschrijving: 'Stel de centrale vraag: "Hoe kunnen wij met natuurlijke materialen iets bouwen dat bijdraagt aan biodiversiteit?" Bespreek: wat weten leerlingen al over voedselbossen en wilgen? Gebruik eventueel foto\'s of een kort filmpje.',
          },
          {
            naam: 'Buitenles: observeren in het voedselbos (45 min)',
            beschrijving: 'Ga met de groep naar het voedselbos. Leerlingen lopen rond met een vergrootglas en notitieboekje. Opdracht: noteer 5 planten, 3 dieren of insecten die je ziet. Maak foto\'s. Zoek specifiek naar wilgen.',
          },
          {
            naam: 'Terugkoppeling in de klas (15 min)',
            beschrijving: 'Wat hebben leerlingen gevonden? Bespreek plenair: welke dieren waren er? Waarom is de wilg bijzonder? Introduceer het begrip "ecosysteemdienst".',
          },
        ],
        tips: [
          'Geef leerlingen een telformulier mee naar buiten — het helpt hen gerichter te kijken.',
          'Wijs in het voedselbos een wilgenboom of -struik aan. Laat leerlingen de takken voelen: buigzaam of stijf?',
          'Vermijd te lange uitleg in de klas — ga zo snel mogelijk naar buiten.',
        ],
        differentiatie: {
          ondersteuning: 'Geef een afbeeldingenkaart met veelvoorkomende insecten en vogels als hulp bij het herkennen en noteren.',
          verdieping: 'Laat leerlingen opzoeken hoeveel insectensoorten de wilg ondersteunt en dit vergelijken met een andere boom.',
        },
      },
      {
        week: 2,
        titel: 'Ontwerpen: Wat gaan we bouwen?',
        duur: '1 les (dag 2 of 3)',
        leerdoelen: [
          'Leerlingen kunnen een eenvoudig ontwerp maken voor een vlechtconstructie',
          'Leerlingen denken na over de functie van hun constructie voor dieren',
          'Leerlingen plannen welke materialen en plek ze nodig hebben',
        ],
        activiteiten: [
          {
            naam: 'Voorbeelden bekijken (10 min)',
            beschrijving: 'Laat foto\'s zien van wilgenhaag, vlechtmand, insectenschuilplaats en wilgentunnel. Bespreek: welke functie heeft elke constructie voor de natuur?',
          },
          {
            naam: 'Ontwerpen in groepjes (20 min)',
            beschrijving: 'Elke groep maakt een schets van wat ze gaan bouwen. Ze noteren: welke plek in het voedselbos, welke materialen nodig, hoe groot wordt het? Begeleider loopt langs en stelt vragen.',
          },
          {
            naam: 'Ontwerpen presenteren (10 min)',
            beschrijving: 'Elk groepje stelt kort hun plan voor aan de klas. Klasgenoten mogen één suggestie geven.',
          },
        ],
        tips: [
          'Vraag door op de functie: "Welk dier kan hier gebruik van maken? Waarom?"',
          'Houd ontwerpen realistisch: een constructie van 50×50 cm is al heel goed voor een week.',
          'Laat leerlingen de plek in het voedselbos al van tevoren uitkiezen — dat geeft eigenaarschap.',
        ],
        differentiatie: {
          ondersteuning: 'Geef een ontwerpsjabloon met vragen als: "Wij bouwen een... Het is... cm groot. Wij gebruiken... Het helpt dieren doordat..."',
          verdieping: 'Laat leerlingen een lijst maken van welke insecten of vogels zij verwachten aan te trekken met hun ontwerp en waarom.',
        },
      },
      {
        week: 3,
        titel: 'Wilgenvlechten: Bouwen!',
        duur: '2 lessen (dag 3 en 4)',
        leerdoelen: [
          'Leerlingen kunnen een eenvoudige vlechttechniek toepassen',
          'Leerlingen bouwen samen een constructie van wilgentakken',
          'Leerlingen leren aanpassen en problemen oplossen tijdens het bouwen',
        ],
        activiteiten: [
          {
            naam: 'Instructie vlechttechniek (15 min)',
            beschrijving: 'Demonstreer de basisvlechttechniek: dunne tak om paal wikkelen, afwisselend voor en achter door de staanders weven. Laat leerlingen eerst oefenen met een kleine tak.',
          },
          {
            naam: 'Bouwen buiten (60–90 min)',
            beschrijving: 'Groepjes gaan naar hun gekozen plek en beginnen met bouwen. Begeleider circuleert: helpt bij het vastmaken, vraagt "Waarom kies je dit?" en moedigt aan om door te gaan als het moeilijk is.',
          },
          {
            naam: 'Foto\'s en eerste observatie (10 min)',
            beschrijving: 'Aan het einde van de bouwsessie foto\'s maken van de constructie. Eerste observatieronde: zijn er al insecten te zien?',
          },
        ],
        tips: [
          'Verse takken zijn makkelijker te buigen — dikke takken kan je even laten weken in water.',
          'Leg de nadruk op het proberen, niet op het perfecte resultaat. Zeg: "Fouten maken hoort erbij — een wilg groeit toch gewoon door!"',
          'Wijs leerlingen op veilig gebruik van de snoeischaar vóór je naar buiten gaat.',
        ],
        differentiatie: {
          ondersteuning: 'Koppel een leerling die moeite heeft met de motoriek aan een sterker vlechtende leerling. Geef stap-voor-stap tekeningen van de vlechttechniek.',
          verdieping: 'Laat leerlingen uitvinden of levende wilgentakken kunnen gaan wortelen als ze in de grond worden gestoken, en dit documenteren.',
        },
      },
      {
        week: 4,
        titel: 'Observatie: Welke dieren komen er al?',
        duur: 'Korte momenten verspreid over dag 4 en 5',
        leerdoelen: [
          'Leerlingen observeren zorgvuldig welke dieren en insecten er bij hun constructie komen',
          'Leerlingen noteren hun waarnemingen en trekken conclusies',
          'Leerlingen begrijpen het verband tussen hun constructie en biodiversiteit',
        ],
        activiteiten: [
          {
            naam: 'Observatierondes buiten (2–3 × 10–15 min)',
            beschrijving: 'Leerlingen bezoeken hun constructie op meerdere momenten van de dag. Ze noteren op het telformulier: welke dieren, hoeveel, wat doen ze? Foto\'s maken van bijzondere waarnemingen.',
          },
          {
            naam: 'Groepsbespreking (10 min)',
            beschrijving: 'Na elke ronde kort bespreken: wat zagen jullie? Wat was verrassend? Waarom denk je dat dit dier hier is?',
          },
        ],
        tips: [
          'Ook 1 dag na het bouwen kunnen al insecten aanwezig zijn. Maak hier een spannend moment van.',
          'Wijs leerlingen erop dat ook niet direct zichtbare sporen tellen: een vogelveertje, uitwerpselen, een beetnageld takje.',
          'Ga op verschillende tijden naar buiten: insecten zijn actiever bij warm, zonnig weer.',
        ],
        differentiatie: {
          ondersteuning: 'Geef een voorbeeldformulier met categorieën: vliegende insecten, kruipende insecten, vogels, anders.',
          verdieping: 'Laat leerlingen hun waarnemingen vergelijken met een plek in het voedselbos zonder constructie: is er verschil?',
        },
      },
      {
        week: 5,
        titel: 'Reflectie & Presentatie',
        duur: '1–2 lessen (dag 5)',
        leerdoelen: [
          'Leerlingen kunnen terugkijken op wat ze hebben gedaan en geleerd',
          'Leerlingen presenteren hun werk op een heldere manier',
          'Leerlingen koppelen hun ervaringen terug aan de centrale projectvraag',
        ],
        activiteiten: [
          {
            naam: 'Eindproduct voorbereiden (20–30 min)',
            beschrijving: 'Groepjes bereiden hun presentatie voor: een pitch, video, rondleiding in het voedselbos of poster. Ze verwerken foto\'s van de constructie en observaties.',
          },
          {
            naam: 'Presentaties (20–30 min)',
            beschrijving: 'Elke groep presenteert aan de klas, een ander publiek of geeft een rondleiding bij de constructie in het voedselbos. Publiek geeft reactie: "Ik vond sterk... Een vraag die ik heb..."',
          },
          {
            naam: 'Reflectie en afsluiting (15 min)',
            beschrijving: 'Terugkoppeling naar de centrale vraag: hebben jullie iets gebouwd dat bijdraagt aan biodiversiteit? Wat heb je geleerd? Wat was verrassing? Vieren wat bereikt is!',
          },
        ],
        tips: [
          'Een rondleiding bij de constructie zelf is het krachtigste eindmoment — leerlingen kunnen dan letterlijk aanwijzen wat ze hebben gemaakt.',
          'Nodig een gast uit: een medewerker van het voedselbos, een bioloog of een ouder. Dat maakt de presentatie echter.',
          'Sluit af met een positieve boodschap: de constructie blijft staan en de wilgtakken groeien mogelijk uit tot levende planten.',
        ],
        differentiatie: {
          ondersteuning: 'Geef een presentatiestructuur: "Wij hebben gebouwd... We zagen... We leerden... Onze conclusie is..."',
          verdieping: 'Laat leerlingen een plan schrijven voor hoe ze het voedselbos verder kunnen verbeteren voor biodiversiteit, gebaseerd op hun observaties.',
        },
      },
    ],
  },
}
