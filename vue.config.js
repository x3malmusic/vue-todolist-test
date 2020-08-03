const path = require("path");

module.exports = {
  css: {
    loaderOptions: {
      sass: {
        sassOptions: {
          includePaths: [path.resolve(__dirname, "src")],
          indentedSyntax: true
        },
        prependData: `@import "./src/assets/styles/main.scss";`
      }
    }
  },
  assetsDir: "@/assets/"
};
