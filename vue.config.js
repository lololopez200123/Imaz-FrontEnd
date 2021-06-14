const path = require("path");

module.exports = {
  pages: {
    index: {
      entry: "src/site/main.js",
      template: "public/index.html",
      filename: "index.html"
    },
    admin: {
      entry: "src/admin/main.js",
      template: "public/admin.html",
      filename: "admin.html"
    }
  },
  devServer: {
    historyApiFallback: {
      rewrites: [{ from: /\/index/, to: "/index.html" }, { from: /\/admin/, to: "/admin.html" }]
    },
    proxy: {
      "/api": {
        target: "http://estudioimaz.com.ar/"
       // target: "http://localhost:3000/"
      },
      "/public": {
        target: "http://localhost:3000/"
      }
    }
  },
  chainWebpack: config => {
    config.resolve.alias.set("@", path.resolve(__dirname, "src/"));
    config.resolve.alias.set("Styles", path.resolve(__dirname, "src/assets/scss"));
  }
};
