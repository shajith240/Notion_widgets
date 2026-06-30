'use client';

import { useState, useEffect } from 'react';
import { calculateTimeRemaining, type TimeRemaining } from '@/lib/countdown';

export default function CountdownClock({ targetDate }: { targetDate: string }) {
  const [time, setTime] = useState<TimeRemaining>(() =>
    calculateTimeRemaining(targetDate)
  );

  useEffect(() => {
    const id = setInterval(() => {
      setTime(calculateTimeRemaining(targetDate));
    }, 1000);
    return () => clearInterval(id);
  }, [targetDate]);

  return (
    <div style={styles.page}>
      {time.expired ? (
        <p style={styles.expiredText}>Placement season has arrived.</p>
      ) : (
        <>
          <p style={styles.label}>Placement Season</p>
          <div style={styles.clock}>
            <TimeUnit value={time.days} label="DAYS" />
            <Colon />
            <TimeUnit value={time.hours} label="HRS" />
            <Colon />
            <TimeUnit value={time.minutes} label="MIN" />
            <Colon />
            <TimeUnit value={time.seconds} label="SEC" />
          </div>
        </>
      )}
    </div>
  );
}

function TimeUnit({ value, label }: { value: number; label: string }) {
  return (
    <div style={styles.unit}>
      <span style={styles.digit}>{String(value).padStart(2, '0')}</span>
      <span style={styles.unitLabel}>{label}</span>
    </div>
  );
}

function Colon() {
  return <span style={styles.colon}>:</span>;
}

const styles = {
  page: {
    backgroundColor: '#191919',
    height: '100vh',
    overflow: 'hidden',
    boxSizing: 'border-box' as const,
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    justifyContent: 'center',
    padding: '2rem',
  },
  label: {
    color: '#6f9460',
    fontSize: '0.75rem',
    letterSpacing: '0.25em',
    textTransform: 'uppercase' as const,
    marginBottom: '1.75rem',
    opacity: 0.85,
  },
  clock: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '0.5rem',
  },
  unit: {
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    gap: '0.5rem',
  },
  digit: {
    color: '#6f9460',
    fontFamily: "'Courier New', 'Menlo', monospace",
    fontSize: 'clamp(2.5rem, 8vw, 4rem)',
    fontWeight: '700' as const,
    lineHeight: 1,
    letterSpacing: '0.02em',
  },
  unitLabel: {
    color: '#6f9460',
    fontSize: '0.6rem',
    letterSpacing: '0.2em',
    textTransform: 'uppercase' as const,
    opacity: 0.55,
  },
  colon: {
    color: '#6f9460',
    fontFamily: "'Courier New', monospace",
    fontSize: 'clamp(2.5rem, 8vw, 4rem)',
    fontWeight: '700' as const,
    lineHeight: 1,
    paddingBottom: '1.25rem',
    opacity: 0.6,
  },
  expiredText: {
    color: '#6f9460',
    fontFamily: "'Courier New', monospace",
    fontSize: '1.5rem',
    letterSpacing: '0.05em',
  },
} as const;
