// ─── Woordenlijst / Begrippenlijst per project ────────────────────────────────
// Categorieën: 'Basis' | 'Wetenschap' | 'Techniek' | 'Duurzaamheid' | 'Experiment'

const GEDEELD = [
  {
    term: 'Bodem',
    definitie: 'De bovenste laag van de aarde waar planten in groeien en talloze organismen leven. Een gezonde bodem bestaat uit mineralen, water, lucht en organisch materiaal.',
    voorbeeld: 'Zonder gezonde bodem kunnen we geen voedsel verbouwen.',
    categorie: 'Basis',
  },
  {
    term: 'Organisch afval',
    definitie: 'Afval dat afkomstig is van levende organismen, zoals groente- en fruitresten, bladeren en koffiedik. Het kan worden afgebroken door bacteriën en schimmels.',
    voorbeeld: 'Een appelschil en koffiedik zijn organisch afval.',
    categorie: 'Basis',
  },
  {
    term: 'Compost',
    definitie: 'Afgebroken organisch materiaal dat rijk is aan voedingsstoffen. Het verbetert de bodemstructuur en voorziet planten van mineralen.',
    voorbeeld: 'Tuinders gebruiken compost om de bodem vruchtbaarder te maken.',
    categorie: 'Basis',
  },
  {
    term: 'Kringloop',
    definitie: 'Een cyclus waarbij stoffen steeds opnieuw worden gebruikt. In de natuur worden dode planten en dieren afgebroken tot voedingsstoffen voor nieuw leven.',
    voorbeeld: 'De stikstofkringloop zorgt ervoor dat stikstof steeds opnieuw door planten en dieren wordt gebruikt.',
    categorie: 'Basis',
  },
  {
    term: 'Bodemleven',
    definitie: 'Alle levende organismen in de bodem, zoals wormen, insecten, bacteriën, schimmels en protisten. Zij zorgen voor het afbreken van organisch materiaal en het beschikbaar maken van voedingsstoffen.',
    voorbeeld: 'Een schep aarde uit een gezond weiland bevat meer organismen dan er mensen op aarde zijn.',
    categorie: 'Wetenschap',
  },
  {
    term: 'Bacteriën',
    definitie: 'Microscopisch kleine, eencellige organismen die overal voorkomen. In de bodem spelen ze een cruciale rol bij het afbreken van organisch materiaal.',
    voorbeeld: 'In één gram compost leven meer dan 100 miljoen bacteriën.',
    categorie: 'Wetenschap',
  },
  {
    term: 'Schimmels',
    definitie: 'Organismen die geen chlorofyl bevatten en leven van het afbreken van organisch materiaal. Ze vormen draden (mycelium) die zich door de bodem vertakken.',
    voorbeeld: 'Schimmels verbinden bomen ondergronds via het "wood wide web" van mycelium.',
    categorie: 'Wetenschap',
  },
  {
    term: 'Voedingsstoffen',
    definitie: 'Mineralen en stoffen die planten nodig hebben om te groeien, zoals stikstof (N), fosfor (P) en kalium (K). Ze worden opgenomen via de wortels.',
    voorbeeld: 'Stikstof is de belangrijkste voedingsstof voor de groei van bladeren.',
    categorie: 'Wetenschap',
  },
  {
    term: 'Fotosynthese',
    definitie: 'Het proces waarbij planten zonlicht omzetten in suiker (energie) met behulp van CO₂ en water. Hierbij komt zuurstof vrij.',
    voorbeeld: 'Dankzij fotosynthese produceren planten de zuurstof die wij inademen.',
    categorie: 'Wetenschap',
  },
  {
    term: 'Stikstof (N)',
    definitie: 'Een essentieel mineraal voor plantengroei, nodig voor de aanmaak van bladgroen en eiwitten. De lucht bestaat voor 78% uit stikstofgas, maar planten kunnen dit niet direct opnemen.',
    voorbeeld: 'Een tekort aan stikstof maakt bladeren geel.',
    categorie: 'Wetenschap',
  },
  {
    term: 'Fosfor (P)',
    definitie: 'Een mineraal dat planten nodig hebben voor wortelontwikkeling, bloei en vruchtvorming.',
    voorbeeld: 'Planten met voldoende fosfor hebben sterkere wortels.',
    categorie: 'Wetenschap',
  },
  {
    term: 'Kalium (K)',
    definitie: 'Een mineraal dat planten helpt bij het reguleren van waterbeheer en het aanmaken van sterke celwanden. Het vergroot ook de weerstand tegen ziekten.',
    voorbeeld: 'Kalium helpt planten om beter droogte te doorstaan.',
    categorie: 'Wetenschap',
  },
  {
    term: 'Biodiversiteit',
    definitie: 'De variatie aan levensvormen op aarde — of in een specifiek gebied, zoals een stuk bodem. Meer biodiversiteit betekent een stabieler ecosysteem.',
    voorbeeld: 'Een bodem met veel biodiversiteit is veerkrachtiger dan een monocultuur.',
    categorie: 'Duurzaamheid',
  },
  {
    term: 'Duurzaamheid',
    definitie: 'Het handelen op een manier die voorziet in de behoeften van nu, zonder de mogelijkheden van toekomstige generaties te verkleinen.',
    voorbeeld: 'Compost gebruiken in plaats van kunstmest is een duurzame keuze.',
    categorie: 'Duurzaamheid',
  },
  {
    term: 'Circulariteit',
    definitie: 'Het principe waarbij materialen en producten zo lang mogelijk in gebruik blijven, afval wordt hergebruikt en kringlopen worden gesloten — naar het voorbeeld van de natuur.',
    voorbeeld: 'Een wormenhotel is een perfect voorbeeld van circulaire economie: afval wordt grondstof.',
    categorie: 'Duurzaamheid',
  },
  {
    term: 'Ecosysteem',
    definitie: 'Een samenstel van levende organismen en hun niet-levende omgeving die samenwerken als een systeem. Voorbeelden: een bos, een vijver of zelfs een wormenhotel.',
    voorbeeld: 'Een wormenhotel is een klein maar complex ecosysteem.',
    categorie: 'Wetenschap',
  },
  {
    term: 'pH',
    definitie: 'Een maat voor de zuurgraad van een stof, op een schaal van 0 (zuur) tot 14 (basisch). Een pH van 7 is neutraal. Wormen gedijen het best bij een pH tussen 6 en 7.',
    voorbeeld: 'Als een wormenhotel te zuur wordt (te veel citrusfruit), daalt de pH en worden wormen minder actief.',
    categorie: 'Wetenschap',
  },
  {
    term: 'Micro-organismen',
    definitie: 'Levende wezens die zo klein zijn dat ze alleen met een microscoop te zien zijn. Denk aan bacteriën, schimmels en protisten.',
    voorbeeld: 'Micro-organismen in de bodem breken organisch materiaal af tot voedingsstoffen voor planten.',
    categorie: 'Wetenschap',
  },
  {
    term: 'CO₂ (koolstofdioxide)',
    definitie: 'Een broeikasgas dat vrijkomt bij verbranding en ademhaling. Planten nemen CO₂ op tijdens fotosynthese. Lokale compostverwerking vermindert CO₂-uitstoot door transport.',
    voorbeeld: 'Door GFT-afval lokaal te composteren in een wormenhotel bespaar je CO₂ die anders door transport zou vrijkomen.',
    categorie: 'Duurzaamheid',
  },
  {
    term: 'GFT-afval',
    definitie: 'Groente-, Fruit- en Tuinafval. Organisch huishoudelijk afval dat composteerwaardig is. Vlees, vis en zuivel horen er niet bij.',
    voorbeeld: 'Appelschillen, koffiedik en bladeren zijn GFT-afval.',
    categorie: 'Basis',
  },
]

