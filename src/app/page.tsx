import CopyButton from '@/components/CopyButton';

const WIDGETS = [
  {
    slug: 'countdown',
    name: 'Countdown Timer',
    description:
      'Live countdown to a target date stored in your Notion database. Reads server-side on load, ticks every second client-side. No re-fetching from Notion every second.',
    embedUrl: 'https://shajith-notion-widgets.vercel.app/widgets/countdown',
    tags: ['Timer', 'Date'],
  },
  {
    slug: 'quote',
    name: 'Quote of the Day',
    description:
      'A fresh motivational quote every day. 50 hand-picked quotes that rotate daily — simple, direct, no poetry.',
    embedUrl: 'https://shajith-notion-widgets.vercel.app/widgets/quote',
    tags: ['Daily', 'Motivation'],
  },
  {
    slug: 'heatmap',
    name: 'Consistency Heatmap',
    description:
      'GitHub-style activity heatmap reading completed tasks from your Notion database. 26 weeks of history, color-coded by daily completion count.',
    embedUrl: 'https://shajith-notion-widgets.vercel.app/widgets/heatmap',
    tags: ['Habit', 'Tracking'],
  },
] as const;

const COMING_SOON = [
  {
    name: 'Goal Progress',
    description: 'Animated progress bar reading a Notion number property.',
  },
];

export default function Home() {
  return (
    <div style={s.root}>
      <nav style={s.nav}>
        <span style={s.brand}>GRIND WIDGETS</span>
        <a
          href="https://github.com/shajith240/Notion_widgets"
          target="_blank"
          rel="noopener noreferrer"
          style={s.navLink}
        >
          GitHub ↗
        </a>
      </nav>

      <section style={s.hero}>
        <p style={s.overline}>// notion widget marketplace</p>
        <h1 style={s.headline}>
          The widget library<br />
          for your workspace.
        </h1>
        <p style={s.sub}>
          Live-updating widgets that read directly from Notion.
          <br />
          Embed with one URL — no accounts, no limits.
        </p>
      </section>

      <div style={s.sectionRow}>
        <span style={s.sectionLabel}>widgets</span>
        <div style={s.rule} />
        <span style={s.sectionCount}>{WIDGETS.length} live</span>
      </div>

      <section style={s.grid}>
        {WIDGETS.map((w) => (
          <article key={w.slug} style={s.card}>
            <div style={s.cardTop}>
              <span style={s.liveDot}>●</span>
              <span style={s.liveBadge}>LIVE</span>
            </div>

            <div style={s.preview}>
              <iframe
                src={w.embedUrl}
                width="100%"
                height="100%"
                frameBorder="0"
                scrolling="no"
                title={w.name}
                loading="lazy"
              />
            </div>

            <div style={s.cardBody}>
              <h2 style={s.cardTitle}>{w.name}</h2>
              <p style={s.cardDesc}>{w.description}</p>
              <div style={s.cardFooter}>
                <div style={s.tagRow}>
                  {w.tags.map((t) => (
                    <span key={t} style={s.tag}>
                      {t}
                    </span>
                  ))}
                </div>
                <CopyButton url={w.embedUrl} />
              </div>
            </div>
          </article>
        ))}

        {COMING_SOON.map((w) => (
          <article key={w.name} style={s.soonCard}>
            <span style={s.soonDot}>○</span>
            <div style={s.soonText}>
              <p style={s.soonName}>{w.name}</p>
              <p style={s.soonDesc}>{w.description}</p>
            </div>
            <span style={s.soonBadge}>Soon</span>
          </article>
        ))}
      </section>

      <footer style={s.footer}>
        <span style={s.footerText}>Grind Widgets</span>
        <span style={s.footerSep}>·</span>
        <span style={s.footerText}>Minimal tools for your Notion workspace</span>
      </footer>
    </div>
  );
}

