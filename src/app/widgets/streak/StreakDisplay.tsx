'use client';

import dynamic from 'next/dynamic';

function ProgressRing({ current, size = 156 }: { current: number; size?: number }) {
  const milestones = [3, 7, 14, 30, 60, 100, 365];
  const idx = milestones.findIndex((m) => current < m);
  const next = idx === -1 ? 365 : milestones[idx];
  const prev = idx > 0 ? milestones[idx - 1] : 0;
  const pct = current === 0 ? 0 : Math.min((current - prev) / (next - prev), 1);

  const strokeW = 4;
  const r = (size - strokeW * 2) / 2;
  const circ = 2 * Math.PI * r;

  return (
    <svg
      width={size}
      height={size}
      style={{ transform: 'rotate(-90deg)', display: 'block' }}
      aria-hidden="true"
    >
      {/* Track */}
      <circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        fill="none"
        stroke="#242120"
        strokeWidth={strokeW}
      />
      {/* Progress arc */}
      {current > 0 && (
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke="#6f9460"
          strokeWidth={strokeW}
          strokeLinecap="round"
          strokeDasharray={`${circ * pct} ${circ}`}
          style={{ filter: 'drop-shadow(0 0 5px rgba(111,148,96,0.5))' }}
        />
      )}
      {/* Milestone pip at 100% (decorative dot at start position) */}
      <circle
        cx={size / 2}
        cy={strokeW}
        r={2.5}
        fill={current > 0 ? '#6f9460' : '#242120'}
        style={{ filter: current > 0 ? 'drop-shadow(0 0 3px rgba(111,148,96,0.6))' : 'none' }}
      />
    </svg>
  );
}

const LottieFlame = dynamic(() => import('./LottieFlame'), {
  ssr: false,
  loading: () => <div style={{ width: 72, height: 72 }} />,
});

function getMilestone(n: number): { next: number; diff: number; pct: number } {
  const ms = [3, 7, 14, 30, 60, 100, 365];
  const idx = ms.findIndex((m) => n < m);
  if (idx === -1) return { next: 365, diff: 0, pct: 1 };
  const next = ms[idx];
  const prev = idx > 0 ? ms[idx - 1] : 0;
  return { next, diff: next - n, pct: Math.max(0, (n - prev) / (next - prev)) };
}

export default function StreakDisplay({ current, best }: { current: number; best: number }) {
  const active = current > 0;
  const { next, diff, pct } = getMilestone(current);

  return (
    <div style={s.page}>
      <div
        style={{
          ...s.card,
          border: `1px solid ${active ? 'rgba(111,148,96,0.14)' : '#232120'}`,
          boxShadow: active
            ? '0 0 0 1px rgba(111,148,96,0.06), 0 8px 48px rgba(0,0,0,0.4)'
            : '0 8px 32px rgba(0,0,0,0.3)',
        }}
      >
        {/* Ring wrapping the fire */}
        <div style={s.ringWrap}>
          <div style={s.ringLayer}>
            <ProgressRing current={current} size={156} />
          </div>
          <div style={s.flameLayer}>
            <LottieFlame opacity={active ? 1 : 0.18} size={72} />
          </div>
        </div>

        {/* Hero number */}
        <span
          style={{
            ...s.number,
            color: active ? '#ede9e1' : '#2e2b28',
          }}
        >
          {current}
        </span>

        {/* Label */}
        <span style={s.dayLabel}>day streak</span>

        {/* Milestone progress */}
        <div style={s.milestoneWrap}>
          <div style={s.track}>
            <div
              style={{
                ...s.fill,
                width: `${pct * 100}%`,
                opacity: active ? 1 : 0.3,
              }}
            />
          </div>
          <div style={s.milestoneLabels}>
            <span style={s.milestoneLeft}>
              {active ? `${current}d` : '—'}
            </span>
            <span style={s.milestoneRight}>
              {active && diff > 0
                ? `${diff} to ${next}d`
                : current >= 365
                ? 'legendary'
                : `next: ${next}d`}
            </span>
          </div>
        </div>

        {/* Best streak */}
        {best > 0 && (
          <div style={s.bestRow}>
            <span style={s.bestRule} />
            <span style={s.bestText}>
              best&nbsp;
              <span style={{ color: active ? '#4d4a46' : '#2e2b28' }}>{best}</span>
              &nbsp;{best === 1 ? 'day' : 'days'}
            </span>
            <span style={s.bestRule} />
          </div>
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
    padding: '2rem 1rem',
    fontFamily: "'Inter', 'Geist', system-ui, sans-serif",
  },
  card: {
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    width: '100%',
    maxWidth: '216px',
    padding: '2rem 1.5rem 1.5rem',
    borderRadius: '20px',
    backgroundColor: '#1e1b19',
    gap: 0,
  },
  ringWrap: {
    position: 'relative' as const,
    width: 156,
    height: 156,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '1.25rem',
  },
  ringLayer: {
    position: 'absolute' as const,
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    pointerEvents: 'none' as const,
  },
  flameLayer: {
    position: 'relative' as const,
    zIndex: 1,
  },
  number: {
    fontSize: 'clamp(4rem, 18vw, 5.5rem)',
    fontWeight: '800' as const,
    lineHeight: 1,
    letterSpacing: '-0.05em',
    fontVariantNumeric: 'tabular-nums' as const,
    transition: 'color 0.3s',
    marginBottom: '0.3rem',
  },
  dayLabel: {
    fontSize: '0.58rem',
    letterSpacing: '0.24em',
    textTransform: 'uppercase' as const,
    color: '#373430',
    marginBottom: '1.5rem',
  },
  milestoneWrap: {
    width: '100%',
    marginBottom: '1.25rem',
  },
  track: {
    width: '100%',
    height: '2px',
    backgroundColor: '#252220',
    borderRadius: '2px',
    overflow: 'hidden' as const,
    marginBottom: '0.45rem',
  },
  fill: {
    height: '100%',
    backgroundColor: '#6f9460',
    borderRadius: '2px',
    boxShadow: '0 0 6px rgba(111,148,96,0.45)',
    transition: 'width 0.7s cubic-bezier(0.4,0,0.2,1)',
  },
  milestoneLabels: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  milestoneLeft: {
    fontSize: '0.56rem',
    letterSpacing: '0.06em',
    color: '#6f9460',
    fontFamily: "'Geist Mono', 'Courier New', monospace",
    opacity: 0.7,
  },
  milestoneRight: {
    fontSize: '0.56rem',
    letterSpacing: '0.06em',
    color: '#353230',
    fontFamily: "'Geist Mono', 'Courier New', monospace",
  },
  bestRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.625rem',
    width: '100%',
  },
  bestRule: {
    flex: 1,
    height: '1px',
    backgroundColor: '#252220',
    display: 'block',
  },
  bestText: {
    fontSize: '0.58rem',
    letterSpacing: '0.06em',
    color: '#35322f',
    fontFamily: "'Geist Mono', 'Courier New', monospace",
    whiteSpace: 'nowrap' as const,
  },
} as const;
