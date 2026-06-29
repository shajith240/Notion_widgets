'use client';

import dynamic from 'next/dynamic';

// Load DotLottieReact client-side only — it uses WebAssembly internally
const DotLottieReact = dynamic(
  () =>
    import('@lottiefiles/dotlottie-react').then((m) => ({
      default: m.DotLottieReact,
    })),
  { ssr: false }
);

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
        <div style={{ ...s.lottieWrap, opacity: active ? 1 : 0.2 }}>
          <DotLottieReact
            src="/890cb942-1177-11ee-847c-73f9b2630e61.lottie"
            loop
            autoplay
            style={{ width: 88, height: 88 }}
          />
        </div>

        {/* Streak number */}
        <span style={{ ...s.number, color: active ? '#6f9460' : '#35322f' }}>
          {current}
        </span>

        {/* Label */}
        <span style={s.label}>
          {current === 1 ? 'day streak' : 'day streak'}
        </span>

        {/* Best streak — only show if ever > 0 */}
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
  lottieWrap: {
    marginBottom: '0.25rem',
    transition: 'opacity 0.3s',
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
