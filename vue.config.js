module.exports = {
  devServer: {
    port: 8080,
    proxy: {
      "/api": {
        //自定义
        target: "", //这里可以跟随项目实际部署服务器来
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          "^/api": "", //自定义
        },
      },
    },
  },
  configureWebpack: {
    resolve: {
      alias: {
        views: "@/views",
        components: "@/components",
        content: "components/content",
        common: "components/common",
        assets: "@/assets",
        api: "@/api",
        utils: "@/utils",
        store: "@/store",
        hooks: "@/hooks",
      },
    },
  },
};
