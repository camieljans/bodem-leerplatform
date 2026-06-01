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
}
