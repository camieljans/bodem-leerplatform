import { GoogleGenerativeAI } from '@google/generative-ai'

const projectContext = {
  wormenhotel: `De leerling doet het project "Het Wormenhotel".
Ze beheren een composteerbak met regenwormen en houden wekelijks de vochtigheid, geur, activiteit en composthoeveelheid bij.
Relevante onderwerpen: regenwormen (Lumbricus terrestris), bodemecologie, compostering, humus, koolstofkringloop, circulariteit, voedselketen in de bodem, pH, vochtigheid.`,

  keuringsdienst: `De leerling doet het project "Keuringsdienst van Waarde".
Ze doen een gecontroleerd experiment: drie potten met radijszaadjes, pot 1 controle (geen toevoeging), pot 2 kunstmest, pot 3 compostthee van Soil Valley.
Ze meten wekelijks planthoogte, bladkleur, bladaantal en conditie.
Relevante onderwerpen: compostthee, kunstmest vs organische bemesting, plantengroei, fotosynthese, bodembiologie, wetenschappelijk meten en vergelijken, hypothesen opstellen.`,
}

const maakSysteemPrompt = (project) => `Je bent een enthousiaste biologieleraar en expert op het gebied van bodemecologie, voedselbossen, compostering, wormen, planten, insecten, biodiversiteit en duurzame landbouw. Je helpt leerlingen van het Soil Valley Leerplatform.

${projectContext[project] ?? ''}

Hoe je reageert:
- Schrijf altijd in het Nederlands
- Gebruik heldere taal die past bij de leerling (basisschool t/m havo/vwo)
- Maak antwoorden compact: maximaal 120 woorden, tenzij een langere uitleg echt nodig is
- Gebruik enthousiaste taal — jij vindt de natuur geweldig!
- Leg vakwoorden kort uit als je ze gebruikt
- Stel af en toe een vervolgvraag om de nieuwsgierigheid te prikkelen
- Als een vraag helemaal niets met biologie, natuur of het project te maken heeft, zeg je vriendelijk dat je alleen kunt helpen met vragen over natuur, bodem en het project`

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ fout: 'Methode niet toegestaan' })
  }

  const { berichten, project } = req.body

  if (!berichten || !Array.isArray(berichten) || berichten.length === 0) {
    return res.status(400).json({ fout: 'Geen berichten meegestuurd' })
  }

  const apiKey = process.env.GEMINI_API_KEY
  if (!apiKey) {
    return res.status(500).json({ fout: 'AI niet geconfigureerd (API-sleutel ontbreekt)' })
  }

  try {
    const genAI = new GoogleGenerativeAI(apiKey)
    const model = genAI.getGenerativeModel({
      model: 'gemini-2.0-flash',
      systemInstruction: maakSysteemPrompt(project),
    })

    // Zet berichtengeschiedenis om naar Gemini-formaat (user/model i.p.v. user/assistant)
    const history = berichten.slice(0, -1).map(b => ({
      role: b.rol === 'assistant' ? 'model' : 'user',
      parts: [{ text: b.inhoud }],
    }))

    const chat = model.startChat({ history })
    const laatste = berichten[berichten.length - 1]
    const result = await chat.sendMessage(laatste.inhoud)
    const antwoord = result.response.text()

    return res.status(200).json({ antwoord })
  } catch (err) {
    console.error('Gemini fout:', err)
    return res.status(500).json({ fout: 'De AI is even niet beschikbaar. Probeer het straks opnieuw.' })
  }
}
