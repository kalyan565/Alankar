import Link from 'next/link'

export default function Logo() {
  return (
    <Link href="/" className="flex items-center gap-3 group">
      <div className="relative">
        {/* Main Logo Icon - Elegant "A" with beauty and elegance elements */}
        <svg
          width="50"
          height="50"
          viewBox="0 0 50 50"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="transition-all duration-300 group-hover:scale-110 group-hover:rotate-3"
        >
          {/* Outer decorative ring */}
          <circle cx="25" cy="25" r="23" fill="url(#outerGradient)" opacity="0.1" />
          
          {/* Main background circle with gradient */}
          <circle cx="25" cy="25" r="20" fill="url(#mainGradient)" />
          
          {/* Elegant stylized "A" letter */}
          <path
            d="M25 10 L18 38 L21 38 L23 28 L27 28 L29 38 L32 38 L25 10 Z"
            fill="white"
            stroke="white"
            strokeWidth="1.2"
          />
          
          {/* Horizontal accent bar with gradient */}
          <path
            d="M22 26 L28 26"
            stroke="url(#accentGradient)"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
          
          {/* Beauty sparkle elements - top left */}
          <g opacity="0.9">
            <circle cx="12" cy="12" r="2.5" fill="white" />
            <path
              d="M12 12 L12 8 M12 12 L12 16 M12 12 L8 12 M12 12 L16 12"
              stroke="white"
              strokeWidth="1.2"
              strokeLinecap="round"
            />
          </g>
          
          {/* Beauty sparkle elements - top right */}
          <g opacity="0.9">
            <circle cx="38" cy="12" r="2.5" fill="white" />
            <path
              d="M38 12 L38 8 M38 12 L38 16 M38 12 L34 12 M38 12 L42 12"
              stroke="white"
              strokeWidth="1.2"
              strokeLinecap="round"
            />
          </g>
          
          {/* Elegant curve accent - bottom */}
          <path
            d="M18 36 Q25 40 32 36"
            stroke="url(#accentGradient)"
            strokeWidth="2"
            strokeLinecap="round"
            fill="none"
            opacity="0.7"
          />
          
          <defs>
            <linearGradient id="outerGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#d946ef" />
              <stop offset="100%" stopColor="#a21caf" />
            </linearGradient>
            <linearGradient id="mainGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#d946ef" />
              <stop offset="50%" stopColor="#c026d3" />
              <stop offset="100%" stopColor="#a21caf" />
            </linearGradient>
            <linearGradient id="accentGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#fae8ff" />
              <stop offset="50%" stopColor="#f0abfc" />
              <stop offset="100%" stopColor="#e879f9" />
            </linearGradient>
          </defs>
        </svg>
      </div>
      
      {/* Text Logo with elegant typography */}
      <div className="flex flex-col">
        <span className="text-2xl font-bold text-primary-600 leading-tight tracking-tight">
          Alankar
        </span>
        <span className="text-xs font-semibold text-primary-500 leading-tight -mt-0.5 tracking-wider uppercase">
          Cosmetics
        </span>
      </div>
    </Link>
  )
}

