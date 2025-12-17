import Link from 'next/link'

export default function Logo() {
  return (
    <Link href="/" className="flex items-center gap-3 group">
      <div className="relative">
        {/* Creative Logo - Mixed Letters "A" and "L" forming Alankar */}
        <svg
          width="55"
          height="55"
          viewBox="0 0 55 55"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="transition-all duration-300 group-hover:scale-110 group-hover:rotate-2"
        >
          {/* Background circle with gradient */}
          <circle cx="27.5" cy="27.5" r="26" fill="url(#logoGradient)" />
          
          {/* Stylized "A" - Left side */}
          <path
            d="M18 12 L12 38 L16 38 L18 28 L22 28 L24 38 L28 38 L22 12 L18 12 Z"
            fill="white"
            stroke="white"
            strokeWidth="1.2"
          />
          <path
            d="M19 25 L21 25"
            stroke="url(#accentGradient)"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          
          {/* Stylized "L" - Right side, overlapping with A */}
          <path
            d="M30 12 L30 38 L38 38 L38 34 L34 34 L34 12 L30 12 Z"
            fill="white"
            stroke="white"
            strokeWidth="1.2"
            opacity="0.95"
          />
          
          {/* Connecting element - "a" lowercase integrated */}
          <path
            d="M25 20 Q28 18 32 20 Q34 22 33 25 Q32 28 29 28 Q26 28 25 25 Q24 22 25 20 Z"
            fill="url(#accentGradient)"
            stroke="white"
            strokeWidth="1"
            opacity="0.9"
          />
          
          {/* Decorative swirl connecting letters */}
          <path
            d="M20 15 Q24 13 28 15 Q32 17 30 20"
            stroke="url(#accentGradient)"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
            opacity="0.7"
          />
          
          {/* Beauty sparkle elements */}
          <circle cx="14" cy="14" r="2.5" fill="white" opacity="0.9" />
          <path
            d="M14 14 L14 10 M14 14 L14 18 M14 14 L10 14 M14 14 L18 14"
            stroke="white"
            strokeWidth="1.2"
            strokeLinecap="round"
            opacity="0.7"
          />
          
          <circle cx="41" cy="14" r="2.5" fill="white" opacity="0.9" />
          <path
            d="M41 14 L41 10 M41 14 L41 18 M41 14 L37 14 M41 14 L45 14"
            stroke="white"
            strokeWidth="1.2"
            strokeLinecap="round"
            opacity="0.7"
          />
          
          {/* Elegant curve accent */}
          <path
            d="M16 36 Q27.5 40 39 36"
            stroke="url(#accentGradient)"
            strokeWidth="2"
            strokeLinecap="round"
            fill="none"
            opacity="0.6"
          />
          
          <defs>
            <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#1f2937" />
              <stop offset="50%" stopColor="#111827" />
              <stop offset="100%" stopColor="#000000" />
            </linearGradient>
            <linearGradient id="accentGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="50%" stopColor="#e5e7eb" />
              <stop offset="100%" stopColor="#d1d5db" />
            </linearGradient>
          </defs>
        </svg>
      </div>
      
      {/* Text Logo with elegant typography */}
      <div className="flex flex-col">
        <div className="flex items-baseline gap-1">
          <span className="text-2xl font-bold text-black leading-tight tracking-tight">
            Al
          </span>
          <span className="text-xl font-bold text-gray-700 leading-tight">
            an
          </span>
          <span className="text-2xl font-bold text-black leading-tight tracking-tight">
            kar
          </span>
        </div>
        <span className="text-xs font-semibold text-gray-600 leading-tight -mt-0.5 tracking-wider uppercase">
          Cosmetics
        </span>
      </div>
    </Link>
  )
}
