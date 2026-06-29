'use client';

import { useState } from 'react';

// ── Constants ──────────────────────────────────────────────────────────────
const CELL = 13;
const GAP = 3;
const MONTH_GAP = 10;
const COLORS = [
  '#252320',              // 0 — empty
  'rgba(111,148,96,0.28)', // 1 — light
  'rgba(111,148,96,0.58)', // 2 — medium
  '#6f9460',              // 3+ — full
] as const;

// ── Types ──────────────────────────────────────────────────────────────────
interface HDay { date: string; count: number; level: number }
interface HMonth { label: string; weeks: (HDay | null)[][] }

// ── Helpers ────────────────────────────────────────────────────────────────
function level(count: number) {
  if (count <= 0) return 0;
  if (count === 1) return 1;
  if (count === 2) return 2;
  return 3;
}

function fmtLong(dateStr: string) {
  const [y, m, d] = dateStr.split('-').map(Number);
  return new Date(y, m - 1, d).toLocaleString('en-US', {
    month: 'long', day: 'numeric', year: 'numeric',
  });
}

// Build 6 months of weekly buckets (Sun–Sat columns), last month = today's month.
function buildMonths(dates: string[], today: string): HMonth[] {
  const counts: Record<string, number> = {};
  for (const d of dates) counts[d] = (counts[d] ?? 0) + 1;

  const [ty, tm, td] = today.split('-').map(Number);
  const result: HMonth[] = [];

  for (let i = 5; i >= 0; i--) {
    let year = ty;
    let month = tm - i;
    while (month <= 0) { month += 12; year--; }

    const label = new Date(year, month - 1, 1)
      .toLocaleString('en-US', { month: 'short' });
    const daysInMonth = new Date(year, month, 0).getDate();
    const isNow = year === ty && month === tm;
    const lastDay = isNow ? td : daysInMonth;

    const weeks: (HDay | null)[][] = [];
    let week: (HDay | null)[] = Array(7).fill(null);

    for (let day = 1; day <= lastDay; day++) {
      const ds = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
      const dow = new Date(year, month - 1, day).getDay(); // 0=Sun
      const c = counts[ds] ?? 0;
      week[dow] = { date: ds, count: c, level: level(c) };
      if (dow === 6 || day === lastDay) {
        weeks.push([...week]);
        week = Array(7).fill(null);
      }
    }

    result.push({ label, weeks });
  }
  return result;
}

// ── Component ──────────────────────────────────────────────────────────────
export default function HeatmapGrid({
  dates,
  today,
}: {
  dates: string[];
  today: string;
}) {
  const [tip, setTip] = useState<{ text: string; x: number; y: number } | null>(null);
  const months = buildMonths(dates, today);
  const total = dates.length;

  return (
    <div style={s.page}>
      <div style={s.wrap}>

        {/* Months row */}
        <div style={s.grid}>
          {months.map((month, mi) => (
            <div key={mi} style={s.monthCol}>
              {/* Week columns */}
              <div style={s.weekRow}>
                {month.weeks.map((week, wi) => (
                  <div key={wi} style={s.weekCol}>
                    {week.map((day, ri) => (
                      <div
                        key={ri}
                        style={{
                          ...s.cell,
                          backgroundColor: day ? COLORS[day.level] : 'transparent',
                          cursor: day ? 'pointer' : 'default',
                        }}
                        onMouseEnter={
                          day
                            ? (e) => {
                                const r = (e.currentTarget as HTMLElement).getBoundingClientRect();
                                const text =
                                  day.count === 0
                                    ? `No completions — ${fmtLong(day.date)}`
                                    : `${day.count} completion${day.count === 1 ? '' : 's'} — ${fmtLong(day.date)}`;
                                setTip({ text, x: r.left + r.width / 2, y: r.top });
                              }
                            : undefined
                        }
                        onMouseLeave={() => setTip(null)}
                      />
                    ))}
                  </div>
                ))}
              </div>

              {/* Month label below */}
              <p style={s.monthLabel}>{month.label}</p>
            </div>
          ))}
        </div>

        {/* Stats */}
        <p style={s.stats}>
          <span style={s.statsNum}>{total}</span>
          {' completion'}{total !== 1 ? 's' : ''}{' '}
          <span style={s.statsMuted}>in the last 6 months</span>
        </p>
      </div>

      {/* Tooltip */}
      {tip && (
        <div style={{ ...s.tooltip, left: tip.x, top: tip.y - 6 }}>
          {tip.text}
        </div>
      )}
    </div>
  );
}

// ── Styles ─────────────────────────────────────────────────────────────────
const s = {
  page: {
    backgroundColor: '#1c1917',
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '2rem 2.5rem',
  },
  wrap: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '1rem',
  },
  grid: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: MONTH_GAP,
  },
  monthCol: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: 6,
  },
  weekRow: {
    display: 'flex',
    gap: GAP,
  },
  weekCol: {
    display: 'grid',
    gridTemplateRows: `repeat(7, ${CELL}px)`,
    gap: GAP,
  },
  cell: {
    width: CELL,
    height: CELL,
    borderRadius: 2,
  },
  monthLabel: {
    fontFamily: "'Courier New', monospace",
    fontSize: '10px',
    color: '#5a5652',
    letterSpacing: '0.06em',
    textAlign: 'center' as const,
    userSelect: 'none' as const,
  },
  stats: {
    fontFamily: "'Courier New', monospace",
    fontSize: '10px',
    letterSpacing: '0.04em',
  },
  statsNum: {
    color: '#6f9460',
  },
  statsMuted: {
    color: '#4a4643',
  },
  tooltip: {
    position: 'fixed' as const,
    transform: 'translate(-50%, -100%)',
    backgroundColor: '#252320',
    border: '1px solid #35322e',
    borderRadius: 4,
    padding: '5px 9px',
    fontFamily: "'Courier New', monospace",
    fontSize: '11px',
    color: '#c8c4bc',
    whiteSpace: 'nowrap' as const,
    pointerEvents: 'none' as const,
    zIndex: 1000,
    letterSpacing: '0.03em',
  },
} as const;
