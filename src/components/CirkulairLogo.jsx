export default function CirkulairLogo({ className = 'w-10 h-10' }) {
  return (
    <svg className={className} viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="cl-grad" cx="38%" cy="36%" r="60%">
          <stop offset="0%" stopColor="#a3e6a0" />
          <stop offset="45%" stopColor="#16a34a" />
          <stop offset="100%" stopColor="#064e23" />
        </radialGradient>
        <clipPath id="cl-clip">
          <circle cx="40" cy="40" r="36" />
        </clipPath>
      </defs>

      {/* Bol */}
      <circle cx="40" cy="40" r="36" fill="url(#cl-grad)" />

      <g clipPath="url(#cl-clip)">
        {/* Continent-achtige vormen */}
        <path d="M20 26 C24 20,33 18,37 25 C41 32,35 40,28 38 C21 36,16 32,20 26Z" fill="#065f46" opacity="0.55" />
        <path d="M43 32 C47 26,58 24,60 33 C62 42,53 46,46 43 C39 40,39 38,43 32Z" fill="#065f46" opacity="0.5" />
        <path d="M26 50 C31 44,42 44,44 51 C46 58,35 62,28 59 C21 56,21 56,26 50Z" fill="#065f46" opacity="0.45" />

        {/* Breedtecirkels */}
        <ellipse cx="40" cy="40" rx="36" ry="10" fill="none" stroke="white" strokeWidth="0.8" opacity="0.18" />
        <ellipse cx="40" cy="27" rx="30" ry="7"  fill="none" stroke="white" strokeWidth="0.8" opacity="0.13" />
        <ellipse cx="40" cy="53" rx="30" ry="7"  fill="none" stroke="white" strokeWidth="0.8" opacity="0.13" />

        {/* Meridiaan */}
        <path d="M40 4 Q48 22,48 40 Q48 58,40 76" fill="none" stroke="white" strokeWidth="0.8" opacity="0.18" />
      </g>

      {/* Glans */}
      <circle cx="40" cy="40" r="36" fill="none" stroke="#d1fae5" strokeWidth="1.2" opacity="0.3" />
    </svg>
  )
}
