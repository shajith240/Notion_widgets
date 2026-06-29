import { getTodaysQuote } from '@/lib/quotes';

// Revalidate every hour — quote changes daily, math ensures correct one shows
export const revalidate = 3600;

export default function QuotePage() {
  const quote = getTodaysQuote();

  return (
    <div style={s.page}>
      <div style={s.card}>
        <span style={s.openQuote}>&ldquo;</span>
        <p style={s.text}>{quote.text}</p>
        <p style={s.author}>
          {quote.author ? `— ${quote.author}` : '—'}
        </p>
      </div>
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
    padding: '2.5rem 2rem',
    fontFamily: "'Courier New', monospace",
  },
  card: {
    maxWidth: '480px',
    width: '100%',
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '1.25rem',
  },
  openQuote: {
    display: 'block',
    fontFamily: 'Georgia, serif',
    fontSize: 'clamp(3.5rem, 10vw, 5rem)',
    lineHeight: 1,
    color: '#2a2825',
    marginBottom: '-0.5rem',
    userSelect: 'none' as const,
  },
  text: {
    fontFamily: "'Geist', 'Inter', system-ui, sans-serif",
    fontSize: 'clamp(1rem, 2.8vw, 1.25rem)',
    fontWeight: '400',
    fontStyle: 'italic',
    lineHeight: 1.65,
    color: '#e4e0d8',
    letterSpacing: '0.005em',
  },
  author: {
    fontFamily: "'Courier New', 'Geist Mono', monospace",
    fontSize: '0.72rem',
    letterSpacing: '0.08em',
    color: '#6f9460',
    marginTop: '0.25rem',
  },
} as const;
