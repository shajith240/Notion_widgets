import { fetchTargetDate } from '@/lib/notion';
import CountdownClock from './CountdownClock';

export const revalidate = 300;

export default async function CountdownPage() {
  // Falls back to target date if Notion token not yet configured
  const targetDate = (await fetchTargetDate()) ?? '2027-12-01';

  return <CountdownClock targetDate={targetDate} />;
}
