'use client';

import dynamic from 'next/dynamic';

// Static SVG shown while Lottie bundle loads (ssr:false = no flash)
function FlameSVG({ active }: { active: boolean }) {
  const fill = active ? '#6f9460' : '#35322f';
  return (
    <svg width="88" height="88" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12 2C9 5.5 6.5 9.5 6.5 13.5C6.5 17.09 9.02 20 12 20C14.98 20 17.5 17.09 17.5 13.5C17.5 9.5 15 5.5 12 2Z"
        fill={fill}
        fillOpacity={active ? 0.85 : 0.4}
      />
      <path
        d="M12 9.5C10.5 11.5 10 13 10 14.5C10 16.43 10.9 17.5 12 17.5C13.1 17.5 14 16.43 14 14.5C14 13 13.5 11.5 12 9.5Z"
        fill={fill}
        fillOpacity={active ? 1 : 0.3}
      />
    </svg>
  );
}

// Dynamically loaded — setWasmUrl inside LottieFlame.tsx runs client-only
const LottieFlame = dynamic(() => import('./LottieFlame'), {
  ssr: false,
  loading: () => null,
});

export default function StreakDisplay({
  current,
  best,
}: {
  current: number;
  best: number;
}) {
  const active = current > 0;

  return (
    <div style={s.page}>
      <div style={s.card}>
        {/* Fire animation */}
        <LottieFlame opacity={active ? 1 : 0.2} />

        {/* Streak number */}
        <span style={{ ...s.number, color: active ? '#6f9460' : '#35322f' }}>
          {current}
        </span>

        {/* Label */}
        <span style={s.label}>day streak</span>

        {/* Best — only when > 0 */}
        {best > 0 && (
          <span style={s.best}>
            best&nbsp;·&nbsp;{best}&nbsp;{best === 1 ? 'day' : 'days'}
          </span>
        )}
      </div>
    </div>
  );
}

const s = {
  page: {
    backgroundColor: '#1c1917',
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '2rem 1.5rem',
    fontFamily: "'Courier New', 'Geist Mono', monospace",
  },
  card: {
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    gap: '0.5rem',
    width: '100%',
    maxWidth: '240px',
  },
  number: {
    fontSize: 'clamp(4rem, 18vw, 5.5rem)',
    fontWeight: '700' as const,
    lineHeight: 1,
    letterSpacing: '-0.04em',
    fontFamily: "'Geist', 'Inter', system-ui, sans-serif",
    transition: 'color 0.3s',
  },
  label: {
    fontSize: '0.72rem',
    letterSpacing: '0.18em',
    textTransform: 'uppercase' as const,
    color: '#4a4643',
    marginTop: '0.25rem',
  },
  best: {
    fontSize: '0.65rem',
    letterSpacing: '0.08em',
    color: '#2e2c29',
    marginTop: '0.75rem',
  },
} as const;
