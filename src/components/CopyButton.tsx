'use client';

import { useState } from 'react';

export default function CopyButton({ url }: { url: string }) {
  const [state, setState] = useState<'idle' | 'copied'>('idle');

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url);
    } catch {
      const el = document.createElement('textarea');
      el.value = url;
      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);
    }
    setState('copied');
    setTimeout(() => setState('idle'), 2000);
  };

  const copied = state === 'copied';

  return (
    <button onClick={copy} style={copied ? s.copied : s.idle}>
      {copied ? 'Copied!' : 'Copy embed URL →'}
    </button>
  );
}

const base = {
  fontFamily: 'var(--font-geist-mono), monospace',
  fontSize: '0.68rem',
  letterSpacing: '0.03em',
  padding: '0.32rem 0.7rem',
  borderRadius: '4px',
  whiteSpace: 'nowrap' as const,
  border: '1px solid',
  outline: 'none',
  cursor: 'pointer',
} as const;

const s = {
  idle: {
    ...base,
    color: '#6f9460',
    backgroundColor: 'transparent',
    borderColor: 'rgba(111, 148, 96, 0.25)',
  },
  copied: {
    ...base,
    color: '#e4e0d8',
    backgroundColor: 'rgba(111, 148, 96, 0.12)',
    borderColor: 'rgba(111, 148, 96, 0.35)',
    cursor: 'default',
  },
} as const;
