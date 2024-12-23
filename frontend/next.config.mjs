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
    }
};

export default nextConfig;