const s = {
  root: {
    backgroundColor: '#0c0b0a',
    minHeight: '100vh',
    color: '#e4e0d8',
    fontFamily: 'var(--font-geist-sans), system-ui, sans-serif',
    maxWidth: '780px',
    margin: '0 auto',
    padding: '0 1.5rem',
  },

  // ── Nav ─────────────────────────────────────────────────────────
  nav: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '1.5rem 0',
    borderBottom: '1px solid #191714',
    marginBottom: '5rem',
  },
  brand: {
    fontFamily: 'var(--font-geist-mono), monospace',
    fontSize: '0.68rem',
    letterSpacing: '0.18em',
    color: '#e4e0d8',
    fontWeight: '500',
  },
  navLink: {
    fontFamily: 'var(--font-geist-mono), monospace',
    fontSize: '0.68rem',
    letterSpacing: '0.05em',
    color: '#4a4643',
    textDecoration: 'none',
  },

  // ── Hero ─────────────────────────────────────────────────────────
  hero: {
    paddingBottom: '5rem',
  },
  overline: {
    fontFamily: 'var(--font-geist-mono), monospace',
    fontSize: '0.7rem',
    color: '#6f9460',
    letterSpacing: '0.04em',
    marginBottom: '1.5rem',
  },
  headline: {
    fontSize: 'clamp(2.4rem, 5.5vw, 3.75rem)',
    fontWeight: '500',
    lineHeight: 1.07,
    letterSpacing: '-0.03em',
    color: '#e4e0d8',
    marginBottom: '1.5rem',
  },
  sub: {
    fontSize: '1rem',
    lineHeight: 1.72,
    color: '#6e6860',
    maxWidth: '400px',
  },

  // ── Section header ───────────────────────────────────────────────
  sectionRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.875rem',
    marginBottom: '1.5rem',
  },
  sectionLabel: {
    fontFamily: 'var(--font-geist-mono), monospace',
    fontSize: '0.6rem',
    letterSpacing: '0.22em',
    textTransform: 'uppercase' as const,
    color: '#3e3b38',
    flexShrink: 0 as const,
  },
  rule: {
    height: '1px',
    flex: 1,
    backgroundColor: '#191714',
  },
  sectionCount: {
    fontFamily: 'var(--font-geist-mono), monospace',
    fontSize: '0.6rem',
    letterSpacing: '0.1em',
    color: '#6f9460',
    flexShrink: 0 as const,
  },

  // ── Widget grid ──────────────────────────────────────────────────
  grid: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '0.75rem',
    paddingBottom: '6rem',
  },

  // ── Live card ────────────────────────────────────────────────────
  card: {
    border: '1px solid #1f1d1b',
    borderRadius: '8px',
    backgroundColor: '#111009',
    overflow: 'hidden',
  },
  cardTop: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.35rem',
    padding: '0.875rem 1.125rem 0',
  },
  liveDot: {
    fontSize: '0.5rem',
    color: '#6f9460',
    lineHeight: 1,
  },
  liveBadge: {
    fontFamily: 'var(--font-geist-mono), monospace',
    fontSize: '0.58rem',
    letterSpacing: '0.15em',
    color: '#6f9460',
  },
  preview: {
    margin: '0.875rem 1.125rem',
    height: '220px',
    borderRadius: '5px',
    overflow: 'hidden',
    backgroundColor: '#1c1917',
    border: '1px solid #1f1d1b',
  },
  cardBody: {
    padding: '0 1.125rem 1.125rem',
  },
  cardTitle: {
    fontSize: '0.95rem',
    fontWeight: '600',
    color: '#e4e0d8',
    marginBottom: '0.35rem',
    letterSpacing: '-0.01em',
  },
  cardDesc: {
    fontSize: '0.82rem',
    color: '#5e5a55',
    lineHeight: 1.68,
    marginBottom: '1rem',
  },
  cardFooter: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '0.75rem',
  },
  tagRow: {
    display: 'flex',
    gap: '0.35rem',
  },
  tag: {
    fontFamily: 'var(--font-geist-mono), monospace',
    fontSize: '0.57rem',
    letterSpacing: '0.1em',
    textTransform: 'uppercase' as const,
    color: '#3e3b38',
    backgroundColor: '#171512',
    border: '1px solid #222019',
    padding: '0.18rem 0.45rem',
    borderRadius: '3px',
  },

  // ── Coming soon cards ────────────────────────────────────────────
  soonCard: {
    border: '1px solid #171512',
    borderRadius: '8px',
    backgroundColor: '#0e0d0b',
    padding: '0.875rem 1.125rem',
    display: 'flex',
    alignItems: 'center',
    gap: '0.875rem',
  },
  soonDot: {
    fontFamily: 'var(--font-geist-mono), monospace',
    fontSize: '0.75rem',
    color: '#272421',
    flexShrink: 0 as const,
  },
  soonText: {
    flex: 1,
    minWidth: 0,
  },
  soonName: {
    fontSize: '0.82rem',
    fontWeight: '500',
    color: '#35322f',
    marginBottom: '0.12rem',
    letterSpacing: '-0.01em',
  },
  soonDesc: {
    fontSize: '0.72rem',
    color: '#272421',
    lineHeight: 1.5,
  },
  soonBadge: {
    fontFamily: 'var(--font-geist-mono), monospace',
    fontSize: '0.57rem',
    letterSpacing: '0.1em',
    textTransform: 'uppercase' as const,
    color: '#272421',
    border: '1px solid #1e1c19',
    padding: '0.18rem 0.45rem',
    borderRadius: '3px',
    flexShrink: 0 as const,
  },

  // ── Footer ───────────────────────────────────────────────────────
  footer: {
    borderTop: '1px solid #191714',
    padding: '1.25rem 0 2rem',
    display: 'flex',
    gap: '0.5rem',
    alignItems: 'center',
  },
  footerText: {
    fontFamily: 'var(--font-geist-mono), monospace',
    fontSize: '0.6rem',
    letterSpacing: '0.05em',
    color: '#272421',
  },
  footerSep: {
    fontFamily: 'var(--font-geist-mono), monospace',
    fontSize: '0.6rem',
    color: '#272421',
  },
} as const;
