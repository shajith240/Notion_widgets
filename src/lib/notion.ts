// Server-only: never import this from a client component.
// NOTION_TOKEN has no NEXT_PUBLIC_ prefix — it is unavailable in the browser bundle.

const NOTION_VERSION = '2022-06-28';

export async function fetchTargetDate(): Promise<string | null> {
  const token = process.env.NOTION_TOKEN;
  // COUNTDOWN_DB_ID avoids collision with any system-level NOTION_DATABASE_ID var
  const databaseId = process.env.COUNTDOWN_DB_ID;

  if (!token || !databaseId) {
    console.error('[notion] Missing NOTION_TOKEN or COUNTDOWN_DB_ID env vars');
    return null;
  }

  try {
    const res = await fetch(
      `https://api.notion.com/v1/databases/${databaseId}/query`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Notion-Version': NOTION_VERSION,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ page_size: 1 }),
        next: { revalidate: 300 },
      }
    );

    if (!res.ok) {
      console.error(`[notion] API error: ${res.status} ${res.statusText}`);
      return null;
    }

    const data = await res.json();
    const page = data.results?.[0];
    if (!page) {
      console.error('[notion] No results found in database');
      return null;
    }

    const dateProp = page.properties?.['Target Date'];
    const dateStr: string | undefined = dateProp?.date?.start;

    if (!dateStr) {
      console.error('[notion] "Target Date" property missing or empty on first row');
      return null;
    }

    return dateStr;
  } catch (err) {
    console.error('[notion] Fetch failed:', err);
    return null;
  }
}
