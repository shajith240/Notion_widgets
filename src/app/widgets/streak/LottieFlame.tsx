'use client';

import { useEffect, useRef } from 'react';
import { DotLottie } from '@lottiefiles/dotlottie-web';

export default function LottieFlame({ opacity, size = 88 }: { opacity: number; size?: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

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
      width={size * 2}
      height={size * 2}
      style={{ width: size, height: size, opacity, display: 'block', transition: 'opacity 0.3s' }}
    />
  );
}
