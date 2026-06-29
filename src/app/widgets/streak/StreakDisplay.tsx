'use client';

import {
  DotLottieReact,
  setWasmUrl,
  type DotLottie,
} from '@lottiefiles/dotlottie-react';
import { useCallback, useEffect, useState } from 'react';

// Must point to the WASM renderer before any DotLottieReact renders
setWasmUrl('/dotlottie-player.wasm');

const LOTTIE_SRC = '/890cb942-1177-11ee-847c-73f9b2630e61.lottie';

// Minimal SVG flame — shown while Lottie is loading or if it fails
function FlameSVG({ active }: { active: boolean }) {
  const fill = active ? '#6f9460' : '#35322f';
  return (
    <svg
      width="72"
      height="72"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M12 2C9 5.5 6.5 9.5 6.5 13.5C6.5 17.09 9.02 20 12 20C14.98 20 17.5 17.09 17.5 13.5C17.5 9.5 15 5.5 12 2Z"
        fill={fill}
        fillOpacity={active ? 0.85 : 0.4}
      />
      <path
        d="M12 9.5C10.5 11.5 10 13 10 14.5C10 16.43 10.9 17.5 12 17.5C13.1 17.5 14 16.43 14 14.5C14 13 13.5 11.5 12 9.5Z"
        fill={fill}
        fillOpacity={active ? 1 : 0.3}
      />
    </svg>
  );
}

export default function StreakDisplay({
  current,
  best,
}: {
  current: number;
  best: number;
}) {
  const active = current > 0;

  const [dotLottie, setDotLottie] = useState<DotLottie | null>(null);
  const [animationReady, setAnimationReady] = useState(false);
  const [animationFailed, setAnimationFailed] = useState(false);

  const handleRef = useCallback((instance: DotLottie | null) => {
    setDotLottie(instance);
  }, []);

  useEffect(() => {
    if (!dotLottie) return;
    const onReady = () => setAnimationReady(true);
    const onFail = () => setAnimationFailed(true);
    dotLottie.addEventListener('ready', onReady);
    dotLottie.addEventListener('load', onReady);
    dotLottie.addEventListener('render', onReady);
    dotLottie.addEventListener('loadError', onFail);
    dotLottie.addEventListener('renderError', onFail);
    return () => {
      dotLottie.removeEventListener('ready', onReady);
      dotLottie.removeEventListener('load', onReady);
      dotLottie.removeEventListener('render', onReady);
      dotLottie.removeEventListener('loadError', onFail);
      dotLottie.removeEventListener('renderError', onFail);
    };
  }, [dotLottie]);

  return (
    <div style={s.page}>
      <div style={s.card}>
        {/* Fire — Lottie over static SVG fallback */}
        <div
          style={{
            ...s.flameWrap,
            opacity: active ? 1 : 0.25,
          }}
        >
          {/* Static SVG shown until Lottie is ready, or always if it failed */}
          <span
            style={{
              ...s.flameFallback,
              opacity: animationReady && !animationFailed ? 0 : 1,
            }}
          >
            <FlameSVG active={active} />
          </span>

          {!animationFailed && (
            <span
              style={{
                ...s.lottieLayer,
                opacity: animationReady ? 1 : 0,
              }}
            >
              <DotLottieReact
                src={LOTTIE_SRC}
                loop
                autoplay
                dotLottieRefCallback={handleRef}
                style={{ width: 72, height: 72 }}
              />
            </span>
          )}
        </div>

        {/* Streak number */}
        <span style={{ ...s.number, color: active ? '#6f9460' : '#35322f' }}>
          {current}
        </span>

        {/* Label */}
        <span style={s.label}>day streak</span>

        {/* Best — only when meaningful */}
        {best > 0 && (
          <span style={s.best}>
            best&nbsp;·&nbsp;{best}&nbsp;{best === 1 ? 'day' : 'days'}
          </span>
        )}
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
    padding: '2rem 1.5rem',
    fontFamily: "'Courier New', 'Geist Mono', monospace",
  },
  card: {
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    gap: '0.5rem',
    width: '100%',
    maxWidth: '240px',
  },
  flameWrap: {
    position: 'relative' as const,
    width: 72,
    height: 72,
    marginBottom: '0.25rem',
    transition: 'opacity 0.3s',
  },
  flameFallback: {
    position: 'absolute' as const,
    inset: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'opacity 0.2s',
  },
  lottieLayer: {
    position: 'absolute' as const,
    inset: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'opacity 0.2s',
  },
  number: {
    fontSize: 'clamp(4rem, 18vw, 5.5rem)',
    fontWeight: '700' as const,
    lineHeight: 1,
    letterSpacing: '-0.04em',
    fontFamily: "'Geist', 'Inter', system-ui, sans-serif",
    transition: 'color 0.3s',
  },
  label: {
    fontSize: '0.72rem',
    letterSpacing: '0.18em',
    textTransform: 'uppercase' as const,
    color: '#4a4643',
    marginTop: '0.25rem',
  },
  best: {
    fontSize: '0.65rem',
    letterSpacing: '0.08em',
    color: '#2e2c29',
    marginTop: '0.75rem',
  },
} as const;
