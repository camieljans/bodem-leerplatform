export default function NatuurAchtergrond() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: -1 }}>
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* ── Zon (rechtsboven) ── */}
        <circle cx="1320" cy="80" r="90" fill="#FEF3C7" opacity="0.30" />
        <circle cx="1320" cy="80" r="58" fill="#FDE68A" opacity="0.20" />
        <circle cx="1320" cy="80" r="34" fill="#FCD34D" opacity="0.14" />

        {/* ── Wolken ── */}
        <ellipse cx="280"  cy="72"  rx="90"  ry="28"  fill="white" opacity="0.36" />
        <ellipse cx="340"  cy="58"  rx="62"  ry="23"  fill="white" opacity="0.28" />
        <ellipse cx="215"  cy="68"  rx="50"  ry="20"  fill="white" opacity="0.22" />
        <ellipse cx="870"  cy="50"  rx="78"  ry="26"  fill="white" opacity="0.30" />
        <ellipse cx="928"  cy="38"  rx="54"  ry="20"  fill="white" opacity="0.24" />
        <ellipse cx="810"  cy="54"  rx="40"  ry="16"  fill="white" opacity="0.18" />

        {/* ── Bomen LINKS ── */}
        <rect x="30"  y="660" width="26" height="140" rx="5" fill="#2d4a1e" opacity="0.22" />
        <ellipse cx="43"  cy="545" rx="82" ry="130" fill="#1a3a0f" opacity="0.18" />
        <ellipse cx="43"  cy="505" rx="62" ry="95"  fill="#2d5a1b" opacity="0.16" />
        <ellipse cx="43"  cy="475" rx="42" ry="64"  fill="#3a6e22" opacity="0.14" />
        <rect x="155" y="695" width="18" height="100" rx="4" fill="#2d4a1e" opacity="0.20" />
        <ellipse cx="164" cy="610" rx="58" ry="100" fill="#1e4a12" opacity="0.17" />
        <ellipse cx="164" cy="578" rx="42" ry="72"  fill="#2d6a1a" opacity="0.15" />
        <ellipse cx="164" cy="552" rx="28" ry="48"  fill="#45802a" opacity="0.13" />
        <rect x="105" y="720" width="14" height="75" rx="3" fill="#3a5a22" opacity="0.18" />
        <ellipse cx="112" cy="660" rx="42" ry="72"  fill="#2a5a18" opacity="0.15" />
        <ellipse cx="112" cy="636" rx="28" ry="48"  fill="#3d7022" opacity="0.13" />
        <ellipse cx="210" cy="760" rx="32" ry="38"  fill="#3a6a22" opacity="0.12" />
        <ellipse cx="210" cy="742" rx="20" ry="26"  fill="#4a8030" opacity="0.10" />

        {/* ── Bomen RECHTS ── */}
        <rect x="1384" y="650" width="26" height="150" rx="5" fill="#2d4a1e" opacity="0.22" />
        <ellipse cx="1397" cy="532" rx="85" ry="135" fill="#1a3a0f" opacity="0.18" />
        <ellipse cx="1397" cy="490" rx="64" ry="98"  fill="#2d5a1b" opacity="0.16" />
        <ellipse cx="1397" cy="458" rx="44" ry="66"  fill="#3a6e22" opacity="0.14" />
        <rect x="1258" y="690" width="18" height="105" rx="4" fill="#2d4a1e" opacity="0.20" />
        <ellipse cx="1267" cy="600" rx="60" ry="105" fill="#1e4a12" opacity="0.17" />
        <ellipse cx="1267" cy="566" rx="44" ry="75"  fill="#2d6a1a" opacity="0.15" />
        <ellipse cx="1267" cy="538" rx="30" ry="50"  fill="#45802a" opacity="0.13" />
        <rect x="1320" y="718" width="14" height="78" rx="3" fill="#3a5a22" opacity="0.18" />
        <ellipse cx="1327" cy="655" rx="44" ry="74"  fill="#2a5a18" opacity="0.15" />
        <ellipse cx="1327" cy="630" rx="29" ry="50"  fill="#3d7022" opacity="0.13" />
        <ellipse cx="1228" cy="758" rx="34" ry="40"  fill="#3a6a22" opacity="0.12" />
        <ellipse cx="1228" cy="740" rx="22" ry="28"  fill="#4a8030" opacity="0.10" />

        {/* ── Grasgolven ── */}
        <path d="M0,820 Q90,805 180,818 Q270,831 360,818 Q450,805 540,820 Q630,835 720,820 Q810,805 900,820 Q990,835 1080,820 Q1170,805 1260,820 Q1350,835 1440,820 L1440,900 L0,900 Z" fill="#3d7a2a" opacity="0.13" />
        <path d="M0,845 Q120,832 240,845 Q360,858 480,845 Q600,832 720,845 Q840,858 960,845 Q1080,832 1200,845 Q1320,858 1440,845 L1440,900 L0,900 Z" fill="#2d5a1e" opacity="0.11" />

        {/* ── Bodemlagen ── */}
        <rect x="0" y="862" width="1440" height="14" fill="#7c5c3a" opacity="0.10" />
        <rect x="0" y="876" width="1440" height="14" fill="#6b4e30" opacity="0.09" />
        <rect x="0" y="890" width="1440" height="10" fill="#5c4226" opacity="0.08" />

        {/* Wortels */}
        <path d="M68,840 Q82,862 76,890 Q80,900 72,900"           stroke="#6b4e30" strokeWidth="2"   fill="none" opacity="0.10" />
        <path d="M80,842 Q92,866 88,892"                          stroke="#7c5c3a" strokeWidth="1.5" fill="none" opacity="0.08" />
        <path d="M1362,838 Q1376,860 1370,888 Q1374,900 1366,900" stroke="#6b4e30" strokeWidth="2"   fill="none" opacity="0.10" />
        <path d="M1374,840 Q1386,864 1382,890"                    stroke="#7c5c3a" strokeWidth="1.5" fill="none" opacity="0.08" />

        {/* ── Zwevende deeltjes ── */}
        <circle cx="360"  cy="230" r="6"   fill="#86efac" opacity="0.20" />
        <circle cx="390"  cy="185" r="4"   fill="#bbf7d0" opacity="0.16" />
        <circle cx="338"  cy="205" r="3.5" fill="#d1fae5" opacity="0.14" />
        <circle cx="430"  cy="260" r="3"   fill="#6ee7b7" opacity="0.12" />
        <circle cx="1020" cy="200" r="5.5" fill="#86efac" opacity="0.18" />
        <circle cx="1050" cy="158" r="4"   fill="#bbf7d0" opacity="0.15" />
        <circle cx="996"  cy="178" r="4.5" fill="#d1fae5" opacity="0.13" />
        <circle cx="700"  cy="140" r="4.5" fill="#a7f3d0" opacity="0.16" />
        <circle cx="722"  cy="172" r="3"   fill="#bbf7d0" opacity="0.13" />
        <circle cx="1100" cy="110" r="3"   fill="#FDE68A" opacity="0.18" />
        <circle cx="1130" cy="140" r="2"   fill="#FEF3C7" opacity="0.14" />
      </svg>
    </div>
  )
}
