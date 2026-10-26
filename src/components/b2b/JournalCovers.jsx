const TONES = {
  paper: { background: '#F4EFE6', color: '#1E1B18', band: '#E5A93C', border: '#E5DDCF' },
  ink: { background: '#1E1B18', color: '#FAF7F2', band: '#E5A93C', border: '#1E1B18' },
  gold: { background: '#E5A93C', color: '#1E1B18', band: '#1E1B18', border: '#C4892A' }
};

function Cover({ tone, className = '' }) {
  const style = TONES[tone];
  return (
    <div
      className={`absolute top-0 h-full w-[58%] rounded-2xl border shadow-lg ${className}`}
      style={{ background: style.background, color: style.color, borderColor: style.border }}
    >
      <span className="absolute inset-y-0 left-0 w-3 rounded-l-2xl" style={{ background: style.band }} />
      <span className="absolute inset-5 rounded-lg border border-current opacity-30" />
      <span className="absolute inset-0 flex items-center justify-center text-[11px] font-semibold uppercase tracking-[0.22em]">
        Logo
      </span>
    </div>
  );
}

export default function JournalCovers({ caption = 'Plain covers with a logo placeholder.' }) {
  return (
    <figure className="rounded-3xl border border-[#E5DDCF] bg-white p-6 sm:p-8 shadow-xl">
      <div className="relative mx-auto h-64 w-full max-w-sm sm:h-72" aria-hidden="true">
        <Cover tone="ink" className="left-0 -rotate-6" />
        <Cover tone="gold" className="left-[21%] rotate-3" />
        <Cover tone="paper" className="right-0" />
      </div>
      <figcaption className="mt-5 text-center text-xs text-[#6A6054] font-light">{caption}</figcaption>
    </figure>
  );
}
