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
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://js.stripe.com https://m.stripe.network; frame-src https://js.stripe.com https://m.stripe.network; connect-src 'self' https://api.stripe.com;",
          },
        ],
      },
    ];
  },
};
module.exports = nextConfig;
