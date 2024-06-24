/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  publicRuntimeConfig: {
    docxPressUrl: process.env.DOCXPRESS_URL,
    msReportUrl: process.env.MS_REPORT_URL,
    s3ServiceUrl: process.env.S3_SERVICE_URL,
    esServiceUrl: process.env.ES_SERVICE_URL,
    msToolbertUrl: process.env.MS_TOOLBERT_URL,
    msGenUrl: process.env.MS_GEN_URL,
    internalIP: process.env.INTERNAL_IP,
  },


  async rewrites() {
    return [
      {
        source: '/api/msreport/:path*',
        destination: '/api/proxy/msreport/:path*',
      },
    ];
  },
  webpackDevMiddleware: (config) => {
    config.watchOptions = {
      aggregateTimeout: 300,
      poll: 1000,
    };
    return config;
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = { fs: false };

      config.devServer = {
        ...config.devServer,
        proxy: {
          '/api/proxy/msreport': {
            target: `http://${process.env.INTERNAL_IP}:8000`,
            pathRewrite: { '^/api/proxy/msreport': '' },
            changeOrigin: true,
          },
        },
      };
    }
    return config;
  },
};

export default nextConfig;