const WORMENHOTEL_EXTRA = [
  {
    term: 'Vermicompost',
    definitie: 'Compost geproduceerd door wormen. Het is rijker aan voedingsstoffen dan gewone compost en bevat meer nuttige micro-organismen.',
    voorbeeld: 'Vermicompost bevat tot 5× meer stikstof dan gewone tuinaarde.',
    categorie: 'Techniek',
  },
  {
    term: 'Vermicompostering',
    definitie: 'Het proces waarbij wormen organisch afval omzetten in compost. Dit kan lokaal, op kleine schaal, zonder energie.',
    voorbeeld: 'Vermicompostering in de klas is een voorbeeld van circulaire economie in de praktijk.',
    categorie: 'Techniek',
  },
  {
    term: 'Compostworm',
    definitie: 'De Eisenia fetida, ook wel rode worm of tijgerworm. Deze worm leeft in het bovenste laagje organisch materiaal en is ideaal voor een wormenhotel. Anders dan de gewone regenworm.',
    voorbeeld: 'Compostwormen kun je bestellen bij een wormenkwekerij.',
    categorie: 'Wetenschap',
  },
  {
    term: 'Eisenia fetida',
    definitie: 'De wetenschappelijke naam van de compostworm. Letterlijk: "stinkende Eisenia" — ze scheiden een vloeistof af als ze bedreigd worden.',
    voorbeeld: 'Eisenia fetida is de meest gebruikte worm voor thuiscompostering wereldwijd.',
    categorie: 'Wetenschap',
  },
  {
    term: 'Bedding',
    definitie: 'Het vochtige materiaal waarin de wormen leven in het wormenhotel, zoals gescheurd karton, bladeren en aarde. Het houdt de juiste vochtigheid en structuur vast.',
    voorbeeld: 'Goede bedding voelt vochtig aan zoals een uitgeknepen spons.',
    categorie: 'Techniek',
  },
  {
    term: 'Wormenthee',
    definitie: 'Het vloeibare vocht dat uit het wormenhotel druipt. Bevat opgeloste voedingsstoffen en micro-organismen. Kan verdund worden gebruikt als vloeibare plantenvoeding.',
    voorbeeld: 'Wormenthee 1:10 verdund met water is een uitstekende natuurlijke plantenmest.',
    categorie: 'Techniek',
  },
  {
    term: 'Aerobe compostering',
    definitie: 'Compostering waarbij voldoende zuurstof aanwezig is. Dit verloopt snel en produceert nauwelijks nare geuren. Een wormenhotel met gaatjes werkt aeroob.',
    voorbeeld: 'Door gaatjes te boren in het wormenhotel zorg je voor aerobe compostering.',
    categorie: 'Techniek',
  },
  {
    term: 'Anaerobe vergisting',
    definitie: 'Afbraak van organisch materiaal zonder zuurstof. Dit verloopt langzamer en produceert nare geuren (zwavelwaterstof). In een wormenhotel wil je dit vermijden.',
    voorbeeld: 'Als een wormenhotel stinkt naar rotte eieren, is er anaerobe vergisting aan de gang.',
    categorie: 'Techniek',
  },
  {
    term: 'Stikstoffixatie',
    definitie: 'Het omzetten van stikstofgas (N₂) uit de lucht naar een voor planten opneembare vorm (ammonium of nitraat) door speciale bacteriën.',
    voorbeeld: 'Klaver werkt samen met stikstoffixerende bacteriën in zijn wortels en bemest zichzelf.',
    categorie: 'Wetenschap',
  },
  {
    term: 'Mycelium',
    definitie: 'Het netwerk van draadvormige cellen (hyfen) van schimmels. Mycelium kan meters lang worden en verbindt planten ondergronds met elkaar.',
    voorbeeld: 'Via het mycelium kunnen bomen voedingsstoffen uitwisselen — het "wood wide web".',
    categorie: 'Wetenschap',
  },
  {
    term: 'Lineaire economie',
    definitie: 'Een economisch model waarbij grondstoffen worden gewonnen, verwerkt tot producten, gebruikt en daarna weggegooid. Tegenover de circulaire economie.',
    voorbeeld: 'Een plastic fles die na eenmalig gebruik in het milieu belandt is een voorbeeld van de lineaire economie.',
    categorie: 'Duurzaamheid',
  },
]

