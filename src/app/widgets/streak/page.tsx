import { fetchCompletedDates } from '@/lib/grindTracker';
import { computeStreak } from '@/lib/streak';
import StreakDisplay from './StreakDisplay';

export const revalidate = 300;

export default async function StreakPage() {
  const dates = await fetchCompletedDates();

  const now = new Date();
  const today = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;

  const { current, best } = computeStreak(dates, today);

  return <StreakDisplay current={current} best={best} dates={dates} today={today} />;
}
