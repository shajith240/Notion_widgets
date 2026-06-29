import { fetchCompletedDates } from '@/lib/grindTracker';
import HeatmapGrid from './HeatmapGrid';

export const dynamic = 'force-dynamic';

export default async function HeatmapPage() {
  const dates = await fetchCompletedDates();

  // Compute today on the server so SSR and client agree
  const now = new Date();
  const today = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;

  return <HeatmapGrid dates={dates} today={today} />;
}
