'use client';

// This module is ONLY loaded client-side (imported via dynamic({ssr:false})).
// setWasmUrl at module level is therefore guaranteed to run in the browser,
// before any DotLottieReact instance initialises.
import { DotLottieReact, setWasmUrl } from '@lottiefiles/dotlottie-react';

setWasmUrl('/dotlottie-player.wasm');

export default function LottieFlame({ opacity }: { opacity: number }) {
  return (
    <DotLottieReact
      src="/890cb942-1177-11ee-847c-73f9b2630e61.lottie"
      loop
      autoplay
      style={{ width: 88, height: 88, opacity, display: 'block' }}
    />
  );
}
