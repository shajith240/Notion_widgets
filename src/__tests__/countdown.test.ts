import { describe, it, expect } from 'vitest';
import { calculateTimeRemaining } from '@/lib/countdown';

describe('calculateTimeRemaining', () => {
  it('returns all zeros and expired=true when target is in the past', () => {
    const past = new Date(Date.now() - 1000).toISOString();
    const result = calculateTimeRemaining(past);
    expect(result.expired).toBe(true);
    expect(result.days).toBe(0);
    expect(result.hours).toBe(0);
    expect(result.minutes).toBe(0);
    expect(result.seconds).toBe(0);
  });

  it('returns correct days for a future date exactly 2 days away', () => {
    const twoDaysLater = new Date(Date.now() + 2 * 24 * 60 * 60 * 1000 + 5000).toISOString();
    const result = calculateTimeRemaining(twoDaysLater);
    expect(result.expired).toBe(false);
    expect(result.days).toBe(2);
  });

  it('returns correct hours component (not total hours)', () => {
    // 1 day + 3 hours = 27 total hours, but hours component should be 3
    const target = new Date(Date.now() + (27 * 60 * 60 + 30) * 1000).toISOString();
    const result = calculateTimeRemaining(target);
    expect(result.days).toBe(1);
    expect(result.hours).toBe(3);
  });

  it('handles ISO date string like Notion returns (YYYY-MM-DD)', () => {
    // Notion returns dates as "2027-12-01" — new Date() must parse this
    const result = calculateTimeRemaining('2027-12-01');
    expect(result.expired).toBe(false);
    expect(result.days).toBeGreaterThan(0);
  });
});
