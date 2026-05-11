import { useState } from 'react'
import {
  ArrowRight,
  Beaker,
  BookOpen,
  CheckCircle2,
  ClipboardList,
  Droplets,
  FlaskConical,
  Gauge,
  Leaf,
  Microscope,
  Play,
  Sprout,
  Worm,
} from 'lucide-react'

const scenes = {
  keuringsdienst: {
    label: 'Keuringsdienst van Waarde',
    kicker: 'Onderzoeksmissie',
    title: 'Drie potten. Een bewijsdossier. Een conclusie die klopt.',
    intro:
      'Onderzoek of compostthee invloed heeft op plantengroei. Meet, vergelijk en bouw stap voor stap je eigen dossier op.',
    accent: 'cyan',
    icon: FlaskConical,
    mission: 'Bewijs verzamelen',
    weeks: [
      ['Week 1', 'Hypothese opstellen', 'Variabelen kiezen'],
      ['Week 2', 'Experiment starten', 'Potten labelen'],
      ['Week 3', 'Eerste meting', 'Lengte en bladkleur'],
      ['Week 4', 'Data vergelijken', 'Patronen zoeken'],
      ['Week 5', 'Conclusie bouwen', 'Bewijs selecteren'],
      ['Week 6', 'Presenteren', 'Onderzoeksrapport'],
    ],
    cards: [
      { icon: Beaker, title: 'Pot A', text: 'Alleen water', value: 'Controle' },
      { icon: Droplets, title: 'Pot B', text: 'Kunstmest', value: 'Vergelijking' },
      { icon: Sprout, title: 'Pot C', text: 'Compostthee', value: 'Onderzoek' },
    ],
  },
  wormenhotel: {
    label: 'Het Wormenhotel',
    kicker: 'Bodemmissie',
    title: 'Duik onder de grond en ontdek hoe afval weer leven wordt.',
    intro:
      'Bouw een levend systeem, observeer de omstandigheden en ontdek hoe wormen de kringloop sluiten.',
    accent: 'emerald',
    icon: Worm,
    mission: 'Kringloop activeren',
    weeks: [
      ['Week 1', 'Hotel bouwen', 'Bodemlagen maken'],
      ['Week 2', 'Bewoners plaatsen', 'Rustig laten wennen'],
      ['Week 3', 'Vocht checken', 'Gezonde bedding'],
      ['Week 4', 'Afval kiezen', 'Wel of niet voeren'],
      ['Week 5', 'Compost bekijken', 'Verandering zien'],
      ['Week 6', 'Oogsten', 'Kringloop uitleggen'],
    ],
    cards: [
      { icon: Leaf, title: 'Groen afval', text: 'Schillen en blad', value: 'Voeding' },
      { icon: Gauge, title: 'Vochtigheid', text: 'Niet droog, niet nat', value: 'Balans' },
      { icon: Worm, title: 'Wormenactiviteit', text: 'Beweging en geur', value: 'Signaal' },
    ],
  },
}

