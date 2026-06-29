'use client';

import { useState } from 'react';

const WEEKS = 26;
const CELL = 12;
const GAP = 3;
const STRIDE = CELL + GAP;
const LABEL_W = 14;
const MONTH_H = 16;

function cellColor(count: number, inFuture: boolean): string {
  if (inFuture) return 'transparent';
  if (count === 0) return '#252320';
  if (count === 1) return 'rgba(111, 148, 96, 0.28)';
  if (count === 2) return 'rgba(111, 148, 96, 0.58)';
  return '#6f9460';
}

function fmtDate(dateStr: string): string {
  const [y, m, d] = dateStr.split('-').map(Number);
  return new Date(y, m - 1, d).toLocaleString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
}

export default function HeatmapGrid({
  dates,
  today,
}: {
  dates: string[];
  today: string;
}) {
  const [tip, setTip] = useState<{ text: string; x: number; y: number } | null>(null);

  // count completions per day
  const counts: Record<string, number> = {};
  for (const d of dates) {
    counts[d] = (counts[d] ?? 0) + 1;
  }

  // compute start date: Sunday of the week that was 25 weeks before this week's Sunday
  const [ty, tm, td] = today.split('-').map(Number);
  const todayDate = new Date(ty, tm - 1, td);
  const thisSunday = new Date(todayDate);
  thisSunday.setDate(todayDate.getDate() - todayDate.getDay());
  const startDate = new Date(thisSunday);
  startDate.setDate(thisSunday.getDate() - (WEEKS - 1) * 7);

  // cols[col][row]: col=week index (0=oldest), row=day of week (0=Sun)
  const cols: { date: string; count: number; inFuture: boolean }[][] = [];
  for (let c = 0; c < WEEKS; c++) {
    cols[c] = [];
    for (let r = 0; r < 7; r++) {
      const d = new Date(startDate);
      d.setDate(startDate.getDate() + c * 7 + r);
      const y = d.getFullYear();
      const mo = String(d.getMonth() + 1).padStart(2, '0');
      const dy = String(d.getDate()).padStart(2, '0');
      const dateStr = `${y}-${mo}-${dy}`;
      cols[c][r] = {
        date: dateStr,
        count: counts[dateStr] ?? 0,
        inFuture: dateStr > today,
      };
    }
  }

  // month labels: emit a label whenever the month changes across columns
  const monthLabels: { col: number; label: string }[] = [];
  let lastMo = -1;
  for (let c = 0; c < WEEKS; c++) {
    const d = new Date(cols[c][0].date + 'T00:00:00');
    const mo = d.getMonth();
    if (mo !== lastMo) {
      lastMo = mo;
      monthLabels.push({
        col: c,
        label: d.toLocaleString('en-US', { month: 'short' }),
      });
    }
  }

  const total = dates.length;

  return (
    <div style={s.page}>
      <div style={s.wrap}>
        {/* Month labels */}
        <div
          style={{
            height: MONTH_H,
            position: 'relative',
            marginLeft: LABEL_W + 6,
          }}
        >
          {monthLabels.map(({ col, label }) => (
            <span
              key={col}
              style={{
                ...s.monthLabel,
                position: 'absolute',
                left: col * STRIDE,
              }}
            >
              {label}
            </span>
          ))}
        </div>

        {/* Day labels + grid */}
        <div style={s.gridRow}>
          <div style={s.dayLabels}>
            {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((abbr, i) => (
              <span
                key={i}
                style={{
                  ...s.dayLabel,
                  visibility: i === 1 || i === 3 || i === 5 ? 'visible' : 'hidden',
                }}
              >
                {abbr}
              </span>
            ))}
          </div>

          <div style={s.cols}>
            {cols.map((col, ci) => (
              <div key={ci} style={s.col}>
                {col.map((cell, ri) => (
                  <div
                    key={ri}
                    style={{
                      ...s.cell,
                      backgroundColor: cellColor(cell.count, cell.inFuture),
                      cursor: cell.inFuture ? 'default' : 'pointer',
                    }}
                    onMouseEnter={(e) => {
                      if (cell.inFuture) return;
                      const r = (e.currentTarget as HTMLElement).getBoundingClientRect();
                      const text =
                        cell.count === 0
                          ? `No completions — ${fmtDate(cell.date)}`
                          : `${cell.count} completion${cell.count === 1 ? '' : 's'} — ${fmtDate(cell.date)}`;
                      setTip({ text, x: r.left + r.width / 2, y: r.top });
                    }}
                    onMouseLeave={() => setTip(null)}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Stats */}
        <p style={s.stats}>
          <span style={s.statsNum}>{total}</span>
          {' completion'}{total !== 1 ? 's' : ''}{' '}
          <span style={s.statsMuted}>in the last 6 months</span>
        </p>
      </div>

      {tip && (
        <div
          style={{
            ...s.tooltip,
            left: tip.x,
            top: tip.y - 6,
          }}
        >
          {tip.text}
        </div>
      )}
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
    padding: '2rem 2.5rem',
  },
  wrap: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '0.75rem',
  },
  monthLabel: {
    fontFamily: "'Courier New', monospace",
    fontSize: '9px',
    color: '#5a5652',
    letterSpacing: '0.04em',
    userSelect: 'none' as const,
    whiteSpace: 'nowrap' as const,
  },
  gridRow: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: 6,
  },
  dayLabels: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: GAP,
    paddingTop: 1,
    width: LABEL_W,
    flexShrink: 0 as const,
  },
  dayLabel: {
    fontFamily: "'Courier New', monospace",
    fontSize: '9px',
    color: '#4a4643',
    height: CELL,
    lineHeight: `${CELL}px`,
    textAlign: 'right' as const,
    userSelect: 'none' as const,
  },
  cols: {
    display: 'flex',
    gap: GAP,
  },
  col: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: GAP,
    flexShrink: 0 as const,
  },
  cell: {
    width: CELL,
    height: CELL,
    borderRadius: 2,
    flexShrink: 0 as const,
    transition: 'opacity 0.1s',
  },
  stats: {
    fontFamily: "'Courier New', monospace",
    fontSize: '10px',
    letterSpacing: '0.04em',
    paddingLeft: LABEL_W + 6,
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
