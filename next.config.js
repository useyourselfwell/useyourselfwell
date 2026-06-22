/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Content-Security-Policy",
            value:
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://js.stripe.com https://m.stripe.network https://va.vercel-scripts.com; frame-src https://js.stripe.com https://m.stripe.network https://www.youtube.com https://www.youtube-nocookie.com; connect-src 'self' https://api.stripe.com https://va.vercel-scripts.com;",
          },
        ],
      },
    ];
  },
};
module.exports = nextConfig;
