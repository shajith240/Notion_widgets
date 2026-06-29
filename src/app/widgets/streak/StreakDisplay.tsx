'use client';

import dynamic from 'next/dynamic';

const LottieFlame = dynamic(() => import('./LottieFlame'), {
  ssr: false,
  loading: () => <div style={{ width: 44, height: 44 }} />,
});

function getMilestone(n: number): { next: number; pct: number } {
  const ms = [3, 7, 14, 30, 60, 100, 365];
  const idx = ms.findIndex((m) => n < m);
  if (idx === -1) return { next: 365, pct: 1 };
  const next = ms[idx];
  const prev = idx > 0 ? ms[idx - 1] : 0;
  return { next, pct: Math.max(0, (n - prev) / (next - prev)) };
}

function WeekDots({ dates, today }: { dates: string[]; today: string }) {
  const daySet = new Set(dates.map((d) => d.slice(0, 10)));
  const DAY = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

  const week = Array.from({ length: 7 }, (_, i) => {
    const [y, mo, d] = today.split('-').map(Number);
    const dt = new Date(y, mo - 1, d);
    dt.setDate(dt.getDate() - (6 - i));
    const str = `${dt.getFullYear()}-${String(dt.getMonth() + 1).padStart(2, '0')}-${String(dt.getDate()).padStart(2, '0')}`;
    return { label: DAY[dt.getDay()], done: daySet.has(str) };
  });

  return (
    <div style={wd.row}>
      {week.map((day, i) => (
        <div key={i} style={wd.item}>
          <div
            style={{
              ...wd.dot,
              backgroundColor: day.done ? '#6f9460' : '#2a2a2a',
              boxShadow: day.done ? '0 0 5px rgba(111,148,96,0.5)' : 'none',
            }}
          />
          <span style={wd.label}>{day.label}</span>
        </div>
      ))}
    </div>
  );
}

const wd = {
  row: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
  },
  item: {
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    gap: '0.25rem',
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: '50%',
  },
  label: {
    fontSize: '0.48rem',
    letterSpacing: '0.02em',
    color: '#353230',
    fontFamily: "'Geist Mono', 'Courier New', monospace",
  },
} as const;

export default function StreakDisplay({
  current,
  best,
  dates,
  today,
}: {
  current: number;
  best: number;
  dates: string[];
  today: string;
}) {
  const active = current > 0;
  const { next, pct } = getMilestone(current);

  return (
    <div style={s.page}>
      <div style={s.card}>

        {/* Left column — icon + number */}
        <div style={s.left}>
          <div style={s.iconBox}>
            <LottieFlame opacity={active ? 1 : 0.2} size={44} />
          </div>
          <span style={{ ...s.number, color: active ? '#ede9e1' : '#2e2b28' }}>
            {current}
          </span>
          <span style={s.streakLabel}>day streak</span>
        </div>

        {/* Divider */}
        <div style={s.divider} />

        {/* Right column — milestone + bar + days */}
        <div style={s.right}>
          <div style={s.milestoneRow}>
            <span style={{ ...s.milestoneCurrent, color: active ? '#8ab07a' : '#353230' }}>
              {current}d
            </span>
            <span style={s.milestoneSlash}>/</span>
            <span style={s.milestoneNext}>{next}d</span>
            {best > 0 && (
              <span style={s.bestBadge}>best&nbsp;{best}d</span>
            )}
          </div>

          <div style={s.barTrack}>
            <div
              style={{
                ...s.barFill,
                width: `${pct * 100}%`,
                opacity: active ? 1 : 0.25,
              }}
            />
          </div>

          <WeekDots dates={dates} today={today} />
        </div>

      </div>
    </div>
  );
}

const s = {
  page: {
    backgroundColor: '#191919',
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '1.5rem 1rem',
    fontFamily: "'Inter', 'Geist', system-ui, sans-serif",
  },
  card: {
    display: 'flex',
    flexDirection: 'row' as const,
    alignItems: 'center',
    gap: '1rem',
    width: '100%',
    maxWidth: '300px',
    padding: '1rem 1rem',
    borderRadius: '14px',
    backgroundColor: '#202020',
    border: '1px solid rgba(255,255,255,0.07)',
  },

  // Left
  left: {
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    gap: '0.2rem',
    flexShrink: 0 as const,
  },
  iconBox: {
    width: 56,
    height: 56,
    borderRadius: '12px',
    backgroundColor: '#272727',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '0.25rem',
  },
  number: {
    fontSize: '2rem',
    fontWeight: '800' as const,
    lineHeight: 1,
    letterSpacing: '-0.04em',
    fontVariantNumeric: 'tabular-nums' as const,
    transition: 'color 0.3s',
  },
  streakLabel: {
    fontSize: '0.5rem',
    letterSpacing: '0.2em',
    textTransform: 'uppercase' as const,
    color: '#373430',
  },

  // Divider
  divider: {
    width: '1px',
    height: '72px',
    backgroundColor: '#2a2a2a',
    flexShrink: 0 as const,
  },

  // Right
  right: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '0.55rem',
    minWidth: 0,
  },
  milestoneRow: {
    display: 'flex',
    alignItems: 'baseline',
    gap: '0.25rem',
  },
  milestoneCurrent: {
    fontSize: '0.95rem',
    fontWeight: '700' as const,
    letterSpacing: '-0.02em',
    fontVariantNumeric: 'tabular-nums' as const,
    transition: 'color 0.3s',
  },
  milestoneSlash: {
    fontSize: '0.65rem',
    color: '#2e2b28',
    fontFamily: "'Geist Mono', monospace",
  },
  milestoneNext: {
    fontSize: '0.65rem',
    color: '#353230',
    fontFamily: "'Geist Mono', monospace",
    flex: 1,
  },
  bestBadge: {
    fontSize: '0.5rem',
    letterSpacing: '0.05em',
    color: '#353230',
    fontFamily: "'Geist Mono', monospace",
    whiteSpace: 'nowrap' as const,
  },
  barTrack: {
    width: '100%',
    height: '4px',
    backgroundColor: '#2a2a2a',
    borderRadius: '2px',
    overflow: 'hidden' as const,
  },
  barFill: {
    height: '100%',
    backgroundColor: '#6f9460',
    borderRadius: '2px',
    boxShadow: '0 0 8px rgba(111,148,96,0.5)',
    transition: 'width 0.7s cubic-bezier(0.4,0,0.2,1)',
  },
} as const;
