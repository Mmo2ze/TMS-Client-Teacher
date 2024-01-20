    /** @type {import('next').NextConfig} */
    const nextConfig = {
        reactStrictMode: false,
        async headers() {
            return [
                {
                    source: '/(.*)?', // Matches all pages
                    headers: [
                        {
                            key:"Access-Control-Allow-Origin",
                            value:"*",
                        },
                        {
                            key: 'X-Frame-Options',
                            value: 'DENY',
                        }
                    ]
                }
            ]
        }
        ,  async rewrites() {
            return [
                {
                    source: "/api/:path*",
                    destination: 'https://tass.ist/:path*',
                },
            ]
        },
    }

    module.exports = nextConfig
