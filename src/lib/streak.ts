// Pure streak computation — no I/O, fully testable.

function shiftDay(dateStr: string, n: number): string {
  const [y, m, d] = dateStr.split('-').map(Number);
  const dt = new Date(y, m - 1, d);
  dt.setDate(dt.getDate() + n);
  return `${dt.getFullYear()}-${String(dt.getMonth() + 1).padStart(2, '0')}-${String(dt.getDate()).padStart(2, '0')}`;
}

export interface StreakResult {
  current: number;
  best: number;
}

export function computeStreak(dates: string[], today: string): StreakResult {
  const daySet = new Set(dates.map((d) => d.slice(0, 10)));

  // Determine the anchor: today if it has completions, otherwise yesterday
  // (grace period — don't kill streak just because today isn't done yet).
  let anchor: string;
  if (daySet.has(today)) {
    anchor = today;
  } else if (daySet.has(shiftDay(today, -1))) {
    anchor = shiftDay(today, -1);
  } else {
    return { current: 0, best: computeBest(daySet) };
  }

  // Walk backward from anchor, counting consecutive days
  let current = 0;
  let cursor = anchor;
  while (daySet.has(cursor)) {
    current++;
    cursor = shiftDay(cursor, -1);
  }

  return { current, best: computeBest(daySet) };
}

function computeBest(daySet: Set<string>): number {
  if (daySet.size === 0) return 0;
  const sorted = [...daySet].sort();
  let best = 1;
  let run = 1;
  for (let i = 1; i < sorted.length; i++) {
    if (shiftDay(sorted[i - 1], 1) === sorted[i]) {
      run++;
      if (run > best) best = run;
    } else {
      run = 1;
    }
  }
  return best;
}
