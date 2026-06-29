import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  turbopack: {
    // Silence the workspace-root warning from the lockfile in C:\Users\SHAJITH\
    root: __dirname,
  },
  async headers() {
    return [
      {
        // Allow any site (including Notion desktop and web) to embed /widgets/* in an iframe.
        source: '/widgets/:path*',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: 'frame-ancestors *',
          },
        ],
      },
      {
        // Correct MIME type for WASM — required for streaming compilation in browsers.
        source: '/:path*.wasm',
        headers: [
          {
            key: 'Content-Type',
            value: 'application/wasm',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
