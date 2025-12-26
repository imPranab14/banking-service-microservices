import createProxyMiddleware  from "http-proxy-middleware"


const apiProxy=createProxyMiddleware({
    target:'http://localhost:3001',
    changeOrigin: true,
   // pathFilter:'/api/v1/auth/**'
})


export default apiProxy