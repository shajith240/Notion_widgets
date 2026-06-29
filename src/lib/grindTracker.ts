// Server-only: never import from a client component.
const NOTION_VERSION = '2022-06-28';
const GRIND_TRACKER_DB_ID = '2fa1592300d54d3eac6b9c7ec11636ed';

export async function fetchCompletedDates(): Promise<string[]> {
  const token = process.env.NOTION_TOKEN;

  if (!token) {
    console.error('[grindTracker] Missing NOTION_TOKEN env var');
    return [];
  }

  const dates: string[] = [];
  let cursor: string | undefined;

  try {
    do {
      const body: Record<string, unknown> = {
        filter: {
          property: 'Status',
          select: { equals: 'Completed' },
        },
        page_size: 100,
      };
      if (cursor) body.start_cursor = cursor;

      const res = await fetch(
        `https://api.notion.com/v1/databases/${GRIND_TRACKER_DB_ID}/query`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
            'Notion-Version': NOTION_VERSION,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(body),
          next: { revalidate: 3600 },
        }
      );

      if (!res.ok) {
        console.error(`[grindTracker] API error: ${res.status} ${res.statusText}`);
        break;
      }

      const data = await res.json();

      for (const page of data.results ?? []) {
        const dateProp = page.properties?.['Scheduled Date'];
        const dateStr: string | undefined = dateProp?.date?.start;
        if (dateStr) dates.push(dateStr.slice(0, 10));
      }

      cursor = data.has_more ? data.next_cursor : undefined;
    } while (cursor);

    return dates;
  } catch (err) {
    console.error('[grindTracker] Fetch failed:', err);
    return [];
  }
}