export default function CinematicPreview() {
  const [project, setProject] = useState('keuringsdienst')
  const [activeWeek, setActiveWeek] = useState(2)
  const [evidence, setEvidence] = useState(1)
  const data = scenes[project]
  const ProjectIcon = data.icon

  return (
    <main className={`min-h-screen overflow-hidden bg-slate-950 text-white cinematic-${data.accent}`}>
      <div className="cinematic-bg" />
      <div className="cinematic-soil">
        <span />
        <span />
        <span />
      </div>

      <section className="relative min-h-screen px-5 py-6 sm:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-6">
          <header className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/15 bg-white/10 backdrop-blur">
                <ProjectIcon className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.28em] text-white/45">Circulair Leerplatform</p>
                <p className="font-semibold text-white/90">Cinematische preview</p>
              </div>
            </div>

            <div className="flex rounded-full border border-white/15 bg-white/10 p-1 backdrop-blur">
              {Object.entries(scenes).map(([key, item]) => (
                <button
                  key={key}
                  onClick={() => {
                    setProject(key)
                    setActiveWeek(2)
                    setEvidence(1)
                  }}
                  className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                    project === key ? 'bg-white text-slate-950 shadow-lg' : 'text-white/70 hover:text-white'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </header>

          <div className="grid min-h-[calc(100vh-118px)] items-center gap-8 lg:grid-cols-[1fr_0.95fr]">
            <section className="relative z-10 max-w-3xl">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-semibold text-white/75 backdrop-blur">
                <span className="h-2 w-2 rounded-full bg-current shadow-[0_0_18px_currentColor]" />
                {data.kicker}
              </div>
              <h1 className="max-w-4xl text-4xl font-black leading-[0.98] tracking-normal sm:text-6xl xl:text-7xl">
                {data.title}
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-7 text-white/68 sm:text-lg sm:leading-8">
                {data.intro}
              </p>

              <div className="mt-7 flex flex-wrap gap-3">
                <button className="group inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 font-bold text-slate-950 shadow-2xl transition hover:translate-y-[-2px]">
                  <Play className="h-4 w-4 fill-current" />
                  Start missie
                  <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                </button>
                <button className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-6 py-3 font-bold text-white backdrop-blur transition hover:bg-white/15">
                  <BookOpen className="h-4 w-4" />
                  Bekijk dossier
                </button>
              </div>

              <div className="mt-8 grid gap-3 sm:grid-cols-3">
                {data.cards.map(Card => {
                  const Icon = Card.icon
                  return (
                    <article key={Card.title} className="rounded-3xl border border-white/10 bg-white/[0.08] p-4 shadow-2xl backdrop-blur-xl">
                      <div className="mb-4 flex items-center justify-between">
                        <Icon className="h-5 w-5 text-white/80" />
                        <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-bold text-white/60">{Card.value}</span>
                      </div>
                      <h2 className="font-bold text-white">{Card.title}</h2>
                      <p className="mt-1 text-sm text-white/55">{Card.text}</p>
                    </article>
                  )
                })}
              </div>
            </section>

            <aside className="relative z-10">
              <div className="cinematic-device rounded-[2rem] border border-white/12 bg-slate-900/72 p-4 shadow-2xl backdrop-blur-2xl">
                <div className="rounded-[1.5rem] border border-white/10 bg-slate-950/70 p-5">
                  <div className="mb-5 flex items-center justify-between">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-[0.24em] text-white/35">Missiekaart</p>
                      <h2 className="mt-1 text-2xl font-black">{data.mission}</h2>
                    </div>
                    <div className="rounded-2xl bg-white/10 p-3">
                      <Microscope className="h-6 w-6" />
                    </div>
                  </div>

                  <div className="space-y-3">
                    {data.weeks.map((week, index) => {
                      const active = index === activeWeek
                      const done = index < activeWeek
                      return (
                        <button
                          key={week[0]}
                          onClick={() => {
                            setActiveWeek(index)
                            setEvidence(Math.min(5, index + 1))
                          }}
                          className={`group flex w-full items-center gap-4 rounded-2xl border p-4 text-left transition ${
                            active
                              ? 'border-white/30 bg-white/16 shadow-[0_0_34px_rgba(255,255,255,0.08)]'
                              : 'border-white/8 bg-white/[0.045] hover:bg-white/[0.075]'
                          }`}
                        >
                          <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl ${
                            done ? 'bg-emerald-400 text-slate-950' : active ? 'bg-white text-slate-950' : 'bg-white/10 text-white/50'
                          }`}>
                            {done ? <CheckCircle2 className="h-5 w-5" /> : <span className="font-black">{index + 1}</span>}
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="text-xs font-bold uppercase tracking-[0.18em] text-white/35">{week[0]}</p>
                            <p className="font-bold text-white">{week[1]}</p>
                            <p className="text-sm text-white/48">{week[2]}</p>
                          </div>
                          <ArrowRight className={`h-4 w-4 shrink-0 transition ${active ? 'text-white' : 'text-white/25 group-hover:translate-x-1'}`} />
                        </button>
                      )
                    })}
                  </div>

                  <div className="mt-5 rounded-3xl border border-white/10 bg-white/[0.06] p-5">
                    <div className="mb-3 flex items-center justify-between">
                      <p className="flex items-center gap-2 text-sm font-bold text-white/80">
                        <ClipboardList className="h-4 w-4" />
                        Bewijsdossier
                      </p>
                      <span className="text-sm font-black text-white">{evidence}/6</span>
                    </div>
                    <div className="h-3 overflow-hidden rounded-full bg-white/10">
                      <div
                        className="h-full rounded-full bg-white transition-all duration-500"
                        style={{ width: `${(evidence / 6) * 100}%` }}
                      />
                    </div>
                    <p className="mt-3 text-sm leading-6 text-white/52">
                      Voeg metingen, foto’s en reflecties toe. Aan het einde verandert dit automatisch in je eindrapport.
                    </p>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </main>
  )
}
