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
  },
};

export default nextConfig;
