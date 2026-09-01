/**
 * Interim monogram until the firm's own logo files arrive: a navy plate with
 * an inset gold hairline and a serif IS, in the manner of a private-bank crest.
 */
export function LogoMark({ size = 30, className = "" }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      aria-hidden
      className={className}
    >
      <rect width="32" height="32" rx="2" fill="#0A1F3F" />
      <rect x="2.5" y="2.5" width="27" height="27" rx="1" fill="none" stroke="#C5A55A" strokeOpacity="0.85" strokeWidth="0.75" />
      <text
        x="16"
        y="21.6"
        textAnchor="middle"
        fontFamily="Georgia, 'Times New Roman', serif"
        fontSize="14.5"
        letterSpacing="0.5"
        fill="#FBFAF7"
      >
        IS
      </text>
    </svg>
  );
}

export function Wordmark({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-3 ${className}`}>
      <LogoMark />
      <span className="font-serif text-[1.15rem] font-semibold tracking-[0.01em] text-navy">
        Investor Signals
      </span>
    </span>
  );
}
