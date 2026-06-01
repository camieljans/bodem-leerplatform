// ─── Opdrachten per project per niveau ────────────────────────────────────────
// Niveaugroepen: pro | basis (VMBO-B) | midden (VMBO-K/VMBO-TL) | havo (HAVO/VWO)
// Taaktypen: bespreek | onderzoek | doe | schrijf | teken | denk

export const opdrachten = {

  // ════════════════════════════════════════════════════════════════════════════
  wormenhotel: {

    basis: [
      {
        week: 1,
        titel: 'Kennismaken & Bouwen: jullie wormenhotel',
        intro: 'Vandaag leer je wat afval kan worden en bouw je meteen het wormenhotel! Van idee naar een levend systeem in één les.',
        taken: [
          {
            type: 'bespreek',
            tekst: 'Klassengesprek: welk afval gooi jij thuis weg? Maak een lijstje van minstens 5 soorten. Welke kunnen in het wormenhotel?',
          },
          {
            type: 'doe',
            tekst: 'Bouw het wormenhotel! Verdeel de taken in je groep: wie boort de gaatjes (drainage), wie legt karton en aarde als bedding, wie voegt de wormen toe, wie geeft het eerste voedsel? Bouw stap voor stap.',
          },
          {
            type: 'teken',
            tekst: 'Maak een tekening of foto van het afgewerkte wormenhotel. Schrijf erbij welke laag wat doet: drainage, bedding, voedsel.',
          },
          {
            type: 'schrijf',
            tekst: 'Schrijf in je logboek: hoe ziet het hotel er nu uit? Wat denk je dat de wormen de komende weken gaan doen?',
          },
        ],
        reflectie: [
          'Wat vond je het spannendst aan het bouwen?',
          'Waarom denk je dat het goed is om afval opnieuw te gebruiken?',
        ],
        vragen: [
          {
            vraag: 'Wat heb je deze week gebouwd?',
            opties: ['Een vogelhuis', 'Een wormenhotel', 'Een moestuin', 'Een aquarium'],
            correct: 1,
            uitleg: 'Jullie hebben een wormenhotel gebouwd van hergebruikte materialen.',
          },
          {
            vraag: 'Welk afval van deze lijst mag in het wormenhotel?',
            opties: ['Een plastic fles', 'Een appelschil', 'Een stuk glas', 'Een blikje'],
            correct: 1,
            uitleg: 'Een appelschil is organisch afval — dat eten de wormen op en zetten het om in compost.',
          },
        ],
      },
      {
        week: 2,
        titel: 'Onderzoeken: wat eten wormen?',
        intro: 'Voor je een wormenhotel bouwt, moet je weten wat wormen lekker vinden en wat ze niet eten. Deze week doe je onderzoek.',
        taken: [
          {
            type: 'onderzoek',
            tekst: 'Zoek op (of vraag je begeleider): wat eten wormen WEL en wat eten ze NIET? Maak twee lijsten. Voeg ook toe WAAROM wormen bepaald voedsel niet lusten.',
          },
          {
            type: 'doe',
            tekst: 'Test het zelf! Verzamel 4 verschillende etenswaren (bijv. appelschil, broodkorst, stukje vlees, koffiedik). Leg ze een week buiten op de grond en kijk wat er als eerste begint te veranderen. Maak foto\'s!',
          },
          {
            type: 'teken',
            tekst: 'Teken hoe een wormenhotel er van binnen uitziet. Gebruik de uitleg van je begeleider. Label de lagen: drainage, bedding, voedsel.',
          },
          {
            type: 'schrijf',
            tekst: 'Noteer in je logboek: wat mag er in jullie wormenhotel en wat niet? Schrijf ook op welk materiaal jullie nodig hebben om het te bouwen.',
          },
        ],
        reflectie: [
          'Wat zou er gebeuren als je vlees in een wormenhotel gooit?',
          'Hoe weet je dat je wormenhotel goed werkt?',
        ],
        vragen: [
          {
            vraag: 'Wat mag je NIET in een wormenhotel gooien?',
            opties: ['Appelschillen', 'Broodkorst', 'Vlees', 'Koffiedik'],
            correct: 2,
            uitleg: 'Vlees lusten wormen niet. Je hebt twee lijsten gemaakt: wat kan wel en wat kan niet.',
          },
          {
            vraag: 'Welke drie lagen heeft een wormenhotel van binnen?',
            opties: ['Zand, klei en stenen', 'Drainage, bedding en voedsel', 'Water, lucht en vuur', 'Bodem, midden en dak'],
            correct: 1,
            uitleg: 'Je hebt de lagen getekend: drainage onderaan, dan bedding, dan het voedsel.',
          },
        ],
      },
      {
        week: 3,
        titel: 'Eerste observaties: hoe gaat het met de wormen?',
        intro: 'Het hotel staat nu twee weken. Tijd voor een eerste echte inspectie! Kijk goed, schrijf op wat je ziet en stuur bij als er iets niet klopt.',
        taken: [
          {
            type: 'doe',
            tekst: 'Doe je eerste volledige observatie: til het deksel op en kijk goed. Hoe ruikt het? Zijn de wormen actief? Is de grond vochtig genoeg? Vul het observatieformulier in.',
          },
          {
            type: 'onderzoek',
            tekst: 'Vergelijk met wat je verwachtte: klopt het? Zoek op wat een goede geur betekent (bosgrond) en wat een slechte geur betekent (zuur, ammoniak). Wat ruik jij?',
          },
          {
            type: 'schrijf',
            tekst: 'Schrijf in je logboek: wat zie je dat goed gaat? Is er iets raars? Wat ga je aanpassen — meer vocht, minder voedsel, ander voedsel?',
          },
          {
            type: 'bespreek',
            tekst: 'Bespreek met je groep: hoe weten jullie dat de wormen het goed hebben? Maak een lijstje van goede tekenen én waarschuwingssignalen.',
          },
        ],
        reflectie: [
          'Wat valt je op vergeleken met week 1?',
          'Wat moet je aanpassen en waarom?',
        ],
        vragen: [
          {
            vraag: 'Wat betekent het als het wormenhotel naar bosgrond ruikt?',
            opties: ['Er zit iets mis', 'Het hotel werkt goed', 'De wormen zijn dood', 'Er is te veel water'],
            correct: 1,
            uitleg: 'Een bosgrondgeur betekent dat de compostering goed verloopt — precies zoals het hoort.',
          },
          {
            vraag: 'Wat doe je als de grond te droog is?',
            opties: ['Niets, dat lost zichzelf op', 'Voorzichtig wat water toevoegen', 'Meer voedsel toevoegen', 'De wormen eruit halen'],
            correct: 1,
            uitleg: 'Wormen ademen door hun huid — als de grond te droog is, gaan ze dood. Een beetje water toevoegen helpt.',
          },
        ],
      },
      {
        week: 4,
        titel: 'Onderhoud: wormen verzorgen',
        intro: 'Het wormenhotel staat! Nu begint het echte werk: goed zorgen voor de wormen en bijhouden wat er gebeurt.',
        taken: [
          {
            type: 'doe',
            tekst: 'Voer de wormen: gooi een handje groente- en fruitresten in het hotel. Controleer of de grond vochtig genoeg is (niet te nat, niet te droog). Doe dit elke schooldag.',
          },
          {
            type: 'onderzoek',
            tekst: 'Controleer het wormenhotel: ruikt het naar bosgrond of naar iets naars? Bewegen de wormen? Noteer dit elke keer als je kijkt.',
          },
          {
            type: 'schrijf',
            tekst: 'Schrijf in je logboek (week 4): wat heb je deze week gezien? Hoe gaat het met de wormen? Gebruik ook een foto als dat kan.',
          },
          {
            type: 'teken',
            tekst: 'Teken of schrijf op een tijdlijn wat er stap voor stap met het groenteschillen in het wormenhotel gebeurt. Wat verandert er elke week?',
          },
        ],
        reflectie: [
          'Wat valt je op aan de wormen vergeleken met vorige week?',
          'Wat heb je moeten aanpassen aan de verzorging?',
        ],
        vragen: [
          {
            vraag: 'Hoe moet de grond in het wormenhotel voelen?',
            opties: ['Droog als zand', 'Vochtig maar niet drijfnat', 'Zo nat als een plas water', 'Het maakt niet uit'],
            correct: 1,
            uitleg: 'Wormen hebben vocht nodig, maar als het te nat is gaan ze dood.',
          },
          {
            vraag: 'Wat heb je deze week bijgehouden in je logboek?',
            opties: ['De kleur van je rugzak', 'Wat je zag aan de wormen en de grond', 'Hoeveel lessen je had', 'De temperatuur buiten'],
            correct: 1,
            uitleg: 'In je logboek schreef je op wat je zag: hoe de wormen bewegen, hoe het ruikt en hoe de grond er uitziet.',
          },
        ],
      },
      {
        week: 5,
        titel: 'Oogsten: compost gebruiken',
        intro: 'Na weken hard werk hebben de wormen compost gemaakt. Tijd om te oogsten en te gebruiken!',
        taken: [
          {
            type: 'doe',
            tekst: 'Oogst de compost: haal voorzichtig de onderste laag eruit. Dit is de compost! Hoe ziet het eruit? Hoe ruikt het? Vergelijk het met gewone aarde.',
          },
          {
            type: 'onderzoek',
            tekst: 'Maak een mini-experiment: neem twee plantjes (of twee zaden) van hetzelfde soort. Geef één compost van jullie wormenhotel, de ander gewone potgrond. Observeer wat er na een week verschilt.',
          },
          {
            type: 'teken',
            tekst: 'Teken de kringloop: begin bij groenteschillen → wormen → compost → plant → nieuwe groente → groenteschillen. Maak de cirkel compleet!',
          },
          {
            type: 'schrijf',
            tekst: 'Schrijf in je logboek: hoe ziet de compost eruit? Wat ga je ermee doen? En wat heb je geleerd over de kringloop van de natuur?',
          },
        ],
        reflectie: [
          'Wat is het verschil tussen compost en gewone aarde?',
          'Waarom is composteren goed voor het milieu?',
        ],
        vragen: [
          {
            vraag: 'Wat haal je uit de onderste laag van het wormenhotel als je oogst?',
            opties: ['Nieuwe wormen', 'Compost', 'Plastiek', 'Zaad'],
            correct: 1,
            uitleg: 'In de onderste laag zit de afgewerkte compost — dat is wat de wormen van het afval hebben gemaakt.',
          },
          {
            vraag: 'Wat is de volgende stap na compost in de kringloop: groenteschillen → wormen → compost → ?',
            opties: ['Plastic', 'Vuur', 'Plant', 'Steen'],
            correct: 2,
            uitleg: 'Compost voedt planten, en planten leveren nieuwe groenteschillen. De cirkel is rond.',
          },
        ],
      },
      {
        week: 6,
        titel: 'Afsluiten: wat heb je geleerd?',
        intro: 'Dit is de laatste week. Je kijkt terug op alles wat je gedaan en geleerd hebt, en je laat zien wat je weet.',
        taken: [
          {
            type: 'bespreek',
            tekst: 'Praat met je groep: wat zijn de drie belangrijkste dingen die jullie hebben geleerd over wormen, afval en kringlopen?',
          },
          {
            type: 'teken',
            tekst: 'Maak een poster, een tekening of een korte video die laat zien hoe een wormenhotel werkt. Zorg dat andere leerlingen het kunnen begrijpen.',
          },
          {
            type: 'schrijf',
            tekst: 'Schrijf je eindreflectie in je logboek: Wat ging goed? Wat was moeilijk? Wat zou je anders doen? Wat wil je nog meer weten over composteren?',
          },
          {
            type: 'doe',
            tekst: 'Presenteer jullie wormenhotel aan de klas (of maak een foto-overzicht). Laat zien: het hotel zelf, de compost die je hebt gemaakt, en wat je hebt geleerd.',
          },
        ],
        reflectie: [
          'Waarom denk jij dat composteren belangrijk is voor de aarde?',
          'Wat ga je thuis anders doen na dit project?',
        ],
        vragen: [
          {
            vraag: 'Wat maak je deze week om het project te presenteren?',
            opties: ['Een poster, tekening of video', 'Een recept voor wormensoep', 'Een PowerPoint van 50 dia\'s', 'Een wiskundesom'],
            correct: 0,
            uitleg: 'Je maakt een poster, tekening of korte video zodat andere leerlingen zien hoe een wormenhotel werkt.',
          },
          {
            vraag: 'Wat is de grootste les van dit wormenhotel-project?',
            opties: ['Afval is altijd nutteloos', 'Afval kan opnieuw voedsel worden voor planten', 'Wormen zijn gevaarlijk', 'Composteren duurt te lang'],
            correct: 1,
            uitleg: 'Door te composteren maak je van afval compost — en compost helpt planten groeien.',
          },
        ],
      },
    ],

    midden: [
      {
        week: 1,
        titel: 'Kennismaken & Bouwen: kringloop in actie',
        intro: 'Vandaag ontdek je hoe afval opnieuw voeding wordt — en je bouwt meteen het systeem waarmee je dat gaat onderzoeken: jullie eigen wormenhotel.',
        taken: [
          {
            type: 'bespreek',
            tekst: 'Praat met je groep: wat gooi jij thuis weg? Maak een lijstje van minstens 6 soorten afval. Welke kunnen in een wormenhotel, welke niet? Onderbouw je antwoord.',
          },
          {
            type: 'doe',
            tekst: 'Bouw het wormenhotel stap voor stap. Verdeel de rollen: drainage (gaatjes boren), bedding (karton + aarde), wormen toevoegen, eerste voeding geven. Zorg dat iedereen een taak heeft en weet waarom die stap belangrijk is.',
          },
          {
            type: 'teken',
            tekst: 'Teken de kringloop: appel aan boom → appel valt → wormen/schimmels → compost → nieuwe plant → nieuwe appel. Maak de cirkel compleet. Voeg ook toe: waar past jullie wormenhotel in deze kringloop?',
          },
          {
            type: 'schrijf',
            tekst: 'Schrijf je hypothese op: wat verwacht je de komende weken te zien in het wormenhotel? Hoe snel denk je dat de wormen het voedsel opeten?',
          },
        ],
        reflectie: [
          'Wat is het verschil tussen afval "weggooien" en afval "composteren"?',
          'Waarom is het logisch dat jullie het hotel al in week 1 bouwen?',
        ],
        vragen: [
          {
            vraag: 'Waar past het wormenhotel in de kringloop van de natuur?',
            opties: ['Het vervangt de zon', 'Het zet organisch afval om in compost voor nieuwe planten', 'Het maakt plastic afbreekbaar', 'Het vervangt de bodem volledig'],
            correct: 1,
            uitleg: 'Het wormenhotel versnelt wat de natuur ook doet: organisch afval afbreken en omzetten in voedingsstoffen voor planten.',
          },
          {
            vraag: 'Wat is de rol van de drainagelaag onderaan het hotel?',
            opties: ['Wormen tegenhouden', 'Overtollig water laten weglopen', 'Meer zaden opslaan', 'Warmte vasthouden'],
            correct: 1,
            uitleg: 'Zonder drainage staat het hotel onder water en verdrinken de wormen.',
          },
        ],
      },
      {
        week: 2,
        titel: 'Onderzoeken: wat eten wormen?',
        intro: 'Voor je het wormenhotel bouwt, wil je weten wat wormen lekker vinden — en wat beslist niet. Deze week doe je onderzoek en teken je hoe een wormenhotel er van binnen uitziet.',
        taken: [
          {
            type: 'onderzoek',
            tekst: 'Zoek op (of vraag je begeleider): wat eten wormen WEL en wat eten ze NIET? Maak twee lijsten. Schrijf ook op waarom wormen bepaald voedsel niet lusten (bijv. vlees, citrus, gekookt eten).',
          },
          {
            type: 'doe',
            tekst: 'Test het zelf! Verzamel 4 soorten materiaal: bijv. appelschil, theezakje, broodkorst en droog blad. Leg ze in een vochtig bakje. Bekijk elke dag wat er verandert. Welk materiaal vergaat het snelst?',
          },
          {
            type: 'teken',
            tekst: 'Teken hoe een wormenhotel er van binnen uitziet. Teken de lagen: drainage (bodem met gaatjes), bedding (vochtige grond) en voedsel bovenop. Schrijf bij elke laag wat die laag doet.',
          },
          {
            type: 'schrijf',
            tekst: 'Noteer in je logboek: wat mag er in jullie wormenhotel en wat niet? Schrijf ook op welk materiaal jullie nodig hebben om het te bouwen.',
          },
        ],
        reflectie: [
          'Wat zou er gebeuren als je vlees of gekookt eten in het wormenhotel gooit?',
          'Welk materiaal vergaande het snelst in je experiment, en waarom denk je dat?',
        ],
        vragen: [
          {
            vraag: 'Wat mag je NIET in een wormenhotel gooien?',
            opties: ['Appelschillen', 'Koffiedik', 'Vlees en vis', 'Theezakjes'],
            correct: 2,
            uitleg: 'Wormen lusten geen vlees of vis. Dat trekt ook vliegen aan en gaat stinken.',
          },
          {
            vraag: 'Welke drie lagen heeft een wormenhotel?',
            opties: ['Zand, klei en grind', 'Drainage, bedding en voedsel', 'Water, lucht en aarde', 'Bodem, midden en dak'],
            correct: 1,
            uitleg: 'Onderaan drainage (gaten voor overtollig water), dan bedding (vochtige grond voor de wormen), dan voedsel bovenop.',
          },
        ],
      },
      {
        week: 3,
        titel: 'Eerste observaties & bijsturing',
        intro: 'Na twee weken is het tijd voor een grondige inspectie. Wat zie je? Wat ruik je? Klopt het met je hypothese — en wat moet je aanpassen?',
        taken: [
          {
            type: 'doe',
            tekst: 'Voer een volledige observatie uit: vul het observatieformulier in (vochtigheid, geur, activiteit, geschat aantal wormen). Til voorzichtig wat materiaal opzij om te kijken hoe diep de wormen zitten.',
          },
          {
            type: 'onderzoek',
            tekst: 'Vergelijk je observatie met je hypothese uit week 1. Klopt wat je verwachtte? Zoek op wat een zure geur of ammoniak-geur betekent en hoe je dat oplost.',
          },
          {
            type: 'schrijf',
            tekst: 'Schrijf een korte analyse: wat gaat goed, wat gaat minder goed en waarom? Wat ga je concreet aanpassen — vochtgehalte, hoeveelheid voedsel, type voedsel?',
          },
          {
            type: 'bespreek',
            tekst: 'Bespreek met je groep: zijn jullie observaties hetzelfde? Wie heeft iets anders gezien? Hoe verklaar je de verschillen?',
          },
        ],
        reflectie: [
          'Wat klopte er van je hypothese, en wat niet? Hoe verklaar je dat?',
          'Wat is het verschil tussen een observatie en een mening?',
        ],
        vragen: [
          {
            vraag: 'Wat betekent een ammoniakgeur in het wormenhotel?',
            opties: ['Alles gaat prima', 'Er is te veel stikstofrijk voedsel (bijv. gras of te veel fruit)', 'De wormen zijn actief', 'De grond is te droog'],
            correct: 1,
            uitleg: 'Ammoniakgeur ontstaat als er te veel stikstofrijk materiaal vergaat. Oplossing: minder fruit, meer koolstofrijk materiaal zoals karton of droge bladeren.',
          },
          {
            vraag: 'Wat is het doel van het vergelijken van je observatie met je hypothese?',
            opties: ['Bewijzen dat je gelijk had', 'Leren van wat er echt gebeurt vergeleken met wat je verwachtte', 'De begeleider tevreden stellen', 'Bewijs dat wormen slim zijn'],
            correct: 1,
            uitleg: 'Wetenschap draait om toetsen: je verwachting vergelijken met de werkelijkheid en daarvan leren.',
          },
        ],
      },
      {
        week: 4,
        titel: 'Verzorgen: wormen in de gaten houden',
        intro: 'Het wormenhotel staat! Nu begint het echte werk: goed zorgen voor de wormen en bijhouden wat er elke dag verandert.',
        taken: [
          {
            type: 'doe',
            tekst: 'Voer de wormen elke schooldag: gooi een handje groente- en fruitresten in het hotel. Controleer of de grond vochtig genoeg is (hij moet aanvoelen als een uitgeknepen spons — niet te nat, niet te droog).',
          },
          {
            type: 'onderzoek',
            tekst: 'Controleer het wormenhotel en schrijf op: ruikt het naar bosgrond of naar iets naars? Zie je de wormen bewegen? Hoeveel voedsel is er nog over? Doe dit minstens drie keer deze week.',
          },
          {
            type: 'schrijf',
            tekst: 'Schrijf in je logboek: wat heb je deze week gezien in het wormenhotel? Hoe gaat het met de wormen? Is er iets veranderd ten opzichte van vorige week?',
          },
          {
            type: 'teken',
            tekst: 'Teken een tijdlijn: wat gebeurt er stap voor stap met een groenteschil in het wormenhotel? Dag 1, dag 7, dag 14 — wat zie je veranderen?',
          },
        ],
        reflectie: [
          'Wat valt je op aan de wormen of de grond vergeleken met vorige week?',
          'Wat heb je moeten aanpassen in de verzorging, en waarom?',
        ],
        vragen: [
          {
            vraag: 'Hoe moet de grond in het wormenhotel voelen?',
            opties: ['Kurkdroog, zoals woestijnzand', 'Vochtig, zoals een uitgeknepen spons', 'Zo nat als een plas water', 'Het maakt helemaal niet uit'],
            correct: 1,
            uitleg: 'Wormen hebben vocht nodig om te kunnen ademen door hun huid. Te nat of te droog is allebei slecht.',
          },
          {
            vraag: 'Wat heb je minstens drie keer gecontroleerd en opgeschreven deze week?',
            opties: ['De prijs van het voedsel', 'Geur, wormenactiviteit en hoeveel voedsel er nog is', 'Hoe laat je naar school gaat', 'Het weer buiten'],
            correct: 1,
            uitleg: 'Door steeds dezelfde dingen te controleren zie je goed hoe het wormenhotel verandert.',
          },
        ],
      },
      {
        week: 5,
        titel: 'Oogsten: compost bekijken en gebruiken',
        intro: 'De wormen hebben weken gewerkt. Nu is het tijd om te oogsten! Je haalt de compost eruit en kijkt wat het verschil is met gewone aarde.',
        taken: [
          {
            type: 'doe',
            tekst: 'Oogst de compost: haal voorzichtig de onderste laag uit het wormenhotel. Bekijk hem goed: hoe ziet hij eruit? Hoe ruikt hij? Vergelijk hem naast gewone potgrond of tuinaarde.',
          },
          {
            type: 'onderzoek',
            tekst: 'Maak een eenvoudig experiment: neem twee kleine plantjes of zaden van hetzelfde soort. Geef één jullie compost en de ander gewone potgrond. Kijk na een week: zie je al verschil?',
          },
          {
            type: 'teken',
            tekst: 'Teken de volledige kringloop opnieuw — maar nu met wat je écht hebt meegemaakt: groenteschillen → wormenhotel → compost → plant. Voeg je eigen observaties toe als details.',
          },
          {
            type: 'schrijf',
            tekst: 'Schrijf in je logboek: hoe ziet de compost eruit vergeleken met gewone aarde? Wat ga je ermee doen? Wat heb je geleerd over wat wormen kunnen?',
          },
        ],
        reflectie: [
          'Wat is het verschil tussen jullie compost en gewone potgrond?',
          'Waarom is composteren goed voor de natuur én voor ons?',
        ],
        vragen: [
          {
            vraag: 'Wat zit er in de onderste laag van het wormenhotel als je oogst?',
            opties: ['Nieuwe wormen die je kunt verkopen', 'Compost — de verwerkte resten', 'Plastic afval', 'Zand en grind'],
            correct: 1,
            uitleg: 'De wormen hebben de resten omgezet in compost — dat is een voedingsrijke grondstof voor planten.',
          },
          {
            vraag: 'Wat heb je met twee plantjes getest?',
            opties: ['Of ze van muziek houden', 'Of compost beter is dan gewone potgrond', 'Of ze meer water nodig hebben', 'Of ze in het donker groeien'],
            correct: 1,
            uitleg: 'Door twee plantjes te vergelijken — één met compost, één zonder — zie je of compost een verschil maakt voor de groei.',
          },
        ],
      },
      {
        week: 6,
        titel: 'Afsluiten: wat heb je geleerd?',
        intro: 'Dit is de laatste week. Je kijkt terug op alles wat je gedaan en geleerd hebt en laat het zien aan anderen.',
        taken: [
          {
            type: 'bespreek',
            tekst: 'Praat met je groep: wat zijn de drie belangrijkste dingen die jullie hebben geleerd over wormen, afval en kringlopen? Schrijf ze op.',
          },
          {
            type: 'teken',
            tekst: 'Maak een poster, een tekening of een korte video die laat zien hoe een wormenhotel werkt. Zorg dat andere leerlingen het kunnen begrijpen — gebruik plaatjes en korte zinnen.',
          },
          {
            type: 'schrijf',
            tekst: 'Schrijf je eindreflectie in je logboek: Wat ging goed? Wat was moeilijk? Wat zou je een volgende keer anders doen? Wat ga je thuis misschien anders doen met afval?',
          },
          {
            type: 'doe',
            tekst: 'Presenteer jullie wormenhotel aan de klas. Laat zien: het hotel zelf, de compost die jullie hebben gemaakt, en het belangrijkste dat jullie hebben geleerd.',
          },
        ],
        reflectie: [
          'Waarom denk jij dat composteren goed is voor de aarde?',
          'Wat ga je thuis anders doen na dit project?',
        ],
        vragen: [
          {
            vraag: 'Wat laat je zien bij de eindpresentatie?',
            opties: ['Alleen een tekening van een worm', 'Het wormenhotel, de compost en wat je hebt geleerd', 'Een PowerPoint van 50 dia\'s', 'Niets — de docent doet het'],
            correct: 1,
            uitleg: 'Bij de presentatie laat je het hotel zien, de compost die jullie hebben gemaakt en het belangrijkste dat je hebt geleerd.',
          },
          {
            vraag: 'Wat is de grootste les van dit project?',
            opties: ['Afval is altijd nutteloos en gevaarlijk', 'Organisch afval kan via wormen voeding worden voor planten', 'Wormen zijn eng en moeten vermeden worden', 'Composteren duurt te lang om nuttig te zijn'],
            correct: 1,
            uitleg: 'Door te composteren maak je van keukenafval iets waardevols: compost die planten helpt groeien.',
          },
        ],
      },
    ],

  },

  // ════════════════════════════════════════════════════════════════════════════
  keuringsdienst: {

    midden: [
      {
        week: 1,
        titel: 'Introductie: het experiment opzetten',
        intro: 'Jullie gaan onderzoeken of compostthee beter is voor planten dan kunstmest — of helemaal niets. Deze week zet je het experiment op en bedenk je wat je verwacht.',
        taken: [
          {
            type: 'bespreek',
            tekst: 'Bespreek met je groep: wat denken jullie dat er met planten gebeurt als je kunstmest geeft? En als je compostthee geeft? En als je niets geeft? Schrijf jullie verwachting op.',
          },
          {
            type: 'onderzoek',
            tekst: 'Zoek op (of vraag je begeleider): wat zit er in kunstmest en wat is compostthee? Schrijf in eigen woorden op wat het verschil is tussen de twee.',
          },
          {
            type: 'doe',
            tekst: 'Zet het experiment op: zorg voor drie potten met dezelfde potgrond en hetzelfde aantal zaden. Zet ze op dezelfde plek. Pot 1 = niets, pot 2 = kunstmest, pot 3 = compostthee. Schrijf op de potten welke welke is.',
          },
          {
            type: 'doe',
            tekst: 'Geef meteen de eerste voeding:\n• Pot 2 (kunstmest): los 1 gram kunstmest op in 1 liter water. Geef 50 ml van deze oplossing aan pot 2.\n• Pot 3 (compostthee): roer 2–3 eetlepels SYBASoil Worm Castings door 1 liter water, laat 30 minuten staan en zeef het. Geef 50 ml van dit theewater aan pot 3.\n• Pot 1 (controle): geef alleen 50 ml gewoon water.\nNoteer hoeveel je hebt toegevoegd en om hoe laat.',
          },
        ],
        reflectie: [
          'Waarom is het belangrijk dat alle drie de potten dezelfde hoeveelheid water en licht krijgen?',
          'Wat is het doel van de pot zonder toevoeging?',
        ],
        vragen: [
          {
            vraag: 'Waarom krijgt pot 1 niets toegevoegd?',
            opties: ['Omdat pot 1 kapot is', 'Zodat je kunt vergelijken wat er zonder toevoeging gebeurt', 'Omdat kunstmest te duur is', 'Zodat pot 1 sneller groeit'],
            correct: 1,
            uitleg: 'Pot 1 is de controlepot. Die laat zien wat er normaal zou gebeuren — zo kun je het effect van kunstmest en compostthee vergelijken.',
          },
          {
            vraag: 'Wat is compostthee?',
            opties: ['Een thee gemaakt van theeblaadjes uit de tuin', 'Een vloeibare voeding gemaakt van gerijpte compost', 'Gewoon water met suiker', 'Een mengsel van kunstmest en water'],
            correct: 1,
            uitleg: 'Compostthee wordt gemaakt door compost in water te weken. Het bevat bacteriën en voedingsstoffen die van nature in de bodem zitten.',
          },
        ],
      },
      {
        week: 2,
        titel: 'Eerste observaties: kiemen de zaden al?',
        intro: 'Je experiment staat! Nu begint het bijhouden. Kijk elke dag goed naar de potten en schrijf op wat je ziet.',
        taken: [
          {
            type: 'doe',
            tekst: 'Wekelijkse voeding (doe dit elke week op dezelfde dag):\n• Pot 2: 50 ml kunstmestoplossing (1 g/L water)\n• Pot 3: 50 ml compostthee (2–3 eetlepels Worm Castings per liter, zeven)\n• Pot 1: 50 ml gewoon water\nDe rest van de week geven alle potten alleen gewoon water.',
          },
          {
            type: 'onderzoek',
            tekst: 'Kijk elke dag naar de drie potten: kiemen er al zaden? Welke pot kiemt het eerst? Schrijf dit elke dag op met de datum erbij.',
          },
          {
            type: 'schrijf',
            tekst: 'Maak een eenvoudig meetformulier dat je elke week gebruikt: datum, pot (1/2/3), hoogte in cm, bladkleur (lichtgroen/donkergroen/geel), hoe de plant er uitziet. Gebruik dit formulier de rest van het project.',
          },
          {
            type: 'bespreek',
            tekst: 'Bespreek met je groep: wat verwachten jullie te zien in de komende weken? Gaat er een pot beter of slechter groeien? Waarom?',
          },
        ],
        reflectie: [
          'Wat zou er misgaan als je de ene pot meer water geeft dan de andere?',
          'Hoe zorg je ervoor dat je elke week op dezelfde manier meet?',
        ],
        vragen: [
          {
            vraag: 'Waarom schrijf je bij elke meting de datum op?',
            opties: ['Voor de zekerheid', 'Zodat je later kunt zien hoeveel dagen er tussen metingen zitten', 'De leraar vraagt er om', 'Het maakt niet uit'],
            correct: 1,
            uitleg: 'Met data erbij kun je achteraf precies zien wanneer iets veranderde — dat maakt je onderzoek betrouwbaarder.',
          },
          {
            vraag: 'Wat noteer je bij elke wekelijkse meting?',
            opties: ['Alleen de hoogte', 'Datum, hoogte, bladkleur en hoe de plant eruitziet', 'Alleen de kleur', 'Alleen of de plant nog leeft'],
            correct: 1,
            uitleg: 'Door steeds dezelfde dingen te noteren kun je goed vergelijken wat er van week tot week verandert.',
          },
        ],
      },
      {
        week: 3,
        titel: 'Meten: hoe groeien de planten?',
        intro: 'Tijd voor de echte metingen! Je meet alle planten op dezelfde manier en schrijft alles nauwkeurig op.',
        taken: [
          {
            type: 'doe',
            tekst: 'Wekelijkse voeding:\n• Pot 2: 50 ml kunstmestoplossing (1 g/L water)\n• Pot 3: 50 ml compostthee (2–3 eetlepels Worm Castings per liter, zeven)\n• Pot 1: 50 ml gewoon water',
          },
          {
            type: 'doe',
            tekst: 'Meet alle planten met je meetformulier. Meet de hoogte altijd vanaf de grond tot het hoogste blad. Schrijf ook de bladkleur op en hoe de plant er in het algemeen uitziet.',
          },
          {
            type: 'teken',
            tekst: 'Maak een lijndiagram: zet de weken op de x-as (horizontaal) en de hoogte in cm op de y-as (verticaal). Teken een lijn voor elk van de drie potten. Gebruik verschillende kleuren.',
          },
          {
            type: 'schrijf',
            tekst: 'Beschrijf wat je tot nu toe ziet in je logboek: welke pot groeit het snelst? Zijn er al duidelijke kleurverschillen? Wat valt je op?',
          },
        ],
        reflectie: [
          'Wat is het verschil tussen zeggen "de plant ziet er goed uit" en "de plant is 8 cm hoog"?',
          'Welke van de twee is nuttiger voor je onderzoek, en waarom?',
        ],
        vragen: [
          {
            vraag: 'Waarom meet je de hoogte altijd op dezelfde manier?',
            opties: ['Dat is makkelijker', 'Zodat de metingen eerlijk te vergelijken zijn', 'De leraar zegt het', 'Maakt niet uit'],
            correct: 1,
            uitleg: 'Als je elke keer anders meet, kloppen de vergelijkingen niet meer. Consistentie is de basis van goed meten.',
          },
          {
            vraag: 'Wat teken je in je lijndiagram?',
            opties: ['Alleen de hoogste plant', 'De groei van alle drie de potten over de weken heen', 'Hoe de potten eruitzien', 'De hoeveelheid water die je hebt gegeven'],
            correct: 1,
            uitleg: 'Met een lijndiagram zie je in één oogopslag hoe elk van de drie potten door de tijd heen groeide.',
          },
        ],
      },
      {
        week: 4,
        titel: 'Verdieping: wat doet de bodem?',
        intro: 'Je experiment loopt goed. Deze week kijk je verder dan alleen de groei — je onderzoekt wat er in de bodem en de wortels gebeurt.',
        taken: [
          {
            type: 'doe',
            tekst: 'Wekelijkse voeding:\n• Pot 2: 50 ml kunstmestoplossing (1 g/L water)\n• Pot 3: 50 ml compostthee (2–3 eetlepels Worm Castings per liter, zeven)\n• Pot 1: 50 ml gewoon water',
          },
          {
            type: 'onderzoek',
            tekst: 'Zoek op: hoe nemen plantenwortels voedingsstoffen op? Wat doen bacteriën in de bodem? Schrijf in eigen woorden op wat je hebt gevonden.',
          },
          {
            type: 'doe',
            tekst: 'Voer de wekelijkse meting uit. Als je voorzichtig één plantje kunt losmaken, bekijk dan de wortels: zijn ze wit en fijn, of bruin en dun? Leg ze daarna terug.',
          },
          {
            type: 'schrijf',
            tekst: 'Schrijf op: als kunstmest sneller werkt, betekent dat dan ook dat het beter is? Wat denk jij, en waarom? Denk ook aan wat er op lange termijn met de bodem kan gebeuren.',
          },
        ],
        reflectie: [
          'Welke effecten van kunstmest zie je niet in jullie kleine pottenexperiment?',
          'Wat zou je anders doen als je meer tijd had voor dit onderzoek?',
        ],
        vragen: [
          {
            vraag: 'Wat kunnen bacteriën in de bodem doen voor planten?',
            opties: ['Ze eten de wortels op', 'Ze helpen voedingsstoffen beschikbaar te maken voor de plant', 'Ze maken de grond harder', 'Ze hebben geen effect'],
            correct: 1,
            uitleg: 'Bacteriën breken organisch materiaal af en zetten dat om in stoffen die planten kunnen opnemen via hun wortels.',
          },
          {
            vraag: 'Wat schrijf je op als je de wortels van een plant bekijkt?',
            opties: ['Niets, wortels zijn niet belangrijk', 'Hoe ze eruitzien: kleur, dikte, hoeveelheid', 'Alleen hoeveel wortels er zijn', 'Of ze lekker ruiken'],
            correct: 1,
            uitleg: 'Wortels vertellen je veel over de gezondheid van een plant: witte, fijne wortels zijn een goed teken.',
          },
        ],
      },
      {
        week: 5,
        titel: 'Oogsten en vergelijken',
        intro: 'De radijsjes zijn klaar om geoogst te worden! Je meet, weegt en vergelijkt de resultaten van de drie potten.',
        taken: [
          {
            type: 'doe',
            tekst: 'Oogst alle radijsjes. Meet per plant de lengte van het loof (groen gedeelte) en de diameter van de bol. Schrijf alles op per pot.',
          },
          {
            type: 'doe',
            tekst: 'Doe een smaaktest: proeven de radijsjes uit de drie potten anders? Beschrijf het verschil (pittig, mild, zacht, hard). Dit is ook een echte observatie!',
          },
          {
            type: 'teken',
            tekst: 'Maak een eenvoudig staafdiagram: zet de drie potten naast elkaar en toon de gemiddelde bol-diameter per pot. Geef de staven een andere kleur per pot.',
          },
          {
            type: 'schrijf',
            tekst: 'Schrijf op: welke pot leverde de grootste of mooiste radijsjes? Klopt dit met wat je in week 1 had verwacht? Wat verraste je?',
          },
        ],
        reflectie: [
          'Welke pot groeide het beste? Hoe weet je dat?',
          'Betekent "het snelst groeien" ook hetzelfde als "het beste resultaat"? Waarom wel of niet?',
        ],
        vragen: [
          {
            vraag: 'Wat doe je bij een smaaktest in dit experiment?',
            opties: ['Je proeft welke compostthee het lekkerst is', 'Je vergelijkt de smaak van de radijsjes uit de drie potten', 'Je proeft de potgrond', 'Je controleert of het water schoon is'],
            correct: 1,
            uitleg: 'Smaak is ook een meetbare eigenschap. Door de radijsjes uit de drie potten te proeven, zie je of de voeding ook effect heeft op de smaak.',
          },
          {
            vraag: 'Wat laat een staafdiagram zien?',
            opties: ['Hoe de plant er uitziet', 'Een vergelijking tussen de drie potten op één meetmoment', 'Hoe de plant door de tijd heen groeit', 'Hoeveel water je hebt gebruikt'],
            correct: 1,
            uitleg: 'Een staafdiagram is handig om waarden naast elkaar te vergelijken — in dit geval de drie potten op het moment van oogsten.',
          },
        ],
      },
      {
        week: 6,
        titel: 'Conclusie en presentatie',
        intro: 'Jullie experiment is klaar. Nu trek je conclusies en presenteer je jullie bevindingen.',
        taken: [
          {
            type: 'schrijf',
            tekst: 'Schrijf jullie conclusie op: herhaal de vraag ("Wat doet compostthee met plantengroei?"), geef het antwoord op basis van jullie metingen, en vergelijk het met jullie verwachting van week 1. Klopt het?',
          },
          {
            type: 'doe',
            tekst: 'Maak een presentatie: video, poster of live. Laat zien: de onderzoeksvraag, hoe jullie hebben gemeten, de belangrijkste resultaten (gebruik je diagram) en de conclusie.',
          },
          {
            type: 'bespreek',
            tekst: 'Bekijk de presentatie van een andere groep. Geef twee reacties: wat vinden jullie sterk aan hun onderzoek, en wat hadden zij (of jullie zelf) anders kunnen doen?',
          },
        ],
        reflectie: [
          'Wat leer je van dit experiment over hoe wetenschappers onderzoek doen?',
          'Wat ga jij persoonlijk anders doen met afval of plantenvoeding na dit project?',
        ],
        vragen: [
          {
            vraag: 'Wat zit er altijd in een goede conclusie?',
            opties: ['Alleen wat je hebt gemeten', 'De onderzoeksvraag, het antwoord op basis van data, en een vergelijking met de verwachting', 'Een mooie tekening', 'Een lijst van materialen'],
            correct: 1,
            uitleg: 'Een conclusie beantwoordt de vraag waarmee je begon, onderbouwt dat met wat je hebt gemeten en kijkt terug op je beginverwachting.',
          },
          {
            vraag: 'Wat laat je zien in je presentatie?',
            opties: ['Alleen de grafiek', 'Onderzoeksvraag, metingen, diagram en conclusie', 'Alleen de conclusie', 'Een foto van de planten'],
            correct: 1,
            uitleg: 'Een goede presentatie neemt de kijker mee van vraag tot conclusie — met de data als bewijs daartussenin.',
          },
        ],
      },
    ],

    havo: [
      {
        week: 1,
        titel: 'Introductie: onderzoeksvraag en hypothese opstellen',
        intro: 'Jullie gaan een echt wetenschappelijk experiment uitvoeren. Maar goed onderzoek begint met een goede vraag en een duidelijke verwachting. Die stel je deze week op — en je geeft meteen de eerste voeding aan de potten.',
        taken: [
          {
            type: 'denk',
            tekst: 'Lees de centrale onderzoeksvraag: "Wat doet compostthee met plantengroei vergeleken met kunstmest en niets?" Welke deelvragen kun je hierbij bedenken? Schrijf er minstens twee op.',
          },
          {
            type: 'onderzoek',
            tekst: 'Zoek op: wat zit er in kunstmest en wat zit er in compostthee? Welke voedingsstoffen hebben planten nodig? Hoe denk je dat elk product de plantengroei beïnvloedt?',
          },
          {
            type: 'doe',
            tekst: 'Zet het experiment op: drie potten met dezelfde potgrond, hetzelfde aantal zaden, op dezelfde plek. Noteer precies hoeveel grond je gebruikt en hoeveel zaden je zaait per pot.',
          },
          {
            type: 'schrijf',
            tekst: 'Schrijf je hypothese op voor elke pot: "Ik verwacht dat pot X ... groeit, omdat..." Schrijf er ook bij hoe je dit gaat meten (bijv. hoogte in cm elke week).',
          },
          {
            type: 'doe',
            tekst: 'Geef nu meteen de eerste voeding:\n• Pot 2 (kunstmest): los 1 gram kunstmest op in 1 liter water. Geef 50 ml van deze oplossing aan pot 2.\n• Pot 3 (compostthee): roer 2–3 eetlepels SYBASoil Worm Castings door 1 liter water, laat 30 minuten staan en zeef het. Geef 50 ml van dit theewater aan pot 3.\n• Pot 1 (controle): geef alleen 50 ml gewoon water.\nNoteer exact: hoeveelheid, tijdstip en eventuele observaties.',
          },
        ],
        reflectie: [
          'Waarom is het belangrijk dat alle drie de potten dezelfde hoeveelheid water en licht krijgen?',
          'Wat is het doel van de pot zonder toevoeging (de controlepot)?',
        ],
        vragen: [
          {
            vraag: 'Wat heb je deze week als eerste opgeschreven voor het experiment?',
            opties: ['De eindresultaten', 'Deelvragen en je hypothese per pot', 'De naam van het zaad', 'Hoeveel water de potten krijgen'],
            correct: 1,
            uitleg: 'Je hebt deelvragen bedacht bij de centrale onderzoeksvraag en een hypothese opgeschreven voor elke pot.',
          },
          {
            vraag: 'Waarom krijgen alle drie de potten dezelfde hoeveelheid water en licht?',
            opties: ['Om te besparen op water', 'Zodat water en licht geen invloed hebben op het verschil', 'Omdat de leraar dat zegt', 'Om de planten sneller te laten groeien'],
            correct: 1,
            uitleg: 'Door water en licht gelijk te houden, zie je alleen het effect van de toevoeging — niet van iets anders.',
          },
        ],
      },
      {
        week: 2,
        titel: 'Eerste metingen en observaties',
        intro: 'Het experiment loopt! Tijd voor je eerste nauwkeurige metingen. Goede data begint bij een vaste methode die je elke week herhaalt.',
        taken: [
          {
            type: 'doe',
            tekst: 'Wekelijkse voeding:\n• Pot 2: 50 ml kunstmestoplossing (1 g/L water)\n• Pot 3: 50 ml compostthee (2–3 eetlepels Worm Castings per liter, zeven)\n• Pot 1: 50 ml gewoon water',
          },
          {
            type: 'onderzoek',
            tekst: 'Kijk elke dag of er zaadjes ontkiemen. Schrijf op: welke pot ontkiemt als eerste? Hoeveel zaadjes groeien er op in elke pot? Noteer datum en pot.',
          },
          {
            type: 'schrijf',
            tekst: 'Maak een observatieformulier dat je elke week gebruikt: datum, pot (1/2/3), hoogte (cm), bladkleur (licht/donkergroen/geel), aantal blaadjes, overige opmerkingen.',
          },
          {
            type: 'denk',
            tekst: 'Bedenk: welke rol spelen bacteriën in compostthee? Op welke manier kunnen ze de plant helpen, naast het geven van voedingsstoffen? Schrijf twee mogelijkheden op.',
          },
        ],
        reflectie: [
          'Wat zou er misgaan als je de ene pot meer water geeft dan de andere?',
          'Hoe zorg je ervoor dat je elke week op dezelfde manier meet?',
        ],
        vragen: [
          {
            vraag: 'Welke pot heeft vorige week compostthee gekregen?',
            opties: ['Pot 1', 'Pot 2', 'Pot 3', 'Alle potten'],
            correct: 2,
            uitleg: 'Pot 2 krijgt kunstmest en pot 3 de compostthee. Pot 1 blijft controlepot.',
          },
          {
            vraag: 'Wat heb je elke dag bijgehouden over de zaden?',
            opties: ['De kleur van de pot', 'Welke pot als eerste ontkiemde en hoeveel zaden opgingen', 'De temperatuur van de kamer', 'Het aantal dagen dat het heeft geregend'],
            correct: 1,
            uitleg: 'Door datum en pot te noteren bij elke ontkieming kun je later vergelijken welke conditie het snelst kiemde.',
          },
        ],
      },
      {
        week: 3,
        titel: 'Meten: systematisch waarnemen',
        intro: 'Goede wetenschap vraagt nauwkeurige metingen. Deze week leer je hoe je data verzamelt op een manier die je echt kunt vergelijken.',
        taken: [
          {
            type: 'doe',
            tekst: 'Wekelijkse voeding:\n• Pot 2: 50 ml kunstmestoplossing (1 g/L water)\n• Pot 3: 50 ml compostthee (2–3 eetlepels Worm Castings per liter, zeven)\n• Pot 1: 50 ml gewoon water',
          },
          {
            type: 'doe',
            tekst: 'Meet elke plant met je observatieformulier. Gebruik altijd dezelfde meetmethode: meet altijd vanaf de bodem van de pot omhoog. Noteer ook het tijdstip van meten. Tip: als je meerdere zaden per pot hebt geplant, kun je in week 4 voorzichtig één radijsje uitrekken zonder het experiment te verstoren.',
          },
          {
            type: 'teken',
            tekst: 'Maak een lijndiagram van de groei van week 1 t/m nu. Zet de weken op de x-as en de gemiddelde hoogte per pot op de y-as. Gebruik drie kleuren voor de drie potten.',
          },
          {
            type: 'onderzoek',
            tekst: 'Vergelijk je drie potten met die van een andere groep. Zijn er verschillen? Hoe verklaar je die? Welke omstandigheid was bij hen anders?',
          },
          {
            type: 'schrijf',
            tekst: 'Schrijf een korte tussentijdse analyse: zijn er al duidelijke verschillen tussen de potten? Klopt dit met je hypothese? Als het niet klopt, wat zou een andere verklaring zijn?',
          },
        ],
        reflectie: [
          'Wat is het verschil tussen zeggen "de plant ziet er goed uit" en "de plant is 8,4 cm hoog"? Welke is nuttiger voor een onderzoek?',
          'Hoe vaak zou je moeten meten voor de betrouwbaarste resultaten?',
        ],
        vragen: [
          {
            vraag: 'Waarom meet je altijd vanaf de bodem van de pot omhoog?',
            opties: ['Dat is makkelijker te onthouden', 'Zodat alle metingen hetzelfde startpunt hebben', 'Omdat de pot altijd even groot is', 'Dat heeft geen reden'],
            correct: 1,
            uitleg: 'Hetzelfde startpunt zorgt dat metingen van week tot week eerlijk te vergelijken zijn.',
          },
          {
            vraag: 'Wat heb je gedaan nadat je alle metingen in een diagram had gezet?',
            opties: ['Het experiment gestopt', 'Een tussentijdse analyse geschreven en vergeleken met je hypothese', 'De potten omgewisseld', 'Extra water gegeven aan alle potten'],
            correct: 1,
            uitleg: 'Je hebt een analyse geschreven: kloppen de metingen met je hypothese en wat is een alternatieve verklaring als dat niet zo is.',
          },
        ],
      },
      {
        week: 4,
        titel: 'Verdieping: wat gebeurt er in de bodem?',
        intro: 'Terwijl de planten groeien, verdiep je je in de wetenschap. Wat gebeurt er precies in de bodem als je kunstmest of compostthee toevoegt?',
        taken: [
          {
            type: 'doe',
            tekst: 'Wekelijkse voeding:\n• Pot 2: 50 ml kunstmestoplossing (1 g/L water)\n• Pot 3: 50 ml compostthee (2–3 eetlepels Worm Castings per liter, zeven)\n• Pot 1: 50 ml gewoon water',
          },
          {
            type: 'onderzoek',
            tekst: 'Zoek op hoe plantenwortels voedingsstoffen opnemen. Wat zijn wortelharen? Waarom moeten voedingsstoffen opgelost zijn in water? Hoe helpt dit verklaren waarom compostthee (vloeibaar) snel werkt? Welke rol spelen bacteriën in compostthee? Op welke manier kunnen ze de plant helpen naast het geven van voedingsstoffen?',
          },
          {
            type: 'doe',
            tekst: 'Voer de wekelijkse meting uit. Kijk ook naar de wortels als je voorzichtig één plantje kunt lostrekken: hoe zien de wortels eruit bij elk van de drie condities? Zijn er verschillen in dikte of vertakking?',
          },
          {
            type: 'denk',
            tekst: 'Stel: kunstmest geeft snellere groei dan compostthee in jullie experiment. Betekent dat dan dat kunstmest "beter" is? Bedenk minstens twee redenen waarom dat niet per se zo is.',
          },
          {
            type: 'schrijf',
            tekst: 'Schrijf in ongeveer 100 woorden: waarom is compostthee op lange termijn mogelijk beter voor de bodem dan kunstmest, ook als de korte-termijn plantengroei vergelijkbaar is?',
          },
        ],
        reflectie: [
          'Welke effecten van kunstmest zou je niet zien in jullie kleine pottenexperiment, maar wel in een echt veld?',
          'Hoe zou je kunnen meten of de bodem zelf gezonder is geworden, niet alleen de plant?',
        ],
        vragen: [
          {
            vraag: 'Wat heb je deze week bekeken aan de wortels van een radijsje?',
            opties: ['De kleur van het blad', 'Hoe de wortels eruitzien bij elk van de drie condities', 'Het gewicht van de pot', 'De temperatuur van de grond'],
            correct: 1,
            uitleg: 'Je hebt voorzichtig een radijsje uitgetrokken en de wortels vergeleken op dikte en vertakking per conditie.',
          },
          {
            vraag: 'Wat heb je geschreven over kunstmest als het meer groei gaf dan compostthee?',
            opties: ['Dat kunstmest altijd beter is', 'Dat snellere groei niet meteen betekent dat kunstmest "beter" is', 'Dat compostthee niet werkt', 'Dat je het experiment opnieuw moet doen'],
            correct: 1,
            uitleg: 'Je hebt twee redenen bedacht waarom meer groei niet automatisch "beter" betekent, bijvoorbeeld door effecten op de bodem.',
          },
        ],
      },
      {
        week: 5,
        titel: 'Oogsten en analyseren',
        intro: 'De radijsjes mogen geoogst worden. Je verzamelt je einddata, vergelijkt alle metingen en trekt een eerste conclusie.',
        taken: [
          {
            type: 'doe',
            tekst: 'Oogst alle radijsjes. Meet per plant: lengte loof (cm), diameter bol (cm), gewicht bol (gram als je een weegschaal hebt). Leg de drie radijsjes naast elkaar en maak een foto.',
          },
          {
            type: 'doe',
            tekst: 'Doe een smaaktest: proeven de radijsjes uit de drie potten anders? Beschrijf het verschil in smaak, stevigheid en grootte.',
          },
          {
            type: 'teken',
            tekst: 'Maak een staafdiagram van de eindmeting (bijv. gemiddeld gewicht per conditie). Schrijf boven de grafiek: wat laat deze grafiek zien?',
          },
          {
            type: 'onderzoek',
            tekst: 'Vergelijk alle meetpunten van week 1 t/m 5. Welke pot groeide het snelst? Welke radijs is het grootst? Zijn er resultaten die je verrassen?',
          },
          {
            type: 'schrijf',
            tekst: 'Schrijf een eerste conclusie: welke toevoeging werkte het beste? Klopt dit met je hypothese? Wat is een mogelijke verklaring? Noem ook één ding dat je niet zeker weet.',
          },
        ],
        reflectie: [
          'Je hebt drie potten gebruikt. Mag je op basis daarvan een algemene uitspraak doen over compostthee? Waarom wel of niet?',
          'Welke meting had je nog willen doen als je meer tijd had?',
        ],
        vragen: [
          {
            vraag: 'Wat meet je bij elk radijsje tijdens de oogst?',
            opties: ['Alleen de kleur van de bol', 'Lengte loof, diameter bol, gewicht bol en hoe de wortels eruitzien', 'Alleen het gewicht', 'De geur van de potgrond'],
            correct: 1,
            uitleg: 'Meerdere meetpunten geven een volledig en vergelijkbaar beeld van het effect van elke toevoeging.',
          },
          {
            vraag: 'Welke pot had de grootste radijs? Hoe kom je daarachter?',
            opties: ['Door te raden', 'Door je staafdiagram van het eindgewicht te bekijken', 'Door alle radijsjes te proeven', 'Dat kun je niet weten'],
            correct: 1,
            uitleg: 'Je hebt een staafdiagram gemaakt van het gemiddeld gewicht per conditie — daarin zie je direct welke pot het hoogst scoorde.',
          },
        ],
      },
      {
        week: 6,
        titel: 'Conclusie, verklaringen & presenteren',
        intro: 'De laatste week: je brengt alles samen. Je formuleert verklaringen voor je data, schrijft een onderbouwde conclusie en presenteert jullie bevindingen in de stijl van Keuringsdienst van Waarde.',
        taken: [
          {
            type: 'denk',
            tekst: 'Bedenk voor elk verschil dat je hebt gevonden minstens twee mogelijke verklaringen. Welke past het beste bij wat je weet over voedingsstoffen, bodemleven en wortelwerking? Verbind je bevindingen ook aan een groter thema (bijv. stikstofvervuiling, circulaire landbouw) met één concreet voorbeeld uit de echte wereld.',
          },
          {
            type: 'schrijf',
            tekst: 'Schrijf een complete conclusie (max. 150 woorden): herhaal de onderzoeksvraag, geef de resultaten, geef een verklaring, en schrijf wat je zou doen als je het experiment opnieuw mocht doen.',
          },
          {
            type: 'doe',
            tekst: 'Maak de definitieve presentatie: video, reportage of live. Verwerk hierin: jullie onderzoeksvraag, hoe het experiment werkte, de metingen, de eindresultaten en jullie conclusie. Zorg dat het duidelijk is voor iemand die er niets van weet.',
          },
          {
            type: 'bespreek',
            tekst: 'Bekijk de presentatie van een andere groep. Geef twee reacties: wat vinden jullie sterk, en één vraag over hun conclusie of aanpak. Schrijf daarna je persoonlijke eindreflectie: wat leerde je over onderzoek doen?',
          },
        ],
        reflectie: [
          'Wat is het verschil tussen een mening en een conclusie die je kunt onderbouwen met data?',
          'Hoe heeft dit project jouw kijk op voedsel, landbouw en bodemkwaliteit veranderd?',
        ],
        vragen: [
          {
            vraag: 'Wat heb je in je conclusie als eerste herhaald?',
            opties: ['De naam van jullie groep', 'De onderzoeksvraag', 'De hoeveelheid water per pot', 'De datum van de oogst'],
            correct: 1,
            uitleg: 'Een goede conclusie begint met de onderzoeksvraag, gevolgd door resultaten, verklaring en wat je anders zou doen.',
          },
          {
            vraag: 'Wat was het doel van de eindpresentatie in de stijl van Keuringsdienst van Waarde?',
            opties: ['Zo lang mogelijk praten', 'Jullie onderzoeksvraag, aanpak, resultaten en conclusie helder uitleggen', 'Alleen de grafiek laten zien', 'Vertellen dat compostthee beter is'],
            correct: 1,
            uitleg: 'De presentatie laat zien wat jullie hebben onderzocht, hoe het werkte en wat jullie hebben ontdekt — begrijpelijk voor iemand die er niets van weet.',
          },
        ],
      },
    ],
  },
}
