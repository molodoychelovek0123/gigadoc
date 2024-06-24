// pages/api/proxy/[...path].js
import { createProxyMiddleware } from 'http-proxy-middleware';
import getConfig from "next/config";
const {
    publicRuntimeConfig: { internalIP },
} = getConfig();
export const config = {
    api: {
        bodyParser: false,
    },
};

const proxy = createProxyMiddleware({
    target: `http://${internalIP}:8080`,
    changeOrigin: true,
    pathRewrite: {
        '^/api/proxy/esservice': '', // Удаляет /api/proxy из пути запроса
    },
});

export default function handler(req, res) {
    return proxy(req, res, (result) => {
        if (result instanceof Error) {
            throw result;
        }
    });
}