'use client';

import { useEffect, useRef } from 'react';
import { DotLottie } from '@lottiefiles/dotlottie-web';

export default function LottieFlame({ opacity }: { opacity: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Set WASM URL before the DotLottie instance is created so the renderer
    // fetches from our public/ file instead of its bundled/CDN path.
    DotLottie.setWasmUrl('/dotlottie-player.wasm');

    const dl = new DotLottie({
      canvas,
      src: '/890cb942-1177-11ee-847c-73f9b2630e61.lottie',
      loop: true,
      autoplay: true,
    });

    return () => {
      dl.destroy();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      width={176}
      height={176}
      style={{ width: 88, height: 88, opacity, display: 'block' }}
    />
  );
}