const KEURINGSDIENST_EXTRA = [
  {
    term: 'Compostthee',
    definitie: 'Vloeibaar extract gemaakt door compost in water te laten weken of te beluchten. Het bevat voedingsstoffen en miljarden micro-organismen die het bodemleven stimuleren.',
    voorbeeld: 'Compostthee verbetert de bodemkwaliteit en stimuleert de groei van planten.',
    categorie: 'Techniek',
  },
  {
    term: 'Kunstmest',
    definitie: 'Synthetisch geproduceerde meststof met hoog gehalte aan stikstof, fosfor en/of kalium. Geeft planten direct voeding maar verbetert de bodemstructuur en het bodemleven niet.',
    voorbeeld: 'Kunstmest zorgt voor snelle groei maar kan bij overmatig gebruik de bodem uitputten.',
    categorie: 'Techniek',
  },
  {
    term: 'Experiment',
    definitie: 'Een gecontroleerde proef om een hypothese te testen. Eén variabele wordt veranderd terwijl alle andere gelijk worden gehouden.',
    voorbeeld: 'In dit project is de onafhankelijke variabele het type toevoeging aan de bodem.',
    categorie: 'Experiment',
  },
  {
    term: 'Hypothese',
    definitie: 'Een voorspelling over de uitkomst van een experiment, gebaseerd op redenering of bestaande kennis. Een hypothese moet testbaar zijn.',
    voorbeeld: 'Hypothese: de plant met compostthee zal hoger groeien dan de plant zonder toevoeging.',
    categorie: 'Experiment',
  },
  {
    term: 'Controlegroep',
    definitie: 'De groep in een experiment die geen behandeling ontvangt. Dit is de basis waarmee andere groepen worden vergeleken.',
    voorbeeld: 'De pot zonder toevoeging is de controlegroep van ons experiment.',
    categorie: 'Experiment',
  },
  {
    term: 'Variabele',
    definitie: 'Een factor in een experiment die kan veranderen of worden gemeten.',
    voorbeeld: 'De hoogte van de plant is een afhankelijke variabele.',
    categorie: 'Experiment',
  },
  {
    term: 'Onafhankelijke variabele',
    definitie: 'Wat je zelf verandert in het experiment. In dit project is dat wat je aan de pot toevoegt: niets, kunstmest of compostthee.',
    voorbeeld: 'Elke pot krijgt een andere toevoeging — dat is de onafhankelijke variabele.',
    categorie: 'Experiment',
  },
  {
    term: 'Afhankelijke variabele',
    definitie: 'Wat je meet om te zien of je verandering effect heeft. In dit project is dat hoe de plant groeit.',
    voorbeeld: 'De hoogte van de plant en de grootte van de radijs zijn de afhankelijke variabelen.',
    categorie: 'Experiment',
  },
  {
    term: 'Constante',
    definitie: 'Een factor in het experiment die bewust gelijk wordt gehouden om eerlijke vergelijking mogelijk te maken.',
    voorbeeld: 'Hoeveelheid licht, water en bodemsoort zijn constanten in dit experiment.',
    categorie: 'Experiment',
  },
  {
    term: 'Conclusie',
    definitie: 'De samenvatting van wat je hebt geleerd uit een experiment. De conclusie vergelijkt de resultaten met de hypothese.',
    voorbeeld: 'Conclusie: de plant met compostthee groeide 20% hoger dan de controlegroep.',
    categorie: 'Experiment',
  },
  {
    term: 'Nitraat',
    definitie: 'Een oplosbare vorm van stikstof (NO₃⁻) die planten via hun wortels kunnen opnemen. Bacteriën in de bodem zetten andere stikstofverbindingen om in nitraat.',
    voorbeeld: 'Kunstmest bevat veel nitraat, zodat planten direct grote hoeveelheden stikstof kunnen opnemen.',
    categorie: 'Wetenschap',
  },
  {
    term: 'Bodemstructuur',
    definitie: 'De manier waarop deeltjes in de bodem zijn georganiseerd en gegroepeerd. Een goede bodemstructuur houdt water vast, laat lucht door en is gemakkelijk te doordringen door wortels.',
    voorbeeld: 'Compost verbetert de bodemstructuur, kunstmest doet dat niet.',
    categorie: 'Wetenschap',
  },
  {
    term: 'Radijs (Raphanus sativus)',
    definitie: 'Een snelgroeiend wortelgewas dat in 3–5 weken oogstrijp is. Door de korte groeicyclus is radijs ideaal voor experimenten over plantengroei.',
    voorbeeld: 'Radijs is de perfecte experimentplant: snel, zichtbare wortels en eenvoudig te kweken.',
    categorie: 'Wetenschap',
  },
  {
    term: 'Bodemkwaliteit',
    definitie: 'De mate waarin een bodem in staat is om plantengroei te ondersteunen, water te filteren en het klimaat te reguleren. Wordt bepaald door chemische, fysische en biologische eigenschappen.',
    voorbeeld: 'Intensieve landbouw met kunstmest vermindert op den duur de bodemkwaliteit.',
    categorie: 'Wetenschap',
  },
]
export const woordenlijst = {
  wormenhotel: [...GEDEELD, ...WORMENHOTEL_EXTRA].sort((a, b) => a.term.localeCompare(b.term, 'nl')),
  keuringsdienst: [...GEDEELD, ...KEURINGSDIENST_EXTRA].sort((a, b) => a.term.localeCompare(b.term, 'nl')),
}

export const categorieKleuren = {
  Basis:       'bg-gray-100 text-gray-600',
  Wetenschap:  'bg-gray-100 text-gray-600',
  Techniek:    'bg-gray-100 text-gray-600',
  Duurzaamheid:'bg-gray-100 text-gray-600',
  Experiment:  'bg-gray-100 text-gray-600',
}
