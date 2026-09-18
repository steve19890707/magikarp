const { createProxyMiddleware } = require("http-proxy-middleware");
module.exports = function (app) {
  app.use(
    createProxyMiddleware("/proxy", {
      target: "https://rd3-qa-detail.guardians.one/",
      changeOrigin: true,
      pathRewrite: {
        "^/proxy": "",
      },
    })
  );
};
