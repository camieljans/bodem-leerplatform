// ─── Opdrachten per project per niveau ────────────────────────────────────────
// Niveaugroepen: basis (PRO/VMBO-B) | midden (VMBO-K/VMBO-TL) | havo (HAVO/VWO)
// Taaktypen: bespreek | onderzoek | doe | schrijf | teken | denk

export const opdrachten = {

  // ════════════════════════════════════════════════════════════════════════════
  wormenhotel: {

    basis: [
      {
        week: 1,
        titel: 'Kennismaken: afval en de natuur',
        intro: 'Deze week start jullie project. Je gaat leren dat afval niet zomaar "weg" is — het kan opnieuw gebruikt worden. Wormen helpen daarbij!',
        taken: [
          {
            type: 'bespreek',
            tekst: 'Praat met je groep: welk afval gooi jij thuis weg? Maak een lijstje van minstens 5 soorten afval. Welke zijn van planten of dieren afkomstig?',
          },
          {
            type: 'teken',
            tekst: 'Teken een simpele tekening van wat jij denkt dat er met een appel gebeurt als hij op de grond valt in het bos. Wat zie je na 1 dag? Na 1 week? Na 1 jaar?',
          },
          {
            type: 'doe',
            tekst: 'Ga buiten zoeken naar regenwormen! Kijk onder stenen of in vochtige aarde. Hoeveel vind je? Hoe bewegen ze? Schrijf op wat je ziet.',
          },
          {
            type: 'schrijf',
            tekst: 'Schrijf in je logboek: wat weet je al over wormen en composteren? En wat wil je graag leren tijdens dit project?',
          },
        ],
        reflectie: [
          'Wat vind jij het meest verrassende aan regenwormen?',
          'Waarom denk je dat het goed is om afval opnieuw te gebruiken?',
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
      },
      {
        week: 3,
        titel: 'Bouwen: het wormenhotel',
        intro: 'Deze week bouwen jullie jullie eigen wormenhotel! Zorg dat iedereen een taak heeft.',
        taken: [
          {
            type: 'doe',
            tekst: 'Verdeel de taken in de groep: wie maakt de gaten (drainage), wie legt de bedding, wie voegt de wormen toe, wie doet het eerste voedsel erin? Bouw het wormenhotel stap voor stap.',
          },
          {
            type: 'teken',
            tekst: 'Maak een foto of tekening van jullie afgewerkte wormenhotel. Schrijf erbij welke laag wat doet.',
          },
          {
            type: 'schrijf',
            tekst: 'Maak een "verzorgingsschema": wie voedt de wormen op welke dag? Wat gaan jullie erin gooien? Schrijf dit op en hang het naast het wormenhotel.',
          },
          {
            type: 'bespreek',
            tekst: 'Overleg: hoe weten jullie dat de wormen het naar hun zin hebben? Maak een lijstje van tekenen dat het goed gaat (goede geur, actieve wormen, enz.).',
          },
        ],
        reflectie: [
          'Wat was het moeilijkste aan het bouwen?',
          'Waar moet je op letten bij het verzorgen van de wormen?',
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
      },
    ],

    midden: [
      {
        week: 1,
        titel: 'Introductie: kringlopen en circulariteit',
        intro: 'Dit project draait om één grote vraag: hoe kunnen wij ons eigen afval omzetten in iets waardevols voor de natuur? Je onderzoekt de kringloop van organisch materiaal en wat circulariteit betekent.',
        taken: [
          {
            type: 'denk',
            tekst: 'Wat is het verschil tussen een lineaire en een circulaire economie? Geef een eigen voorbeeld van elk. Bespreek met je groep: welk systeem gebruikt jullie school of thuis?',
          },
          {
            type: 'onderzoek',
            tekst: 'Onderzoek welk afval er op jullie school wordt weggegooid. Vraag bij de keuken of conciërge. Schat hoeveel GFT-afval er per week is. Reken uit: als dat allemaal gecomposteerd wordt, hoeveel compost levert dat op?',
          },
          {
            type: 'doe',
            tekst: 'Ga buiten en zoek drie plekken waar je ziet dat de natuur zelf "composteert" (dode bladeren, rottend hout, schimmels op stronken). Fotografeer en beschrijf wat je ziet.',
          },
          {
            type: 'schrijf',
            tekst: 'Formuleer een persoonlijke onderzoeksvraag die jij wilt beantwoorden tijdens dit project. Begin met "Ik wil weten..." of "Hoe komt het dat...". Noteer ook je verwachtingen (hypothese).',
          },
        ],
        reflectie: [
          'Hoe sluit een wormenhotel aan op het idee van een circulaire economie?',
          'Welke voordelen zie jij van lokale compostering ten opzichte van industriële afvalverwerking?',
        ],
      },
      {
        week: 2,
        titel: 'Onderzoek: bodem en bodemleven',
        intro: 'Voor je het wormenhotel bouwt, verdiep je je in de wetenschap achter compostering: wat zijn micro-organismen, hoe werken zij samen met wormen, en wat maakt compost zo waardevol?',
        taken: [
          {
            type: 'onderzoek',
            tekst: 'Onderzoek de rol van bacteriën en schimmels bij compostering. Wat is het verschil tussen aerobe (met zuurstof) en anaerobe (zonder zuurstof) afbraak? Welke ruikt naar rotte eieren en waarom?',
          },
          {
            type: 'doe',
            tekst: 'Verzamel vier materialen (bijv. appelschil, karton, koffiedik, droog blad). Leg ze in een vochtig doosje. Observeer elke dag wat er verandert. Welk materiaal breekt het snelst af? Noteer dit nauwkeurig.',
          },
          {
            type: 'denk',
            tekst: 'Maak een vergelijkingstabel: Kunstmest vs. Compost. Vergelijk op: werkingssnelheid, effect op bodemleven, milieuvriendelijkheid, kosten, lang termijn effect op bodemstructuur.',
          },
          {
            type: 'schrijf',
            tekst: 'Schrijf een korte samenvatting (max. 150 woorden): waarom is composteren beter dan organisch afval verbranden of storten? Gebruik de begrippen: voedingsstoffen, koolstofkringloop, bodemleven.',
          },
        ],
        reflectie: [
          'Welke rol spelen micro-organismen die je niet kunt zien bij de afbraak van organisch materiaal?',
          'Waarom heeft bodem met veel organisch materiaal een betere structuur?',
        ],
      },
      {
        week: 3,
        titel: 'Ontwerpen en bouwen',
        intro: 'Met de kennis die je hebt opgedaan, ga je nu het wormenhotel ontwerpen en bouwen. Let op: elk onderdeel heeft een functie die je moet kunnen uitleggen.',
        taken: [
          {
            type: 'denk',
            tekst: 'Ontwerp jullie wormenhotel op papier voordat je begint. Teken alle lagen en schrijf erbij: welke functie heeft elke laag? Waarom heb je gaatjes nodig aan de onderkant en de zijkant?',
          },
          {
            type: 'doe',
            tekst: 'Bouw het wormenhotel volgens jullie ontwerp. Verdeel de rollen bewust: wie is "wormenambassadeur" (eindverantwoordelijke voor de zorg)? Maak een verzorgingsrooster.',
          },
          {
            type: 'onderzoek',
            tekst: 'Zoek op: wat is de ideale temperatuur en vochtigheid voor compostwormen? Hoe kun je dit meten en bijhouden? Maak een plan om dit wekelijks te monitoren.',
          },
          {
            type: 'schrijf',
            tekst: 'Stel een "werkingsprotocol" op voor jullie wormenhotel: wat gooi je er in, hoe vaak, hoeveel, wat doe je als het gaat stinken? Dit protocol gebruik je de komende weken.',
          },
        ],
        reflectie: [
          'Welke keuzes hebben jullie gemaakt bij het ontwerp en waarom?',
          'Hoe ga je omgaan met problemen die jullie nog niet voorzien hebben?',
        ],
      },
      {
        week: 4,
        titel: 'Monitoring: observeren en bijhouden',
        intro: 'Het wormenhotel staat en de wormen werken. Jij bent nu de wetenschapper die bijhoudt wat er gebeurt. Goede observaties zijn de basis van goed onderzoek.',
        taken: [
          {
            type: 'doe',
            tekst: 'Voer de wormen en controleer het hotel dagelijks. Let op: vochtigheid, geur, activiteit van de wormen, hoeveel voedsel er nog over is. Noteer alles met datum.',
          },
          {
            type: 'onderzoek',
            tekst: 'Onderzoek dit: wat verandert er aan het voedsel naarmate de weken vorderen? Hoe ziet het verschil eruit tussen week 1-materiaal en week 3-materiaal? Beschrijf de stadia van afbraak.',
          },
          {
            type: 'schrijf',
            tekst: 'Schrijf in je logboek een uitgebreide observatie: geur (schaal 1-5 van bosgrond tot stinkend), kleur van de compost, activiteit wormen, eventuele problemen en jouw verklaring daarvoor.',
          },
          {
            type: 'denk',
            tekst: 'Vergelijk jouw wormenhotel met dat van een andere groep. Zijn er verschillen? Hoe zou dat komen? Welke variabelen zijn anders? Schrijf een korte vergelijking.',
          },
        ],
        reflectie: [
          'Wat heb je geleerd van het systematisch bijhouden van observaties?',
          'Welke onverwachte dingen zijn er gebeurd en hoe verklaar je die?',
        ],
      },
      {
        week: 5,
        titel: 'Oogsten en vergelijken',
        intro: 'De compost is klaar. Nu onderzoek je wat compost doet met plantengroei — en vergelijk je dit met gewone potgrond.',
        taken: [
          {
            type: 'doe',
            tekst: 'Oogst de compost en vergellijk hem met gewone tuinaarde. Let op: kleur, geur, textuur (kruimelig/klonterig), eventuele wormen. Meet ook de pH als je een teststrip hebt.',
          },
          {
            type: 'onderzoek',
            tekst: 'Zet een vergelijkingsexperiment op: twee identieke plantjes in dezelfde omstandigheden. Eén krijgt jullie compost, één gewone potgrond. Meet elke dag of om de dag de hoogte. Noteer in een tabel.',
          },
          {
            type: 'schrijf',
            tekst: 'Schrijf op basis van je observaties: wat is het effect van compost op plantengroei? Wat verwacht je nog te zien? Hoe verklaar je eventuele verschillen vanuit wat je weet over voedingsstoffen?',
          },
          {
            type: 'denk',
            tekst: 'Bereken: jullie school gooit per week X kilo GFT-afval weg. Als dat wordt gecomposteerd en gebruikt, hoeveel plantjes kunnen dan gevoed worden? Maak een schatting met motivatie.',
          },
        ],
        reflectie: [
          'Wat zegt dit experiment over de waarde van composteren op schoolniveau?',
          'Hoe zou je dit project opschalen naar de hele school of wijk?',
        ],
      },
      {
        week: 6,
        titel: 'Presenteren en verbinden aan grote thema\'s',
        intro: 'Je sluit het project af door je bevindingen te presenteren én te koppelen aan grotere thema\'s zoals klimaatverandering, voedselverspilling en de circulaire economie.',
        taken: [
          {
            type: 'denk',
            tekst: 'Verbind jullie wormenhotel aan drie grote thema\'s: (1) klimaatverandering, (2) voedselverspilling, (3) circulaire economie. Hoe draagt jullie project bij aan elk van deze thema\'s? Maak per thema één concrete zin.',
          },
          {
            type: 'onderzoek',
            tekst: 'Bereken de CO₂-besparing van jullie project: hoeveel organisch afval hebben jullie verwerkt? Als dat verbrand of gestort was, hoeveel CO₂ zou dat hebben opgeleverd? (1 kg organisch afval ≈ 0,5 kg CO₂ bij verbranding)',
          },
          {
            type: 'doe',
            tekst: 'Maak een eindpresentatie (pitch, poster of video) van 3-5 minuten. Vertel: jullie onderzoeksvraag, aanpak, wat jullie hebben gemeten, wat jullie hebben geleerd, en wat jullie aanbevelen aan anderen.',
          },
          {
            type: 'schrijf',
            tekst: 'Schrijf je eindreflectie: wat was het meest waardevolle inzicht? Wat zou je anders aanpakken? Hoe ga jij persoonlijk anders omgaan met afval na dit project?',
          },
        ],
        reflectie: [
          'Hoe verandert dit project jouw kijk op afval en de natuur?',
          'Welk onderdeel van de circulaire economie zie je het liefst breder ingevoerd worden, en waarom?',
        ],
      },
    ],

    havo: [
      {
        week: 1,
        titel: 'Introductie: kringlopen en een onderzoeksvraag',
        intro: 'Dit project gaat over de vraag: hoe zet je afval om in iets waardevols? Je kijkt naar de kringloop van de natuur en bedenkt wat jij wil onderzoeken.',
        taken: [
          {
            type: 'denk',
            tekst: 'Wat is het verschil tussen een lineaire economie (maak → gebruik → gooi weg) en een circulaire economie (niets gaat verloren)? Teken een diagram van beide. Waar past een wormenhotel in?',
          },
          {
            type: 'onderzoek',
            tekst: 'Onderzoek welk afval er op jullie school of thuis wordt weggegooid. Schat hoeveel GFT-afval er per week is. Wat zou je daarmee kunnen doen in een wormenhotel?',
          },
          {
            type: 'doe',
            tekst: 'Zoek buiten drie plekken waar je ziet dat de natuur zelf composteert (dode bladeren, schimmels op een boomstronk, rottend hout). Maak foto\'s en beschrijf wat je ziet.',
          },
          {
            type: 'schrijf',
            tekst: 'Schrijf een persoonlijke onderzoeksvraag: wat wil jij echt weten tijdens dit project? Schrijf ook op wat je denkt dat het antwoord is (dit is je hypothese).',
          },
        ],
        reflectie: [
          'Hoe draagt een wormenhotel bij aan de circulaire economie?',
          'Wat is het verschil tussen afval composteren en afval verbranden voor het milieu?',
        ],
      },
      {
        week: 2,
        titel: 'Onderzoek: hoe werkt composteren?',
        intro: 'Voordat je bouwt, verdiep je je in de wetenschap. Waarom werkt composteren? Welke rol spelen bacteriën, schimmels en wormen?',
        taken: [
          {
            type: 'onderzoek',
            tekst: 'Zoek op: welke micro-organismen (bacteriën en schimmels) breken organisch materiaal af? Wat is het verschil tussen afbraak met zuurstof en zonder zuurstof? Welke geeft een nare geur en waarom?',
          },
          {
            type: 'doe',
            tekst: 'Mini-experiment: leg vier materialen buiten (bijv. appelschil, karton, koffiedik, een blad). Observeer elke dag wat verandert. Welk materiaal breekt het snelst af? Noteer je observaties met datum.',
          },
          {
            type: 'denk',
            tekst: 'Maak een vergelijkingstabel: Kunstmest vs. Compost. Vergelijk op: hoe snel het werkt, wat het doet met bodemleven, milieuvriendelijkheid, en effect op de lange termijn.',
          },
          {
            type: 'schrijf',
            tekst: 'Schrijf in maximaal 100 woorden: waarom is composteren beter dan organisch afval verbranden? Gebruik de woorden: voedingsstoffen, koolstof, bodemleven.',
          },
        ],
        reflectie: [
          'Welke rol spelen bacteriën die je niet kunt zien bij het afbreken van organisch materiaal?',
          'Waarom heeft bodem met veel organisch materiaal een betere structuur voor planten?',
        ],
      },
      {
        week: 3,
        titel: 'Ontwerpen en bouwen',
        intro: 'Met je kennis ontwerp en bouw je het wormenhotel. Elk onderdeel heeft een functie — en jij moet die kunnen uitleggen.',
        taken: [
          {
            type: 'denk',
            tekst: 'Teken het ontwerp van jullie wormenhotel op papier. Schrijf bij elke laag: wat doet deze laag? Waarom heb je gaatjes nodig? Welke omstandigheden hebben de wormen nodig om goed te leven (temperatuur, vocht, licht)?',
          },
          {
            type: 'doe',
            tekst: 'Bouw het wormenhotel. Verdeel de taken bewust. Maak ook een verzorgingsrooster: wie voedt de wormen op welke dag, en hoeveel?',
          },
          {
            type: 'onderzoek',
            tekst: 'Wat is de ideale temperatuur en vochtigheid voor compostwormen? Maak een plan om dit bij te houden. Hoe kun je ingrijpen als het te droog of te nat is?',
          },
          {
            type: 'schrijf',
            tekst: 'Schrijf een verzorgingsprotocol voor jullie wormenhotel: wat gooi je erin, hoe vaak, hoeveel, en wat doe je als het stinkt of als de wormen zich niet goed gedragen?',
          },
        ],
        reflectie: [
          'Welke keuzes maakten jullie bij het ontwerp en waarom?',
          'Hoe ga je om met problemen die je van tevoren niet had verwacht?',
        ],
      },
      {
        week: 4,
        titel: 'Monitoren: meten en bijhouden',
        intro: 'Het wormenhotel staat en werkt. Jij houdt bij wat er gebeurt. Goede observaties zijn de basis van goede conclusies.',
        taken: [
          {
            type: 'doe',
            tekst: 'Houd het wormenhotel dagelijks bij: controleer vochtigheid, geur, en hoe actief de wormen zijn. Noteer alles met datum. Gebruik een schaal voor geur (1 = bosgrond, 5 = stinkend) en activiteit (1 = nauwelijks beweging, 5 = heel actief).',
          },
          {
            type: 'onderzoek',
            tekst: 'Vergelijk jouw wormenhotel met dat van een andere groep. Zijn er verschillen? Waardoor zouden die kunnen komen? Schrijf een korte vergelijking van twee of drie zin.',
          },
          {
            type: 'teken',
            tekst: 'Maak een lijndiagram van de "gezondheid" van het wormenhotel over de weken. Gebruik de geur- en activiteitsschaal als meetpunt. Wat zie je aan het verloop?',
          },
          {
            type: 'schrijf',
            tekst: 'Schrijf een observatieverslag van deze week: hoe gaat het? Wat verandert er aan het voedsel? Zijn er problemen? Wat denk jij dat er in de komende weken gaat gebeuren?',
          },
        ],
        reflectie: [
          'Wat heb je geleerd van het systematisch bijhouden van je observaties?',
          'Welk onverwacht iets is er al gebeurd, en hoe verklaar je dat?',
        ],
      },
      {
        week: 5,
        titel: 'Oogsten en vergelijken',
        intro: 'De compost is klaar! Je oogst, vergelijkt hem met gewone potgrond, en kijkt wat het effect is op plantengroei.',
        taken: [
          {
            type: 'doe',
            tekst: 'Oogst de compost en vergelijk hem met gewone tuinaarde. Kijk naar: kleur, geur, textuur (kruimelig of klonterig). Zet een vergelijkingsexperiment op: twee identieke plantjes — één in jullie compost, één in gewone potgrond. Meet elke dag de hoogte.',
          },
          {
            type: 'teken',
            tekst: 'Maak een grafiek van de plantengroei per dag. Zet de twee planten in dezelfde grafiek met twee kleuren. Wat zie je?',
          },
          {
            type: 'denk',
            tekst: 'Bereken: hoeveel GFT-afval hebben jullie verwerkt? Als dat verbrand was, wat zou de milieu-impact zijn? (1 kg GFT verbrand ≈ 0,5 kg CO₂). Wat betekent dit voor jullie project?',
          },
          {
            type: 'schrijf',
            tekst: 'Schrijf een analyse van je plantexperiment: welke plant groeit beter? Hoe verklaar je het verschil vanuit wat je weet over voedingsstoffen en bodemleven?',
          },
        ],
        reflectie: [
          'Wat zegt dit experiment over de waarde van composteren?',
          'Hoe zou je dit project kunnen opschalen naar de hele school?',
        ],
      },
      {
        week: 6,
        titel: 'Presenteren: wat heb je geleerd en ontdekt?',
        intro: 'Je sluit af door je bevindingen te presenteren en te verbinden aan grotere thema\'s zoals klimaatverandering en voedselverspilling.',
        taken: [
          {
            type: 'denk',
            tekst: 'Verbind jullie wormenhotel aan drie grote thema\'s: (1) klimaatverandering, (2) voedselverspilling, (3) circulaire economie. Schrijf per thema één concrete zin over hoe jullie project daarmee te maken heeft.',
          },
          {
            type: 'doe',
            tekst: 'Maak een eindpresentatie van 3-5 minuten (poster, video of pitch). Vertel: wat was de vraag, wat hebben jullie gedaan, wat hebben jullie gevonden, en wat beveel je anderen aan.',
          },
          {
            type: 'schrijf',
            tekst: 'Schrijf een conclusie van maximaal 150 woorden: beantwoord jullie onderzoeksvraag, noem de belangrijkste bevinding en één ding dat je zou verbeteren.',
          },
          {
            type: 'bespreek',
            tekst: 'Bespreek met je groep: wat is het meest waardevolle dat jullie hebben geleerd? En welke vraag wil je nog steeds beantwoord zien?',
          },
        ],
        reflectie: [
          'Hoe heeft dit project jouw kijk op afval en de natuur veranderd?',
          'Wat zou jij anders doen thuis of op school na dit project?',
        ],
      },
    ],
  },

  // ════════════════════════════════════════════════════════════════════════════
  keuringsdienst: {

    basis: [
      {
        week: 1,
        titel: 'Introductie: Planten en bodem',
        intro: 'In dit project doe je een echt experiment! Je kijkt wat compostthee doet met de groei van radijsjes, vergeleken met kunstmest en niets. Deze week maak je kennis met het experiment.',
        taken: [
          {
            type: 'bespreek',
            tekst: 'Praat met je groep: wat denk je dat er gebeurt als je kunstmest aan de grond toevoegt? En compostthee? Schrijf ieders voorspelling op.',
          },
          {
            type: 'doe',
            tekst: 'Zet de drie potten klaar: label ze duidelijk (Pot 1: niets, Pot 2: kunstmest, Pot 3: compostthee). Vul ze met dezelfde hoeveelheid potgrond. Zaai in elke pot evenveel radijszaadjes op dezelfde diepte.',
          },
          {
            type: 'teken',
            tekst: 'Teken de drie potten zoals ze er nu uitzien. Schrijf erbij wat er in elke pot zit. Dit is je "startmeting" — vergelijk dit later met hoe de potten er na weken uitzien!',
          },
          {
            type: 'schrijf',
            tekst: 'Schrijf in je logboek: wat verwacht je dat er zal groeien? Welke pot verwacht je dat het beste groeit en waarom? Schrijf dit op voordat je iets hebt gezien!',
          },
        ],
        reflectie: [
          'Waarom is het belangrijk dat alle drie de potten dezelfde hoeveelheid water en licht krijgen?',
          'Wat is het doel van de pot zonder toevoeging (pot 1)?',
        ],
      },
      {
        week: 2,
        titel: 'Starten: zaaien en eerste toevoegingen',
        intro: 'De potten zijn klaar. Nu start het experiment echt. Je geeft de eerste voeding en doet je eerste observaties.',
        taken: [
          {
            type: 'doe',
            tekst: 'Geef Pot 2 de eerste dosis kunstmest (volg de instructie op de verpakking). Maak compostthee voor Pot 3: doe een schepje compost in een pot water, laat 24 uur staan, zeef het en giet het over Pot 3. Pot 1 krijgt alleen water.',
          },
          {
            type: 'onderzoek',
            tekst: 'Kijk elke dag of er al zaadjes ontkiemen. Schrijf op: welke pot ontkiemt als eerste? Hoeveel zaadjes komen op in elke pot? Noteer datum en pot.',
          },
          {
            type: 'teken',
            tekst: 'Maak een simpele tabel met drie kolommen (Pot 1, Pot 2, Pot 3) en rijen voor elke dag. Schrijf elke dag kort op wat je ziet.',
          },
          {
            type: 'schrijf',
            tekst: 'Beschrijf hoe compostthee eruit ziet en ruikt. Hoe verschilt het van gewoon water? Hoe denk je dat dit de grond beïnvloedt?',
          },
        ],
        reflectie: [
          'Wat valt je al op in de eerste week? Zijn er al verschillen?',
          'Wat kan er misgaan in dit experiment als je niet elke dag dezelfde hoeveelheid water geeft?',
        ],
      },
      {
        week: 3,
        titel: 'Meten: hoe groot zijn de planten?',
        intro: 'De radijsjes groeien! Nu ga je elke week nauwkeurig meten hoe groot ze zijn. Meten is de basis van goed onderzoek.',
        taken: [
          {
            type: 'doe',
            tekst: 'Meet elke plant met een liniaal: hoe hoog is de stengel (in cm)? Hoe groen zijn de blaadjes (licht/donkergroen/geel)? Hoeveel blaadjes heeft elke plant? Schrijf alles op in je tabel.',
          },
          {
            type: 'teken',
            tekst: 'Teken of fotografeer elke pot. Noteer de datum. Zo kun je later zien hoe de plant veranderd is.',
          },
          {
            type: 'onderzoek',
            tekst: 'Vergelijk je drie potten: welke plant is het hoogst? Welke heeft de groenste blaadjes? Welke ziet er het gezondst uit? Maak een rangschikking van 1 (beste) tot 3 (minste).',
          },
          {
            type: 'schrijf',
            tekst: 'Schrijf in je logboek: welke pot groeit het beste tot nu toe? Is dit wat je verwacht had? Wat valt je op wat je niet had verwacht?',
          },
        ],
        reflectie: [
          'Wat betekent "nauwkeurig meten" in dit experiment?',
          'Welke pot groeit het beste en hoe verklaar je dat?',
        ],
      },
      {
        week: 4,
        titel: 'Bijhouden: week 4 observaties',
        intro: 'Halverwege het experiment! Je meet opnieuw en kijkt of er een duidelijk patroon zichtbaar is.',
        taken: [
          {
            type: 'doe',
            tekst: 'Herhaal de meting van week 3: hoogte, kleur, aantal blaadjes. Voeg ook toe: hoe stevig is de stengel (slappe vs. stevige stengel)? En kun je al de radijsbol zien groeien onder de grond?',
          },
          {
            type: 'teken',
            tekst: 'Maak een simpel staafdiagram: zet de drie potten op de x-as en de hoogte (in cm) op de y-as. Kleur de staven per pot in een andere kleur.',
          },
          {
            type: 'bespreek',
            tekst: 'Bespreek met je groep: welke pot doet het beste? Waarom denken jullie dat? Is het kunstmest of de compostthee? Of maakt het niet uit?',
          },
          {
            type: 'schrijf',
            tekst: 'Schrijf je bijgewerkte voorspelling: wat denk je nu dat er aan het einde zal blijken? Is je mening veranderd ten opzichte van week 1?',
          },
        ],
        reflectie: [
          'Wat is er tot nu toe veranderd wat je niet had verwacht?',
          'Hoe zou je het experiment nog nauwkeuriger kunnen maken?',
        ],
      },
      {
        week: 5,
        titel: 'Oogsten: de radijsjes uit de grond',
        intro: 'Het is zover: de radijsjes mogen geoogst worden! Je vergelijkt de drie potten en trekt je eerste conclusies.',
        taken: [
          {
            type: 'doe',
            tekst: 'Oogst de radijsjes voorzichtig uit elke pot. Meet per pot: grootte van de bol (diameter in cm), gewicht als je een weegschaal hebt, kleur en stevigheid. Leg ze naast elkaar en maak een foto.',
          },
          {
            type: 'teken',
            tekst: 'Teken de drie radijsjes op ware grootte naast elkaar. Label welke welk is. Schrijf de maten erbij.',
          },
          {
            type: 'onderzoek',
            tekst: 'Vergelijk nu alle meetpunten van week 1 t/m 5. Welke pot groeide het snelst? Welke radijs is het grootst? Zijn er verrassende uitkomsten?',
          },
          {
            type: 'schrijf',
            tekst: 'Schrijf je eerste conclusie: welke toevoeging werkte het beste voor de radijsgroei? Is dit wat je verwacht had? Wat zou een verklaring zijn?',
          },
        ],
        reflectie: [
          'Wat vertelt de grootte van de radijsbol je over de kwaliteit van de bodemtoevoeging?',
          'Wat zou er veranderen als je dit experiment vaker herhaalt?',
        ],
      },
      {
        week: 6,
        titel: 'Conclusie: wat heb je geleerd?',
        intro: 'Je sluit het experiment af. Je presenteert wat je hebt gevonden en denkt na over wat dit betekent.',
        taken: [
          {
            type: 'bespreek',
            tekst: 'Bespreek met je groep: wat is jullie antwoord op de vraag "Wat doet compostthee met plantengroei?" Zijn jullie het eens? Noteer jullie gezamenlijk antwoord.',
          },
          {
            type: 'teken',
            tekst: 'Maak een overzichtsposter: titel, drie potten met foto\'s, jullie metingen, jullie conclusie. Gebruik tekeningen en kleuren zodat anderen het makkelijk begrijpen.',
          },
          {
            type: 'doe',
            tekst: 'Presenteer jullie poster of resultaten aan de klas. Vertel wat je gedaan hebt, wat je gevonden hebt en wat je verraste.',
          },
          {
            type: 'schrijf',
            tekst: 'Schrijf je eindreflectie: Wat was het leukste? Wat was het moeilijkste? Wat zou je een volgende keer anders doen?',
          },
        ],
        reflectie: [
          'Denk je nu anders over kunstmest en compost dan voor het project? Waarom?',
          'Wat zou er met de aarde gebeuren als alle boeren compostthee gebruiken in plaats van kunstmest?',
        ],
      },
    ],

    midden: [
      {
        week: 1,
        titel: 'Introductie: onderzoeksvraag en hypothese',
        intro: 'Jullie onderzoeken wat compostthee doet met plantengroei. Maar goed onderzoek begint met een goede vraag. Deze week stel je hypothesen op en bereid je het experiment voor.',
        taken: [
          {
            type: 'denk',
            tekst: 'Bestudeer het verschil tussen kunstmest en compostthee. Wat zit erin? Hoe werken ze? Op welke manier verwacht je dat ze de plantengroei beïnvloeden? Noteer je verwachtingen per groeifactor (hoogte, bladkleur, wortelgroei, grootte bol).',
          },
          {
            type: 'onderzoek',
            tekst: 'Wat is de wetenschappelijke methode? Identificeer in jullie experiment: onafhankelijke variabele, afhankelijke variabelen, gecontroleerde variabelen. Maak een overzichtstabel. Welke variabelen zijn moeilijk te controleren?',
          },
          {
            type: 'doe',
            tekst: 'Zet het experiment op: drie identieke potten, zelfde hoeveelheid potgrond, zelfde aantal zaden, zelfde positie in de ruimte. Documenteer alles (foto\'s, gewicht grond, aantal zaden per pot).',
          },
          {
            type: 'schrijf',
            tekst: 'Schrijf een formele hypothese: "Als pot X toevoeging Y krijgt, dan verwacht ik dat Z gebeurt, omdat…" Schrijf er ook bij welke meting je gebruikt om dit te toetsen.',
          },
        ],
        reflectie: [
          'Wat is het nut van een controlepot (pot zonder toevoeging) in dit experiment?',
          'Welke gecontroleerde variabele is volgens jou het moeilijkst gelijk te houden, en waarom?',
        ],
      },
      {
        week: 2,
        titel: 'Experiment starten: eerste toevoegingen en startmeting',
        intro: 'Het experiment gaat van start. Je voegt de eerste voeding toe en doet een nauwkeurige startmeting die als referentie dient voor alle latere metingen.',
        taken: [
          {
            type: 'doe',
            tekst: 'Maak compostthee volgens het protocol: compost in water, 24 uur weken, zeven. Geef Pot 2 kunstmest en Pot 3 compostthee volgens de aanbevolen doseringen. Documenteer exact hoeveel je hebt toegevoegd (ml of gram).',
          },
          {
            type: 'onderzoek',
            tekst: 'Observeer de bodem direct na toevoeging: verandert de kleur, geur of textuur van de bodem? Noteer dit zorgvuldig. Hoe verklaar je eventuele onmiddellijke veranderingen?',
          },
          {
            type: 'schrijf',
            tekst: 'Maak een gestandaardiseerd observatieformulier dat je elke week gebruikt: datum, pot, hoogte (cm), bladkleur (schaal), aantal blaadjes, overige observaties. Gebruik dit formulier vanaf nu elke observatiemoment.',
          },
          {
            type: 'denk',
            tekst: 'Bedenk: welke rol spelen micro-organismen in compostthee? Hoe zouden ze de bodem kunnen beïnvloeden anders dan alleen voedingsstoffen? Schrijf drie mogelijke mechanismen op.',
          },
        ],
        reflectie: [
          'Wat zijn de risico\'s van een te grote of te kleine dosis meststof? Hoe heb je dit in jullie experiment gecontroleerd?',
          'Hoe zorgen jullie voor consistentie tussen de wekelijkse observaties?',
        ],
      },
      {
        week: 3,
        titel: 'Monitoring: systematisch waarnemen',
        intro: 'Goede wetenschap vereist nauwkeurige, herhaalbare observaties. Deze week leer je hoe je data verzamelt die echt wat zegt.',
        taken: [
          {
            type: 'doe',
            tekst: 'Voer de wekelijkse meting uit met je gestandaardiseerde formulier. Gebruik altijd dezelfde meetmethode (bijv. altijd meten van de bodem af, niet van de pot). Voeg ook toe: tijdstip van meting, wie heeft gemeten.',
          },
          {
            type: 'onderzoek',
            tekst: 'Vergelijk jullie metingen met die van een andere groep die hetzelfde experiment uitvoert. Zijn er verschillen? Hoe verklaar je die? Welke variabelen waren bij hen anders?',
          },
          {
            type: 'teken',
            tekst: 'Maak een lijndiagram van de groei van week 1 t/m nu. Zet de weken op de x-as en de gemiddelde hoogte per pot op de y-as. Gebruik drie kleuren voor de drie potten.',
          },
          {
            type: 'schrijf',
            tekst: 'Schrijf een tussentijdse analyse: zijn er al duidelijke verschillen? Klopt dit met je hypothese? Zo niet, wat zou een alternatieve verklaring zijn?',
          },
        ],
        reflectie: [
          'Wat is het verschil tussen een kwalitatieve observatie ("de plant ziet er goed uit") en een kwantitatieve meting? Welke heeft meer wetenschappelijke waarde?',
          'Hoe beïnvloedt de frequentie van je metingen de betrouwbaarheid van je conclusie?',
        ],
      },
      {
        week: 4,
        titel: 'Verdieping: micro-organismen en wortelwerking',
        intro: 'Terwijl de planten groeien, verdiep je je in de wetenschappelijke achtergrond. Wat gebeurt er precies in de bodem bij kunstmest en compostthee?',
        taken: [
          {
            type: 'onderzoek',
            tekst: 'Onderzoek hoe plantenwortels voedingsstoffen opnemen (osmose, wortelharen, oplossingen). Waarom werkt compostthee als vloeibare voeding efficiënt? Zoek ook op: wat zijn PGPR-bacteriën (plant growth promoting rhizobacteria) en welke rol spelen ze?',
          },
          {
            type: 'doe',
            tekst: 'Maak een wekelijkse meting. Kijk ook naar de wortels door voorzichtig één radijsje uit elke pot te nemen (als er meerdere zijn). Hoe zien de wortels eruit bij elke conditie? Vergelijk kleur, dikte, vertakking.',
          },
          {
            type: 'denk',
            tekst: 'Bedenk: welke effecten van compostthee zou je kunnen zien in de bodem, niet alleen in de plant? Hoe zou je die effecten kunnen meten? Formuleer een vervolgexperiment.',
          },
          {
            type: 'schrijf',
            tekst: 'Schrijf een korte verhandeling (150-200 woorden): waarom is compostthee op lange termijn mogelijk beter voor de bodemgezondheid dan kunstmest, ook als de korte-termijn plantengroei vergelijkbaar is?',
          },
        ],
        reflectie: [
          'Stel dat kunstmest meer groei geeft dan compostthee in jullie experiment. Betekent dat dan dat kunstmest "beter" is? Leg uit.',
          'Welke ecologische effecten van kunstmest zou je niet zien in jullie kleine pottenexperiment?',
        ],
      },
      {
        week: 5,
        titel: 'Oogsten en analyseren',
        intro: 'De radijsjes worden geoogst. Je verzamelt einddata, vergelijkt alle metingen en begint een onderbouwde conclusie te trekken.',
        taken: [
          {
            type: 'doe',
            tekst: 'Oogst alle radijsjes. Meet per plant: lengte loof (cm), gewicht bol (gram), diameter bol (cm), kleur bol, conditie wortels. Voer ook een smaaktest in: smaken de radijsjes anders?',
          },
          {
            type: 'onderzoek',
            tekst: 'Bereken het gemiddelde per conditie voor alle meetpunten. Vergelijk de drie condities. Welke conditie scoort het hoogst op welke maatstaf? Is er een conditie die overal beter scoort, of verschilt het per maatstaf?',
          },
          {
            type: 'teken',
            tekst: 'Maak een visueel overzicht: foto\'s van de drie geoogste radijsjes naast elkaar, met labels. Maak ook een eindstaafdiagram van het eindgewicht per conditie.',
          },
          {
            type: 'schrijf',
            tekst: 'Schrijf een eerste conceptconclusie: beantwoord de onderzoeksvraag aan de hand van je data. Noem ook de beperkingen van jullie onderzoek (kleine steekproef, niet-gecontroleerde variabelen, etc.).',
          },
        ],
        reflectie: [
          'In hoeverre mag je op basis van drie potten een algemene uitspraak doen over compostthee en kunstmest?',
          'Welke aanvullende meting had je willen doen als je meer tijd had gehad?',
        ],
      },
      {
        week: 6,
        titel: 'Verklaringen zoeken en verbanden leggen',
        intro: 'Data hebben betekent nog geen begrip. Deze week zoek je verklaringen voor wat je hebt gevonden en verbindt je het aan bredere thema\'s.',
        taken: [
          {
            type: 'denk',
            tekst: 'Analyseer de mogelijke verklaringen voor eventuele groeiverschillen. Formuleer voor elk verschil dat je hebt gevonden minstens twee alternatieve verklaringen (bijv. meer voedingsstoffen, betere bodemstructuur, micro-organismen).',
          },
          {
            type: 'onderzoek',
            tekst: 'Verbind jullie bevindingen aan bredere thema\'s: stikstofvervuiling, eutrofiëring, duurzame landbouw, circulaire economie. Welk thema sluit het meest aan bij wat jullie hebben gevonden?',
          },
          {
            type: 'schrijf',
            tekst: 'Schrijf een volledige wetenschappelijke conclusie: herhaal de onderzoeksvraag, beschrijf je methode in één zin, geef de resultaten, verbind ze aan theorie, noem beperkingen, doe een aanbeveling voor vervolgonderzoek.',
          },
          {
            type: 'doe',
            tekst: 'Bereid jullie presentatie voor in de stijl van Keuringsdienst van Waarde: onderzoeksvraag, aanpak, bewijs (metingen), conclusie, verklaring. Oefen de presentatie in de groep.',
          },
        ],
        reflectie: [
          'Hoe zou je dit experiment anders opzetten als je het opnieuw kon doen?',
          'Wat betekenen jullie bevindingen voor de praktijk van een boer of tuinier die wil overstappen op duurzamere methoden?',
        ],
      },
      {
        week: 7,
        titel: 'Presenteren: Keuringsdienst van Waarde aflevering',
        intro: 'Jullie maken een aflevering in de stijl van Keuringsdienst van Waarde. Jullie laten zien wat jullie onderzocht hebben, wat jullie gevonden hebben en hoe jullie dat verklaren.',
        taken: [
          {
            type: 'doe',
            tekst: 'Maak de definitieve aflevering: video, reportage of live-presentatie. Verwerk: onderzoeksvraag, drie potten, metingen over de weken, eindresultaten, verklaringen, conclusie. Houd het helder en onderbouwd.',
          },
          {
            type: 'bespreek',
            tekst: 'Geef feedback op de presentatie van een andere groep. Wat vinden jullie sterk? Wat ontbreekt? Is de conclusie goed onderbouwd door de data?',
          },
          {
            type: 'schrijf',
            tekst: 'Schrijf je persoonlijke eindreflectie: wat heb je geleerd over wetenschappelijk onderzoek? Wat vond je het meest verrassend? Wat zou je verder willen onderzoeken?',
          },
        ],
        reflectie: [
          'Wat is het verschil tussen een mening en een wetenschappelijk onderbouwde conclusie?',
          'Hoe heeft dit project jouw kijk op voedsel, landbouw en bodemkwaliteit veranderd?',
        ],
      },
    ],

    havo: [
      {
        week: 1,
        titel: 'Introductie: onderzoeksvraag en hypothese opstellen',
        intro: 'Jullie gaan een echt wetenschappelijk experiment uitvoeren. Maar goed onderzoek begint met een goede vraag en een duidelijke verwachting. Die stel je deze week op.',
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
        ],
        reflectie: [
          'Waarom is het belangrijk dat alle drie de potten dezelfde hoeveelheid water en licht krijgen?',
          'Wat is het doel van de pot zonder toevoeging (de controlepot)?',
        ],
      },
      {
        week: 2,
        titel: 'Experiment starten: eerste toevoeging en meting',
        intro: 'Het experiment gaat van start. Je maakt compostthee, geeft de eerste voeding aan de potten en doet je eerste nauwkeurige meting.',
        taken: [
          {
            type: 'doe',
            tekst: 'Maak compostthee: doe compost in water, laat 24 uur staan en zeef het daarna. Geef pot 2 kunstmest en pot 3 compostthee volgens de aanbevolen hoeveelheden. Noteer exact hoeveel je hebt toegevoegd.',
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
            tekst: 'Bedenk: welke rol spelen de bacteriën in compostthee? Op welke manier kunnen ze de plant helpen, naast het geven van voedingsstoffen? Schrijf twee mogelijkheden op.',
          },
        ],
        reflectie: [
          'Wat zou er misgaan als je de ene pot meer water geeft dan de andere?',
          'Hoe zorg je ervoor dat je elke week op dezelfde manier meet?',
        ],
      },
      {
        week: 3,
        titel: 'Meten: systematisch waarnemen',
        intro: 'Goede wetenschap vraagt nauwkeurige metingen. Deze week leer je hoe je data verzamelt op een manier die je echt kunt vergelijken.',
        taken: [
          {
            type: 'doe',
            tekst: 'Meet elke plant met je observatieformulier. Gebruik altijd dezelfde meetmethode: meet altijd vanaf de bodem van de pot omhoog. Noteer ook het tijdstip van meten.',
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
      },
      {
        week: 4,
        titel: 'Verdieping: wat gebeurt er in de bodem?',
        intro: 'Terwijl de planten groeien, verdiep je je in de wetenschap. Wat gebeurt er precies in de bodem als je kunstmest of compostthee toevoegt?',
        taken: [
          {
            type: 'onderzoek',
            tekst: 'Zoek op hoe plantenwortels voedingsstoffen opnemen. Wat zijn wortelharen? Waarom moeten voedingsstoffen opgelost zijn in water? Hoe helpt dit verklaren waarom compostthee (vloeibaar) snel werkt?',
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
      },
      {
        week: 6,
        titel: 'Verklaringen zoeken',
        intro: 'Data hebben betekent nog niet dat je het begrijpt. Deze week zoek je verklaringen voor wat je hebt gevonden.',
        taken: [
          {
            type: 'denk',
            tekst: 'Bedenk voor elk verschil dat je hebt gevonden minstens twee mogelijke verklaringen. Welke verklaring past het beste bij wat je weet over voedingsstoffen, bodemleven en wortelwerking?',
          },
          {
            type: 'onderzoek',
            tekst: 'Verbind je bevindingen aan een groter thema: stikstofvervuiling door kunstmest, eutrofiëring van sloten, of circulaire landbouw. Zoek één concreet voorbeeld uit de echte wereld dat past bij wat jullie hebben onderzocht.',
          },
          {
            type: 'schrijf',
            tekst: 'Schrijf een complete conclusie (max. 150 woorden): herhaal de onderzoeksvraag, geef de resultaten, geef een verklaring, en schrijf wat je zou doen als je het experiment opnieuw mocht doen.',
          },
          {
            type: 'doe',
            tekst: 'Bereid de presentatie voor: maak een duidelijk overzicht van jullie onderzoeksvraag, de drie potten, de metingen en jullie conclusie. Oefen dit in de groep.',
          },
        ],
        reflectie: [
          'Hoe zou je dit experiment verbeteren als je het opnieuw kon doen?',
          'Wat zeggen jullie resultaten voor een boer of tuinier die wil overstappen op natuurlijkere methoden?',
        ],
      },
      {
        week: 7,
        titel: 'Presenteren: Keuringsdienst van Waarde',
        intro: 'Jullie maken een aflevering in de stijl van Keuringsdienst van Waarde. Jullie laten zien wat jullie onderzocht hebben, wat jullie gevonden hebben en hoe jullie dat verklaren.',
        taken: [
          {
            type: 'doe',
            tekst: 'Maak de definitieve presentatie: video, reportage of live. Verwerk hierin: jullie onderzoeksvraag, hoe het experiment werkte, de metingen, de eindresultaten en jullie conclusie. Zorg dat het duidelijk is voor iemand die er niets van weet.',
          },
          {
            type: 'bespreek',
            tekst: 'Bekijk de presentatie van een andere groep. Geef twee dingen terug: wat vinden jullie sterk? En één vraag die je nog hebt over hun conclusie of aanpak.',
          },
          {
            type: 'schrijf',
            tekst: 'Schrijf je persoonlijke eindreflectie: wat heb je geleerd over onderzoek doen? Wat vond je het meest verrassende resultaat? Wat zou je verder willen onderzoeken?',
          },
        ],
        reflectie: [
          'Wat is het verschil tussen een mening en een conclusie die je kunt onderbouwen met data?',
          'Hoe heeft dit project jouw kijk op voedsel, landbouw en bodemkwaliteit veranderd?',
        ],
      },
    ],
  },
}
