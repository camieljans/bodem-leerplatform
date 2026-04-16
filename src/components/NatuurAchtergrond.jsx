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
        <circle cx="1360" cy="90" r="70" fill="#FFF9C4" opacity="0.35" />
        <circle cx="1360" cy="90" r="48" fill="#FFEE58" opacity="0.18" />

        {/* ── Wolkjes ── */}
        <ellipse cx="300" cy="80" rx="80" ry="28" fill="white" opacity="0.40" />
        <ellipse cx="355" cy="68" rx="55" ry="22" fill="white" opacity="0.35" />
        <ellipse cx="240" cy="75" rx="45" ry="18" fill="white" opacity="0.30" />

        <ellipse cx="900" cy="55" rx="70" ry="24" fill="white" opacity="0.35" />
        <ellipse cx="950" cy="44" rx="48" ry="19" fill="white" opacity="0.30" />

        {/* ── Bomen LINKS ── */}
        {/* Grote boom achteraan */}
        <rect x="52" y="680" width="22" height="110" rx="4" fill="#5D4037" opacity="0.16" />
        <ellipse cx="63" cy="580" rx="72" ry="115" fill="#1B5E20" opacity="0.13" />
        <ellipse cx="63" cy="545" rx="55" ry="85" fill="#2E7D32" opacity="0.12" />
        <ellipse cx="63" cy="518" rx="38" ry="58" fill="#388E3C" opacity="0.11" />

        {/* Middelste boom */}
        <rect x="178" y="710" width="16" height="80" rx="3" fill="#6D4C41" opacity="0.14" />
        <ellipse cx="186" cy="630" rx="52" ry="95" fill="#2E7D32" opacity="0.12" />
        <ellipse cx="186" cy="600" rx="38" ry="68" fill="#43A047" opacity="0.11" />
        <ellipse cx="186" cy="578" rx="26" ry="45" fill="#4CAF50" opacity="0.10" />

        {/* Kleine boom vooraan */}
        <rect x="118" y="730" width="12" height="60" rx="3" fill="#5D4037" opacity="0.13" />
        <ellipse cx="124" cy="670" rx="38" ry="68" fill="#388E3C" opacity="0.11" />
        <ellipse cx="124" cy="650" rx="26" ry="46" fill="#4CAF50" opacity="0.10" />

        {/* ── Bomen RECHTS ── */}
        {/* Grote boom achteraan */}
        <rect x="1366" y="670" width="22" height="120" rx="4" fill="#4E342E" opacity="0.16" />
        <ellipse cx="1377" cy="565" rx="75" ry="120" fill="#1B5E20" opacity="0.13" />
        <ellipse cx="1377" cy="528" rx="57" ry="88" fill="#2E7D32" opacity="0.12" />
        <ellipse cx="1377" cy="500" rx="40" ry="60" fill="#388E3C" opacity="0.11" />

        {/* Middelste boom */}
        <rect x="1246" y="700" width="16" height="90" rx="3" fill="#5D4037" opacity="0.14" />
        <ellipse cx="1254" cy="615" rx="55" ry="98" fill="#2E7D32" opacity="0.12" />
        <ellipse cx="1254" cy="585" rx="40" ry="70" fill="#43A047" opacity="0.11" />
        <ellipse cx="1254" cy="562" rx="27" ry="46" fill="#4CAF50" opacity="0.10" />

        {/* Kleine boom vooraan */}
        <rect x="1308" y="725" width="13" height="65" rx="3" fill="#6D4C41" opacity="0.13" />
        <ellipse cx="1314" cy="662" rx="40" ry="70" fill="#388E3C" opacity="0.11" />
        <ellipse cx="1314" cy="642" rx="27" ry="48" fill="#4CAF50" opacity="0.10" />

        {/* ── Gras & bodem onderaan ── */}
        {/* Golvende grasslijn */}
        <path
          d="M0,800 Q120,782 240,795 Q360,808 480,796 Q600,784 720,798 Q840,812 960,800 Q1080,788 1200,800 Q1320,812 1440,798 L1440,900 L0,900 Z"
          fill="#4CAF50" opacity="0.10"
        />
        {/* Grassprieten hints */}
        <path d="M60,800 Q58,778 62,800" stroke="#388E3C" strokeWidth="2" fill="none" opacity="0.12" />
        <path d="M65,800 Q67,772 63,800" stroke="#43A047" strokeWidth="2" fill="none" opacity="0.10" />
        <path d="M1380,795 Q1378,770 1382,795" stroke="#388E3C" strokeWidth="2" fill="none" opacity="0.12" />

        {/* Bodemlagen */}
        <rect x="0" y="810" width="1440" height="28" fill="#6D4C41" opacity="0.09" />
        <rect x="0" y="838" width="1440" height="28" fill="#5D4037" opacity="0.08" />
        <rect x="0" y="866" width="1440" height="34" fill="#4E342E" opacity="0.07" />

        {/* Wortels (subtiel) */}
        <path d="M80,810 Q95,835 88,865 Q92,880 85,900" stroke="#5D4037" strokeWidth="2" fill="none" opacity="0.09" />
        <path d="M93,812 Q105,838 100,870" stroke="#6D4C41" strokeWidth="1.5" fill="none" opacity="0.07" />
        <path d="M1355,808 Q1368,834 1362,862 Q1366,878 1360,900" stroke="#5D4037" strokeWidth="2" fill="none" opacity="0.09" />
        <path d="M1342,810 Q1352,836 1348,868" stroke="#6D4C41" strokeWidth="1.5" fill="none" opacity="0.07" />

        {/* ── Zwevende bladeren (midden) ── */}
        <circle cx="420" cy="220" r="7" fill="#A5D6A7" opacity="0.22" />
        <circle cx="445" cy="175" r="5" fill="#C8E6C9" opacity="0.18" />
        <circle cx="400" cy="190" r="4" fill="#DCEDC8" opacity="0.16" />

        <circle cx="980" cy="195" r="6" fill="#A5D6A7" opacity="0.20" />
        <circle cx="1010" cy="155" r="4.5" fill="#C8E6C9" opacity="0.17" />
        <circle cx="960" cy="168" r="5" fill="#DCEDC8" opacity="0.15" />

        <circle cx="700" cy="130" r="5" fill="#B2DFDB" opacity="0.18" />
        <circle cx="720" cy="160" r="3.5" fill="#C8E6C9" opacity="0.15" />
      </svg>
    </div>
  )
}
