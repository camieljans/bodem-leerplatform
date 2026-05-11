import { useAuth } from '../App'

function Wormen() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: -1 }}>
      <svg width="100%" height="100%" viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">

        {/* ── Worm 1 — linksonder ── */}
        <g opacity="0.18" transform="translate(60, 760)">
          <path d="M0,0 Q12,-18 24,0 Q36,18 48,0 Q60,-18 72,0 Q84,18 96,0 Q108,-18 120,0" stroke="#c2693a" strokeWidth="9" fill="none" strokeLinecap="round"/>
          {/* Kop */}
          <circle cx="120" cy="0" r="7" fill="#c2693a"/>
          <circle cx="124" cy="-3" r="1.8" fill="#7a3e20"/>
          <circle cx="124" cy="3" r="1.8" fill="#7a3e20"/>
        </g>

        {/* ── Worm 2 — linksonder diagonaal ── */}
        <g opacity="0.14" transform="translate(30, 820) rotate(-15)">
          <path d="M0,0 Q10,-14 20,0 Q30,14 40,0 Q50,-14 60,0 Q70,14 80,0" stroke="#a0522d" strokeWidth="7" fill="none" strokeLinecap="round"/>
          <circle cx="80" cy="0" r="5.5" fill="#a0522d"/>
          <circle cx="83" cy="-2.5" r="1.4" fill="#6b3516"/>
          <circle cx="83" cy="2.5" r="1.4" fill="#6b3516"/>
        </g>

        {/* ── Worm 3 — rechtsonder ── */}
        <g opacity="0.16" transform="translate(1260, 780) rotate(10)">
          <path d="M0,0 Q12,-16 24,0 Q36,16 48,0 Q60,-16 72,0 Q84,16 96,0" stroke="#b8622e" strokeWidth="8" fill="none" strokeLinecap="round"/>
          <circle cx="96" cy="0" r="6.5" fill="#b8622e"/>
          <circle cx="100" cy="-3" r="1.6" fill="#7a3e20"/>
          <circle cx="100" cy="3" r="1.6" fill="#7a3e20"/>
        </g>

        {/* ── Worm 4 — rechtsonder klein ── */}
        <g opacity="0.12" transform="translate(1340, 840) rotate(-20)">
          <path d="M0,0 Q8,-12 16,0 Q24,12 32,0 Q40,-12 48,0" stroke="#cd7f50" strokeWidth="6" fill="none" strokeLinecap="round"/>
          <circle cx="48" cy="0" r="5" fill="#cd7f50"/>
          <circle cx="51" cy="-2" r="1.2" fill="#8b5020"/>
          <circle cx="51" cy="2" r="1.2" fill="#8b5020"/>
        </g>

        {/* ── Worm 5 — linksmidden, uit de grond ── */}
        <g opacity="0.11" transform="translate(155, 810) rotate(80)">
          <path d="M0,0 Q8,-11 16,0 Q24,11 32,0 Q40,-11 48,0" stroke="#b05c30" strokeWidth="6" fill="none" strokeLinecap="round"/>
          <circle cx="48" cy="0" r="4.5" fill="#b05c30"/>
        </g>

        {/* ── Worm 6 — rechtsmidden, klein ── */}
        <g opacity="0.10" transform="translate(1370, 810) rotate(60)">
          <path d="M0,0 Q7,-10 14,0 Q21,10 28,0 Q35,-10 42,0" stroke="#c07040" strokeWidth="5.5" fill="none" strokeLinecap="round"/>
          <circle cx="42" cy="0" r="4" fill="#c07040"/>
        </g>

      </svg>
    </div>
  )
}

function Radijsjes() {
  // Één radijs: bol + wortelstaartje + twee blaadjes
  function Radijs({ x, y, schaal = 1, hoek = 0, opacity = 0.20 }) {
    return (
      <g transform={`translate(${x},${y}) rotate(${hoek}) scale(${schaal})`} opacity={opacity}>
        {/* Wortelstaartje */}
        <path d="M0,16 Q2,26 1,34" stroke="#7a9e3b" strokeWidth="1.8" fill="none" strokeLinecap="round"/>
        {/* Bol */}
        <ellipse cx="0" cy="8" rx="11" ry="13" fill="#e03030"/>
        <ellipse cx="-3" cy="5" rx="3.5" ry="5" fill="#f05050" opacity="0.5"/>
        {/* Blaadje links */}
        <path d="M-4,-4 Q-14,-22 -6,-28 Q-2,-18 -4,-4" fill="#4a8c2a" strokeWidth="0"/>
        <path d="M-4,-4 Q-5,-16 -6,-28" stroke="#3a7020" strokeWidth="1.2" fill="none"/>
        {/* Blaadje rechts */}
        <path d="M4,-4 Q14,-22 6,-28 Q2,-18 4,-4" fill="#4a8c2a" strokeWidth="0"/>
        <path d="M4,-4 Q5,-16 6,-28" stroke="#3a7020" strokeWidth="1.2" fill="none"/>
        {/* Blaadje midden */}
        <path d="M0,-5 Q0,-24 0,-32" stroke="#3a7020" strokeWidth="1.4" fill="none"/>
        <path d="M0,-10 Q-8,-20 0,-32 Q8,-20 0,-10" fill="#5aa030" opacity="0.8"/>
      </g>
    )
  }

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: -1 }}>
      <svg width="100%" height="100%" viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
        <Radijs x={95}   y={830} schaal={1.4} hoek={-12} opacity={0.18} />
        <Radijs x={145}  y={845} schaal={1.1} hoek={8}   opacity={0.14} />
        <Radijs x={50}   y={852} schaal={0.9} hoek={-5}  opacity={0.12} />
        <Radijs x={1300} y={835} schaal={1.3} hoek={10}  opacity={0.17} />
        <Radijs x={1355} y={848} schaal={1.0} hoek={-8}  opacity={0.13} />
        <Radijs x={1395} y={840} schaal={0.8} hoek={15}  opacity={0.11} />
      </svg>
    </div>
  )
}

export default function ProjectDecoraties() {
  const { project } = useAuth()
  if (project === 'wormenhotel')    return <Wormen />
  if (project === 'keuringsdienst') return <Radijsjes />
  return null
}
