export function Logo({className = ""}: {className?: string}) {
  return (
    <span className={`inline-flex items-center gap-3 ${className}`}>
      <svg viewBox="0 0 64 64" className="h-11 w-11 shrink-0" aria-hidden>
        <circle cx="32" cy="32" r="30" fill="#12161c" stroke="#f5c518" strokeWidth="3" />
        <text
          x="32"
          y="28"
          textAnchor="middle"
          fill="#f5c518"
          fontSize="11"
          fontWeight="700"
          fontFamily="Arial, sans-serif"
        >
          GDL
        </text>
        <text
          x="32"
          y="42"
          textAnchor="middle"
          fill="#f4f1ea"
          fontSize="6"
          fontFamily="Arial, sans-serif"
        >
          LARGUE
        </text>
      </svg>
      <span className="leading-tight">
        <span className="block font-semibold tracking-tight">Garage de la Largue</span>
        <span className="block text-xs text-accent">Agent Renault</span>
      </span>
    </span>
  );
}
