export default function CirkulairLogo({ className = 'w-10 h-10' }) {
  return (
    <svg className={className} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <clipPath id="cl-circle">
          <circle cx="24" cy="24" r="22" />
        </clipPath>
      </defs>

      {/* Achtergrond */}
      <circle cx="24" cy="24" r="23" fill="#0d2818" />

      <g clipPath="url(#cl-circle)">
        {/* Lucht / groen boven */}
        <rect x="2" y="2" width="44" height="26" fill="#1a4030" />

        {/* Bodemlagen */}
        <rect x="2" y="28" width="44" height="7"  fill="#7c5535" />
        <rect x="2" y="35" width="44" height="6"  fill="#6b4829" />
        <rect x="2" y="41" width="44" height="7"  fill="#5a3d22" />

        {/* Grasoppervlak (golvende lijn) */}
        <path
          d="M2,28 Q8,25 14,28 Q20,31 24,27 Q28,23 34,27 Q40,31 46,27 L46,30 Q40,34 34,30 Q28,26 24,30 Q20,34 14,31 Q8,28 2,31 Z"
          fill="#2a5c1a"
        />

        {/* Stengel */}
        <line x1="24" y1="27" x2="24" y2="11" stroke="#a3e6a0" strokeWidth="2.2" strokeLinecap="round" />

        {/* Linker blad */}
        <path d="M24,21 C20,18 15,14 16,9 C20,11 24,16 24,20" fill="#4ade80" />

        {/* Rechter blad */}
        <path d="M24,17 C28,13 33,9 32,5 C28,7 24,12 24,16" fill="#86efac" />

        {/* Wortels */}
        <path d="M23,29 Q17,35 15,44" stroke="#b08050" strokeWidth="2"   fill="none" strokeLinecap="round" />
        <path d="M25,29 Q31,36 33,44" stroke="#b08050" strokeWidth="2"   fill="none" strokeLinecap="round" />
        <path d="M22,32 Q18,38 18,46" stroke="#9a6e40" strokeWidth="1.4" fill="none" strokeLinecap="round" />
        <path d="M26,32 Q30,39 30,46" stroke="#9a6e40" strokeWidth="1.4" fill="none" strokeLinecap="round" />
        <path d="M24,34 Q22,40 21,46" stroke="#8a5e34" strokeWidth="1"   fill="none" strokeLinecap="round" />
      </g>

      {/* Buitenring */}
      <circle cx="24" cy="24" r="22" fill="none" stroke="#4ade80" strokeWidth="1.2" strokeOpacity="0.35" />
    </svg>
  )
}
