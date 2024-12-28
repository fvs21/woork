/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        localPatterns: [
            {
                pathname: '/assets/images'
            },
        ],
        remotePatterns: [
            {
                protocol: "http",
                hostname: 'localhost',
                port: "8000",
                pathname: "/api/images/**"
            }
        ]
    },
    webpack: config => {
        config.resolve.fallback = {...config.resolve.fallback, net: false};
        return config;
    }
};

export default nextConfig;
